'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var textboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-activedescendant': null,
    'aria-autocomplete': null,
    'aria-multiline': null,
    'aria-placeholder': null,
    'aria-readonly': null,
    'aria-required': null
  },
  relatedConcepts: [{
    module: 'XForms',
    concept: {
      name: 'input'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'textarea'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'input'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'input',
      attributes: [{
        name: 'type',
        value: 'text'
      }]
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'input']]
};

exports.default = textboxRole;