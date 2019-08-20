var tokenizer = require('scss-tokenizer');

function parseImports(content, isIndentedSyntax) {
  var tokens = tokenizer.tokenize(content);
  var results = [];
  var tmp = '';
  var inImport = false;
  var inParen = false;
  var prevToken = tokens[0];

  var i, token;
  for (i = 1; i < tokens.length; i++) {
    token = tokens[i];

    if (inImport && !inParen && token[0] === 'string') {
      results.push(token[1]);
    }
    else if (token[1] === 'import' && prevToken[1] === '@') {
      if (inImport && !isIndentedSyntax) {
        throw new Error('Encountered invalid @import syntax.');
      }

      inImport = true;
    }
    else if (inImport && !inParen && (token[0] === 'ident' || token[0] === '/')) {
      tmp += token[1];
    }
    else if (inImport && !inParen && (token[0] === 'space' || token[0] === 'newline')) {
      if (tmp !== '') {
        results.push(tmp);
        tmp = '';

        if (isIndentedSyntax) {
          inImport = false;
        }
      }
    }
    else if (inImport && token[0] === ';') {
      inImport = false;

      if (tmp !== '') {
        results.push(tmp);
        tmp = '';
      }
    }
    else if (inImport && token[0] === '(') {
      inParen = true;
      tmp = '';
    }
    else if (inParen && token[0] === ')') {
      inParen = false;
    }

    prevToken = token;
  }

  if (tmp !== '') {
    results.push(tmp);
  }

  return results;
}

module.exports = parseImports;
