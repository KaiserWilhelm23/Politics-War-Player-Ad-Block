// This script removes the specified <div> element from the web page

(function() {
    var divClassToRemove = "hidden-xs alert alert-info";
    
    var divElements = document.getElementsByClassName(divClassToRemove);
    for (var i = 0; i < divElements.length; i++) {
      var divElement = divElements[i];
      divElement.remove();
    }
  })();
  