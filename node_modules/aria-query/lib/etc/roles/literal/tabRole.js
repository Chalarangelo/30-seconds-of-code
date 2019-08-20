'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tabRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-posinset': null,
    'aria-selected': 'false',
    'aria-setsize': null
  },
  relatedConcepts: [],
  requireContextRole: ['tablist'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'sectionhead'], ['roletype', 'widget']]
};

exports.default = tabRole;