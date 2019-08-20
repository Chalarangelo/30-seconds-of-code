'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = require('../../utilities');

var hasLineBreak = function hasLineBreak(direction, colon, context) {
  var sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.loc.start.line !== sourceCode.getTokenBefore(colon).loc.end.line;
  } else {
    return sourceCode.getTokenAfter(colon).loc.start.line !== colon.loc.end.line;
  }
};

var getSpaces = function getSpaces(direction, colon, context) {
  var sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.start - sourceCode.getTokenBefore(colon).end;
  } else {
    return sourceCode.getTokenAfter(colon).start - colon.end;
  }
};

exports.default = function (direction, context, _ref) {
  var always = _ref.always,
      allowLineBreak = _ref.allowLineBreak;

  return function (_ref2) {
    var colon = _ref2.colon,
        node = _ref2.node,
        _ref2$name = _ref2.name,
        name = _ref2$name === undefined ? '' : _ref2$name,
        _ref2$type = _ref2.type,
        type = _ref2$type === undefined ? 'type annotation' : _ref2$type;

    var lineBreak = void 0;
    var spaces = void 0;

    // Support optional names
    // type X = { [string]: a }
    // type X = string => string
    if (!colon || colon.value !== ':') {
      return;
    }

    var data = {
      direction,
      name,
      type
    };

    if (hasLineBreak(direction, colon, context)) {
      if (allowLineBreak) {
        spaces = 1;
      } else {
        lineBreak = true;
        spaces = getSpaces(direction, colon, context);
      }
    } else {
      spaces = getSpaces(direction, colon, context);
    }

    if (always && lineBreak) {
      context.report({
        data,
        fix: _utilities.spacingFixers.replaceWithSpace(direction, colon, spaces),
        message: 'There must not be a line break {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (always && spaces > 1) {
      context.report({
        data,
        fix: _utilities.spacingFixers.stripSpaces(direction, colon, spaces - 1),
        message: 'There must be 1 space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (always && spaces === 0) {
      context.report({
        data,
        fix: _utilities.spacingFixers.addSpace(direction, colon),
        message: 'There must be a space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (!always && spaces > 0) {
      context.report({
        data,
        fix: _utilities.spacingFixers.stripSpaces(direction, colon, spaces),
        message: 'There must be no space {{direction}} {{name}}{{type}} colon.',
        node
      });
    }
  };
};

module.exports = exports['default'];