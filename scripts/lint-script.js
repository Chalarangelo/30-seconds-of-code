/*
  This is the linter script that lints snippets.
  Run using `npm run linter`.
*/
// Load modules
const fs = require('fs-extra'), cp = require('child_process'), path = require('path'), chalk = require('chalk');
// Set variables for paths
var snippetsPath = './snippets';
// Read files, lint each one individually and update
try {
  let snippetFilenames = fs.readdirSync(snippetsPath);
  snippetFilenames.sort((a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  // Read each file, get its code, write it to a temporary file, pass it through
  // semistandard, get the output from the file, update the original file.
  for(let snippet of snippetFilenames){
    // Start a timer for the file
    console.time(`Linter (${snippet})`);
    // Synchronously read data from the snippet, get the code, write it to a temporary file
    let snippetData = fs.readFileSync(path.join(snippetsPath,snippet),'utf8');
    let originalCode = snippetData.slice(snippetData.indexOf('```js')+5,snippetData.lastIndexOf('```'));
    fs.writeFileSync(`${snippet}.temp.js`,`${originalCode}`);
    // Run semistandard asynchronously (only way this manages to run), get linted code
    // and write back to the original snippet file. Remove temporary file
    cp.exec(`semistandard "${snippet}.temp.js" --fix`,{},(error, stdOut, stdErr) => {
      let lintedCode = fs.readFileSync(`${snippet}.temp.js`,'utf8');
      fs.writeFile(path.join(snippetsPath,snippet), `${snippetData.slice(0, snippetData.indexOf('```js')+5)+lintedCode+'```\n'}`);
      fs.unlink(`${snippet}.temp.js`);
      // Log a success message
      console.log(`${chalk.green('SUCCESS!')} Linted snippet: ${snippet}`);
      // Log the time taken for the file
      console.timeEnd(`Linter (${snippet})`);
    });
  }
}
catch (err){  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During linting: ${err}`);
  process.exit(1);
}
