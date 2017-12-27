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

const SNIPPETS_PATH = './snippets';

try {
  let jobCounter = 0;

  const snippetFilenames = fs.readdirSync(SNIPPETS_PATH);
  snippetFilenames.sort((a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // Read each file, get its code, write it to a temporary file, pass it through
  // semistandard, get the output from the file, update the original file.
  for (const snippet of snippetFilenames) {
    console.time(`Linter (${snippet})`);

    // Synchronously read data from the snippet, get the code, write it to a temporary file
    const snippetData = fs.readFileSync(path.join(SNIPPETS_PATH, snippet), 'utf8');
    const originalCode = snippetData.slice(
      snippetData.indexOf('```js') + 5,
      snippetData.lastIndexOf('```')
    );

    while (jobCounter >= 20) {
      setTimeout(() => {}, 5000);
    }

    fs.writeFileSync(`${snippet}.js`,`${originalCode}`);

    // Run semistandard and prettier asynchronously (only way this manages to run), get linted code
    // and write back to the original snippet file. Remove temporary file.
    // NOTE: adding `.temp` seems to not make it lint. Maybe because of .gitignore?
    // It shows an invisible icon next to it
    const cmd = `semistandard "${snippet}.js" --fix ` +
      `& prettier "${snippet}.js" --single-quote --print-width=100 --write "${snippet}.js"`

    cp.exec(cmd, {}, (error, stdOut, stdErr) => {
      jobCounter += 1;

      const lintedCode = fs.readFileSync(`${snippet}.js`, 'utf8');

      // Replace everything between ```js and ``` with the newly linted code
      fs.writeFile(
        path.join(SNIPPETS_PATH, snippet),
        `${snippetData.slice(0, snippetData.indexOf('```js') + 5) + '\n' + lintedCode + '```\n'}`
      );
      fs.unlink(`${snippet}.js`);

      console.log(`${chalk.green('SUCCESS!')} Linted snippet: ${snippet}`);
      console.timeEnd(`Linter (${snippet})`);

      jobCounter -= 1;
    });
  }
} catch (err) {  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During linting: ${err}`);
  process.exit(1);
}
