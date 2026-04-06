/**
 * 获取浏览器语言
 * @returns {string} 浏览器语言代码（小写）
 */
export const getBrowserLang = () => (navigator.language || navigator.browserLanguage).toLowerCase();

/**
 * 获取扩展版本
 * @returns {string} 扩展版本号
 */
export const getExtensionVersion = () => {
    try {
        const manifest = chrome.runtime.getManifest();
        return manifest.version;
    } catch (error) {
        console.error('获取扩展版本失败:', error);
        return '0.0.0'; // 默认版本号
    }
};

/**
 * 打开新标签页
 * @param {string} url - 要打开的URL
 */
export const openNewTab = (url) => {
    if (chrome && chrome.tabs) {
        chrome.tabs.create({ url });
    } else {
        window.open(url, '_blank');
    }
};

/**
 * 获取指定翻译文本
 * @param {string} key - 翻译文本的键
 * @returns {string} 对应的翻译文本
 */
export const getMessage = (key) => {
    if (chrome && chrome.i18n) {
        return chrome.i18n.getMessage(key);
    } else {
        console.warn('i18n API 不可用，无法获取翻译文本');
        return key; // 返回键作为默认文本
    }
};

/**
 * 获得指定站点的Cookie
 * @param {string} domain - 站点域名
 * @param {string} name - Cookie名称
 * @returns {string} Cookie字符串
 */
export const getCookie =  async (domain, name) => {
    if (chrome && chrome.cookies) {
        const res = await chrome.cookies.get({ url: domain, name: name });
        return decodeURIComponent(res.value);
    }
    else {
        console.warn('Cookie API 不可用，无法获取Cookie');
        return '';
    }
};

/**
 * 获得浏览器存储
 * @param {string} name - 存储名称
 * @returns {object} 浏览器存储对象
 */
export const getStorage = (name) => {
    if (chrome && chrome.storage) {
        return chrome.storage.local.get(name);
    }
    else {
        console.warn('Storage API 不可用，无法获取浏览器存储');
        return {};
    }
};

/**
 * 设置浏览器存储
 * @param {string} name - 存储名称
 * @param {object} value - 存储值
 * @returns {object} 浏览器存储对象
 */
export const setStorage = (name, value) => {
    if (chrome && chrome.storage) {
        chrome.storage.local.set({ [name]: value });
    }
    else {
        console.warn('Storage API 不可用，无法设置浏览器存储');
    }
};
