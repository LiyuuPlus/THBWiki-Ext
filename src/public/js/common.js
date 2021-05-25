const apiurl = "https://www.alicem.top/thbapi/";
const CsiteUrl = "https://thwiki.cc";
const CsiteApiUrl = "https://thwiki.cc/api.php";

const CsiteNoLoginLogo = "/public/images/logo-32-bw.png";
const CsiteLoginLogo = "/public/images/logo-32.png";
const CsiteInTHBLogo = "/public/images/logo-32-thb.png";

/** 加载语言列表 */
const localMap = {
    "en-us": "en",
    "en-gb": "en",
    "zh-cn": "zh",
    "zh-tw": "zh",
    "zh-hk": "zh",
};

/** 获得当前语言 */
var Vlang = getBrowserLang();
Vlang = localMap[Vlang] || Vlang;

/** 格式化数字时间 */
var dateFormat = (timeStr) => {
    return timeStr.substring(0, 4) + "-" + timeStr.substring(4, 6) + "-" + timeStr.substring(6, 8);
}

/** 格式化Date对象 */
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

/** 时间戳格式化 */
var timestampFormat = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).Format("yyyy-MM-dd");
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

var insertText = (obj, str) => {
    if (obj) {
        let curPos = obj.selectionStart;
        let oldStr = obj.value;
        let tmp1 = oldStr.substring(0, curPos);
        let tmp2 = oldStr.substring(curPos, oldStr.length);
        obj.value = tmp1 + str + tmp2;
        console.log(tmp1 + str + tmp2);
    }
    return false;
}

/** 将json数组指定键的值转成数组 */
var getJsonValToArray = (json, key) => {
    var newArray = [];
    json.forEach(v => {
        newArray.push(v[key]);
    });
    return newArray;
}

/** 将json数组指定键数组的值转成数组 */
var getJsonValToArray2 = (json, keyArr, filter = []) => {
    var newArray = [];
    json.forEach(v => {
        for (var i = 0; i < keyArr.length; i++) {
            var v1 = keyArr[i];
            var val = v[v1];
            if (v[v1]) {
                filter.forEach(v2 => {
                    val = val.replace(v2, "");
                });
                newArray.push(val);
                break;
            }
        }
    });
    return newArray;
}

/** 查询参数类 */
class QueryString {
    constructor() {
        var aPairs, aTmp;
        var queryString = new String(window.location.search);
        queryString = queryString.substr(1, queryString.length);
        aPairs = queryString.split("&");
        this.data = {};
        for (var i = 0; i < aPairs.length; i++) {
            aTmp = aPairs[i].split("=");
            this.data[aTmp[0]] = aTmp[1];
        }
    }
    GetValue(key) {
        return this.data[key];
    }
}