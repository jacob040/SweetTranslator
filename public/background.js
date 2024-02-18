console.log('Extension background script running');

chrome.contextMenus.create({
  id: "1",
  title: "Translate \"%s\"",
  contexts: ["selection"],
});
console.log("Contextmenu created");

const tabTranslations = new Map(); // Store tab IDs and their translations
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Contextmenu clicked");

  if (info.menuItemId === "1" && tab) {
    const toTranslate = info.selectionText;

    chrome.tabs.create({ url: 'popup.html' }, (newTab) => {
      const newTabId = newTab.id;

    });
      const text = translateText(toTranslate);
      tabTranslations.set(newTabId, text);

      console.log("Contents of tabTranslations:");
      tabTranslations.forEach((value, key) => {
        console.log(`Tab ID: ${key}, Translation: ${value}`);
      });

      // Sending the message within the extension (no need for extension ID)
      chrome.runtime.sendMessage({ message: text, tabId: newTabId });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabTranslations.delete(tabId); // Remove the translation for the closed tab
  console.log("tab removed");
});

function translateText(selectedText) {
  const translation = "fake translation :)";
  return translation;
}
