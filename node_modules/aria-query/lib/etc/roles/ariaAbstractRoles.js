'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commandRole = require('./abstract/commandRole');

var _commandRole2 = _interopRequireDefault(_commandRole);

var _compositeRole = require('./abstract/compositeRole');

var _compositeRole2 = _interopRequireDefault(_compositeRole);

var _inputRole = require('./abstract/inputRole');

var _inputRole2 = _interopRequireDefault(_inputRole);

var _landmarkRole = require('./abstract/landmarkRole');

var _landmarkRole2 = _interopRequireDefault(_landmarkRole);

var _rangeRole = require('./abstract/rangeRole');

var _rangeRole2 = _interopRequireDefault(_rangeRole);

var _roletypeRole = require('./abstract/roletypeRole');

var _roletypeRole2 = _interopRequireDefault(_roletypeRole);

var _sectionRole = require('./abstract/sectionRole');

var _sectionRole2 = _interopRequireDefault(_sectionRole);

var _sectionheadRole = require('./abstract/sectionheadRole');

var _sectionheadRole2 = _interopRequireDefault(_sectionheadRole);

var _selectRole = require('./abstract/selectRole');

var _selectRole2 = _interopRequireDefault(_selectRole);

var _structureRole = require('./abstract/structureRole');

var _structureRole2 = _interopRequireDefault(_structureRole);

var _widgetRole = require('./abstract/widgetRole');

var _widgetRole2 = _interopRequireDefault(_widgetRole);

var _windowRole = require('./abstract/windowRole');

var _windowRole2 = _interopRequireDefault(_windowRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ariaAbstractRoles = new Map([['command', _commandRole2.default], ['composite', _compositeRole2.default], ['input', _inputRole2.default], ['landmark', _landmarkRole2.default], ['range', _rangeRole2.default], ['roletype', _roletypeRole2.default], ['section', _sectionRole2.default], ['sectionhead', _sectionheadRole2.default], ['select', _selectRole2.default], ['structure', _structureRole2.default], ['widget', _widgetRole2.default], ['window', _windowRole2.default]]);

exports.default = ariaAbstractRoles;