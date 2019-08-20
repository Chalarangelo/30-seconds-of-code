'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var separatorRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author'],
  props: {
    'aria-expanded': null,
    'aria-orientation': 'horizontal'
  },
  relatedConcepts: [{
    module: 'HTML',
    concept: {
      name: 'hr'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure']]
};

exports.default = separatorRole;