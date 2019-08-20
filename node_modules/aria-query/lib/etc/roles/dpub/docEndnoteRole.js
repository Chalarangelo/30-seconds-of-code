'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var docEndnoteRole = {
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
      name: 'rearnote [EPUB-SSV]'
    }
  }],
  requireContextRole: ['doc-endnotes'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'listitem']]
};

exports.default = docEndnoteRole;