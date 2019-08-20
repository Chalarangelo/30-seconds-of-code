'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sliderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author'],
  props: {
    'aria-orientation': 'horizontal',
    'aria-readonly': null,
    'aria-valuemax': '100',
    'aria-valuemin': '0',
    'aria-valuenow': '50'
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-valuemax': '100',
    'aria-valuemin': '0',
    'aria-valuenow': '50'
  },
  superClass: [['roletype', 'widget', 'input'], ['roletype', 'widget', 'range']]
};

exports.default = sliderRole;