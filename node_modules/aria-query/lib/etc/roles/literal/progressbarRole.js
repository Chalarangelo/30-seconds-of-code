'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var progressbarRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author'],
  props: {},
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'status'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'range']]
};

exports.default = progressbarRole;