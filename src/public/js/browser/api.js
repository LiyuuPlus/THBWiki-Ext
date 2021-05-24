/** 本文件为封装的浏览器API，方便移植使用 */

/** 获得当前语言 */
var getBrowserLang = () => (navigator.language || navigator.browserLanguage).toLowerCase();

/** 创建标签 */
var createTab = (newUrl) => {
    chrome.tabs.create({ url: newUrl });
}

/** 获得cookie */
var getCookies = (domain, name) => {
    return new Promise((res, rej) => {
        chrome.cookies.get({ "url": domain, "name": name }, (cookie) => {
            if (cookie && cookie.value) {
                res(cookie.value);
            }
            rej();
        });
    });
}

/** 获得i18n语言 */
var getLang = (name, arg) => {
    return (arg ? chrome.i18n.getMessage(name, arg) : chrome.i18n.getMessage(name)) || '';
}

/** 获取所有选项卡信息 */
var getAllTabId = (cb) => {
    var windowTabs = [];
    chrome.windows.getAll((window) => {
        window.forEach((win, i) => {
            chrome.tabs.query({ windowId: win.id }, (tabs) => {
                if (tabs.length > 0) {
                    tabs.forEach(tab => {
                        windowTabs.push({ id: tab.id, url: tab.url });
                    });
                }
                if (i == window.length - 1) {
                    cb(windowTabs);
                }
            });
        });
    });
}

/** 取得BadgeIcon */
var getBadgeLogo = (login = false, tabId = false) => {
    if (login) {
        if (tabId) {
            return CsiteInTHBLogo;
        }
        else {
            return CsiteLoginLogo;
        }
    }
    else {
        return CsiteNoLoginLogo;
    }
}

/** 设置Badge */
var setBadge = (login, text = null) => {
    if (text != null) {
        chrome.browserAction.setBadgeText({ text: text });
    }
    chrome.browserAction.setTitle({ title: `${getLang("extName")}` });
    chrome.browserAction.setIcon({ path: getBadgeLogo(login, false) });
    getAllTabId((res) => {
        var thbTabs = res.filter(v => v.url.indexOf("thwiki.cc") >= 0);
        thbTabs.forEach(tab => {
            chrome.browserAction.setTitle({ title: `${getLang("extName")} - ${getLang("currTHB")}`, tabId: tab.id });
            chrome.browserAction.setIcon({ path: getBadgeLogo(login, true), tabId: tab.id });
        });
    })
}