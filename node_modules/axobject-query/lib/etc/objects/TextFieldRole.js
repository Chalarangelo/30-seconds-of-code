'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TextFieldRole = {
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'textbox'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'input'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'input',
      attributes: [{
        name: 'type',
        value: 'text'
      }]
    }
  }],
  type: 'widget'
};

exports.default = TextFieldRole;