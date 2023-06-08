// Function to handle the extension toggle logic
function handleExtensionToggle(isExtensionActive) {
    chrome.storage.sync.set({ isExtensionActive: isExtensionActive });
  
    // Send message to content script to toggle extension state
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { toggleExtension: isExtensionActive ? "on" : "off" });
    });
  }
  
  // Listen for toggle requests from the popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.toggleExtension) {
      var isExtensionActive = request.toggleExtension === "on";
      handleExtensionToggle(isExtensionActive);
    }
  });
  
  // Retrieve the extension state from storage on startup
  chrome.storage.sync.get("isExtensionActive", function (data) {
    var isExtensionActive = data.isExtensionActive;
  
    // If the state is undefined (first run), set the default to active (true)
    if (isExtensionActive === undefined) {
      isExtensionActive = true;
      chrome.storage.sync.set({ isExtensionActive: isExtensionActive });
    }
  
    // Send message to content script to toggle extension state
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { toggleExtension: isExtensionActive ? "on" : "off" });
    });
  });
  