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
}
module.exports = {readSnippets};
