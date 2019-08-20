"use strict";

exports.__esModule = true;
exports.onRouteUpdate = void 0;

var onRouteUpdate = function onRouteUpdate(_ref, pluginOptions) {
  var location = _ref.location;

  if (pluginOptions === void 0) {
    pluginOptions = {};
  }

  if (process.env.NODE_ENV !== "production" || typeof ga !== "function") {
    return null;
  }

  var pathIsExcluded = location && typeof window.excludeGAPaths !== "undefined" && window.excludeGAPaths.some(function (rx) {
    return rx.test(location.pathname);
  });
  if (pathIsExcluded) return null; // wrap inside a timeout to make sure react-helmet is done with it's changes (https://github.com/gatsbyjs/gatsby/issues/9139)
  // reactHelmet is using requestAnimationFrame: https://github.com/nfl/react-helmet/blob/5.2.0/src/HelmetUtils.js#L296-L299

  var sendPageView = function sendPageView() {
    var pagePath = location ? location.pathname + location.search + location.hash : undefined;
    window.ga("set", "page", pagePath);
    window.ga("send", "pageview");
  }; // Minimum delay for reactHelmet's requestAnimationFrame


  var delay = Math.max(32, pluginOptions.pageTransitionDelay || 0);
  setTimeout(sendPageView, delay);
  return null;
};

exports.onRouteUpdate = onRouteUpdate;