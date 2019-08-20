'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var docNoticeRole = {
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
      name: 'notice [EPUB-SSV]'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'note']]
};

exports.default = docNoticeRole;