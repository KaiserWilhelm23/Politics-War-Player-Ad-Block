// Function to send a message to the active tab
function sendMessageToTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.toggleAdBlock !== undefined) {
      sendMessageToTab({ toggleAdBlock: request.toggleAdBlock });
    }
  
    if (request.toggleAlternativeAds !== undefined) {
      sendMessageToTab({ toggleAlternativeAds: request.toggleAlternativeAds });
    }
  
    if (request.toggleDisableAds !== undefined) {
      sendMessageToTab({ toggleDisableAds: request.toggleDisableAds });
    }
  });
  