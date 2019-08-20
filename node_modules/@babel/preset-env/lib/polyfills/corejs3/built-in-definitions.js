"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PossibleGlobalObjects = exports.CommonInstanceDependencies = exports.StaticProperties = exports.InstanceProperties = exports.BuiltIns = exports.PromiseDependencies = exports.CommonIterators = void 0;
const ArrayNatureIterators = ["es.array.iterator", "web.dom-collections.iterator"];
const CommonIterators = ["es.string.iterator", ...ArrayNatureIterators];
exports.CommonIterators = CommonIterators;
const ArrayNatureIteratorsWithTag = ["es.object.to-string", ...ArrayNatureIterators];
const CommonIteratorsWithTag = ["es.object.to-string", ...CommonIterators];
const TypedArrayDependencies = ["es.typed-array.copy-within", "es.typed-array.every", "es.typed-array.fill", "es.typed-array.filter", "es.typed-array.find", "es.typed-array.find-index", "es.typed-array.for-each", "es.typed-array.includes", "es.typed-array.index-of", "es.typed-array.iterator", "es.typed-array.join", "es.typed-array.last-index-of", "es.typed-array.map", "es.typed-array.reduce", "es.typed-array.reduce-right", "es.typed-array.reverse", "es.typed-array.set", "es.typed-array.slice", "es.typed-array.some", "es.typed-array.sort", "es.typed-array.subarray", "es.typed-array.to-locale-string", "es.typed-array.to-string", "es.object.to-string", "es.array.iterator", "es.array-buffer.slice"];
const TypedArrayStaticMethods = {
  from: "es.typed-array.from",
  of: "es.typed-array.of"
};
const PromiseDependencies = ["es.promise", "es.object.to-string"];
exports.PromiseDependencies = PromiseDependencies;
const PromiseDependenciesWithIterators = [...PromiseDependencies, ...CommonIterators];
const SymbolDependencies = ["es.symbol", "es.symbol.description", "es.object.to-string"];
const MapDependencies = ["es.map", "esnext.map.delete-all", "esnext.map.every", "esnext.map.filter", "esnext.map.find", "esnext.map.find-key", "esnext.map.includes", "esnext.map.key-of", "esnext.map.map-keys", "esnext.map.map-values", "esnext.map.merge", "esnext.map.reduce", "esnext.map.some", "esnext.map.update", ...CommonIteratorsWithTag];
const SetDependencies = ["es.set", "esnext.set.add-all", "esnext.set.delete-all", "esnext.set.difference", "esnext.set.every", "esnext.set.filter", "esnext.set.find", "esnext.set.intersection", "esnext.set.is-disjoint-from", "esnext.set.is-subset-of", "esnext.set.is-superset-of", "esnext.set.join", "esnext.set.map", "esnext.set.reduce", "esnext.set.some", "esnext.set.symmetric-difference", "esnext.set.union", ...CommonIteratorsWithTag];
const WeakMapDependencies = ["es.weak-map", "esnext.weak-map.delete-all", ...CommonIteratorsWithTag];
const WeakSetDependencies = ["es.weak-set", "esnext.weak-set.add-all", "esnext.weak-set.delete-all", ...CommonIteratorsWithTag];
const URLSearchParamsDependencies = ["web.url", ...CommonIteratorsWithTag];
const BuiltIns = {
  AggregateError: ["esnext.aggregate-error", ...CommonIterators],
  ArrayBuffer: ["es.array-buffer.constructor", "es.array-buffer.slice", "es.object.to-string"],
  DataView: ["es.data-view", "es.array-buffer.slice", "es.object.to-string"],
  Date: ["es.date.to-string"],
  Float32Array: ["es.typed-array.float32-array", ...TypedArrayDependencies],
  Float64Array: ["es.typed-array.float64-array", ...TypedArrayDependencies],
  Int8Array: ["es.typed-array.int8-array", ...TypedArrayDependencies],
  Int16Array: ["es.typed-array.int16-array", ...TypedArrayDependencies],
  Int32Array: ["es.typed-array.int32-array", ...TypedArrayDependencies],
  Uint8Array: ["es.typed-array.uint8-array", ...TypedArrayDependencies],
  Uint8ClampedArray: ["es.typed-array.uint8-clamped-array", ...TypedArrayDependencies],
  Uint16Array: ["es.typed-array.uint16-array", ...TypedArrayDependencies],
  Uint32Array: ["es.typed-array.uint32-array", ...TypedArrayDependencies],
  Map: MapDependencies,
  Number: ["es.number.constructor"],
  Observable: ["esnext.observable", "esnext.symbol.observable", "es.object.to-string", ...CommonIteratorsWithTag],
  Promise: PromiseDependencies,
  RegExp: ["es.regexp.constructor", "es.regexp.exec", "es.regexp.to-string"],
  Set: SetDependencies,
  Symbol: SymbolDependencies,
  URL: ["web.url", ...URLSearchParamsDependencies],
  URLSearchParams: URLSearchParamsDependencies,
  WeakMap: WeakMapDependencies,
  WeakSet: WeakSetDependencies,
  clearImmediate: ["web.immediate"],
  compositeKey: ["esnext.composite-key"],
  compositeSymbol: ["esnext.composite-symbol", ...SymbolDependencies],
  fetch: PromiseDependencies,
  globalThis: ["esnext.global-this"],
  parseFloat: ["es.parse-float"],
  parseInt: ["es.parse-int"],
  queueMicrotask: ["web.queue-microtask"],
  setTimeout: ["web.timers"],
  setInterval: ["web.timers"],
  setImmediate: ["web.immediate"]
};
exports.BuiltIns = BuiltIns;
const InstanceProperties = {
  at: ["esnext.string.at"],
  anchor: ["es.string.anchor"],
  big: ["es.string.big"],
  bind: ["es.function.bind"],
  blink: ["es.string.blink"],
  bold: ["es.string.bold"],
  codePointAt: ["es.string.code-point-at"],
  codePoints: ["esnext.string.code-points"],
  concat: ["es.array.concat"],
  copyWithin: ["es.array.copy-within"],
  description: ["es.symbol", "es.symbol.description"],
  endsWith: ["es.string.ends-with"],
  entries: ArrayNatureIteratorsWithTag,
  every: ["es.array.every"],
  exec: ["es.regexp.exec"],
  fill: ["es.array.fill"],
  filter: ["es.array.filter"],
  finally: ["es.promise.finally", ...PromiseDependencies],
  find: ["es.array.find"],
  findIndex: ["es.array.find-index"],
  fixed: ["es.string.fixed"],
  flags: ["es.regexp.flags"],
  flat: ["es.array.flat", "es.array.unscopables.flat"],
  flatMap: ["es.array.flat-map", "es.array.unscopables.flat-map"],
  fontcolor: ["es.string.fontcolor"],
  fontsize: ["es.string.fontsize"],
  forEach: ["es.array.for-each", "web.dom-collections.for-each"],
  includes: ["es.array.includes", "es.string.includes"],
  indexOf: ["es.array.index-of"],
  italic: ["es.string.italics"],
  join: ["es.array.join"],
  keys: ArrayNatureIteratorsWithTag,
  lastIndex: ["esnext.array.last-index"],
  lastIndexOf: ["es.array.last-index-of"],
  lastItem: ["esnext.array.last-item"],
  link: ["es.string.link"],
  match: ["es.string.match", "es.regexp.exec"],
  matchAll: ["esnext.string.match-all"],
  map: ["es.array.map"],
  name: ["es.function.name"],
  padEnd: ["es.string.pad-end"],
  padStart: ["es.string.pad-start"],
  reduce: ["es.array.reduce"],
  reduceRight: ["es.array.reduce-right"],
  repeat: ["es.string.repeat"],
  replace: ["es.string.replace", "es.regexp.exec"],
  replaceAll: ["esnext.string.replace-all"],
  reverse: ["es.string.reverse"],
  search: ["es.string.search", "es.regexp.exec"],
  slice: ["es.array.slice"],
  small: ["es.string.small"],
  some: ["es.array.some"],
  sort: ["es.array.sort"],
  splice: ["es.array.splice"],
  split: ["es.string.split", "es.regexp.exec"],
  startsWith: ["es.string.starts-with"],
  strike: ["es.string.strike"],
  sub: ["es.string.sub"],
  sup: ["es.string.sup"],
  toFixed: ["es.number.to-fixed"],
  toISOString: ["es.date.to-iso-string"],
  toJSON: ["es.date.to-json", "web.url.to-json"],
  toPrecision: ["es.number.to-precision"],
  toString: ["es.object.to-string", "es.regexp.to-string", "es.date.to-string"],
  trim: ["es.string.trim"],
  trimEnd: ["es.string.trim-end"],
  trimLeft: ["es.string.trim-start"],
  trimRight: ["es.string.trim-end"],
  trimStart: ["es.string.trim-start"],
  values: ArrayNatureIteratorsWithTag,
  __defineGetter__: ["es.object.define-getter"],
  __defineSetter__: ["es.object.define-setter"],
  __lookupGetter__: ["es.object.lookup-getter"],
  __lookupSetter__: ["es.object.lookup-setter"]
};
exports.InstanceProperties = InstanceProperties;
const StaticProperties = {
  Array: {
    from: ["es.array.from", "es.string.iterator"],
    isArray: ["es.array.is-array"],
    of: ["es.array.of"]
  },
  Date: {
    now: "es.date.now"
  },
  Object: {
    assign: "es.object.assign",
    create: "es.object.create",
    defineProperty: "es.object.define-property",
    defineProperties: "es.object.define-properties",
    entries: "es.object.entries",
    freeze: "es.object.freeze",
    fromEntries: ["es.object.from-entries", "es.array.iterator"],
    getOwnPropertyDescriptor: "es.object.get-own-property-descriptor",
    getOwnPropertyDescriptors: "es.object.get-own-property-descriptors",
    getOwnPropertyNames: "es.object.get-own-property-names",
    getOwnPropertySymbols: "es.symbol",
    getPrototypeOf: "es.object.get-prototype-of",
    is: "es.object.is",
    isExtensible: "es.object.is-extensible",
    isFrozen: "es.object.is-frozen",
    isSealed: "es.object.is-sealed",
    keys: "es.object.keys",
    preventExtensions: "es.object.prevent-extensions",
    seal: "es.object.seal",
    setPrototypeOf: "es.object.set-prototype-of",
    values: "es.object.values"
  },
  Math: {
    DEG_PER_RAD: "esnext.math.deg-per-rad",
    RAD_PER_DEG: "esnext.math.rad-per-deg",
    acosh: "es.math.acosh",
    asinh: "es.math.asinh",
    atanh: "es.math.atanh",
    cbrt: "es.math.cbrt",
    clamp: "esnext.math.clamp",
    clz32: "es.math.clz32",
    cosh: "es.math.cosh",
    degrees: "esnext.math.degrees",
    expm1: "es.math.expm1",
    fround: "es.math.fround",
    fscale: "esnext.math.fscale",
    hypot: "es.math.hypot",
    iaddh: "esnext.math.iaddh",
    imul: "es.math.imul",
    imulh: "esnext.math.imulh",
    isubh: "esnext.math.isubh",
    log1p: "es.math.log1p",
    log10: "es.math.log10",
    log2: "es.math.log2",
    radians: "esnext.math.radians",
    scale: "esnext.math.scale",
    seededPRNG: "esnext.math.seeded-prng",
    sign: "es.math.sign",
    signbit: "esnext.math.signbit",
    sinh: "es.math.sinh",
    tanh: "es.math.tanh",
    trunc: "es.math.trunc",
    umulh: "esnext.math.umulh"
  },
  String: {
    fromCodePoint: "es.string.from-code-point",
    raw: "es.string.raw"
  },
  Number: {
    EPSILON: "es.number.epsilon",
    MIN_SAFE_INTEGER: "es.number.min-safe-integer",
    MAX_SAFE_INTEGER: "es.number.max-safe-integer",
    fromString: "esnext.number.from-string",
    isFinite: "es.number.is-finite",
    isInteger: "es.number.is-integer",
    isSafeInteger: "es.number.is-safe-integer",
    isNaN: "es.number.is-nan",
    parseFloat: "es.number.parse-float",
    parseInt: "es.number.parse-int"
  },
  Map: {
    from: ["esnext.map.from", ...MapDependencies],
    groupBy: ["esnext.map.group-by", ...MapDependencies],
    keyBy: ["esnext.map.key-by", ...MapDependencies],
    of: ["esnext.map.of", ...MapDependencies]
  },
  Set: {
    from: ["esnext.set.from", ...SetDependencies],
    of: ["esnext.set.of", ...SetDependencies]
  },
  WeakMap: {
    from: ["esnext.weak-map.from", ...WeakMapDependencies],
    of: ["esnext.weak-map.of", ...WeakMapDependencies]
  },
  WeakSet: {
    from: ["esnext.weak-set.from", ...WeakSetDependencies],
    of: ["esnext.weak-set.of", ...WeakSetDependencies]
  },
  Promise: {
    all: PromiseDependenciesWithIterators,
    allSettled: ["esnext.promise.all-settled", ...PromiseDependenciesWithIterators],
    any: ["esnext.promise.any", ...PromiseDependenciesWithIterators],
    race: PromiseDependenciesWithIterators,
    try: ["esnext.promise.try", ...PromiseDependenciesWithIterators]
  },
  Reflect: {
    apply: "es.reflect.apply",
    construct: "es.reflect.construct",
    defineMetadata: "esnext.reflect.define-metadata",
    defineProperty: "es.reflect.define-property",
    deleteMetadata: "esnext.reflect.delete-metadata",
    deleteProperty: "es.reflect.delete-property",
    get: "es.reflect.get",
    getMetadata: "esnext.reflect.get-metadata",
    getMetadataKeys: "esnext.reflect.get-metadata-keys",
    getOwnMetadata: "esnext.reflect.get-own-metadata",
    getOwnMetadataKeys: "esnext.reflect.get-own-metadata-keys",
    getOwnPropertyDescriptor: "es.reflect.get-own-property-descriptor",
    getPrototypeOf: "es.reflect.get-prototype-of",
    has: "es.reflect.has",
    hasMetadata: "esnext.reflect.has-metadata",
    hasOwnMetadata: "esnext.reflect.has-own-metadata",
    isExtensible: "es.reflect.is-extensible",
    metadata: "esnext.reflect.metadata",
    ownKeys: "es.reflect.own-keys",
    preventExtensions: "es.reflect.prevent-extensions",
    set: "es.reflect.set",
    setPrototypeOf: "es.reflect.set-prototype-of"
  },
  Symbol: {
    asyncIterator: ["es.symbol.async-iterator"],
    dispose: ["esnext.symbol.dispose"],
    hasInstance: ["es.symbol.has-instance", "es.function.has-instance"],
    isConcatSpreadable: ["es.symbol.is-concat-spreadable", "es.array.concat"],
    iterator: ["es.symbol.iterator", ...CommonIteratorsWithTag],
    match: ["es.symbol.match", "es.string.match"],
    observable: ["esnext.symbol.observable"],
    patternMatch: ["esnext.symbol.pattern-match"],
    replace: ["es.symbol.replace", "es.string.replace"],
    search: ["es.symbol.search", "es.string.search"],
    species: ["es.symbol.species", "es.array.species"],
    split: ["es.symbol.split", "es.string.split"],
    toPrimitive: ["es.symbol.to-primitive", "es.date.to-primitive"],
    toStringTag: ["es.symbol.to-string-tag", "es.object.to-string", "es.math.to-string-tag", "es.json.to-string-tag"],
    unscopables: ["es.symbol.unscopables"]
  },
  ArrayBuffer: {
    isView: ["es.array-buffer.is-view"]
  },
  Int8Array: TypedArrayStaticMethods,
  Uint8Array: TypedArrayStaticMethods,
  Uint8ClampedArray: TypedArrayStaticMethods,
  Int16Array: TypedArrayStaticMethods,
  Uint16Array: TypedArrayStaticMethods,
  Int32Array: TypedArrayStaticMethods,
  Uint32Array: TypedArrayStaticMethods,
  Float32Array: TypedArrayStaticMethods,
  Float64Array: TypedArrayStaticMethods
};
exports.StaticProperties = StaticProperties;
const CommonInstanceDependencies = new Set(["es.object.to-string", "es.object.define-getter", "es.object.define-setter", "es.object.lookup-getter", "es.object.lookup-setter", "es.regexp.exec"]);
exports.CommonInstanceDependencies = CommonInstanceDependencies;
const PossibleGlobalObjects = new Set(["global", "globalThis", "self", "window"]);
exports.PossibleGlobalObjects = PossibleGlobalObjects;