# Unofficial THBWiki Chrome Extension

非官方的THBWiki Chrome扩展

`此为重构版`

* 原版：[Chrome应用商店地址](https://chrome.google.com/webstore/detail/thbwiki-ext/calbmbmnknigdlkgioncbphnlelogplc)
* 新版：[Chrome应用商店地址](https://chrome.google.com/webstore/detail/%E6%88%91%E7%9A%84thbwiki/lnkednmkgfdplofejofihipleepenmcg) | [Edge应用商店地址](https://microsoftedge.microsoft.com/addons/detail/%E6%88%91%E7%9A%84thbwiki/kedhgbnbdipdblihompogcbbodbagfng)（本扩展）

## 基于旧扩展重构内容

* 替换Jquery渲染页面，改使用Vue渲染页面
* 使用element-ui替代bootstrap
* 升级使用ES6语法


## 已实现

* 多语言支持
* 右键使用THBWiki搜索选取文本。
* 地址栏输入thb，按Tab后可使用THBWiki进行搜索。
* 可显示未读通知列表。
* 对通知标记已读。
* 未读通知列表自动更新
* 加入便捷搜索框，支持搜索联想
* THB官作发布日历
* THB页面美化（随机/自定义背景、自定义头图、标签提示、复制链接按钮美化）
* THB小工具：网易云歌词一键搬运、原曲信息查询、哔哩哔哩BV号转AV号
* <del>InPageEdit 扩展支持</del>（可在THB中的参数设置-小工具中开启，本扩展已移除该功能）
* 个人JS/CSS支持

## 计划实现

* <del>日历显示活动以及事件</del>（THB首页已实现，视情况决定是否迁移进来）
* 使用脚手架处理扩展，并且开始尝试兼容V3标准的扩展，Vue渲染换成函数渲染（JSX）

## 预览

### 中文版

![Image text](master.png)

### 英文版

![Image text](master_EN.png)
