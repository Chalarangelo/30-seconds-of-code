'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var treeitemRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {},
  relatedConcepts: [],
  requireContextRole: ['group', 'tree'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'listitem'], ['roletype', 'widget', 'input', 'option']]
};

exports.default = treeitemRole;