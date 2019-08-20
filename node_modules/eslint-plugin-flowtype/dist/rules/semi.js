'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var never = (context.options[0] || 'always') === 'never';
  var sourceCode = context.getSourceCode();

  var report = function report(node, missing) {
    var lastToken = sourceCode.getLastToken(node);
    var fix = void 0;
    var message = void 0;
    var loc = lastToken.loc;


    if (missing) {
      message = 'Missing semicolon.';
      loc = loc.end;
      fix = function fix(fixer) {
        return fixer.insertTextAfter(lastToken, ';');
      };
    } else {
      message = 'Extra semicolon.';
      loc = loc.start;
      fix = function fix(fixer) {
        return fixer.remove(lastToken);
      };
    }

    context.report({
      fix,
      loc,
      message,
      node
    });
  };

  var isSemicolon = function isSemicolon(token) {
    return token.type === 'Punctuator' && token.value === ';';
  };

  var checkForSemicolon = function checkForSemicolon(node) {
    var lastToken = sourceCode.getLastToken(node);
    var isLastTokenSemicolon = isSemicolon(lastToken);

    if (never && isLastTokenSemicolon) {
      report(node, false);
    }

    if (!never && !isLastTokenSemicolon) {
      report(node, true);
    }
  };

  return {
    OpaqueType: checkForSemicolon,
    TypeAlias: checkForSemicolon
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];