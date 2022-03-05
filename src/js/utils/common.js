import { getBrowserLang } from '../browser/api'

export const apiurl = "https://www.alicem.top/thbapi/";
export const CsiteUrl = "https://thwiki.cc";
export const CsiteApiUrl = "https://thwiki.cc/api.php";

export const CsiteNoLoginLogo = "/icons/logo-32-bw.png";
export const CsiteLoginLogo = "/icons/logo-32.png";
export const CsiteInTHBLogo = "/icons/logo-32-thb.png";

/** 加载语言列表 */
const localMap = {
  "en-us": "en",
  "en-gb": "en",
  "zh-cn": "zh",
  "zh-tw": "zh",
  "zh-hk": "zh",
  "ja": "ja",
};

/** 查询参数类 */
export class QueryString {
  constructor() {
    let aPairs, aTmp;
    let queryString = new String(window.location.search);
    queryString = queryString.substring(1, queryString.length);
    aPairs = queryString.split("&");
    this.data = {};
    for (let i = 0; i < aPairs.length; i++) {
      aTmp = aPairs[i].split("=");
      this.data[aTmp[0]] = aTmp[1];
    }
  }
  GetValue(key) {
    return this.data[key];
  }
}

/** 格式化数字时间 */
const dateFormat = (timeStr) => {
  return (
    timeStr.substring(0, 4) +
    "-" +
    timeStr.substring(4, 6) +
    "-" +
    timeStr.substring(6, 8)
  );
};

/** 格式化Date对象 */
const Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
  };
  if (/(y+)/.test(fmt)) {
    //根据y的长度来截取年
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};

const addDays = function (number) {
  return new Date(this.getTime() + number * 24 * 60 * 60 * 1000);
};

const getMonthFirstDay = function () {
  return new Date(
    this.getFullYear(),
    this.getMonth(),
    1
  );
};

const getMonthLastDay = function () {
  let currentMonth = this.getMonth();
  return new Date(
    this.getFullYear() + (currentMonth + 1 > 11 ? 1 : 0),
    currentMonth + 1 > 11 ? 1 : currentMonth + 1,
    1
  ).addDays(-1);
};

Date.prototype.Format = Format;
Date.prototype.addDays = addDays;
Date.prototype.getMonthFirstDay = getMonthFirstDay;
Date.prototype.getMonthLastDay = getMonthLastDay;

/** 时间戳格式化 */
const timestampFormat = (timestamp) => {
  return new Date(parseInt(timestamp) * 1000).Format("yyyy-MM-dd");
};

/** 获得当前语言 */
const vLang = () => {
  let tmpLang = getBrowserLang();
  return localMap[tmpLang] || tmpLang;
};

/** 赋值到剪贴板 */
const copyToClipboardText = (txt) => {
  let el = document.createElement("textarea");
  el.value = txt;
  el.setAttribute("readonly", "readonly");
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  let res = document.execCommand("copy");
  document.body.removeChild(el);
  return res;
};

/** 在textarea中插入文字 */
const insertText = (obj, str) => {
  if (obj) {
    let curPos = obj.selectionStart;
    let oldStr = obj.value;
    let tmp1 = oldStr.substring(0, curPos);
    let tmp2 = oldStr.substring(curPos, oldStr.length);
    obj.value = tmp1 + str + tmp2;
  }
  return false;
};

/** 将json数组指定键的值转成数组 */
const getJsonValToArray = (json, key) => {
  let newArray = [];
  json.forEach((v) => {
    newArray.push(v[key]);
  });
  return newArray;
};

/** 将json数组指定键数组的值转成数组 */
const getJsonValToArray2 = (json, keyArr, filter = []) => {
  let newArray = [];
  json.forEach((v) => {
    for (let i = 0; i < keyArr.length; i++) {
      let v1 = keyArr[i];
      let val = v[v1];
      if (v[v1]) {
        filter.forEach((v2) => {
          val = val.replace(v2, "");
        });
        newArray.push(val);
        break;
      }
    }
  });
  return newArray;
};

export { timestampFormat, copyToClipboardText, insertText, getJsonValToArray, getJsonValToArray2, vLang, Format, addDays, getMonthFirstDay, getMonthLastDay }