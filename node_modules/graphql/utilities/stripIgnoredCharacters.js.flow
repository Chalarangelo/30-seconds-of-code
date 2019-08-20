// @flow strict

import inspect from '../jsutils/inspect';
import { Source } from '../language/source';
import { TokenKind } from '../language/tokenKind';
import { createLexer, isPunctuatorToken } from '../language/lexer';
import {
  dedentBlockStringValue,
  getBlockStringIndentation,
} from '../language/blockString';

/**
 * Strips characters that are not significant to the validity or execution
 * of a GraphQL document:
 *   - UnicodeBOM
 *   - WhiteSpace
 *   - LineTerminator
 *   - Comment
 *   - Comma
 *   - BlockString indentation
 *
 * Note: It is required to have a delimiter character between neighboring
 * non-punctuator tokens and this function always uses single space as delimiter.
 *
 * It is guaranteed that both input and output documents if parsed would result
 * in the exact same AST except for nodes location.
 *
 * Warning: It is guaranteed that this function will always produce stable results.
 * However, it's not guaranteed that it will stay the same between different
 * releases due to bugfixes or changes in the GraphQL specification.
 *
 * Query example:
 *
 * query SomeQuery($foo: String!, $bar: String) {
 *   someField(foo: $foo, bar: $bar) {
 *     a
 *     b {
 *       c
 *       d
 *     }
 *   }
 * }
 *
 * Becomes:
 *
 * query SomeQuery($foo:String!$bar:String){someField(foo:$foo bar:$bar){a b{c d}}}
 *
 * SDL example:
 *
 * """
 * Type description
 * """
 * type Foo {
 *   """
 *   Field description
 *   """
 *   bar: String
 * }
 *
 * Becomes:
 *
 * """Type description""" type Foo{"""Field description""" bar:String}
 */
export function stripIgnoredCharacters(source: string | Source): string {
  const sourceObj = typeof source === 'string' ? new Source(source) : source;
  if (!(sourceObj instanceof Source)) {
    throw new TypeError(
      `Must provide string or Source. Received: ${inspect(sourceObj)}`,
    );
  }

  const body = sourceObj.body;
  const lexer = createLexer(sourceObj);
  let strippedBody = '';

  let wasLastAddedTokenNonPunctuator = false;
  while (lexer.advance().kind !== TokenKind.EOF) {
    const currentToken = lexer.token;
    const tokenKind = currentToken.kind;

    /**
     * Every two non-punctuator tokens should have space between them.
     * Also prevent case of non-punctuator token following by spread resulting
     * in invalid token (e.g. `1...` is invalid Float token).
     */
    const isNonPunctuator = !isPunctuatorToken(currentToken);
    if (wasLastAddedTokenNonPunctuator) {
      if (isNonPunctuator || currentToken.kind === TokenKind.SPREAD) {
        strippedBody += ' ';
      }
    }

    const tokenBody = body.slice(currentToken.start, currentToken.end);
    if (tokenKind === TokenKind.BLOCK_STRING) {
      strippedBody += dedentBlockString(tokenBody);
    } else {
      strippedBody += tokenBody;
    }

    wasLastAddedTokenNonPunctuator = isNonPunctuator;
  }

  return strippedBody;
}

function dedentBlockString(blockStr) {
  // skip leading and trailing triple quotations
  const rawStr = blockStr.slice(3, -3);
  let body = dedentBlockStringValue(rawStr);

  const lines = body.split(/\r\n|[\n\r]/g);
  if (getBlockStringIndentation(lines) > 0) {
    body = '\n' + body;
  }

  const lastChar = body[body.length - 1];
  const hasTrailingQuote = lastChar === '"' && body.slice(-4) !== '\\"""';
  if (hasTrailingQuote || lastChar === '\\') {
    body += '\n';
  }

  return '"""' + body + '"""';
}
