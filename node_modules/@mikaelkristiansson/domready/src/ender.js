!function ($) {
  var ready = require('domready')
  $.ender({domReady: ready})
  $.ender({
    ready: function (f) {
      ready(f)
      return this
    }
  }, true)
}(ender);