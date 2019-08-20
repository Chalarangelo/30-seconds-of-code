'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menuitemcheckboxRole = {
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
      name: 'menuitem'
    }
  }],
  requireContextRole: ['menu', 'menubar'],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-checked': null
  },
  superClass: [['roletype', 'widget', 'command', 'menuitem'], ['roletype', 'widget', 'input', 'checkbox']]
};

exports.default = menuitemcheckboxRole;