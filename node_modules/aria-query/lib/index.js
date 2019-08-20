'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleElements = exports.elementRoles = exports.roles = exports.dom = exports.aria = undefined;

var _ariaPropsMap = require('./ariaPropsMap');

var _ariaPropsMap2 = _interopRequireDefault(_ariaPropsMap);

var _domMap = require('./domMap');

var _domMap2 = _interopRequireDefault(_domMap);

var _rolesMap = require('./rolesMap');

var _rolesMap2 = _interopRequireDefault(_rolesMap);

var _elementRoleMap = require('./elementRoleMap');

var _elementRoleMap2 = _interopRequireDefault(_elementRoleMap);

var _roleElementMap = require('./roleElementMap');

var _roleElementMap2 = _interopRequireDefault(_roleElementMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aria = exports.aria = _ariaPropsMap2.default;

var dom = exports.dom = _domMap2.default;
var roles = exports.roles = _rolesMap2.default;
var elementRoles = exports.elementRoles = _elementRoleMap2.default;
var roleElements = exports.roleElements = _roleElementMap2.default;