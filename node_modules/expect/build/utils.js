'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.emptyObject = emptyObject;
exports.isOneline = exports.isError = exports.partition = exports.sparseArrayEquality = exports.typeEquality = exports.subsetEquality = exports.iterableEquality = exports.getObjectSubset = exports.getPath = exports.hasOwnProperty = void 0;

var _jestGetType = require('jest-get-type');

var _jasmineUtils = require('./jasmineUtils');

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

// Return whether object instance inherits getter from its class.
const hasGetterFromConstructor = (object, key) => {
  const constructor = object.constructor;

  if (constructor === Object) {
    // A literal object has Object as constructor.
    // Therefore, it cannot inherit application-specific getters.
    // Furthermore, Object has __proto__ getter which is not relevant.
    // Array, Boolean, Number, String constructors don’t have any getters.
    return false;
  }

  if (typeof constructor !== 'function') {
    // Object.create(null) constructs object with no constructor nor prototype.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Custom_and_Null_objects
    return false;
  }

  const descriptor = Object.getOwnPropertyDescriptor(
    constructor.prototype,
    key
  );
  return descriptor !== undefined && typeof descriptor.get === 'function';
};

const hasOwnProperty = (object, key) =>
  Object.prototype.hasOwnProperty.call(object, key) ||
  hasGetterFromConstructor(object, key);

exports.hasOwnProperty = hasOwnProperty;

const getPath = (object, propertyPath) => {
  if (!Array.isArray(propertyPath)) {
    propertyPath = propertyPath.split('.');
  }

  if (propertyPath.length) {
    const lastProp = propertyPath.length === 1;
    const prop = propertyPath[0];
    const newObject = object[prop];

    if (!lastProp && (newObject === null || newObject === undefined)) {
      // This is not the last prop in the chain. If we keep recursing it will
      // hit a `can't access property X of undefined | null`. At this point we
      // know that the chain has broken and we can return right away.
      return {
        hasEndProp: false,
        lastTraversedObject: object,
        traversedPath: []
      };
    }

    const result = getPath(newObject, propertyPath.slice(1));

    if (result.lastTraversedObject === null) {
      result.lastTraversedObject = object;
    }

    result.traversedPath.unshift(prop);

    if (lastProp) {
      // Does object have the property with an undefined value?
      // Although primitive values support bracket notation (above)
      // they would throw TypeError for in operator (below).
      result.hasEndProp =
        newObject !== undefined ||
        (!(0, _jestGetType.isPrimitive)(object) && prop in object);

      if (!result.hasEndProp) {
        result.traversedPath.shift();
      }
    }

    return result;
  }

  return {
    lastTraversedObject: null,
    traversedPath: [],
    value: object
  };
}; // Strip properties from object that are not present in the subset. Useful for
// printing the diff for toMatchObject() without adding unrelated noise.

exports.getPath = getPath;

const getObjectSubset = (object, subset, seenReferences = new WeakMap()) => {
  if (Array.isArray(object)) {
    if (Array.isArray(subset) && subset.length === object.length) {
      return subset.map((sub, i) => getObjectSubset(object[i], sub));
    }
  } else if (object instanceof Date) {
    return object;
  } else if (isObject(object) && isObject(subset)) {
    const trimmed = {};
    seenReferences.set(object, trimmed);
    Object.keys(object)
      .filter(key => hasOwnProperty(subset, key))
      .forEach(key => {
        trimmed[key] = seenReferences.has(object[key])
          ? seenReferences.get(object[key])
          : getObjectSubset(object[key], subset[key], seenReferences);
      });

    if (Object.keys(trimmed).length > 0) {
      return trimmed;
    }
  }

  return object;
};

exports.getObjectSubset = getObjectSubset;
const IteratorSymbol = Symbol.iterator;

const hasIterator = object => !!(object != null && object[IteratorSymbol]);

const iterableEquality = (a, b, aStack = [], bStack = []) => {
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    Array.isArray(a) ||
    Array.isArray(b) ||
    !hasIterator(a) ||
    !hasIterator(b)
  ) {
    return undefined;
  }

  if (a.constructor !== b.constructor) {
    return false;
  }

  let length = aStack.length;

  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    // circular references at same depth are equal
    // circular reference is not equal to non-circular one
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }

  aStack.push(a);
  bStack.push(b);

  const iterableEqualityWithStack = (a, b) =>
    iterableEquality(a, b, [...aStack], [...bStack]);

  if (a.size !== undefined) {
    if (a.size !== b.size) {
      return false;
    } else if (
      (0, _jasmineUtils.isA)('Set', a) ||
      (0, _jasmineUtils.isImmutableUnorderedSet)(a)
    ) {
      let allFound = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = a[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          const aValue = _step.value;

          if (!b.has(aValue)) {
            let has = false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (
                var _iterator2 = b[Symbol.iterator](), _step2;
                !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                  .done);
                _iteratorNormalCompletion2 = true
              ) {
                const bValue = _step2.value;
                const isEqual = (0, _jasmineUtils.equals)(aValue, bValue, [
                  iterableEqualityWithStack
                ]);

                if (isEqual === true) {
                  has = true;
                }
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

            if (has === false) {
              allFound = false;
              break;
            }
          }
        } // Remove the first value from the stack of traversed values.
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

      aStack.pop();
      bStack.pop();
      return allFound;
    } else if (
      (0, _jasmineUtils.isA)('Map', a) ||
      (0, _jasmineUtils.isImmutableUnorderedKeyed)(a)
    ) {
      let allFound = true;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (
          var _iterator3 = a[Symbol.iterator](), _step3;
          !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
          _iteratorNormalCompletion3 = true
        ) {
          const aEntry = _step3.value;

          if (
            !b.has(aEntry[0]) ||
            !(0, _jasmineUtils.equals)(aEntry[1], b.get(aEntry[0]), [
              iterableEqualityWithStack
            ])
          ) {
            let has = false;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (
                var _iterator4 = b[Symbol.iterator](), _step4;
                !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next())
                  .done);
                _iteratorNormalCompletion4 = true
              ) {
                const bEntry = _step4.value;
                const matchedKey = (0, _jasmineUtils.equals)(
                  aEntry[0],
                  bEntry[0],
                  [iterableEqualityWithStack]
                );
                let matchedValue = false;

                if (matchedKey === true) {
                  matchedValue = (0, _jasmineUtils.equals)(
                    aEntry[1],
                    bEntry[1],
                    [iterableEqualityWithStack]
                  );
                }

                if (matchedValue === true) {
                  has = true;
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }

            if (has === false) {
              allFound = false;
              break;
            }
          }
        } // Remove the first value from the stack of traversed values.
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      aStack.pop();
      bStack.pop();
      return allFound;
    }
  }

  const bIterator = b[IteratorSymbol]();
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (
      var _iterator5 = a[Symbol.iterator](), _step5;
      !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
      _iteratorNormalCompletion5 = true
    ) {
      const aValue = _step5.value;
      const nextB = bIterator.next();

      if (
        nextB.done ||
        !(0, _jasmineUtils.equals)(aValue, nextB.value, [
          iterableEqualityWithStack
        ])
      ) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  if (!bIterator.next().done) {
    return false;
  } // Remove the first value from the stack of traversed values.

  aStack.pop();
  bStack.pop();
  return true;
};

exports.iterableEquality = iterableEquality;

const isObject = a => a !== null && typeof a === 'object';

const isObjectWithKeys = a =>
  isObject(a) &&
  !(a instanceof Error) &&
  !(a instanceof Array) &&
  !(a instanceof Date);

const subsetEquality = (object, subset) => {
  // subsetEquality needs to keep track of the references
  // it has already visited to avoid infinite loops in case
  // there are circular references in the subset passed to it.
  const subsetEqualityWithContext = (seenReferences = new WeakMap()) => (
    object,
    subset
  ) => {
    if (!isObjectWithKeys(subset)) {
      return undefined;
    }

    return Object.keys(subset).every(key => {
      if (isObjectWithKeys(subset[key])) {
        if (seenReferences.get(subset[key])) {
          return (0, _jasmineUtils.equals)(object[key], subset[key], [
            iterableEquality
          ]);
        }

        seenReferences.set(subset[key], true);
      }

      return (
        object != null &&
        hasOwnProperty(object, key) &&
        (0, _jasmineUtils.equals)(object[key], subset[key], [
          iterableEquality,
          subsetEqualityWithContext(seenReferences)
        ])
      );
    });
  };

  return subsetEqualityWithContext()(object, subset);
};

exports.subsetEquality = subsetEquality;

const typeEquality = (a, b) => {
  if (a == null || b == null || a.constructor === b.constructor) {
    return undefined;
  }

  return false;
};

exports.typeEquality = typeEquality;

const sparseArrayEquality = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return undefined;
  } // A sparse array [, , 1] will have keys ["2"] whereas [undefined, undefined, 1] will have keys ["0", "1", "2"]

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  return (
    (0, _jasmineUtils.equals)(a, b, [iterableEquality, typeEquality], true) &&
    (0, _jasmineUtils.equals)(aKeys, bKeys)
  );
};

exports.sparseArrayEquality = sparseArrayEquality;

const partition = (items, predicate) => {
  const result = [[], []];
  items.forEach(item => result[predicate(item) ? 0 : 1].push(item));
  return result;
}; // Copied from https://github.com/graingert/angular.js/blob/a43574052e9775cbc1d7dd8a086752c979b0f020/src/Angular.js#L685-L693

exports.partition = partition;

const isError = value => {
  switch (Object.prototype.toString.call(value)) {
    case '[object Error]':
      return true;

    case '[object Exception]':
      return true;

    case '[object DOMException]':
      return true;

    default:
      return value instanceof Error;
  }
};

exports.isError = isError;

function emptyObject(obj) {
  return obj && typeof obj === 'object' ? !Object.keys(obj).length : false;
}

const MULTILINE_REGEXP = /[\r\n]/;

const isOneline = (expected, received) =>
  typeof expected === 'string' &&
  typeof received === 'string' &&
  (!MULTILINE_REGEXP.test(expected) || !MULTILINE_REGEXP.test(received));

exports.isOneline = isOneline;
