'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var spinbuttonRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-valuenow': '0',
    'aria-required': null,
    'aria-readonly': null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-valuemax': null,
    'aria-valuemin': null,
    'aria-valuenow': '0'
  },
  superClass: [['roletype', 'widget', 'composite'], ['roletype', 'widget', 'input'], ['roletype', 'widget', 'range']]
};

exports.default = spinbuttonRole;