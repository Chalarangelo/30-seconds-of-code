/*
  Builds the `_30s` module.
*/
const fs = require('fs-extra');
const cp = require('child_process');
const path = require('path');
const chalk = require('chalk');

const SNIPPETS_PATH = './snippets';
const TEMP_PATH = './temp';
const IMPORTS = './imports.js';

const codeRE = /```\s*js([\s\S]*?)```/;

console.time('Module');

try {
  const tagDatabase = fs.readFileSync('tag_database', 'utf8');
  const snippets = fs.readdirSync(SNIPPETS_PATH);

  if (!fs.existsSync(TEMP_PATH)) {
    fs.mkdirSync(TEMP_PATH);
  }

  fs.writeFileSync(IMPORTS, '');

  let exportStr = 'export default {';

  for (const snippet of snippets) {
    const snippetData = fs.readFileSync(
      path.join(SNIPPETS_PATH, snippet),
      'utf8'
    );
    const snippetName = snippet.replace('.md', '');

    const isNodeSnippet = tagDatabase
      .slice(tagDatabase.indexOf(snippetName) + snippetName.length + 1)
      .split('\n')[0]
      .includes('node');

    const importData = fs.readFileSync(IMPORTS);
    fs.writeFileSync(
      IMPORTS,
      importData + `\nimport { ${snippetName} } from './temp/${snippetName}.js'`
    );
    exportStr += `${snippetName},`;

    const code = snippetData.match(codeRE)[1].replace('\n', '');

    const toWrite = isNodeSnippet
      ? `${code
          .replace('const ' + snippetName, 'export const ' + snippetName)
          // Prevents errors from being thrown in browser environment
          .replace('require(', 'typeof require !== "undefined" && require(')}`
      : `export ${code}`;

    fs.writeFileSync(`${TEMP_PATH}/${snippetName}.js`, toWrite);
  }

  exportStr += '}';

  fs.appendFileSync(IMPORTS, `\n${exportStr}`);

  cp.execSync('node ./scripts/rollup.js');

  fs.removeSync(TEMP_PATH);
  fs.unlink(IMPORTS);

  console.log(`${chalk.green('SUCCESS!')} Snippet module built!`);
  console.timeEnd('Module');
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During module creation: ${err}`);
  process.exit(1);
}
