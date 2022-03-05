# Unofficial THBWiki Chrome Extension

非官方的THBWiki Chrome扩展

`此为重构版`

* 原版：[Chrome应用商店地址](https://chrome.google.com/webstore/detail/thbwiki-ext/calbmbmnknigdlkgioncbphnlelogplc)
* 新版：[Chrome应用商店地址](https://chrome.google.com/webstore/detail/%E6%88%91%E7%9A%84thbwiki/lnkednmkgfdplofejofihipleepenmcg) | [Edge应用商店地址](https://microsoftedge.microsoft.com/addons/detail/%E6%88%91%E7%9A%84thbwiki/kedhgbnbdipdblihompogcbbodbagfng)（本扩展）

## 基于旧版扩展重构内容

* 替换Jquery渲染页面，改使用Vue渲染页面
* 使用element-ui替代bootstrap
* 使用ES6语法
* 解决乱码问题

## 功能

* √ 已完成 / … 进行中 / 〇 排期中 / × 已失效

| 进度 | 所属状态 | 功能名称 | 说明 | 所属分类 |
| -- | -- | -- | -- | -- |
| √ | 不变动 | 多语言支持 | 根据浏览器语言为用户提供对应语言的选项 | popup |
| … | 重构 | 未读列表 | 可显示未读通知列表。 | popup |
| … | 重构 | 标记已读 | 对未读通知进行单个或全部标记已读 | popup |
| … | 重构 | 便捷搜索框 | 支持搜索联想的便捷搜索 | popup |
| × | 移除 | THB官作发布日历 | 显示官作发布时间的日历<br><br><small><b>已被事件日历取代</b></small> | popup |
| 〇 | 重构 | 原曲信息查询 | 支持通过歌名进行查询所使用的原曲以及完整信息 | popup |
| ? | 待定 | THB事件日历 | 显示东方活动大事件的日历<br><br><small><b>本人已在THB首页添加了，官方逼死同人（？）</b></small> | popup |
| 〇 | 重构 | 右键菜单 | 右键对选取文本使用THBWiki搜索或跳转至指定词条 | background |
| 〇 | 重构 | 地址栏搜索 | 地址栏输入thb，按Tab后可使用THBWiki进行搜索。 | background |
| 〇 | 重构 | 未读通知 | 自动更新未读通知并进行提醒 | background |
| 〇 | 重构 | 页面美化-背景 | 支持自定义或随机东方壁纸作为THB背景 | inject |
| × | 移除 | 页面美化-头图 | 支持自定义THB首页头图<br><br><small><b>（THB已移除头图）</b></small> | inject |
| 〇 | 重构 | 页面美化-标签 | 支持词条名旁边高亮美化词条类型标签 | inject |
| 〇 | 重构 | 页面美化-复制短网址 | 支持将原有的复制短网址按钮美化醒目 | inject |
| 〇 | 重构 | 页面工具-网易云歌词一键搬运 | 支持在歌词编辑页面一键获取对应歌曲的歌词并且填入编辑框 | inject |
| 〇 | 重构 | 页面工具-哔哩哔哩BV号转AV号 | 支持在编辑页对哔哩哔哩BV号进行转换成AV号 | inject |
| × | 移除 | 页面工具-InPageEditv2 | 支持载入IPE来扩展THB编辑体验<br><br><small><b>THB已支持该工具，直接在个人设置的小工具里启用</b></small> | inject |
| 〇 | 重构 | 页面工具-个人JS | 支持载入用户页下的common.js进行全站脚本注入<br><br><small><b>2023年以后可能会删除，参考1.1</b></small>  | inject |
| 〇 | 新增 | 页面工具-个人CSS | 支持载入用户页下的common.css进行全站样式注入<br><br><small><b>2023年以后可能会删除，参考1.1</b></small> | inject |
| √ | 新增 | 组件分离 | 通过动态组件方式加载扩展功能，降低耦合性和屎山 | 扩展 |
| √ | 新增 | 函数渲染 | 通过Render函数进行渲染扩展页面<br><br><small><b>原因参考1.2</b></small>  | 扩展 |

* 1.1：根据Chrome扩展V3版本规范，扩展将不再允许对网页进行直接注入操作，这将导致扩展无法获得对网页进行修改，从而无法直接使用mw.Api进行操作
* 1.2：根据Chrome扩展V3版本规范，扩展将不再允许使用eval等不安全函数，Vue.js的template正是使用了该函数进行计算渲染，因此本扩展改用CLI进行编译扩展，CLI将会自动转换成Render函数渲染，避免使用eval。

## 隐私声明

* [点击查看](PrivacyPolicy.md)

## 预览

### 中文版

![Image text](master.png)

### 英文版

![Image text](master_EN.png)
