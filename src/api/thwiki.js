import { getBrowserLang, getCookie, setStorage } from './browser';
import { Request } from '../utils/request';
const thbSiteUrl = 'https://thwiki.cc';
const thbAvatarUrl = 'https://avatar.thbwiki.cc';
const thbApiUrl = `${thbSiteUrl}/api.php`;

// 将浏览器语言代码映射到mediawiki API的语言参数
const langMap = {
    "en-us": "en",
    "en-gb": "en",
    "zh-cn": "zh",
    "zh-tw": "zh",
    "zh-hk": "zh",
    "ja": "ja",
};

const vLang = langMap[getBrowserLang()] || 'zh'; // 默认使用中文
const request = new Request(thbApiUrl);

/**
 * 检查是否登录
 * @returns {boolean} 是否登录
 */
export const checkLogin = async () => {
    // 从cookie里获取用户ID
    const userID = await getCookie(thbSiteUrl, 'thwikicc_wikiUserID');
    if (userID) {
        // 从cookie里获取用户名
        const userName = await getCookie(thbSiteUrl, 'thwikicc_wikiUserName');
        if (userName) {
            // 这里可以做存储用户信息的操作
            setStorage('userInfo', { id: userID, name: userName });
            return true;
        }
    }
    return false;
}

/**
 * 获取用户信息
 * @param {string} uiprop 需要获取的用户信息属性，默认包含编辑计数、真实姓名和用户组
 * @returns {Promise} 包含用户信息的 Promise 对象
 */
export const getUserInfo = (uiprop = "editcount|realname|groups") => {
    const data = {
        action: "query",
        format: "json",
        formatversion: 2,
        meta: "userinfo|achievementinfo",
        uselang: vLang,
        uiprop: uiprop,
        aiprop: "titlename|titledesc",
    };
    return request.get('', data);
};

/**
 * 获取用户头像
 * @param {string} userId 用户ID，如果未提供则返回默认头像URL
 * @returns {string} 用户头像URL
 */
export const getUserAvatar = (userId) => {
    // thbwiki的头像URL格式
    return `${thbAvatarUrl}/thwikicc_wiki_${userId ? userId : 'default'}_l.jpg`;
}

/**
 * 获取THBWiki页面URL
 * @param {string} pageTitle 页面标题
 * @returns {string} 页面URL
 */
export const getTHBPageUrl = (pageTitle) => {
    let url = `${thbSiteUrl}`;
    if (pageTitle) {
        url += `/${encodeURIComponent(pageTitle)}`;
    }
    return url;
}

/**
 * 解析Wiki文本
 * @param {string} wikiText Wiki文本
 * @returns {Promise} 包含解析结果的 Promise 对象
 */
export const parseWikiText = (wikiText) => {
    const data = {
        action: "parse",
        format: "json",
        text: wikiText,
        prop: "text",
        formatversion: 2,
        wrapoutputclass: "",
        disablelimitreport: 1,
        disableeditsection: 1,
        preview: 1,
        disabletoc: 1,
        utf8: 1,
        contentmodel: "wikitext"
    };
    return request.get('', data);
}

export const searchSuggest = (searchText) => {
    const data = {
        action: "opensearch",
        format: "json",
        formatversion: 2,
        redirects: "display",
        search: searchText,
        namespace: "0|2|4|8|10|12|102|108|200|506|508|512",
        limit: 12,
        suggest: true,
        uselang: vLang,
    };
    return request.get('', data);
}