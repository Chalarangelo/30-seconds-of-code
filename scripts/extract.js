/*
  This is the extractor script that generates the snippets.json file.
  Run using `npm run extractor`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const { green } = require('kleur');
const util = require('./util');
const config = require('../config');

// Paths (relative to package.json)
const SNIPPETS_PATH = `./${config.snippetPath}`;
const OUTPUT_PATH = `./${config.snippetDataPath}`;

// Check if running on Travis, only build for cron jobs and custom builds
if (
  util.isTravisCI() &&
  process.env['TRAVIS_EVENT_TYPE'] !== 'cron' &&
  process.env['TRAVIS_EVENT_TYPE'] !== 'api'
) {
  console.log(
    `${green(
      'NOBUILD',
    )} snippet extraction terminated, not a cron or api build!`,
  );
  process.exit(0);
}

// Setup everything
let snippets = {},
  snippetsArray = [];
console.time('Extractor');

// Synchronously read all snippets from snippets folder and sort them as necessary (case-insensitive)
snippets = util.readSnippets(SNIPPETS_PATH);
snippetsArray = Object.keys(snippets).reduce((acc, key) => {
  acc.push(snippets[key]);
  return acc;
}, []);

const completeData = {
  data: [...snippetsArray],
  meta: {
    specification: 'http://jsonapi.org/format/',
    type: 'snippetArray',
  },
};
let listingData = {
  data: completeData.data.map(v => ({
    id: v.id,
    type: 'snippetListing',
    title: v.title,
    attributes: {
      text: v.attributes.text,
      tags: v.attributes.tags,
    },
    meta: {
      hash: v.meta.hash,
    },
  })),
  meta: {
    specification: 'http://jsonapi.org/format/',
    type: 'snippetListingArray',
  },
};
// Write files
fs.writeFileSync(
  path.join(OUTPUT_PATH, 'snippets.json'),
  JSON.stringify(completeData, null, 2),
);
fs.writeFileSync(
  path.join(OUTPUT_PATH, 'snippetList.json'),
  JSON.stringify(listingData, null, 2),
);
// Display messages and time
console.log(
  `${green('SUCCESS!')} snippets.json and snippetList.json files generated!`,
);
console.timeEnd('Extractor');
