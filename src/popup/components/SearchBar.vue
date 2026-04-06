<template>
    <a-auto-complete v-model:value="value" :options="options" style="width: 100%;" @select="onSelect" @search="onSearch">
        <template #option="item">
            <div class="name" v-html="item.label" :title="item.value"></div>
            <span class="content" v-text="item.content" :title="item.content"></span>
        </template>
        <a-input-search size="large" placeholder="请输入搜索内容" enter-button>
        </a-input-search>
    </a-auto-complete>
</template>
<script setup>
import { ref } from 'vue';
import { openNewTab } from '@/api/browser';
import { searchSuggest, getTHBPageUrl } from '@/api/thwiki';

const value = ref('');
const options = ref([]);

const onSearch = async (searchText) => {
    let opList = [];
    if (searchText) {
        try {
            const result = await searchSuggest(searchText);
            if (result) {
                let nresult = [];
                const resultKey = result[0];
                const resultName = result[1];
                const resultContent = result[2];
                const resultUrl = result[3];
                resultName.map((v, i) => {
                    let name = resultName[i];
                    name = name.replace(
                        new RegExp(resultKey, "gi"),
                        `<font color='#f2b040'>$&</font>`
                    );
                    const info = {
                        label: name,
                        value: resultName[i],
                        content: resultContent[i],
                        url: resultUrl[i],
                    };
                    nresult.push(info);
                });
                opList = nresult;
            }
        }
        catch (error) {
            opList = [];
        }
        if (!opList.some(v => v.value == searchText)) {
            opList.push({
                label: `<font color='#f2b040'>${searchText}</font>`,
                value: searchText,
                content: `搜索 "${searchText}"`,
                url: getTHBPageUrl(searchText),
            })
        }
    } else {
        opList = [];
    }
    options.value = opList;
};

const onSelect = (value, option) => {
    openNewTab(option.url);
};

</script>
<style scoped></style>