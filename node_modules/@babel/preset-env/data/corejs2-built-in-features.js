const typedArrayMethods = [
  "typed arrays / %TypedArray%.from",
  "typed arrays / %TypedArray%.of",
  "typed arrays / %TypedArray%.prototype.subarray",
  "typed arrays / %TypedArray%.prototype.join",
  "typed arrays / %TypedArray%.prototype.indexOf",
  "typed arrays / %TypedArray%.prototype.lastIndexOf",
  "typed arrays / %TypedArray%.prototype.slice",
  "typed arrays / %TypedArray%.prototype.every",
  "typed arrays / %TypedArray%.prototype.filter",
  "typed arrays / %TypedArray%.prototype.forEach",
  "typed arrays / %TypedArray%.prototype.map",
  "typed arrays / %TypedArray%.prototype.reduce",
  "typed arrays / %TypedArray%.prototype.reduceRight",
  "typed arrays / %TypedArray%.prototype.reverse",
  "typed arrays / %TypedArray%.prototype.some",
  "typed arrays / %TypedArray%.prototype.sort",
  "typed arrays / %TypedArray%.prototype.copyWithin",
  "typed arrays / %TypedArray%.prototype.find",
  "typed arrays / %TypedArray%.prototype.findIndex",
  "typed arrays / %TypedArray%.prototype.fill",
  "typed arrays / %TypedArray%.prototype.keys",
  "typed arrays / %TypedArray%.prototype.values",
  "typed arrays / %TypedArray%.prototype.entries",
  "typed arrays / %TypedArray%.prototype[Symbol.iterator]",
  "typed arrays / %TypedArray%[Symbol.species]",
];

const es = {
  // compat-table missing babel6 mapping
  // "es6.array.concat": {
  //   features: [
  //     "well-known symbols / Symbol.isConcatSpreadable",
  //     "well-known symbols / Symbol.species, Array.prototype.concat",
  //   ]
  // },
  "es6.array.copy-within": "Array.prototype methods / Array.prototype.copyWithin",
  "es6.array.every": "Array methods / Array.prototype.every",
  "es6.array.fill": "Array.prototype methods / Array.prototype.fill",
  "es6.array.filter": {
    features: [
      "Array methods / Array.prototype.filter",
      // compat-table missing babel6 mapping
      // "well-known symbols / Symbol.species, Array.prototype.filter",
    ],
  },
  "es6.array.find": "Array.prototype methods / Array.prototype.find",
  "es6.array.find-index": "Array.prototype methods / Array.prototype.findIndex",
  "es7.array.flat-map": "Array.prototype.{flat, flatMap} / Array.prototype.flatMap",
  "es6.array.for-each": "Array methods / Array.prototype.forEach",
  "es6.array.from": "Array static methods / Array.from",
  "es7.array.includes": "Array.prototype.includes",
  "es6.array.index-of": "Array methods / Array.prototype.indexOf",
  "es6.array.is-array": "Array methods / Array.isArray",
  // "es.array.join": "", required tests for that
  "es6.array.iterator": {
    features: [
      "Array.prototype methods / Array.prototype.keys",
      // can use Symbol.iterator, not implemented in many environments
      // "Array.prototype methods / Array.prototype.values",
      "Array.prototype methods / Array.prototype.entries",
    ],
  },
  "es6.array.last-index-of": "Array methods / Array.prototype.lastIndexOf",
  "es6.array.map": {
    features: [
      "Array methods / Array.prototype.map",
      // compat-table missing babel6 mapping
      // "well-known symbols / Symbol.species, Array.prototype.map",
    ],
  },
  "es6.array.of": "Array static methods / Array.of",
  "es6.array.reduce": "Array methods / Array.prototype.reduce",
  "es6.array.reduce-right": "Array methods / Array.prototype.reduceRight",
  // compat-table missing babel6 mapping
  // "es6.array.slice": "well-known symbols / Symbol.species, Array.prototype.slice",
  "es6.array.some": "Array methods / Array.prototype.some",
  "es6.array.sort": "Array methods / Array.prototype.sort",
  "es6.array.species": "Array static methods / Array[Symbol.species]",
  // compat-table missing babel6 mapping
  //"es6.array.splice": "well-known symbols / Symbol.species, Array.prototype.splice",

  "es6.date.now": "Date methods / Date.now",
  "es6.date.to-iso-string": "Date methods / Date.prototype.toISOString",
  "es6.date.to-json": "Date methods / Date.prototype.toJSON",
  "es6.date.to-primitive": "Date.prototype[Symbol.toPrimitive]",
  "es6.date.to-string": "miscellaneous / Invalid Date",

  "es6.function.bind": "Function.prototype.bind",
  "es6.function.has-instance": "well-known symbols / Symbol.hasInstance",
  "es6.function.name": {
    features: [
      "function \"name\" property / function statements",
      "function \"name\" property / function expressions",
    ],
  },

  "es6.map": "Map",

  "es6.math.acosh": "Math methods / Math.acosh",
  "es6.math.asinh": "Math methods / Math.asinh",
  "es6.math.atanh": "Math methods / Math.atanh",
  "es6.math.cbrt": "Math methods / Math.cbrt",
  "es6.math.clz32": "Math methods / Math.clz32",
  "es6.math.cosh": "Math methods / Math.cosh",
  "es6.math.expm1": "Math methods / Math.expm1",
  "es6.math.fround": "Math methods / Math.fround",
  "es6.math.hypot": "Math methods / Math.hypot",
  "es6.math.imul": "Math methods / Math.imul",
  "es6.math.log1p": "Math methods / Math.log1p",
  "es6.math.log10": "Math methods / Math.log10",
  "es6.math.log2": "Math methods / Math.log2",
  "es6.math.sign": "Math methods / Math.sign",
  "es6.math.sinh": "Math methods / Math.sinh",
  "es6.math.tanh": "Math methods / Math.tanh",
  "es6.math.trunc": "Math methods / Math.trunc",

  "es6.number.constructor": {
    features: [
      "octal and binary literals / octal supported by Number()",
      "octal and binary literals / binary supported by Number()",
    ],
  },
  "es6.number.epsilon": "Number properties / Number.EPSILON",
  "es6.number.is-finite": "Number properties / Number.isFinite",
  "es6.number.is-integer": "Number properties / Number.isInteger",
  "es6.number.is-nan": "Number properties / Number.isNaN",
  "es6.number.is-safe-integer": "Number properties / Number.isSafeInteger",
  "es6.number.max-safe-integer": "Number properties / Number.MAX_SAFE_INTEGER",
  "es6.number.min-safe-integer": "Number properties / Number.MIN_SAFE_INTEGER",
  "es6.number.parse-float": "Number properties / Number.parseFloat",
  "es6.number.parse-int": "Number properties / Number.parseInt",

  "es6.object.assign": {
    features: ["Object static methods / Object.assign", "Symbol"],
  },
  "es6.object.create": "Object static methods / Object.create",
  "es7.object.define-getter": {
    features: [
      "Object.prototype getter/setter methods / __defineGetter__",
      "Object.prototype getter/setter methods / __defineGetter__, symbols",
      "Object.prototype getter/setter methods / __defineGetter__, ToObject(this)",
    ],
  },
  "es7.object.define-setter": {
    features: [
      "Object.prototype getter/setter methods / __defineSetter__",
      "Object.prototype getter/setter methods / __defineSetter__, symbols",
      "Object.prototype getter/setter methods / __defineSetter__, ToObject(this)",
    ],
  },
  "es6.object.define-property": "Object static methods / Object.defineProperty",
  "es6.object.define-properties": "Object static methods / Object.defineProperties",
  "es7.object.entries": "Object static methods / Object.entries",
  "es6.object.freeze": "Object static methods accept primitives / Object.freeze",
  "es6.object.get-own-property-descriptor": "Object static methods accept primitives / Object.getOwnPropertyDescriptor",
  "es7.object.get-own-property-descriptors": "Object static methods / Object.getOwnPropertyDescriptors",
  "es6.object.get-own-property-names": "Object static methods accept primitives / Object.getOwnPropertyNames",
  "es6.object.get-prototype-of": "Object static methods accept primitives / Object.getPrototypeOf",
  "es7.object.lookup-getter": {
    features: [
      "Object.prototype getter/setter methods / __lookupGetter__",
      "Object.prototype getter/setter methods / __lookupGetter__, prototype chain",
      "Object.prototype getter/setter methods / __lookupGetter__, symbols",
      "Object.prototype getter/setter methods / __lookupGetter__, ToObject(this)",
      "Object.prototype getter/setter methods / __lookupGetter__, data properties can shadow accessors",
    ],
  },
  "es7.object.lookup-setter": {
    features: [
      "Object.prototype getter/setter methods / __lookupSetter__",
      "Object.prototype getter/setter methods / __lookupSetter__, prototype chain",
      "Object.prototype getter/setter methods / __lookupSetter__, symbols",
      "Object.prototype getter/setter methods / __lookupSetter__, ToObject(this)",
      "Object.prototype getter/setter methods / __lookupSetter__, data properties can shadow accessors",
    ],
  },
  "es6.object.prevent-extensions": "Object static methods accept primitives / Object.preventExtensions",
  "es6.object.to-string": "well-known symbols / Symbol.toStringTag",
  "es6.object.is": "Object static methods / Object.is",
  "es6.object.is-frozen": "Object static methods accept primitives / Object.isFrozen",
  "es6.object.is-sealed": "Object static methods accept primitives / Object.isSealed",
  "es6.object.is-extensible": "Object static methods accept primitives / Object.isExtensible",
  "es6.object.keys": "Object static methods accept primitives / Object.keys",
  "es6.object.seal": "Object static methods accept primitives / Object.seal",
  "es6.object.set-prototype-of": "Object static methods / Object.setPrototypeOf",
  "es7.object.values": "Object static methods / Object.values",

  "es6.promise": {
    features: [
      // required unhandled rejection tracking tests
      "Promise",
      "well-known symbols / Symbol.species, Promise.prototype.then",
    ],
  },
  "es7.promise.finally": "Promise.prototype.finally",

  "es6.reflect.apply": "Reflect / Reflect.apply",
  "es6.reflect.construct": "Reflect / Reflect.construct",
  "es6.reflect.define-property": "Reflect / Reflect.defineProperty",
  "es6.reflect.delete-property": "Reflect / Reflect.deleteProperty",
  "es6.reflect.get": "Reflect / Reflect.get",
  "es6.reflect.get-own-property-descriptor": "Reflect / Reflect.getOwnPropertyDescriptor",
  "es6.reflect.get-prototype-of": "Reflect / Reflect.getPrototypeOf",
  "es6.reflect.has": "Reflect / Reflect.has",
  "es6.reflect.is-extensible": "Reflect / Reflect.isExtensible",
  "es6.reflect.own-keys": "Reflect / Reflect.ownKeys",
  "es6.reflect.prevent-extensions": "Reflect / Reflect.preventExtensions",
  "es6.reflect.set": "Reflect / Reflect.set",
  "es6.reflect.set-prototype-of": "Reflect / Reflect.setPrototypeOf",

  "es6.regexp.constructor": {
    features: [
      "miscellaneous / RegExp constructor can alter flags",
      "well-known symbols / Symbol.match, RegExp constructor",
    ],
  },
  "es6.regexp.flags": "RegExp.prototype properties / RegExp.prototype.flags",
  "es6.regexp.match": "RegExp.prototype properties / RegExp.prototype[Symbol.match]",
  "es6.regexp.replace": "RegExp.prototype properties / RegExp.prototype[Symbol.replace]",
  "es6.regexp.split": "RegExp.prototype properties / RegExp.prototype[Symbol.split]",
  "es6.regexp.search": "RegExp.prototype properties / RegExp.prototype[Symbol.search]",
  "es6.regexp.to-string": "miscellaneous / RegExp.prototype.toString generic and uses \"flags\" property",

  // This is explicit due to prevent the stage-1 Set proposals under the
  // category "Set methods" from being included.
  "es6.set": {
    features: [
      "Set / basic functionality",
      "Set / constructor arguments",
      "Set / constructor requires new",
      "Set / constructor accepts null",
      "Set / constructor invokes add",
      "Set / iterator closing",
      "Set / Set.prototype.add returns this",
      "Set / -0 key converts to +0",
      "Set / Set.prototype.size",
      "Set / Set.prototype.delete",
      "Set / Set.prototype.clear",
      "Set / Set.prototype.forEach",
      "Set / Set.prototype.keys",
      "Set / Set.prototype.values",
      "Set / Set.prototype.entries",
      "Set / Set.prototype[Symbol.iterator]",
      "Set / Set.prototype isn't an instance",
      "Set / Set iterator prototype chain",
      "Set / Set[Symbol.species]",
    ],
  },

  "es6.symbol": {
    features: [
      "Symbol",
      "Object static methods / Object.getOwnPropertySymbols",
      "well-known symbols / Symbol.hasInstance",
      "well-known symbols / Symbol.isConcatSpreadable",
      "well-known symbols / Symbol.iterator",
      "well-known symbols / Symbol.match",
      "well-known symbols / Symbol.replace",
      "well-known symbols / Symbol.search",
      "well-known symbols / Symbol.species",
      "well-known symbols / Symbol.split",
      "well-known symbols / Symbol.toPrimitive",
      "well-known symbols / Symbol.toStringTag",
      "well-known symbols / Symbol.unscopables",
    ],
  },
  "es7.symbol.async-iterator": "Asynchronous Iterators",

  "es6.string.anchor": "String.prototype HTML methods",
  "es6.string.big": "String.prototype HTML methods",
  "es6.string.blink": "String.prototype HTML methods",
  "es6.string.bold": "String.prototype HTML methods",
  "es6.string.code-point-at": "String.prototype methods / String.prototype.codePointAt",
  "es6.string.ends-with": "String.prototype methods / String.prototype.endsWith",
  "es6.string.fixed": "String.prototype HTML methods",
  "es6.string.fontcolor": "String.prototype HTML methods",
  "es6.string.fontsize": "String.prototype HTML methods",
  "es6.string.from-code-point": "String static methods / String.fromCodePoint",
  "es6.string.includes": "String.prototype methods / String.prototype.includes",
  "es6.string.italics": "String.prototype HTML methods",
  "es6.string.iterator": "String.prototype methods / String.prototype[Symbol.iterator]",
  "es6.string.link": "String.prototype HTML methods",
  // "String.prototype methods / String.prototype.normalize" not implemented
  "es7.string.pad-start": "String padding / String.prototype.padStart",
  "es7.string.pad-end": "String padding / String.prototype.padEnd",
  "es6.string.raw": "String static methods / String.raw",
  "es6.string.repeat": "String.prototype methods / String.prototype.repeat",
  "es6.string.small": "String.prototype HTML methods",
  "es6.string.starts-with": "String.prototype methods / String.prototype.startsWith",
  "es6.string.strike": "String.prototype HTML methods",
  "es6.string.sub": "String.prototype HTML methods",
  "es6.string.sup": "String.prototype HTML methods",
  "es6.string.trim": "String properties and methods / String.prototype.trim",
  "es7.string.trim-left": "string trimming / String.prototype.trimStart",
  "es7.string.trim-right": "string trimming / String.prototype.trimEnd",

  "es6.typed.array-buffer": "typed arrays / ArrayBuffer[Symbol.species]",
  "es6.typed.data-view": "typed arrays / DataView",
  "es6.typed.int8-array": {
    features: ["typed arrays / Int8Array"].concat(typedArrayMethods),
  },
  "es6.typed.uint8-array": {
    features: ["typed arrays / Uint8Array"].concat(typedArrayMethods),
  },
  "es6.typed.uint8-clamped-array": {
    features: ["typed arrays / Uint8ClampedArray"].concat(typedArrayMethods),
  },
  "es6.typed.int16-array": {
    features: ["typed arrays / Int16Array"].concat(typedArrayMethods),
  },
  "es6.typed.uint16-array": {
    features: ["typed arrays / Uint16Array"].concat(typedArrayMethods),
  },
  "es6.typed.int32-array": {
    features: ["typed arrays / Int32Array"].concat(typedArrayMethods),
  },
  "es6.typed.uint32-array": {
    features: ["typed arrays / Uint32Array"].concat(typedArrayMethods),
  },
  "es6.typed.float32-array": {
    features: ["typed arrays / Float32Array"].concat(typedArrayMethods),
  },
  "es6.typed.float64-array": {
    features: ["typed arrays / Float64Array"].concat(typedArrayMethods),
  },

  "es6.weak-map": "WeakMap",

  "es6.weak-set": "WeakSet",
};

const proposals = require("./shipped-proposals").builtIns;

module.exports = Object.assign({}, es, proposals);
