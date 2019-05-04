const fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk'),
  crypto = require('crypto');
const babel = require('@babel/core');

const getMarkDownAnchor = paragraphTitle =>
  paragraphTitle
    .trim()
    .toLowerCase()
    .replace(/[^\w\- ]+/g, '')
    .replace(/\s/g, '-')
    .replace(/\-+$/, '');

const getFilesInDir = (directoryPath, withPath, exclude = null) => {
  try {
    let directoryFilenames = fs.readdirSync(directoryPath);
    directoryFilenames.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    if (withPath) {
      // a hacky way to do conditional array.map
      return directoryFilenames.reduce((fileNames, fileName) => {
        if (exclude == null || !exclude.some(toExclude => fileName === toExclude))
          fileNames.push(`${directoryPath}/${fileName}`);
        return fileNames;
      }, []);
    }
    return directoryFilenames;
  } catch (err) {
    console.log(`${chalk.red('ERROR!')} During snippet loading: ${err}`);
    process.exit(1);
  }
};

// Synchronously read all snippets and sort them as necessary (case-insensitive)
const readSnippets = snippetsPath => {
  const snippetFilenames = getFilesInDir(snippetsPath, false);

  let snippets = {};
  try {
    for (let snippet of snippetFilenames)
      snippets[snippet] = fs.readFileSync(path.join(snippetsPath, snippet), 'utf8');
  } catch (err) {
    console.log(`${chalk.red('ERROR!')} During snippet loading: ${err}`);
    process.exit(1);
  }
  return snippets;
};
// Creates an object from pairs
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
// Load tag data from the database
const readTags = () => {
  let tagDbData = {};
  try {
    tagDbData = objectFromPairs(
      fs
        .readFileSync('tag_database', 'utf8')
        .split('\n')
        .filter(v => v.trim() !== '')
        .map(v => {
          let data = v.split(':').slice(0, 2);
          data[1] = data[1].split(',').map(t => t.trim());
          return data;
        })
    );
  } catch (err) {
    // Handle errors (hopefully not!)
    console.log(`${chalk.red('ERROR!')} During tag database loading: ${err}`);
    process.exit(1);
  }
  return tagDbData;
};
// Optimizes nodes in an HTML document
const optimizeNodes = (data, regexp, replacer) => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null)
      ++count;

  } while (count > 0);
  return output;
};
// Randomizes the order of the values of an array, returning a new array.
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
// Capitalizes the first letter of a string
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// Checks if current environment is Travis CI
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
const isTravisCronOrAPI = () =>
  process.env['TRAVIS_EVENT_TYPE'] === 'cron' || process.env['TRAVIS_EVENT_TYPE'] === 'api';
const isNotTravisCronOrAPI = () => !isTravisCronOrAPI();
// Creates a hash for a value using the SHA-256 algorithm.
const hashData = val =>
  crypto
    .createHash('sha256')
    .update(val)
    .digest('hex');
// Gets the code blocks for a snippet file.
const getCodeBlocks = str => {
  const regex = /```[.\S\s]*?```/g;
  let results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex)
      regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  results = results.map(v => v.replace(/```js([\s\S]*?)```/g, '$1').trim());
  return {
    es6: results[0],
    es5: babel.transformSync(results[0], { presets: ['@babel/preset-env'] }).code.replace('"use strict";\n\n', ''),
    example: results[1]
  };
};
// Gets the textual content for a snippet file.
const getTextualContent = str => {
  const regex = /###.*\n*([\s\S]*?)```/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex)
      regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  return results[1];
};
const prepTaggedData = tagDbData =>
  [...new Set(Object.entries(tagDbData).map(t => t[1][0]))]
    .filter(v => v)
    .sort(
      (a, b) =>
        capitalize(a, true) === 'Uncategorized'
          ? 1
          : capitalize(b, true) === 'Uncategorized'
            ? -1
            : a.localeCompare(b)
    );
module.exports = {
  getMarkDownAnchor,
  getFilesInDir,
  readSnippets,
  readTags,
  optimizeNodes,
  capitalize,
  objectFromPairs,
  isTravisCI,
  hashData,
  shuffle,
  getCodeBlocks,
  getTextualContent,
  isTravisCronOrAPI,
  isNotTravisCronOrAPI,
  prepTaggedData
};
