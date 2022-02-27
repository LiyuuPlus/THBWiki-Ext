/** 本文件为封装的浏览器API，方便移植使用 */

import { CsiteInTHBLogo, CsiteLoginLogo, CsiteNoLoginLogo } from "../utils/common";

/** 获得当前语言 */
const getBrowserLang = () =>
  (navigator.language || navigator.browserLanguage).toLowerCase();

/** 创建标签 */
const createTab = (newUrl) => {
  chrome.tabs.create({ url: newUrl });
};

/** 获得cookie */
const getCookies = (domain, name) => {
  return new Promise((res, rej) => {
    chrome.cookies.get({ url: domain, name: name }, (cookie) => {
      if (cookie && cookie.value) {
        res(cookie.value);
      }
      rej();
    });
  });
};

/** 获得扩展相对地址 */
const getExtURL = (url) => {
  return chrome.runtime.getURL(url);
};

/** 获得本地存储 */
const getLocalStorage = (options) => {
  return new Promise((res) => {
    chrome.storage.local.get(options, (storage) => {
      res(storage);
    });
  });
};

/** 设置本地存储 */
const setLocalStorage = (options) => {
  return new Promise((res) => {
    chrome.storage.local.set(options, () => {
      res();
    });
  });
};

/** 获得i18n语言 */
const getLang = (name, arg) => {
  return (
    (arg ? chrome.i18n.getMessage(name, arg) : chrome.i18n.getMessage(name)) ||
    ""
  );
};

/** 获取所有选项卡信息 */
const getAllTabId = (cb) => {
  const windowTabs = [];
  chrome.windows.getAll((window) => {
    window.forEach((win, i) => {
      chrome.tabs.query({ windowId: win.id }, (tabs) => {
        if (tabs.length > 0) {
          tabs.forEach((tab) => {
            windowTabs.push({ id: tab.id, url: tab.url });
          });
        }
        if (i == window.length - 1) {
          cb(windowTabs);
        }
      });
    });
  });
};

/** 取得BadgeIcon */
const getBadgeLogo = (login = false, tabId = false) => {
  if (login) {
    if (tabId) {
      return CsiteInTHBLogo;
    } else {
      return CsiteLoginLogo;
    }
  } else {
    return CsiteNoLoginLogo;
  }
};

const getBadgeText = (details) => {
  return new Promise((res) => {
    chrome.browserAction.getBadgeText(details, (text) => {
      res(text);
    });
  });
};

/** 设置Badge */
const setBadge = (login, text = null) => {
  if (text != null) {
    chrome.browserAction.setBadgeText({ text: text });
  }
  chrome.browserAction.setTitle({ title: `${getLang("extName")}` });
  chrome.browserAction.setIcon({ path: getBadgeLogo(login, false) });
  getAllTabId((res) => {
    const thbTabs = res.filter((v) => v.url.indexOf("thwiki.cc") >= 0);
    thbTabs.forEach((tab) => {
      chrome.browserAction.setTitle({
        title: `${getLang("extName")} - ${getLang("currTHB")}`,
        tabId: tab.id,
      });
      chrome.browserAction.setIcon({
        path: getBadgeLogo(login, true),
        tabId: tab.id,
      });
    });
  });
};
export { createTab, getLang, getCookies, getLocalStorage, setLocalStorage, getExtURL, getBrowserLang, getBadgeText, setBadge }