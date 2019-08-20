'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tableRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'table'
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-colcount': null,
    'aria-rowcount': null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [['row'], ['rowgroup', 'row']],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section']]
};

exports.default = tableRole;