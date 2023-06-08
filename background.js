// This background script handles the click event on the extension icon

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { action: "toggleExtension" });
});
