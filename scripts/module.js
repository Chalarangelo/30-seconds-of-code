/*
  Builds the `Snippet` module.
*/
const fs = require('fs-extra');
const cp = require('child_process');
const path = require('path');
const chalk = require('chalk');

const SNIPPETS_PATH = './snippets';
const TEMP_PATH = './temp';
const IMPORTS = './imports.js';

const codeRE = /```\s*js([\s\S]*?)```/;

const tagDatabase = fs.readFileSync('tag_database', 'utf8');

console.time('Module');

try {
  const snippets = fs.readdirSync(SNIPPETS_PATH);

  if (!fs.existsSync(TEMP_PATH)) {
    fs.mkdirSync(TEMP_PATH);
  }

  fs.writeFileSync(IMPORTS, '');

  let exportStr = 'export default {';

  for (const snippet of snippets) {
    const snippetData = fs.readFileSync(path.join(SNIPPETS_PATH, snippet), 'utf8');
    const snippetName = snippet.replace('.md', '');

    const isNodeSnippet = tagDatabase
      .slice(tagDatabase.indexOf(snippetName) + snippetName.length + 1)
      .split('\n')[0]
      .includes('node');

    if (!isNodeSnippet) {
      const importData = fs.readFileSync(IMPORTS);
      fs.writeFileSync(
        IMPORTS,
        importData + `\nimport { ${snippetName} } from './temp/${snippetName}.js'`
      );
      exportStr += `${snippetName},`;

      fs.writeFileSync(
        `${TEMP_PATH}/${snippetName}.js`,
        'export ' + snippetData.match(codeRE)[1].replace('\n', '')
      );
    }
  }

  exportStr += '}';

  const importData = fs.readFileSync(IMPORTS);
  fs.writeFileSync(IMPORTS, importData + `\n${exportStr}`);

  cp.execSync('rollup -c scripts/rollup.js');

  fs.removeSync(TEMP_PATH);
  fs.unlink(IMPORTS);

  console.log(`${chalk.green('SUCCESS!')} Snippet module built!`);
  console.timeEnd('Module');
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During module creation: ${err}`);
  process.exit(1);
}
