chrome.contextMenus.create({
    "title": getLang("menuSearch"),
    "contexts": ["selection"],
    "onclick": (info) => {
        createTab(`https://thwiki.cc/index.php?search=${encodeURIComponent(info.selectionText)}&fulltext=1`);

    }
});

chrome.contextMenus.create({
    "title": getLang("menuGo"),
    "contexts": ["selection"],
    "onclick": (info) => {
        createTab(`https://thwiki.cc/index.php?search=${encodeURIComponent(info.selectionText)}&go=1`);

    }
});

chrome.omnibox.onInputEntered.addListener(
    (text) => {
        createTab(`https://thwiki.cc/index.php?search=${encodeURIComponent(text)}&go=1`);
    }
);