'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var radiogroupRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-readonly': null,
    'aria-required': null
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'list'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [['radio']],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
};

exports.default = radiogroupRole;