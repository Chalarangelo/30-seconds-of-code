/**
 * @fileoverview Restrict file extensions that may contain JSX
 * @author Joe Lencioni
 */

'use strict';

const path = require('path');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  extensions: ['.jsx']
};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Restrict file extensions that may contain JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-filename-extension')
    },

    schema: [{
      type: 'object',
      properties: {
        extensions: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    let invalidExtension;
    let invalidNode;

    function getExtensionsConfig() {
      return context.options[0] && context.options[0].extensions || DEFAULTS.extensions;
    }

    function handleJSX(node) {
      const filename = context.getFilename();
      if (filename === '<text>') {
        return;
      }

      if (invalidNode) {
        return;
      }

      const allowedExtensions = getExtensionsConfig();
      const isAllowedExtension = allowedExtensions.some(extension => filename.slice(-extension.length) === extension);

      if (isAllowedExtension) {
        return;
      }

      invalidNode = node;
      invalidExtension = path.extname(filename);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX,

      'Program:exit': function () {
        if (!invalidNode) {
          return;
        }

        context.report({
          node: invalidNode,
          message: `JSX not allowed in files with extension '${invalidExtension}'`
        });
      }
    };
  }
};
