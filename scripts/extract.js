/*
  This is the extractor script that generates the snippets.json and snippetsArchive.json files.
  Run using `npm run extractor`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const { green } = require('kleur');
const util = require('./util');
const config = require('../config');

// Paths
const SNIPPETS_PATH = `./${config.snippetPath}`;
const SNIPPETS_ARCHIVE_PATH = `./${config.snippetArchivePath}`;
const GLOSSARY_PATH = `./${config.glossaryPath}`;
const OUTPUT_PATH = `./${config.snippetDataPath}`;

// Terminate if parent commit is a Travis build
if (
  util.isTravisCI() &&
  /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])
) {
  console.log(
    `${green(
      'NOEXTRACT',
    )} Snippet extraction terminated, parent commit is a Travis build!`,
  );
  process.exit(0);
}

// Setup everything
let snippets = {},
  snippetsArray = [],
  archivedSnippets = {},
  archivedSnippetsArray = [],
  glossarySnippets = {},
  glossarySnippetsArray = [];
console.time('Extractor');

// Synchronously read all snippets from snippets, snippets_archive and glossary folders and sort them as necessary (case-insensitive)
snippets = util.readSnippets(SNIPPETS_PATH);
snippetsArray = Object.keys(snippets).reduce((acc, key) => {
  acc.push(snippets[key]);
  return acc;
}, []);

archivedSnippets = util.readSnippets(SNIPPETS_ARCHIVE_PATH);
archivedSnippetsArray = Object.keys(archivedSnippets).reduce((acc, key) => {
  acc.push(archivedSnippets[key]);
  return acc;
}, []);

glossarySnippets = util.readSnippets(GLOSSARY_PATH);
glossarySnippetsArray = Object.keys(glossarySnippets).reduce((acc, key) => {
  acc.push(glossarySnippets[key]);
  return acc;
}, []);

const completeData = {
  data: [...snippetsArray],
  meta: {
    specification: 'http://jsonapi.org/format/',
    type: 'snippetArray',
    scope: SNIPPETS_PATH,
    language: config.language
  },
};
const listingData = {
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
    scope: SNIPPETS_PATH,
    language: config.language
  },
};

const archiveCompleteData = {
  data: [...archivedSnippetsArray],
  meta: {
    specification: 'http://jsonapi.org/format/',
    type: 'snippetArray',
    scope: SNIPPETS_ARCHIVE_PATH,
    language: config.language
  }
};
const archiveListingData = {
  data: archiveCompleteData.data.map(v => ({
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
    scope: SNIPPETS_ARCHIVE_PATH,
    language: config.language
  },
};

const glossaryData = {
  data: glossarySnippetsArray.map(v => ({
    id: v.id,
    type: 'glossaryTerm',
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
    type: 'glossaryTermArray',
    scope: GLOSSARY_PATH,
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

fs.writeFileSync(
  path.join(OUTPUT_PATH, 'archivedSnippets.json'),
  JSON.stringify(archiveCompleteData, null, 2),
);
fs.writeFileSync(
  path.join(OUTPUT_PATH, 'archivedSnippetList.json'),
  JSON.stringify(archiveListingData, null, 2),
);

fs.writeFileSync(
  path.join(OUTPUT_PATH, 'glossaryTerms.json'),
  JSON.stringify(glossaryData, null, 2),
);

// Display messages and time
console.log(`${green('SUCCESS!')} JSON data files generated!`);
console.timeEnd('Extractor');
