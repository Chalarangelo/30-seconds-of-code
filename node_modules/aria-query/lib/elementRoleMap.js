'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _rolesMap = require('./rolesMap');

var _rolesMap2 = _interopRequireDefault(_rolesMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var elementRoleMap = new Map([]);

[].concat(_toConsumableArray(_rolesMap2.default.keys())).forEach(function (key) {
  var role = _rolesMap2.default.get(key);
  if (role) {
    [].concat(_toConsumableArray(role.baseConcepts), _toConsumableArray(role.relatedConcepts)).forEach(function (relation) {
      if (relation.module === 'HTML') {
        var concept = relation.concept;
        if (concept) {
          var conceptStr = JSON.stringify(concept);

          var roles = ([].concat(_toConsumableArray(elementRoleMap.entries())).find(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return JSON.stringify(key) === conceptStr;
          }) || [])[1];

          if (!roles) {
            roles = new Set([]);
          }
          roles.add(key);
          elementRoleMap.set(concept, roles);
        }
      }
    });
  }
});

exports.default = elementRoleMap;