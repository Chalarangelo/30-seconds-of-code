'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cellRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'td'
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-colindex': null,
    'aria-colspan': null,
    'aria-rowindex': null,
    'aria-rowspan': null
  },
  relatedConcepts: [],
  requireContextRole: ['row'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section']]
};

exports.default = cellRole;