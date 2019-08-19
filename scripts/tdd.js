/*
  This is the tdd script that creates & updates your TDD environment .
  Run using `npm run tdd`.
*/

// Load modules
const fs = require('fs-extra'),
  path = require('path');
const childProcess = require('child_process');
const { green, yellow, red } = require('kleur');
const util = require('./util');
const config = require('../config');
// Declare paths
const SNIPPETS_PATH = `./${config.snippetPath}`;
const SNIPPETS_ARCHIVE_PATH = `./${config.snippetArchivePath}`;
const TEST_PATH = `./${config.testPath}`;

console.time('Tester');
try {
  // Read snippets, archive and tests, find which tests are not defined
  const snippets = fs.readdirSync(SNIPPETS_PATH).map(v => v.replace('.md', ''));
  const archivedSnippets = fs.readdirSync(SNIPPETS_ARCHIVE_PATH).filter(v => v !== 'README.md').map(v => v.replace('.md', ''));
  const definedTests = fs.readdirSync(TEST_PATH).map(v => v.replace('.test.js', '')).filter(v => v !== '_30s.js' && v !== 'testlog');
  const undefinedTests = [...snippets, ...archivedSnippets].filter(v => !definedTests.includes(v));
  const orphanedTests = [...definedTests.filter(v => ![...snippets, ...archivedSnippets].includes(v))];
  orphanedTests.forEach(snippet => {
    console.log(`${yellow('WARNING!')} Orphaned test: ${snippet}`);
  });
  // Create files for undefined tests
  undefinedTests.forEach(snippet => {
    const exportTest = [
      `const {${snippet}} = require('./_30s.js');`,
      `\ntest('${snippet} is a Function', () => {`,
      `  expect(${snippet}).toBeInstanceOf(Function);`,
      `});\n`
    ].join('\n');
    fs.writeFileSync(path.join(TEST_PATH, `${snippet}.test.js`), exportTest);
  });
  // Run tests
  if (util.isTravisCI()) {
    process.exit(0);
  }
  else {
    childProcess.execSync('npm test', { stdio: 'inherit' });
  }
  console.log(`${green('SUCCESS!')} All tests ran successfully!`);
} catch (err) {
  console.log(`${red('ERROR!')} During test runs: ${err}`);
  process.exit(1);
}
console.timeEnd('Tester');
