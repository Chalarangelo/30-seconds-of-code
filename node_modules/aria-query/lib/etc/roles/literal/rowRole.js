'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rowRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'tr'
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-colindex': null,
    'aria-level': null,
    'aria-rowindex': null,
    'aria-selected': null
  },
  relatedConcepts: [],
  requireContextRole: ['grid', 'rowgroup', 'table', 'treegrid'],
  requiredOwnedElements: [['cell'], ['columnheader'], ['gridcell'], ['rowheader']],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'group'], ['roletype', 'widget']]
};

exports.default = rowRole;