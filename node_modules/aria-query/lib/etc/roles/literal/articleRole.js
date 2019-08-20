'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var articleRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-posinset': null,
    'aria-setsize': null
  },
  relatedConcepts: [{
    module: 'HTML',
    concept: {
      name: 'article'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'document']]
};

exports.default = articleRole;