/** 本文件为封装的扩展API*/

/** 获得自定义头图列表 */
var getCustomerBanner = () => {
  return new Promise((res, rej) => {
    $.ajax({
      url: `${apiurl}Banner`,
      dataType: "json",
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
};

/** 获得版本更新日志/最新版本 */
var getVer = ({ ver = null, curVer = null, upVer = null }) => {
  return new Promise((res, rej) => {
    $.ajax({
      url: `${apiurl}Ver`,
      data: {
        curVer: curVer,
        upVer: upVer,
        ver: ver,
      },
      dataType: "json",
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
};

/** 获得验证码答案 */
var getCaptcha = (q, uid) => {
  return new Promise((res, rej) => {
    $.ajax({
      url: `${apiurl}Captcha`,
      data: {
        q: q,
        uid: uid,
      },
      dataType: "json",
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
};

/** 获得网易云搜索结果 */
var getNetSearch = ({ name, limit = 5 }) => {
  return new Promise((res, rej) => {
    $.ajax({
      url: `${apiurl}NetSearch`,
      data: {
        name: name,
        limit: limit,
      },
      dataType: "json",
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
};

/** 获得网易云专辑信息 */
var getNetAlbum = ({ name, ar }) => {
    return new Promise((res, rej) => {
      $.ajax({
        url: `${apiurl}NetAlbum`,
        data: {
          name: name,
          ar: ar,
        },
        dataType: "json",
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
  };
