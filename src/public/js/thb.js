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
                uselang: "zh",
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
                                    body: "你有" + ncount + "条未读信息",
                                    icon: "../public/images/logo-128.png",
                                    tag: "THBWiki",
                                    renotify: true
                                };
                                new Notification("来自THBWiki的信息", options);
                            }
                            chrome.browserAction.setBadgeText({ text: String(ncount) });
                        });
                    }
                }
            },
            fail: () => {
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
                uselang: "zh",
                notfilter: "!read"
            },
            dataType: 'json',
            success: (result) => {
                res(result);
            },
            fail: () => {
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
                uselang: "zh",
                notfilter: "read"
            },
            dataType: 'json',
            success: (result) => {
                res(result);
            },
            fail: () => {
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
                uselang: "zh",
                notfilter: "read"
            },
            dataType: 'json',
            success: (result) => {
                res(result);
            },
            fail: () => {
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
            fail: () => {
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
                fail: () => {
                    rej();
                }
            });
        }).catch(()=>{
            rej();
        })
    });
}