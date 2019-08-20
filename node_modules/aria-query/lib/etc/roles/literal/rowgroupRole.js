'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rowgroupRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'tbody'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'tfoot'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'thead'
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-activedescendant': null,
    'aria-expanded': null
  },
  relatedConcepts: [],
  requireContextRole: ['grid', 'table', 'treegrid'],
  requiredOwnedElements: [['row']],
  requiredProps: {},
  superClass: [['roletype', 'structure']]
};

exports.default = rowgroupRole;