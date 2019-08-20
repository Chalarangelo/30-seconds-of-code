'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gridRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'table',
      attributes: [{
        name: 'role',
        value: 'grid'
      }]
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-level': null,
    'aria-multiselectable': null,
    'aria-readonly': null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [['rowgroup', 'row'], ['row']],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'table']]
};

exports.default = gridRole;