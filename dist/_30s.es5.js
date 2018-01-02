(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global._30s = factory());
}(this, (function () { 'use strict';

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

var httpsRedirect = function httpsRedirect() {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
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
  return Array.from({ length: end + 1 - start }).map(function (v, i) {
    return i + start;
  });
};

var initializeArrayWithValues = function initializeArrayWithValues(n) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Array(n).fill(value);
};

var inRange = function inRange(n, start) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (end && start > end) end = [start, start = end][0];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};

var intersection = function intersection(a, b) {
  var s = new Set(b);
  return a.filter(function (x) {
    return s.has(x);
  });
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

var isNumber = function isNumber(val) {
  return typeof val === 'number';
};

var isPrime = function isPrime(num) {
  var boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i * i <= boundary; i++) {
    if (num % i == 0) return false;
  }return num >= 2;
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isSymbol = function isSymbol(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'symbol';
};

var JSONToDate = function JSONToDate(arr) {
  var dt = new Date(parseInt(arr.toString().substr(6)));
  return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
};

var fs = typeof require !== "undefined" && require('fs');
var JSONToFile = function JSONToFile(obj, filename) {
  return fs.writeFile(filename + ".json", JSON.stringify(obj, null, 2));
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

function _toConsumableArray$5(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var max = function max() {
  var _ref;

  return Math.max.apply(Math, _toConsumableArray$5((_ref = []).concat.apply(_ref, arguments)));
};

function _toConsumableArray$6(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var median = function median(arr) {
  var mid = Math.floor(arr.length / 2),
      nums = [].concat(_toConsumableArray$6(arr)).sort(function (a, b) {
    return a - b;
  });
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function _toConsumableArray$7(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var min = function min(arr) {
  var _ref;

  return Math.min.apply(Math, _toConsumableArray$7((_ref = []).concat.apply(_ref, _toConsumableArray$7(arr))));
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray$8(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var orderBy = function orderBy(arr, props, orders) {
  return [].concat(_toConsumableArray$8(arr)).sort(function (a, b) {
    return props.reduce(function (acc, prop, i) {
      if (acc === 0) {
        var _ref = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]],
            _ref2 = _slicedToArray(_ref, 2),
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

var powerset = function powerset(arr) {
  return arr.reduce(function (a, v) {
    return a.concat(a.map(function (r) {
      return [v].concat(r);
    }));
  }, [[]]);
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

function _toConsumableArray$9(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray$1(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var quickSort = function quickSort(_ref, desc) {
  var _ref2 = _toArray$1(_ref),
      n = _ref2[0],
      nums = _ref2.slice(1);

  return isNaN(n) ? [] : [].concat(_toConsumableArray$9(quickSort(nums.filter(function (v) {
    return desc ? v > n : v <= n;
  }), desc)), [n], _toConsumableArray$9(quickSort(nums.filter(function (v) {
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

var RGBToHex = function RGBToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};

var round = function round(n) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Number(Math.round(n + "e" + decimals) + "e-" + decimals);
};

var runPromisesInSeries = function runPromisesInSeries(ps) {
  return ps.reduce(function (p, next) {
    return p.then(next);
  }, Promise.resolve());
};

var sample = function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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

function _toArray$2(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var shuffle = function shuffle(_ref) {
  var _ref2 = _toArray$2(_ref),
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

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var sortCharactersInString = function sortCharactersInString(str) {
  return str.split('').sort(function (a, b) {
    return a.localeCompare(b);
  }).join('');
};

var speechSynthesis = function speechSynthesis(message) {
  var msg = new SpeechSynthesisUtterance(message);
  msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
};

var splitLines = function splitLines(str) {
  return str.split(/\r?\n/);
};

function _toConsumableArray$10(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var spreadOver = function spreadOver(fn) {
  return function (argsArr) {
    return fn.apply(undefined, _toConsumableArray$10(argsArr));
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

function _toConsumableArray$11(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var symmetricDifference = function symmetricDifference(a, b) {
  var sA = new Set(a),
      sB = new Set(b);
  return [].concat(_toConsumableArray$11(a.filter(function (x) {
    return !sB.has(x);
  })), _toConsumableArray$11(b.filter(function (x) {
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

var toggleClass = function toggleClass(el, className) {
  return el.classList.toggle(className);
};

var toKebabCase = function toKebabCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join('-');
};

var tomorrow = function tomorrow() {
  return new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
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
  str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join('_');
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

function _toConsumableArray$12(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var union = function union(a, b) {
  return Array.from(new Set([].concat(_toConsumableArray$12(a), _toConsumableArray$12(b))));
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

function _toConsumableArray$13(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var zip = function zip() {
  for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  var maxLength = Math.max.apply(Math, _toConsumableArray$13(arrays.map(function (x) {
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

var imports = { anagrams: anagrams, arrayToHtmlList: arrayToHtmlList, average: average, bottomVisible: bottomVisible, byteSize: byteSize, call: call, capitalize: capitalize, capitalizeEveryWord: capitalizeEveryWord, chainAsync: chainAsync, chunk: chunk, clampNumber: clampNumber, cleanObj: cleanObj, coalesce: coalesce, coalesceFactory: coalesceFactory, collatz: collatz, collectInto: collectInto, compact: compact, compose: compose, countOccurrences: countOccurrences, countVowels: countVowels, currentURL: currentURL, curry: curry, deepFlatten: deepFlatten, detectDeviceType: detectDeviceType, difference: difference, differenceWith: differenceWith, digitize: digitize, distance: distance, distinctValuesOfArray: distinctValuesOfArray, dropElements: dropElements, dropRight: dropRight, elementIsVisibleInViewport: elementIsVisibleInViewport, escapeHTML: escapeHTML, escapeRegExp: escapeRegExp, everyNth: everyNth, extendHex: extendHex, factorial: factorial, fibonacci: fibonacci, fibonacciCountUntilNum: fibonacciCountUntilNum, fibonacciUntilNum: fibonacciUntilNum, filterNonUnique: filterNonUnique, flatten: flatten, flattenDepth: flattenDepth, flip: flip, fromCamelCase: fromCamelCase, functionName: functionName, gcd: gcd, getDaysDiffBetweenDates: getDaysDiffBetweenDates, getScrollPosition: getScrollPosition, getStyle: getStyle, getType: getType, getURLParameters: getURLParameters, groupBy: groupBy, hammingDistance: hammingDistance, hasClass: hasClass, head: head, hexToRGB: hexToRGB, hide: hide, httpsRedirect: httpsRedirect, initial: initial, initialize2DArray: initialize2DArray, initializeArrayWithRange: initializeArrayWithRange, initializeArrayWithValues: initializeArrayWithValues, inRange: inRange, intersection: intersection, isArmstrongNumber: isArmstrongNumber, isArray: isArray, isBoolean: isBoolean, isDivisible: isDivisible, isEven: isEven, isFunction: isFunction, isNumber: isNumber, isPrime: isPrime, isString: isString, isSymbol: isSymbol, JSONToDate: JSONToDate, JSONToFile: JSONToFile, last: last, lcm: lcm, lowercaseKeys: lowercaseKeys, mapObject: mapObject, max: max, median: median, min: min, negate: negate, nthElement: nthElement, objectFromPairs: objectFromPairs, objectToPairs: objectToPairs, onUserInputChange: onUserInputChange, orderBy: orderBy, palindrome: palindrome, percentile: percentile, pick: pick, pipeFunctions: pipeFunctions, powerset: powerset, primes: primes, promisify: promisify, pull: pull, pullAtIndex: pullAtIndex, pullAtValue: pullAtValue, quickSort: quickSort, randomHexColorCode: randomHexColorCode, randomIntegerInRange: randomIntegerInRange, randomNumberInRange: randomNumberInRange, readFileLines: readFileLines, redirect: redirect, remove: remove, repeatString: repeatString, reverseString: reverseString, RGBToHex: RGBToHex, round: round, runPromisesInSeries: runPromisesInSeries, sample: sample, scrollToTop: scrollToTop, sdbm: sdbm, select: select, setStyle: setStyle, shallowClone: shallowClone, show: show, shuffle: shuffle, similarity: similarity, sleep: sleep, sortCharactersInString: sortCharactersInString, speechSynthesis: speechSynthesis, splitLines: splitLines, spreadOver: spreadOver, standardDeviation: standardDeviation, sum: sum, symmetricDifference: symmetricDifference, tail: tail, take: take, takeRight: takeRight, timeTaken: timeTaken, toCamelCase: toCamelCase, toDecimalMark: toDecimalMark, toEnglishDate: toEnglishDate, toggleClass: toggleClass, toKebabCase: toKebabCase, tomorrow: tomorrow, toOrdinalSuffix: toOrdinalSuffix, toSnakeCase: toSnakeCase, truncateString: truncateString, truthCheckCollection: truthCheckCollection, unescapeHTML: unescapeHTML, union: union, UUIDGeneratorBrowser: UUIDGeneratorBrowser, UUIDGeneratorNode: UUIDGeneratorNode, validateNumber: validateNumber, without: without, words: words, zip: zip, zipObject: zipObject };

return imports;

})));
