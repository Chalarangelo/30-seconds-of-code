'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menubarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-orientation': 'vertical'
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'toolbar'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [['group', 'menuitemradio'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'composite', 'select', 'menu'], ['roletype', 'structure', 'section', 'group', 'select', 'menu']]
};

exports.default = menubarRole;