(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global._30s = factory());
}(this, (function () { 'use strict';

var fs = typeof require !== "undefined" && require('fs');
var JSONToFile = function JSONToFile(obj, filename) {
  return fs.writeFile(filename + ".json", JSON.stringify(obj, null, 2));
};

var RGBToHex = function RGBToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};

var URLJoin = function URLJoin() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.join('/').replace(/[\/]+/g, '/').replace(/^(.+):\//, '$1://').replace(/^file:/, 'file:/').replace(/\/(\?|&|#[^!])/g, '$1').replace(/\?/g, '&').replace('&', '?');
};

var UUIDGeneratorBrowser = function UUIDGeneratorBrowser() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

var crypto$1 = typeof require !== "undefined" && require('crypto');
var UUIDGeneratorNode = function UUIDGeneratorNode() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto$1.randomBytes(1)[0] & 15 >> c / 4).toString(16);
  });
};

var anagrams = function anagrams(str) {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce(function (acc, letter, i) {
    return acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(function (val) {
      return letter + val;
    }));
  }, []);
};

var arrayToHtmlList = function arrayToHtmlList(arr, listID) {
  return arr.map(function (item) {
    return document.querySelector('#' + listID).innerHTML += '<li>' + item + '</li>';
  });
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ary = function ary(fn, n) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(undefined, _toConsumableArray(args.slice(0, n)));
  };
};

var atob = function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
};

var average = function average() {
  for (var _len = arguments.length, nums = Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }

  return [].concat(nums).reduce(function (acc, val) {
    return acc + val;
  }, 0) / nums.length;
};

var averageBy = function averageBy(arr, fn) {
  return arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  }).reduce(function (acc, val) {
    return acc + val;
  }, 0) / arr.length;
};

var bind = function bind(fn, context) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function () {
    return fn.apply(context, args.concat.apply(args, arguments));
  };
};

var bindKey = function bindKey(context, fn) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function () {
    return context[fn].apply(context, args.concat.apply(args, arguments));
  };
};

var bottomVisible = function bottomVisible() {
  return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
};

var btoa = function btoa(str) {
  return new Buffer(str, 'binary').toString('base64');
};

var byteSize = function byteSize(str) {
  return new Blob([str]).size;
};

var call = function call(key) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function (context) {
    return context[key].apply(context, args);
  };
};

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var capitalize = function capitalize(_ref) {
  var _ref2 = _toArray(_ref),
      first = _ref2[0],
      rest = _ref2.slice(1);

  var lowerRest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
};

var capitalizeEveryWord = function capitalizeEveryWord(str) {
  return str.replace(/\b[a-z]/g, function (char) {
    return char.toUpperCase();
  });
};

var castArray = function castArray(val) {
  return Array.isArray(val) ? val : [val];
};

var chainAsync = function chainAsync(fns) {
  var curr = 0;
  var next = function next() {
    return fns[curr++](next);
  };
  next();
};

var chunk = function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, function (v, i) {
    return arr.slice(i * size, i * size + size);
  });
};

var clampNumber = function clampNumber(num, a, b) {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
};

var cloneRegExp = function cloneRegExp(regExp) {
  return new RegExp(regExp.source, regExp.flags);
};

var coalesce = function coalesce() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.find(function (_) {
    return ![undefined, null].includes(_);
  });
};

var coalesceFactory = function coalesceFactory(valid) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.find(valid);
  };
};

var collectInto = function collectInto(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn(args);
  };
};

var colorize = function colorize() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return {
    black: '\x1B[30m' + args.join(' '),
    red: '\x1B[31m' + args.join(' '),
    green: '\x1B[32m' + args.join(' '),
    yellow: '\x1B[33m' + args.join(' '),
    blue: '\x1B[34m' + args.join(' '),
    magenta: '\x1B[35m' + args.join(' '),
    cyan: '\x1B[36m' + args.join(' '),
    white: '\x1B[37m' + args.join(' '),
    bgBlack: '\x1B[40m' + args.join(' ') + '\x1B[0m',
    bgRed: '\x1B[41m' + args.join(' ') + '\x1B[0m',
    bgGreen: '\x1B[42m' + args.join(' ') + '\x1B[0m',
    bgYellow: '\x1B[43m' + args.join(' ') + '\x1B[0m',
    bgBlue: '\x1B[44m' + args.join(' ') + '\x1B[0m',
    bgMagenta: '\x1B[45m' + args.join(' ') + '\x1B[0m',
    bgCyan: '\x1B[46m' + args.join(' ') + '\x1B[0m',
    bgWhite: '\x1B[47m' + args.join(' ') + '\x1B[0m'
  };
};

var compact = function compact(arr) {
  return arr.filter(Boolean);
};

var compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};

var composeRight = function composeRight() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return g(f.apply(undefined, arguments));
    };
  });
};

var copyToClipboard = function copyToClipboard(str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

var countBy = function countBy(arr, fn) {
  return arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  }).reduce(function (acc, val, i) {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
};

var countOccurrences = function countOccurrences(arr, val) {
  return arr.reduce(function (a, v) {
    return v === val ? a + 1 : a + 0;
  }, 0);
};

var createElement = function createElement(str) {
  var el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};

var createEventHub = function createEventHub() {
  return {
    hub: Object.create(null),
    emit: function emit(event, data) {
      (this.hub[event] || []).forEach(function (handler) {
        return handler(data);
      });
    },
    on: function on(event, handler) {
      if (!this.hub[event]) this.hub[event] = [];
      this.hub[event].push(handler);
    },
    off: function off(event, handler) {
      var i = (this.hub[event] || []).findIndex(function (h) {
        return h === handler;
      });
      if (i > -1) this.hub[event].splice(i, 1);
    }
  };
};

var currentURL = function currentURL() {
  return window.location.href;
};

var curry = function curry(fn) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.length;
  return arity <= args.length ? fn.apply(undefined, args) : curry.bind.apply(curry, [null, fn, arity].concat(args));
};

function _toArray$1(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var decapitalize = function decapitalize(_ref) {
  var _ref2 = _toArray$1(_ref),
      first = _ref2[0],
      rest = _ref2.slice(1);

  var upperRest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var deepClone = function deepClone(obj) {
  var clone = Object.assign({}, obj);
  Object.keys(clone).forEach(function (key) {
    return clone[key] = _typeof(obj[key]) === 'object' ? deepClone(obj[key]) : obj[key];
  });
  return clone;
};

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var deepFlatten = function deepFlatten(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray$1(arr.map(function (v) {
    return Array.isArray(v) ? deepFlatten(v) : v;
  })));
};

function _toConsumableArray$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaults = function defaults(obj) {
  for (var _len = arguments.length, defs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    defs[_key - 1] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}, obj].concat(_toConsumableArray$2(defs.reverse()), [obj]));
};

var defer = function defer(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return setTimeout.apply(undefined, [fn, 1].concat(args));
};

var delay = function delay(fn, wait) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return setTimeout.apply(undefined, [fn, wait].concat(args));
};

var detectDeviceType = function detectDeviceType() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
  );
};

var difference = function difference(a, b) {
  var s = new Set(b);
  return a.filter(function (x) {
    return !s.has(x);
  });
};

var differenceBy = function differenceBy(a, b, fn) {
  var s = new Set(b.map(function (v) {
    return fn(v);
  }));
  return a.filter(function (x) {
    return !s.has(fn(x));
  });
};

var differenceWith = function differenceWith(arr, val, comp) {
  return arr.filter(function (a) {
    return val.findIndex(function (b) {
      return comp(a, b);
    }) === -1;
  });
};

function _toConsumableArray$3(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var digitize = function digitize(n) {
  return [].concat(_toConsumableArray$3("" + n)).map(function (i) {
    return parseInt(i);
  });
};

var distance = function distance(x0, y0, x1, y1) {
  return Math.hypot(x1 - x0, y1 - y0);
};

var dropElements = function dropElements(arr, func) {
  while (arr.length > 0 && !func(arr[0])) {
    arr = arr.slice(1);
  }return arr;
};

var dropRight = function dropRight(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return arr.slice(0, -n);
};

var elementIsVisibleInViewport = function elementIsVisibleInViewport(el) {
    var partiallyVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _el$getBoundingClient = el.getBoundingClientRect(),
        top = _el$getBoundingClient.top,
        left = _el$getBoundingClient.left,
        bottom = _el$getBoundingClient.bottom,
        right = _el$getBoundingClient.right;

    var _window = window,
        innerHeight = _window.innerHeight,
        innerWidth = _window.innerWidth;

    return partiallyVisible ? (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray$2(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var elo = function elo(_ref) {
  var _ref2 = _toArray$2(_ref),
      ratings = _ref2.slice(0);

  var kFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
  var selfRating = arguments[2];

  var _ratings = _slicedToArray(ratings, 2),
      a = _ratings[0],
      b = _ratings[1];

  var expectedScore = function expectedScore(self, opponent) {
    return 1 / (1 + Math.pow(10, (opponent - self) / 400));
  };
  var newRating = function newRating(rating, i) {
    return (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  };
  if (ratings.length === 2) {
    return [newRating(a, 1), newRating(b, 0)];
  } else {
    for (var i = 0; i < ratings.length; i++) {
      var j = i;
      while (j < ratings.length - 1) {
        var _elo = elo([ratings[i], ratings[j + 1]], kFactor);

        var _elo2 = _slicedToArray(_elo, 2);

        ratings[i] = _elo2[0];
        ratings[j + 1] = _elo2[1];

        j++;
      }
    }
  }
  return ratings;
};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var equals = function equals(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a === 'undefined' ? 'undefined' : _typeof$1(a)) != 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof$1(b)) !== 'object') return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  var keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(function (k) {
    return equals(a[k], b[k]);
  });
};

var escapeHTML = function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, function (tag) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag;
  });
};

var escapeRegExp = function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

var everyNth = function everyNth(arr, nth) {
  return arr.filter(function (e, i) {
    return i % nth === nth - 1;
  });
};

var extendHex = function extendHex(shortHex) {
  return '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map(function (x) {
    return x + x;
  }).join('');
};

var factorial = function factorial(n) {
  return n < 0 ? function () {
    throw new TypeError('Negative numbers are not allowed!');
  }() : n <= 1 ? 1 : n * factorial(n - 1);
};

var fibonacci = function fibonacci(n) {
  return Array.from({ length: n }).reduce(function (acc, val, i) {
    return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i);
  }, []);
};

var filterNonUnique = function filterNonUnique(arr) {
  return arr.filter(function (i) {
    return arr.indexOf(i) === arr.lastIndexOf(i);
  });
};

var findKey = function findKey(obj, fn) {
  return Object.keys(obj).find(function (key) {
    return fn(obj[key], key, obj);
  });
};

var findLast = function findLast(arr, fn) {
  return arr.filter(fn).slice(-1)[0];
};

var findLastIndex = function findLastIndex(arr, fn) {
  return arr.map(function (val, i) {
    return [i, val];
  }).filter(function (val) {
    return fn(val[1], val[0], arr);
  }).slice(-1)[0][0];
};

var findLastKey = function findLastKey(obj, fn) {
  return Object.keys(obj).reverse().find(function (key) {
    return fn(obj[key], key, obj);
  });
};

var flatten = function flatten(arr) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return depth != 1 ? arr.reduce(function (a, v) {
    return a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v);
  }, []) : arr.reduce(function (a, v) {
    return a.concat(v);
  }, []);
};

var flip = function flip(fn) {
  return function (first) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return fn.apply(undefined, rest.concat([first]));
  };
};

var forEachRight = function forEachRight(arr, callback) {
  return arr.slice(0).reverse().forEach(callback);
};

var forOwn = function forOwn(obj, fn) {
  return Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key, obj);
  });
};

var forOwnRight = function forOwnRight(obj, fn) {
  return Object.keys(obj).reverse().forEach(function (key) {
    return fn(obj[key], key, obj);
  });
};

var formatDuration = function formatDuration(ms) {
  if (ms < 0) ms = -ms;
  var time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time).filter(function (val) {
    return val[1] !== 0;
  }).map(function (val) {
    return val[1] + ' ' + (val[1] !== 1 ? val[0] + 's' : val[0]);
  }).join(', ');
};

var fromCamelCase = function fromCamelCase(str) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
};

var functionName = function functionName(fn) {
  return console.debug(fn.name), fn;
};

function _toConsumableArray$4(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var functions = function functions(obj) {
  var inherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (inherited ? [].concat(_toConsumableArray$4(Object.keys(obj)), _toConsumableArray$4(Object.keys(Object.getPrototypeOf(obj)))) : Object.keys(obj)).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

var gcd = function gcd() {
  for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  var _gcd = function _gcd(x, y) {
    return !y ? x : gcd(y, x % y);
  };
  return [].concat(arr).reduce(function (a, b) {
    return _gcd(a, b);
  });
};

var geometricProgression = function geometricProgression(end) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  return Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1 }).map(function (v, i) {
    return start * Math.pow(step, i);
  });
};

var get = function get(from) {
  for (var _len = arguments.length, selectors = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return [].concat(selectors).map(function (s) {
    return s.replace(/\[([^\[\]]*)\]/g, '.$1.').split('.').filter(function (t) {
      return t !== '';
    }).reduce(function (prev, cur) {
      return prev && prev[cur];
    }, from);
  });
};

var getDaysDiffBetweenDates = function getDaysDiffBetweenDates(dateInitial, dateFinal) {
  return (dateFinal - dateInitial) / (1000 * 3600 * 24);
};

var getScrollPosition = function getScrollPosition() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  };
};

var getStyle = function getStyle(el, ruleName) {
  return getComputedStyle(el)[ruleName];
};

var getType = function getType(v) {
  return v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
};

var getURLParameters = function getURLParameters(url) {
  return url.match(/([^?=&]+)(=([^&]*))/g).reduce(function (a, v) {
    return a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a;
  }, {});
};

var groupBy = function groupBy(arr, fn) {
  return arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  }).reduce(function (acc, val, i) {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});
};

var hammingDistance = function hammingDistance(num1, num2) {
  return ((num1 ^ num2).toString(2).match(/1/g) || '').length;
};

var hasClass = function hasClass(el, className) {
  return el.classList.contains(className);
};

var hasFlags = function hasFlags() {
  for (var _len = arguments.length, flags = Array(_len), _key = 0; _key < _len; _key++) {
    flags[_key] = arguments[_key];
  }

  return flags.every(function (flag) {
    return process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag);
  });
};

var hashBrowser = function hashBrowser(val) {
  return crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then(function (h) {
    var hexes = [],
        view = new DataView(h);
    for (var i = 0; i < view.byteLength; i += 4) {
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    }return hexes.join('');
  });
};

var crypto$2 = typeof require !== "undefined" && require('crypto');
var hashNode = function hashNode(val) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(crypto$2.createHash('sha256').update(val).digest('hex'));
    }, 0);
  });
};

var head = function head(arr) {
  return arr[0];
};

function _toConsumableArray$5(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var hexToRGB = function hexToRGB(hex) {
  var alpha = false,
      h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [].concat(_toConsumableArray$5(h)).map(function (x) {
    return x + x;
  }).join('');else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return 'rgb' + (alpha ? 'a' : '') + '(' + (h >>> (alpha ? 24 : 16)) + ', ' + ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) + ', ' + ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) + (alpha ? ', ' + (h & 0x000000ff) : '') + ')';
};

var hide = function hide() {
  for (var _len = arguments.length, el = Array(_len), _key = 0; _key < _len; _key++) {
    el[_key] = arguments[_key];
  }

  return [].concat(el).forEach(function (e) {
    return e.style.display = 'none';
  });
};

var httpGet = function httpGet(url, callback) {
  var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.error;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    return callback(request.responseText);
  };
  request.onerror = function () {
    return err(request);
  };
  request.send();
};

var httpPost = function httpPost(url, data, callback) {
  var err = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : console.error;

  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = function () {
    return callback(request.responseText);
  };
  request.onerror = function () {
    return err(request);
  };
  request.send(data);
};

var httpsRedirect = function httpsRedirect() {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

var inRange = function inRange(n, start) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (end && start > end) end = [start, start = end][0];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};

var indexOfAll = function indexOfAll(arr, val) {
  var indices = [];
  arr.forEach(function (el, i) {
    return el === val && indices.push(i);
  });
  return indices;
};

var initial = function initial(arr) {
  return arr.slice(0, -1);
};

var initialize2DArray = function initialize2DArray(w, h) {
  var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return Array.from({ length: h }).map(function () {
    return Array.from({ length: w }).fill(val);
  });
};

var initializeArrayWithRange = function initializeArrayWithRange(end) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(function (v, i) {
    return i * step + start;
  });
};

var initializeArrayWithRangeRight = function initializeArrayWithRangeRight(end) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(function (v, i, arr) {
    return (arr.length - i - 1) * step + start;
  });
};

var initializeArrayWithValues = function initializeArrayWithValues(n) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Array(n).fill(val);
};

var intersection = function intersection(a, b) {
  var s = new Set(b);
  return a.filter(function (x) {
    return s.has(x);
  });
};

var intersectionBy = function intersectionBy(a, b, fn) {
  var s = new Set(b.map(function (x) {
    return fn(x);
  }));
  return a.filter(function (x) {
    return s.has(fn(x));
  });
};

var intersectionWith = function intersectionWith(a, b, comp) {
  return a.filter(function (x) {
    return b.findIndex(function (y) {
      return comp(x, y);
    }) !== -1;
  });
};

var invertKeyValues = function invertKeyValues(obj, fn) {
  return Object.keys(obj).reduce(function (acc, key) {
    var val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});
};

var is = function is(type, val) {
  return val instanceof type;
};

var isAbsoluteURL = function isAbsoluteURL(str) {
  return (/^[a-z][a-z0-9+.-]*:/.test(str)
  );
};

function _toConsumableArray$6(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArrayLike = function isArrayLike(val) {
  try {
    return [].concat(_toConsumableArray$6(val)), true;
  } catch (e) {
    return false;
  }
};

var isBoolean = function isBoolean(val) {
  return typeof val === 'boolean';
};

var isDivisible = function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
};

var isEmpty = function isEmpty(val) {
  return val == null || !(Object.keys(val) || val).length;
};

var isEven = function isEven(num) {
  return num % 2 === 0;
};

var isFunction = function isFunction(val) {
  return typeof val === 'function';
};

var isLowerCase = function isLowerCase(str) {
  return str === str.toLowerCase();
};

var isNil = function isNil(val) {
  return val === undefined || val === null;
};

var isNull = function isNull(val) {
  return val === null;
};

var isNumber = function isNumber(val) {
  return typeof val === 'number';
};

var isObject = function isObject(obj) {
  return obj === Object(obj);
};

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObjectLike = function isObjectLike(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof$2(val)) === 'object';
};

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isPlainObject = function isPlainObject(val) {
  return !!val && (typeof val === 'undefined' ? 'undefined' : _typeof$3(val)) === 'object' && val.constructor === Object;
};

var isPrime = function isPrime(num) {
  var boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i <= boundary; i++) {
    if (num % i == 0) return false;
  }return num >= 2;
};

var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isPrimitive = function isPrimitive(val) {
  return !['object', 'function'].includes(typeof val === 'undefined' ? 'undefined' : _typeof$4(val)) || val === null;
};

var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isPromiseLike = function isPromiseLike(obj) {
  return obj !== null && ((typeof obj === 'undefined' ? 'undefined' : _typeof$5(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

var _slicedToArray$1 = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var isSorted = function isSorted(arr) {
  var direction = arr[0] > arr[1] ? -1 : 1;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray$1(_ref, 2);

      var i = _ref2[0];
      var val = _ref2[1];

      if (i === arr.length - 1) return direction;else if ((val - arr[i + 1]) * direction > 0) return 0;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var _typeof$6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isSymbol = function isSymbol(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof$6(val)) === 'symbol';
};

var isTravisCI = function isTravisCI() {
  return 'TRAVIS' in process.env && 'CI' in process.env;
};

var isUndefined = function isUndefined(val) {
  return val === undefined;
};

var isUpperCase = function isUpperCase(str) {
  return str === str.toUpperCase();
};

var isValidJSON = function isValidJSON(obj) {
  try {
    JSON.parse(obj);
    return true;
  } catch (e) {
    return false;
  }
};

var join = function join(arr) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : separator;
  return arr.reduce(function (acc, val, i) {
    return i == arr.length - 2 ? acc + val + end : i == arr.length - 1 ? acc + val : acc + val + separator;
  }, '');
};

var last = function last(arr) {
  return arr[arr.length - 1];
};

var lcm = function lcm() {
  for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  var gcd = function gcd(x, y) {
    return !y ? x : gcd(y, x % y);
  };
  var _lcm = function _lcm(x, y) {
    return x * y / gcd(x, y);
  };
  return [].concat(arr).reduce(function (a, b) {
    return _lcm(a, b);
  });
};

var longestItem = function longestItem() {
  for (var _len = arguments.length, vals = Array(_len), _key = 0; _key < _len; _key++) {
    vals[_key] = arguments[_key];
  }

  return [].concat(vals).sort(function (a, b) {
    return b.length - a.length;
  })[0];
};

var lowercaseKeys = function lowercaseKeys(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
};

var luhnCheck = function luhnCheck(num) {
  var arr = (num + '').split('').reverse().map(function (x) {
    return parseInt(x);
  });
  var lastDigit = arr.splice(0, 1)[0];
  var sum = arr.reduce(function (acc, val, i) {
    return i % 2 !== 0 ? acc + val : acc + val * 2 % 9 || 9;
  }, 0);
  sum += lastDigit;
  return sum % 10 === 0;
};

var mapKeys = function mapKeys(obj, fn) {
  return Object.keys(obj).reduce(function (acc, k) {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});
};

var mapObject = function mapObject(arr, fn) {
  return function (a) {
    return a = [arr, arr.map(fn)], a[0].reduce(function (acc, val, ind) {
      return acc[val] = a[1][ind], acc;
    }, {});
  }();
};

var mapValues = function mapValues(obj, fn) {
  return Object.keys(obj).reduce(function (acc, k) {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});
};

var mask = function mask(cc) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
  return ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);
};

var matches = function matches(obj, source) {
  return Object.keys(source).every(function (key) {
    return obj.hasOwnProperty(key) && obj[key] === source[key];
  });
};

var matchesWith = function matchesWith(obj, source, fn) {
  return Object.keys(source).every(function (key) {
    return obj.hasOwnProperty(key) && fn ? fn(obj[key], source[key], key, obj, source) : obj[key] == source[key];
  });
};

function _toConsumableArray$7(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var maxBy = function maxBy(arr, fn) {
  return Math.max.apply(Math, _toConsumableArray$7(arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  })));
};

function _toConsumableArray$8(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var maxN = function maxN(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return [].concat(_toConsumableArray$8(arr)).sort(function (a, b) {
    return b - a;
  }).slice(0, n);
};

function _toConsumableArray$9(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var median = function median(arr) {
  var mid = Math.floor(arr.length / 2),
      nums = [].concat(_toConsumableArray$9(arr)).sort(function (a, b) {
    return a - b;
  });
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

var memoize = function memoize(fn) {
  var cache = new Map();
  var cached = function cached(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

var merge = function merge() {
  for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  return [].concat(objs).reduce(function (acc, obj) {
    return Object.keys(obj).reduce(function (a, k) {
      acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
      return acc;
    }, {});
  }, {});
};

function _toConsumableArray$10(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var minBy = function minBy(arr, fn) {
  return Math.min.apply(Math, _toConsumableArray$10(arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  })));
};

function _toConsumableArray$11(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var minN = function minN(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return [].concat(_toConsumableArray$11(arr)).sort(function (a, b) {
    return a - b;
  }).slice(0, n);
};

var negate = function negate(func) {
  return function () {
    return !func.apply(undefined, arguments);
  };
};

var nthArg = function nthArg(n) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.slice(n)[0];
  };
};

var nthElement = function nthElement(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];
};

var objectFromPairs = function objectFromPairs(arr) {
  return arr.reduce(function (a, v) {
    return a[v[0]] = v[1], a;
  }, {});
};

var objectToPairs = function objectToPairs(obj) {
  return Object.keys(obj).map(function (k) {
    return [k, obj[k]];
  });
};

var observeMutations = function observeMutations(element, callback, options) {
  var observer = new MutationObserver(function (mutations) {
    return mutations.forEach(function (m) {
      return callback(m);
    });
  });
  observer.observe(element, Object.assign({
    childList: true,
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    subtree: true
  }, options));
  return observer;
};

var off = function off(el, evt, fn) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return el.removeEventListener(evt, fn, opts);
};

var omit = function omit(obj, arr) {
  return Object.keys(obj).filter(function (k) {
    return !arr.includes(k);
  }).reduce(function (acc, key) {
    return acc[key] = obj[key], acc;
  }, {});
};

var omitBy = function omitBy(obj, fn) {
  return Object.keys(obj).filter(function (k) {
    return !fn(obj[k], k);
  }).reduce(function (acc, key) {
    return acc[key] = obj[key], acc;
  }, {});
};

var on = function on(el, evt, fn) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var delegatorFn = function delegatorFn(e) {
    return e.target.matches(opts.target) && fn.call(e.target, e);
  };
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
  if (opts.target) return delegatorFn;
};

var onUserInputChange = function onUserInputChange(callback) {
  var type = 'mouse',
      lastTime = 0;
  var mousemoveHandler = function mousemoveHandler() {
    var now = performance.now();
    if (now - lastTime < 20) type = 'mouse', callback(type), document.removeEventListener('mousemove', mousemoveHandler);
    lastTime = now;
  };
  document.addEventListener('touchstart', function () {
    if (type === 'touch') return;
    type = 'touch', callback(type), document.addEventListener('mousemove', mousemoveHandler);
  });
};

var once = function once(fn) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(this, args);
  };
};

var _slicedToArray$2 = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray$12(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var orderBy = function orderBy(arr, props, orders) {
  return [].concat(_toConsumableArray$12(arr)).sort(function (a, b) {
    return props.reduce(function (acc, prop, i) {
      if (acc === 0) {
        var _ref = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]],
            _ref2 = _slicedToArray$2(_ref, 2),
            p1 = _ref2[0],
            p2 = _ref2[1];

        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0);
  });
};

var over = function over() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.map(function (fn) {
      return fn.apply(null, args);
    });
  };
};

var palindrome = function palindrome(str) {
  var s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === s.split('').reverse().join('');
};

var parseCookie = function parseCookie(str) {
  return str.split(';').map(function (v) {
    return v.split('=');
  }).reduce(function (acc, v) {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});
};

var partial = function partial(fn) {
  for (var _len = arguments.length, partials = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    partials[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fn.apply(undefined, partials.concat(args));
  };
};

var partialRight = function partialRight(fn) {
  for (var _len = arguments.length, partials = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    partials[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fn.apply(undefined, args.concat(partials));
  };
};

var partition = function partition(arr, fn) {
  return arr.reduce(function (acc, val, i, arr) {
    acc[fn(val, i, arr) ? 0 : 1].push(val);
    return acc;
  }, [[], []]);
};

var percentile = function percentile(arr, val) {
  return 100 * arr.reduce(function (acc, v) {
    return acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0);
  }, 0) / arr.length;
};

var pick = function pick(obj, arr) {
  return arr.reduce(function (acc, curr) {
    return curr in obj && (acc[curr] = obj[curr]), acc;
  }, {});
};

var pickBy = function pickBy(obj, fn) {
  return Object.keys(obj).filter(function (k) {
    return fn(obj[k], k);
  }).reduce(function (acc, key) {
    return acc[key] = obj[key], acc;
  }, {});
};

var pipeFunctions = function pipeFunctions() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return g(f.apply(undefined, arguments));
    };
  });
};

var _typeof$7 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var pluralize = function pluralize(val, word) {
  var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : word + 's';

  var _pluralize = function _pluralize(num, word) {
    var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : word + 's';
    return [1, -1].includes(Number(num)) ? word : plural;
  };
  if ((typeof val === 'undefined' ? 'undefined' : _typeof$7(val)) === 'object') return function (num, word) {
    return _pluralize(num, word, val[word]);
  };
  return _pluralize(val, word, plural);
};

var powerset = function powerset(arr) {
  return arr.reduce(function (a, v) {
    return a.concat(a.map(function (r) {
      return [v].concat(r);
    }));
  }, [[]]);
};

var prettyBytes = function prettyBytes(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var addSpace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  var exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  var n = Number(((num < 0 ? -num : num) / Math.pow(1000, exponent)).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};

var primes = function primes(num) {
  var arr = Array.from({ length: num - 1 }).map(function (x, i) {
    return i + 2;
  }),
      sqroot = Math.floor(Math.sqrt(num)),
      numsTillSqroot = Array.from({ length: sqroot - 1 }).map(function (x, i) {
    return i + 2;
  });
  numsTillSqroot.forEach(function (x) {
    return arr = arr.filter(function (y) {
      return y % x !== 0 || y == x;
    });
  });
  return arr;
};

var promisify = function promisify(func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      return func.apply(undefined, args.concat([function (err, result) {
        return err ? reject(err) : resolve(result);
      }]));
    });
  };
};

var pull = function pull(arr) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var argState = Array.isArray(args[0]) ? args[0] : args;
  var pulled = arr.filter(function (v, i) {
    return !argState.includes(v);
  });
  arr.length = 0;
  pulled.forEach(function (v) {
    return arr.push(v);
  });
};

var pullAtIndex = function pullAtIndex(arr, pullArr) {
  var removed = [];
  var pulled = arr.map(function (v, i) {
    return pullArr.includes(i) ? removed.push(v) : v;
  }).filter(function (v, i) {
    return !pullArr.includes(i);
  });
  arr.length = 0;
  pulled.forEach(function (v) {
    return arr.push(v);
  });
  return removed;
};

var pullAtValue = function pullAtValue(arr, pullArr) {
  var removed = [],
      pushToRemove = arr.forEach(function (v, i) {
    return pullArr.includes(v) ? removed.push(v) : v;
  }),
      mutateTo = arr.filter(function (v, i) {
    return !pullArr.includes(v);
  });
  arr.length = 0;
  mutateTo.forEach(function (v) {
    return arr.push(v);
  });
  return removed;
};

var randomHexColorCode = function randomHexColorCode() {
  var n = (Math.random() * 0xfffff | 0).toString(16);
  return '#' + (n.length !== 6 ? (Math.random() * 0xf | 0).toString(16) + n : n);
};

var randomIntArrayInRange = function randomIntArrayInRange(min, max) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.from({ length: n }, function () {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });
};

var randomIntegerInRange = function randomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomNumberInRange = function randomNumberInRange(min, max) {
  return Math.random() * (max - min) + min;
};

var fs$1 = typeof require !== "undefined" && require('fs');
var readFileLines = function readFileLines(filename) {
  return fs$1.readFileSync(filename).toString('UTF8').split('\n');
};

var redirect = function redirect(url) {
  var asLink = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return asLink ? window.location.href = url : window.location.replace(url);
};

var reduceSuccessive = function reduceSuccessive(arr, fn, acc) {
  return arr.reduce(function (res, val, i, arr) {
    return res.push(fn(res.slice(-1)[0], val, i, arr)), res;
  }, [acc]);
};

var reduceWhich = function reduceWhich(arr) {
  var comparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
    return a - b;
  };
  return arr.reduce(function (a, b) {
    return comparator(a, b) >= 0 ? b : a;
  });
};

var reducedFilter = function reducedFilter(data, keys, fn) {
  return data.filter(fn).map(function (el) {
    return keys.reduce(function (acc, key) {
      acc[key] = el[key];
      return acc;
    }, {});
  });
};

var remove = function remove(arr, func) {
  return Array.isArray(arr) ? arr.filter(func).reduce(function (acc, val) {
    arr.splice(arr.indexOf(val), 1);
    return acc.concat(val);
  }, []) : [];
};

function _toConsumableArray$13(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reverseString = function reverseString(str) {
  return [].concat(_toConsumableArray$13(str)).reverse().join('');
};

var round = function round(n) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Number(Math.round(n + "e" + decimals) + "e-" + decimals);
};

var runAsync = function runAsync(fn) {
  var blob = 'var fn = ' + fn.toString() + '; postMessage(fn());';
  var worker = new Worker(URL.createObjectURL(new Blob([blob]), {
    type: 'application/javascript; charset=utf-8'
  }));
  return new Promise(function (res, rej) {
    worker.onmessage = function (_ref) {
      var data = _ref.data;

      res(data), worker.terminate();
    };
    worker.onerror = function (err) {
      rej(err), worker.terminate();
    };
  });
};

var runPromisesInSeries = function runPromisesInSeries(ps) {
  return ps.reduce(function (p, next) {
    return p.then(next);
  }, Promise.resolve());
};

var sample = function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function _toArray$3(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var sampleSize = function sampleSize(_ref) {
  var _ref2 = _toArray$3(_ref),
      arr = _ref2.slice(0);

  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var m = arr.length;
  while (m) {
    var i = Math.floor(Math.random() * m--);
    var _ref3 = [arr[i], arr[m]];
    arr[m] = _ref3[0];
    arr[i] = _ref3[1];
  }
  return arr.slice(0, n);
};

var scrollToTop = function scrollToTop() {
  var c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

var sdbm = function sdbm(str) {
  var arr = str.split('');
  return arr.reduce(function (hashCode, currentVal) {
    return hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode;
  }, 0);
};

var serializeCookie = function serializeCookie(name, val) {
  return encodeURIComponent(name) + "=" + encodeURIComponent(val);
};

var setStyle = function setStyle(el, ruleName, val) {
  return el.style[ruleName] = val;
};

var shallowClone = function shallowClone(obj) {
  return Object.assign({}, obj);
};

var show = function show() {
  for (var _len = arguments.length, el = Array(_len), _key = 0; _key < _len; _key++) {
    el[_key] = arguments[_key];
  }

  return [].concat(el).forEach(function (e) {
    return e.style.display = '';
  });
};

function _toArray$4(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var shuffle = function shuffle(_ref) {
  var _ref2 = _toArray$4(_ref),
      arr = _ref2.slice(0);

  var m = arr.length;
  while (m) {
    var i = Math.floor(Math.random() * m--);
    var _ref3 = [arr[i], arr[m]];
    arr[m] = _ref3[0];
    arr[i] = _ref3[1];
  }
  return arr;
};

var similarity = function similarity(arr, values) {
  return arr.filter(function (v) {
    return values.includes(v);
  });
};

var _typeof$8 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var size = function size(val) {
  return Array.isArray(val) ? val.length : val && (typeof val === 'undefined' ? 'undefined' : _typeof$8(val)) === 'object' ? val.size || val.length || Object.keys(val).length : typeof val === 'string' ? new Blob([val]).size : 0;
};

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

function _toConsumableArray$14(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var sortCharactersInString = function sortCharactersInString(str) {
  return [].concat(_toConsumableArray$14(str)).sort(function (a, b) {
    return a.localeCompare(b);
  }).join('');
};

var sortedIndex = function sortedIndex(arr, n) {
  var isDescending = arr[0] > arr[arr.length - 1];
  var index = arr.findIndex(function (el) {
    return isDescending ? n >= el : n <= el;
  });
  return index === -1 ? arr.length : index;
};

var sortedLastIndex = function sortedLastIndex(arr, n) {
  var isDescending = arr[0] > arr[arr.length - 1];
  var index = arr.map(function (val, i) {
    return [i, val];
  }).filter(function (el) {
    return isDescending ? n >= el[1] : n >= el[1];
  }).slice(-1)[0][0];
  return index === -1 ? arr.length : index;
};

var splitLines = function splitLines(str) {
  return str.split(/\r?\n/);
};

function _toConsumableArray$15(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var spreadOver = function spreadOver(fn) {
  return function (argsArr) {
    return fn.apply(undefined, _toConsumableArray$15(argsArr));
  };
};

var standardDeviation = function standardDeviation(arr) {
  var usePopulation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var mean = arr.reduce(function (acc, val) {
    return acc + val;
  }, 0) / arr.length;
  return Math.sqrt(arr.reduce(function (acc, val) {
    return acc.concat(Math.pow(val - mean, 2));
  }, []).reduce(function (acc, val) {
    return acc + val;
  }, 0) / (arr.length - (usePopulation ? 0 : 1)));
};

var sum = function sum() {
  for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  return [].concat(arr).reduce(function (acc, val) {
    return acc + val;
  }, 0);
};

var sumBy = function sumBy(arr, fn) {
  return arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  }).reduce(function (acc, val) {
    return acc + val;
  }, 0);
};

var sumPower = function sumPower(end) {
  var power = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array(end + 1 - start).fill(0).map(function (x, i) {
    return Math.pow(i + start, power);
  }).reduce(function (a, b) {
    return a + b;
  }, 0);
};

function _toConsumableArray$16(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var symmetricDifference = function symmetricDifference(a, b) {
  var sA = new Set(a),
      sB = new Set(b);
  return [].concat(_toConsumableArray$16(a.filter(function (x) {
    return !sB.has(x);
  })), _toConsumableArray$16(b.filter(function (x) {
    return !sA.has(x);
  })));
};

function _toConsumableArray$17(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var symmetricDifferenceBy = function symmetricDifferenceBy(a, b, fn) {
  var sA = new Set(a.map(function (v) {
    return fn(v);
  })),
      sB = new Set(b.map(function (v) {
    return fn(v);
  }));
  return [].concat(_toConsumableArray$17(a.filter(function (x) {
    return !sB.has(fn(x));
  })), _toConsumableArray$17(b.filter(function (x) {
    return !sA.has(fn(x));
  })));
};

function _toConsumableArray$18(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var symmetricDifferenceWith = function symmetricDifferenceWith(arr, val, comp) {
  return [].concat(_toConsumableArray$18(arr.filter(function (a) {
    return val.findIndex(function (b) {
      return comp(a, b);
    }) === -1;
  })), _toConsumableArray$18(val.filter(function (a) {
    return arr.findIndex(function (b) {
      return comp(a, b);
    }) === -1;
  })));
};

var tail = function tail(arr) {
  return arr.length > 1 ? arr.slice(1) : arr;
};

var take = function take(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return arr.slice(0, n);
};

var takeRight = function takeRight(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return arr.slice(arr.length - n, arr.length);
};

var timeTaken = function timeTaken(callback) {
  console.time('timeTaken');
  var r = callback();
  console.timeEnd('timeTaken');
  return r;
};

var times = function times(n, fn) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};

var toCamelCase = function toCamelCase(str) {
  var s = str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase();
  }).join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

var toDecimalMark = function toDecimalMark(num) {
  return num.toLocaleString('en-US');
};

var toKebabCase = function toKebabCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join('-');
};

var toOrdinalSuffix = function toOrdinalSuffix(num) {
  var int = parseInt(num),
      digits = [int % 10, int % 100],
      ordinals = ['st', 'nd', 'rd', 'th'],
      oPattern = [1, 2, 3, 4],
      tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1]) ? int + ordinals[digits[0] - 1] : int + ordinals[3];
};

var toSafeInteger = function toSafeInteger(num) {
  return Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));
};

var toSnakeCase = function toSnakeCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join('_');
};

var toggleClass = function toggleClass(el, className) {
  return el.classList.toggle(className);
};

var tomorrow = function tomorrow() {
  var t = new Date();
  t.setDate(t.getDate() + 1);
  return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
};

var transform = function transform(obj, fn, acc) {
  return Object.keys(obj).reduce(function (a, k) {
    return fn(a, obj[k], k, obj);
  }, acc);
};

var truncateString = function truncateString(str, num) {
  return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
};

var truthCheckCollection = function truthCheckCollection(collection, pre) {
  return collection.every(function (obj) {
    return obj[pre];
  });
};

var unary = function unary(fn) {
  return function (val) {
    return fn(val);
  };
};

var unescapeHTML = function unescapeHTML(str) {
  return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function (tag) {
    return {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&#39;': "'",
      '&quot;': '"'
    }[tag] || tag;
  });
};

var unfold = function unfold(fn, seed) {
  var result = [],
      val = [null, seed];
  while (val = fn(val[1])) {
    result.push(val[0]);
  }return result;
};

function _toConsumableArray$19(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var union = function union(a, b) {
  return Array.from(new Set([].concat(_toConsumableArray$19(a), _toConsumableArray$19(b))));
};

function _toConsumableArray$20(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var unionBy = function unionBy(a, b, fn) {
  var s = new Set(a.map(function (v) {
    return fn(v);
  }));
  return Array.from(new Set([].concat(_toConsumableArray$20(a), _toConsumableArray$20(b.filter(function (x) {
    return !s.has(fn(x));
  })))));
};

function _toConsumableArray$21(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var unionWith = function unionWith(a, b, comp) {
  return Array.from(new Set([].concat(_toConsumableArray$21(a), _toConsumableArray$21(b.filter(function (x) {
    return a.findIndex(function (y) {
      return comp(x, y);
    }) === -1;
  })))));
};

function _toConsumableArray$22(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var uniqueElements = function uniqueElements(arr) {
  return [].concat(_toConsumableArray$22(new Set(arr)));
};

var untildify = function untildify(str) {
  return str.replace(/^~($|\/|\\)/, (typeof require !== "undefined" && require('os').homedir()) + "$1");
};

function _toConsumableArray$23(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var unzip = function unzip(arr) {
  return arr.reduce(function (acc, val) {
    return val.forEach(function (v, i) {
      return acc[i].push(v);
    }), acc;
  }, Array.from({
    length: Math.max.apply(Math, _toConsumableArray$23(arr.map(function (x) {
      return x.length;
    })))
  }).map(function (x) {
    return [];
  }));
};

function _toConsumableArray$24(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var unzipWith = function unzipWith(arr, fn) {
  return arr.reduce(function (acc, val) {
    return val.forEach(function (v, i) {
      return acc[i].push(v);
    }), acc;
  }, Array.from({
    length: Math.max.apply(Math, _toConsumableArray$24(arr.map(function (x) {
      return x.length;
    })))
  }).map(function (x) {
    return [];
  })).map(function (val) {
    return fn.apply(undefined, _toConsumableArray$24(val));
  });
};

var validateNumber = function validateNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
};

var without = function without(arr) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return arr.filter(function (v) {
    return !args.includes(v);
  });
};

var words = function words(str) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /[^a-zA-Z-]+/;
  return str.split(pattern).filter(Boolean);
};

var xProd = function xProd(a, b) {
  return a.reduce(function (acc, x) {
    return acc.concat(b.map(function (y) {
      return [x, y];
    }));
  }, []);
};

var yesNo = function yesNo(val) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (/^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def
  );
};

function _toConsumableArray$25(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var zip = function zip() {
  for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  var maxLength = Math.max.apply(Math, _toConsumableArray$25(arrays.map(function (x) {
    return x.length;
  })));
  return Array.from({ length: maxLength }).map(function (_, i) {
    return Array.from({ length: arrays.length }, function (_, k) {
      return arrays[k][i];
    });
  });
};

var zipObject = function zipObject(props, values) {
  return props.reduce(function (obj, prop, index) {
    return obj[prop] = values[index], obj;
  }, {});
};

function _toConsumableArray$26(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var zipWith = function zipWith() {
  for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  var length = arrays.length;
  var fn = length > 1 ? arrays[length - 1] : undefined;
  fn = typeof fn == 'function' ? (arrays.pop(), fn) : undefined;
  var maxLength = Math.max.apply(Math, _toConsumableArray$26(arrays.map(function (x) {
    return x.length;
  })));
  var result = Array.from({ length: maxLength }).map(function (_, i) {
    return Array.from({ length: arrays.length }, function (_, k) {
      return arrays[k][i];
    });
  });
  return fn ? result.map(function (arr) {
    return fn.apply(undefined, _toConsumableArray$26(arr));
  }) : result;
};

var imports = { JSONToFile: JSONToFile, RGBToHex: RGBToHex, URLJoin: URLJoin, UUIDGeneratorBrowser: UUIDGeneratorBrowser, UUIDGeneratorNode: UUIDGeneratorNode, anagrams: anagrams, arrayToHtmlList: arrayToHtmlList, ary: ary, atob: atob, average: average, averageBy: averageBy, bind: bind, bindKey: bindKey, bottomVisible: bottomVisible, btoa: btoa, byteSize: byteSize, call: call, capitalize: capitalize, capitalizeEveryWord: capitalizeEveryWord, castArray: castArray, chainAsync: chainAsync, chunk: chunk, clampNumber: clampNumber, cloneRegExp: cloneRegExp, coalesce: coalesce, coalesceFactory: coalesceFactory, collectInto: collectInto, colorize: colorize, compact: compact, compose: compose, composeRight: composeRight, copyToClipboard: copyToClipboard, countBy: countBy, countOccurrences: countOccurrences, createElement: createElement, createEventHub: createEventHub, currentURL: currentURL, curry: curry, decapitalize: decapitalize, deepClone: deepClone, deepFlatten: deepFlatten, defaults: defaults, defer: defer, delay: delay, detectDeviceType: detectDeviceType, difference: difference, differenceBy: differenceBy, differenceWith: differenceWith, digitize: digitize, distance: distance, dropElements: dropElements, dropRight: dropRight, elementIsVisibleInViewport: elementIsVisibleInViewport, elo: elo, equals: equals, escapeHTML: escapeHTML, escapeRegExp: escapeRegExp, everyNth: everyNth, extendHex: extendHex, factorial: factorial, fibonacci: fibonacci, filterNonUnique: filterNonUnique, findKey: findKey, findLast: findLast, findLastIndex: findLastIndex, findLastKey: findLastKey, flatten: flatten, flip: flip, forEachRight: forEachRight, forOwn: forOwn, forOwnRight: forOwnRight, formatDuration: formatDuration, fromCamelCase: fromCamelCase, functionName: functionName, functions: functions, gcd: gcd, geometricProgression: geometricProgression, get: get, getDaysDiffBetweenDates: getDaysDiffBetweenDates, getScrollPosition: getScrollPosition, getStyle: getStyle, getType: getType, getURLParameters: getURLParameters, groupBy: groupBy, hammingDistance: hammingDistance, hasClass: hasClass, hasFlags: hasFlags, hashBrowser: hashBrowser, hashNode: hashNode, head: head, hexToRGB: hexToRGB, hide: hide, httpGet: httpGet, httpPost: httpPost, httpsRedirect: httpsRedirect, inRange: inRange, indexOfAll: indexOfAll, initial: initial, initialize2DArray: initialize2DArray, initializeArrayWithRange: initializeArrayWithRange, initializeArrayWithRangeRight: initializeArrayWithRangeRight, initializeArrayWithValues: initializeArrayWithValues, intersection: intersection, intersectionBy: intersectionBy, intersectionWith: intersectionWith, invertKeyValues: invertKeyValues, is: is, isAbsoluteURL: isAbsoluteURL, isArrayLike: isArrayLike, isBoolean: isBoolean, isDivisible: isDivisible, isEmpty: isEmpty, isEven: isEven, isFunction: isFunction, isLowerCase: isLowerCase, isNil: isNil, isNull: isNull, isNumber: isNumber, isObject: isObject, isObjectLike: isObjectLike, isPlainObject: isPlainObject, isPrime: isPrime, isPrimitive: isPrimitive, isPromiseLike: isPromiseLike, isSorted: isSorted, isString: isString, isSymbol: isSymbol, isTravisCI: isTravisCI, isUndefined: isUndefined, isUpperCase: isUpperCase, isValidJSON: isValidJSON, join: join, last: last, lcm: lcm, longestItem: longestItem, lowercaseKeys: lowercaseKeys, luhnCheck: luhnCheck, mapKeys: mapKeys, mapObject: mapObject, mapValues: mapValues, mask: mask, matches: matches, matchesWith: matchesWith, maxBy: maxBy, maxN: maxN, median: median, memoize: memoize, merge: merge, minBy: minBy, minN: minN, negate: negate, nthArg: nthArg, nthElement: nthElement, objectFromPairs: objectFromPairs, objectToPairs: objectToPairs, observeMutations: observeMutations, off: off, omit: omit, omitBy: omitBy, on: on, onUserInputChange: onUserInputChange, once: once, orderBy: orderBy, over: over, palindrome: palindrome, parseCookie: parseCookie, partial: partial, partialRight: partialRight, partition: partition, percentile: percentile, pick: pick, pickBy: pickBy, pipeFunctions: pipeFunctions, pluralize: pluralize, powerset: powerset, prettyBytes: prettyBytes, primes: primes, promisify: promisify, pull: pull, pullAtIndex: pullAtIndex, pullAtValue: pullAtValue, randomHexColorCode: randomHexColorCode, randomIntArrayInRange: randomIntArrayInRange, randomIntegerInRange: randomIntegerInRange, randomNumberInRange: randomNumberInRange, readFileLines: readFileLines, redirect: redirect, reduceSuccessive: reduceSuccessive, reduceWhich: reduceWhich, reducedFilter: reducedFilter, remove: remove, reverseString: reverseString, round: round, runAsync: runAsync, runPromisesInSeries: runPromisesInSeries, sample: sample, sampleSize: sampleSize, scrollToTop: scrollToTop, sdbm: sdbm, serializeCookie: serializeCookie, setStyle: setStyle, shallowClone: shallowClone, show: show, shuffle: shuffle, similarity: similarity, size: size, sleep: sleep, sortCharactersInString: sortCharactersInString, sortedIndex: sortedIndex, sortedLastIndex: sortedLastIndex, splitLines: splitLines, spreadOver: spreadOver, standardDeviation: standardDeviation, sum: sum, sumBy: sumBy, sumPower: sumPower, symmetricDifference: symmetricDifference, symmetricDifferenceBy: symmetricDifferenceBy, symmetricDifferenceWith: symmetricDifferenceWith, tail: tail, take: take, takeRight: takeRight, timeTaken: timeTaken, times: times, toCamelCase: toCamelCase, toDecimalMark: toDecimalMark, toKebabCase: toKebabCase, toOrdinalSuffix: toOrdinalSuffix, toSafeInteger: toSafeInteger, toSnakeCase: toSnakeCase, toggleClass: toggleClass, tomorrow: tomorrow, transform: transform, truncateString: truncateString, truthCheckCollection: truthCheckCollection, unary: unary, unescapeHTML: unescapeHTML, unfold: unfold, union: union, unionBy: unionBy, unionWith: unionWith, uniqueElements: uniqueElements, untildify: untildify, unzip: unzip, unzipWith: unzipWith, validateNumber: validateNumber, without: without, words: words, xProd: xProd, yesNo: yesNo, zip: zip, zipObject: zipObject, zipWith: zipWith };

return imports;

})));
