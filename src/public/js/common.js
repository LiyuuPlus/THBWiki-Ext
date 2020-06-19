const CsiteUrl = "https://thwiki.cc";
const CsiteApiUrl = "https://thwiki.cc/api.php";

const CsiteNoLoginLogo = "/public/images/logo-32-bw.png";
const CsiteLoginLogo = "/public/images/logo-32.png";

const localMap = {
  "en-us": "en",
  "en-gb": "en",
  "zh-cn": "zh",
  "zh-tw": "zh",
  "zh-hk": "zh",
};
var Vlang = (navigator.language || navigator.browserLanguage).toLowerCase();
Vlang = localMap[Vlang] || Vlang;

var createTab = (newUrl) => {
  chrome.tabs.create({ url: newUrl });
}

var getCookies = (domain, name) => {
  return new Promise((res, rej) => {
    chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
      if (cookie && cookie.value) {
        res(cookie.value);
      }
      rej();
    });
  });
}

var dateFormat = (timeStr) => {
  return timeStr.substring(0, 4) + "-" + timeStr.substring(4, 6) + "-" + timeStr.substring(6, 8);
}

var getLang = (name,arg) => {
  return (arg ? chrome.i18n.getMessage(name,arg) : chrome.i18n.getMessage(name)) || '';
}