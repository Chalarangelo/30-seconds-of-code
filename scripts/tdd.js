/*
  This is the tdd script that creates & updates your TDD environment .
  Run using `npm run tdd`.
*/

// Load modules
const fs = require('fs-extra'), path = require('path');
const child_process = require('child_process');
const chalk = require('chalk');
// Load helper functions (these are from existing snippets in 30 seconds of code!)
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
if(isTravisCI() && process.env['TRAVIS_EVENT_TYPE'] !== 'cron' && process.env['TRAVIS_EVENT_TYPE'] !== 'api') {
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
const snippetFilesArchive = fs.readdirSync(SNIPPETS_ARCHIVE, 'utf8').map(fileName => fileName.slice(0, -3));

snippetFiles.push(...snippetFilesActive);
snippetFiles.push(...snippetFilesArchive);


// Current Snippet that depend on node_modules
const errSnippets = ['JSONToFile', 'readFileLines', 'UUIDGeneratorNode'];
console.time('Tester');
snippetFiles
  .filter(fileName => !errSnippets.includes(fileName))
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
      .map(line => line.trim())
      .filter((_, i) => blockMarkers[0] < i && i < blockMarkers[1]);
    // Grab snippet example based on code markers
    const fileExample = fileCode
      .split('\n')
      .map(line => line.trim())
      .filter((_, i) => blockMarkers[2] < i && i < blockMarkers[3]);

    // Export template for snippetName.js which takes into account snippet name.length when generating snippetName.js file
    const exportFile = `module.exports = ${fileName} = ${fileFunction.join('\n').slice(9 + fileName.length)}`;

    // Export template for snippetName.test.js which generates a example test & other information
    const exportTest = [
      `const test = require('tape');`,
      `const ${fileName} = require('./${fileName}.js');`,
      `\ntest('Testing ${fileName}', (t) => {`,
      `\t//For more information on all the methods supported by tape\n\t//Please go to https://github.com/substack/tape`,
      `\tt.true(typeof ${fileName} === 'function', '${fileName} is a Function');`,
      `\t//t.deepEqual(${fileName}(args..), 'Expected');`,
      `\t//t.equal(${fileName}(args..), 'Expected');`,
      `\t//t.false(${fileName}(args..), 'Expected');`,
      `\t//t.throws(${fileName}(args..), 'Expected');`,
      `\tt.end();`,
      `});`
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
  child_process.execSync(`npm test >> ${TEST_PATH}/testlog`);
}
catch (e) {
  fs.appendFileSync(path.join(TEST_PATH,'testlog'));
}
console.timeEnd('Tester');
