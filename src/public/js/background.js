chrome.windows.onCreated.addListener(() => {
    checkLogin(checkUnreadNotificationNum);
    chrome.alarms.create("THBCheck", { delayInMinutes: 1, periodInMinutes: 1 });
});

chrome.cookies.onChanged.addListener((cookie) => {
    if (cookie.cookie.domain === "thwiki.cc" && (cookie.cookie.name === "cpPosTime" || cookie.cookie.name === "thwikicc_wikiUserID")) {
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