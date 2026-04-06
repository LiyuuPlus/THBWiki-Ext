<template>
    <div class="user-info-card">
        <!-- 左栏：左右均分 -->
        <div class="left-section">
            <a-skeleton :loading="loading"></a-skeleton>
            <div v-if="!loading" class="avatar-part">
                <a-avatar :size="56" :src="rawUserInfo.avatar" @click="handleAvatarClick" :class="{ shake: shakeAnim }" />
            </div>
            <div v-if="!loading" class="info-part">
                <div class="username" v-text="rawUserInfo.name" @click="handleNameClick"></div>
                <div class="nickname" v-html="displayRealName"></div>
                <div class="achievement" v-text="rawUserInfo.achievement" :title="rawUserInfo.achievementDesc"></div>
            </div>
        </div>

        <!-- 右栏：上中下均分 -->
        <div class="right-section">
            <a-skeleton :loading="loading"></a-skeleton>
            <div class="item" v-if="!loading">
                <div class="label" v-text="_t('index_groupName')"></div>
                <div class="value" v-text="rawUserInfo.groupName"></div>
            </div>
            <div class="item" v-if="!loading">
                <div class="label" v-text="_t('index_editCount')"></div>
                <div class="value" v-if="rawUserInfo.id > 0" v-text="rawUserInfo.editcount"></div>
                <div class="value" v-else>--</div>
            </div>
            <div class="item" v-if="!loading">
                <div class="label" v-text="_t('index_version')"></div>
                <div class="value" v-text="props.extVersion"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { message } from 'ant-design-vue';
import { getMessage as _t, openNewTab } from '@/api/browser';
import { getUserInfo, getUserAvatar, getTHBPageUrl, parseWikiText } from '@/api/thwiki';

const props = defineProps({
    extVersion: String,
    userInfo: Object,
})
const emit = defineEmits(['update:userInfo']);

const rawUserInfo = computed(() => {
    let info = { ...props.userInfo };
    info.avatar = getUserAvatar(info.id);
    if (info.id == 0) {
        info.name = _t('index_noLogin');
        info.realname = _t('index_noLoginDesc');
        info.achievement = '';
        info.groupName = _t('index_noLoginGroup');
    }
    else {
        // 这里从用户权限中找出最高的一个作为用户组显示
        for (let i = 0; i < groups.length; i++) {
            if (info.groups.includes(groups[i])) {
                info.groupName = _t(`group_${groups[i]}`);
                break;
            }
        }
        if (!info.groupName) {
            info.groupName = _t('group_unknown');
        }
    }
    return info;
});

const groups = [
    "bot",
    "bureaucrat",
    "sysop",
    "textop",
    "confirm",
    "preconfirm",
    "autoconfirmed",
    "user",
];

const loading = ref(false);

const clickAvatarCount = ref(0);

const shakeAnim = ref(false);

const displayRealName = ref('');

watch(() => props.userInfo, async (info) => {
    let realname = info.realname;
    if (info.realname) {
        realname = await onParseRealName(info.realname);
    }
    displayRealName.value = realname;
})

const handleNameClick = () => {
    // 如果是登录状态下
    if (rawUserInfo.value.id > 0) {
        openNewTab(getTHBPageUrl(`User:${rawUserInfo.value.name}`));
    }
    else {
        openNewTab(getTHBPageUrl());
    }
}

const handleAvatarClick = () => {
    clickAvatarCount.value++;
    if (clickAvatarCount.value >= 5) {
        // 抖动
        shakeAnim.value = true
        setTimeout(() => {
            shakeAnim.value = false
        }, 600);
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        message.success('恭喜发现隐藏彩蛋 🎉')
        clickAvatarCount.value = 0;
    }

}

const onChangeUserInfo = async () => {
    let tmpInfo = props.userInfo;
    try {
        loading.value = true;
        const info = await getUserInfo();
        if (info && info.query) {
            const query = info.query;
            const user = query.userinfo;
            const achievement = query.achievementinfo;
            if (user) {
                tmpInfo.id = user.id;
                tmpInfo.name = user.name;
                tmpInfo.realname = user.realname;
                tmpInfo.editcount = user.editcount;
                tmpInfo.groups = user.groups;
            }
            if (achievement) {
                tmpInfo.achievement = achievement.titlename;
                tmpInfo.achievementDesc = achievement.titledesc;
            }
        }
    } catch (error) {
        console.error('获取用户信息失败:', error);
    }
    loading.value = false;
    emit('update:userInfo', tmpInfo);
}

const onParseRealName = async (realName) => {
    try {
        const result = await parseWikiText(realName);
        if (result.parse && result.parse.text) {
            let name = result.parse.text;
            if (name) {
                // 去除<p></p>
                name = name.replace('<p>', '').replace('</p>', '');
                return name;
            }
        }
        return realName;
    } catch (error) {
        console.error('解析昵称失败:', error);
    }
    return realName;
}

onMounted(() => {
    onChangeUserInfo();
})

</script>
<style lang="scss" scoped>
.user-info-card {
    width: 380px;
    height: 100px;
    display: flex;
    background: #ffffff;
    overflow: hidden;
}

.left-section {
    flex: 4;
    display: flex;
    align-items: center;

    .avatar-part {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        // 头像抖动动画
        .shake {
            animation: avatar-shake 0.6s ease-in-out;
        }
    }

    .info-part {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .username {
            font-size: 15px;
            font-weight: 600;
            color: #111;
            cursor: pointer;
        }

        .nickname {
            font-size: 12px;
            color: #666;
        }

        .achievement {
            font-size: 11px;
            color: #999;
        }
    }
}

.right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 14px;
    border-left: 1px solid #f0f0f0;

    .item {
        text-align: right;

        .label {
            font-size: 11px;
            color: #777;
        }

        .value {
            font-size: 13px;
            font-weight: 500;
            color: #111;
        }
    }
}

@keyframes avatar-shake {

    0%,
    100% {
        transform: rotate(0deg);
    }

    12.5% {
        transform: rotate(-8deg);
    }

    25% {
        transform: rotate(8deg);
    }

    37.5% {
        transform: rotate(-6deg);
    }

    50% {
        transform: rotate(6deg);
    }

    62.5% {
        transform: rotate(-4deg);
    }

    75% {
        transform: rotate(4deg);
    }

    87.5% {
        transform: rotate(-2deg);
    }
}


@media (prefers-color-scheme: dark) {

    .user-info-card {
        background: #1a1a1a;
        box-shadow: none;
    }

    .left-section {
        .info-part {
            .username {
                color: #ffffff; // 纯白，最清晰
            }

            .nickname {
                color: #cccccc; // 浅灰，不刺眼
            }

            .achievement {
                color: #999999; // 更浅的灰，次要信息
            }
        }
    }

    .right-section {
        border-color: #383838;

        .item {
            .label {
                color: #aaaaaa;
            }

            .value {
                color: #ffffff;
            }
        }
    }
}
</style>