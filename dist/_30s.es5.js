(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global._30s = factory());
}(this, (function () { 'use strict';

var JSONToDate = function JSONToDate(arr) {
  var dt = new Date(parseInt(arr.toString().substr(6)));
  return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
};

var fs = typeof require !== "undefined" && require('fs');
var JSONToFile = function JSONToFile(obj, filename) {
  return fs.writeFile(filename + ".json", JSON.stringify(obj, null, 2));
};

var RGBToHex = function RGBToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
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

var average = function average() {
  var _ref;

  var nums = (_ref = []).concat.apply(_ref, arguments);
  return nums.reduce(function (acc, val) {
    return acc + val;
  }, 0) / nums.length;
};

var bottomVisible = function bottomVisible() {
  return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
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

var cleanObj = function cleanObj(obj) {
  var keysToKeep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var childIndicator = arguments[2];

  Object.keys(obj).forEach(function (key) {
    if (key === childIndicator) {
      cleanObj(obj[key], keysToKeep, childIndicator);
    } else if (!keysToKeep.includes(key)) {
      delete obj[key];
    }
  });
  return obj;
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

var collatz = function collatz(n) {
  return n % 2 == 0 ? n / 2 : 3 * n + 1;
};

var collectInto = function collectInto(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn(args);
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

var countOccurrences = function countOccurrences(arr, value) {
  return arr.reduce(function (a, v) {
    return v === value ? a + 1 : a + 0;
  }, 0);
};

var countVowels = function countVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length;
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var deepFlatten = function deepFlatten(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(arr.map(function (v) {
    return Array.isArray(v) ? deepFlatten(v) : v;
  })));
};

var defer = function defer(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return setTimeout.apply(undefined, [fn, 1].concat(args));
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

var differenceWith = function differenceWith(arr, val, comp) {
  return arr.filter(function (a) {
    return !val.find(function (b) {
      return comp(a, b);
    });
  });
};

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var digitize = function digitize(n) {
  return [].concat(_toConsumableArray$1('' + n)).map(function (i) {
    return parseInt(i);
  });
};

var distance = function distance(x0, y0, x1, y1) {
  return Math.hypot(x1 - x0, y1 - y0);
};

function _toConsumableArray$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var distinctValuesOfArray = function distinctValuesOfArray(arr) {
  return [].concat(_toConsumableArray$2(new Set(arr)));
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

var elo = function elo(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      a = _ref2[0],
      b = _ref2[1];

  var kFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;

  var expectedScore = function expectedScore(self, opponent) {
    return 1 / (1 + Math.pow(10, (opponent - self) / 400));
  };
  var newRating = function newRating(rating, i) {
    return rating + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  };
  return [newRating(a, 1), newRating(b, 0)];
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

var factors = function factors(num) {
  var primes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var isPrime = function isPrime(num) {
    var boundary = Math.floor(Math.sqrt(num));
    for (var i = 2; i <= boundary; i++) {
      if (num % i === 0) return false;
    }return num >= 2;
  };
  var isNeg = num < 0;
  num = isNeg ? -num : num;
  var array = Array.from({ length: num - 1 }).map(function (val, i) {
    return num % (i + 2) === 0 ? i + 2 : false;
  }).filter(function (val) {
    return val;
  });
  if (isNeg) array = array.reduce(function (acc, val) {
    acc.push(val);
    acc.push(-val);
    return acc;
  }, []);
  return primes ? array.filter(isPrime) : array;
};

var fibonacci = function fibonacci(n) {
  return Array.from({ length: n }).reduce(function (acc, val, i) {
    return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i);
  }, []);
};

var fibonacciCountUntilNum = function fibonacciCountUntilNum(num) {
  return Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
};

var fibonacciUntilNum = function fibonacciUntilNum(num) {
  var n = Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
  return Array.from({ length: n }).reduce(function (acc, val, i) {
    return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i);
  }, []);
};

var filterNonUnique = function filterNonUnique(arr) {
  return arr.filter(function (i) {
    return arr.indexOf(i) === arr.lastIndexOf(i);
  });
};

function _toConsumableArray$3(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var flatten = function flatten(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray$3(arr));
};

var flattenDepth = function flattenDepth(arr) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return depth != 1 ? arr.reduce(function (a, v) {
    return a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v);
  }, []) : arr.reduce(function (a, v) {
    return a.concat(v);
  }, []);
};

var flip = function flip(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(undefined, [args.pop()].concat(args));
  };
};

var fromCamelCase = function fromCamelCase(str) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
};

var functionName = function functionName(fn) {
  return console.debug(fn.name), fn;
};

var gcd = function gcd() {
  var _ref;

  var data = (_ref = []).concat.apply(_ref, arguments);
  var helperGcd = function helperGcd(x, y) {
    return !y ? x : gcd(y, x % y);
  };
  return data.reduce(function (a, b) {
    return helperGcd(a, b);
  });
};

var geometricProgression = function geometricProgression(end) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  return Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1 }).map(function (v, i) {
    return start * Math.pow(step, i);
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

var groupBy = function groupBy(arr, func) {
  return arr.map(typeof func === 'function' ? func : function (val) {
    return val[func];
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

var head = function head(arr) {
  return arr[0];
};

function _toConsumableArray$4(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var hexToRGB = function hexToRGB(hex) {
  var alpha = false,
      h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [].concat(_toConsumableArray$4(h)).map(function (x) {
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

var howManyTimes = function howManyTimes(num, divisor) {
  if (divisor === 1 || divisor === -1) return Infinity;
  if (divisor === 0) return 0;
  var i = 0;
  while (Number.isInteger(num / divisor)) {
    i++;
    num = num / divisor;
  }
  return i;
};

var httpsRedirect = function httpsRedirect() {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

var inRange = function inRange(n, start) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (end && start > end) end = [start, start = end][0];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};

var initial = function initial(arr) {
  return arr.slice(0, -1);
};

var initialize2DArray = function initialize2DArray(w, h) {
  var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return Array(h).fill().map(function () {
    return Array(w).fill(val);
  });
};

var initializeArrayWithRange = function initializeArrayWithRange(end) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(function (v, i) {
    return i * step + start;
  });
};

var initializeArrayWithValues = function initializeArrayWithValues(n) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Array(n).fill(value);
};

var intersection = function intersection(a, b) {
  var s = new Set(b);
  return a.filter(function (x) {
    return s.has(x);
  });
};

var invertKeyValues = function invertKeyValues(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    acc[obj[key]] = key;
    return acc;
  }, {});
};

var isAbsoluteURL = function isAbsoluteURL(str) {
  return (/^[a-z][a-z0-9+.-]*:/.test(str)
  );
};

var isArmstrongNumber = function isArmstrongNumber(digits) {
  return function (arr) {
    return arr.reduce(function (a, d) {
      return a + Math.pow(parseInt(d), arr.length);
    }, 0) == digits;
  }((digits + '').split(''));
};

var isArray = function isArray(val) {
  return !!val && Array.isArray(val);
};

function _toConsumableArray$5(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArrayLike = function isArrayLike(val) {
  try {
    return [].concat(_toConsumableArray$5(val)), true;
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

var isEven = function isEven(num) {
  return num % 2 === 0;
};

var isFunction = function isFunction(val) {
  return val && typeof val === 'function';
};

var isNull = function isNull(val) {
  return val === null;
};

var isNumber = function isNumber(val) {
  return typeof val === 'number';
};

var isPrime = function isPrime(num) {
  var boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i <= boundary; i++) {
    if (num % i == 0) return false;
  }return num >= 2;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isPrimitive = function isPrimitive(val) {
  return !['object', 'function'].includes(typeof val === 'undefined' ? 'undefined' : _typeof(val)) || val === null;
};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isPromiseLike = function isPromiseLike(obj) {
  return obj !== null && ((typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
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

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isSymbol = function isSymbol(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof$2(val)) === 'symbol';
};

var isTravisCI = function isTravisCI() {
  return 'TRAVIS' in process.env && 'CI' in process.env;
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
  var _ref;

  var gcd = function gcd(x, y) {
    return !y ? x : gcd(y, x % y);
  };
  var _lcm = function _lcm(x, y) {
    return x * y / gcd(x, y);
  };
  return (_ref = []).concat.apply(_ref, arguments).reduce(function (a, b) {
    return _lcm(a, b);
  });
};

var lowercaseKeys = function lowercaseKeys(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    acc[key.toLowerCase()] = obj[key];
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

var mask = function mask(cc) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
  return ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);
};

function _toConsumableArray$6(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var maxN = function maxN(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return [].concat(_toConsumableArray$6(arr)).sort(function (a, b) {
    return b - a;
  }).slice(0, n);
};

function _toConsumableArray$7(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var median = function median(arr) {
  var mid = Math.floor(arr.length / 2),
      nums = [].concat(_toConsumableArray$7(arr)).sort(function (a, b) {
    return a - b;
  });
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

var memoize = function memoize(fn) {
  var cache = Object.create(null);
  return function (value) {
    return cache[value] || (cache[value] = fn(value));
  };
};

function _toConsumableArray$8(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var minN = function minN(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return [].concat(_toConsumableArray$8(arr)).sort(function (a, b) {
    return a - b;
  }).slice(0, n);
};

var negate = function negate(func) {
  return function () {
    return !func.apply(undefined, arguments);
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

function _toConsumableArray$9(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var orderBy = function orderBy(arr, props, orders) {
  return [].concat(_toConsumableArray$9(arr)).sort(function (a, b) {
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

var palindrome = function palindrome(str) {
  var s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === s.split('').reverse().join('');
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

var pluralize = function pluralize(num, item) {
  var items = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : item + 's';
  return num <= 0 ? function () {
    throw new Error('\'num\' should be >= 1. Value povided was ' + num + '.');
  }() : num === 1 ? item : items;
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

function _toConsumableArray$10(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray$1(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var quickSort = function quickSort(_ref, desc) {
  var _ref2 = _toArray$1(_ref),
      n = _ref2[0],
      nums = _ref2.slice(1);

  return isNaN(n) ? [] : [].concat(_toConsumableArray$10(quickSort(nums.filter(function (v) {
    return desc ? v > n : v <= n;
  }), desc)), [n], _toConsumableArray$10(quickSort(nums.filter(function (v) {
    return !desc ? v > n : v <= n;
  }), desc)));
};

var randomHexColorCode = function randomHexColorCode() {
  var n = (Math.random() * 0xfffff | 0).toString(16);
  return '#' + (n.length !== 6 ? (Math.random() * 0xf | 0).toString(16) + n : n);
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

var repeatString = function repeatString() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  return num >= 0 ? str.repeat(num) : str;
};

var reverseString = function reverseString(str) {
  return str.split('').reverse().join('');
};

var round = function round(n) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Number(Math.round(n + "e" + decimals) + "e-" + decimals);
};

var runAsync = function runAsync(fn) {
  var blob = '\n    var fn = ' + fn.toString() + ';\n    this.postMessage(fn());\n  ';
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

function _toArray$2(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var sampleSize = function sampleSize(_ref) {
  var _ref2 = _toArray$2(_ref),
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

var select = function select(from, selector) {
  return selector.split('.').reduce(function (prev, cur) {
    return prev && prev[cur];
  }, from);
};

var setStyle = function setStyle(el, ruleName, value) {
  return el.style[ruleName] = value;
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

function _toArray$3(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var shuffle = function shuffle(_ref) {
  var _ref2 = _toArray$3(_ref),
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

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var size = function size(value) {
  return Array.isArray(value) ? value.length : value && (typeof value === 'undefined' ? 'undefined' : _typeof$3(value)) === 'object' ? value.size || value.length || Object.keys(value).length : typeof value === 'string' ? new Blob([value]).size : 0;
};

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var solveRPN = function solveRPN(rpn) {
  var OPERATORS = {
    '*': function _(a, b) {
      return a * b;
    },
    '+': function _(a, b) {
      return a + b;
    },
    '-': function _(a, b) {
      return a - b;
    },
    '/': function _(a, b) {
      return a / b;
    },
    '**': function _(a, b) {
      return Math.pow(a, b);
    }
  };
  var _ref = [[], rpn.replace(/\^/g, '**').split(/\s+/g).filter(function (el) {
    return !/\s+/.test(el) && el !== '';
  })],
      stack = _ref[0],
      solve = _ref[1];

  solve.forEach(function (symbol) {
    if (!isNaN(parseFloat(symbol)) && isFinite(symbol)) {
      stack.push(symbol);
    } else if (Object.keys(OPERATORS).includes(symbol)) {
      var _ref2 = [stack.pop(), stack.pop()],
          a = _ref2[0],
          b = _ref2[1];

      stack.push(OPERATORS[symbol](parseFloat(b), parseFloat(a)));
    } else {
      throw symbol + ' is not a recognized symbol';
    }
  });
  if (stack.length === 1) return stack.pop();else throw rpn + ' is not a proper RPN. Please check it and try again';
};

var sortCharactersInString = function sortCharactersInString(str) {
  return str.split('').sort(function (a, b) {
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

var speechSynthesis = function speechSynthesis(message) {
  var msg = new SpeechSynthesisUtterance(message);
  msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
};

var splitLines = function splitLines(str) {
  return str.split(/\r?\n/);
};

function _toConsumableArray$11(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var spreadOver = function spreadOver(fn) {
  return function (argsArr) {
    return fn.apply(undefined, _toConsumableArray$11(argsArr));
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
  var _ref;

  return (_ref = []).concat.apply(_ref, arguments).reduce(function (acc, val) {
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

function _toConsumableArray$12(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var symmetricDifference = function symmetricDifference(a, b) {
  var sA = new Set(a),
      sB = new Set(b);
  return [].concat(_toConsumableArray$12(a.filter(function (x) {
    return !sB.has(x);
  })), _toConsumableArray$12(b.filter(function (x) {
    return !sA.has(x);
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

var toCamelCase = function toCamelCase(str) {
  var s = str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase();
  }).join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

var toDecimalMark = function toDecimalMark(num) {
  return num.toLocaleString('en-US');
};

var toEnglishDate = function toEnglishDate(time) {
  try {
    return new Date(time).toISOString().split('T')[0].replace(/-/g, '/');
  } catch (e) {}
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

var toSnakeCase = function toSnakeCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join('_');
};

var toggleClass = function toggleClass(el, className) {
  return el.classList.toggle(className);
};

var tomorrow = function tomorrow() {
  return new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
};

var truncateString = function truncateString(str, num) {
  return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
};

var truthCheckCollection = function truthCheckCollection(collection, pre) {
  return collection.every(function (obj) {
    return obj[pre];
  });
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

function _toConsumableArray$13(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var union = function union(a, b) {
  return Array.from(new Set([].concat(_toConsumableArray$13(a), _toConsumableArray$13(b))));
};

var untildify = function untildify(str) {
  return str.replace(/^~($|\/|\\)/, (typeof require !== "undefined" && require('os').homedir()) + "$1");
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

var yesNo = function yesNo(val) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (/^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def
  );
};

function _toConsumableArray$14(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var zip = function zip() {
  for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  var maxLength = Math.max.apply(Math, _toConsumableArray$14(arrays.map(function (x) {
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

var imports = { JSONToDate: JSONToDate, JSONToFile: JSONToFile, RGBToHex: RGBToHex, UUIDGeneratorBrowser: UUIDGeneratorBrowser, UUIDGeneratorNode: UUIDGeneratorNode, anagrams: anagrams, arrayToHtmlList: arrayToHtmlList, average: average, bottomVisible: bottomVisible, byteSize: byteSize, call: call, capitalize: capitalize, capitalizeEveryWord: capitalizeEveryWord, chainAsync: chainAsync, chunk: chunk, clampNumber: clampNumber, cleanObj: cleanObj, cloneRegExp: cloneRegExp, coalesce: coalesce, coalesceFactory: coalesceFactory, collatz: collatz, collectInto: collectInto, compact: compact, compose: compose, copyToClipboard: copyToClipboard, countOccurrences: countOccurrences, countVowels: countVowels, currentURL: currentURL, curry: curry, deepFlatten: deepFlatten, defer: defer, detectDeviceType: detectDeviceType, difference: difference, differenceWith: differenceWith, digitize: digitize, distance: distance, distinctValuesOfArray: distinctValuesOfArray, dropElements: dropElements, dropRight: dropRight, elementIsVisibleInViewport: elementIsVisibleInViewport, elo: elo, escapeHTML: escapeHTML, escapeRegExp: escapeRegExp, everyNth: everyNth, extendHex: extendHex, factorial: factorial, factors: factors, fibonacci: fibonacci, fibonacciCountUntilNum: fibonacciCountUntilNum, fibonacciUntilNum: fibonacciUntilNum, filterNonUnique: filterNonUnique, flatten: flatten, flattenDepth: flattenDepth, flip: flip, fromCamelCase: fromCamelCase, functionName: functionName, gcd: gcd, geometricProgression: geometricProgression, getDaysDiffBetweenDates: getDaysDiffBetweenDates, getScrollPosition: getScrollPosition, getStyle: getStyle, getType: getType, getURLParameters: getURLParameters, groupBy: groupBy, hammingDistance: hammingDistance, hasClass: hasClass, hasFlags: hasFlags, head: head, hexToRGB: hexToRGB, hide: hide, howManyTimes: howManyTimes, httpsRedirect: httpsRedirect, inRange: inRange, initial: initial, initialize2DArray: initialize2DArray, initializeArrayWithRange: initializeArrayWithRange, initializeArrayWithValues: initializeArrayWithValues, intersection: intersection, invertKeyValues: invertKeyValues, isAbsoluteURL: isAbsoluteURL, isArmstrongNumber: isArmstrongNumber, isArray: isArray, isArrayLike: isArrayLike, isBoolean: isBoolean, isDivisible: isDivisible, isEven: isEven, isFunction: isFunction, isNull: isNull, isNumber: isNumber, isPrime: isPrime, isPrimitive: isPrimitive, isPromiseLike: isPromiseLike, isSorted: isSorted, isString: isString, isSymbol: isSymbol, isTravisCI: isTravisCI, isValidJSON: isValidJSON, join: join, last: last, lcm: lcm, lowercaseKeys: lowercaseKeys, mapObject: mapObject, mask: mask, maxN: maxN, median: median, memoize: memoize, minN: minN, negate: negate, nthElement: nthElement, objectFromPairs: objectFromPairs, objectToPairs: objectToPairs, onUserInputChange: onUserInputChange, once: once, orderBy: orderBy, palindrome: palindrome, percentile: percentile, pick: pick, pipeFunctions: pipeFunctions, pluralize: pluralize, powerset: powerset, prettyBytes: prettyBytes, primes: primes, promisify: promisify, pull: pull, pullAtIndex: pullAtIndex, pullAtValue: pullAtValue, quickSort: quickSort, randomHexColorCode: randomHexColorCode, randomIntegerInRange: randomIntegerInRange, randomNumberInRange: randomNumberInRange, readFileLines: readFileLines, redirect: redirect, reducedFilter: reducedFilter, remove: remove, repeatString: repeatString, reverseString: reverseString, round: round, runAsync: runAsync, runPromisesInSeries: runPromisesInSeries, sample: sample, sampleSize: sampleSize, scrollToTop: scrollToTop, sdbm: sdbm, select: select, setStyle: setStyle, shallowClone: shallowClone, show: show, shuffle: shuffle, similarity: similarity, size: size, sleep: sleep, solveRPN: solveRPN, sortCharactersInString: sortCharactersInString, sortedIndex: sortedIndex, speechSynthesis: speechSynthesis, splitLines: splitLines, spreadOver: spreadOver, standardDeviation: standardDeviation, sum: sum, sumPower: sumPower, symmetricDifference: symmetricDifference, tail: tail, take: take, takeRight: takeRight, timeTaken: timeTaken, toCamelCase: toCamelCase, toDecimalMark: toDecimalMark, toEnglishDate: toEnglishDate, toKebabCase: toKebabCase, toOrdinalSuffix: toOrdinalSuffix, toSnakeCase: toSnakeCase, toggleClass: toggleClass, tomorrow: tomorrow, truncateString: truncateString, truthCheckCollection: truthCheckCollection, unescapeHTML: unescapeHTML, union: union, untildify: untildify, validateNumber: validateNumber, without: without, words: words, yesNo: yesNo, zip: zip, zipObject: zipObject };

return imports;

})));
