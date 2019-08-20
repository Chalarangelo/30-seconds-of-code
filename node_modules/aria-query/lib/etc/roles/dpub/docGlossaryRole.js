'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var docGlossaryRole = {
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
      name: 'glossary [EPUB-SSV]'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [['term'], ['definition']],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'landmark']]
};

exports.default = docGlossaryRole;