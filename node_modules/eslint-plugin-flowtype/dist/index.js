'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _recommended = require('./configs/recommended.json');

var _recommended2 = _interopRequireDefault(_recommended);

var _arrayStyleComplexType = require('./rules/arrayStyleComplexType');

var _arrayStyleComplexType2 = _interopRequireDefault(_arrayStyleComplexType);

var _arrayStyleSimpleType = require('./rules/arrayStyleSimpleType');

var _arrayStyleSimpleType2 = _interopRequireDefault(_arrayStyleSimpleType);

var _booleanStyle = require('./rules/booleanStyle');

var _booleanStyle2 = _interopRequireDefault(_booleanStyle);

var _defineFlowType = require('./rules/defineFlowType');

var _defineFlowType2 = _interopRequireDefault(_defineFlowType);

var _delimiterDangle = require('./rules/delimiterDangle');

var _delimiterDangle2 = _interopRequireDefault(_delimiterDangle);

var _genericSpacing = require('./rules/genericSpacing');

var _genericSpacing2 = _interopRequireDefault(_genericSpacing);

var _newlineAfterFlowAnnotation = require('./rules/newlineAfterFlowAnnotation');

var _newlineAfterFlowAnnotation2 = _interopRequireDefault(_newlineAfterFlowAnnotation);

var _noDupeKeys = require('./rules/noDupeKeys');

var _noDupeKeys2 = _interopRequireDefault(_noDupeKeys);

var _noExistentialType = require('./rules/noExistentialType');

var _noExistentialType2 = _interopRequireDefault(_noExistentialType);

var _noFlowFixMeComments = require('./rules/noFlowFixMeComments');

var _noFlowFixMeComments2 = _interopRequireDefault(_noFlowFixMeComments);

var _noMutableArray = require('./rules/noMutableArray');

var _noMutableArray2 = _interopRequireDefault(_noMutableArray);

var _noPrimitiveConstructorTypes = require('./rules/noPrimitiveConstructorTypes');

var _noPrimitiveConstructorTypes2 = _interopRequireDefault(_noPrimitiveConstructorTypes);

var _noTypesMissingFileAnnotation = require('./rules/noTypesMissingFileAnnotation');

var _noTypesMissingFileAnnotation2 = _interopRequireDefault(_noTypesMissingFileAnnotation);

var _noUnusedExpressions = require('./rules/noUnusedExpressions');

var _noUnusedExpressions2 = _interopRequireDefault(_noUnusedExpressions);

var _noWeakTypes = require('./rules/noWeakTypes');

var _noWeakTypes2 = _interopRequireDefault(_noWeakTypes);

var _objectTypeDelimiter = require('./rules/objectTypeDelimiter');

var _objectTypeDelimiter2 = _interopRequireDefault(_objectTypeDelimiter);

var _requireExactType = require('./rules/requireExactType');

var _requireExactType2 = _interopRequireDefault(_requireExactType);

var _requireParameterType = require('./rules/requireParameterType');

var _requireParameterType2 = _interopRequireDefault(_requireParameterType);

var _requireReturnType = require('./rules/requireReturnType');

var _requireReturnType2 = _interopRequireDefault(_requireReturnType);

var _requireTypesAtTop = require('./rules/requireTypesAtTop');

var _requireTypesAtTop2 = _interopRequireDefault(_requireTypesAtTop);

var _requireValidFileAnnotation = require('./rules/requireValidFileAnnotation');

var _requireValidFileAnnotation2 = _interopRequireDefault(_requireValidFileAnnotation);

var _requireVariableType = require('./rules/requireVariableType');

var _requireVariableType2 = _interopRequireDefault(_requireVariableType);

var _semi = require('./rules/semi');

var _semi2 = _interopRequireDefault(_semi);

var _sortKeys = require('./rules/sortKeys');

var _sortKeys2 = _interopRequireDefault(_sortKeys);

var _spaceAfterTypeColon = require('./rules/spaceAfterTypeColon');

var _spaceAfterTypeColon2 = _interopRequireDefault(_spaceAfterTypeColon);

var _spaceBeforeGenericBracket = require('./rules/spaceBeforeGenericBracket');

var _spaceBeforeGenericBracket2 = _interopRequireDefault(_spaceBeforeGenericBracket);

var _spaceBeforeTypeColon = require('./rules/spaceBeforeTypeColon');

var _spaceBeforeTypeColon2 = _interopRequireDefault(_spaceBeforeTypeColon);

var _typeIdMatch = require('./rules/typeIdMatch');

var _typeIdMatch2 = _interopRequireDefault(_typeIdMatch);

var _typeImportStyle = require('./rules/typeImportStyle');

var _typeImportStyle2 = _interopRequireDefault(_typeImportStyle);

var _unionIntersectionSpacing = require('./rules/unionIntersectionSpacing');

var _unionIntersectionSpacing2 = _interopRequireDefault(_unionIntersectionSpacing);

var _useFlowType = require('./rules/useFlowType');

var _useFlowType2 = _interopRequireDefault(_useFlowType);

var _validSyntax = require('./rules/validSyntax');

var _validSyntax2 = _interopRequireDefault(_validSyntax);

var _utilities = require('./utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rules = {
  'array-style-complex-type': _arrayStyleComplexType2.default,
  'array-style-simple-type': _arrayStyleSimpleType2.default,
  'boolean-style': _booleanStyle2.default,
  'define-flow-type': _defineFlowType2.default,
  'delimiter-dangle': _delimiterDangle2.default,
  'generic-spacing': _genericSpacing2.default,
  'newline-after-flow-annotation': _newlineAfterFlowAnnotation2.default,
  'no-dupe-keys': _noDupeKeys2.default,
  'no-existential-type': _noExistentialType2.default,
  'no-flow-fix-me-comments': _noFlowFixMeComments2.default,
  'no-mutable-array': _noMutableArray2.default,
  'no-primitive-constructor-types': _noPrimitiveConstructorTypes2.default,
  'no-types-missing-file-annotation': _noTypesMissingFileAnnotation2.default,
  'no-unused-expressions': _noUnusedExpressions2.default,
  'no-weak-types': _noWeakTypes2.default,
  'object-type-delimiter': _objectTypeDelimiter2.default,
  'require-exact-type': _requireExactType2.default,
  'require-parameter-type': _requireParameterType2.default,
  'require-return-type': _requireReturnType2.default,
  'require-types-at-top': _requireTypesAtTop2.default,
  'require-valid-file-annotation': _requireValidFileAnnotation2.default,
  'require-variable-type': _requireVariableType2.default,
  semi: _semi2.default,
  'sort-keys': _sortKeys2.default,
  'space-after-type-colon': _spaceAfterTypeColon2.default,
  'space-before-generic-bracket': _spaceBeforeGenericBracket2.default,
  'space-before-type-colon': _spaceBeforeTypeColon2.default,
  'type-id-match': _typeIdMatch2.default,
  'type-import-style': _typeImportStyle2.default,
  'union-intersection-spacing': _unionIntersectionSpacing2.default,
  'use-flow-type': _useFlowType2.default,
  'valid-syntax': _validSyntax2.default
};

exports.default = {
  configs: {
    recommended: _recommended2.default
  },
  rules: _lodash2.default.mapValues(rules, function (rule, key) {
    if (key === 'no-types-missing-file-annotation') {
      return rule;
    }

    return _extends({}, rule, {
      create: _lodash2.default.partial(_utilities.checkFlowFileAnnotation, rule.create)
    });
  }),
  rulesConfig: {
    'boolean-style': 0,
    'define-flow-type': 0,
    'delimiter-dangle': 0,
    'generic-spacing': 0,
    'newline-after-flow-annotation': 0,
    'no-dupe-keys': 0,
    'no-flow-fix-me-comments': 0,
    'no-mutable-array': 0,
    'no-weak-types': 0,
    'object-type-delimiter': 0,
    'require-exact-type': 0,
    'require-parameter-type': 0,
    'require-return-type': 0,
    'require-variable-type': 0,
    semi: 0,
    'sort-keys': 0,
    'space-after-type-colon': 0,
    'space-before-generic-bracket': 0,
    'space-before-type-colon': 0,
    'type-id-match': 0,
    'type-import-style': 0,
    'union-intersection-spacing': 0,
    'use-flow-type': 0,
    'valid-syntax': 0
  }
};
module.exports = exports['default'];