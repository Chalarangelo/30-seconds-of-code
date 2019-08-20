"use strict";

var _require = require("./constants"),
    DEFAULT_OPTIONS = _require.DEFAULT_OPTIONS,
    imageClass = _require.imageClass,
    imageBackgroundClass = _require.imageBackgroundClass,
    imageWrapperClass = _require.imageWrapperClass;

exports.onRouteUpdate = function (apiCallbackContext, pluginOptions) {
  var options = Object.assign({}, DEFAULT_OPTIONS, pluginOptions);
  var imageWrappers = document.querySelectorAll("." + imageWrapperClass); // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // for cross-browser looping through NodeList without polyfills

  var _loop = function _loop(i) {
    var imageWrapper = imageWrappers[i];
    var backgroundElement = imageWrapper.querySelector("." + imageBackgroundClass);
    var imageElement = imageWrapper.querySelector("." + imageClass);

    var onImageLoad = function onImageLoad() {
      backgroundElement.style.transition = "opacity 0.5s 0.5s";
      imageElement.style.transition = "opacity 0.5s";
      onImageComplete();
    };

    var onImageComplete = function onImageComplete() {
      backgroundElement.style.opacity = 0;
      imageElement.style.opacity = 1;
      imageElement.style.color = "inherit";
      imageElement.style.boxShadow = "inset 0px 0px 0px 400px " + options.backgroundColor;
      imageElement.removeEventListener("load", onImageLoad);
      imageElement.removeEventListener("error", onImageComplete);
    };

    imageElement.style.opacity = 0;
    imageElement.addEventListener("load", onImageLoad);
    imageElement.addEventListener("error", onImageComplete);

    if (imageElement.complete) {
      onImageComplete();
    }
  };

  for (var i = 0; i < imageWrappers.length; i++) {
    _loop(i);
  }
};