'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var linkRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-expanded': null
  },
  relatedConcepts: [{
    module: 'HTML',
    concept: {
      name: 'a',
      attributes: [{
        name: 'href'
      }]
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'area',
      attributes: [{
        name: 'href'
      }]
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'link'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'command']]
};

exports.default = linkRole;