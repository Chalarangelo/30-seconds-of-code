'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var checkboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-checked': 'false',
    'aria-readonly': null
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'option'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'input',
      attributes: [{
        name: 'type',
        value: 'checkbox'
      }]
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-checked': null
  },
  superClass: [['roletype', 'widget', 'input']]
};

exports.default = checkboxRole;