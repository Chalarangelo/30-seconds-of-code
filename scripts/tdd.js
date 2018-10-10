/*
  This is the tdd script that creates & updates your TDD environment .
  Run using `npm run tdd`.
*/

// Load modules
const fs = require('fs-extra'),
  path = require('path');
const childProcess = require('child_process');
const chalk = require('chalk');
const util = require('./util');
if (util.isTravisCI() && util.isNotTravisCronOrAPI()) {
  console.log(`${chalk.green('NOBUILD')} Testing terminated, not a cron job or a custom build!`);
  process.exit(0);
}
// Declare paths
const SNIPPETS_PATH = './snippets';
const SNIPPETS_ARCHIVE_PATH = './snippets_archive';
const TEST_PATH = './test';

console.time('Tester');
try {
  // Read snippets, archive and tests, find which tests are not defined
  const snippets = fs.readdirSync(SNIPPETS_PATH).map(v => v.replace('.md', ''));
  const archivedSnippets = fs.readdirSync(SNIPPETS_ARCHIVE_PATH).filter(v => v !== 'README.md').map(v => v.replace('.md', ''));
  const definedTests = fs.readdirSync(TEST_PATH).map(v => v.replace('.test.js', '')).filter(v => v !== '_30s.js' && v !== 'testlog');
  const undefinedTests = [...snippets, ...archivedSnippets].filter(v => !definedTests.includes(v));
  const orphanedTests = [...definedTests.filter(v => ![...snippets, ...archivedSnippets].includes(v))];
  orphanedTests.forEach(snippet => {
    console.log(`${chalk.yellow('WARNING!')} Orphaned test: ${snippet}`);
  })
  // Create files for undefined tests
  undefinedTests.forEach(snippet => {
    const exportTest = [
      `const expect = require('expect');`,
      `const {${snippet}} = require('._30s.js');`,
      `\ntest('${snippet} is a Function', () => {`,
      `  expect(${snippet}).toBeInstanceOf(Function);`,
      `});\n`
    ].join('\n');
    fs.writeFileSync(path.join(TEST_PATH, `${snippet}.test.js`), exportTest);
  });
  // Run tests
  fs.writeFileSync(path.join(TEST_PATH, 'testlog'), `Test log for: ${new Date().toString()}\n`);
  childProcess.execSync('npm test');
  console.log(`${chalk.green('SUCCESS!')} All tests ran successfully!`);
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During test runs: ${err}`);
  process.exit(1);
}
console.timeEnd('Tester');