const CsiteUrl = "https://thwiki.cc";
const CsiteApiUrl = "https://thwiki.cc/api.php";

const CsiteNoLoginLogo = "/public/images/logo-32-bw.png";
const CsiteLoginLogo = "/public/images/logo-32.png";

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