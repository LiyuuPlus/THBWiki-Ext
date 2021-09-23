var checkLogin = (cb) => {
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

var checkUnreadNotificationNum = (username) => {
  if (username !== null) {
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
        notfilter: "!read",
      },
      dataType: "json",
      success: (result) => {
        if (result.query && result.query.notifications) {
          var ncount = parseInt(result.query.notifications.count);
          if (ncount == 0) {
            setBadge(true, "");
          } else {
            getBadgeText({}).then((res) => {
              let count = res || 0;
              if (count < ncount) {
                var msg = result.query.notifications.list[0][
                  "*"
                ].header.replace(/<.*?>/g, "");
                var url =
                  result.query.notifications.list[0]["*"].links.primary.url;
                let options = {
                  body: getLang("NotificationBody", [msg, ncount]),
                  icon: "../public/images/logo-128.png",
                  tag: "THBWiki",
                  renotify: true,
                };
                var notification = new Notification(
                  getLang("NotificationTtile"),
                  options
                );
                notification.onclick = function () {
                  createTab(
                    ncount == 1
                      ? url
                      : "https://thwiki.cc/%E7%89%B9%E6%AE%8A:%E9%80%9A%E7%9F%A5"
                  );
                };
              }
              setBadge(true, String(ncount));
            });
          }
        }
      },
      error: () => {},
    });
  }
};

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
        notfilter: "!read",
      },
      dataType: "json",
      success: (result) => {
        res(result);
      },
      error: () => {
        rej();
      },
    });
  });
};

var checkRemindNotification = () => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
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
        notfilter: "read",
      },
      dataType: "json",
      success: (result) => {
        res(result);
      },
      error: () => {
        rej();
      },
    });
  });
};

var checkMsgNotification = () => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
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
        notfilter: "read",
      },
      dataType: "json",
      success: (result) => {
        res(result);
      },
      error: () => {
        rej();
      },
    });
  });
};

var getWIKIActionToken = () => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
      data: {
        action: "query",
        format: "json",
        formatversion: 2,
        meta: "tokens",
      },
      dataType: "json",
      success: (result) => {
        let token = result.query.tokens.csrftoken;
        res(token);
      },
      error: () => {
        rej();
      },
    });
  });
};

var markNotification = (list) => {
  return new Promise((res, rej) => {
    getWIKIActionToken()
      .then((token) => {
        $.ajax({
          url: CsiteApiUrl,
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
          },
        });
      })
      .catch(() => {
        rej();
      });
  });
};

var searchSuggest = (key) => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
      data: {
        action: "opensearch",
        format: "json",
        formatversion: 2,
        redirects: "display",
        search: key,
        namespace: "0|2|4|8|10|12|102|108|200|506|508|512",
        limit: 12,
        suggest: true,
        uselang: Vlang,
      },
      dataType: "json",
      success: (result) => {
        let nresult = [];
        let resultKey = result[0];
        let resultName = result[1];
        let resultContent = result[2];
        let resultUrl = result[3];
        resultName.map((v, i) => {
          var info = {
            name: resultName[i],
            content: resultContent[i],
            url: resultUrl[i],
          };
          nresult.push(info);
        });
        res(nresult);
      },
      error: () => {
        rej([]);
      },
    });
  });
};

var searchOrigMusic = (key) => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
      data: {
        action: "ask",
        format: "json",
        formatversion: 2,
        uselang: Vlang,
        query: `[[${key.replace(
          / /g,
          "_"
        )}]]|?原曲名称|?原曲译名|?原曲首发作品|?原曲首发日期`,
      },
      dataType: "json",
      success: (result) => {
        let nresult = {};
        if (result.error) {
          return rej();
        }
        if (typeof result.query.results == "object") {
          nresult = result.query.results[Object.keys(result.query.results)[0]];
        }
        res(nresult);
      },
      error: () => {
        rej();
      },
    });
  });
};

var getProjectRelaseDate = () => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
      data: {
        action: "ask",
        format: "json",
        formatversion: 2,
        uselang: Vlang,
        query: `[[分类:官方游戏]]|?发售日期|sort=发售日期|order=asc`,
      },
      dataType: "json",
      success: (result) => {
        let nresult = [];
        if (result.error) {
          return rej();
        }
        if (typeof result.query.results == "object") {
          var keys = Object.keys(result.query.results);
          for (var i = 0; i < keys.length; i++) {
            var item = result.query.results[keys[i]];
            var name = item.fulltext;
            var date = item.printouts.发售日期[0]
              ? timestampFormat(item.printouts.发售日期[0].timestamp)
              : "";
            nresult.push({ name, date, type: "release" });
          }
        }
        res(nresult);
      },
      error: () => {
        rej();
      },
    });
  });
};

var getEventDate = (startDate, EndDate) => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
      data: {
        action: "ask",
        format: "json",
        formatversion: 2,
        uselang: Vlang,
        query: `[[事件开始::+]][[事件开始::>${startDate}]][[事件开始::<${EndDate}]]|?事件开始|?事件结束|?事件描述|sort=事件开始|order=asc`,
      },
      dataType: "json",
      success: (result) => {
        let nresult = [];
        if (result.error) {
          return rej();
        }
        if (typeof result.query.results == "object") {
          var keys = Object.keys(result.query.results);
          for (var i = 0; i < keys.length; i++) {
            var item = result.query.results[keys[i]];
            var name = item.printouts.事件描述[0];
            var startDate = item.printouts.事件开始[0]
              ? timestampFormat(item.printouts.事件开始[0].timestamp)
              : "";
            var endDate = item.printouts.事件结束[0]
              ? timestampFormat(item.printouts.事件结束[0].timestamp)
              : "";
            var url = item.fullurl;
            nresult.push({ name, startDate, endDate, url });
          }
        }
        res(nresult);
      },
      error: () => {
        rej();
      },
    });
  });
};

var getUserInfo = (uiprop = "editcount|registrationdate|realname|groups") => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
      data: {
        action: "query",
        format: "json",
        formatversion: 2,
        meta: "userinfo|achievementinfo",
        uselang: Vlang,
        uiprop: uiprop,
        aiprop: "titlename|titledesc",
      },
      dataType: "json",
      success: (result) => {
        res(result.query);
      },
      error: () => {
        rej([]);
      },
    });
  });
};

var getWikiParseText = (page) => {
  return new Promise((res, rej) => {
    $.ajax({
      url: CsiteApiUrl,
      data: {
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
      },
      dataType: "json",
      success: (result) => {
        var nresult = result.parse.text.replace("<p>", "").replace("</p>", "");
        res(nresult);
      },
      error: () => {
        rej([]);
      },
    });
  });
};
