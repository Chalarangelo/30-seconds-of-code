'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var docBiblioentryRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-describedat': null
  },
  relatedConcepts: [{
    module: 'EPUB',
    concept: {
      name: 'EPUB biblioentry [EPUB-SSV]'
    }
  }],
  requireContextRole: ['doc-bibliography'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'listitem']]
};

exports.default = docBiblioentryRole;