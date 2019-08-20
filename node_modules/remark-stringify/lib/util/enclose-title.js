'use strict';

module.exports = enclose;

/* There is currently no way to support nested delimiters
 * across Markdown.pl, CommonMark, and GitHub (RedCarpet).
 * The following code supports Markdown.pl and GitHub.
 * CommonMark is not supported when mixing double- and
 * single quotes inside a title. */
function enclose(title) {
  var delimiter = title.indexOf('"') === -1 ? '"' : '\'';
  return delimiter + title + delimiter;
}
