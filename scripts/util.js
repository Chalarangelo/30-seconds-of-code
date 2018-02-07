const fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk');
// Synchronously read all snippets and sort them as necessary (case-insensitive)
const readSnippets = snippetsPath => {
  let snippets = {};
  try {
    let snippetFilenames = fs.readdirSync(snippetsPath);
    snippetFilenames.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    // Store the data read from each snippet in the appropriate object
    for (let snippet of snippetFilenames)
      snippets[snippet] = fs.readFileSync(path.join(snippetsPath, snippet), 'utf8');
  } catch (err) {
    // Handle errors (hopefully not!)
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
        .slice(0, -1)
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
    while (regexp.exec(output) !== null) {
      ++count;
    }
  } while (count > 0);
  return output;
};
// Capitalizes the first letter of a string
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// Checks if current environment is Travis CI
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
module.exports = {readSnippets, readTags, optimizeNodes, capitalize, objectFromPairs, isTravisCI};
