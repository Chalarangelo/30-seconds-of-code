#!/usr/bin/env node --harmony
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const argv = require('minimist')(process.argv.slice(2)); // eslint-disable-line import/no-extraneous-dependencies
const jscodeshiftJSON = require('jscodeshift/package.json'); // eslint-disable-line import/no-extraneous-dependencies

const ruleBoilerplateGenerator = require('./boilerplate/rule');
const testBoilerplateGenerator = require('./boilerplate/test');
const docBoilerplateGenerator = require('./boilerplate/doc');

const ruleName = argv._[0];
const author = argv.author || '$AUTHOR';
const description = argv.description || '$DESCRIPTION';

const rulePath = path.resolve(`src/rules/${ruleName}.js`);
const testPath = path.resolve(`__tests__/src/rules/${ruleName}-test.js`);
const docsPath = path.resolve(`docs/rules/${ruleName}.md`);

const jscodeshiftMain = jscodeshiftJSON.main;
const jscodeshiftPath = require.resolve('jscodeshift');
const jscodeshiftRoot = jscodeshiftPath.slice(0, jscodeshiftPath.indexOf(jscodeshiftMain));

// Validate
if (!ruleName) {
  throw new Error('Rule name is required');
} else if (fs.existsSync(rulePath)) {
  throw new Error('Rule already exists!');
}

// Generate file boilerplate
const ruleBoilerplate = ruleBoilerplateGenerator(author, description);
const testBoilerplate = testBoilerplateGenerator(ruleName, author, description);
const docBoilerplate = docBoilerplateGenerator(ruleName);

// Create new files
fs.writeFileSync(rulePath, ruleBoilerplate);
fs.writeFileSync(testPath, testBoilerplate);
fs.writeFileSync(docsPath, docBoilerplate);

// Add the rule to the index
exec(
  [
    path.join(jscodeshiftRoot, jscodeshiftJSON.bin.jscodeshift),
    './src/index.js',
    '-t ./scripts/addRuleToIndex.js',
    '--extensions js',
    '--parser flow',
    `--ruleName=${ruleName}`,
    `--rulePath=${rulePath}`,
  ].join(' '),
  (error) => {
    if (error) {
      console.error(`exec error: ${error}`); // eslint-disable-line no-console
    }
  },
);
