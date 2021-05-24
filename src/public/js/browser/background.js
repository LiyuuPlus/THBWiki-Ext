checkLogin(checkUnreadNotificationNum);
chrome.windows.onCreated.addListener(() => {
    checkLogin(checkUnreadNotificationNum);
    chrome.alarms.get("THBCheck", (res) => {
        if (!res) {
            chrome.alarms.create("THBCheck", { delayInMinutes: 1, periodInMinutes: 1 });
        }
    });
});

chrome.tabs.onCreated.addListener(() => {
    checkLogin(checkUnreadNotificationNum);
    chrome.alarms.get("THBCheck", (res) => {
        if (!res) {
            chrome.alarms.create("THBCheck", { delayInMinutes: 1, periodInMinutes: 1 });
        }
    });
});

chrome.runtime.onInstalled.addListener(() => {
    checkLogin(checkUnreadNotificationNum);
    chrome.alarms.get("THBCheck", (res) => {
        if (!res) {
            chrome.alarms.create("THBCheck", { delayInMinutes: 1, periodInMinutes: 1 });
        }
    });
});

chrome.cookies.onChanged.addListener((cookie) => {
    if (cookie.cookie.domain === "thwiki.cc" && (cookie.cookie.name === "cpPosTime" || cookie.cookie.name === "thwikicc_wikiUserID" || cookie.cookie.name === "UseDC")) {
        checkLogin(checkUnreadNotificationNum);
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    switch (alarm.name) {
        case 'THBCheck':
            checkLogin(checkUnreadNotificationNum);
            break;
    }
});

chrome.runtime.onMessage.addListener((request, sender) => {
    switch (request.msgType) {
        case "THBUrl":
            checkLogin(checkUnreadNotificationNum);
            break;
    }
});

chrome.tabs.onUpdated.addListener((id, status, tab) => {
    if (status.status == "complete") {
        checkLogin(checkUnreadNotificationNum);
    }
})