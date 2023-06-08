// Function to remove the existing ad element from the web page
function removeAdElement() {
    var adElement = document.querySelector(".hidden-xs.alert.alert-info");
    if (adElement) {
      adElement.remove();
    }
  }
  
  // Function to replace the existing ad element with a custom ad
  function replaceAdWithCustomAd() {
    var adElement = document.querySelector(".hidden-xs.alert.alert-info");
    if (adElement) {
      var imgElement = adElement.querySelector("img");
      if (imgElement) {
        fetch("https://raw.githubusercontent.com/blaze005/blaze005.github.io/main/ads.txt")
          .then((response) => response.text())
          .then((data) => {
            var ads = data.trim().split("\n");
            var randomAd = ads[Math.floor(Math.random() * ads.length)];
            imgElement.src = randomAd;
          });
      }
      var createdByElement = adElement.querySelector("a.notranslate");
      if (createdByElement) {
        createdByElement.textContent = "Alternative Ad System";
      }
    }
  }
  
  // Function to handle the extension toggle logic
  function handleExtensionToggle(isAdBlockEnabled, isAlternativeAdsEnabled) {
    if (isAdBlockEnabled) {
      removeAdElement();
    }
    if (isAlternativeAdsEnabled) {
      replaceAdWithCustomAd();
    }
  }
  
  chrome.storage.sync.get(
    { isAdBlockEnabled: true, isAlternativeAdsEnabled: false },
    function (data) {
      var isAdBlockEnabled = data.isAdBlockEnabled;
      var isAlternativeAdsEnabled = data.isAlternativeAdsEnabled;
      handleExtensionToggle(isAdBlockEnabled, isAlternativeAdsEnabled);
    }
  );
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.toggleAdBlock !== undefined || request.toggleAlternativeAds !== undefined) {
      chrome.storage.sync.get(
        { isAdBlockEnabled: true, isAlternativeAdsEnabled: false },
        function (data) {
          var isAdBlockEnabled = data.isAdBlockEnabled;
          var isAlternativeAdsEnabled = data.isAlternativeAdsEnabled;
          handleExtensionToggle(isAdBlockEnabled, isAlternativeAdsEnabled);
        }
      );
    }
  });
  