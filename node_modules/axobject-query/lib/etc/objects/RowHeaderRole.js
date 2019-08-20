'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RowHeaderRole = {
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'rowheader'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'th',
      attributes: [{
        name: 'scope',
        value: 'row'
      }]
    }
  }],
  type: 'widget'
};

exports.default = RowHeaderRole;