"use strict";

var parser = require('postcss-value-parser');

var list = require('postcss').list;

var uniq = require('../utils').uniq;

var escapeRegexp = require('../utils').escapeRegexp;

var splitSelector = require('../utils').splitSelector;

function convert(value) {
  if (value && value.length === 2 && value[0] === 'span' && parseInt(value[1], 10) > 0) {
    return [false, parseInt(value[1], 10)];
  }

  if (value && value.length === 1 && parseInt(value[0], 10) > 0) {
    return [parseInt(value[0], 10), false];
  }

  return [false, false];
}

function translate(values, startIndex, endIndex) {
  var startValue = values[startIndex];
  var endValue = values[endIndex];

  if (!startValue) {
    return [false, false];
  }

  var _convert = convert(startValue),
      start = _convert[0],
      spanStart = _convert[1];

  var _convert2 = convert(endValue),
      end = _convert2[0],
      spanEnd = _convert2[1];

  if (start && !endValue) {
    return [start, false];
  }

  if (spanStart && end) {
    return [end - spanStart, spanStart];
  }

  if (start && spanEnd) {
    return [start, spanEnd];
  }

  if (start && end) {
    return [start, end - start];
  }

  return [false, false];
}

function parse(decl) {
  var node = parser(decl.value);
  var values = [];
  var current = 0;
  values[current] = [];

  for (var _iterator = node.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

    if (i.type === 'div') {
      current += 1;
      values[current] = [];
    } else if (i.type === 'word') {
      values[current].push(i.value);
    }
  }

  return values;
}

function insertDecl(decl, prop, value) {
  if (value && !decl.parent.some(function (i) {
    return i.prop === "-ms-" + prop;
  })) {
    decl.cloneBefore({
      prop: "-ms-" + prop,
      value: value.toString()
    });
  }
} // Track transforms


function prefixTrackProp(_ref2) {
  var prop = _ref2.prop,
      prefix = _ref2.prefix;
  return prefix + prop.replace('template-', '');
}

function transformRepeat(_ref3, _ref4) {
  var nodes = _ref3.nodes;
  var gap = _ref4.gap;

  var _nodes$reduce = nodes.reduce(function (result, node) {
    if (node.type === 'div' && node.value === ',') {
      result.key = 'size';
    } else {
      result[result.key].push(parser.stringify(node));
    }

    return result;
  }, {
    key: 'count',
    size: [],
    count: []
  }),
      count = _nodes$reduce.count,
      size = _nodes$reduce.size; // insert gap values


  if (gap) {
    var _ret = function () {
      size = size.filter(function (i) {
        return i.trim();
      });
      var val = [];

      var _loop = function _loop(i) {
        size.forEach(function (item, index) {
          if (index > 0 || i > 1) {
            val.push(gap);
          }

          val.push(item);
        });
      };

      for (var i = 1; i <= count; i++) {
        _loop(i);
      }

      return {
        v: val.join(' ')
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }

  return "(" + size.join('') + ")[" + count.join('') + "]";
}

function prefixTrackValue(_ref5) {
  var value = _ref5.value,
      gap = _ref5.gap;
  var result = parser(value).nodes.reduce(function (nodes, node) {
    if (node.type === 'function' && node.value === 'repeat') {
      return nodes.concat({
        type: 'word',
        value: transformRepeat(node, {
          gap: gap
        })
      });
    }

    if (gap && node.type === 'space') {
      return nodes.concat({
        type: 'space',
        value: ' '
      }, {
        type: 'word',
        value: gap
      }, node);
    }

    return nodes.concat(node);
  }, []);
  return parser.stringify(result);
} // Parse grid-template-areas


var DOTS = /^\.+$/;

function track(start, end) {
  return {
    start: start,
    end: end,
    span: end - start
  };
}

function getColumns(line) {
  return line.trim().split(/\s+/g);
}

function parseGridAreas(_ref6) {
  var rows = _ref6.rows,
      gap = _ref6.gap;
  return rows.reduce(function (areas, line, rowIndex) {
    if (gap.row) rowIndex *= 2;
    if (line.trim() === '') return areas;
    getColumns(line).forEach(function (area, columnIndex) {
      if (DOTS.test(area)) return;
      if (gap.column) columnIndex *= 2;

      if (typeof areas[area] === 'undefined') {
        areas[area] = {
          column: track(columnIndex + 1, columnIndex + 2),
          row: track(rowIndex + 1, rowIndex + 2)
        };
      } else {
        var _areas$area = areas[area],
            column = _areas$area.column,
            row = _areas$area.row;
        column.start = Math.min(column.start, columnIndex + 1);
        column.end = Math.max(column.end, columnIndex + 2);
        column.span = column.end - column.start;
        row.start = Math.min(row.start, rowIndex + 1);
        row.end = Math.max(row.end, rowIndex + 2);
        row.span = row.end - row.start;
      }
    });
    return areas;
  }, {});
} // Parse grid-template


function testTrack(node) {
  return node.type === 'word' && /^\[.+\]$/.test(node.value);
}

function verifyRowSize(result) {
  if (result.areas.length > result.rows.length) {
    result.rows.push('auto');
  }

  return result;
}

function parseTemplate(_ref7) {
  var decl = _ref7.decl,
      gap = _ref7.gap;
  var gridTemplate = parser(decl.value).nodes.reduce(function (result, node) {
    var type = node.type,
        value = node.value;
    if (testTrack(node) || type === 'space') return result; // area

    if (type === 'string') {
      result = verifyRowSize(result);
      result.areas.push(value);
    } // values and function


    if (type === 'word' || type === 'function') {
      result[result.key].push(parser.stringify(node));
    } // divider(/)


    if (type === 'div' && value === '/') {
      result.key = 'columns';
      result = verifyRowSize(result);
    }

    return result;
  }, {
    key: 'rows',
    columns: [],
    rows: [],
    areas: []
  });
  return {
    areas: parseGridAreas({
      rows: gridTemplate.areas,
      gap: gap
    }),
    columns: prefixTrackValue({
      value: gridTemplate.columns.join(' '),
      gap: gap.column
    }),
    rows: prefixTrackValue({
      value: gridTemplate.rows.join(' '),
      gap: gap.row
    })
  };
} // Insert parsed grid areas

/**
 * Get an array of -ms- prefixed props and values
 * @param  {Object} [area] area object with column and row data
 * @param  {Boolean} [addRowSpan] should we add grid-column-row value?
 * @param  {Boolean} [addColumnSpan] should we add grid-column-span value?
 * @return {Array<Object>}
 */


function getMSDecls(area, addRowSpan, addColumnSpan) {
  if (addRowSpan === void 0) {
    addRowSpan = false;
  }

  if (addColumnSpan === void 0) {
    addColumnSpan = false;
  }

  return [].concat({
    prop: '-ms-grid-row',
    value: String(area.row.start)
  }, area.row.span > 1 || addRowSpan ? {
    prop: '-ms-grid-row-span',
    value: String(area.row.span)
  } : [], {
    prop: '-ms-grid-column',
    value: String(area.column.start)
  }, area.column.span > 1 || addColumnSpan ? {
    prop: '-ms-grid-column-span',
    value: String(area.column.span)
  } : []);
}

function getParentMedia(parent) {
  if (parent.type === 'atrule' && parent.name === 'media') {
    return parent;
  }

  if (!parent.parent) {
    return false;
  }

  return getParentMedia(parent.parent);
}
/**
 * change selectors for rules with duplicate grid-areas.
 * @param  {Array<Rule>} rules
 * @param  {Array<String>} templateSelectors
 * @return {Array<Rule>} rules with changed selectors
 */


function changeDuplicateAreaSelectors(ruleSelectors, templateSelectors) {
  ruleSelectors = ruleSelectors.map(function (selector) {
    var selectorBySpace = list.space(selector);
    var selectorByComma = list.comma(selector);

    if (selectorBySpace.length > selectorByComma.length) {
      selector = selectorBySpace.slice(-1).join('');
    }

    return selector;
  });
  return ruleSelectors.map(function (ruleSelector) {
    var newSelector = templateSelectors.map(function (tplSelector, index) {
      var space = index === 0 ? '' : ' ';
      return "" + space + tplSelector + " > " + ruleSelector;
    });
    return newSelector;
  });
}
/**
 * check if selector of rules are equal
 * @param  {Rule} ruleA
 * @param  {Rule} ruleB
 * @return {Boolean}
 */


function selectorsEqual(ruleA, ruleB) {
  return ruleA.selectors.some(function (sel) {
    return ruleB.selectors.some(function (s) {
      return s === sel;
    });
  });
}
/**
 * Parse data from all grid-template(-areas) declarations
 * @param  {Root} css css root
 * @return {Object} parsed data
 */


function parseGridTemplatesData(css) {
  var parsed = []; // we walk through every grid-template(-areas) declaration and store
  // data with the same area names inside the item

  css.walkDecls(/grid-template(-areas)?$/, function (d) {
    var rule = d.parent;
    var media = getParentMedia(rule);
    var gap = getGridGap(d);
    var inheritedGap = inheritGridGap(d, gap);

    var _parseTemplate = parseTemplate({
      decl: d,
      gap: inheritedGap || gap
    }),
        areas = _parseTemplate.areas;

    var areaNames = Object.keys(areas); // skip node if it doesn't have areas

    if (areaNames.length === 0) {
      return true;
    } // check parsed array for item that include the same area names
    // return index of that item


    var index = parsed.reduce(function (acc, _ref8, idx) {
      var allAreas = _ref8.allAreas;
      var hasAreas = allAreas && areaNames.some(function (area) {
        return allAreas.includes(area);
      });
      return hasAreas ? idx : acc;
    }, null);

    if (index !== null) {
      // index is found, add the grid-template data to that item
      var _parsed$index = parsed[index],
          allAreas = _parsed$index.allAreas,
          rules = _parsed$index.rules; // check if rule has no duplicate area names

      var hasNoDuplicates = rules.some(function (r) {
        return r.hasDuplicates === false && selectorsEqual(r, rule);
      });
      var duplicatesFound = false; // check need to gather all duplicate area names

      var duplicateAreaNames = rules.reduce(function (acc, r) {
        if (!r.params && selectorsEqual(r, rule)) {
          duplicatesFound = true;
          return r.duplicateAreaNames;
        }

        if (!duplicatesFound) {
          areaNames.forEach(function (name) {
            if (r.areas[name]) {
              acc.push(name);
            }
          });
        }

        return uniq(acc);
      }, []); // update grid-row/column-span values for areas with duplicate
      // area names. @see #1084 and #1146

      rules.forEach(function (r) {
        areaNames.forEach(function (name) {
          var area = r.areas[name];

          if (area && area.row.span !== areas[name].row.span) {
            areas[name].row.updateSpan = true;
          }

          if (area && area.column.span !== areas[name].column.span) {
            areas[name].column.updateSpan = true;
          }
        });
      });
      parsed[index].allAreas = uniq([].concat(allAreas, areaNames));
      parsed[index].rules.push({
        hasDuplicates: !hasNoDuplicates,
        params: media.params,
        selectors: rule.selectors,
        node: rule,
        duplicateAreaNames: duplicateAreaNames,
        areas: areas
      });
    } else {
      // index is NOT found, push the new item to the parsed array
      parsed.push({
        allAreas: areaNames,
        areasCount: 0,
        rules: [{
          hasDuplicates: false,
          duplicateRules: [],
          params: media.params,
          selectors: rule.selectors,
          node: rule,
          duplicateAreaNames: [],
          areas: areas
        }]
      });
    }

    return undefined;
  });
  return parsed;
}
/**
 * insert prefixed grid-area declarations
 * @param  {Root}  css css root
 * @param  {Function} isDisabled check if the rule is disabled
 * @return {void}
 */


function insertAreas(css, isDisabled) {
  // parse grid-template declarations
  var gridTemplatesData = parseGridTemplatesData(css); // return undefined if no declarations found

  if (gridTemplatesData.length === 0) {
    return undefined;
  } // we need to store the rules that we will insert later


  var rulesToInsert = {};
  css.walkDecls('grid-area', function (gridArea) {
    var gridAreaRule = gridArea.parent;
    var hasPrefixedRow = gridAreaRule.first.prop === '-ms-grid-row';
    var gridAreaMedia = getParentMedia(gridAreaRule);

    if (isDisabled(gridArea)) {
      return undefined;
    }

    var gridAreaRuleIndex = gridAreaMedia ? css.index(gridAreaMedia) : css.index(gridAreaRule);
    var value = gridArea.value; // found the data that matches grid-area identifier

    var data = gridTemplatesData.filter(function (d) {
      return d.allAreas.includes(value);
    })[0];

    if (!data) {
      return true;
    }

    var lastArea = data.allAreas[data.allAreas.length - 1];
    var selectorBySpace = list.space(gridAreaRule.selector);
    var selectorByComma = list.comma(gridAreaRule.selector);
    var selectorIsComplex = selectorBySpace.length > 1 && selectorBySpace.length > selectorByComma.length; // prevent doubling of prefixes

    if (hasPrefixedRow) {
      return false;
    } // create the empty object with the key as the last area name
    // e.g if we have templates with "a b c" values, "c" will be the last area


    if (!rulesToInsert[lastArea]) {
      rulesToInsert[lastArea] = {};
    }

    var lastRuleIsSet = false; // walk through every grid-template rule data

    for (var _iterator2 = data.rules, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref9;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref9 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref9 = _i2.value;
      }

      var rule = _ref9;
      var area = rule.areas[value];
      var hasDuplicateName = rule.duplicateAreaNames.includes(value); // if we can't find the area name, update lastRule and continue

      if (!area) {
        var lastRuleIndex = css.index(rulesToInsert[lastArea].lastRule);

        if (gridAreaRuleIndex > lastRuleIndex) {
          rulesToInsert[lastArea].lastRule = gridAreaMedia || gridAreaRule;
        }

        continue;
      } // for grid-templates inside media rule we need to create empty
      // array to push prefixed grid-area rules later


      if (rule.params && !rulesToInsert[lastArea][rule.params]) {
        rulesToInsert[lastArea][rule.params] = [];
      }

      if ((!rule.hasDuplicates || !hasDuplicateName) && !rule.params) {
        // grid-template has no duplicates and not inside media rule
        getMSDecls(area, false, false).reverse().forEach(function (i) {
          return gridAreaRule.prepend(Object.assign(i, {
            raws: {
              between: gridArea.raws.between
            }
          }));
        });
        rulesToInsert[lastArea].lastRule = gridAreaRule;
        lastRuleIsSet = true;
      } else if (rule.hasDuplicates && !rule.params && !selectorIsComplex) {
        (function () {
          // grid-template has duplicates and not inside media rule
          var cloned = gridAreaRule.clone();
          cloned.removeAll();
          getMSDecls(area, area.row.updateSpan, area.column.updateSpan).reverse().forEach(function (i) {
            return cloned.prepend(Object.assign(i, {
              raws: {
                between: gridArea.raws.between
              }
            }));
          });
          cloned.selectors = changeDuplicateAreaSelectors(cloned.selectors, rule.selectors);

          if (rulesToInsert[lastArea].lastRule) {
            rulesToInsert[lastArea].lastRule.after(cloned);
          }

          rulesToInsert[lastArea].lastRule = cloned;
          lastRuleIsSet = true;
        })();
      } else if (rule.hasDuplicates && !rule.params && selectorIsComplex && gridAreaRule.selector.includes(rule.selectors[0])) {
        // grid-template has duplicates and not inside media rule
        // and the selector is complex
        gridAreaRule.walkDecls(/-ms-grid-(row|column)/, function (d) {
          return d.remove();
        });
        getMSDecls(area, area.row.updateSpan, area.column.updateSpan).reverse().forEach(function (i) {
          return gridAreaRule.prepend(Object.assign(i, {
            raws: {
              between: gridArea.raws.between
            }
          }));
        });
      } else if (rule.params) {
        (function () {
          // grid-template is inside media rule
          // if we're inside media rule, we need to store prefixed rules
          // inside rulesToInsert object to be able to preserve the order of media
          // rules and merge them easily
          var cloned = gridAreaRule.clone();
          cloned.removeAll();
          getMSDecls(area, area.row.updateSpan, area.column.updateSpan).reverse().forEach(function (i) {
            return cloned.prepend(Object.assign(i, {
              raws: {
                between: gridArea.raws.between
              }
            }));
          });

          if (rule.hasDuplicates && hasDuplicateName) {
            cloned.selectors = changeDuplicateAreaSelectors(cloned.selectors, rule.selectors);
          }

          cloned.raws = rule.node.raws;

          if (css.index(rule.node.parent) > gridAreaRuleIndex) {
            // append the prefixed rules right inside media rule
            // with grid-template
            rule.node.parent.append(cloned);
          } else {
            // store the rule to insert later
            rulesToInsert[lastArea][rule.params].push(cloned);
          } // set new rule as last rule ONLY if we didn't set lastRule for
          // this grid-area before


          if (!lastRuleIsSet) {
            rulesToInsert[lastArea].lastRule = gridAreaMedia || gridAreaRule;
          }
        })();
      }
    }

    return undefined;
  }); // append stored rules inside the media rules

  Object.keys(rulesToInsert).forEach(function (area) {
    var data = rulesToInsert[area];
    var lastRule = data.lastRule;
    Object.keys(data).reverse().filter(function (p) {
      return p !== 'lastRule';
    }).forEach(function (params) {
      if (data[params].length > 0 && lastRule) {
        lastRule.after({
          name: 'media',
          params: params
        });
        lastRule.next().append(data[params]);
      }
    });
  });
  return undefined;
}
/**
 * Warn user if grid area identifiers are not found
 * @param  {Object} areas
 * @param  {Declaration} decl
 * @param  {Result} result
 * @return {void}
 */


function warnMissedAreas(areas, decl, result) {
  var missed = Object.keys(areas);
  decl.root().walkDecls('grid-area', function (gridArea) {
    missed = missed.filter(function (e) {
      return e !== gridArea.value;
    });
  });

  if (missed.length > 0) {
    decl.warn(result, 'Can not find grid areas: ' + missed.join(', '));
  }

  return undefined;
}
/**
 * compare selectors with grid-area rule and grid-template rule
 * show warning if grid-template selector is not found
 * (this function used for grid-area rule)
 * @param  {Declaration} decl
 * @param  {Result} result
 * @return {void}
 */


function warnTemplateSelectorNotFound(decl, result) {
  var rule = decl.parent;
  var root = decl.root();
  var duplicatesFound = false; // slice selector array. Remove the last part (for comparison)

  var slicedSelectorArr = list.space(rule.selector).filter(function (str) {
    return str !== '>';
  }).slice(0, -1); // we need to compare only if selector is complex.
  // e.g '.grid-cell' is simple, but '.parent > .grid-cell' is complex

  if (slicedSelectorArr.length > 0) {
    var gridTemplateFound = false;
    var foundAreaSelector = null;
    root.walkDecls(/grid-template(-areas)?$/, function (d) {
      var parent = d.parent;
      var templateSelectors = parent.selectors;

      var _parseTemplate2 = parseTemplate({
        decl: d,
        gap: getGridGap(d)
      }),
          areas = _parseTemplate2.areas;

      var hasArea = areas[decl.value]; // find the the matching selectors

      for (var _iterator3 = templateSelectors, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref10;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref10 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref10 = _i3.value;
        }

        var tplSelector = _ref10;

        if (gridTemplateFound) {
          break;
        }

        var tplSelectorArr = list.space(tplSelector).filter(function (str) {
          return str !== '>';
        });
        gridTemplateFound = tplSelectorArr.every(function (item, idx) {
          return item === slicedSelectorArr[idx];
        });
      }

      if (gridTemplateFound || !hasArea) {
        return true;
      }

      if (!foundAreaSelector) {
        foundAreaSelector = parent.selector;
      } // if we found the duplicate area with different selector


      if (foundAreaSelector && foundAreaSelector !== parent.selector) {
        duplicatesFound = true;
      }

      return undefined;
    }); // warn user if we didn't find template

    if (!gridTemplateFound && duplicatesFound) {
      decl.warn(result, "Autoprefixer cannot find a grid-template " + ("containing the duplicate grid-area \"" + decl.value + "\" ") + ("with full selector matching: " + slicedSelectorArr.join(' ')));
    }
  }
}
/**
 * warn user if both grid-area and grid-(row|column)
 * declarations are present in the same rule
 * @param  {Declaration} decl
 * @param  {Result} result
 * @return {void}
 */


function warnIfGridRowColumnExists(decl, result) {
  var rule = decl.parent;
  var decls = [];
  rule.walkDecls(/^grid-(row|column)/, function (d) {
    if (!/-end$/.test(d.prop) && !/^span/.test(d.value)) {
      decls.push(d);
    }
  });

  if (decls.length > 0) {
    decls.forEach(function (d) {
      d.warn(result, "You already have a grid-area declaration present in the rule. " + ("You should use either grid-area or " + d.prop + ", not both"));
    });
  }

  return undefined;
} // Gap utils


function getGridGap(decl) {
  var gap = {}; // try to find gap

  var testGap = /^(grid-)?((row|column)-)?gap$/;
  decl.parent.walkDecls(testGap, function (_ref11) {
    var prop = _ref11.prop,
        value = _ref11.value;

    if (/^(grid-)?gap$/.test(prop)) {
      var _parser$nodes = parser(value).nodes,
          row = _parser$nodes[0],
          column = _parser$nodes[2];
      gap.row = row && parser.stringify(row);
      gap.column = column ? parser.stringify(column) : gap.row;
    }

    if (/^(grid-)?row-gap$/.test(prop)) gap.row = value;
    if (/^(grid-)?column-gap$/.test(prop)) gap.column = value;
  });
  return gap;
}
/**
 * parse media parameters (for example 'min-width: 500px')
 * @param  {String} params parameter to parse
 * @return {}
 */


function parseMediaParams(params) {
  if (!params) {
    return false;
  }

  var parsed = parser(params);
  var prop;
  var value;
  parsed.walk(function (node) {
    if (node.type === 'word' && /min|max/g.test(node.value)) {
      prop = node.value;
    } else if (node.value.includes('px')) {
      value = parseInt(node.value.replace(/\D/g, ''));
    }
  });
  return [prop, value];
}
/**
 * Compare the selectors and decide if we
 * need to inherit gap from compared selector or not.
 * @type {String} selA
 * @type {String} selB
 * @return {Boolean}
 */


function shouldInheritGap(selA, selB) {
  var result; // get arrays of selector split in 3-deep array

  var splitSelectorArrA = splitSelector(selA);
  var splitSelectorArrB = splitSelector(selB);

  if (splitSelectorArrA[0].length < splitSelectorArrB[0].length) {
    // abort if selectorA has lower descendant specificity then selectorB
    // (e.g '.grid' and '.hello .world .grid')
    return false;
  } else if (splitSelectorArrA[0].length > splitSelectorArrB[0].length) {
    // if selectorA has higher descendant specificity then selectorB
    // (e.g '.foo .bar .grid' and '.grid')
    var idx = splitSelectorArrA[0].reduce(function (res, _ref12, index) {
      var item = _ref12[0];
      var firstSelectorPart = splitSelectorArrB[0][0][0];

      if (item === firstSelectorPart) {
        return index;
      }

      return false;
    }, false);

    if (idx) {
      result = splitSelectorArrB[0].every(function (arr, index) {
        return arr.every(function (part, innerIndex) {
          return (// because selectorA has more space elements, we need to slice
            // selectorA array by 'idx' number to compare them
            splitSelectorArrA[0].slice(idx)[index][innerIndex] === part
          );
        });
      });
    }
  } else {
    // if selectorA has the same descendant specificity as selectorB
    // this condition covers cases such as: '.grid.foo.bar' and '.grid'
    result = splitSelectorArrB.some(function (byCommaArr) {
      return byCommaArr.every(function (bySpaceArr, index) {
        return bySpaceArr.every(function (part, innerIndex) {
          return splitSelectorArrA[0][index][innerIndex] === part;
        });
      });
    });
  }

  return result;
}
/**
 * inherit grid gap values from the closest rule above
 * with the same selector
 * @param  {Declaration} decl
 * @param  {Object} gap gap values
 * @return {Object | Boolean} return gap values or false (if not found)
 */


function inheritGridGap(decl, gap) {
  var rule = decl.parent;
  var mediaRule = getParentMedia(rule);
  var root = rule.root(); // get an array of selector split in 3-deep array

  var splitSelectorArr = splitSelector(rule.selector); // abort if the rule already has gaps

  if (Object.keys(gap).length > 0) {
    return false;
  } // e.g ['min-width']


  var _parseMediaParams = parseMediaParams(mediaRule.params),
      prop = _parseMediaParams[0];

  var lastBySpace = splitSelectorArr[0]; // get escaped value from the selector
  // if we have '.grid-2.foo.bar' selector, will be '\.grid\-2'

  var escaped = escapeRegexp(lastBySpace[lastBySpace.length - 1][0]);
  var regexp = new RegExp("(" + escaped + "$)|(" + escaped + "[,.])"); // find the closest rule with the same selector

  var closestRuleGap;
  root.walkRules(regexp, function (r) {
    var gridGap; // abort if are checking the same rule

    if (rule.toString() === r.toString()) {
      return false;
    } // find grid-gap values


    r.walkDecls('grid-gap', function (d) {
      return gridGap = getGridGap(d);
    }); // skip rule without gaps

    if (!gridGap || Object.keys(gridGap).length === 0) {
      return true;
    } // skip rules that should not be inherited from


    if (!shouldInheritGap(rule.selector, r.selector)) {
      return true;
    }

    var media = getParentMedia(r);

    if (media) {
      // if we are inside media, we need to check that media props match
      // e.g ('min-width' === 'min-width')
      var propToCompare = parseMediaParams(media.params)[0];

      if (propToCompare === prop) {
        closestRuleGap = gridGap;
        return true;
      }
    } else {
      closestRuleGap = gridGap;
      return true;
    }

    return undefined;
  }); // if we find the closest gap object

  if (closestRuleGap && Object.keys(closestRuleGap).length > 0) {
    return closestRuleGap;
  }

  return false;
}

function warnGridGap(_ref13) {
  var gap = _ref13.gap,
      hasColumns = _ref13.hasColumns,
      decl = _ref13.decl,
      result = _ref13.result;
  var hasBothGaps = gap.row && gap.column;

  if (!hasColumns && (hasBothGaps || gap.column && !gap.row)) {
    delete gap.column;
    decl.warn(result, 'Can not implement grid-gap without grid-template-columns');
  }
}
/**
 * normalize the grid-template-rows/columns values
 * @param  {String} str grid-template-rows/columns value
 * @return {Array} normalized array with values
 * @example
 * let normalized = normalizeRowColumn('1fr repeat(2, 20px 50px) 1fr')
 * normalized // <= ['1fr', '20px', '50px', '20px', '50px', '1fr']
 */


function normalizeRowColumn(str) {
  var normalized = parser(str).nodes.reduce(function (result, node) {
    if (node.type === 'function' && node.value === 'repeat') {
      var key = 'count';

      var _node$nodes$reduce = node.nodes.reduce(function (acc, n) {
        if (n.type === 'word' && key === 'count') {
          acc[0] = Math.abs(parseInt(n.value));
          return acc;
        }

        if (n.type === 'div' && n.value === ',') {
          key = 'value';
          return acc;
        }

        if (key === 'value') {
          acc[1] += parser.stringify(n);
        }

        return acc;
      }, [0, '']),
          count = _node$nodes$reduce[0],
          value = _node$nodes$reduce[1];

      if (count) {
        for (var i = 0; i < count; i++) {
          result.push(value);
        }
      }

      return result;
    }

    if (node.type === 'space') {
      return result;
    }

    return result.concat(parser.stringify(node));
  }, []);
  return normalized;
}
/**
 * Autoplace grid items
 * @param {Declaration} decl
 * @param {Result} result
 * @param {Object} gap gap values
 * @param {String} autoflowValue grid-auto-flow value
 * @return {void}
 * @see https://github.com/postcss/autoprefixer/issues/1148
 */


function autoplaceGridItems(decl, result, gap, autoflowValue) {
  if (autoflowValue === void 0) {
    autoflowValue = 'row';
  }

  var parent = decl.parent;
  var rowDecl = parent.nodes.find(function (i) {
    return i.prop === 'grid-template-rows';
  });
  var rows = normalizeRowColumn(rowDecl.value);
  var columns = normalizeRowColumn(decl.value); // Build array of area names with dummy values. If we have 3 columns and
  // 2 rows, filledRows will be equal to ['1 2 3', '4 5 6']

  var filledRows = rows.map(function (_, rowIndex) {
    return Array.from({
      length: columns.length
    }, function (v, k) {
      return k + rowIndex * columns.length + 1;
    }).join(' ');
  });
  var areas = parseGridAreas({
    rows: filledRows,
    gap: gap
  });
  var keys = Object.keys(areas);
  var items = keys.map(function (i) {
    return areas[i];
  }); // Change the order of cells if grid-auto-flow value is 'column'

  if (autoflowValue.includes('column')) {
    items = items.sort(function (a, b) {
      return a.column.start - b.column.start;
    });
  } // Insert new rules


  items.reverse().forEach(function (item, index) {
    var column = item.column,
        row = item.row;
    var nodeSelector = parent.selectors.map(function (sel) {
      return sel + (" > *:nth-child(" + (keys.length - index) + ")");
    }).join(', '); // create new rule

    var node = parent.clone().removeAll(); // change rule selector

    node.selector = nodeSelector; // insert prefixed row/column values

    node.append({
      prop: '-ms-grid-row',
      value: row.start
    });
    node.append({
      prop: '-ms-grid-column',
      value: column.start
    }); // insert rule

    parent.after(node);
  });
  return undefined;
}

module.exports = {
  parse: parse,
  translate: translate,
  parseTemplate: parseTemplate,
  parseGridAreas: parseGridAreas,
  warnMissedAreas: warnMissedAreas,
  insertAreas: insertAreas,
  insertDecl: insertDecl,
  prefixTrackProp: prefixTrackProp,
  prefixTrackValue: prefixTrackValue,
  getGridGap: getGridGap,
  warnGridGap: warnGridGap,
  warnTemplateSelectorNotFound: warnTemplateSelectorNotFound,
  warnIfGridRowColumnExists: warnIfGridRowColumnExists,
  inheritGridGap: inheritGridGap,
  autoplaceGridItems: autoplaceGridItems
};