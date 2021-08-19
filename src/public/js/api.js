/** 本文件为封装的扩展API*/

/** 获得自定义头图列表 */
var getCustomerBanner = () => {
  let wikiUserID = 0;
  let wikiUserName = "";
  let extVer = "";

  return new Promise((res, rej) => {
    getLocalStorage(["user", "info"]).then((ret) => {
      if (ret.info) {
        extVer = ret.info.ver;
      }
      if (ret.user) {
        wikiUserID = ret.user.wikiUserID || 0;
        wikiUserName = ret.user.wikiUserName || "";
      }

      $.ajax({
        url: `${apiurl}Banner`,
        dataType: "json",
        headers: {
          wikiUserID: wikiUserID,
          wikiUserName: wikiUserName,
          extVer: extVer,
        },
        success: (result) => {
          if (result.status == 0) {
            res(result.data);
          } else {
            rej([]);
          }
        },
        error: () => {
          rej([]);
        },
      });
    });
  });
};

/** 获得背景图片地址 */
var getBackground = (char) => {
  let wikiUserID = 0;
  let wikiUserName = "";
  let extVer = "";

  return new Promise((res, rej) => {
    getLocalStorage(["user", "info"]).then((ret) => {
      if (ret.info) {
        extVer = ret.info.ver;
      }
      if (ret.user) {
        wikiUserID = ret.user.wikiUserID || 0;
        wikiUserName = ret.user.wikiUserName || "";
      }

      $.ajax({
        url: `${apiurl}Background`,
        data: {
          char: char,
          type: 1,
        },
        dataType: "json",
        headers: {
          wikiUserID: wikiUserID,
          wikiUserName: wikiUserName,
          extVer: extVer,
        },
        success: (result) => {
          if (result.status == 0) {
            res(result.data);
          } else {
            rej();
          }
        },
        error: () => {
          rej();
        },
      });
    });
  });
};

/** 获得版本更新日志/最新版本 */
var getVer = ({ ver = null, curVer = null, upVer = null }) => {
  let wikiUserID = 0;
  let wikiUserName = "";
  let extVer = "";

  return new Promise((res, rej) => {
    getLocalStorage(["user", "info"]).then((ret) => {
      if (ret.info) {
        extVer = ret.info.ver;
      }
      if (ret.user) {
        wikiUserID = ret.user.wikiUserID || 0;
        wikiUserName = ret.user.wikiUserName || "";
      }
      $.ajax({
        url: `${apiurl}Ver`,
        data: {
          curVer: curVer,
          upVer: upVer,
          ver: ver,
        },
        dataType: "json",
        headers: {
          wikiUserID: wikiUserID,
          wikiUserName: wikiUserName,
          extVer: extVer,
        },
        success: (result) => {
          if (result.status == 0) {
            res(result.data);
          } else {
            rej();
          }
        },
        error: () => {
          rej();
        },
      });
    });
  });
};

/** 获得验证码答案 */
var getCaptcha = (q) => {
  let wikiUserID = 0;
  let wikiUserName = "";
  let extVer = "";

  return new Promise((res, rej) => {
    getLocalStorage(["user", "info"]).then((ret) => {
      if (ret.info) {
        extVer = ret.info.ver;
      }
      if (ret.user) {
        wikiUserID = ret.user.wikiUserID || 0;
        wikiUserName = ret.user.wikiUserName || "";
      }

      $.ajax({
        url: `${apiurl}Captcha`,
        data: {
          q: q,
        },
        dataType: "json",
        headers: {
          wikiUserID: wikiUserID,
          wikiUserName: wikiUserName,
          extVer: extVer,
        },
        success: (result) => {
          if (result.status == 0) {
            res(result.data);
          } else {
            rej();
          }
        },
        error: () => {
          rej();
        },
      });
    });
  });
};

/** 获得网易云搜索结果 */
var getNetSearch = ({ name, limit = 5 }) => {
  let wikiUserID = 0;
  let wikiUserName = "";
  let extVer = "";

  return new Promise((res, rej) => {
    getLocalStorage(["user", "info"]).then((ret) => {
      if (ret.info) {
        extVer = ret.info.ver;
      }
      if (ret.user) {
        wikiUserID = ret.user.wikiUserID || 0;
        wikiUserName = ret.user.wikiUserName || "";
      }

      $.ajax({
        url: `${apiurl}NetSearch`,
        data: {
          name: name,
          limit: limit,
        },
        dataType: "json",
        headers: {
          wikiUserID: wikiUserID,
          wikiUserName: wikiUserName,
          extVer: extVer,
        },
        success: (result) => {
          if (result.status == 0) {
            res(result.data);
          } else {
            rej();
          }
        },
        error: () => {
          rej();
        },
      });
    });
  });
};

/** 获得网易云专辑信息 */
var getNetAlbum = ({ name, ar }) => {
  let wikiUserID = 0;
  let wikiUserName = "";
  let extVer = "";

  return new Promise((res, rej) => {
    getLocalStorage(["user", "info"]).then((ret) => {
      if (ret.info) {
        extVer = ret.info.ver;
      }
      if (ret.user) {
        wikiUserID = ret.user.wikiUserID || 0;
        wikiUserName = ret.user.wikiUserName || "";
      }

      $.ajax({
        url: `${apiurl}NetAlbum`,
        data: {
          name: name,
          ar: ar,
        },
        dataType: "json",
        headers: {
          wikiUserID: wikiUserID,
          wikiUserName: wikiUserName,
          extVer: extVer,
        },
        success: (result) => {
          if (result.status == 0) {
            res(result.data);
          } else {
            rej();
          }
        },
        error: () => {
          rej();
        },
      });
    });
  });
};

/** THB专辑搜索 */
var getAlbumQuery = (searchKey) => {
  let wikiUserID = 0;
  let wikiUserName = "";
  let extVer = "";

  return new Promise((res, rej) => {
    getLocalStorage(["user", "info"]).then((ret) => {
      if (ret.info) {
        extVer = ret.info.ver;
      }
      if (ret.user) {
        wikiUserID = ret.user.wikiUserID || 0;
        wikiUserName = ret.user.wikiUserName || "";
      }

      var searchKeys = searchKey.split("，");
      if (searchKeys.length <= 0) rej();
      var data = {
        searchkey: [searchKeys[0]],
        alsearchkey: searchKeys.length > 1 ? [searchKeys[1]] : null,
        alname: [],
        circle: null,
        name: [],
        ogmusicname: null,
        ogmusiccnname: null,
        vocal: null,
        arrange: null,
        date: null,
      };
      $.ajax({
        url: `${apiurl}AlbumQuery`,
        method: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
          wikiUserID: wikiUserID,
          wikiUserName: wikiUserName,
          extVer: extVer,
        },
        success: (ret) => {
          if (ret.status == 0) {
            ret.data.results = ret.data.results.map((v) => {
              v.name = v.name.join();
              v.alname = v.alname.join();
              v.althb = v.self.displaytitle
                ? v.self.displaytitle
                : v.id.substr(
                    0,
                    v.id.lastIndexOf("#") >= 0
                      ? v.id.lastIndexOf("#")
                      : v.id.length
                  );
              v.artist =
                v.vocal.length > 0
                  ? v.vocal
                  : v.arrange.length > 0
                  ? v.arrange
                  : v.circle;
              v.ogmusicname = v.ogmusicname.join("/");
              v.ogmusiccnname = v.ogmusiccnname.join("/");
              v.date = timestampFormat(v.date.join());
              return v;
            });
            res(ret.data);
          } else {
            rej();
          }
        },
        error: () => {
          rej();
        },
      });
    });
  });
};
