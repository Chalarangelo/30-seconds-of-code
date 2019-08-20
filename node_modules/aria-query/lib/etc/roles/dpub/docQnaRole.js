'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var docQnaRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-describedat': null
  },
  relatedConcepts: [{
    module: 'EPUB',
    concept: {
      name: 'qna [EPUB-SSV]'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section']]
};

exports.default = docQnaRole;