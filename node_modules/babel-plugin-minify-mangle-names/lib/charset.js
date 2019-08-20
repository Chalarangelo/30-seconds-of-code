"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CHARSET = ("abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ$_").split("");

module.exports = function () {
  function Charset(shouldConsider) {
    var _this = this;

    _classCallCheck(this, Charset);

    this.shouldConsider = shouldConsider;
    this.chars = CHARSET.slice();
    this.frequency = {};
    this.chars.forEach(function (c) {
      _this.frequency[c] = 0;
    });
    this.finalized = false;
  }

  _createClass(Charset, [{
    key: "consider",
    value: function consider(str) {
      var _this2 = this;

      if (!this.shouldConsider) {
        return;
      }

      str.split("").forEach(function (c) {
        if (_this2.frequency[c] != null) {
          _this2.frequency[c]++;
        }
      });
    }
  }, {
    key: "sort",
    value: function sort() {
      var _this3 = this;

      if (this.shouldConsider) {
        this.chars = this.chars.sort(function (a, b) {
          return _this3.frequency[b] - _this3.frequency[a];
        });
      }

      this.finalized = true;
    }
  }, {
    key: "getIdentifier",
    value: function getIdentifier(num) {
      if (!this.finalized) {
        throw new Error("Should sort first");
      }

      var ret = "";
      num++;
      do {
        num--;
        ret += this.chars[num % this.chars.length];
        num = Math.floor(num / this.chars.length);
      } while (num > 0);
      return ret;
    }
  }]);

  return Charset;
}();