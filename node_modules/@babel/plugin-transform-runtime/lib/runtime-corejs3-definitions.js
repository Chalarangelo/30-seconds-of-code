"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => {
  return {
    BuiltIns: {
      AggregateError: {
        stable: false,
        path: "aggregate-error"
      },
      Map: {
        stable: true,
        path: "map"
      },
      Observable: {
        stable: false,
        path: "observable"
      },
      Promise: {
        stable: true,
        path: "promise"
      },
      Set: {
        stable: true,
        path: "set"
      },
      Symbol: {
        stable: true,
        path: "symbol"
      },
      URL: {
        stable: true,
        path: "url"
      },
      URLSearchParams: {
        stable: true,
        path: "url-search-params"
      },
      WeakMap: {
        stable: true,
        path: "weak-map"
      },
      WeakSet: {
        stable: true,
        path: "weak-set"
      },
      clearImmediate: {
        stable: true,
        path: "clear-immediate"
      },
      compositeKey: {
        stable: false,
        path: "composite-key"
      },
      compositeSymbol: {
        stable: false,
        path: "composite-symbol"
      },
      globalThis: {
        stable: false,
        path: "global-this"
      },
      parseFloat: {
        stable: true,
        path: "parse-float"
      },
      parseInt: {
        stable: true,
        path: "parse-int"
      },
      queueMicrotask: {
        stable: true,
        path: "queue-microtask"
      },
      setImmediate: {
        stable: true,
        path: "set-immediate"
      },
      setInterval: {
        stable: true,
        path: "set-interval"
      },
      setTimeout: {
        stable: true,
        path: "set-timeout"
      }
    },
    StaticProperties: {
      Array: {
        from: {
          stable: true,
          path: "array/from"
        },
        isArray: {
          stable: true,
          path: "array/is-array"
        },
        of: {
          stable: true,
          path: "array/of"
        }
      },
      Date: {
        now: {
          stable: true,
          path: "date/now"
        }
      },
      JSON: {
        stringify: {
          stable: true,
          path: "json/stringify"
        }
      },
      Math: {
        DEG_PER_RAD: {
          stable: false,
          path: "math/deg-per-rad"
        },
        RAD_PER_DEG: {
          stable: false,
          path: "math/rad-per-deg"
        },
        acosh: {
          stable: true,
          path: "math/acosh"
        },
        asinh: {
          stable: true,
          path: "math/asinh"
        },
        atanh: {
          stable: true,
          path: "math/atanh"
        },
        cbrt: {
          stable: true,
          path: "math/cbrt"
        },
        clamp: {
          stable: false,
          path: "math/clamp"
        },
        clz32: {
          stable: true,
          path: "math/clz32"
        },
        cosh: {
          stable: true,
          path: "math/cosh"
        },
        degrees: {
          stable: false,
          path: "math/degrees"
        },
        expm1: {
          stable: true,
          path: "math/expm1"
        },
        fround: {
          stable: true,
          path: "math/fround"
        },
        fscale: {
          stable: false,
          path: "math/fscale"
        },
        hypot: {
          stable: true,
          path: "math/hypot"
        },
        iaddh: {
          stable: false,
          path: "math/iaddh"
        },
        imul: {
          stable: true,
          path: "math/imul"
        },
        imulh: {
          stable: false,
          path: "math/imulh"
        },
        isubh: {
          stable: false,
          path: "math/isubh"
        },
        log10: {
          stable: true,
          path: "math/log10"
        },
        log1p: {
          stable: true,
          path: "math/log1p"
        },
        log2: {
          stable: true,
          path: "math/log2"
        },
        radians: {
          stable: false,
          path: "math/radians"
        },
        scale: {
          stable: false,
          path: "math/scale"
        },
        seededPRNG: {
          stable: false,
          path: "math/seeded-prng"
        },
        sign: {
          stable: true,
          path: "math/sign"
        },
        signbit: {
          stable: false,
          path: "math/signbit"
        },
        sinh: {
          stable: true,
          path: "math/sinh"
        },
        tanh: {
          stable: true,
          path: "math/tanh"
        },
        trunc: {
          stable: true,
          path: "math/trunc"
        },
        umulh: {
          stable: false,
          path: "math/umulh"
        }
      },
      Number: {
        EPSILON: {
          stable: true,
          path: "number/epsilon"
        },
        MAX_SAFE_INTEGER: {
          stable: true,
          path: "number/max-safe-integer"
        },
        MIN_SAFE_INTEGER: {
          stable: true,
          path: "number/min-safe-integer"
        },
        fromString: {
          stable: false,
          path: "number/from-string"
        },
        isFinite: {
          stable: true,
          path: "number/is-finite"
        },
        isInteger: {
          stable: true,
          path: "number/is-integer"
        },
        isNaN: {
          stable: true,
          path: "number/is-nan"
        },
        isSafeInteger: {
          stable: true,
          path: "number/is-safe-integer"
        },
        parseFloat: {
          stable: true,
          path: "number/parse-float"
        },
        parseInt: {
          stable: true,
          path: "number/parse-int"
        }
      },
      Object: {
        assign: {
          stable: true,
          path: "object/assign"
        },
        create: {
          stable: true,
          path: "object/create"
        },
        defineProperties: {
          stable: true,
          path: "object/define-properties"
        },
        defineProperty: {
          stable: true,
          path: "object/define-property"
        },
        entries: {
          stable: true,
          path: "object/entries"
        },
        freeze: {
          stable: true,
          path: "object/freeze"
        },
        fromEntries: {
          stable: true,
          path: "object/from-entries"
        },
        getOwnPropertyDescriptor: {
          stable: true,
          path: "object/get-own-property-descriptor"
        },
        getOwnPropertyDescriptors: {
          stable: true,
          path: "object/get-own-property-descriptors"
        },
        getOwnPropertyNames: {
          stable: true,
          path: "object/get-own-property-names"
        },
        getOwnPropertySymbols: {
          stable: true,
          path: "object/get-own-property-symbols"
        },
        getPrototypeOf: {
          stable: true,
          path: "object/get-prototype-of"
        },
        isExtensible: {
          stable: true,
          path: "object/is-extensible"
        },
        isFrozen: {
          stable: true,
          path: "object/is-frozen"
        },
        isSealed: {
          stable: true,
          path: "object/is-sealed"
        },
        is: {
          stable: true,
          path: "object/is"
        },
        keys: {
          stable: true,
          path: "object/keys"
        },
        preventExtensions: {
          stable: true,
          path: "object/prevent-extensions"
        },
        seal: {
          stable: true,
          path: "object/seal"
        },
        setPrototypeOf: {
          stable: true,
          path: "object/set-prototype-of"
        },
        values: {
          stable: true,
          path: "object/values"
        }
      },
      Reflect: {
        apply: {
          stable: true,
          path: "reflect/apply"
        },
        construct: {
          stable: true,
          path: "reflect/construct"
        },
        defineMetadata: {
          stable: false,
          path: "reflect/define-metadata"
        },
        defineProperty: {
          stable: true,
          path: "reflect/define-property"
        },
        deleteMetadata: {
          stable: false,
          path: "reflect/delete-metadata"
        },
        deleteProperty: {
          stable: true,
          path: "reflect/delete-property"
        },
        getMetadata: {
          stable: false,
          path: "reflect/get-metadata"
        },
        getMetadataKeys: {
          stable: false,
          path: "reflect/get-metadata-keys"
        },
        getOwnMetadata: {
          stable: false,
          path: "reflect/get-own-metadata"
        },
        getOwnMetadataKeys: {
          stable: false,
          path: "reflect/get-own-metadata-keys"
        },
        getOwnPropertyDescriptor: {
          stable: true,
          path: "reflect/get-own-property-descriptor"
        },
        getPrototypeOf: {
          stable: true,
          path: "reflect/get-prototype-of"
        },
        get: {
          stable: true,
          path: "reflect/get"
        },
        has: {
          stable: true,
          path: "reflect/has"
        },
        hasMetadata: {
          stable: false,
          path: "reflect/has-metadata"
        },
        hasOwnMetadata: {
          stable: false,
          path: "reflect/has-own-metadata"
        },
        isExtensible: {
          stable: true,
          path: "reflect/is-extensible"
        },
        metadata: {
          stable: false,
          path: "reflect/metadata"
        },
        ownKeys: {
          stable: true,
          path: "reflect/own-keys"
        },
        preventExtensions: {
          stable: true,
          path: "reflect/prevent-extensions"
        },
        set: {
          stable: true,
          path: "reflect/set"
        },
        setPrototypeOf: {
          stable: true,
          path: "reflect/set-prototype-of"
        }
      },
      String: {
        fromCodePoint: {
          stable: true,
          path: "string/from-code-point"
        },
        raw: {
          stable: true,
          path: "string/raw"
        }
      },
      Symbol: {
        asyncIterator: {
          stable: true,
          path: "symbol/async-iterator"
        },
        dispose: {
          stable: false,
          path: "symbol/dispose"
        },
        for: {
          stable: true,
          path: "symbol/for"
        },
        hasInstance: {
          stable: true,
          path: "symbol/has-instance"
        },
        isConcatSpreadable: {
          stable: true,
          path: "symbol/is-concat-spreadable"
        },
        iterator: {
          stable: true,
          path: "symbol/iterator"
        },
        keyFor: {
          stable: true,
          path: "symbol/key-for"
        },
        match: {
          stable: true,
          path: "symbol/match"
        },
        observable: {
          stable: false,
          path: "symbol/observable"
        },
        patternMatch: {
          stable: false,
          path: "symbol/pattern-match"
        },
        replace: {
          stable: true,
          path: "symbol/replace"
        },
        search: {
          stable: true,
          path: "symbol/search"
        },
        species: {
          stable: true,
          path: "symbol/species"
        },
        split: {
          stable: true,
          path: "symbol/split"
        },
        toPrimitive: {
          stable: true,
          path: "symbol/to-primitive"
        },
        toStringTag: {
          stable: true,
          path: "symbol/to-string-tag"
        },
        unscopables: {
          stable: true,
          path: "symbol/unscopables"
        }
      }
    },
    InstanceProperties: {
      at: {
        stable: false,
        path: "at"
      },
      bind: {
        stable: true,
        path: "bind"
      },
      codePointAt: {
        stable: true,
        path: "code-point-at"
      },
      codePoints: {
        stable: false,
        path: "code-points"
      },
      concat: {
        stable: true,
        path: "concat",
        types: ["array"]
      },
      copyWithin: {
        stable: true,
        path: "copy-within"
      },
      endsWith: {
        stable: true,
        path: "ends-with"
      },
      entries: {
        stable: true,
        path: "entries"
      },
      every: {
        stable: true,
        path: "every"
      },
      fill: {
        stable: true,
        path: "fill"
      },
      filter: {
        stable: true,
        path: "filter"
      },
      find: {
        stable: true,
        path: "find"
      },
      findIndex: {
        stable: true,
        path: "find-index"
      },
      flags: {
        stable: true,
        path: "flags"
      },
      flatMap: {
        stable: true,
        path: "flat-map"
      },
      flat: {
        stable: true,
        path: "flat"
      },
      forEach: {
        stable: true,
        path: "for-each"
      },
      includes: {
        stable: true,
        path: "includes"
      },
      indexOf: {
        stable: true,
        path: "index-of"
      },
      keys: {
        stable: true,
        path: "keys"
      },
      lastIndexOf: {
        stable: true,
        path: "last-index-of"
      },
      map: {
        stable: true,
        path: "map"
      },
      matchAll: {
        stable: false,
        path: "match-all"
      },
      padEnd: {
        stable: true,
        path: "pad-end"
      },
      padStart: {
        stable: true,
        path: "pad-start"
      },
      reduce: {
        stable: true,
        path: "reduce"
      },
      reduceRight: {
        stable: true,
        path: "reduce-right"
      },
      repeat: {
        stable: true,
        path: "repeat"
      },
      replaceAll: {
        stable: false,
        path: "replace-all"
      },
      reverse: {
        stable: true,
        path: "reverse"
      },
      slice: {
        stable: true,
        path: "slice"
      },
      some: {
        stable: true,
        path: "some"
      },
      sort: {
        stable: true,
        path: "sort"
      },
      splice: {
        stable: true,
        path: "splice"
      },
      startsWith: {
        stable: true,
        path: "starts-with"
      },
      trim: {
        stable: true,
        path: "trim"
      },
      trimEnd: {
        stable: true,
        path: "trim-end"
      },
      trimLeft: {
        stable: true,
        path: "trim-left"
      },
      trimRight: {
        stable: true,
        path: "trim-right"
      },
      trimStart: {
        stable: true,
        path: "trim-start"
      },
      values: {
        stable: true,
        path: "values"
      }
    }
  };
};

exports.default = _default;