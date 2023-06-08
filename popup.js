document.addEventListener("DOMContentLoaded", function () {
    var toggleSwitch = document.getElementById("toggleSwitch");
  
    chrome.storage.sync.get("isExtensionActive", function (data) {
      var isExtensionActive = data.isExtensionActive;
  
      if (isExtensionActive === undefined) {
        // Default value if not set before
        isExtensionActive = true;
        chrome.storage.sync.set({ isExtensionActive: isExtensionActive });
      }
  
      toggleSwitch.classList.toggle("on", isExtensionActive);
  
      toggleSwitch.addEventListener("click", function () {
        isExtensionActive = !isExtensionActive;
        toggleSwitch.classList.toggle("on", isExtensionActive);
        chrome.storage.sync.set({ isExtensionActive: isExtensionActive });
  
        // Send message to content script to toggle extension state
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { toggleExtension: isExtensionActive ? "on" : "off" });
        });
      });
    });
  });
  