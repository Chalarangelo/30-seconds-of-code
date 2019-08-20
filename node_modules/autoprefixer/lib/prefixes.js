"use strict";

var vendor = require('postcss').vendor;

var Declaration = require('./declaration');

var Resolution = require('./resolution');

var Transition = require('./transition');

var Processor = require('./processor');

var Supports = require('./supports');

var Browsers = require('./browsers');

var Selector = require('./selector');

var AtRule = require('./at-rule');

var Value = require('./value');

var utils = require('./utils');

Selector.hack(require('./hacks/fullscreen'));
Selector.hack(require('./hacks/placeholder'));
Declaration.hack(require('./hacks/flex'));
Declaration.hack(require('./hacks/order'));
Declaration.hack(require('./hacks/filter'));
Declaration.hack(require('./hacks/grid-end'));
Declaration.hack(require('./hacks/animation'));
Declaration.hack(require('./hacks/flex-flow'));
Declaration.hack(require('./hacks/flex-grow'));
Declaration.hack(require('./hacks/flex-wrap'));
Declaration.hack(require('./hacks/grid-area'));
Declaration.hack(require('./hacks/place-self'));
Declaration.hack(require('./hacks/grid-start'));
Declaration.hack(require('./hacks/align-self'));
Declaration.hack(require('./hacks/appearance'));
Declaration.hack(require('./hacks/flex-basis'));
Declaration.hack(require('./hacks/mask-border'));
Declaration.hack(require('./hacks/mask-composite'));
Declaration.hack(require('./hacks/align-items'));
Declaration.hack(require('./hacks/flex-shrink'));
Declaration.hack(require('./hacks/break-props'));
Declaration.hack(require('./hacks/color-adjust'));
Declaration.hack(require('./hacks/writing-mode'));
Declaration.hack(require('./hacks/border-image'));
Declaration.hack(require('./hacks/align-content'));
Declaration.hack(require('./hacks/border-radius'));
Declaration.hack(require('./hacks/block-logical'));
Declaration.hack(require('./hacks/grid-template'));
Declaration.hack(require('./hacks/inline-logical'));
Declaration.hack(require('./hacks/grid-row-align'));
Declaration.hack(require('./hacks/transform-decl'));
Declaration.hack(require('./hacks/flex-direction'));
Declaration.hack(require('./hacks/image-rendering'));
Declaration.hack(require('./hacks/backdrop-filter'));
Declaration.hack(require('./hacks/background-clip'));
Declaration.hack(require('./hacks/text-decoration'));
Declaration.hack(require('./hacks/justify-content'));
Declaration.hack(require('./hacks/background-size'));
Declaration.hack(require('./hacks/grid-row-column'));
Declaration.hack(require('./hacks/grid-rows-columns'));
Declaration.hack(require('./hacks/grid-column-align'));
Declaration.hack(require('./hacks/overscroll-behavior'));
Declaration.hack(require('./hacks/grid-template-areas'));
Declaration.hack(require('./hacks/text-emphasis-position'));
Declaration.hack(require('./hacks/text-decoration-skip-ink'));
Value.hack(require('./hacks/gradient'));
Value.hack(require('./hacks/intrinsic'));
Value.hack(require('./hacks/pixelated'));
Value.hack(require('./hacks/image-set'));
Value.hack(require('./hacks/cross-fade'));
Value.hack(require('./hacks/display-flex'));
Value.hack(require('./hacks/display-grid'));
Value.hack(require('./hacks/filter-value'));
var declsCache = {};

var Prefixes =
/*#__PURE__*/
function () {
  function Prefixes(data, browsers, options) {
    if (options === void 0) {
      options = {};
    }

    this.data = data;
    this.browsers = browsers;
    this.options = options;

    var _this$preprocess = this.preprocess(this.select(this.data));

    this.add = _this$preprocess[0];
    this.remove = _this$preprocess[1];
    this.transition = new Transition(this);
    this.processor = new Processor(this);
  }
  /**
     * Return clone instance to remove all prefixes
     */


  var _proto = Prefixes.prototype;

  _proto.cleaner = function cleaner() {
    if (this.cleanerCache) {
      return this.cleanerCache;
    }

    if (this.browsers.selected.length) {
      var empty = new Browsers(this.browsers.data, []);
      this.cleanerCache = new Prefixes(this.data, empty, this.options);
    } else {
      return this;
    }

    return this.cleanerCache;
  }
  /**
     * Select prefixes from data, which is necessary for selected browsers
     */
  ;

  _proto.select = function select(list) {
    var _this = this;

    var selected = {
      add: {},
      remove: {}
    };

    var _loop = function _loop(name) {
      var data = list[name];
      var add = data.browsers.map(function (i) {
        var params = i.split(' ');
        return {
          browser: params[0] + " " + params[1],
          note: params[2]
        };
      });
      var notes = add.filter(function (i) {
        return i.note;
      }).map(function (i) {
        return _this.browsers.prefix(i.browser) + " " + i.note;
      });
      notes = utils.uniq(notes);
      add = add.filter(function (i) {
        return _this.browsers.isSelected(i.browser);
      }).map(function (i) {
        var prefix = _this.browsers.prefix(i.browser);

        if (i.note) {
          return prefix + " " + i.note;
        } else {
          return prefix;
        }
      });
      add = _this.sort(utils.uniq(add));

      if (_this.options.flexbox === 'no-2009') {
        add = add.filter(function (i) {
          return i.indexOf('2009') === -1;
        });
      }

      var all = data.browsers.map(function (i) {
        return _this.browsers.prefix(i);
      });

      if (data.mistakes) {
        all = all.concat(data.mistakes);
      }

      all = all.concat(notes);
      all = utils.uniq(all);

      if (add.length) {
        selected.add[name] = add;

        if (add.length < all.length) {
          selected.remove[name] = all.filter(function (i) {
            return add.indexOf(i) === -1;
          });
        }
      } else {
        selected.remove[name] = all;
      }
    };

    for (var name in list) {
      _loop(name);
    }

    return selected;
  }
  /**
     * Sort vendor prefixes
     */
  ;

  _proto.sort = function sort(prefixes) {
    return prefixes.sort(function (a, b) {
      var aLength = utils.removeNote(a).length;
      var bLength = utils.removeNote(b).length;

      if (aLength === bLength) {
        return b.length - a.length;
      } else {
        return bLength - aLength;
      }
    });
  }
  /**
     * Cache prefixes data to fast CSS processing
     */
  ;

  _proto.preprocess = function preprocess(selected) {
    var add = {
      'selectors': [],
      '@supports': new Supports(Prefixes, this)
    };

    for (var name in selected.add) {
      var prefixes = selected.add[name];

      if (name === '@keyframes' || name === '@viewport') {
        add[name] = new AtRule(name, prefixes, this);
      } else if (name === '@resolution') {
        add[name] = new Resolution(name, prefixes, this);
      } else if (this.data[name].selector) {
        add.selectors.push(Selector.load(name, prefixes, this));
      } else {
        var props = this.data[name].props;

        if (props) {
          var value = Value.load(name, prefixes, this);

          for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var prop = _ref;

            if (!add[prop]) {
              add[prop] = {
                values: []
              };
            }

            add[prop].values.push(value);
          }
        } else {
          var values = add[name] && add[name].values || [];
          add[name] = Declaration.load(name, prefixes, this);
          add[name].values = values;
        }
      }
    }

    var remove = {
      selectors: []
    };

    for (var _name in selected.remove) {
      var _prefixes = selected.remove[_name];

      if (this.data[_name].selector) {
        var selector = Selector.load(_name, _prefixes);

        for (var _iterator2 = _prefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var prefix = _ref2;
          remove.selectors.push(selector.old(prefix));
        }
      } else if (_name === '@keyframes' || _name === '@viewport') {
        for (var _iterator3 = _prefixes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var _prefix = _ref3;

          var prefixed = "@" + _prefix + _name.slice(1);

          remove[prefixed] = {
            remove: true
          };
        }
      } else if (_name === '@resolution') {
        remove[_name] = new Resolution(_name, _prefixes, this);
      } else {
        var _props = this.data[_name].props;

        if (_props) {
          var _value = Value.load(_name, [], this);

          for (var _iterator4 = _prefixes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
              if (_i4 >= _iterator4.length) break;
              _ref4 = _iterator4[_i4++];
            } else {
              _i4 = _iterator4.next();
              if (_i4.done) break;
              _ref4 = _i4.value;
            }

            var _prefix2 = _ref4;

            var old = _value.old(_prefix2);

            if (old) {
              for (var _iterator5 = _props, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                  if (_i5 >= _iterator5.length) break;
                  _ref5 = _iterator5[_i5++];
                } else {
                  _i5 = _iterator5.next();
                  if (_i5.done) break;
                  _ref5 = _i5.value;
                }

                var _prop = _ref5;

                if (!remove[_prop]) {
                  remove[_prop] = {};
                }

                if (!remove[_prop].values) {
                  remove[_prop].values = [];
                }

                remove[_prop].values.push(old);
              }
            }
          }
        } else {
          for (var _iterator6 = _prefixes, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray6) {
              if (_i6 >= _iterator6.length) break;
              _ref6 = _iterator6[_i6++];
            } else {
              _i6 = _iterator6.next();
              if (_i6.done) break;
              _ref6 = _i6.value;
            }

            var _prefix3 = _ref6;
            var olds = this.decl(_name).old(_name, _prefix3);

            if (_name === 'align-self') {
              var a = add[_name] && add[_name].prefixes;

              if (a) {
                if (_prefix3 === '-webkit- 2009' && a.indexOf('-webkit-') !== -1) {
                  continue;
                } else if (_prefix3 === '-webkit-' && a.indexOf('-webkit- 2009') !== -1) {
                  continue;
                }
              }
            }

            for (var _iterator7 = olds, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
              var _ref7;

              if (_isArray7) {
                if (_i7 >= _iterator7.length) break;
                _ref7 = _iterator7[_i7++];
              } else {
                _i7 = _iterator7.next();
                if (_i7.done) break;
                _ref7 = _i7.value;
              }

              var _prefixed = _ref7;

              if (!remove[_prefixed]) {
                remove[_prefixed] = {};
              }

              remove[_prefixed].remove = true;
            }
          }
        }
      }
    }

    return [add, remove];
  }
  /**
     * Declaration loader with caching
     */
  ;

  _proto.decl = function decl(prop) {
    var decl = declsCache[prop];

    if (decl) {
      return decl;
    } else {
      declsCache[prop] = Declaration.load(prop);
      return declsCache[prop];
    }
  }
  /**
     * Return unprefixed version of property
     */
  ;

  _proto.unprefixed = function unprefixed(prop) {
    var value = this.normalize(vendor.unprefixed(prop));

    if (value === 'flex-direction') {
      value = 'flex-flow';
    }

    return value;
  }
  /**
     * Normalize prefix for remover
     */
  ;

  _proto.normalize = function normalize(prop) {
    return this.decl(prop).normalize(prop);
  }
  /**
     * Return prefixed version of property
     */
  ;

  _proto.prefixed = function prefixed(prop, prefix) {
    prop = vendor.unprefixed(prop);
    return this.decl(prop).prefixed(prop, prefix);
  }
  /**
     * Return values, which must be prefixed in selected property
     */
  ;

  _proto.values = function values(type, prop) {
    var data = this[type];
    var global = data['*'] && data['*'].values;
    var values = data[prop] && data[prop].values;

    if (global && values) {
      return utils.uniq(global.concat(values));
    } else {
      return global || values || [];
    }
  }
  /**
     * Group declaration by unprefixed property to check them
     */
  ;

  _proto.group = function group(decl) {
    var _this2 = this;

    var rule = decl.parent;
    var index = rule.index(decl);
    var length = rule.nodes.length;
    var unprefixed = this.unprefixed(decl.prop);

    var checker = function checker(step, callback) {
      index += step;

      while (index >= 0 && index < length) {
        var other = rule.nodes[index];

        if (other.type === 'decl') {
          if (step === -1 && other.prop === unprefixed) {
            if (!Browsers.withPrefix(other.value)) {
              break;
            }
          }

          if (_this2.unprefixed(other.prop) !== unprefixed) {
            break;
          } else if (callback(other) === true) {
            return true;
          }

          if (step === +1 && other.prop === unprefixed) {
            if (!Browsers.withPrefix(other.value)) {
              break;
            }
          }
        }

        index += step;
      }

      return false;
    };

    return {
      up: function up(callback) {
        return checker(-1, callback);
      },
      down: function down(callback) {
        return checker(+1, callback);
      }
    };
  };

  return Prefixes;
}();

module.exports = Prefixes;