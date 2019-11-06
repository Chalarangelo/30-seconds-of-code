const config = require('../../config');

const getMarkDownAnchor = paragraphTitle =>
  paragraphTitle
    .trim()
    .toLowerCase()
    .replace(/[^\w\- ]+/g, '')
    .replace(/\s/g, '-')
    .replace(/\-+$/, '');
// Creates an object from pairs
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
// Optimizes nodes in an HTML document
const optimizeNodes = (data, regexp, replacer) => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null) ++count;
  } while (count > 0);
  return output;
};
// Capitalizes the first letter of a string
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() +
  (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
const prepTaggedData = tagDbData =>
  [...new Set(Object.entries(tagDbData).map(t => t[1][0]))]
    .filter(v => v)
    .sort((a, b) =>
      capitalize(a, true) === 'Uncategorized'
        ? 1
        : capitalize(b, true) === 'Uncategorized'
        ? -1
        : a.localeCompare(b),
    );
const makeExamples = data => {
  data =
    data.slice(0, data.lastIndexOf(`\`\`\`${config.language.short}`)).trim() +
    misc.collapsible(
      'Examples',
      data.slice(
        data.lastIndexOf(`\`\`\`${config.language.short}`),
        data.lastIndexOf('```'),
      ) + data.slice(data.lastIndexOf('```')),
    );
  return `${data}\n<br>${misc.link(
    '⬆ Back to top',
    misc.anchor('Contents'),
  )}\n\n`;
};

module.exports = {
  getMarkDownAnchor,
  objectFromPairs,
  optimizeNodes,
  capitalize,
  prepTaggedData,
  makeExamples,
};
