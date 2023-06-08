// Function to remove the specified <div> element from the web page
function removeElements() {
    var elementsToRemove = document.getElementsByClassName("hidden-xs alert alert-info");
    for (var i = 0; i < elementsToRemove.length; i++) {
      var element = elementsToRemove[i];
      element.remove();
    }
  }
  
  // Function to handle the extension toggle logic
  function handleExtensionToggle(isExtensionActive) {
    if (isExtensionActive) {
      removeElements();
    }
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.toggleExtension) {
      var isExtensionActive = request.toggleExtension === "on";
      handleExtensionToggle(isExtensionActive);
    }
  });
  
  // Retrieve the extension state from storage
  chrome.storage.sync.get("isExtensionActive", function (data) {
    var isExtensionActive = data.isExtensionActive;
  
    // If the state is undefined (first run), set the default to active (true)
    if (isExtensionActive === undefined) {
      isExtensionActive = true;
      chrome.storage.sync.set({ isExtensionActive: isExtensionActive });
    }
  
    // Apply the extension state
    handleExtensionToggle(isExtensionActive);
  });
  