'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menuitemRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-posinset': null,
    'aria-setsize': null
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'option'
    }
  }, {
    module: 'ARIA',
    concept: {
      name: 'listitem'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'menuitem'
    }
  }, {
    module: 'JAPI',
    concept: {
      name: 'MENU_ITEM'
    }
  }],
  requireContextRole: ['group', 'menu', 'menubar'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'command']]
};

exports.default = menuitemRole;