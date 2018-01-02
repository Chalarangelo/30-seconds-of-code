/*
  This is the linter script that lints snippets.
  Run using `npm run linter`.
  You might have to run
  `npm i -g semistandard && npm i -g prettier`
  for this script to run properly.
*/
const fs = require('fs-extra');
const cp = require('child_process');
const path = require('path');
const chalk = require('chalk');
// Load helper functions (these are from existing snippets in 30 seconds of code!)
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
if(isTravisCI() && /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])) {
  console.log(`${chalk.green('NOBUILD')} Linting terminated, parent commit is a Travis build!`);
  process.exit(0);
}
const SNIPPETS_PATH = './snippets';
const TEMP_PATH = './temp';

const codeRE = /```\s*js([\s\S]*?)```/g;

console.time('Linter');

try {
  const snippets = fs
    .readdirSync(SNIPPETS_PATH)
    .sort((a, b) => a.toLowerCase() - b.toLowerCase())
    // turn it into an object so we can add data to it to be used in a different scope
    .map(name => ({ name }));

  if (!fs.existsSync(TEMP_PATH)) {
    fs.mkdirSync(TEMP_PATH);
  }

  for (const snippet of snippets) {
    snippet.data = fs.readFileSync(path.join(SNIPPETS_PATH, snippet.name), 'utf8');
    snippet.tempNames = [];
    snippet.code = [];

    let match = codeRE.exec(snippet.data);
    // make a counter so we write the definition + example code blocks to different files
    let counter = 0;
    while (match) {
      snippet.code.push(match[1]); // capture group
      snippet.tempNames.push(snippet.name.replace('.md', counter++));
      match = codeRE.exec(snippet.data);
    }

    snippet.code.forEach((str, i) => {
      fs.writeFileSync(`${TEMP_PATH}/${snippet.tempNames[i]}.js`, str);
    });
  }

  const cmd =
    `semistandard "${TEMP_PATH}" --fix & ` +
    `prettier "${TEMP_PATH}/*.js" --single-quote --print-width=100 --write`;

  cp.exec(cmd, {}, (err, stdout, stderr) => {
    // Loop through each snippet now that semistandard and prettier did their job
    for (const snippet of snippets) {
      // an array to store each linted code block (definition + example)
      const lintedCode = [];

      for (const tempName of snippet.tempNames) {
        lintedCode.push(fs.readFileSync(`${TEMP_PATH}/${tempName}.js`, 'utf8'));
        fs.unlink(`${TEMP_PATH}/${tempName}.js`);
      }

      // We replace each ```js ``` code block with the newly linted code
      let index = 0;
      snippet.data = snippet.data.replace(codeRE, () => '```js\n' + lintedCode[index++] + '```');

      fs.writeFileSync(path.join(SNIPPETS_PATH, snippet.name), snippet.data);
    }

    fs.removeSync(TEMP_PATH);
    console.log(`${chalk.green('SUCCESS!')} Snippet files linted!`);
    console.timeEnd('Linter');
  });
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During linting: ${err}`);
  process.exit(1);
}
