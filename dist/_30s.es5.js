(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global._30s = {})));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var fs = typeof require !== "undefined" && require('fs');

  var crypto = typeof require !== "undefined" && require('crypto');

  var CSVToArray = function CSVToArray(data) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
    var omitFirstRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return data.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0).split('\n').map(function (v) {
      return v.split(delimiter);
    });
  };
  var CSVToJSON = function CSVToJSON(data) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
    var titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data.slice(data.indexOf('\n') + 1).split('\n').map(function (v) {
      var values = v.split(delimiter);
      return titles.reduce(function (obj, title, index) {
        return obj[title] = values[index], obj;
      }, {});
    });
  };
  var JSONToFile = function JSONToFile(obj, filename) {
    return fs.writeFile("".concat(filename, ".json"), JSON.stringify(obj, null, 2));
  };
  var JSONtoCSV = function JSONtoCSV(arr, columns) {
    var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
    return [columns.join(delimiter)].concat(_toConsumableArray(arr.map(function (obj) {
      return columns.reduce(function (acc, key) {
        return "".concat(acc).concat(!acc.length ? '' : delimiter, "\"").concat(!obj[key] ? '' : obj[key], "\"");
      }, '');
    }))).join('\n');
  };
  var RGBToHex = function RGBToHex(r, g, b) {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
  };
  var URLJoin = function URLJoin() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.join('/').replace(/[\/]+/g, '/').replace(/^(.+):\//, '$1://').replace(/^file:/, 'file:/').replace(/\/(\?|&|#[^!])/g, '$1').replace(/\?/g, '&').replace('&', '?');
  };
  var UUIDGeneratorBrowser = function UUIDGeneratorBrowser() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
  };
  var UUIDGeneratorNode = function UUIDGeneratorNode() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.randomBytes(1)[0] & 15 >> c / 4).toString(16);
    });
  };
  var all = function all(arr) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;
    return arr.every(fn);
  };
  var allEqual = function allEqual(arr) {
    return arr.every(function (val) {
      return val === arr[0];
    });
  };
  var any = function any(arr) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;
    return arr.some(fn);
  };
  var approximatelyEqual = function approximatelyEqual(v1, v2) {
    var epsilon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.001;
    return Math.abs(v1 - v2) < epsilon;
  };
  var arrayToCSV = function arrayToCSV(arr) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
    return arr.map(function (v) {
      return v.map(function (x) {
        return isNaN(x) ? "\"".concat(x.replace(/"/g, '""'), "\"") : x;
      }).join(delimiter);
    }).join('\n');
  };
  var arrayToHtmlList = function arrayToHtmlList(arr, listID) {
    return function (el) {
      return el = document.querySelector('#' + listID), el.innerHTML += arr.map(function (item) {
        return "<li>".concat(item, "</li>");
      }).join('');
    }();
  };
  var ary = function ary(fn, n) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return fn.apply(void 0, _toConsumableArray(args.slice(0, n)));
    };
  };
  var atob = function atob(str) {
    return Buffer.from(str, 'base64').toString('binary');
  };
  var attempt = function attempt(fn) {
    try {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return fn.apply(void 0, args);
    } catch (e) {
      return e instanceof Error ? e : new Error(e);
    }
  };
  var average = function average() {
    for (var _len4 = arguments.length, nums = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      nums[_key4] = arguments[_key4];
    }

    return nums.reduce(function (acc, val) {
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
  var bifurcate = function bifurcate(arr, filter) {
    return arr.reduce(function (acc, val, i) {
      return acc[filter[i] ? 0 : 1].push(val), acc;
    }, [[], []]);
  };
  var bifurcateBy = function bifurcateBy(arr, fn) {
    return arr.reduce(function (acc, val, i) {
      return acc[fn(val, i) ? 0 : 1].push(val), acc;
    }, [[], []]);
  };
  var bind = function bind(fn, context) {
    for (var _len5 = arguments.length, boundArgs = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
      boundArgs[_key5 - 2] = arguments[_key5];
    }

    return function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return fn.apply(context, boundArgs.concat(args));
    };
  };
  var bindAll = function bindAll(obj) {
    for (var _len7 = arguments.length, fns = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      fns[_key7 - 1] = arguments[_key7];
    }

    return fns.forEach(function (fn) {
      return f = obj[fn], obj[fn] = function () {
        return f.apply(obj);
      };
    });
  };
  var bindKey = function bindKey(context, fn) {
    for (var _len8 = arguments.length, boundArgs = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
      boundArgs[_key8 - 2] = arguments[_key8];
    }

    return function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return context[fn].apply(context, boundArgs.concat(args));
    };
  };
  var binomialCoefficient = function binomialCoefficient(n, k) {
    if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k === 1 || k === n - 1) return n;
    if (n - k < k) k = n - k;
    var res = n;

    for (var j = 2; j <= k; j++) {
      res *= (n - j + 1) / j;
    }

    return Math.round(res);
  };
  var bottomVisible = function bottomVisible() {
    return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
  };
  var btoa = function btoa(str) {
    return Buffer.from(str, 'binary').toString('base64');
  };
  var byteSize = function byteSize(str) {
    return new Blob([str]).size;
  };
  var call = function call(key) {
    for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
      args[_key10 - 1] = arguments[_key10];
    }

    return function (context) {
      return context[key].apply(context, args);
    };
  };
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
    var last = fns[fns.length - 1];

    var next = function next() {
      var fn = fns[curr++];
      fn === last ? fn() : fn(next);
    };

    next();
  };
  var checkProp = function checkProp(predicate, prop) {
    return function (obj) {
      return !!predicate(obj[prop]);
    };
  };
  var chunk = function chunk(arr, size) {
    return Array.from({
      length: Math.ceil(arr.length / size)
    }, function (v, i) {
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
    for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    return args.find(function (_) {
      return ![undefined, null].includes(_);
    });
  };
  var coalesceFactory = function coalesceFactory(valid) {
    return function () {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      return args.find(valid);
    };
  };
  var collectInto = function collectInto(fn) {
    return function () {
      for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      return fn(args);
    };
  };
  var colorize = function colorize() {
    for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
      args[_key14] = arguments[_key14];
    }

    return {
      black: "\x1B[30m".concat(args.join(' ')),
      red: "\x1B[31m".concat(args.join(' ')),
      green: "\x1B[32m".concat(args.join(' ')),
      yellow: "\x1B[33m".concat(args.join(' ')),
      blue: "\x1B[34m".concat(args.join(' ')),
      magenta: "\x1B[35m".concat(args.join(' ')),
      cyan: "\x1B[36m".concat(args.join(' ')),
      white: "\x1B[37m".concat(args.join(' ')),
      bgBlack: "\x1B[40m".concat(args.join(' '), "\x1B[0m"),
      bgRed: "\x1B[41m".concat(args.join(' '), "\x1B[0m"),
      bgGreen: "\x1B[42m".concat(args.join(' '), "\x1B[0m"),
      bgYellow: "\x1B[43m".concat(args.join(' '), "\x1B[0m"),
      bgBlue: "\x1B[44m".concat(args.join(' '), "\x1B[0m"),
      bgMagenta: "\x1B[45m".concat(args.join(' '), "\x1B[0m"),
      bgCyan: "\x1B[46m".concat(args.join(' '), "\x1B[0m"),
      bgWhite: "\x1B[47m".concat(args.join(' '), "\x1B[0m")
    };
  };
  var compact = function compact(arr) {
    return arr.filter(Boolean);
  };
  var compactWhitespace = function compactWhitespace(str) {
    return str.replace(/\s{2,}/g, ' ');
  };
  var compose = function compose() {
    for (var _len15 = arguments.length, fns = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
      fns[_key15] = arguments[_key15];
    }

    return fns.reduce(function (f, g) {
      return function () {
        return f(g.apply(void 0, arguments));
      };
    });
  };
  var composeRight = function composeRight() {
    for (var _len16 = arguments.length, fns = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
      fns[_key16] = arguments[_key16];
    }

    return fns.reduce(function (f, g) {
      return function () {
        return g(f.apply(void 0, arguments));
      };
    });
  };
  var converge = function converge(converger, fns) {
    return function () {
      for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      return converger.apply(void 0, _toConsumableArray(fns.map(function (fn) {
        return fn.apply(null, args);
      })));
    };
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
    }).reduce(function (acc, val) {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  };
  var countOccurrences = function countOccurrences(arr, val) {
    return arr.reduce(function (a, v) {
      return v === val ? a + 1 : a;
    }, 0);
  };
  var counter = function counter(selector, start, end) {
    var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2000;

    var current = start,
        _step = (end - start) * step < 0 ? -step : step,
        timer = setInterval(function () {
      current += _step;
      document.querySelector(selector).innerHTML = current;
      if (current >= end) document.querySelector(selector).innerHTML = end;
      if (current >= end) clearInterval(timer);
    }, Math.abs(Math.floor(duration / (end - start))));

    return timer;
  };
  var createDirIfNotExists = function createDirIfNotExists(dir) {
    return !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
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
        if (this.hub[event].length === 0) delete this.hub[event];
      }
    };
  };
  var currentURL = function currentURL() {
    return window.location.href;
  };
  var curry = function curry(fn) {
    var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.length;

    for (var _len18 = arguments.length, args = new Array(_len18 > 2 ? _len18 - 2 : 0), _key18 = 2; _key18 < _len18; _key18++) {
      args[_key18 - 2] = arguments[_key18];
    }

    return arity <= args.length ? fn.apply(void 0, args) : curry.bind.apply(curry, [null, fn, arity].concat(args));
  };
  var dayOfYear = function dayOfYear(date) {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  };
  var debounce = function debounce(fn) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var timeoutId;
    return function () {
      var _this = this;

      for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
        args[_key19] = arguments[_key19];
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        return fn.apply(_this, args);
      }, ms);
    };
  };
  var decapitalize = function decapitalize(_ref3) {
    var _ref4 = _toArray(_ref3),
        first = _ref4[0],
        rest = _ref4.slice(1);

    var upperRest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));
  };
  var deepClone = function deepClone(obj) {
    var clone = Object.assign({}, obj);
    Object.keys(clone).forEach(function (key) {
      return clone[key] = _typeof(obj[key]) === 'object' ? deepClone(obj[key]) : obj[key];
    });
    return Array.isArray(obj) && obj.length ? (clone.length = obj.length) && Array.from(clone) : Array.isArray(obj) ? Array.from(obj) : clone;
  };
  var deepFlatten = function deepFlatten(arr) {
    var _ref5;

    return (_ref5 = []).concat.apply(_ref5, _toConsumableArray(arr.map(function (v) {
      return Array.isArray(v) ? deepFlatten(v) : v;
    })));
  };
  var deepFreeze = function deepFreeze(obj) {
    return Object.keys(obj).forEach(function (prop) {
      return !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop]);
    }) || Object.freeze(obj);
  };
  var deepGet = function deepGet(obj, keys) {
    return keys.reduce(function (xs, x) {
      return xs && xs[x] ? xs[x] : null;
    }, obj);
  };
  var deepMapKeys = function deepMapKeys(obj, f) {
    return Array.isArray(obj) ? obj.map(function (val) {
      return deepMapKeys(val, f);
    }) : _typeof(obj) === 'object' ? Object.keys(obj).reduce(function (acc, current) {
      var val = obj[current];
      acc[f(current)] = val !== null && _typeof(val) === 'object' ? deepMapKeys(val, f) : acc[f(current)] = val;
      return acc;
    }, {}) : obj;
  };
  var defaults = function defaults(obj) {
    for (var _len20 = arguments.length, defs = new Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
      defs[_key20 - 1] = arguments[_key20];
    }

    return Object.assign.apply(Object, [{}, obj].concat(_toConsumableArray(defs.reverse()), [obj]));
  };
  var defer = function defer(fn) {
    for (var _len21 = arguments.length, args = new Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
      args[_key21 - 1] = arguments[_key21];
    }

    return setTimeout.apply(void 0, [fn, 1].concat(args));
  };
  var degreesToRads = function degreesToRads(deg) {
    return deg * Math.PI / 180.0;
  };
  var delay = function delay(fn, wait) {
    for (var _len22 = arguments.length, args = new Array(_len22 > 2 ? _len22 - 2 : 0), _key22 = 2; _key22 < _len22; _key22++) {
      args[_key22 - 2] = arguments[_key22];
    }

    return setTimeout.apply(void 0, [fn, wait].concat(args));
  };
  var detectDeviceType = function detectDeviceType() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
  };
  var difference = function difference(a, b) {
    var s = new Set(b);
    return a.filter(function (x) {
      return !s.has(x);
    });
  };
  var differenceBy = function differenceBy(a, b, fn) {
    var s = new Set(b.map(fn));
    return a.map(fn).filter(function (el) {
      return !s.has(el);
    });
  };
  var differenceWith = function differenceWith(arr, val, comp) {
    return arr.filter(function (a) {
      return val.findIndex(function (b) {
        return comp(a, b);
      }) === -1;
    });
  };
  var dig = function dig(obj, target) {
    return target in obj ? obj[target] : Object.values(obj).reduce(function (acc, val) {
      if (acc !== undefined) return acc;
      if (_typeof(val) === 'object') return dig(val, target);
    }, undefined);
  };
  var digitize = function digitize(n) {
    return _toConsumableArray("".concat(n)).map(function (i) {
      return parseInt(i);
    });
  };
  var distance = function distance(x0, y0, x1, y1) {
    return Math.hypot(x1 - x0, y1 - y0);
  };
  var drop = function drop(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return arr.slice(n);
  };
  var dropRight = function dropRight(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return arr.slice(0, -n);
  };
  var dropRightWhile = function dropRightWhile(arr, func) {
    var rightIndex = arr.length;

    while (rightIndex-- && !func(arr[rightIndex])) {
    }

    return arr.slice(0, rightIndex + 1);
  };
  var dropWhile = function dropWhile(arr, func) {
    while (arr.length > 0 && !func(arr[0])) {
      arr = arr.slice(1);
    }

    return arr;
  };
  var elementContains = function elementContains(parent, child) {
    return parent !== child && parent.contains(child);
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
  var elo = function elo(_ref6) {
    var _ref7 = _toArray(_ref6),
        ratings = _ref7.slice(0);

    var kFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
    var selfRating = arguments.length > 2 ? arguments[2] : undefined;

    var _ratings = _slicedToArray(ratings, 2),
        a = _ratings[0],
        b = _ratings[1];

    var expectedScore = function expectedScore(self, opponent) {
      return 1 / (1 + Math.pow(10, (opponent - self) / 400));
    };

    var newRating = function newRating(rating, i) {
      return (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
    };

    if (ratings.length === 2) return [newRating(a, 1), newRating(b, 0)];

    for (var i = 0, len = ratings.length; i < len; i++) {
      var j = i;

      while (j < len - 1) {
        j++;

        var _elo = elo([ratings[i], ratings[j]], kFactor);

        var _elo2 = _slicedToArray(_elo, 2);

        ratings[i] = _elo2[0];
        ratings[j] = _elo2[1];
      }
    }

    return ratings;
  };
  var equals = function equals(a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (!a || !b || _typeof(a) !== 'object' && _typeof(b) !== 'object') return a === b;
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
    return Array.from({
      length: n
    }).reduce(function (acc, val, i) {
      return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i);
    }, []);
  };
  var filterFalsy = function filterFalsy(arr) {
    return arr.filter(Boolean);
  };
  var filterNonUnique = function filterNonUnique(arr) {
    return arr.filter(function (i) {
      return arr.indexOf(i) === arr.lastIndexOf(i);
    });
  };
  var filterNonUniqueBy = function filterNonUniqueBy(arr, fn) {
    return arr.filter(function (v, i) {
      return arr.every(function (x, j) {
        return i === j === fn(v, x, i, j);
      });
    });
  };
  var findKey = function findKey(obj, fn) {
    return Object.keys(obj).find(function (key) {
      return fn(obj[key], key, obj);
    });
  };
  var findLast = function findLast(arr, fn) {
    return arr.filter(fn).pop();
  };
  var findLastIndex = function findLastIndex(arr, fn) {
    return (arr.map(function (val, i) {
      return [i, val];
    }).filter(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          i = _ref9[0],
          val = _ref9[1];

      return fn(val, i, arr);
    }).pop() || [-1])[0];
  };
  var findLastKey = function findLastKey(obj, fn) {
    return Object.keys(obj).reverse().find(function (key) {
      return fn(obj[key], key, obj);
    });
  };
  var flatten = function flatten(arr) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return arr.reduce(function (a, v) {
      return a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v);
    }, []);
  };
  var flattenObject = function flattenObject(obj) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return Object.keys(obj).reduce(function (acc, k) {
      var pre = prefix.length ? prefix + '.' : '';
      if (_typeof(obj[k]) === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));else acc[pre + k] = obj[k];
      return acc;
    }, {});
  };
  var flip = function flip(fn) {
    return function (first) {
      for (var _len23 = arguments.length, rest = new Array(_len23 > 1 ? _len23 - 1 : 0), _key23 = 1; _key23 < _len23; _key23++) {
        rest[_key23 - 1] = arguments[_key23];
      }

      return fn.apply(void 0, rest.concat([first]));
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
  var formToObject = function formToObject(form) {
    return Array.from(new FormData(form)).reduce(function (acc, _ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
          key = _ref11[0],
          value = _ref11[1];

      return _objectSpread({}, acc, _defineProperty({}, key, value));
    }, {});
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
    }).map(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 2),
          key = _ref13[0],
          val = _ref13[1];

      return "".concat(val, " ").concat(key).concat(val !== 1 ? 's' : '');
    }).join(', ');
  };
  var fromCamelCase = function fromCamelCase(str) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
    return str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
  };
  var functionName = function functionName(fn) {
    return console.debug(fn.name), fn;
  };
  var functions = function functions(obj) {
    var inherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return (inherited ? _toConsumableArray(Object.keys(obj)).concat(_toConsumableArray(Object.keys(Object.getPrototypeOf(obj)))) : Object.keys(obj)).filter(function (key) {
      return typeof obj[key] === 'function';
    });
  };
  var gcd = function gcd() {
    var _gcd = function _gcd(x, y) {
      return !y ? x : gcd(y, x % y);
    };

    for (var _len24 = arguments.length, arr = new Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
      arr[_key24] = arguments[_key24];
    }

    return arr.concat().reduce(function (a, b) {
      return _gcd(a, b);
    });
  };
  var geometricProgression = function geometricProgression(end) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    return Array.from({
      length: Math.floor(Math.log(end / start) / Math.log(step)) + 1
    }).map(function (v, i) {
      return start * Math.pow(step, i);
    });
  };
  var get = function get(from) {
    for (var _len25 = arguments.length, selectors = new Array(_len25 > 1 ? _len25 - 1 : 0), _key25 = 1; _key25 < _len25; _key25++) {
      selectors[_key25 - 1] = arguments[_key25];
    }

    return selectors.concat().map(function (s) {
      return s.replace(/\[([^\[\]]*)\]/g, '.$1.').split('.').filter(function (t) {
        return t !== '';
      }).reduce(function (prev, cur) {
        return prev && prev[cur];
      }, from);
    });
  };
  var getColonTimeFromDate = function getColonTimeFromDate(date) {
    return date.toTimeString().slice(0, 8);
  };
  var getDaysDiffBetweenDates = function getDaysDiffBetweenDates(dateInitial, dateFinal) {
    return (dateFinal - dateInitial) / (1000 * 3600 * 24);
  };
  var getImages = function getImages(el) {
    var includeDuplicates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var images = _toConsumableArray(el.getElementsByTagName('img')).map(function (img) {
      return img.getAttribute('src');
    });

    return includeDuplicates ? images : _toConsumableArray(new Set(images));
  };
  var getMeridiemSuffixOfInteger = function getMeridiemSuffixOfInteger(num) {
    return num === 0 || num === 24 ? 12 + 'am' : num === 12 ? 12 + 'pm' : num < 12 ? num % 12 + 'am' : num % 12 + 'pm';
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
    return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function (a, v) {
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
    for (var _len26 = arguments.length, flags = new Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
      flags[_key26] = arguments[_key26];
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
      }

      return hexes.join('');
    });
  };
  var hashNode = function hashNode(val) {
    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve(crypto.createHash('sha256').update(val).digest('hex'));
      }, 0);
    });
  };
  var head = function head(arr) {
    return arr[0];
  };
  var hexToRGB = function hexToRGB(hex) {
    var alpha = false,
        h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) h = _toConsumableArray(h).map(function (x) {
      return x + x;
    }).join('');else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return 'rgb' + (alpha ? 'a' : '') + '(' + (h >>> (alpha ? 24 : 16)) + ', ' + ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) + ', ' + ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) + (alpha ? ", ".concat(h & 0x000000ff) : '') + ')';
  };
  var hide = function hide() {
    for (var _len27 = arguments.length, el = new Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
      el[_key27] = arguments[_key27];
    }

    return el.concat().forEach(function (e) {
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
  var hz = function hz(fn) {
    var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var before = performance.now();

    for (var i = 0; i < iterations; i++) {
      fn();
    }

    return 1000 * iterations / (performance.now() - before);
  };
  var inRange = function inRange(n, start) {
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (end && start > end) {
      var _ref14 = [start, end];
      end = _ref14[0];
      start = _ref14[1];
    }

    return end == null ? n >= 0 && n < start : n >= start && n < end;
  };
  var indentString = function indentString(str, count) {
    var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
    return str.replace(/^/gm, indent.repeat(count));
  };
  var indexOfAll = function indexOfAll(arr, val) {
    return arr.reduce(function (acc, el, i) {
      return el === val ? _toConsumableArray(acc).concat([i]) : acc;
    }, []);
  };
  var initial = function initial(arr) {
    return arr.slice(0, -1);
  };
  var initialize2DArray = function initialize2DArray(w, h) {
    var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return Array.from({
      length: h
    }).map(function () {
      return Array.from({
        length: w
      }).fill(val);
    });
  };
  var initializeArrayWithRange = function initializeArrayWithRange(end) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Array.from({
      length: Math.ceil((end - start + 1) / step)
    }, function (v, i) {
      return i * step + start;
    });
  };
  var initializeArrayWithRangeRight = function initializeArrayWithRangeRight(end) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Array.from({
      length: Math.ceil((end + 1 - start) / step)
    }).map(function (v, i, arr) {
      return (arr.length - i - 1) * step + start;
    });
  };
  var initializeArrayWithValues = function initializeArrayWithValues(n) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Array(n).fill(val);
  };
  var initializeNDArray = function initializeNDArray(val) {
    for (var _len28 = arguments.length, args = new Array(_len28 > 1 ? _len28 - 1 : 0), _key28 = 1; _key28 < _len28; _key28++) {
      args[_key28 - 1] = arguments[_key28];
    }

    return args.length === 0 ? val : Array.from({
      length: args[0]
    }).map(function () {
      return initializeNDArray.apply(void 0, [val].concat(_toConsumableArray(args.slice(1))));
    });
  };
  var insertAfter = function insertAfter(el, htmlString) {
    return el.insertAdjacentHTML('afterend', htmlString);
  };
  var insertBefore = function insertBefore(el, htmlString) {
    return el.insertAdjacentHTML('beforebegin', htmlString);
  };
  var intersection = function intersection(a, b) {
    var s = new Set(b);
    return a.filter(function (x) {
      return s.has(x);
    });
  };
  var intersectionBy = function intersectionBy(a, b, fn) {
    var s = new Set(b.map(fn));
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
    return ![, null].includes(val) && val.constructor === type;
  };
  var isAbsoluteURL = function isAbsoluteURL(str) {
    return /^[a-z][a-z0-9+.-]*:/.test(str);
  };
  var isAfterDate = function isAfterDate(dateA, dateB) {
    return dateA > dateB;
  };
  var isAnagram = function isAnagram(str1, str2) {
    var normalize = function normalize(str) {
      return str.toLowerCase().replace(/[^a-z0-9]/gi, '').split('').sort().join('');
    };

    return normalize(str1) === normalize(str2);
  };
  var isArrayLike = function isArrayLike(obj) {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
  };
  var isBeforeDate = function isBeforeDate(dateA, dateB) {
    return dateA < dateB;
  };
  var isBoolean = function isBoolean(val) {
    return typeof val === 'boolean';
  };
  var isBrowser = function isBrowser() {
    return ![typeof window === "undefined" ? "undefined" : _typeof(window), typeof document === "undefined" ? "undefined" : _typeof(document)].includes('undefined');
  };
  var isBrowserTabFocused = function isBrowserTabFocused() {
    return !document.hidden;
  };
  var isDivisible = function isDivisible(dividend, divisor) {
    return dividend % divisor === 0;
  };
  var isDuplexStream = function isDuplexStream(val) {
    return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function' && typeof val._read === 'function' && _typeof(val._readableState) === 'object' && typeof val._write === 'function' && _typeof(val._writableState) === 'object';
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
  var isNegativeZero = function isNegativeZero(val) {
    return val === 0 && 1 / val === -Infinity;
  };
  var isNil = function isNil(val) {
    return val === undefined || val === null;
  };
  var isNull = function isNull(val) {
    return val === null;
  };
  var isNumber = function isNumber(val) {
    return typeof val === 'number' && val === val;
  };
  var isObject = function isObject(obj) {
    return obj === Object(obj);
  };
  var isObjectLike = function isObjectLike(val) {
    return val !== null && _typeof(val) === 'object';
  };
  var isPlainObject = function isPlainObject(val) {
    return !!val && _typeof(val) === 'object' && val.constructor === Object;
  };
  var isPrime = function isPrime(num) {
    var boundary = Math.floor(Math.sqrt(num));

    for (var i = 2; i <= boundary; i++) {
      if (num % i === 0) return false;
    }

    return num >= 2;
  };
  var isPrimitive = function isPrimitive(val) {
    return Object(val) !== val;
  };
  var isPromiseLike = function isPromiseLike(obj) {
    return obj !== null && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  };
  var isReadableStream = function isReadableStream(val) {
    return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function' && typeof val._read === 'function' && _typeof(val._readableState) === 'object';
  };
  var isSameDate = function isSameDate(dateA, dateB) {
    return dateA.toISOString() === dateB.toISOString();
  };
  var isSorted = function isSorted(arr) {
    var direction = -(arr[0] - arr[1]);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = arr.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion = (_step2 = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            i = _step2$value[0],
            val = _step2$value[1];

        direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
        if (i === arr.length - 1) return !direction ? 0 : direction;else if ((val - arr[i + 1]) * direction > 0) return 0;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
  var isStream = function isStream(val) {
    return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function';
  };
  var isString = function isString(val) {
    return typeof val === 'string';
  };
  var isSymbol = function isSymbol(val) {
    return _typeof(val) === 'symbol';
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
  var isValidJSON = function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  var isWeekday = function isWeekday() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    return t.getDay() % 6 !== 0;
  };
  var isWeekend = function isWeekend() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    return t.getDay() % 6 === 0;
  };
  var isWritableStream = function isWritableStream(val) {
    return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function' && typeof val._write === 'function' && _typeof(val._writableState) === 'object';
  };
  var join = function join(arr) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : separator;
    return arr.reduce(function (acc, val, i) {
      return i === arr.length - 2 ? acc + val + end : i === arr.length - 1 ? acc + val : acc + val + separator;
    }, '');
  };
  var last = function last(arr) {
    return arr[arr.length - 1];
  };
  var lcm = function lcm() {
    var gcd = function gcd(x, y) {
      return !y ? x : gcd(y, x % y);
    };

    var _lcm = function _lcm(x, y) {
      return x * y / gcd(x, y);
    };

    for (var _len29 = arguments.length, arr = new Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
      arr[_key29] = arguments[_key29];
    }

    return arr.concat().reduce(function (a, b) {
      return _lcm(a, b);
    });
  };
  var longestItem = function longestItem() {
    for (var _len30 = arguments.length, vals = new Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
      vals[_key30] = arguments[_key30];
    }

    return vals.reduce(function (a, x) {
      return x.length > a.length ? x : a;
    });
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
  var mapNumRange = function mapNumRange(num, inMin, inMax, outMin, outMax) {
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  };
  var mapObject = function mapObject(arr, fn) {
    return function (a) {
      return a = [arr, arr.map(fn)], a[0].reduce(function (acc, val, ind) {
        return acc[val] = a[1][ind], acc;
      }, {});
    }();
  };
  var mapString = function mapString(str, fn) {
    return str.split('').map(function (c, i) {
      return fn(c, i, str);
    }).join('');
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
    return "".concat(cc).slice(-num).padStart("".concat(cc).length, mask);
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
  var maxBy = function maxBy(arr, fn) {
    return Math.max.apply(Math, _toConsumableArray(arr.map(typeof fn === 'function' ? fn : function (val) {
      return val[fn];
    })));
  };
  var maxDate = function maxDate(dates) {
    return new Date(Math.max.apply(Math, _toConsumableArray(dates)));
  };
  var maxN = function maxN(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return _toConsumableArray(arr).sort(function (a, b) {
      return b - a;
    }).slice(0, n);
  };
  var median = function median(arr) {
    var mid = Math.floor(arr.length / 2),
        nums = _toConsumableArray(arr).sort(function (a, b) {
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
    for (var _len31 = arguments.length, objs = new Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
      objs[_key31] = arguments[_key31];
    }

    return objs.concat().reduce(function (acc, obj) {
      return Object.keys(obj).reduce(function (a, k) {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
        return acc;
      }, {});
    }, {});
  };
  var midpoint = function midpoint(_ref15, _ref16) {
    var _ref17 = _slicedToArray(_ref15, 2),
        x1 = _ref17[0],
        y1 = _ref17[1];

    var _ref18 = _slicedToArray(_ref16, 2),
        x2 = _ref18[0],
        y2 = _ref18[1];

    return [(x1 + x2) / 2, (y1 + y2) / 2];
  };
  var minBy = function minBy(arr, fn) {
    return Math.min.apply(Math, _toConsumableArray(arr.map(typeof fn === 'function' ? fn : function (val) {
      return val[fn];
    })));
  };
  var minDate = function minDate(dates) {
    return new Date(Math.min.apply(Math, _toConsumableArray(dates)));
  };
  var minN = function minN(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return _toConsumableArray(arr).sort(function (a, b) {
      return a - b;
    }).slice(0, n);
  };
  var mostPerformant = function mostPerformant(fns) {
    var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
    var times = fns.map(function (fn) {
      var before = performance.now();

      for (var i = 0; i < iterations; i++) {
        fn();
      }

      return performance.now() - before;
    });
    return times.indexOf(Math.min.apply(Math, _toConsumableArray(times)));
  };
  var negate = function negate(func) {
    return function () {
      return !func.apply(void 0, arguments);
    };
  };
  var nest = function nest(items) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var link = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'parent_id';
    return items.filter(function (item) {
      return item[link] === id;
    }).map(function (item) {
      return _objectSpread({}, item, {
        children: nest(items, item.id)
      });
    });
  };
  var nodeListToArray = function nodeListToArray(nodeList) {
    return _toConsumableArray(nodeList);
  };
  var none = function none(arr) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;
    return !arr.some(fn);
  };
  var nthArg = function nthArg(n) {
    return function () {
      for (var _len32 = arguments.length, args = new Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
        args[_key32] = arguments[_key32];
      }

      return args.slice(n)[0];
    };
  };
  var nthElement = function nthElement(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];
  };
  var objectFromPairs = function objectFromPairs(arr) {
    return arr.reduce(function (a, _ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
          key = _ref20[0],
          val = _ref20[1];

      return a[key] = val, a;
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
  var offset = function offset(arr, _offset) {
    return _toConsumableArray(arr.slice(_offset)).concat(_toConsumableArray(arr.slice(0, _offset)));
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

      for (var _len33 = arguments.length, args = new Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
        args[_key33] = arguments[_key33];
      }

      return fn.apply(this, args);
    };
  };
  var orderBy = function orderBy(arr, props, orders) {
    return _toConsumableArray(arr).sort(function (a, b) {
      return props.reduce(function (acc, prop, i) {
        if (acc === 0) {
          var _ref21 = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]],
              _ref22 = _slicedToArray(_ref21, 2),
              p1 = _ref22[0],
              p2 = _ref22[1];

          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
        }

        return acc;
      }, 0);
    });
  };
  var over = function over() {
    for (var _len34 = arguments.length, fns = new Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
      fns[_key34] = arguments[_key34];
    }

    return function () {
      for (var _len35 = arguments.length, args = new Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
        args[_key35] = arguments[_key35];
      }

      return fns.map(function (fn) {
        return fn.apply(null, args);
      });
    };
  };
  var overArgs = function overArgs(fn, transforms) {
    return function () {
      for (var _len36 = arguments.length, args = new Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
        args[_key36] = arguments[_key36];
      }

      return fn.apply(void 0, _toConsumableArray(args.map(function (val, i) {
        return transforms[i](val);
      })));
    };
  };
  var pad = function pad(str, length) {
    var char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
    return str.padStart((str.length + length) / 2, char).padEnd(length, char);
  };
  var palindrome = function palindrome(str) {
    var s = str.toLowerCase().replace(/[\W_]/g, '');
    return s === _toConsumableArray(s).reverse().join('');
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
    for (var _len37 = arguments.length, partials = new Array(_len37 > 1 ? _len37 - 1 : 0), _key37 = 1; _key37 < _len37; _key37++) {
      partials[_key37 - 1] = arguments[_key37];
    }

    return function () {
      for (var _len38 = arguments.length, args = new Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
        args[_key38] = arguments[_key38];
      }

      return fn.apply(void 0, partials.concat(args));
    };
  };
  var partialRight = function partialRight(fn) {
    for (var _len39 = arguments.length, partials = new Array(_len39 > 1 ? _len39 - 1 : 0), _key39 = 1; _key39 < _len39; _key39++) {
      partials[_key39 - 1] = arguments[_key39];
    }

    return function () {
      for (var _len40 = arguments.length, args = new Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
        args[_key40] = arguments[_key40];
      }

      return fn.apply(void 0, args.concat(partials));
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
  var permutations = function permutations(arr) {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    return arr.reduce(function (acc, item, i) {
      return acc.concat(permutations(_toConsumableArray(arr.slice(0, i)).concat(_toConsumableArray(arr.slice(i + 1)))).map(function (val) {
        return [item].concat(_toConsumableArray(val));
      }));
    }, []);
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
  var pipeAsyncFunctions = function pipeAsyncFunctions() {
    for (var _len41 = arguments.length, fns = new Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
      fns[_key41] = arguments[_key41];
    }

    return function (arg) {
      return fns.reduce(function (p, f) {
        return p.then(f);
      }, Promise.resolve(arg));
    };
  };
  var pipeFunctions = function pipeFunctions() {
    for (var _len42 = arguments.length, fns = new Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
      fns[_key42] = arguments[_key42];
    }

    return fns.reduce(function (f, g) {
      return function () {
        return g(f.apply(void 0, arguments));
      };
    });
  };
  var pluralize = function pluralize(val, word) {
    var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : word + 's';

    var _pluralize = function _pluralize(num, word) {
      var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : word + 's';
      return [1, -1].includes(Number(num)) ? word : plural;
    };

    if (_typeof(val) === 'object') return function (num, word) {
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
  var prefix = function prefix(prop) {
    var capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
    var prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
    var i = prefixes.findIndex(function (prefix) {
      return typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !== 'undefined';
    });
    return i !== -1 ? i === 0 ? prop : prefixes[i] + capitalizedProp : null;
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
    var arr = Array.from({
      length: num - 1
    }).map(function (x, i) {
      return i + 2;
    }),
        sqroot = Math.floor(Math.sqrt(num)),
        numsTillSqroot = Array.from({
      length: sqroot - 1
    }).map(function (x, i) {
      return i + 2;
    });
    numsTillSqroot.forEach(function (x) {
      return arr = arr.filter(function (y) {
        return y % x !== 0 || y === x;
      });
    });
    return arr;
  };
  var promisify = function promisify(func) {
    return function () {
      for (var _len43 = arguments.length, args = new Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
        args[_key43] = arguments[_key43];
      }

      return new Promise(function (resolve, reject) {
        return func.apply(void 0, args.concat([function (err, result) {
          return err ? reject(err) : resolve(result);
        }]));
      });
    };
  };
  var pull = function pull(arr) {
    for (var _len44 = arguments.length, args = new Array(_len44 > 1 ? _len44 - 1 : 0), _key44 = 1; _key44 < _len44; _key44++) {
      args[_key44 - 1] = arguments[_key44];
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
  var pullBy = function pullBy(arr) {
    for (var _len45 = arguments.length, args = new Array(_len45 > 1 ? _len45 - 1 : 0), _key45 = 1; _key45 < _len45; _key45++) {
      args[_key45 - 1] = arguments[_key45];
    }

    var length = args.length;
    var fn = length > 1 ? args[length - 1] : undefined;
    fn = typeof fn == 'function' ? (args.pop(), fn) : undefined;
    var argState = (Array.isArray(args[0]) ? args[0] : args).map(function (val) {
      return fn(val);
    });
    var pulled = arr.filter(function (v, i) {
      return !argState.includes(fn(v));
    });
    arr.length = 0;
    pulled.forEach(function (v) {
      return arr.push(v);
    });
  };
  var radsToDegrees = function radsToDegrees(rad) {
    return rad * 180.0 / Math.PI;
  };
  var randomHexColorCode = function randomHexColorCode() {
    var n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };
  var randomIntArrayInRange = function randomIntArrayInRange(min, max) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Array.from({
      length: n
    }, function () {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    });
  };
  var randomIntegerInRange = function randomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var randomNumberInRange = function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
  };
  var readFileLines = function readFileLines(filename) {
    return fs.readFileSync(filename).toString('UTF8').split('\n');
  };
  var rearg = function rearg(fn, indexes) {
    return function () {
      for (var _len46 = arguments.length, args = new Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
        args[_key46] = arguments[_key46];
      }

      return fn.apply(void 0, _toConsumableArray(indexes.map(function (i) {
        return args[i];
      })));
    };
  };
  var recordAnimationFrames = function recordAnimationFrames(callback) {
    var autoStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var running = true,
        raf;

    var stop = function stop() {
      running = false;
      cancelAnimationFrame(raf);
    };

    var start = function start() {
      running = true;
      run();
    };

    var run = function run() {
      raf = requestAnimationFrame(function () {
        callback();
        if (running) run();
      });
    };

    if (autoStart) start();
    return {
      start: start,
      stop: stop
    };
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
  var reject = function reject(pred, array) {
    return array.filter(function () {
      return !pred.apply(void 0, arguments);
    });
  };
  var remove = function remove(arr, func) {
    return Array.isArray(arr) ? arr.filter(func).reduce(function (acc, val) {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, []) : [];
  };
  var removeNonASCII = function removeNonASCII(str) {
    return str.replace(/[^\x20-\x7E]/g, '');
  };
  var renameKeys = function renameKeys(keysMap, obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      return _objectSpread({}, acc, _defineProperty({}, keysMap[key] || key, obj[key]));
    }, {});
  };
  var reverseString = function reverseString(str) {
    return _toConsumableArray(str).reverse().join('');
  };
  var round = function round(n) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Number("".concat(Math.round("".concat(n, "e").concat(decimals)), "e-").concat(decimals));
  };
  var runAsync = function runAsync(fn) {
    var worker = new Worker(URL.createObjectURL(new Blob(["postMessage((".concat(fn, ")());")]), {
      type: 'application/javascript; charset=utf-8'
    }));
    return new Promise(function (res, rej) {
      worker.onmessage = function (_ref23) {
        var data = _ref23.data;
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
  var sampleSize = function sampleSize(_ref24) {
    var _ref25 = _toArray(_ref24),
        arr = _ref25.slice(0);

    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var m = arr.length;

    while (m) {
      var i = Math.floor(Math.random() * m--);
      var _ref26 = [arr[i], arr[m]];
      arr[m] = _ref26[0];
      arr[i] = _ref26[1];
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
    return "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(val));
  };
  var serializeForm = function serializeForm(form) {
    return Array.from(new FormData(form), function (field) {
      return field.map(encodeURIComponent).join('=');
    }).join('&');
  };
  var setStyle = function setStyle(el, ruleName, val) {
    return el.style[ruleName] = val;
  };
  var shallowClone = function shallowClone(obj) {
    return Object.assign({}, obj);
  };
  var shank = function shank(arr) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var delCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    for (var _len47 = arguments.length, elements = new Array(_len47 > 3 ? _len47 - 3 : 0), _key47 = 3; _key47 < _len47; _key47++) {
      elements[_key47 - 3] = arguments[_key47];
    }

    return arr.slice(0, index).concat(elements).concat(arr.slice(index + delCount));
  };
  var show = function show() {
    for (var _len48 = arguments.length, el = new Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
      el[_key48] = arguments[_key48];
    }

    return el.concat().forEach(function (e) {
      return e.style.display = '';
    });
  };
  var shuffle = function shuffle(_ref27) {
    var _ref28 = _toArray(_ref27),
        arr = _ref28.slice(0);

    var m = arr.length;

    while (m) {
      var i = Math.floor(Math.random() * m--);
      var _ref29 = [arr[i], arr[m]];
      arr[m] = _ref29[0];
      arr[i] = _ref29[1];
    }

    return arr;
  };
  var similarity = function similarity(arr, values) {
    return arr.filter(function (v) {
      return values.includes(v);
    });
  };
  var size = function size(val) {
    return Array.isArray(val) ? val.length : val && _typeof(val) === 'object' ? val.size || val.length || Object.keys(val).length : typeof val === 'string' ? new Blob([val]).size : 0;
  };
  var sleep = function sleep(ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  };
  var smoothScroll = function smoothScroll(element) {
    return document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    });
  };
  var sortCharactersInString = function sortCharactersInString(str) {
    return _toConsumableArray(str).sort(function (a, b) {
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
  var sortedIndexBy = function sortedIndexBy(arr, n, fn) {
    var isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
    var val = fn(n);
    var index = arr.findIndex(function (el) {
      return isDescending ? val >= fn(el) : val <= fn(el);
    });
    return index === -1 ? arr.length : index;
  };
  var sortedLastIndex = function sortedLastIndex(arr, n) {
    var isDescending = arr[0] > arr[arr.length - 1];
    var index = arr.reverse().findIndex(function (el) {
      return isDescending ? n <= el : n >= el;
    });
    return index === -1 ? 0 : arr.length - index;
  };
  var sortedLastIndexBy = function sortedLastIndexBy(arr, n, fn) {
    var isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
    var val = fn(n);
    var index = arr.map(fn).reverse().findIndex(function (el) {
      return isDescending ? val <= el : val >= el;
    });
    return index === -1 ? 0 : arr.length - index;
  };
  var splitLines = function splitLines(str) {
    return str.split(/\r?\n/);
  };
  var spreadOver = function spreadOver(fn) {
    return function (argsArr) {
      return fn.apply(void 0, _toConsumableArray(argsArr));
    };
  };
  var stableSort = function stableSort(arr, compare) {
    return arr.map(function (item, index) {
      return {
        item: item,
        index: index
      };
    }).sort(function (a, b) {
      return compare(a.item, b.item) || a.index - b.index;
    }).map(function (_ref30) {
      var item = _ref30.item;
      return item;
    });
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
  var stringPermutations = function stringPermutations(str) {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str.split('').reduce(function (acc, letter, i) {
      return acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(function (val) {
        return letter + val;
      }));
    }, []);
  };
  var stripHTMLTags = function stripHTMLTags(str) {
    return str.replace(/<[^>]*>/g, '');
  };
  var sum = function sum() {
    for (var _len49 = arguments.length, arr = new Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
      arr[_key49] = arguments[_key49];
    }

    return arr.concat().reduce(function (acc, val) {
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
  var symmetricDifference = function symmetricDifference(a, b) {
    var sA = new Set(a),
        sB = new Set(b);
    return _toConsumableArray(a.filter(function (x) {
      return !sB.has(x);
    })).concat(_toConsumableArray(b.filter(function (x) {
      return !sA.has(x);
    })));
  };
  var symmetricDifferenceBy = function symmetricDifferenceBy(a, b, fn) {
    var sA = new Set(a.map(function (v) {
      return fn(v);
    })),
        sB = new Set(b.map(function (v) {
      return fn(v);
    }));
    return _toConsumableArray(a.filter(function (x) {
      return !sB.has(fn(x));
    })).concat(_toConsumableArray(b.filter(function (x) {
      return !sA.has(fn(x));
    })));
  };
  var symmetricDifferenceWith = function symmetricDifferenceWith(arr, val, comp) {
    return _toConsumableArray(arr.filter(function (a) {
      return val.findIndex(function (b) {
        return comp(a, b);
      }) === -1;
    })).concat(_toConsumableArray(val.filter(function (a) {
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
  var takeRightWhile = function takeRightWhile(arr, func) {
    return arr.reduceRight(function (acc, el) {
      return func(el) ? acc : [el].concat(_toConsumableArray(acc));
    }, []);
  };
  var takeWhile = function takeWhile(arr, func) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = arr.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion2 = (_step3 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            i = _step3$value[0],
            val = _step3$value[1];

        if (func(val)) return arr.slice(0, i);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return arr;
  };
  var throttle = function throttle(fn, wait) {
    var inThrottle, lastFn, lastTime;
    return function () {
      var context = this,
          args = arguments;

      if (!inThrottle) {
        fn.apply(context, args);
        lastTime = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFn);
        lastFn = setTimeout(function () {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        }, Math.max(wait - (Date.now() - lastTime), 0));
      }
    };
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
  var toCurrency = function toCurrency(n, curr) {
    var LanguageFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    return Intl.NumberFormat(LanguageFormat, {
      style: 'currency',
      currency: curr
    }).format(n);
  };
  var toDecimalMark = function toDecimalMark(num) {
    return num.toLocaleString('en-US');
  };
  var toHash = function toHash(object, key) {
    return Array.prototype.reduce.call(object, function (acc, data, index) {
      return acc[!key ? index : data[key]] = data, acc;
    }, {});
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
  var toTitleCase = function toTitleCase(str) {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
      return x.charAt(0).toUpperCase() + x.slice(1);
    }).join(' ');
  };
  var toggleClass = function toggleClass(el, className) {
    return el.classList.toggle(className);
  };
  var tomorrow = function tomorrow() {
    var t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
  };
  var transform = function transform(obj, fn, acc) {
    return Object.keys(obj).reduce(function (a, k) {
      return fn(a, obj[k], k, obj);
    }, acc);
  };
  var triggerEvent = function triggerEvent(el, eventType, detail) {
    return el.dispatchEvent(new CustomEvent(eventType, {
      detail: detail
    }));
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
  var uncurry = function uncurry(fn) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return function () {
      var next = function next(acc) {
        return function (args) {
          return args.reduce(function (x, y) {
            return x(y);
          }, acc);
        };
      };

      for (var _len50 = arguments.length, args = new Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
        args[_key50] = arguments[_key50];
      }

      if (n > args.length) throw new RangeError('Arguments too few!');
      return next(fn)(args.slice(0, n));
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
  var unflattenObject = function unflattenObject(obj) {
    return Object.keys(obj).reduce(function (acc, k) {
      if (k.indexOf('.') !== -1) {
        var keys = k.split('.');
        Object.assign(acc, JSON.parse('{' + keys.map(function (v, i) {
          return i !== keys.length - 1 ? "\"".concat(v, "\":{") : "\"".concat(v, "\":");
        }).join('') + obj[k] + '}'.repeat(keys.length)));
      } else acc[k] = obj[k];

      return acc;
    }, {});
  };
  var unfold = function unfold(fn, seed) {
    var result = [],
        val = [null, seed];

    while (val = fn(val[1])) {
      result.push(val[0]);
    }

    return result;
  };
  var union = function union(a, b) {
    return Array.from(new Set(_toConsumableArray(a).concat(_toConsumableArray(b))));
  };
  var unionBy = function unionBy(a, b, fn) {
    var s = new Set(a.map(fn));
    return Array.from(new Set(_toConsumableArray(a).concat(_toConsumableArray(b.filter(function (x) {
      return !s.has(fn(x));
    })))));
  };
  var unionWith = function unionWith(a, b, comp) {
    return Array.from(new Set(_toConsumableArray(a).concat(_toConsumableArray(b.filter(function (x) {
      return a.findIndex(function (y) {
        return comp(x, y);
      }) === -1;
    })))));
  };
  var uniqueElements = function uniqueElements(arr) {
    return _toConsumableArray(new Set(arr));
  };
  var uniqueElementsBy = function uniqueElementsBy(arr, fn) {
    return arr.reduce(function (acc, v) {
      if (!acc.some(function (x) {
        return fn(v, x);
      })) acc.push(v);
      return acc;
    }, []);
  };
  var uniqueElementsByRight = function uniqueElementsByRight(arr, fn) {
    return arr.reduceRight(function (acc, v) {
      if (!acc.some(function (x) {
        return fn(v, x);
      })) acc.push(v);
      return acc;
    }, []);
  };
  var uniqueSymmetricDifference = function uniqueSymmetricDifference(a, b) {
    return _toConsumableArray(new Set(_toConsumableArray(a.filter(function (v) {
      return !b.includes(v);
    })).concat(_toConsumableArray(b.filter(function (v) {
      return !a.includes(v);
    })))));
  };
  var untildify = function untildify(str) {
    return str.replace(/^~($|\/|\\)/, "".concat(require('os').homedir(), "$1"));
  };
  var unzip = function unzip(arr) {
    return arr.reduce(function (acc, val) {
      return val.forEach(function (v, i) {
        return acc[i].push(v);
      }), acc;
    }, Array.from({
      length: Math.max.apply(Math, _toConsumableArray(arr.map(function (x) {
        return x.length;
      })))
    }).map(function (x) {
      return [];
    }));
  };
  var unzipWith = function unzipWith(arr, fn) {
    return arr.reduce(function (acc, val) {
      return val.forEach(function (v, i) {
        return acc[i].push(v);
      }), acc;
    }, Array.from({
      length: Math.max.apply(Math, _toConsumableArray(arr.map(function (x) {
        return x.length;
      })))
    }).map(function (x) {
      return [];
    })).map(function (val) {
      return fn.apply(void 0, _toConsumableArray(val));
    });
  };
  var validateNumber = function validateNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
  };
  var vectorDistance = function vectorDistance() {
    for (var _len51 = arguments.length, coords = new Array(_len51), _key51 = 0; _key51 < _len51; _key51++) {
      coords[_key51] = arguments[_key51];
    }

    var pointLength = Math.trunc(coords.length / 2);
    var sum = coords.slice(0, pointLength).reduce(function (acc, val, i) {
      return acc + Math.pow(val - coords[pointLength + i], 2);
    }, 0);
    return Math.sqrt(sum);
  };
  var when = function when(pred, whenTrue) {
    return function (x) {
      return pred(x) ? whenTrue(x) : x;
    };
  };
  var without = function without(arr) {
    for (var _len52 = arguments.length, args = new Array(_len52 > 1 ? _len52 - 1 : 0), _key52 = 1; _key52 < _len52; _key52++) {
      args[_key52 - 1] = arguments[_key52];
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
    return /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;
  };
  var yesterday = function yesterday() {
    var t = new Date();
    t.setDate(t.getDate() - 1);
    return t.toISOString().split('T')[0];
  };
  var zip = function zip() {
    for (var _len53 = arguments.length, arrays = new Array(_len53), _key53 = 0; _key53 < _len53; _key53++) {
      arrays[_key53] = arguments[_key53];
    }

    var maxLength = Math.max.apply(Math, _toConsumableArray(arrays.map(function (x) {
      return x.length;
    })));
    return Array.from({
      length: maxLength
    }).map(function (_, i) {
      return Array.from({
        length: arrays.length
      }, function (_, k) {
        return arrays[k][i];
      });
    });
  };
  var zipObject = function zipObject(props, values) {
    return props.reduce(function (obj, prop, index) {
      return obj[prop] = values[index], obj;
    }, {});
  };
  var zipWith = function zipWith() {
    for (var _len54 = arguments.length, array = new Array(_len54), _key54 = 0; _key54 < _len54; _key54++) {
      array[_key54] = arguments[_key54];
    }

    var fn = typeof array[array.length - 1] === 'function' ? array.pop() : undefined;
    return Array.from({
      length: Math.max.apply(Math, _toConsumableArray(array.map(function (a) {
        return a.length;
      })))
    }, function (_, i) {
      return fn ? fn.apply(void 0, _toConsumableArray(array.map(function (a) {
        return a[i];
      }))) : array.map(function (a) {
        return a[i];
      });
    });
  };

  exports.CSVToArray = CSVToArray;
  exports.CSVToJSON = CSVToJSON;
  exports.JSONToFile = JSONToFile;
  exports.JSONtoCSV = JSONtoCSV;
  exports.RGBToHex = RGBToHex;
  exports.URLJoin = URLJoin;
  exports.UUIDGeneratorBrowser = UUIDGeneratorBrowser;
  exports.UUIDGeneratorNode = UUIDGeneratorNode;
  exports.all = all;
  exports.allEqual = allEqual;
  exports.any = any;
  exports.approximatelyEqual = approximatelyEqual;
  exports.arrayToCSV = arrayToCSV;
  exports.arrayToHtmlList = arrayToHtmlList;
  exports.ary = ary;
  exports.atob = atob;
  exports.attempt = attempt;
  exports.average = average;
  exports.averageBy = averageBy;
  exports.bifurcate = bifurcate;
  exports.bifurcateBy = bifurcateBy;
  exports.bind = bind;
  exports.bindAll = bindAll;
  exports.bindKey = bindKey;
  exports.binomialCoefficient = binomialCoefficient;
  exports.bottomVisible = bottomVisible;
  exports.btoa = btoa;
  exports.byteSize = byteSize;
  exports.call = call;
  exports.capitalize = capitalize;
  exports.capitalizeEveryWord = capitalizeEveryWord;
  exports.castArray = castArray;
  exports.chainAsync = chainAsync;
  exports.checkProp = checkProp;
  exports.chunk = chunk;
  exports.clampNumber = clampNumber;
  exports.cloneRegExp = cloneRegExp;
  exports.coalesce = coalesce;
  exports.coalesceFactory = coalesceFactory;
  exports.collectInto = collectInto;
  exports.colorize = colorize;
  exports.compact = compact;
  exports.compactWhitespace = compactWhitespace;
  exports.compose = compose;
  exports.composeRight = composeRight;
  exports.converge = converge;
  exports.copyToClipboard = copyToClipboard;
  exports.countBy = countBy;
  exports.countOccurrences = countOccurrences;
  exports.counter = counter;
  exports.createDirIfNotExists = createDirIfNotExists;
  exports.createElement = createElement;
  exports.createEventHub = createEventHub;
  exports.currentURL = currentURL;
  exports.curry = curry;
  exports.dayOfYear = dayOfYear;
  exports.debounce = debounce;
  exports.decapitalize = decapitalize;
  exports.deepClone = deepClone;
  exports.deepFlatten = deepFlatten;
  exports.deepFreeze = deepFreeze;
  exports.deepGet = deepGet;
  exports.deepMapKeys = deepMapKeys;
  exports.defaults = defaults;
  exports.defer = defer;
  exports.degreesToRads = degreesToRads;
  exports.delay = delay;
  exports.detectDeviceType = detectDeviceType;
  exports.difference = difference;
  exports.differenceBy = differenceBy;
  exports.differenceWith = differenceWith;
  exports.dig = dig;
  exports.digitize = digitize;
  exports.distance = distance;
  exports.drop = drop;
  exports.dropRight = dropRight;
  exports.dropRightWhile = dropRightWhile;
  exports.dropWhile = dropWhile;
  exports.elementContains = elementContains;
  exports.elementIsVisibleInViewport = elementIsVisibleInViewport;
  exports.elo = elo;
  exports.equals = equals;
  exports.escapeHTML = escapeHTML;
  exports.escapeRegExp = escapeRegExp;
  exports.everyNth = everyNth;
  exports.extendHex = extendHex;
  exports.factorial = factorial;
  exports.fibonacci = fibonacci;
  exports.filterFalsy = filterFalsy;
  exports.filterNonUnique = filterNonUnique;
  exports.filterNonUniqueBy = filterNonUniqueBy;
  exports.findKey = findKey;
  exports.findLast = findLast;
  exports.findLastIndex = findLastIndex;
  exports.findLastKey = findLastKey;
  exports.flatten = flatten;
  exports.flattenObject = flattenObject;
  exports.flip = flip;
  exports.forEachRight = forEachRight;
  exports.forOwn = forOwn;
  exports.forOwnRight = forOwnRight;
  exports.formToObject = formToObject;
  exports.formatDuration = formatDuration;
  exports.fromCamelCase = fromCamelCase;
  exports.functionName = functionName;
  exports.functions = functions;
  exports.gcd = gcd;
  exports.geometricProgression = geometricProgression;
  exports.get = get;
  exports.getColonTimeFromDate = getColonTimeFromDate;
  exports.getDaysDiffBetweenDates = getDaysDiffBetweenDates;
  exports.getImages = getImages;
  exports.getMeridiemSuffixOfInteger = getMeridiemSuffixOfInteger;
  exports.getScrollPosition = getScrollPosition;
  exports.getStyle = getStyle;
  exports.getType = getType;
  exports.getURLParameters = getURLParameters;
  exports.groupBy = groupBy;
  exports.hammingDistance = hammingDistance;
  exports.hasClass = hasClass;
  exports.hasFlags = hasFlags;
  exports.hashBrowser = hashBrowser;
  exports.hashNode = hashNode;
  exports.head = head;
  exports.hexToRGB = hexToRGB;
  exports.hide = hide;
  exports.httpGet = httpGet;
  exports.httpPost = httpPost;
  exports.httpsRedirect = httpsRedirect;
  exports.hz = hz;
  exports.inRange = inRange;
  exports.indentString = indentString;
  exports.indexOfAll = indexOfAll;
  exports.initial = initial;
  exports.initialize2DArray = initialize2DArray;
  exports.initializeArrayWithRange = initializeArrayWithRange;
  exports.initializeArrayWithRangeRight = initializeArrayWithRangeRight;
  exports.initializeArrayWithValues = initializeArrayWithValues;
  exports.initializeNDArray = initializeNDArray;
  exports.insertAfter = insertAfter;
  exports.insertBefore = insertBefore;
  exports.intersection = intersection;
  exports.intersectionBy = intersectionBy;
  exports.intersectionWith = intersectionWith;
  exports.invertKeyValues = invertKeyValues;
  exports.is = is;
  exports.isAbsoluteURL = isAbsoluteURL;
  exports.isAfterDate = isAfterDate;
  exports.isAnagram = isAnagram;
  exports.isArrayLike = isArrayLike;
  exports.isBeforeDate = isBeforeDate;
  exports.isBoolean = isBoolean;
  exports.isBrowser = isBrowser;
  exports.isBrowserTabFocused = isBrowserTabFocused;
  exports.isDivisible = isDivisible;
  exports.isDuplexStream = isDuplexStream;
  exports.isEmpty = isEmpty;
  exports.isEven = isEven;
  exports.isFunction = isFunction;
  exports.isLowerCase = isLowerCase;
  exports.isNegativeZero = isNegativeZero;
  exports.isNil = isNil;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isObjectLike = isObjectLike;
  exports.isPlainObject = isPlainObject;
  exports.isPrime = isPrime;
  exports.isPrimitive = isPrimitive;
  exports.isPromiseLike = isPromiseLike;
  exports.isReadableStream = isReadableStream;
  exports.isSameDate = isSameDate;
  exports.isSorted = isSorted;
  exports.isStream = isStream;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.isTravisCI = isTravisCI;
  exports.isUndefined = isUndefined;
  exports.isUpperCase = isUpperCase;
  exports.isValidJSON = isValidJSON;
  exports.isWeekday = isWeekday;
  exports.isWeekend = isWeekend;
  exports.isWritableStream = isWritableStream;
  exports.join = join;
  exports.last = last;
  exports.lcm = lcm;
  exports.longestItem = longestItem;
  exports.lowercaseKeys = lowercaseKeys;
  exports.luhnCheck = luhnCheck;
  exports.mapKeys = mapKeys;
  exports.mapNumRange = mapNumRange;
  exports.mapObject = mapObject;
  exports.mapString = mapString;
  exports.mapValues = mapValues;
  exports.mask = mask;
  exports.matches = matches;
  exports.matchesWith = matchesWith;
  exports.maxBy = maxBy;
  exports.maxDate = maxDate;
  exports.maxN = maxN;
  exports.median = median;
  exports.memoize = memoize;
  exports.merge = merge;
  exports.midpoint = midpoint;
  exports.minBy = minBy;
  exports.minDate = minDate;
  exports.minN = minN;
  exports.mostPerformant = mostPerformant;
  exports.negate = negate;
  exports.nest = nest;
  exports.nodeListToArray = nodeListToArray;
  exports.none = none;
  exports.nthArg = nthArg;
  exports.nthElement = nthElement;
  exports.objectFromPairs = objectFromPairs;
  exports.objectToPairs = objectToPairs;
  exports.observeMutations = observeMutations;
  exports.off = off;
  exports.offset = offset;
  exports.omit = omit;
  exports.omitBy = omitBy;
  exports.on = on;
  exports.onUserInputChange = onUserInputChange;
  exports.once = once;
  exports.orderBy = orderBy;
  exports.over = over;
  exports.overArgs = overArgs;
  exports.pad = pad;
  exports.palindrome = palindrome;
  exports.parseCookie = parseCookie;
  exports.partial = partial;
  exports.partialRight = partialRight;
  exports.partition = partition;
  exports.percentile = percentile;
  exports.permutations = permutations;
  exports.pick = pick;
  exports.pickBy = pickBy;
  exports.pipeAsyncFunctions = pipeAsyncFunctions;
  exports.pipeFunctions = pipeFunctions;
  exports.pluralize = pluralize;
  exports.powerset = powerset;
  exports.prefix = prefix;
  exports.prettyBytes = prettyBytes;
  exports.primes = primes;
  exports.promisify = promisify;
  exports.pull = pull;
  exports.pullAtIndex = pullAtIndex;
  exports.pullAtValue = pullAtValue;
  exports.pullBy = pullBy;
  exports.radsToDegrees = radsToDegrees;
  exports.randomHexColorCode = randomHexColorCode;
  exports.randomIntArrayInRange = randomIntArrayInRange;
  exports.randomIntegerInRange = randomIntegerInRange;
  exports.randomNumberInRange = randomNumberInRange;
  exports.readFileLines = readFileLines;
  exports.rearg = rearg;
  exports.recordAnimationFrames = recordAnimationFrames;
  exports.redirect = redirect;
  exports.reduceSuccessive = reduceSuccessive;
  exports.reduceWhich = reduceWhich;
  exports.reducedFilter = reducedFilter;
  exports.reject = reject;
  exports.remove = remove;
  exports.removeNonASCII = removeNonASCII;
  exports.renameKeys = renameKeys;
  exports.reverseString = reverseString;
  exports.round = round;
  exports.runAsync = runAsync;
  exports.runPromisesInSeries = runPromisesInSeries;
  exports.sample = sample;
  exports.sampleSize = sampleSize;
  exports.scrollToTop = scrollToTop;
  exports.sdbm = sdbm;
  exports.serializeCookie = serializeCookie;
  exports.serializeForm = serializeForm;
  exports.setStyle = setStyle;
  exports.shallowClone = shallowClone;
  exports.shank = shank;
  exports.show = show;
  exports.shuffle = shuffle;
  exports.similarity = similarity;
  exports.size = size;
  exports.sleep = sleep;
  exports.smoothScroll = smoothScroll;
  exports.sortCharactersInString = sortCharactersInString;
  exports.sortedIndex = sortedIndex;
  exports.sortedIndexBy = sortedIndexBy;
  exports.sortedLastIndex = sortedLastIndex;
  exports.sortedLastIndexBy = sortedLastIndexBy;
  exports.splitLines = splitLines;
  exports.spreadOver = spreadOver;
  exports.stableSort = stableSort;
  exports.standardDeviation = standardDeviation;
  exports.stringPermutations = stringPermutations;
  exports.stripHTMLTags = stripHTMLTags;
  exports.sum = sum;
  exports.sumBy = sumBy;
  exports.sumPower = sumPower;
  exports.symmetricDifference = symmetricDifference;
  exports.symmetricDifferenceBy = symmetricDifferenceBy;
  exports.symmetricDifferenceWith = symmetricDifferenceWith;
  exports.tail = tail;
  exports.take = take;
  exports.takeRight = takeRight;
  exports.takeRightWhile = takeRightWhile;
  exports.takeWhile = takeWhile;
  exports.throttle = throttle;
  exports.timeTaken = timeTaken;
  exports.times = times;
  exports.toCamelCase = toCamelCase;
  exports.toCurrency = toCurrency;
  exports.toDecimalMark = toDecimalMark;
  exports.toHash = toHash;
  exports.toKebabCase = toKebabCase;
  exports.toOrdinalSuffix = toOrdinalSuffix;
  exports.toSafeInteger = toSafeInteger;
  exports.toSnakeCase = toSnakeCase;
  exports.toTitleCase = toTitleCase;
  exports.toggleClass = toggleClass;
  exports.tomorrow = tomorrow;
  exports.transform = transform;
  exports.triggerEvent = triggerEvent;
  exports.truncateString = truncateString;
  exports.truthCheckCollection = truthCheckCollection;
  exports.unary = unary;
  exports.uncurry = uncurry;
  exports.unescapeHTML = unescapeHTML;
  exports.unflattenObject = unflattenObject;
  exports.unfold = unfold;
  exports.union = union;
  exports.unionBy = unionBy;
  exports.unionWith = unionWith;
  exports.uniqueElements = uniqueElements;
  exports.uniqueElementsBy = uniqueElementsBy;
  exports.uniqueElementsByRight = uniqueElementsByRight;
  exports.uniqueSymmetricDifference = uniqueSymmetricDifference;
  exports.untildify = untildify;
  exports.unzip = unzip;
  exports.unzipWith = unzipWith;
  exports.validateNumber = validateNumber;
  exports.vectorDistance = vectorDistance;
  exports.when = when;
  exports.without = without;
  exports.words = words;
  exports.xProd = xProd;
  exports.yesNo = yesNo;
  exports.yesterday = yesterday;
  exports.zip = zip;
  exports.zipObject = zipObject;
  exports.zipWith = zipWith;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
