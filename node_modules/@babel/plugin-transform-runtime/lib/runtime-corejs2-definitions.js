"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

var _default = runtimeVersion => {
  const includeMathModule = (0, _helpers.hasMinVersion)("7.0.1", runtimeVersion);
  return {
    BuiltIns: {
      Symbol: {
        stable: true,
        path: "symbol"
      },
      Promise: {
        stable: true,
        path: "promise"
      },
      Map: {
        stable: true,
        path: "map"
      },
      WeakMap: {
        stable: true,
        path: "weak-map"
      },
      Set: {
        stable: true,
        path: "set"
      },
      WeakSet: {
        stable: true,
        path: "weak-set"
      },
      setImmediate: {
        stable: true,
        path: "set-immediate"
      },
      clearImmediate: {
        stable: true,
        path: "clear-immediate"
      },
      parseFloat: {
        stable: true,
        path: "parse-float"
      },
      parseInt: {
        stable: true,
        path: "parse-int"
      }
    },
    StaticProperties: Object.assign({
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
      JSON: {
        stringify: {
          stable: true,
          path: "json/stringify"
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
      }
    }, includeMathModule ? {
      Math: {
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
        clz32: {
          stable: true,
          path: "math/clz32"
        },
        cosh: {
          stable: true,
          path: "math/cosh"
        },
        expm1: {
          stable: true,
          path: "math/expm1"
        },
        fround: {
          stable: true,
          path: "math/fround"
        },
        hypot: {
          stable: true,
          path: "math/hypot"
        },
        imul: {
          stable: true,
          path: "math/imul"
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
        sign: {
          stable: true,
          path: "math/sign"
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
        }
      }
    } : {}, {
      Symbol: {
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
      },
      String: {
        at: {
          stable: true,
          path: "string/at"
        },
        fromCodePoint: {
          stable: true,
          path: "string/from-code-point"
        },
        raw: {
          stable: true,
          path: "string/raw"
        }
      },
      Number: {
        EPSILON: {
          stable: true,
          path: "number/epsilon"
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
        MAX_SAFE_INTEGER: {
          stable: true,
          path: "number/max-safe-integer"
        },
        MIN_SAFE_INTEGER: {
          stable: true,
          path: "number/min-safe-integer"
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
      Reflect: {
        apply: {
          stable: true,
          path: "reflect/apply"
        },
        construct: {
          stable: true,
          path: "reflect/construct"
        },
        defineProperty: {
          stable: true,
          path: "reflect/define-property"
        },
        deleteProperty: {
          stable: true,
          path: "reflect/delete-property"
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
        isExtensible: {
          stable: true,
          path: "reflect/is-extensible"
        },
        ownKeys: {
          stable: true,
          path: "reflect/own-keys"
        },
        preventExtensions: {
          stable: true,
          path: "reflect/prevent-extensions"
        },
        setPrototypeOf: {
          stable: true,
          path: "reflect/set-prototype-of"
        },
        set: {
          stable: true,
          path: "reflect/set"
        }
      },
      Date: {
        now: {
          stable: true,
          path: "date/now"
        }
      }
    })
  };
};

exports.default = _default;