'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rolesMap = require('./rolesMap');

var _rolesMap2 = _interopRequireDefault(_rolesMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var roleElementMap = new Map([]);

[].concat(_toConsumableArray(_rolesMap2.default.keys())).forEach(function (key) {
  var role = _rolesMap2.default.get(key);
  if (role) {
    [].concat(_toConsumableArray(role.baseConcepts), _toConsumableArray(role.relatedConcepts)).forEach(function (relation) {
      if (relation.module === 'HTML') {
        var concept = relation.concept;
        if (concept) {
          var relationConcepts = roleElementMap.get(key) || new Set([]);
          relationConcepts.add(concept);
          roleElementMap.set(key, relationConcepts);
        }
      }
    });
  }
});

exports.default = roleElementMap;