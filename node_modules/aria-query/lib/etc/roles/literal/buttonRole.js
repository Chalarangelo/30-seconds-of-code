'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var buttonRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'button'
    }
  }],
  childrenPresentational: true,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-expanded': null,
    'aria-pressed': null
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'link'
    }
  }, {
    module: 'XForms',
    concept: {
      name: 'trigger'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'command']]
};

exports.default = buttonRole;