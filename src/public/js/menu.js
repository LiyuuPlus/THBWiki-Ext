chrome.contextMenus.create({
    "title": "在THBWiki上搜索\"%s\"",
    "contexts": ["selection"],
    "onclick": (info) => {
        createTab(`https://thwiki.cc/index.php?search=${encodeURIComponent(info.selectionText)}&fulltext=1`);

    }
});

chrome.contextMenus.create({
    "title": "访问THBWiki上的\"%s\"",
    "contexts": ["selection"],
    "onclick": (info) => {
        createTab(`https://thwiki.cc/${encodeURIComponent(info.selectionText)}`);

    }
});

chrome.omnibox.onInputEntered.addListener(
    (text) => {
        createTab(`https://thwiki.cc/index.php?search=${encodeURIComponent(text)}&fulltext=1`);
    }
);