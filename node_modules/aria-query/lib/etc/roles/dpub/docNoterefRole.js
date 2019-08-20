'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var docNoterefRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-describedat': null
  },
  relatedConcepts: [{
    module: 'EPUB',
    concept: {
      name: 'noteref [EPUB-SSV]'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'command', 'link']]
};

exports.default = docNoterefRole;