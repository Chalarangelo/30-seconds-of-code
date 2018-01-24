const fs = typeof require !== "undefined" && require('fs');
const JSONToFile = (obj, filename) =>
  fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2));

const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');

const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );

const crypto$1 = typeof require !== "undefined" && require('crypto');
const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto$1.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
      []
    );
};

const arrayToHtmlList = (arr, listID) =>
  arr.map(item => (document.querySelector('#' + listID).innerHTML += `<li>${item}</li>`));

const ary = (fn, n) => (...args) => fn(...args.slice(0, n));

const atob = str => new Buffer(str, 'base64').toString('binary');

const average = (...nums) => [...nums].reduce((acc, val) => acc + val, 0) / nums.length;

const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
  arr.length;

const bind = (fn, context, ...args) =>
  function() {
    return fn.apply(context, args.concat(...arguments));
  };

const bindKey = (context, fn, ...args) =>
  function() {
    return context[fn].apply(context, args.concat(...arguments));
  };

const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

const btoa = str => new Buffer(str, 'binary').toString('base64');

const byteSize = str => new Blob([str]).size;

const call = (key, ...args) => context => context[key](...args);

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

const castArray = val => (Array.isArray(val) ? val : [val]);

const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
};

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);

const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_));

const coalesceFactory = valid => (...args) => args.find(valid);

const collectInto = fn => (...args) => fn(args);

const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
});

const compact = arr => arr.filter(Boolean);

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a + 0), 0);

const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};

const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});

const currentURL = () => window.location.href;

const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));

const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return clone;
};

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

const defaults = (obj, ...defs) => Object.assign({}, obj, ...defs.reverse(), obj);

const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)));
  return a.filter(x => !s.has(fn(x)));
};

const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1);

const digitize = n => [...`${n}`].map(i => parseInt(i));

const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

const dropRight = (arr, n = 1) => arr.slice(0, -n);

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

const elo = ([...ratings], kFactor = 32, selfRating) => {
  const [a, b] = ratings;
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) =>
    (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  if (ratings.length === 2) {
    return [newRating(a, 1), newRating(b, 0)];
  } else {
    for (let i = 0; i < ratings.length; i++) {
      let j = i;
      while (j < ratings.length - 1) {
        [ratings[i], ratings[j + 1]] = elo([ratings[i], ratings[j + 1]], kFactor);
        j++;
      }
    }
  }
  return ratings;
};

const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a != 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

const extendHex = shortHex =>
  '#' +
  shortHex
    .slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('');

const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1 ? 1 : n * factorial(n - 1);

const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key], key, obj));

const findLast = (arr, fn) => arr.filter(fn).slice(-1)[0];

const findLastIndex = (arr, fn) =>
  arr
    .map((val, i) => [i, val])
    .filter(val => fn(val[1], val[0], arr))
    .slice(-1)[0][0];

const findLastKey = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .find(key => fn(obj[key], key, obj));

const flatten = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);

const flip = fn => (first, ...rest) => fn(...rest, first);

const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback);

const forOwn = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj));

const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(val => val[1] + ' ' + (val[1] !== 1 ? val[0] + 's' : val[0]))
    .join(', ');
};

const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();

const functionName = fn => (console.debug(fn.name), fn);

const functions = (obj, inherited = false) =>
  (inherited
    ? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
    : Object.keys(obj)
  ).filter(key => typeof obj[key] === 'function');

const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};

const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1 }).map(
    (v, i) => start * step ** i
  );

const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );

const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

const getURLParameters = url =>
  url
    .match(/([^?=&]+)(=([^&]*))/g)
    .reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {});

const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});

const hammingDistance = (num1, num2) => ((num1 ^ num2).toString(2).match(/1/g) || '').length;

const hasClass = (el, className) => el.classList.contains(className);

const hasFlags = (...flags) =>
  flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));

const hashBrowser = val =>
  crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then(h => {
    let hexes = [],
      view = new DataView(h);
    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join('');
  });

const crypto$2 = typeof require !== "undefined" && require('crypto');
const hashNode = val =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          crypto$2
            .createHash('sha256')
            .update(val)
            .digest('hex')
        ),
      0
    )
  );

const head = arr => arr[0];

const hexToRGB = hex => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  );
};

const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

const inRange = (n, start, end = null) => {
  if (end && start > end) end = [start, (start = end)][0];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};

const indexOfAll = (arr, val) => {
  const indices = [];
  arr.forEach((el, i) => el === val && indices.push(i));
  return indices;
};

const initial = arr => arr.slice(0, -1);

const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map((v, i) => i * step + start);

const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
    (v, i, arr) => (arr.length - i - 1) * step + start
  );

const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);

const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(x => fn(x)));
  return a.filter(x => s.has(fn(x)));
};

const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1);

const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});

const is = (type, val) => val instanceof type;

const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

const isArrayLike = val => {
  try {
    return [...val], true;
  } catch (e) {
    return false;
  }
};

const isBoolean = val => typeof val === 'boolean';

const isDivisible = (dividend, divisor) => dividend % divisor === 0;

const isEmpty = val => val == null || !(Object.keys(val) || val).length;

const isEven = num => num % 2 === 0;

const isFunction = val => typeof val === 'function';

const isLowerCase = str => str === str.toLowerCase();

const isNil = val => val === undefined || val === null;

const isNull = val => val === null;

const isNumber = val => typeof val === 'number';

const isObject = obj => obj === Object(obj);

const isObjectLike = val => val !== null && typeof val === 'object';

const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object;

const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i <= boundary; i++) if (num % i == 0) return false;
  return num >= 2;
};

const isPrimitive = val => !['object', 'function'].includes(typeof val) || val === null;

const isPromiseLike = obj =>
  obj !== null &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';

const isSorted = arr => {
  const direction = arr[0] > arr[1] ? -1 : 1;
  for (let [i, val] of arr.entries())
    if (i === arr.length - 1) return direction;
    else if ((val - arr[i + 1]) * direction > 0) return 0;
};

const isString = val => typeof val === 'string';

const isSymbol = val => typeof val === 'symbol';

const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;

const isUndefined = val => val === undefined;

const isUpperCase = str => str === str.toUpperCase();

const isValidJSON = obj => {
  try {
    JSON.parse(obj);
    return true;
  } catch (e) {
    return false;
  }
};

const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i == arr.length - 2
        ? acc + val + end
        : i == arr.length - 1 ? acc + val : acc + val + separator,
    ''
  );

const last = arr => arr[arr.length - 1];

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => x * y / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

const longestItem = (...vals) => [...vals].sort((a, b) => b.length - a.length)[0];

const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});

const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + (val * 2) % 9 || 9), 0);
  sum += lastDigit;
  return sum % 10 === 0;
};

const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

const mapObject = (arr, fn) =>
  (a => (
    a = [arr, arr.map(fn)], a[0].reduce((acc, val, ind) => (acc[val] = a[1][ind], acc), {})))();

const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});

const mask = (cc, num = 4, mask = '*') =>
  ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);

const matches = (obj, source) =>
  Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);

const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(
    key =>
      obj.hasOwnProperty(key) && fn
        ? fn(obj[key], source[key], key, obj, source)
        : obj[key] == source[key]
  );

const maxBy = (arr, fn) => Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));

const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const memoize = fn => {
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
        return acc;
      }, {}),
    {}
  );

const minBy = (arr, fn) => Math.min(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));

const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);

const negate = func => (...args) => !func(...args);

const nthArg = n => (...args) => args.slice(n)[0];

const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];

const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});

const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);

const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true
      },
      options
    )
  );
  return observer;
};

const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);

const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => (acc[key] = obj[key], acc), {});

const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => (acc[key] = obj[key], acc), {});

const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
  if (opts.target) return delegatorFn;
};

const onUserInputChange = callback => {
  let type = 'mouse',
    lastTime = 0;
  const mousemoveHandler = () => {
    const now = performance.now();
    if (now - lastTime < 20)
      type = 'mouse', callback(type), document.removeEventListener('mousemove', mousemoveHandler);
    lastTime = now;
  };
  document.addEventListener('touchstart', () => {
    if (type === 'touch') return;
    type = 'touch', callback(type), document.addEventListener('mousemove', mousemoveHandler);
  });
};

const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return (
    s ===
    s
      .split('')
      .reverse()
      .join('')
  );
};

const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);

const partialRight = (fn, ...partials) => (...args) => fn(...args, ...partials);

const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

const percentile = (arr, val) =>
  100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;

const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => (acc[key] = obj[key], acc), {});

const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural;
  if (typeof val === 'object') return (num, word) => _pluralize(num, word, val[word]);
  return _pluralize(val, word, plural);
};

const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};

const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y == x)));
  return arr;
};

const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );

const pull = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v, i) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};

const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr
    .map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
    .filter((v, i) => !pullArr.includes(i));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
  return removed;
};

const pullAtValue = (arr, pullArr) => {
  let removed = [],
    pushToRemove = arr.forEach((v, i) => (pullArr.includes(v) ? removed.push(v) : v)),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach(v => arr.push(v));
  return removed;
};

const randomHexColorCode = () => {
  let n = ((Math.random() * 0xfffff) | 0).toString(16);
  return '#' + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n);
};

const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);

const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

const fs$1 = typeof require !== "undefined" && require('fs');
const readFileLines = filename =>
  fs$1
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');

const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce((res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res), [acc]);

const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];

const reverseString = str => [...str].reverse().join('');

const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

const runAsync = fn => {
  const blob = `var fn = ${fn.toString()}; postMessage(fn());`;
  const worker = new Worker(
    URL.createObjectURL(new Blob([blob]), {
      type: 'application/javascript; charset=utf-8'
    })
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = err => {
      rej(err), worker.terminate();
    };
  });
};

const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
    0
  );
};

const serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

const setStyle = (el, ruleName, val) => (el.style[ruleName] = val);

const shallowClone = obj => Object.assign({}, obj);

const show = (...el) => [...el].forEach(e => (e.style.display = ''));

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const similarity = (arr, values) => arr.filter(v => values.includes(v));

const size = val =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string' ? new Blob([val]).size : 0;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');

const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};

const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .map((val, i) => [i, val])
    .filter(el => (isDescending ? n >= el[1] : n >= el[1]))
    .slice(-1)[0][0];
  return index === -1 ? arr.length : index;
};

const splitLines = str => str.split(/\r?\n/);

const spreadOver = fn => argsArr => fn(...argsArr);

const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);

const sumBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0);

const sumPower = (end, power = 2, start = 1) =>
  Array(end + 1 - start)
    .fill(0)
    .map((x, i) => (i + start) ** power)
    .reduce((a, b) => a + b, 0);

const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};

const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};

const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];

const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);

const take = (arr, n = 1) => arr.slice(0, n);

const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);

const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

const times = (n, fn, context = undefined) => {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};

const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

const toDecimalMark = num => num.toLocaleString('en-US');

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

const toSafeInteger = num =>
  Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));

const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

const toggleClass = (el, className) => el.classList.toggle(className);

const tomorrow = () => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(
    t.getDate()
  ).padStart(2, '0')}`;
};

const transform = (obj, fn, acc) => Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);

const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

const truthCheckCollection = (collection, pre) => collection.every(obj => obj[pre]);

const unary = fn => val => fn(val);

const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  );

const unfold = (fn, seed) => {
  let result = [],
    val = [null, seed];
  while ((val = fn(val[1]))) result.push(val[0]);
  return result;
};

const union = (a, b) => Array.from(new Set([...a, ...b]));

const unionBy = (a, b, fn) => {
  const s = new Set(a.map(v => fn(v)));
  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
};

const unionWith = (a, b, comp) =>
  Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)]));

const uniqueElements = arr => [...new Set(arr)];

const untildify = str => str.replace(/^~($|\/|\\)/, `${typeof require !== "undefined" && require('os').homedir()}$1`);

const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );

const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])
    )
    .map(val => fn(...val));

const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;

const without = (arr, ...args) => arr.filter(v => !args.includes(v));

const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);

const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

const yesNo = (val, def = false) =>
  /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;

const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};

const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => (obj[prop] = values[index], obj), {});

const zipWith = (...arrays) => {
  const length = arrays.length;
  let fn = length > 1 ? arrays[length - 1] : undefined;
  fn = typeof fn == 'function' ? (arrays.pop(), fn) : undefined;
  const maxLength = Math.max(...arrays.map(x => x.length));
  const result = Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
  return fn ? result.map(arr => fn(...arr)) : result;
};

var imports = {JSONToFile,RGBToHex,URLJoin,UUIDGeneratorBrowser,UUIDGeneratorNode,anagrams,arrayToHtmlList,ary,atob,average,averageBy,bind,bindKey,bottomVisible,btoa,byteSize,call,capitalize,capitalizeEveryWord,castArray,chainAsync,chunk,clampNumber,cloneRegExp,coalesce,coalesceFactory,collectInto,colorize,compact,compose,composeRight,copyToClipboard,countBy,countOccurrences,createElement,createEventHub,currentURL,curry,decapitalize,deepClone,deepFlatten,defaults,defer,delay,detectDeviceType,difference,differenceBy,differenceWith,digitize,distance,dropElements,dropRight,elementIsVisibleInViewport,elo,equals,escapeHTML,escapeRegExp,everyNth,extendHex,factorial,fibonacci,filterNonUnique,findKey,findLast,findLastIndex,findLastKey,flatten,flip,forEachRight,forOwn,forOwnRight,formatDuration,fromCamelCase,functionName,functions,gcd,geometricProgression,get,getDaysDiffBetweenDates,getScrollPosition,getStyle,getType,getURLParameters,groupBy,hammingDistance,hasClass,hasFlags,hashBrowser,hashNode,head,hexToRGB,hide,httpGet,httpPost,httpsRedirect,inRange,indexOfAll,initial,initialize2DArray,initializeArrayWithRange,initializeArrayWithRangeRight,initializeArrayWithValues,intersection,intersectionBy,intersectionWith,invertKeyValues,is,isAbsoluteURL,isArrayLike,isBoolean,isDivisible,isEmpty,isEven,isFunction,isLowerCase,isNil,isNull,isNumber,isObject,isObjectLike,isPlainObject,isPrime,isPrimitive,isPromiseLike,isSorted,isString,isSymbol,isTravisCI,isUndefined,isUpperCase,isValidJSON,join,last,lcm,longestItem,lowercaseKeys,luhnCheck,mapKeys,mapObject,mapValues,mask,matches,matchesWith,maxBy,maxN,median,memoize,merge,minBy,minN,negate,nthArg,nthElement,objectFromPairs,objectToPairs,observeMutations,off,omit,omitBy,on,onUserInputChange,once,orderBy,over,palindrome,parseCookie,partial,partialRight,partition,percentile,pick,pickBy,pipeFunctions,pluralize,powerset,prettyBytes,primes,promisify,pull,pullAtIndex,pullAtValue,randomHexColorCode,randomIntArrayInRange,randomIntegerInRange,randomNumberInRange,readFileLines,redirect,reduceSuccessive,reducedFilter,remove,reverseString,round,runAsync,runPromisesInSeries,sample,sampleSize,scrollToTop,sdbm,serializeCookie,setStyle,shallowClone,show,shuffle,similarity,size,sleep,sortCharactersInString,sortedIndex,sortedLastIndex,splitLines,spreadOver,standardDeviation,sum,sumBy,sumPower,symmetricDifference,symmetricDifferenceBy,symmetricDifferenceWith,tail,take,takeRight,timeTaken,times,toCamelCase,toDecimalMark,toKebabCase,toOrdinalSuffix,toSafeInteger,toSnakeCase,toggleClass,tomorrow,transform,truncateString,truthCheckCollection,unary,unescapeHTML,unfold,union,unionBy,unionWith,uniqueElements,untildify,unzip,unzipWith,validateNumber,without,words,xProd,yesNo,zip,zipObject,zipWith,}

export default imports;
