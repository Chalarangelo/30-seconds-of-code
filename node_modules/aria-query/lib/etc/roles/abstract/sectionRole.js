'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sectionRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  props: {
    'aria-expanded': null
  },
  relatedConcepts: [{
    module: 'DTB',
    concept: {
      name: 'frontmatter'
    }
  }, {
    module: 'DTB',
    concept: {
      name: 'level'
    }
  }, {
    module: 'SMIL',
    concept: {
      name: 'level'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure']]
};

exports.default = sectionRole;