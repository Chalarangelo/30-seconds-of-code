"use strict";

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview <audio> and <video> elements must have a <track> for captions.
 * @author Ethan Cohen
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'Media elements such as <audio> and <video> must have a <track> for captions.';
var MEDIA_TYPES = ['audio', 'video'];
var schema = (0, _schemas.generateObjSchema)({
  audio: _schemas.arraySchema,
  video: _schemas.arraySchema,
  track: _schemas.arraySchema
});

var isMediaType = function isMediaType(context, type) {
  var options = context.options[0] || {};
  return MEDIA_TYPES.map(function (mediaType) {
    return options[mediaType];
  }).reduce(function (types, customComponent) {
    return types.concat(customComponent);
  }, MEDIA_TYPES).some(function (typeToCheck) {
    return typeToCheck === type;
  });
};

var isTrackType = function isTrackType(context, type) {
  var options = context.options[0] || {};
  return ['track'].concat(options.track || []).some(function (typeToCheck) {
    return typeToCheck === type;
  });
};

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/media-has-caption.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXElement: function JSXElement(node) {
        var element = node.openingElement;
        var type = (0, _jsxAstUtils.elementType)(element);

        if (!isMediaType(context, type)) {
          return;
        }

        var mutedProp = (0, _jsxAstUtils.getProp)(element.attributes, 'muted');
        var mutedPropVal = (0, _jsxAstUtils.getLiteralPropValue)(mutedProp);

        if (mutedPropVal === true) {
          return;
        } // $FlowFixMe https://github.com/facebook/flow/issues/1414


        var trackChildren = node.children.filter(function (child) {
          if (child.type !== 'JSXElement') {
            return false;
          } // $FlowFixMe https://github.com/facebook/flow/issues/1414


          return isTrackType(context, (0, _jsxAstUtils.elementType)(child.openingElement));
        });

        if (trackChildren.length === 0) {
          context.report({
            node: element,
            message: errorMessage
          });
          return;
        }

        var hasCaption = trackChildren.some(function (track) {
          var kindProp = (0, _jsxAstUtils.getProp)(track.openingElement.attributes, 'kind');
          var kindPropValue = (0, _jsxAstUtils.getLiteralPropValue)(kindProp) || '';
          return kindPropValue.toLowerCase() === 'captions';
        });

        if (!hasCaption) {
          context.report({
            node: element,
            message: errorMessage
          });
        }
      }
    };
  }
};