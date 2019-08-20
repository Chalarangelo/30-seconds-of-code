"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _axobjectQuery = require("axobject-query");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var _attributesComparator = _interopRequireDefault(require("./attributesComparator"));

var domKeys = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());
var roleKeys = (0, _toConsumableArray2["default"])(_ariaQuery.roles.keys());
var elementRoleEntries = (0, _toConsumableArray2["default"])(_ariaQuery.elementRoles);
var nonInteractiveRoles = new Set(roleKeys.filter(function (name) {
  var role = _ariaQuery.roles.get(name);

  return !role["abstract"] && !role.superClass.some(function (classes) {
    return (0, _arrayIncludes["default"])(classes, 'widget');
  });
}));
var interactiveRoles = new Set([].concat(roleKeys, // 'toolbar' does not descend from widget, but it does support
// aria-activedescendant, thus in practice we treat it as a widget.
'toolbar').filter(function (name) {
  var role = _ariaQuery.roles.get(name);

  return !role["abstract"] && role.superClass.some(function (classes) {
    return (0, _arrayIncludes["default"])(classes, 'widget');
  });
}));
var nonInteractiveElementRoleSchemas = elementRoleEntries.reduce(function (accumulator, _ref) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      elementSchema = _ref2[0],
      roleSet = _ref2[1];

  if ((0, _toConsumableArray2["default"])(roleSet).every(function (role) {
    return nonInteractiveRoles.has(role);
  })) {
    accumulator.push(elementSchema);
  }

  return accumulator;
}, []);
var interactiveElementRoleSchemas = elementRoleEntries.reduce(function (accumulator, _ref3) {
  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      elementSchema = _ref4[0],
      roleSet = _ref4[1];

  if ((0, _toConsumableArray2["default"])(roleSet).some(function (role) {
    return interactiveRoles.has(role);
  })) {
    accumulator.push(elementSchema);
  }

  return accumulator;
}, []);
var interactiveAXObjects = new Set((0, _toConsumableArray2["default"])(_axobjectQuery.AXObjects.keys()).filter(function (name) {
  return _axobjectQuery.AXObjects.get(name).type === 'widget';
}));
var interactiveElementAXObjectSchemas = (0, _toConsumableArray2["default"])(_axobjectQuery.elementAXObjects).reduce(function (accumulator, _ref5) {
  var _ref6 = (0, _slicedToArray2["default"])(_ref5, 2),
      elementSchema = _ref6[0],
      AXObjectSet = _ref6[1];

  if ((0, _toConsumableArray2["default"])(AXObjectSet).every(function (role) {
    return interactiveAXObjects.has(role);
  })) {
    accumulator.push(elementSchema);
  }

  return accumulator;
}, []);

function checkIsInteractiveElement(tagName, attributes) {
  function elementSchemaMatcher(elementSchema) {
    return tagName === elementSchema.name && (0, _attributesComparator["default"])(elementSchema.attributes, attributes);
  } // Check in elementRoles for inherent interactive role associations for
  // this element.


  var isInherentInteractiveElement = interactiveElementRoleSchemas.some(elementSchemaMatcher);

  if (isInherentInteractiveElement) {
    return true;
  } // Check in elementRoles for inherent non-interactive role associations for
  // this element.


  var isInherentNonInteractiveElement = nonInteractiveElementRoleSchemas.some(elementSchemaMatcher);

  if (isInherentNonInteractiveElement) {
    return false;
  } // Check in elementAXObjects for AX Tree associations for this element.


  var isInteractiveAXElement = interactiveElementAXObjectSchemas.some(elementSchemaMatcher);

  if (isInteractiveAXElement) {
    return true;
  }

  return false;
}
/**
 * Returns boolean indicating whether the given element is
 * interactive on the DOM or not. Usually used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * it's intention is to be interacted with on the DOM.
 */


var isInteractiveElement = function isInteractiveElement(tagName, attributes) {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (!(0, _arrayIncludes["default"])(domKeys, tagName)) {
    return false;
  }

  return checkIsInteractiveElement(tagName, attributes);
};

var _default = isInteractiveElement;
exports["default"] = _default;