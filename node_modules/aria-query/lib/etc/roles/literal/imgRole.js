'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var imgRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author'],
  props: {},
  relatedConcepts: [{
    module: 'HTML',
    concept: {
      name: 'img'
    }
  }, {
    module: 'DTB',
    concept: {
      name: 'imggroup'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section']]
};

exports.default = imgRole;