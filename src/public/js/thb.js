var checkLogin = (cb) => {
    getCookies(CsiteUrl, "thwikicc_wikiUserID").then(() => {
        getCookies(CsiteUrl, "thwikicc_wikiUserName").then((res2) => {
            chrome.browserAction.setIcon({ path: CsiteLoginLogo });
            cb(res2);
        }).catch(() => {
            chrome.browserAction.setIcon({ path: CsiteNoLoginLogo });
            chrome.browserAction.setBadgeText({ text: "" });
            cb(null);
        });
    }).catch(() => {
        chrome.browserAction.setIcon({ path: CsiteNoLoginLogo });
        chrome.browserAction.setBadgeText({ text: "" });
        cb(null);
    });
}

var checkUnreadNotificationNum = (username) => {
    if (username !== null) {
        $.ajax({
            url: 'https://thwiki.cc/api.php',
            data: {
                action: 'query',
                format: 'json',
                formatversion: 2,
                meta: 'notifications',
                notformat: "model",
                notlimit: 25,
                notprop: 'count',
                uselang: Vlang,
                notfilter: "!read"
            },
            dataType: 'json',
            success: (result) => {
                if (result.query && result.query.notifications) {
                    var ncount = parseInt(result.query.notifications.count);
                    if (ncount == 0) {
                        chrome.browserAction.setBadgeText({ text: "" });
                    } else {
                        chrome.browserAction.getBadgeText({}, res => {
                            let count = res || 0;
                            if (count < ncount) {
                                let options = {
                                    body: getLang("NotificationBody",[ncount]),
                                    icon: "../public/images/logo-128.png",
                                    tag: "THBWiki",
                                    renotify: true
                                };
                                new Notification(getLang("NotificationTtile"), options);
                            }
                            chrome.browserAction.setBadgeText({ text: String(ncount) });
                        });
                    }
                }
            },
            error: () => {
            }
        });
    }
}

var checkUnreadNotification = () => {
    return new Promise((res, rej) => {
        $.ajax({
            url: CsiteApiUrl,
            data: {
                action: "query",
                format: "json",
                formatversion: 2,
                meta: "notifications",
                notformat: "model",
                notlimit: 25,
                notprop: "list|count",
                uselang: Vlang,
                notfilter: "!read"
            },
            dataType: 'json',
            success: (result) => {
                res(result);
            },
            error: () => {
                rej();
            }
        });
    });
}

var checkRemindNotification = () => {
    return new Promise((res, rej) => {
        $.ajax({
            url: 'https://thwiki.cc/api.php',
            data: {
                action: "query",
                format: "json",
                formatversion: 2,
                meta: "notifications",
                notsections: "alert",
                notformat: "model",
                notlimit: 25,
                notprop: "list|count",
                uselang: Vlang,
                notfilter: "read"
            },
            dataType: 'json',
            success: (result) => {
                res(result);
            },
            error: () => {
                rej();
            }
        });
    });
}

var checkMsgNotification = () => {
    return new Promise((res, rej) => {
        $.ajax({
            url: 'https://thwiki.cc/api.php',
            data: {
                action: "query",
                format: "json",
                formatversion: 2,
                meta: "notifications",
                notsections: "message",
                notformat: "model",
                notlimit: 25,
                notprop: "list|count",
                uselang: Vlang,
                notfilter: "read"
            },
            dataType: 'json',
            success: (result) => {
                res(result);
            },
            error: () => {
                rej();
            }
        });
    });
}

var getWIKIActionToken = () => {
    return new Promise((res, rej) => {
        $.ajax({
            url: 'https://thwiki.cc/api.php',
            data: {
                action: "query",
                format: "json",
                formatversion: 2,
                meta: "tokens",
            },
            dataType: 'json',
            success: (result) => {
                let token = result.query.tokens.csrftoken;
                res(token);
            },
            error: () => {
                rej();
            }
        });
    });
}

var markNotification = (list) => {
    return new Promise((res, rej) => {
        getWIKIActionToken().then((token) => {
            $.ajax({
                url: 'https://thwiki.cc/api.php',
                type: "POST",
                data: {
                    action: "echomarkread",
                    token: token,
                    list: list,
                    format: "json",
                    formatversion: 2,
                },
                dataType: "json",
                success: (result) => {
                    res(result);
                },
                error: () => {
                    rej();
                }
            });
        }).catch(()=>{
            rej();
        })
    });
}

var searchSuggest = (key) => {
    return new Promise((res, rej) => {
        $.ajax({
            url: 'https://thwiki.cc/api.php',
            data: {
                action: "opensearch",
                format: "json",
                formatversion: 2,
                redirects: "display",
                search: key,
                namespace: '0|2|4|8|10|12|102|108|200|506|508|512',
                limit: 12,
                suggest: true,
            },
            dataType: 'json',
            success: (result) => {
                let nresult=[];
                let resultKey = result[0];
                let resultName = result[1];
                let resultContent = result[2];
                let resultUrl = result[3];
                resultName.map((v,i)=>{
                  var info={name:resultName[i], content:resultContent[i], url:resultUrl[i]};
                  nresult.push(info)
                });
                res(nresult);
            },
            error: () => {
                rej([]);
            }
        });
    });
}

var searchOrigMusic = (key) => {
    return new Promise((res, rej) => {
        $.ajax({
            url: 'https://thwiki.cc/api.php',
            data: {
                action: "ask",
                format: "json",
                formatversion: 2,
                uselang: Vlang,
                query: `[[${key.replace(/ /g, "_")}]]|?原曲名称|?原曲译名|?原曲首发作品|?原曲首发日期`
            },
            dataType: 'json',
            success: (result) => {
                let nresult={};
                if(result.error)
                {
                    return rej();
                }
                if(typeof(result.query.results) == 'object')
                {
                    nresult=result.query.results[Object.keys(result.query.results)[0]];
                }
                res(nresult);
            },
            error: () => {
                rej();
            }
        });
    });
}