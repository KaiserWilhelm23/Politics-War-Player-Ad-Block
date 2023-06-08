// This script removes the specified <div> element from the web page

(function() {
    var elementsToRemove = document.getElementsByClassName("hidden-xs alert alert-info");
    var isExtensionActive = true;
  
    function removeElements() {
      if (isExtensionActive) {
        for (var i = 0; i < elementsToRemove.length; i++) {
          var element = elementsToRemove[i];
          element.remove();
        }
      }
    }
  
    removeElements();
  
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "toggleExtension") {
        isExtensionActive = !isExtensionActive;
        removeElements();
      }
    });
  })();