(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jestMock"] = factory();
	else
		root["jestMock"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/jest-mock/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./packages/jest-mock/src/index.ts":
/*!*****************************************!*\
  !*** ./packages/jest-mock/src/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Possible types of a MockFunctionResult.
 * 'return': The call completed by returning normally.
 * 'throw': The call completed by throwing a value.
 * 'incomplete': The call has not completed yet. This is possible if you read
 *               the  mock function result from within the mock function itself
 *               (or a function called by the mock function).
 */

/**
 * Represents the result of a single call to a mock function.
 */
// see https://github.com/Microsoft/TypeScript/issues/25215
var MOCK_CONSTRUCTOR_NAME = 'mockConstructor';
var FUNCTION_NAME_RESERVED_PATTERN = /[\s!-\/:-@\[-`{-~]/;
var FUNCTION_NAME_RESERVED_REPLACE = new RegExp(FUNCTION_NAME_RESERVED_PATTERN.source, 'g');
var RESERVED_KEYWORDS = new Set(['arguments', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface', 'let', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'static', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']);

function matchArity(fn, length) {
  var mockConstructor;

  switch (length) {
    case 1:
      mockConstructor = function mockConstructor(_a) {
        return fn.apply(this, arguments);
      };

      break;

    case 2:
      mockConstructor = function mockConstructor(_a, _b) {
        return fn.apply(this, arguments);
      };

      break;

    case 3:
      mockConstructor = function mockConstructor(_a, _b, _c) {
        return fn.apply(this, arguments);
      };

      break;

    case 4:
      mockConstructor = function mockConstructor(_a, _b, _c, _d) {
        return fn.apply(this, arguments);
      };

      break;

    case 5:
      mockConstructor = function mockConstructor(_a, _b, _c, _d, _e) {
        return fn.apply(this, arguments);
      };

      break;

    case 6:
      mockConstructor = function mockConstructor(_a, _b, _c, _d, _e, _f) {
        return fn.apply(this, arguments);
      };

      break;

    case 7:
      mockConstructor = function mockConstructor(_a, _b, _c, _d, _e, _f, _g) {
        return fn.apply(this, arguments);
      };

      break;

    case 8:
      mockConstructor = function mockConstructor(_a, _b, _c, _d, _e, _f, _g, _h) {
        return fn.apply(this, arguments);
      };

      break;

    case 9:
      mockConstructor = function mockConstructor(_a, _b, _c, _d, _e, _f, _g, _h, _i) {
        return fn.apply(this, arguments);
      };

      break;

    default:
      mockConstructor = function mockConstructor() {
        return fn.apply(this, arguments);
      };

      break;
  }

  return mockConstructor;
}

function getObjectType(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}

function getType(ref) {
  var typeName = getObjectType(ref);

  if (typeName === 'Function' || typeName === 'AsyncFunction' || typeName === 'GeneratorFunction') {
    return 'function';
  } else if (Array.isArray(ref)) {
    return 'array';
  } else if (typeName === 'Object') {
    return 'object';
  } else if (typeName === 'Number' || typeName === 'String' || typeName === 'Boolean' || typeName === 'Symbol') {
    return 'constant';
  } else if (typeName === 'Map' || typeName === 'WeakMap' || typeName === 'Set') {
    return 'collection';
  } else if (typeName === 'RegExp') {
    return 'regexp';
  } else if (ref === undefined) {
    return 'undefined';
  } else if (ref === null) {
    return 'null';
  } else {
    return null;
  }
}

function isReadonlyProp(object, prop) {
  if (prop === 'arguments' || prop === 'caller' || prop === 'callee' || prop === 'name' || prop === 'length') {
    var typeName = getObjectType(object);
    return typeName === 'Function' || typeName === 'AsyncFunction' || typeName === 'GeneratorFunction';
  }

  if (prop === 'source' || prop === 'global' || prop === 'ignoreCase' || prop === 'multiline') {
    return getObjectType(object) === 'RegExp';
  }

  return false;
}

var ModuleMockerClass =
/*#__PURE__*/
function () {
  /**
   * @see README.md
   * @param global Global object of the test environment, used to create
   * mocks
   */
  function ModuleMockerClass(global) {
    _classCallCheck(this, ModuleMockerClass);

    this._environmentGlobal = global;
    this._mockState = new WeakMap();
    this._mockConfigRegistry = new WeakMap();
    this._spyState = new Set();
    this.ModuleMocker = ModuleMockerClass;
    this._invocationCallCounter = 1;
  }

  _createClass(ModuleMockerClass, [{
    key: "_getSlots",
    value: function _getSlots(object) {
      if (!object) {
        return [];
      }

      var slots = new Set();
      var EnvObjectProto = this._environmentGlobal.Object.prototype;
      var EnvFunctionProto = this._environmentGlobal.Function.prototype;
      var EnvRegExpProto = this._environmentGlobal.RegExp.prototype; // Also check the builtins in the current context as they leak through
      // core node modules.

      var ObjectProto = Object.prototype;
      var FunctionProto = Function.prototype;
      var RegExpProto = RegExp.prototype; // Properties of Object.prototype, Function.prototype and RegExp.prototype
      // are never reported as slots

      while (object != null && object !== EnvObjectProto && object !== EnvFunctionProto && object !== EnvRegExpProto && object !== ObjectProto && object !== FunctionProto && object !== RegExpProto) {
        var ownNames = Object.getOwnPropertyNames(object);

        for (var i = 0; i < ownNames.length; i++) {
          var prop = ownNames[i];

          if (!isReadonlyProp(object, prop)) {
            var propDesc = Object.getOwnPropertyDescriptor(object, prop); // @ts-ignore Object.__esModule

            if (propDesc !== undefined && !propDesc.get || object.__esModule) {
              slots.add(prop);
            }
          }
        }

        object = Object.getPrototypeOf(object);
      }

      return Array.from(slots);
    }
  }, {
    key: "_ensureMockConfig",
    value: function _ensureMockConfig(f) {
      var config = this._mockConfigRegistry.get(f);

      if (!config) {
        config = this._defaultMockConfig();

        this._mockConfigRegistry.set(f, config);
      }

      return config;
    }
  }, {
    key: "_ensureMockState",
    value: function _ensureMockState(f) {
      var state = this._mockState.get(f);

      if (!state) {
        state = this._defaultMockState();

        this._mockState.set(f, state);
      }

      return state;
    }
  }, {
    key: "_defaultMockConfig",
    value: function _defaultMockConfig() {
      return {
        defaultReturnValue: undefined,
        isReturnValueLastSet: false,
        mockImpl: undefined,
        mockName: 'jest.fn()',
        specificMockImpls: [],
        specificReturnValues: []
      };
    }
  }, {
    key: "_defaultMockState",
    value: function _defaultMockState() {
      return {
        calls: [],
        instances: [],
        invocationCallOrder: [],
        results: []
      };
    }
  }, {
    key: "_makeComponent",
    value: function _makeComponent(metadata, restore) {
      var _this2 = this;

      if (metadata.type === 'object') {
        return new this._environmentGlobal.Object();
      } else if (metadata.type === 'array') {
        return new this._environmentGlobal.Array();
      } else if (metadata.type === 'regexp') {
        return new this._environmentGlobal.RegExp('');
      } else if (metadata.type === 'constant' || metadata.type === 'collection' || metadata.type === 'null' || metadata.type === 'undefined') {
        return metadata.value;
      } else if (metadata.type === 'function') {
        var prototype = metadata.members && metadata.members.prototype && metadata.members.prototype.members || {};

        var prototypeSlots = this._getSlots(prototype);

        var mocker = this;
        var mockConstructor = matchArity(function () {
          var _this = this,
              _arguments = arguments;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var mockState = mocker._ensureMockState(f);

          var mockConfig = mocker._ensureMockConfig(f);

          mockState.instances.push(this);
          mockState.calls.push(args); // Create and record an "incomplete" mock result immediately upon
          // calling rather than waiting for the mock to return. This avoids
          // issues caused by recursion where results can be recorded in the
          // wrong order.

          var mockResult = {
            type: 'incomplete',
            value: undefined
          };
          mockState.results.push(mockResult);
          mockState.invocationCallOrder.push(mocker._invocationCallCounter++); // Will be set to the return value of the mock if an error is not thrown

          var finalReturnValue; // Will be set to the error that is thrown by the mock (if it throws)

          var thrownError; // Will be set to true if the mock throws an error. The presence of a
          // value in `thrownError` is not a 100% reliable indicator because a
          // function could throw a value of undefined.

          var callDidThrowError = false;

          try {
            // The bulk of the implementation is wrapped in an immediately
            // executed arrow function so the return value of the mock function
            // can be easily captured and recorded, despite the many separate
            // return points within the logic.
            finalReturnValue = function () {
              if (_this instanceof f) {
                // This is probably being called as a constructor
                prototypeSlots.forEach(function (slot) {
                  // Copy prototype methods to the instance to make
                  // it easier to interact with mock instance call and
                  // return values
                  if (prototype[slot].type === 'function') {
                    // @ts-ignore no index signature
                    var protoImpl = _this[slot]; // @ts-ignore no index signature

                    _this[slot] = mocker.generateFromMetadata(prototype[slot]); // @ts-ignore no index signature

                    _this[slot]._protoImpl = protoImpl;
                  }
                }); // Run the mock constructor implementation

                var _mockImpl = mockConfig.specificMockImpls.length ? mockConfig.specificMockImpls.shift() : mockConfig.mockImpl;

                return _mockImpl && _mockImpl.apply(_this, _arguments);
              }

              var returnValue = mockConfig.defaultReturnValue; // If return value is last set, either specific or default, i.e.
              // mockReturnValueOnce()/mockReturnValue() is called and no
              // mockImplementationOnce()/mockImplementation() is called after
              // that.
              // use the set return value.

              if (mockConfig.specificReturnValues.length) {
                return mockConfig.specificReturnValues.shift();
              }

              if (mockConfig.isReturnValueLastSet) {
                return mockConfig.defaultReturnValue;
              } // If mockImplementationOnce()/mockImplementation() is last set,
              // or specific return values are used up, use the mock
              // implementation.


              var specificMockImpl;

              if (returnValue === undefined) {
                specificMockImpl = mockConfig.specificMockImpls.shift();

                if (specificMockImpl === undefined) {
                  specificMockImpl = mockConfig.mockImpl;
                }

                if (specificMockImpl) {
                  return specificMockImpl.apply(_this, _arguments);
                }
              } // Otherwise use prototype implementation


              if (returnValue === undefined && f._protoImpl) {
                return f._protoImpl.apply(_this, _arguments);
              }

              return returnValue;
            }();
          } catch (error) {
            // Store the thrown error so we can record it, then re-throw it.
            thrownError = error;
            callDidThrowError = true;
            throw error;
          } finally {
            // Record the result of the function.
            // NOTE: Intentionally NOT pushing/indexing into the array of mock
            //       results here to avoid corrupting results data if mockClear()
            //       is called during the execution of the mock.
            mockResult.type = callDidThrowError ? 'throw' : 'return';
            mockResult.value = callDidThrowError ? thrownError : finalReturnValue;
          }

          return finalReturnValue;
        }, metadata.length || 0);

        var f = this._createMockFunction(metadata, mockConstructor);

        f._isMockFunction = true;

        f.getMockImplementation = function () {
          return _this2._ensureMockConfig(f).mockImpl;
        };

        if (typeof restore === 'function') {
          this._spyState.add(restore);
        }

        this._mockState.set(f, this._defaultMockState());

        this._mockConfigRegistry.set(f, this._defaultMockConfig());

        Object.defineProperty(f, 'mock', {
          configurable: false,
          enumerable: true,
          get: function get() {
            return _this2._ensureMockState(f);
          },
          set: function set(val) {
            return _this2._mockState.set(f, val);
          }
        });

        f.mockClear = function () {
          _this2._mockState.delete(f);

          return f;
        };

        f.mockReset = function () {
          f.mockClear();

          _this2._mockConfigRegistry.delete(f);

          return f;
        };

        f.mockRestore = function () {
          f.mockReset();
          return restore ? restore() : undefined;
        };

        f.mockReturnValueOnce = function (value) {
          // next function call will return this value or default return value
          var mockConfig = _this2._ensureMockConfig(f);

          mockConfig.specificReturnValues.push(value);
          return f;
        };

        f.mockResolvedValueOnce = function (value) {
          return f.mockImplementationOnce(function () {
            return Promise.resolve(value);
          });
        };

        f.mockRejectedValueOnce = function (value) {
          return f.mockImplementationOnce(function () {
            return Promise.reject(value);
          });
        };

        f.mockReturnValue = function (value) {
          // next function call will return specified return value or this one
          var mockConfig = _this2._ensureMockConfig(f);

          mockConfig.isReturnValueLastSet = true;
          mockConfig.defaultReturnValue = value;
          return f;
        };

        f.mockResolvedValue = function (value) {
          return f.mockImplementation(function () {
            return Promise.resolve(value);
          });
        };

        f.mockRejectedValue = function (value) {
          return f.mockImplementation(function () {
            return Promise.reject(value);
          });
        };

        f.mockImplementationOnce = function (fn) {
          // next function call will use this mock implementation return value
          // or default mock implementation return value
          var mockConfig = _this2._ensureMockConfig(f);

          mockConfig.isReturnValueLastSet = false;
          mockConfig.specificMockImpls.push(fn);
          return f;
        };

        f.mockImplementation = function (fn) {
          // next function call will use mock implementation return value
          var mockConfig = _this2._ensureMockConfig(f);

          mockConfig.isReturnValueLastSet = false;
          mockConfig.defaultReturnValue = undefined;
          mockConfig.mockImpl = fn;
          return f;
        };

        f.mockReturnThis = function () {
          return f.mockImplementation(function () {
            return this;
          });
        };

        f.mockName = function (name) {
          if (name) {
            var mockConfig = _this2._ensureMockConfig(f);

            mockConfig.mockName = name;
          }

          return f;
        };

        f.getMockName = function () {
          var mockConfig = _this2._ensureMockConfig(f);

          return mockConfig.mockName || 'jest.fn()';
        };

        if (metadata.mockImpl) {
          f.mockImplementation(metadata.mockImpl);
        }

        return f;
      } else {
        var unknownType = metadata.type || 'undefined type';
        throw new Error('Unrecognized type ' + unknownType);
      }
    }
  }, {
    key: "_createMockFunction",
    value: function _createMockFunction(metadata, mockConstructor) {
      var name = metadata.name;

      if (!name) {
        return mockConstructor;
      } // Preserve `name` property of mocked function.


      var boundFunctionPrefix = 'bound ';
      var bindCall = ''; // if-do-while for perf reasons. The common case is for the if to fail.

      if (name && name.startsWith(boundFunctionPrefix)) {
        do {
          name = name.substring(boundFunctionPrefix.length); // Call bind() just to alter the function name.

          bindCall = '.bind(null)';
        } while (name && name.startsWith(boundFunctionPrefix));
      } // Special case functions named `mockConstructor` to guard for infinite
      // loops.


      if (name === MOCK_CONSTRUCTOR_NAME) {
        return mockConstructor;
      }

      if ( // It's a syntax error to define functions with a reserved keyword
      // as name.
      RESERVED_KEYWORDS.has(name) || // It's also a syntax error to define functions with a name that starts with a number
      /^\d/.test(name)) {
        name = '$' + name;
      } // It's also a syntax error to define a function with a reserved character
      // as part of it's name.


      if (FUNCTION_NAME_RESERVED_PATTERN.test(name)) {
        name = name.replace(FUNCTION_NAME_RESERVED_REPLACE, '$');
      }

      var body = 'return function ' + name + '() {' + 'return ' + MOCK_CONSTRUCTOR_NAME + '.apply(this,arguments);' + '}' + bindCall;
      var createConstructor = new this._environmentGlobal.Function(MOCK_CONSTRUCTOR_NAME, body);
      return createConstructor(mockConstructor);
    }
  }, {
    key: "_generateMock",
    value: function _generateMock(metadata, callbacks, refs) {
      var _this3 = this;

      // metadata not compatible but it's the same type, maybe problem with
      // overloading of _makeComponent and not _generateMock?
      // @ts-ignore
      var mock = this._makeComponent(metadata);

      if (metadata.refID != null) {
        refs[metadata.refID] = mock;
      }

      this._getSlots(metadata.members).forEach(function (slot) {
        var slotMetadata = metadata.members && metadata.members[slot] || {};

        if (slotMetadata.ref != null) {
          callbacks.push(function (ref) {
            return function () {
              return mock[slot] = refs[ref];
            };
          }(slotMetadata.ref));
        } else {
          mock[slot] = _this3._generateMock(slotMetadata, callbacks, refs);
        }
      });

      if (metadata.type !== 'undefined' && metadata.type !== 'null' && mock.prototype && _typeof(mock.prototype) === 'object') {
        mock.prototype.constructor = mock;
      }

      return mock;
    }
    /**
     * @see README.md
     * @param _metadata Metadata for the mock in the schema returned by the
     * getMetadata method of this module.
     */

  }, {
    key: "generateFromMetadata",
    value: function generateFromMetadata(_metadata) {
      var callbacks = [];
      var refs = {};

      var mock = this._generateMock(_metadata, callbacks, refs);

      callbacks.forEach(function (setter) {
        return setter();
      });
      return mock;
    }
    /**
     * @see README.md
     * @param component The component for which to retrieve metadata.
     */

  }, {
    key: "getMetadata",
    value: function getMetadata(component, _refs) {
      var _this4 = this;

      var refs = _refs || new Map();
      var ref = refs.get(component);

      if (ref != null) {
        return {
          ref: ref
        };
      }

      var type = getType(component);

      if (!type) {
        return null;
      }

      var metadata = {
        type: type
      };

      if (type === 'constant' || type === 'collection' || type === 'undefined' || type === 'null') {
        metadata.value = component;
        return metadata;
      } else if (type === 'function') {
        // @ts-ignore this is a function so it has a name
        metadata.name = component.name; // @ts-ignore may be a mock

        if (component._isMockFunction === true) {
          // @ts-ignore may be a mock
          metadata.mockImpl = component.getMockImplementation();
        }
      }

      metadata.refID = refs.size;
      refs.set(component, metadata.refID);
      var members = null; // Leave arrays alone

      if (type !== 'array') {
        this._getSlots(component).forEach(function (slot) {
          if (type === 'function' && // @ts-ignore may be a mock
          component._isMockFunction === true && slot.match(/^mock/)) {
            return;
          } // @ts-ignore no index signature


          var slotMetadata = _this4.getMetadata(component[slot], refs);

          if (slotMetadata) {
            if (!members) {
              members = {};
            }

            members[slot] = slotMetadata;
          }
        });
      }

      if (members) {
        metadata.members = members;
      }

      return metadata;
    }
  }, {
    key: "isMockFunction",
    value: function isMockFunction(fn) {
      return !!fn && fn._isMockFunction === true;
    }
  }, {
    key: "fn",
    value: function fn(implementation) {
      var length = implementation ? implementation.length : 0;

      var fn = this._makeComponent({
        length: length,
        type: 'function'
      });

      if (implementation) {
        fn.mockImplementation(implementation);
      }

      return fn;
    }
  }, {
    key: "spyOn",
    value: function spyOn(object, methodName, accessType) {
      if (accessType) {
        return this._spyOnProperty(object, methodName, accessType);
      }

      if (_typeof(object) !== 'object' && typeof object !== 'function') {
        throw new Error('Cannot spyOn on a primitive value; ' + this._typeOf(object) + ' given');
      }

      var original = object[methodName];

      if (!this.isMockFunction(original)) {
        if (typeof original !== 'function') {
          throw new Error('Cannot spy the ' + methodName + ' property because it is not a function; ' + this._typeOf(original) + ' given instead');
        }

        var isMethodOwner = object.hasOwnProperty(methodName); // @ts-ignore overriding original method with a Mock

        object[methodName] = this._makeComponent({
          type: 'function'
        }, function () {
          if (isMethodOwner) {
            object[methodName] = original;
          } else {
            delete object[methodName];
          }
        }); // @ts-ignore original method is now a Mock

        object[methodName].mockImplementation(function () {
          return original.apply(this, arguments);
        });
      }

      return object[methodName];
    }
  }, {
    key: "_spyOnProperty",
    value: function _spyOnProperty(obj, propertyName) {
      var accessType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';

      if (_typeof(obj) !== 'object' && typeof obj !== 'function') {
        throw new Error('Cannot spyOn on a primitive value; ' + this._typeOf(obj) + ' given');
      }

      if (!obj) {
        throw new Error('spyOn could not find an object to spy upon for ' + propertyName + '');
      }

      if (!propertyName) {
        throw new Error('No property name supplied');
      }

      var descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
      var proto = Object.getPrototypeOf(obj);

      while (!descriptor && proto !== null) {
        descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);
        proto = Object.getPrototypeOf(proto);
      }

      if (!descriptor) {
        throw new Error(propertyName + ' property does not exist');
      }

      if (!descriptor.configurable) {
        throw new Error(propertyName + ' is not declared configurable');
      }

      if (!descriptor[accessType]) {
        throw new Error('Property ' + propertyName + ' does not have access type ' + accessType);
      }

      var original = descriptor[accessType];

      if (!this.isMockFunction(original)) {
        if (typeof original !== 'function') {
          throw new Error('Cannot spy the ' + propertyName + ' property because it is not a function; ' + this._typeOf(original) + ' given instead');
        } // @ts-ignore: mock is assignable


        descriptor[accessType] = this._makeComponent({
          type: 'function'
        }, function () {
          // @ts-ignore: mock is assignable
          descriptor[accessType] = original;
          Object.defineProperty(obj, propertyName, descriptor);
        });
        descriptor[accessType].mockImplementation(function () {
          // @ts-ignore
          return original.apply(this, arguments);
        });
      }

      Object.defineProperty(obj, propertyName, descriptor);
      return descriptor[accessType];
    }
  }, {
    key: "clearAllMocks",
    value: function clearAllMocks() {
      this._mockState = new WeakMap();
    }
  }, {
    key: "resetAllMocks",
    value: function resetAllMocks() {
      this._mockConfigRegistry = new WeakMap();
      this._mockState = new WeakMap();
    }
  }, {
    key: "restoreAllMocks",
    value: function restoreAllMocks() {
      this._spyState.forEach(function (restore) {
        return restore();
      });

      this._spyState = new Set();
    }
  }, {
    key: "_typeOf",
    value: function _typeOf(value) {
      return value == null ? '' + value : _typeof(value);
    }
  }]);

  return ModuleMockerClass;
}();
/* eslint-disable-next-line no-redeclare */


var JestMock = new ModuleMockerClass(global);
module.exports = JestMock;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map