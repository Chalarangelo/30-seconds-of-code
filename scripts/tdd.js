/*
  This is the tdd script that creates & updates your TDD environment .
  Run using `npm run tdd`.
*/

// Load modules
const fs = require('fs-extra'), path = require('path');
const childProcess = require('child_process');
const chalk = require('chalk');
const util = require('./util');
if(util.isTravisCI() && process.env['TRAVIS_EVENT_TYPE'] !== 'cron' && process.env['TRAVIS_EVENT_TYPE'] !== 'api') {
  console.log(`${chalk.green('NOBUILD')} Testing terminated, not a cron job or a custom build!`);
  process.exit(0);
}
// Declare paths
const SNIPPETS_ACTIVE = './snippets';
const SNIPPETS_ARCHIVE = './snippets_archive';
const TEST_PATH = './test';

// Array of snippet names
const snippetFiles = [];

const snippetFilesActive = fs.readdirSync(SNIPPETS_ACTIVE, 'utf8').map(fileName => fileName.slice(0, -3));
const snippetFilesArchive = fs.readdirSync(SNIPPETS_ARCHIVE, 'utf8')
  .filter(fileName => !fileName.includes('README')) // -> Filters out main README.md file in Archieve which isn't a snippet
  .map(fileName => fileName.slice(0, -3));

snippetFiles.push(...snippetFilesActive);
snippetFiles.push(...snippetFilesArchive);

console.time('Tester');
snippetFiles
  .map(fileName => {
    // Check if fileName for snippet exist in test/ dir, if doesnt create
    fs.ensureDirSync(path.join(TEST_PATH,fileName));

    // return fileName for later use
    return fileName;
  })
  .map(fileName => {
    const activeOrArchive = snippetFilesActive.includes(fileName) ? SNIPPETS_ACTIVE : SNIPPETS_ARCHIVE;
    // Grab snippetData
    const fileData = fs.readFileSync(path.join(activeOrArchive,`${fileName}.md`), 'utf8');
    // Grab snippet Code blocks
    const fileCode = fileData.slice(fileData.search(/```\s*js/i), fileData.lastIndexOf('```') + 3);
    // Split code based on code markers
    const blockMarkers = fileCode
      .split('\n')
      .map((line, lineIndex) => (line.slice(0, 3) === '```' ? lineIndex : '//CLEAR//'))
      .filter(x => !(x === '//CLEAR//'));
    // Grab snippet function based on code markers
    const fileFunction = fileCode
      .split('\n')
      .map(line => line)
      .filter((_, i) => blockMarkers[0] < i && i < blockMarkers[1]);
    // Grab snippet example based on code markers
    const fileExample = fileCode
      .split('\n')
      .map(line => line)
      .filter((_, i) => blockMarkers[2] < i && i < blockMarkers[3]);

    // Export template for snippetName.js
    const exportFile = `${fileFunction.join('\n')}\nmodule.exports = ${fileName};\n`;

    // Export template for snippetName.test.js which generates a example test & other information
    const exportTest = [
      `const expect = require('expect');`,
      `const ${fileName} = require('./${fileName}.js');`,
      `\ntest('${fileName} is a Function', () => {`,
      `  expect(${fileName}).toBeInstanceOf(Function);`,
      `});\n`
    ].join('\n');

    // Write/Update exportFile which is snippetName.js in respective dir
    fs.writeFileSync(path.join(TEST_PATH,fileName,`${fileName}.js`), exportFile);

    if ( !fs.existsSync(path.join(TEST_PATH,fileName,`${fileName}.test.js`)) ) {
      // if snippetName.test.js doesn't exist inrespective dir exportTest
      fs.writeFileSync(`${TEST_PATH}/${fileName}/${fileName}.test.js`, exportTest);
    }

    // return fileName for later use
    return fileName;
  });
try {
  fs.writeFileSync(path.join(TEST_PATH,'testlog'),`Test log for: ${new Date().toString()}\n`);
  childProcess.execSync(`npm test`);
}
catch (e) {
  fs.appendFileSync(path.join(TEST_PATH,'testlog'));
}
console.timeEnd('Tester');
