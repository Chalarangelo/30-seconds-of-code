'use strict';

var Parser = require('css-selector-parser').CssSelectorParser,
    nthCheck = require('nth-check');


module.exports = function parseSelector (selector) {
  var parser = new Parser;
  parser.registerNestingOperators('>', '+', '~');
  parser.registerAttrEqualityMods('^', '*', '$');
  parser.registerSelectorPseudos('not');
  return compileNthChecks(parser.parse(selector));
};


function compileNthChecks (ast) {
  if (ast == null) {
    return ast;
  }

  switch (ast.type) {
    case 'selectors':
      ast.selectors.forEach(compileNthChecks);
      break;

    case 'ruleSet':
      compileNthChecks(ast.rule);
      break;

    case 'rule':
      if (ast.pseudos) {
        ast.pseudos.forEach(function (pseudo) {
          if (pseudo.name == 'nth-child' ||
              pseudo.name == 'nth-last-child' ||
              pseudo.name == 'nth-of-type' ||
              pseudo.name == 'nth-last-of-type') {
            pseudo.value = nthCheck(pseudo.value);
            pseudo.valueType = 'function';
          }
        });
      }
      if (ast.rule) {
        compileNthChecks(ast.rule);
      }
      break;

    default:
      throw Error('Undefined AST node: ' + ast.type);
  }

  return ast;
}
