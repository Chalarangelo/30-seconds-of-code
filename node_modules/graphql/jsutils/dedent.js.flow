// @flow strict

/**
 * An ES6 string tag that fixes indentation. Also removes leading newlines
 * and trailing spaces and tabs, but keeps trailing newlines.
 *
 * Example usage:
 * const str = dedent`
 *   {
 *     test
 *   }
 * `;
 * str === "{\n  test\n}\n";
 */
export default function dedent(
  strings: $ReadOnlyArray<string>,
  ...values: $ReadOnlyArray<string>
): string {
  let str = '';

  for (let i = 0; i < strings.length; ++i) {
    str += strings[i];
    if (i < values.length) {
      str += values[i]; // interpolation
    }
  }

  const trimmedStr = str
    .replace(/^\n*/m, '') //  remove leading newline
    .replace(/[ \t]*$/, ''); // remove trailing spaces and tabs

  // fixes indentation by removing leading spaces and tabs from each line
  let indent = '';
  for (const char of trimmedStr) {
    if (char !== ' ' && char !== '\t') {
      break;
    }
    indent += char;
  }
  return trimmedStr.replace(RegExp('^' + indent, 'mg'), ''); // remove indent
}
