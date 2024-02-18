console.log('Extension background script running');

chrome.contextMenus.create({
  id: "1",
  title: "Translate \"%s\"",
  contexts: ["selection"],
});
console.log("Contextmenu created");

let tabTranslations = {}; // Store tab IDs and their translations

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Contextmenu clicked");

  if (info.menuItemId === "1" && tab) {
    const toTranslate = info.selectionText;

    chrome.tabs.create({ url: 'popup.html' }, (newTab) => {
      const newTabId = newTab.id;
    
      chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (tabId === newTabId && changeInfo.status === 'complete') {
          const textline = translateText(toTranslate);
          tabTranslations[newTabId] = textline; // Store translation with the tab ID
    
          // Sending the message within the extension (no need for extension ID)
          chrome.tabs.sendMessage(newTabId, { message: textline, tabId: newTabId });
          console.log("new id is" + newTabId);
        }
      });
    });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabTranslations[tabId]; // Remove the translation for the closed tab
});

function translateText(selectedText) {
    const translation = "fake translation :)";
    return translation;
}

