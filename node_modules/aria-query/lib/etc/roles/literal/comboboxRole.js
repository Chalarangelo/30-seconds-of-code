'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var comboboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-expanded': 'false',
    'aria-autocomplete': null,
    'aria-required': null,
    'aria-haspopup': 'listbox',
    'aria-readonly': null
  },
  relatedConcepts: [{
    module: 'XForms',
    concept: {
      name: 'select'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'select'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [['textbox'], ['listbox'], ['tree'], ['grid'], ['dialog']],
  requiredProps: {
    'aria-controls': null,
    'aria-expanded': 'false'
  },
  superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
};

exports.default = comboboxRole;