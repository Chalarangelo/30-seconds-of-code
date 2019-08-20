"use strict";

var utils = require('./utils');

var OldValue =
/*#__PURE__*/
function () {
  function OldValue(unprefixed, prefixed, string, regexp) {
    this.unprefixed = unprefixed;
    this.prefixed = prefixed;
    this.string = string || prefixed;
    this.regexp = regexp || utils.regexp(prefixed);
  }
  /**
     * Check, that value contain old value
     */


  var _proto = OldValue.prototype;

  _proto.check = function check(value) {
    if (value.indexOf(this.string) !== -1) {
      return !!value.match(this.regexp);
    }

    return false;
  };

  return OldValue;
}();

module.exports = OldValue;