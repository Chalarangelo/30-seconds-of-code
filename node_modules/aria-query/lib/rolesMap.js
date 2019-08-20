'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ariaAbstractRoles = require('./etc/roles/ariaAbstractRoles');

var _ariaAbstractRoles2 = _interopRequireDefault(_ariaAbstractRoles);

var _ariaLiteralRoles = require('./etc/roles/ariaLiteralRoles');

var _ariaLiteralRoles2 = _interopRequireDefault(_ariaLiteralRoles);

var _ariaDpubRoles = require('./etc/roles/ariaDpubRoles');

var _ariaDpubRoles2 = _interopRequireDefault(_ariaDpubRoles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rolesMap = new Map([]);
[_ariaAbstractRoles2.default, _ariaLiteralRoles2.default, _ariaDpubRoles2.default].forEach(function (roleSet) {
  roleSet.forEach(function (roleDefinition, name) {
    return rolesMap.set(name, roleDefinition);
  });
});

rolesMap.forEach(function (roleDefinition, name) {
  // Conglomerate the properties
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = roleDefinition.superClass[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var superClassIter = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = superClassIter[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var superClassName = _step2.value;

          var superClassDefinition = rolesMap.get(superClassName);
          if (superClassDefinition) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = Object.keys(superClassDefinition.props)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var prop = _step3.value;

                if (!Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)) {
                  Object.assign(roleDefinition.props, _defineProperty({}, prop, superClassDefinition.props[prop]));
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
});

exports.default = rolesMap;