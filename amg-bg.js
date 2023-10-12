const NEW_TAB_URL = 'chrome://new-tab-page/';
const GMAIL_URL = 'https://mail.google.com/';

const readStorageUrl = async (tabId) => {
    return new Promise(resolve => {
        chrome.storage.session.get(tabId, (item) => resolve(item[tabId]));
    });
};

chrome.webNavigation.onCommitted.addListener(async (data) => {
    if (data.frameId !== 0) return; // Don't trigger on iframes

    const tabId = data.tabId.toString();
    const currentUrl = data.url;
    const prevUrl = await readStorageUrl(tabId);

    if (!prevUrl && currentUrl == NEW_TAB_URL) 
        chrome.storage.session.set({ [tabId]: currentUrl });

    if (prevUrl == NEW_TAB_URL && currentUrl.indexOf(GMAIL_URL) != -1) {
        chrome.tabs.update(+tabId, { url: currentUrl + '#all' });
        chrome.storage.session.set({});
    }
});