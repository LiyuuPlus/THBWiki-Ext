import { getCookies, setLocalStorage, setBadge } from '../browser/api'
import http from '../utils/http'
import { CsiteApiUrl, CsiteUrl, vLang } from '../utils/common'

/** 检查登录 */
const checkLogin = (cb) => {
    getCookies(CsiteUrl, "thwikicc_wikiUserID")
        .then((res) => {
            getCookies(CsiteUrl, "thwikicc_wikiUserName")
                .then((res2) => {
                    setBadge(true);
                    setLocalStorage(
                        { user: { wikiUserID: res, wikiUserName: res2 } },
                        null
                    );
                    cb(res2);
                })
                .catch((ex1) => {
                    console.log(ex1);
                    setBadge(false, "");
                    cb(null);
                });
        })
        .catch((ex) => {
            console.log(ex);
            setBadge(false, "");
            cb(null);
        });
};

/** 获得用户信息 */
const getUserInfo = (uiprop = "editcount|registrationdate|realname|groups") => {
    return new Promise((res, rej) => {
        http.get(CsiteApiUrl, {
            action: "query",
            format: "json",
            formatversion: 2,
            meta: "userinfo|achievementinfo",
            uselang: vLang,
            uiprop: uiprop,
            aiprop: "titlename|titledesc",
        }).then((ret) => {
            res(ret.query)
        }).catch(() => {
            rej([]);
        });
    });
};

/** 解析WIKI文本 */
const getWikiParseText = (page) => {
    return new Promise((res, rej) => {
        http.get(CsiteApiUrl, {
            action: "parse",
            format: "json",
            formatversion: 2,
            page: page,
            prop: "text",
            wrapoutputclass: "",
            disablelimitreport: 1,
            disableeditsection: 1,
            preview: 1,
            disabletoc: 1,
            utf8: 1,
        }).then((ret) => {
            var nresult = ret.parse.text.replace("<p>", "").replace("</p>", "");
            res(nresult);
        }).catch(() => {
            rej([]);
        });
    });
};

/** 获得原始WIKI文本 */
const getWikiRawText = (page) => {
    return new Promise((res, rej) => {
        http.get(`${CsiteUrl}/${page}`, {
            action: "raw",
            ctype: "application/json",
        }).then((ret) => {
            res(ret);
        }).catch(() => {
            rej([]);
        });
    });
};

var searchSuggest = (key) => {
    return new Promise((res, rej) => {
        http.get(CsiteApiUrl, {
            action: "opensearch",
            format: "json",
            formatversion: 2,
            redirects: "display",
            search: key,
            namespace: "0|2|4|8|10|12|102|108|200|506|508|512",
            limit: 12,
            suggest: true,
            uselang: vLang,
        }).then((ret) => {
            let newResult = [];
            let resultKey = ret[0];
            let resultName = ret[1];
            let resultContent = ret[2];
            let resultUrl = ret[3];
            resultName.map((v, i) => {
                var info = {
                    name: resultName[i],
                    content: resultContent[i],
                    url: resultUrl[i],
                };
                newResult.push(info);
            });
            res(newResult);
        }).catch(() => {
            rej([]);
        });
    });
};

export { checkLogin, getUserInfo, getWikiParseText, getWikiRawText, searchSuggest }