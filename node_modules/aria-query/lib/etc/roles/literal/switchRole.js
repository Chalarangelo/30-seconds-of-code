'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var switchRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-checked': 'false'
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'button'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-checked': 'false'
  },
  superClass: [['roletype', 'widget', 'input', 'checkbox']]
};

exports.default = switchRole;