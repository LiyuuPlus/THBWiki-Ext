<template>
  <div class="popup">
    <UserInfo :extVersion="extensionVersion" v-model:userInfo="userInfo" />
    <SearchBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { getExtensionVersion, getStorage } from '@/api/browser';
import { checkLogin } from '@/api/thwiki';

import UserInfo from './components/UserInfo.vue'
import SearchBar from './components/SearchBar.vue'

const extensionVersion = ref('0.0.0');

const userInfo = ref({
  id: 0,
  name: '',
  realname: '',
  achievement: '',
  groups: [],
  groupName: '',
  editcount: 0,
});

onMounted(async () => {
  extensionVersion.value = getExtensionVersion();
  if (checkLogin()) {
    const tmpInfo = await getStorage('userInfo');
    if (tmpInfo && tmpInfo.userInfo) {
      userInfo.value = { ...userInfo.value, ...tmpInfo.userInfo };
    }
  }
})


</script>
<style lang="scss">
body {
  background-color: #fff;
}

.inside {
  cursor: default !important;
  transition: background-color 500ms, color 500ms;

  &:not(:hover):not(:active) {
    color: transparent !important;
    background-color: #000 !important;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #1e1e1e;
  }

  .ant-message-notice-content {
    background-color: #1a1a1a !important;
    color: #ffffff !important;
    border: 1px solid #3a3a3a !important;
  }

  .ant-skeleton-element .ant-skeleton-image,
  .ant-skeleton-paragraph li,
  .ant-skeleton-title {
    background: #333 !important;
  }

  .ant-skeleton-avatar {
    background: #3a3a3a !important;
  }

  /* 动画也改成暗色 */
  .ant-skeleton-paragraph li::after,
  .ant-skeleton-title::after,
  .ant-skeleton-avatar::after,
  .ant-skeleton-image::after {
    background: linear-gradient(90deg,
        #333,
        #444,
        #333) !important;
  }

  .inside {
    &:not(:hover):not(:active) {
      background-color: #ccc !important;
    }
  }

  /* 输入框 */
  .ant-select-auto-complete .ant-select-selector {
    background-color: #1a1a1a !important;
    color: #ffffff !important;
    border-color: #3a3a3a !important;
  }

  /* 输入框文字 */
  .ant-select-auto-complete .ant-select-selection-search-input {
    color: #ffffff !important;
  }

  /* placeholder */
  .ant-select-auto-complete .ant-select-selection-placeholder {
    color: #888888 !important;
    opacity: 1 !important;
  }

  /* 下拉面板 */
  .ant-select-dropdown {
    background-color: #242424 !important;
    border-color: #3a3a3a !important;
  }

  /* 下拉选项 */
  .ant-select-dropdown .ant-select-item {
    background-color: #242424 !important;
    color: #e0e0e0 !important;
  }

  /* 悬浮 */
  .ant-select-dropdown .ant-select-item:hover {
    background-color: #3a3a3a !important;
  }

  /* 选中 */
  .ant-select-dropdown .ant-select-item-selected {
    background-color: #1668dc !important;
    color: #fff !important;
  }

  /* 外层 */
  .ant-input-search.ant-input-affix-wrapper {
    background-color: #1a1a1a !important;
    border-color: #3a3a3a !important;
  }

  /* 输入框文字 */
  .ant-input-search .ant-input {
    background: transparent !important;
    color: #ffffff !important;
  }

  /* placeholder */
  .ant-input-search .ant-input::placeholder {
    color: #888 !important;
    opacity: 1 !important;
  }

  /* 搜索图标 */
  .ant-input-search .ant-input-search-icon {
    color: #aaa !important;
  }

  /* 聚焦状态 */
  .ant-input-search.ant-input-affix-wrapper:focused {
    border-color: #1668dc !important;
    box-shadow: 0 0 0 2px rgba(22, 104, 220, 0.2) !important;
  }

  /* 悬浮状态 */
  .ant-input-search.ant-input-affix-wrapper:hover {
    border-color: #555 !important;
  }
}
</style>
<style lang="scss" scoped>
.popup {
  background-color: #fff;
  width: 380px;
  height: 500px;
}

@media (prefers-color-scheme: dark) {
  .popup {
    background-color: #1e1e1e;
  }
}
</style>