'use strict';

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
const MOCK_CONSTRUCTOR_NAME = 'mockConstructor';
const FUNCTION_NAME_RESERVED_PATTERN = /[\s!-\/:-@\[-`{-~]/;
const FUNCTION_NAME_RESERVED_REPLACE = new RegExp(
  FUNCTION_NAME_RESERVED_PATTERN.source,
  'g'
);
const RESERVED_KEYWORDS = new Set([
  'arguments',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
]);

function matchArity(fn, length) {
  let mockConstructor;

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
      mockConstructor = function mockConstructor(
        _a,
        _b,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h
      ) {
        return fn.apply(this, arguments);
      };

      break;

    case 9:
      mockConstructor = function mockConstructor(
        _a,
        _b,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h,
        _i
      ) {
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
  const typeName = getObjectType(ref);

  if (
    typeName === 'Function' ||
    typeName === 'AsyncFunction' ||
    typeName === 'GeneratorFunction'
  ) {
    return 'function';
  } else if (Array.isArray(ref)) {
    return 'array';
  } else if (typeName === 'Object') {
    return 'object';
  } else if (
    typeName === 'Number' ||
    typeName === 'String' ||
    typeName === 'Boolean' ||
    typeName === 'Symbol'
  ) {
    return 'constant';
  } else if (
    typeName === 'Map' ||
    typeName === 'WeakMap' ||
    typeName === 'Set'
  ) {
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
  if (
    prop === 'arguments' ||
    prop === 'caller' ||
    prop === 'callee' ||
    prop === 'name' ||
    prop === 'length'
  ) {
    const typeName = getObjectType(object);
    return (
      typeName === 'Function' ||
      typeName === 'AsyncFunction' ||
      typeName === 'GeneratorFunction'
    );
  }

  if (
    prop === 'source' ||
    prop === 'global' ||
    prop === 'ignoreCase' ||
    prop === 'multiline'
  ) {
    return getObjectType(object) === 'RegExp';
  }

  return false;
}

class ModuleMockerClass {
  /**
   * @see README.md
   * @param global Global object of the test environment, used to create
   * mocks
   */
  constructor(global) {
    _defineProperty(this, '_environmentGlobal', void 0);

    _defineProperty(this, '_mockState', void 0);

    _defineProperty(this, '_mockConfigRegistry', void 0);

    _defineProperty(this, '_spyState', void 0);

    _defineProperty(this, '_invocationCallCounter', void 0);

    _defineProperty(this, 'ModuleMocker', void 0);

    this._environmentGlobal = global;
    this._mockState = new WeakMap();
    this._mockConfigRegistry = new WeakMap();
    this._spyState = new Set();
    this.ModuleMocker = ModuleMockerClass;
    this._invocationCallCounter = 1;
  }

  _getSlots(object) {
    if (!object) {
      return [];
    }

    const slots = new Set();
    const EnvObjectProto = this._environmentGlobal.Object.prototype;
    const EnvFunctionProto = this._environmentGlobal.Function.prototype;
    const EnvRegExpProto = this._environmentGlobal.RegExp.prototype; // Also check the builtins in the current context as they leak through
    // core node modules.

    const ObjectProto = Object.prototype;
    const FunctionProto = Function.prototype;
    const RegExpProto = RegExp.prototype; // Properties of Object.prototype, Function.prototype and RegExp.prototype
    // are never reported as slots

    while (
      object != null &&
      object !== EnvObjectProto &&
      object !== EnvFunctionProto &&
      object !== EnvRegExpProto &&
      object !== ObjectProto &&
      object !== FunctionProto &&
      object !== RegExpProto
    ) {
      const ownNames = Object.getOwnPropertyNames(object);

      for (let i = 0; i < ownNames.length; i++) {
        const prop = ownNames[i];

        if (!isReadonlyProp(object, prop)) {
          const propDesc = Object.getOwnPropertyDescriptor(object, prop); // @ts-ignore Object.__esModule

          if ((propDesc !== undefined && !propDesc.get) || object.__esModule) {
            slots.add(prop);
          }
        }
      }

      object = Object.getPrototypeOf(object);
    }

    return Array.from(slots);
  }

  _ensureMockConfig(f) {
    let config = this._mockConfigRegistry.get(f);

    if (!config) {
      config = this._defaultMockConfig();

      this._mockConfigRegistry.set(f, config);
    }

    return config;
  }

  _ensureMockState(f) {
    let state = this._mockState.get(f);

    if (!state) {
      state = this._defaultMockState();

      this._mockState.set(f, state);
    }

    return state;
  }

  _defaultMockConfig() {
    return {
      defaultReturnValue: undefined,
      isReturnValueLastSet: false,
      mockImpl: undefined,
      mockName: 'jest.fn()',
      specificMockImpls: [],
      specificReturnValues: []
    };
  }

  _defaultMockState() {
    return {
      calls: [],
      instances: [],
      invocationCallOrder: [],
      results: []
    };
  }

  _makeComponent(metadata, restore) {
    if (metadata.type === 'object') {
      return new this._environmentGlobal.Object();
    } else if (metadata.type === 'array') {
      return new this._environmentGlobal.Array();
    } else if (metadata.type === 'regexp') {
      return new this._environmentGlobal.RegExp('');
    } else if (
      metadata.type === 'constant' ||
      metadata.type === 'collection' ||
      metadata.type === 'null' ||
      metadata.type === 'undefined'
    ) {
      return metadata.value;
    } else if (metadata.type === 'function') {
      const prototype =
        (metadata.members &&
          metadata.members.prototype &&
          metadata.members.prototype.members) ||
        {};

      const prototypeSlots = this._getSlots(prototype);

      const mocker = this;
      const mockConstructor = matchArity(function(...args) {
        const mockState = mocker._ensureMockState(f);

        const mockConfig = mocker._ensureMockConfig(f);

        mockState.instances.push(this);
        mockState.calls.push(args); // Create and record an "incomplete" mock result immediately upon
        // calling rather than waiting for the mock to return. This avoids
        // issues caused by recursion where results can be recorded in the
        // wrong order.

        const mockResult = {
          type: 'incomplete',
          value: undefined
        };
        mockState.results.push(mockResult);
        mockState.invocationCallOrder.push(mocker._invocationCallCounter++); // Will be set to the return value of the mock if an error is not thrown

        let finalReturnValue; // Will be set to the error that is thrown by the mock (if it throws)

        let thrownError; // Will be set to true if the mock throws an error. The presence of a
        // value in `thrownError` is not a 100% reliable indicator because a
        // function could throw a value of undefined.

        let callDidThrowError = false;

        try {
          // The bulk of the implementation is wrapped in an immediately
          // executed arrow function so the return value of the mock function
          // can be easily captured and recorded, despite the many separate
          // return points within the logic.
          finalReturnValue = (() => {
            if (this instanceof f) {
              // This is probably being called as a constructor
              prototypeSlots.forEach(slot => {
                // Copy prototype methods to the instance to make
                // it easier to interact with mock instance call and
                // return values
                if (prototype[slot].type === 'function') {
                  // @ts-ignore no index signature
                  const protoImpl = this[slot]; // @ts-ignore no index signature

                  this[slot] = mocker.generateFromMetadata(prototype[slot]); // @ts-ignore no index signature

                  this[slot]._protoImpl = protoImpl;
                }
              }); // Run the mock constructor implementation

              const mockImpl = mockConfig.specificMockImpls.length
                ? mockConfig.specificMockImpls.shift()
                : mockConfig.mockImpl;
              return mockImpl && mockImpl.apply(this, arguments);
            }

            const returnValue = mockConfig.defaultReturnValue; // If return value is last set, either specific or default, i.e.
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

            let specificMockImpl;

            if (returnValue === undefined) {
              specificMockImpl = mockConfig.specificMockImpls.shift();

              if (specificMockImpl === undefined) {
                specificMockImpl = mockConfig.mockImpl;
              }

              if (specificMockImpl) {
                return specificMockImpl.apply(this, arguments);
              }
            } // Otherwise use prototype implementation

            if (returnValue === undefined && f._protoImpl) {
              return f._protoImpl.apply(this, arguments);
            }

            return returnValue;
          })();
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

      const f = this._createMockFunction(metadata, mockConstructor);

      f._isMockFunction = true;

      f.getMockImplementation = () => this._ensureMockConfig(f).mockImpl;

      if (typeof restore === 'function') {
        this._spyState.add(restore);
      }

      this._mockState.set(f, this._defaultMockState());

      this._mockConfigRegistry.set(f, this._defaultMockConfig());

      Object.defineProperty(f, 'mock', {
        configurable: false,
        enumerable: true,
        get: () => this._ensureMockState(f),
        set: val => this._mockState.set(f, val)
      });

      f.mockClear = () => {
        this._mockState.delete(f);

        return f;
      };

      f.mockReset = () => {
        f.mockClear();

        this._mockConfigRegistry.delete(f);

        return f;
      };

      f.mockRestore = () => {
        f.mockReset();
        return restore ? restore() : undefined;
      };

      f.mockReturnValueOnce = value => {
        // next function call will return this value or default return value
        const mockConfig = this._ensureMockConfig(f);

        mockConfig.specificReturnValues.push(value);
        return f;
      };

      f.mockResolvedValueOnce = value =>
        f.mockImplementationOnce(() => Promise.resolve(value));

      f.mockRejectedValueOnce = value =>
        f.mockImplementationOnce(() => Promise.reject(value));

      f.mockReturnValue = value => {
        // next function call will return specified return value or this one
        const mockConfig = this._ensureMockConfig(f);

        mockConfig.isReturnValueLastSet = true;
        mockConfig.defaultReturnValue = value;
        return f;
      };

      f.mockResolvedValue = value =>
        f.mockImplementation(() => Promise.resolve(value));

      f.mockRejectedValue = value =>
        f.mockImplementation(() => Promise.reject(value));

      f.mockImplementationOnce = fn => {
        // next function call will use this mock implementation return value
        // or default mock implementation return value
        const mockConfig = this._ensureMockConfig(f);

        mockConfig.isReturnValueLastSet = false;
        mockConfig.specificMockImpls.push(fn);
        return f;
      };

      f.mockImplementation = fn => {
        // next function call will use mock implementation return value
        const mockConfig = this._ensureMockConfig(f);

        mockConfig.isReturnValueLastSet = false;
        mockConfig.defaultReturnValue = undefined;
        mockConfig.mockImpl = fn;
        return f;
      };

      f.mockReturnThis = () =>
        f.mockImplementation(function() {
          return this;
        });

      f.mockName = name => {
        if (name) {
          const mockConfig = this._ensureMockConfig(f);

          mockConfig.mockName = name;
        }

        return f;
      };

      f.getMockName = () => {
        const mockConfig = this._ensureMockConfig(f);

        return mockConfig.mockName || 'jest.fn()';
      };

      if (metadata.mockImpl) {
        f.mockImplementation(metadata.mockImpl);
      }

      return f;
    } else {
      const unknownType = metadata.type || 'undefined type';
      throw new Error('Unrecognized type ' + unknownType);
    }
  }

  _createMockFunction(metadata, mockConstructor) {
    let name = metadata.name;

    if (!name) {
      return mockConstructor;
    } // Preserve `name` property of mocked function.

    const boundFunctionPrefix = 'bound ';
    let bindCall = ''; // if-do-while for perf reasons. The common case is for the if to fail.

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

    if (
      // It's a syntax error to define functions with a reserved keyword
      // as name.
      RESERVED_KEYWORDS.has(name) || // It's also a syntax error to define functions with a name that starts with a number
      /^\d/.test(name)
    ) {
      name = '$' + name;
    } // It's also a syntax error to define a function with a reserved character
    // as part of it's name.

    if (FUNCTION_NAME_RESERVED_PATTERN.test(name)) {
      name = name.replace(FUNCTION_NAME_RESERVED_REPLACE, '$');
    }

    const body =
      'return function ' +
      name +
      '() {' +
      'return ' +
      MOCK_CONSTRUCTOR_NAME +
      '.apply(this,arguments);' +
      '}' +
      bindCall;
    const createConstructor = new this._environmentGlobal.Function(
      MOCK_CONSTRUCTOR_NAME,
      body
    );
    return createConstructor(mockConstructor);
  }

  _generateMock(metadata, callbacks, refs) {
    // metadata not compatible but it's the same type, maybe problem with
    // overloading of _makeComponent and not _generateMock?
    // @ts-ignore
    const mock = this._makeComponent(metadata);

    if (metadata.refID != null) {
      refs[metadata.refID] = mock;
    }

    this._getSlots(metadata.members).forEach(slot => {
      const slotMetadata = (metadata.members && metadata.members[slot]) || {};

      if (slotMetadata.ref != null) {
        callbacks.push(
          (function(ref) {
            return () => (mock[slot] = refs[ref]);
          })(slotMetadata.ref)
        );
      } else {
        mock[slot] = this._generateMock(slotMetadata, callbacks, refs);
      }
    });

    if (
      metadata.type !== 'undefined' &&
      metadata.type !== 'null' &&
      mock.prototype &&
      typeof mock.prototype === 'object'
    ) {
      mock.prototype.constructor = mock;
    }

    return mock;
  }
  /**
   * @see README.md
   * @param _metadata Metadata for the mock in the schema returned by the
   * getMetadata method of this module.
   */

  generateFromMetadata(_metadata) {
    const callbacks = [];
    const refs = {};

    const mock = this._generateMock(_metadata, callbacks, refs);

    callbacks.forEach(setter => setter());
    return mock;
  }
  /**
   * @see README.md
   * @param component The component for which to retrieve metadata.
   */

  getMetadata(component, _refs) {
    const refs = _refs || new Map();
    const ref = refs.get(component);

    if (ref != null) {
      return {
        ref
      };
    }

    const type = getType(component);

    if (!type) {
      return null;
    }

    const metadata = {
      type
    };

    if (
      type === 'constant' ||
      type === 'collection' ||
      type === 'undefined' ||
      type === 'null'
    ) {
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
    let members = null; // Leave arrays alone

    if (type !== 'array') {
      this._getSlots(component).forEach(slot => {
        if (
          type === 'function' && // @ts-ignore may be a mock
          component._isMockFunction === true &&
          slot.match(/^mock/)
        ) {
          return;
        } // @ts-ignore no index signature

        const slotMetadata = this.getMetadata(component[slot], refs);

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

  isMockFunction(fn) {
    return !!fn && fn._isMockFunction === true;
  }

  fn(implementation) {
    const length = implementation ? implementation.length : 0;

    const fn = this._makeComponent({
      length,
      type: 'function'
    });

    if (implementation) {
      fn.mockImplementation(implementation);
    }

    return fn;
  }

  spyOn(object, methodName, accessType) {
    if (accessType) {
      return this._spyOnProperty(object, methodName, accessType);
    }

    if (typeof object !== 'object' && typeof object !== 'function') {
      throw new Error(
        'Cannot spyOn on a primitive value; ' + this._typeOf(object) + ' given'
      );
    }

    const original = object[methodName];

    if (!this.isMockFunction(original)) {
      if (typeof original !== 'function') {
        throw new Error(
          'Cannot spy the ' +
            methodName +
            ' property because it is not a function; ' +
            this._typeOf(original) +
            ' given instead'
        );
      }

      const isMethodOwner = object.hasOwnProperty(methodName); // @ts-ignore overriding original method with a Mock

      object[methodName] = this._makeComponent(
        {
          type: 'function'
        },
        () => {
          if (isMethodOwner) {
            object[methodName] = original;
          } else {
            delete object[methodName];
          }
        }
      ); // @ts-ignore original method is now a Mock

      object[methodName].mockImplementation(function() {
        return original.apply(this, arguments);
      });
    }

    return object[methodName];
  }

  _spyOnProperty(obj, propertyName, accessType = 'get') {
    if (typeof obj !== 'object' && typeof obj !== 'function') {
      throw new Error(
        'Cannot spyOn on a primitive value; ' + this._typeOf(obj) + ' given'
      );
    }

    if (!obj) {
      throw new Error(
        'spyOn could not find an object to spy upon for ' + propertyName + ''
      );
    }

    if (!propertyName) {
      throw new Error('No property name supplied');
    }

    let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
    let proto = Object.getPrototypeOf(obj);

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
      throw new Error(
        'Property ' + propertyName + ' does not have access type ' + accessType
      );
    }

    const original = descriptor[accessType];

    if (!this.isMockFunction(original)) {
      if (typeof original !== 'function') {
        throw new Error(
          'Cannot spy the ' +
            propertyName +
            ' property because it is not a function; ' +
            this._typeOf(original) +
            ' given instead'
        );
      } // @ts-ignore: mock is assignable

      descriptor[accessType] = this._makeComponent(
        {
          type: 'function'
        },
        () => {
          // @ts-ignore: mock is assignable
          descriptor[accessType] = original;
          Object.defineProperty(obj, propertyName, descriptor);
        }
      );
      descriptor[accessType].mockImplementation(function() {
        // @ts-ignore
        return original.apply(this, arguments);
      });
    }

    Object.defineProperty(obj, propertyName, descriptor);
    return descriptor[accessType];
  }

  clearAllMocks() {
    this._mockState = new WeakMap();
  }

  resetAllMocks() {
    this._mockConfigRegistry = new WeakMap();
    this._mockState = new WeakMap();
  }

  restoreAllMocks() {
    this._spyState.forEach(restore => restore());

    this._spyState = new Set();
  }

  _typeOf(value) {
    return value == null ? '' + value : typeof value;
  }
}
/* eslint-disable-next-line no-redeclare */

const JestMock = new ModuleMockerClass(global);
module.exports = JestMock;
