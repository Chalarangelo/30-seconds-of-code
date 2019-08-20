"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticProperties = exports.InstanceProperties = exports.BuiltIns = void 0;
const ArrayNatureIterators = ["es6.object.to-string", "es6.array.iterator", "web.dom.iterable"];
const CommonIterators = ["es6.string.iterator", ...ArrayNatureIterators];
const PromiseDependencies = ["es6.object.to-string", "es6.promise"];
const BuiltIns = {
  DataView: "es6.typed.data-view",
  Float32Array: "es6.typed.float32-array",
  Float64Array: "es6.typed.float64-array",
  Int8Array: "es6.typed.int8-array",
  Int16Array: "es6.typed.int16-array",
  Int32Array: "es6.typed.int32-array",
  Map: ["es6.map", ...CommonIterators],
  Number: "es6.number.constructor",
  Promise: PromiseDependencies,
  RegExp: ["es6.regexp.constructor"],
  Set: ["es6.set", ...CommonIterators],
  Symbol: ["es6.symbol", "es7.symbol.async-iterator"],
  Uint8Array: "es6.typed.uint8-array",
  Uint8ClampedArray: "es6.typed.uint8-clamped-array",
  Uint16Array: "es6.typed.uint16-array",
  Uint32Array: "es6.typed.uint32-array",
  WeakMap: ["es6.weak-map", ...CommonIterators],
  WeakSet: ["es6.weak-set", ...CommonIterators]
};
exports.BuiltIns = BuiltIns;
const InstanceProperties = {
  __defineGetter__: ["es7.object.define-getter"],
  __defineSetter__: ["es7.object.define-setter"],
  __lookupGetter__: ["es7.object.lookup-getter"],
  __lookupSetter__: ["es7.object.lookup-setter"],
  anchor: ["es6.string.anchor"],
  big: ["es6.string.big"],
  bind: ["es6.function.bind"],
  blink: ["es6.string.blink"],
  bold: ["es6.string.bold"],
  codePointAt: ["es6.string.code-point-at"],
  copyWithin: ["es6.array.copy-within"],
  endsWith: ["es6.string.ends-with"],
  entries: ArrayNatureIterators,
  every: ["es6.array.is-array"],
  fill: ["es6.array.fill"],
  filter: ["es6.array.filter"],
  finally: ["es7.promise.finally", ...PromiseDependencies],
  find: ["es6.array.find"],
  findIndex: ["es6.array.find-index"],
  fixed: ["es6.string.fixed"],
  flags: ["es6.regexp.flags"],
  flatMap: ["es7.array.flat-map"],
  fontcolor: ["es6.string.fontcolor"],
  fontsize: ["es6.string.fontsize"],
  forEach: ["es6.array.for-each"],
  includes: ["es6.string.includes", "es7.array.includes"],
  indexOf: ["es6.array.index-of"],
  italics: ["es6.string.italics"],
  keys: ArrayNatureIterators,
  lastIndexOf: ["es6.array.last-index-of"],
  link: ["es6.string.link"],
  map: ["es6.array.map"],
  match: ["es6.regexp.match"],
  name: ["es6.function.name"],
  padStart: ["es7.string.pad-start"],
  padEnd: ["es7.string.pad-end"],
  reduce: ["es6.array.reduce"],
  reduceRight: ["es6.array.reduce-right"],
  repeat: ["es6.string.repeat"],
  replace: ["es6.regexp.replace"],
  search: ["es6.regexp.search"],
  slice: ["es6.array.slice"],
  small: ["es6.string.small"],
  some: ["es6.array.some"],
  sort: ["es6.array.sort"],
  split: ["es6.regexp.split"],
  startsWith: ["es6.string.starts-with"],
  strike: ["es6.string.strike"],
  sub: ["es6.string.sub"],
  sup: ["es6.string.sup"],
  toISOString: ["es6.date.to-iso-string"],
  toJSON: ["es6.date.to-json"],
  toString: ["es6.object.to-string", "es6.date.to-string", "es6.regexp.to-string"],
  trim: ["es6.string.trim"],
  trimEnd: ["es7.string.trim-right"],
  trimLeft: ["es7.string.trim-left"],
  trimRight: ["es7.string.trim-right"],
  trimStart: ["es7.string.trim-left"],
  values: ArrayNatureIterators
};
exports.InstanceProperties = InstanceProperties;
const StaticProperties = {
  Array: {
    from: ["es6.array.from", "es6.string.iterator"],
    isArray: "es6.array.is-array",
    of: "es6.array.of"
  },
  Date: {
    now: "es6.date.now"
  },
  Object: {
    assign: "es6.object.assign",
    create: "es6.object.create",
    defineProperty: "es6.object.define-property",
    defineProperties: "es6.object.define-properties",
    entries: "es7.object.entries",
    freeze: "es6.object.freeze",
    getOwnPropertyDescriptors: "es7.object.get-own-property-descriptors",
    getOwnPropertySymbols: "es6.symbol",
    is: "es6.object.is",
    isExtensible: "es6.object.is-extensible",
    isFrozen: "es6.object.is-frozen",
    isSealed: "es6.object.is-sealed",
    keys: "es6.object.keys",
    preventExtensions: "es6.object.prevent-extensions",
    seal: "es6.object.seal",
    setPrototypeOf: "es6.object.set-prototype-of",
    values: "es7.object.values"
  },
  Math: {
    acosh: "es6.math.acosh",
    asinh: "es6.math.asinh",
    atanh: "es6.math.atanh",
    cbrt: "es6.math.cbrt",
    clz32: "es6.math.clz32",
    cosh: "es6.math.cosh",
    expm1: "es6.math.expm1",
    fround: "es6.math.fround",
    hypot: "es6.math.hypot",
    imul: "es6.math.imul",
    log1p: "es6.math.log1p",
    log10: "es6.math.log10",
    log2: "es6.math.log2",
    sign: "es6.math.sign",
    sinh: "es6.math.sinh",
    tanh: "es6.math.tanh",
    trunc: "es6.math.trunc"
  },
  String: {
    fromCodePoint: "es6.string.from-code-point",
    raw: "es6.string.raw"
  },
  Number: {
    EPSILON: "es6.number.epsilon",
    MIN_SAFE_INTEGER: "es6.number.min-safe-integer",
    MAX_SAFE_INTEGER: "es6.number.max-safe-integer",
    isFinite: "es6.number.is-finite",
    isInteger: "es6.number.is-integer",
    isSafeInteger: "es6.number.is-safe-integer",
    isNaN: "es6.number.is-nan",
    parseFloat: "es6.number.parse-float",
    parseInt: "es6.number.parse-int"
  },
  Promise: {
    all: CommonIterators,
    race: CommonIterators
  },
  Reflect: {
    apply: "es6.reflect.apply",
    construct: "es6.reflect.construct",
    defineProperty: "es6.reflect.define-property",
    deleteProperty: "es6.reflect.delete-property",
    get: "es6.reflect.get",
    getOwnPropertyDescriptor: "es6.reflect.get-own-property-descriptor",
    getPrototypeOf: "es6.reflect.get-prototype-of",
    has: "es6.reflect.has",
    isExtensible: "es6.reflect.is-extensible",
    ownKeys: "es6.reflect.own-keys",
    preventExtensions: "es6.reflect.prevent-extensions",
    set: "es6.reflect.set",
    setPrototypeOf: "es6.reflect.set-prototype-of"
  }
};
exports.StaticProperties = StaticProperties;