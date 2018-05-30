/*
  This is the extractor script that generates the snippets.json and snippetsArchive.json files.
  Run using `npm run extractor`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const util = require('./util');
// Paths
const SNIPPETS_PATH = './snippets';
const SNIPPETS_ARCHIVE_PATH = './snippets_archive';
const OUTPUT_PATH = './snippet_data';
// Check if running on Travis - only build for cron jobs and custom builds
if(util.isTravisCI() && process.env['TRAVIS_EVENT_TYPE'] !== 'cron' && process.env['TRAVIS_EVENT_TYPE'] !== 'api') {
  console.log(`${chalk.green('NOBUILD')} snippet extraction terminated, not a cron or api build!`);
  process.exit(0);
}
// Read data
let snippets = {}, archivedSnippets = {}, tagDbData = {};
console.time('Extractor');
snippets = util.readSnippets(SNIPPETS_PATH);
archivedSnippets = util.readSnippets(SNIPPETS_ARCHIVE_PATH);
tagDbData = util.readTags();
// Extract snippet data
let snippetData = {
  data: Object.keys(snippets).map(key => {
    return {
      id: key.slice(0,-3),
      type: 'snippet',
      attributes: {
        fileName: key,
        text: util.getTextualContent(snippets[key]).trim(),
        codeBlocks: util.getCodeBlocks(snippets[key]).map(v => v.replace(/```js([\s\S]*?)```/g, '$1').trim()),
        tags: tagDbData[key.slice(0,-3)]
      },
      meta: {
        archived: false,
        hash: util.hashData(snippets[key])
      }
    };
  }),
  meta: {
    specification: 'http://jsonapi.org/format/'
  }
};
// Extract archived snippet data
let snippetArchiveData = {
  data: Object.keys(archivedSnippets).map(key => {
    return {
      id: key.slice(0,-3),
      type: 'snippet',
      attributes: {
        fileName: key,
        text: util.getTextualContent(archivedSnippets[key]).trim(),
        codeBlocks: util.getCodeBlocks(archivedSnippets[key]).map(v => v.replace(/```js([\s\S]*?)```/g, '$1').trim()),
        tags: []
      },
      meta: {
        archived: true,
        hash: util.hashData(archivedSnippets[key])
      }
    };
  }),
  meta: {
    specification: 'http://jsonapi.org/format/'
  }
};
// Write files
fs.writeFileSync(path.join(OUTPUT_PATH, 'snippets.json'), JSON.stringify(snippetData, null, 2));
fs.writeFileSync(path.join(OUTPUT_PATH, 'snippetsArchive.json'), JSON.stringify(snippetArchiveData, null, 2));
// Display messages and time
console.log(`${chalk.green('SUCCESS!')} snippets.json and snippetsArchive.json files generated!`);
console.timeEnd('Extractor');
