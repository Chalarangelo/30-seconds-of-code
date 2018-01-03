/*
  This is the tdd script that creates & updates your TDD environment .
  Run using `npm run tagger`.
*/

// Load modules
const fs = require('fs-extra');

// Declare paths
const SNIPPETS_PATH = './snippets';
const TEST_PATH = './test';

// Array of snippet names
const snippetFiles = fs.readdirSync(SNIPPETS_PATH, 'utf8').map(fileName => fileName.slice(0, -3));

// Current Snippet that depend on node_modules
const errSnippets = ['JSONToFile', 'readFileLines', 'UUIDGeneratorNode'];

snippetFiles
  .filter(fileName => !errSnippets.includes(fileName))
  .map(fileName => {
    // Check if fileName for snippet exist in test/ dir, if doesnt create
    fs.ensureDirSync(`${TEST_PATH}/${fileName}`);

    // return fileName for later use
    return fileName;
  })
  .map(fileName => {
    // Grab snippetData
    const fileData = fs.readFileSync(`${SNIPPETS_PATH}/${fileName}.md`, 'utf8');
    // Grab snippet Code blocks
    const fileCode = fileData.slice(fileData.indexOf('```js'), fileData.lastIndexOf('```') + 3);
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
    const exportFile = `module.exports = ${fileFunction.join('\n').slice(9 + fileName.length)}`;

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
    fs.writeFileSync(`${TEST_PATH}/${fileName}/${fileName}.js`, exportFile);

    if ( !fs.existsSync(`${TEST_PATH}/${fileName}/${fileName}.test.js`) ) {
      // if snippetName.test.js doesn't exist inrespective dir exportTest 
      fs.writeFileSync(`${TEST_PATH}/${fileName}/${fileName}.test.js`, exportTest);
    }

    // return fileName for later use
    return fileName;
  });
  