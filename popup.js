document.addEventListener("DOMContentLoaded", function () {
    var toggleAdBlock = document.getElementById("toggleAdBlock");
    var toggleAlternativeAds = document.getElementById("toggleAlternativeAds");
  
    chrome.storage.sync.get(
      { isAdBlockEnabled: true, isAlternativeAdsEnabled: false },
      function (data) {
        var isAdBlockEnabled = data.isAdBlockEnabled;
        var isAlternativeAdsEnabled = data.isAlternativeAdsEnabled;
  
        toggleAdBlock.checked = isAdBlockEnabled;
        toggleAlternativeAds.checked = isAlternativeAdsEnabled;
      }
    );
  
    toggleAdBlock.addEventListener("change", function () {
      var isAdBlockEnabled = toggleAdBlock.checked;
      chrome.storage.sync.set({ isAdBlockEnabled: isAdBlockEnabled });
      chrome.runtime.sendMessage({ toggleAdBlock: isAdBlockEnabled });
    });
  
    toggleAlternativeAds.addEventListener("change", function () {
      var isAlternativeAdsEnabled = toggleAlternativeAds.checked;
      chrome.storage.sync.set({ isAlternativeAdsEnabled: isAlternativeAdsEnabled });
      chrome.runtime.sendMessage({ toggleAlternativeAds: isAlternativeAdsEnabled });
    });
  });
  