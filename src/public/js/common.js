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

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds() //秒 
    };
    if (/(y+)/.test(fmt)) { //根据y的长度来截取年
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
}

var timestampFormat = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).Format("yyyy-MM-dd");
}

var getLang = (name, arg) => {
    return (arg ? chrome.i18n.getMessage(name, arg) : chrome.i18n.getMessage(name)) || '';
}

var copyToClipboardText = (txt) => {
    const el = document.createElement("textarea");
    el.value = txt;
    el.setAttribute("readonly", "readonly");
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    let res = document.execCommand("copy");
    document.body.removeChild(el);
    return res;
}