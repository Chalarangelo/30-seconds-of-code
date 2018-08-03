/*
  Builds the `_30s` module.
*/
// Load modules
const fs = require('fs-extra');
const cp = require('child_process');
const path = require('path');
const chalk = require('chalk');
const util = require('./util');
if (
  util.isTravisCI() &&
  process.env['TRAVIS_EVENT_TYPE'] !== 'cron' &&
  process.env['TRAVIS_EVENT_TYPE'] !== 'api'
) {
  console.log(
    `${chalk.green('NOBUILD')} Module build terminated, not a cron job or a custom build!`
  );
  process.exit(0);
}
// Set variables for paths
const SNIPPETS_PATH = './snippets';
const TEMP_PATH = './temp';
const IMPORTS = './imports.js';
// Regex for selecting code blocks
const codeRE = /```\s*js([\s\S]*?)```/;
// Start the timer of the script
console.time('Packager');
// Load tag data from the database and snippets from their folder
try {
  const tagDatabase = fs.readFileSync('tag_database', 'utf8');
  const snippets = fs.readdirSync(SNIPPETS_PATH);
  // Create `temp` folder if it doesn't already exist.
  if (!fs.existsSync(TEMP_PATH)) {
    fs.mkdirSync(TEMP_PATH);
  }
  // Write `imports.js`
  fs.writeFileSync(IMPORTS, '');
  let exportStr = 'export default {';
  // Read all snippets and store them appropriately
  for (const snippet of snippets) {
    const snippetData = fs.readFileSync(path.join(SNIPPETS_PATH, snippet), 'utf8');
    const snippetName = snippet.replace('.md', '');
    // Check if a snippet is Node-only
    const isNodeSnippet = tagDatabase
      .slice(tagDatabase.indexOf(snippetName) + snippetName.length + 1)
      .split('\n')[0]
      .includes('node');
    // Read `imports.js` and write the data
    const importData = fs.readFileSync(IMPORTS);
    fs.writeFileSync(
      IMPORTS,
      importData + `\nimport { ${snippetName} } from './temp/${snippetName}.js'`
    );
    exportStr += `${snippetName},`;
    // Find the code in each snippet
    const code = snippetData.match(codeRE)[1].replace('\n', '');
    // Store the data to be written
    const toWrite = isNodeSnippet
      ? `${code
          .replace('const ' + snippetName, 'export const ' + snippetName)
          // Prevents errors from being thrown in browser environment
          .replace('require(', 'typeof require !== "undefined" && require(')}`
      : `export ${code}`;
    // Write data to the proper file
    fs.writeFileSync(`${TEMP_PATH}/${snippetName}.js`, toWrite);
  }
  // Write to the proper files and start the `rollup` script
  exportStr += '}';
  fs.appendFileSync(IMPORTS, `\n${exportStr}`);
  cp.execSync('node ./scripts/rollup.js');
  // Clean up temporary data
  fs.removeSync(TEMP_PATH);
  fs.unlink(IMPORTS);
  // Log a success message
  console.log(`${chalk.green('SUCCESS!')} Snippet module built!`);
  // Log the time taken
  console.timeEnd('Packager');
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During module creation: ${err}`);
  process.exit(1);
}
