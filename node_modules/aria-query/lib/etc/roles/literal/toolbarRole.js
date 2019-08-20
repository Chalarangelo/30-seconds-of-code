'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toolbarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-orientation': 'horizontal'
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'menubar'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'group']]
};

exports.default = toolbarRole;