"use strict";

var parser = require('postcss-value-parser');

var Value = require('./value');

var insertAreas = require('./hacks/grid-utils').insertAreas;

var OLD_LINEAR = /(^|[^-])linear-gradient\(\s*(top|left|right|bottom)/i;
var OLD_RADIAL = /(^|[^-])radial-gradient\(\s*\d+(\w*|%)\s+\d+(\w*|%)\s*,/i;
var IGNORE_NEXT = /(!\s*)?autoprefixer:\s*ignore\s+next/i;
var GRID_REGEX = /(!\s*)?autoprefixer\s*grid:\s*(on|off|(no-)?autoplace)/i;
var SIZES = ['width', 'height', 'min-width', 'max-width', 'min-height', 'max-height', 'inline-size', 'min-inline-size', 'max-inline-size', 'block-size', 'min-block-size', 'max-block-size'];

function hasGridTemplate(decl) {
  return decl.parent.some(function (i) {
    return i.prop === 'grid-template' || i.prop === 'grid-template-areas';
  });
}

function hasRowsAndColumns(decl) {
  var hasRows = decl.parent.some(function (i) {
    return i.prop === 'grid-template-rows';
  });
  var hasColumns = decl.parent.some(function (i) {
    return i.prop === 'grid-template-columns';
  });
  return hasRows && hasColumns;
}

var Processor =
/*#__PURE__*/
function () {
  function Processor(prefixes) {
    this.prefixes = prefixes;
  }
  /**
   * Add necessary prefixes
   */


  var _proto = Processor.prototype;

  _proto.add = function add(css, result) {
    var _this = this;

    // At-rules
    var resolution = this.prefixes.add['@resolution'];
    var keyframes = this.prefixes.add['@keyframes'];
    var viewport = this.prefixes.add['@viewport'];
    var supports = this.prefixes.add['@supports'];
    css.walkAtRules(function (rule) {
      if (rule.name === 'keyframes') {
        if (!_this.disabled(rule, result)) {
          return keyframes && keyframes.process(rule);
        }
      } else if (rule.name === 'viewport') {
        if (!_this.disabled(rule, result)) {
          return viewport && viewport.process(rule);
        }
      } else if (rule.name === 'supports') {
        if (_this.prefixes.options.supports !== false && !_this.disabled(rule, result)) {
          return supports.process(rule);
        }
      } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1) {
        if (!_this.disabled(rule, result)) {
          return resolution && resolution.process(rule);
        }
      }

      return undefined;
    }); // Selectors

    css.walkRules(function (rule) {
      if (_this.disabled(rule, result)) return undefined;
      return _this.prefixes.add.selectors.map(function (selector) {
        return selector.process(rule, result);
      });
    });

    function insideGrid(decl) {
      return decl.parent.some(function (subDecl) {
        var displayGrid = subDecl.prop === 'display' && /(inline-)?grid/.test(subDecl.value);
        var gridTemplate = /^grid-template/.test(subDecl.prop);
        var gridGap = /^grid-([A-z]+-)?gap/.test(subDecl.prop);
        return displayGrid || gridTemplate || gridGap;
      });
    }

    function insideFlex(decl) {
      return decl.parent.some(function (subDecl) {
        return subDecl.prop === 'display' && /(inline-)?flex/.test(subDecl.value);
      });
    }

    var gridPrefixes = this.gridStatus(css, result) && this.prefixes.add['grid-area'] && this.prefixes.add['grid-area'].prefixes;
    css.walkDecls(function (decl) {
      if (_this.disabledDecl(decl, result)) return undefined;
      var parent = decl.parent;
      var prop = decl.prop;
      var value = decl.value;

      if (prop === 'grid-row-span') {
        result.warn('grid-row-span is not part of final Grid Layout. Use grid-row.', {
          node: decl
        });
        return undefined;
      } else if (prop === 'grid-column-span') {
        result.warn('grid-column-span is not part of final Grid Layout. Use grid-column.', {
          node: decl
        });
        return undefined;
      } else if (prop === 'display' && value === 'box') {
        result.warn('You should write display: flex by final spec ' + 'instead of display: box', {
          node: decl
        });
        return undefined;
      } else if (prop === 'text-emphasis-position') {
        if (value === 'under' || value === 'over') {
          result.warn('You should use 2 values for text-emphasis-position ' + 'For example, `under left` instead of just `under`.', {
            node: decl
          });
        }
      } else if (/^(align|justify|place)-(items|content)$/.test(prop) && insideFlex(decl)) {
        if (value === 'start' || value === 'end') {
          result.warn(value + " value has mixed support, consider using " + ("flex-" + value + " instead"), {
            node: decl
          });
        }
      } else if (prop === 'text-decoration-skip' && value === 'ink') {
        result.warn('Replace text-decoration-skip: ink to ' + 'text-decoration-skip-ink: auto, because spec had been changed', {
          node: decl
        });
      } else {
        if (gridPrefixes) {
          if (/^(align|justify|place)-items$/.test(prop) && insideGrid(decl)) {
            var fixed = prop.replace('-items', '-self');
            result.warn("IE does not support " + prop + " on grid containers. " + ("Try using " + fixed + " on child elements instead: ") + (decl.parent.selector + " > * { " + fixed + ": " + decl.value + " }"), {
              node: decl
            });
          } else if (/^(align|justify|place)-content$/.test(prop) && insideGrid(decl)) {
            result.warn("IE does not support " + decl.prop + " on grid containers", {
              node: decl
            });
          } else if (prop === 'display' && decl.value === 'contents') {
            result.warn('Please do not use display: contents; ' + 'if you have grid setting enabled', {
              node: decl
            });
            return undefined;
          } else if (decl.prop === 'grid-gap') {
            var status = _this.gridStatus(decl, result);

            if (status === 'autoplace' && !hasRowsAndColumns(decl) && !hasGridTemplate(decl)) {
              result.warn('grid-gap only works if grid-template(-areas) is being ' + 'used or both rows and columns have been declared ' + 'and cells have not been manually ' + 'placed inside the explicit grid', {
                node: decl
              });
            } else if ((status === true || status === 'no-autoplace') && !hasGridTemplate(decl)) {
              result.warn("grid-gap only works if grid-template(-areas) is being used", {
                node: decl
              });
            }
          } else if (prop === 'grid-auto-columns') {
            result.warn('grid-auto-columns is not supported by IE', {
              node: decl
            });
            return undefined;
          } else if (prop === 'grid-auto-rows') {
            result.warn('grid-auto-rows is not supported by IE', {
              node: decl
            });
            return undefined;
          } else if (prop === 'grid-auto-flow') {
            var hasRows = parent.some(function (i) {
              return i.prop === 'grid-template-rows';
            });
            var hasCols = parent.some(function (i) {
              return i.prop === 'grid-template-columns';
            });

            if (hasGridTemplate(decl)) {
              result.warn('grid-auto-flow is not supported by IE', {
                node: decl
              });
            } else if (value.includes('dense')) {
              result.warn('grid-auto-flow: dense is not supported by IE', {
                node: decl
              });
            } else if (!hasRows && !hasCols) {
              result.warn('grid-auto-flow works only if grid-template-rows and ' + 'grid-template-columns are present in the same rule', {
                node: decl
              });
            }

            return undefined;
          } else if (value.indexOf('auto-fit') !== -1) {
            result.warn('auto-fit value is not supported by IE', {
              node: decl,
              word: 'auto-fit'
            });
            return undefined;
          } else if (value.indexOf('auto-fill') !== -1) {
            result.warn('auto-fill value is not supported by IE', {
              node: decl,
              word: 'auto-fill'
            });
            return undefined;
          } else if (/^grid-template/.test(prop) && value.indexOf('[') !== -1) {
            result.warn('Autoprefixer currently does not support line names. ' + 'Try using grid-template-areas instead.', {
              node: decl,
              word: '['
            });
          }
        }

        if (value.indexOf('radial-gradient') !== -1) {
          if (OLD_RADIAL.test(decl.value)) {
            result.warn('Gradient has outdated direction syntax. ' + 'New syntax is like `closest-side at 0 0` ' + 'instead of `0 0, closest-side`.', {
              node: decl
            });
          } else {
            var ast = parser(value);

            for (var _iterator = ast.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var i = _ref;

              if (i.type === 'function' && i.value === 'radial-gradient') {
                for (var _iterator2 = i.nodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                  var _ref2;

                  if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                  } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                  }

                  var word = _ref2;

                  if (word.type === 'word') {
                    if (word.value === 'cover') {
                      result.warn('Gradient has outdated direction syntax. ' + 'Replace `cover` to `farthest-corner`.', {
                        node: decl
                      });
                    } else if (word.value === 'contain') {
                      result.warn('Gradient has outdated direction syntax. ' + 'Replace `contain` to `closest-side`.', {
                        node: decl
                      });
                    }
                  }
                }
              }
            }
          }
        }

        if (value.indexOf('linear-gradient') !== -1) {
          if (OLD_LINEAR.test(value)) {
            result.warn('Gradient has outdated direction syntax. ' + 'New syntax is like `to left` instead of `right`.', {
              node: decl
            });
          }
        }
      }

      if (SIZES.indexOf(decl.prop) !== -1) {
        if (decl.value.indexOf('-fill-available') === -1) {
          if (decl.value.indexOf('fill-available') !== -1) {
            result.warn('Replace fill-available to stretch, ' + 'because spec had been changed', {
              node: decl
            });
          } else if (decl.value.indexOf('fill') !== -1) {
            result.warn('Replace fill to stretch, because spec had been changed', {
              node: decl
            });
          }
        }
      }

      var prefixer;

      if (decl.prop === 'transition' || decl.prop === 'transition-property') {
        // Transition
        return _this.prefixes.transition.add(decl, result);
      } else if (decl.prop === 'align-self') {
        // align-self flexbox or grid
        var display = _this.displayType(decl);

        if (display !== 'grid' && _this.prefixes.options.flexbox !== false) {
          prefixer = _this.prefixes.add['align-self'];

          if (prefixer && prefixer.prefixes) {
            prefixer.process(decl);
          }
        }

        if (display !== 'flex' && _this.gridStatus(decl, result) !== false) {
          prefixer = _this.prefixes.add['grid-row-align'];

          if (prefixer && prefixer.prefixes) {
            return prefixer.process(decl, result);
          }
        }
      } else if (decl.prop === 'justify-self') {
        // justify-self flexbox or grid
        var _display = _this.displayType(decl);

        if (_display !== 'flex' && _this.gridStatus(decl, result) !== false) {
          prefixer = _this.prefixes.add['grid-column-align'];

          if (prefixer && prefixer.prefixes) {
            return prefixer.process(decl, result);
          }
        }
      } else if (decl.prop === 'place-self') {
        prefixer = _this.prefixes.add['place-self'];

        if (prefixer && prefixer.prefixes && _this.gridStatus(decl, result) !== false) {
          return prefixer.process(decl, result);
        }
      } else {
        // Properties
        prefixer = _this.prefixes.add[decl.prop];

        if (prefixer && prefixer.prefixes) {
          return prefixer.process(decl, result);
        }
      }

      return undefined;
    }); // Insert grid-area prefixes. We need to be able to store the different
    // rules as a data and hack API is not enough for this

    if (this.gridStatus(css, result)) {
      insertAreas(css, this.disabled);
    } // Values


    return css.walkDecls(function (decl) {
      if (_this.disabledValue(decl, result)) return;

      var unprefixed = _this.prefixes.unprefixed(decl.prop);

      for (var _iterator3 = _this.prefixes.values('add', unprefixed), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var value = _ref3;
        value.process(decl, result);
      }

      Value.save(_this.prefixes, decl);
    });
  }
  /**
   * Remove unnecessary pefixes
   */
  ;

  _proto.remove = function remove(css, result) {
    var _this2 = this;

    // At-rules
    var resolution = this.prefixes.remove['@resolution'];
    css.walkAtRules(function (rule, i) {
      if (_this2.prefixes.remove["@" + rule.name]) {
        if (!_this2.disabled(rule, result)) {
          rule.parent.removeChild(i);
        }
      } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1 && resolution) {
        resolution.clean(rule);
      }
    }); // Selectors

    var _loop = function _loop() {
      if (_isArray4) {
        if (_i4 >= _iterator4.length) return "break";
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) return "break";
        _ref4 = _i4.value;
      }

      var checker = _ref4;
      css.walkRules(function (rule, i) {
        if (checker.check(rule)) {
          if (!_this2.disabled(rule, result)) {
            rule.parent.removeChild(i);
          }
        }
      });
    };

    for (var _iterator4 = this.prefixes.remove.selectors, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      var _ret = _loop();

      if (_ret === "break") break;
    }

    return css.walkDecls(function (decl, i) {
      if (_this2.disabled(decl, result)) return;
      var rule = decl.parent;

      var unprefixed = _this2.prefixes.unprefixed(decl.prop); // Transition


      if (decl.prop === 'transition' || decl.prop === 'transition-property') {
        _this2.prefixes.transition.remove(decl);
      } // Properties


      if (_this2.prefixes.remove[decl.prop] && _this2.prefixes.remove[decl.prop].remove) {
        var notHack = _this2.prefixes.group(decl).down(function (other) {
          return _this2.prefixes.normalize(other.prop) === unprefixed;
        });

        if (unprefixed === 'flex-flow') {
          notHack = true;
        }

        if (decl.prop === '-webkit-box-orient') {
          var hacks = {
            'flex-direction': true,
            'flex-flow': true
          };
          if (!decl.parent.some(function (j) {
            return hacks[j.prop];
          })) return;
        }

        if (notHack && !_this2.withHackValue(decl)) {
          if (decl.raw('before').indexOf('\n') > -1) {
            _this2.reduceSpaces(decl);
          }

          rule.removeChild(i);
          return;
        }
      } // Values


      for (var _iterator5 = _this2.prefixes.values('remove', unprefixed), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref5 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref5 = _i5.value;
        }

        var checker = _ref5;

        if (!checker.check(decl.value)) {
          continue;
        }

        unprefixed = checker.unprefixed;

        var _notHack = _this2.prefixes.group(decl).down(function (other) {
          return other.value.indexOf(unprefixed) !== -1;
        });

        if (_notHack) {
          rule.removeChild(i);
          return;
        }
      }
    });
  }
  /**
   * Some rare old values, which is not in standard
   */
  ;

  _proto.withHackValue = function withHackValue(decl) {
    return decl.prop === '-webkit-background-clip' && decl.value === 'text';
  }
  /**
   * Check for grid/flexbox options.
   */
  ;

  _proto.disabledValue = function disabledValue(node, result) {
    if (this.gridStatus(node, result) === false && node.type === 'decl') {
      if (node.prop === 'display' && node.value.indexOf('grid') !== -1) {
        return true;
      }
    }

    if (this.prefixes.options.flexbox === false && node.type === 'decl') {
      if (node.prop === 'display' && node.value.indexOf('flex') !== -1) {
        return true;
      }
    }

    return this.disabled(node, result);
  }
  /**
   * Check for grid/flexbox options.
   */
  ;

  _proto.disabledDecl = function disabledDecl(node, result) {
    if (this.gridStatus(node, result) === false && node.type === 'decl') {
      if (node.prop.indexOf('grid') !== -1 || node.prop === 'justify-items') {
        return true;
      }
    }

    if (this.prefixes.options.flexbox === false && node.type === 'decl') {
      var other = ['order', 'justify-content', 'align-items', 'align-content'];

      if (node.prop.indexOf('flex') !== -1 || other.indexOf(node.prop) !== -1) {
        return true;
      }
    }

    return this.disabled(node, result);
  }
  /**
   * Check for control comment and global options
   */
  ;

  _proto.disabled = function disabled(node, result) {
    if (!node) return false;

    if (node._autoprefixerDisabled !== undefined) {
      return node._autoprefixerDisabled;
    }

    if (node.parent) {
      var p = node.prev();

      if (p && p.type === 'comment' && IGNORE_NEXT.test(p.text)) {
        node._autoprefixerDisabled = true;
        node._autoprefixerSelfDisabled = true;
        return true;
      }
    }

    var value = null;

    if (node.nodes) {
      var status;
      node.each(function (i) {
        if (i.type !== 'comment') return;

        if (/(!\s*)?autoprefixer:\s*(off|on)/i.test(i.text)) {
          if (typeof status !== 'undefined') {
            result.warn('Second Autoprefixer control comment ' + 'was ignored. Autoprefixer applies control ' + 'comment to whole block, not to next rules.', {
              node: i
            });
          } else {
            status = /on/i.test(i.text);
          }
        }
      });

      if (status !== undefined) {
        value = !status;
      }
    }

    if (!node.nodes || value === null) {
      if (node.parent) {
        var isParentDisabled = this.disabled(node.parent, result);

        if (node.parent._autoprefixerSelfDisabled === true) {
          value = false;
        } else {
          value = isParentDisabled;
        }
      } else {
        value = false;
      }
    }

    node._autoprefixerDisabled = value;
    return value;
  }
  /**
   * Normalize spaces in cascade declaration group
   */
  ;

  _proto.reduceSpaces = function reduceSpaces(decl) {
    var stop = false;
    this.prefixes.group(decl).up(function () {
      stop = true;
      return true;
    });

    if (stop) {
      return;
    }

    var parts = decl.raw('before').split('\n');
    var prevMin = parts[parts.length - 1].length;
    var diff = false;
    this.prefixes.group(decl).down(function (other) {
      parts = other.raw('before').split('\n');
      var last = parts.length - 1;

      if (parts[last].length > prevMin) {
        if (diff === false) {
          diff = parts[last].length - prevMin;
        }

        parts[last] = parts[last].slice(0, -diff);
        other.raws.before = parts.join('\n');
      }
    });
  }
  /**
   * Is it flebox or grid rule
   */
  ;

  _proto.displayType = function displayType(decl) {
    for (var _iterator6 = decl.parent.nodes, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref6 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref6 = _i6.value;
      }

      var i = _ref6;

      if (i.prop !== 'display') {
        continue;
      }

      if (i.value.indexOf('flex') !== -1) {
        return 'flex';
      }

      if (i.value.indexOf('grid') !== -1) {
        return 'grid';
      }
    }

    return false;
  }
  /**
   * Set grid option via control comment
   */
  ;

  _proto.gridStatus = function gridStatus(node, result) {
    if (!node) return false;

    if (node._autoprefixerGridStatus !== undefined) {
      return node._autoprefixerGridStatus;
    }

    var value = null;

    if (node.nodes) {
      var status;
      node.each(function (i) {
        if (i.type !== 'comment') return;

        if (GRID_REGEX.test(i.text)) {
          var hasAutoplace = /:\s*autoplace/i.test(i.text);
          var noAutoplace = /no-autoplace/i.test(i.text);

          if (typeof status !== 'undefined') {
            result.warn("Second Autoprefixer grid control comment was " + 'ignored. Autoprefixer applies control comments to the whole ' + 'block, not to the next rules.', {
              node: i
            });
          } else if (hasAutoplace) {
            status = 'autoplace';
          } else if (noAutoplace) {
            status = true;
          } else {
            status = /on/i.test(i.text);
          }
        }
      });

      if (status !== undefined) {
        value = status;
      }
    }

    if (node.type === 'atrule' && node.name === 'supports') {
      var params = node.params;

      if (params.indexOf('grid') !== -1 && params.indexOf('auto') !== -1) {
        value = false;
      }
    }

    if (!node.nodes || value === null) {
      if (node.parent) {
        var isParentGrid = this.gridStatus(node.parent, result);

        if (node.parent._autoprefixerSelfDisabled === true) {
          value = false;
        } else {
          value = isParentGrid;
        }
      } else {
        value = this.prefixes.options.grid;
      }
    }

    node._autoprefixerGridStatus = value;
    return value;
  };

  return Processor;
}();

module.exports = Processor;