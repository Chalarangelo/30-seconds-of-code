'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRule = createRule;

var _graphql = require('graphql');

var _constants = require('./constants');

function strWithLen(len) {
  // from http://stackoverflow.com/questions/14343844/create-a-string-of-variable-length-filled-with-a-repeated-character
  return new Array(len + 1).join('x');
}

function replaceExpressions(node, context, env) {
  var chunks = [];

  node.quasis.forEach(function (element, i) {
    var chunk = element.value.cooked;
    var value = node.expressions[i];

    chunks.push(chunk);

    if (!env || env === 'apollo') {
      // In Apollo, interpolation is only valid outside top-level structures like `query` or `mutation`.
      // We'll check to make sure there's an equivalent set of opening and closing brackets, otherwise
      // we're attempting to do an invalid interpolation.
      if (chunk.split('{').length - 1 !== chunk.split('}').length - 1) {
        context.report({
          node: value,
          message: 'Invalid interpolation - fragment interpolation must occur outside of the brackets.'
        });
        throw new Error('Invalid interpolation');
      }
    }

    if (!element.tail) {
      // Preserve location of errors by replacing with exactly the same length
      var nameLength = value.end - value.start;

      if (env === 'relay' && /:\s*$/.test(chunk)) {
        // The chunk before this one had a colon at the end, so this
        // is a variable

        // Add 2 for brackets in the interpolation
        var placeholder = strWithLen(nameLength + 2);
        chunks.push('$' + placeholder);
      } else if (env === 'lokka' && /\.\.\.\s*$/.test(chunk)) {
        // This is Lokka-style fragment interpolation where you actually type the '...' yourself
        var _placeholder = strWithLen(nameLength + 3);
        chunks.push(_placeholder);
      } else if (env === 'relay') {
        // This is Relay-style fragment interpolation where you don't type '...'
        // Ellipsis cancels out extra characters
        var _placeholder2 = strWithLen(nameLength);
        chunks.push('...' + _placeholder2);
      } else if (!env || env === 'apollo') {
        // In Apollo, fragment interpolation is only valid outside of brackets
        // Since we don't know what we'd interpolate here (that occurs at runtime),
        // we're not going to do anything with this interpolation.
      } else if (env === 'fraql') {
        if (chunk.lastIndexOf('{') > chunk.lastIndexOf('}')) {
          chunks.push('__typename');
        }
      } else {
        // Invalid interpolation
        context.report({
          node: value,
          message: 'Invalid interpolation - not a valid fragment or variable.'
        });
        throw new Error('Invalid interpolation');
      }
    }
  });

  return chunks.join('');
}

function locFrom(node, error) {
  if (!error.locations || !error.locations.length) {
    return;
  }
  var location = error.locations[0];

  var line = void 0;
  var column = void 0;
  if (location.line === 1 && node.tag.name !== _constants.internalTag) {
    line = node.loc.start.line;
    column = node.tag.loc.end.column + location.column;
  } else {
    line = node.loc.start.line + location.line - 1;
    column = location.column - 1;
  }

  return {
    line: line,
    column: column
  };
}

function handleTemplateTag(node, context, schema, env, validators) {
  var text = void 0;
  try {
    text = replaceExpressions(node.quasi, context, env);
  } catch (e) {
    if (e.message !== 'Invalid interpolation') {
      console.log(e); // eslint-disable-line no-console
    }
    return;
  }

  // Re-implement syntax sugar for fragment names, which is technically not valid
  // graphql
  if ((env === 'lokka' || env === 'relay' || env === 'fraql') && /fragment\s+on/.test(text)) {
    text = text.replace('fragment', 'fragment _');
  }

  var ast = void 0;

  try {
    ast = (0, _graphql.parse)(text);
  } catch (error) {
    context.report({
      node: node,
      message: error.message.split('\n')[0],
      loc: locFrom(node, error)
    });
    return;
  }

  var validationErrors = schema ? (0, _graphql.validate)(schema, ast, validators) : [];
  if (validationErrors && validationErrors.length > 0) {
    context.report({
      node: node,
      message: validationErrors[0].message,
      loc: locFrom(node, validationErrors[0])
    });
    return;
  }
}

function templateExpressionMatchesTag(tagName, node) {
  var tagNameSegments = tagName.split('.').length;
  if (tagNameSegments === 1) {
    // Check for single identifier, like 'gql'
    if (node.tag.type !== 'Identifier' || node.tag.name !== tagName) {
      return false;
    }
  } else if (tagNameSegments === 2) {
    // Check for dotted identifier, like 'Relay.QL'
    if (node.tag.type !== 'MemberExpression' || node.tag.object.name + '.' + node.tag.property.name !== tagName) {
      return false;
    }
  } else {
    // We don't currently support 3 segments so ignore
    return false;
  }
  return true;
}

function createRule(context, optionParser) {
  var tagNames = new Set();
  var tagRules = [];
  var options = context.options.length === 0 ? [{}] : context.options;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var optionGroup = _step.value;

      var _optionParser = optionParser(optionGroup),
          schema = _optionParser.schema,
          env = _optionParser.env,
          tagName = _optionParser.tagName,
          validators = _optionParser.validators;

      var boundValidators = validators.map(function (v) {
        return function (ctx) {
          return v(ctx, optionGroup);
        };
      });
      if (tagNames.has(tagName)) {
        throw new Error('Multiple options for GraphQL tag ' + tagName);
      }
      tagNames.add(tagName);
      tagRules.push({ schema: schema, env: env, tagName: tagName, validators: boundValidators });
    };

    for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    TaggedTemplateExpression: function TaggedTemplateExpression(node) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tagRules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref2 = _step2.value;
          var schema = _ref2.schema,
              env = _ref2.env,
              tagName = _ref2.tagName,
              validators = _ref2.validators;

          if (templateExpressionMatchesTag(tagName, node)) {
            return handleTemplateTag(node, context, schema, env, validators);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  };
}