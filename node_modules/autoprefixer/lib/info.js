"use strict";

var browserslist = require('browserslist');

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

var NAMES = {
  ie: 'IE',
  ie_mob: 'IE Mobile',
  ios_saf: 'iOS',
  op_mini: 'Opera Mini',
  op_mob: 'Opera Mobile',
  and_chr: 'Chrome for Android',
  and_ff: 'Firefox for Android',
  and_uc: 'UC for Android'
};

function prefix(name, prefixes, note) {
  var out = "  " + name;
  if (note) out += ' *';
  out += ': ';
  out += prefixes.map(function (i) {
    return i.replace(/^-(.*)-$/g, '$1');
  }).join(', ');
  out += '\n';
  return out;
}

module.exports = function (prefixes) {
  if (prefixes.browsers.selected.length === 0) {
    return 'No browsers selected';
  }

  var versions = {};

  for (var _iterator = prefixes.browsers.selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _browser = _ref;

    var parts = _browser.split(' ');

    var _name2 = parts[0];
    var version = parts[1];
    _name2 = NAMES[_name2] || capitalize(_name2);

    if (versions[_name2]) {
      versions[_name2].push(version);
    } else {
      versions[_name2] = [version];
    }
  }

  var out = 'Browsers:\n';

  for (var browser in versions) {
    var list = versions[browser];
    list = list.sort(function (a, b) {
      return parseFloat(b) - parseFloat(a);
    });
    out += "  " + browser + ": " + list.join(', ') + "\n";
  }

  var coverage = browserslist.coverage(prefixes.browsers.selected);
  var round = Math.round(coverage * 100) / 100.0;
  out += "\nThese browsers account for " + round + "% of all users globally\n";
  var atrules = [];

  for (var name in prefixes.add) {
    var data = prefixes.add[name];

    if (name[0] === '@' && data.prefixes) {
      atrules.push(prefix(name, data.prefixes));
    }
  }

  if (atrules.length > 0) {
    out += "\nAt-Rules:\n" + atrules.sort().join('');
  }

  var selectors = [];

  for (var _iterator2 = prefixes.add.selectors, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var selector = _ref2;

    if (selector.prefixes) {
      selectors.push(prefix(selector.name, selector.prefixes));
    }
  }

  if (selectors.length > 0) {
    out += "\nSelectors:\n" + selectors.sort().join('');
  }

  var values = [];
  var props = [];
  var hadGrid = false;

  for (var _name in prefixes.add) {
    var _data = prefixes.add[_name];

    if (_name[0] !== '@' && _data.prefixes) {
      var grid = _name.indexOf('grid-') === 0;
      if (grid) hadGrid = true;
      props.push(prefix(_name, _data.prefixes, grid));
    }

    if (!Array.isArray(_data.values)) {
      continue;
    }

    for (var _iterator3 = _data.values, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
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

      var _grid = value.name.indexOf('grid') !== -1;

      if (_grid) hadGrid = true;
      var string = prefix(value.name, value.prefixes, _grid);

      if (values.indexOf(string) === -1) {
        values.push(string);
      }
    }
  }

  if (props.length > 0) {
    out += "\nProperties:\n" + props.sort().join('');
  }

  if (values.length > 0) {
    out += "\nValues:\n" + values.sort().join('');
  }

  if (hadGrid) {
    out += '\n* - Prefixes will be added only on grid: true option.\n';
  }

  if (!atrules.length && !selectors.length && !props.length && !values.length) {
    out += '\nAwesome! Your browsers don\'t require any vendor prefixes.' + '\nNow you can remove Autoprefixer from build steps.';
  }

  return out;
};