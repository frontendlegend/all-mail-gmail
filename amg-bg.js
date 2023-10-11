chrome.action.onClicked.addListener(({ url }) => {
    chrome.tabs.update(undefined, { url: url.replace('#inbox', '#all') });
});