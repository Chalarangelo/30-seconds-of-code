/*
  This is the builder script that generates the README files.
  Run using `npm run builder`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const { green, red } = require('kleur');
const util = require('./util');
const markdown = require('markdown-builder');
const { headers, misc, lists } = markdown;
const config = require('../config');

// Paths
const SNIPPETS_PATH = `./${config.snippetPath}`;
const SNIPPETS_ARCHIVE_PATH = `./${config.snippetArchivePath}`;
const GLOSSARY_PATH = `./${config.glossaryPath}`;
const STATIC_PARTS_PATH = `./${config.staticPartsPath}`;

// Terminate if parent commit is a Travis build
if (
  util.isTravisCI() &&
  /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])
) {
  console.log(
    `${green(
      'NOBUILD',
    )} README build terminated, parent commit is a Travis build!`,
  );
  process.exit(0);
}

// Setup everything
let snippets = {},
  snippetsArray = [],
  startPart = '',
  endPart = '',
  output = '';
const EMOJIS = {
  adapter: '🔌',
  array: '📚',
  browser: '🌐',
  date: '⏱️',
  function: '🎛️',
  logic: '🔮',
  math: '➗',
  media: '📺',
  node: '📦',
  object: '🗃️',
  string: '📜',
  type: '📃',
  utility: '🔧'
};

console.time('Builder');

// Synchronously read all snippets from snippets folder and sort them as necessary (case-insensitive)
snippets = util.readSnippets(SNIPPETS_PATH);
snippetsArray = Object.keys(snippets).reduce((acc, key) => {
  acc.push(snippets[key]);
  return acc;
}, []);

// Load static parts for the README file
try {
  startPart = fs.readFileSync(
    path.join(STATIC_PARTS_PATH, 'README-start.md'),
    'utf8',
  );
  endPart = fs.readFileSync(
    path.join(STATIC_PARTS_PATH, 'README-end.md'),
    'utf8',
  );
} catch (err) {
  console.log(`${red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}

// Create the output for the README file
try {
  const tags = util.prepTaggedData(
    Object.keys(snippets).reduce((acc, key) => {
      acc[key] = snippets[key].attributes.tags;
      return acc;
    }, {}),
  );

  output += `${startPart}\n`;

  // Loop over tags and snippets to create the table of contents
  for (const tag of tags) {
    const capitalizedTag = util.capitalize(tag, true);
    const taggedSnippets = snippetsArray.filter(
      snippet => snippet.attributes.tags[0] === tag,
    );
    output += headers.h3((EMOJIS[tag] || '') + ' ' + capitalizedTag).trim();

    output +=
      misc.collapsible(
        'View contents',
        lists.ul(taggedSnippets, snippet =>
          misc.link(
            `\`${snippet.title}\``,
            `${misc.anchor(snippet.title)}${
            snippet.attributes.tags.includes('advanced') ? '-' : ''
            }`,
          ),
        ),
      ) + '\n';
  }

  for (const tag of tags) {
    const capitalizedTag = util.capitalize(tag, true);
    const taggedSnippets = snippetsArray.filter(
      snippet => snippet.attributes.tags[0] === tag,
    );

    output +=
      misc.hr() + headers.h2((EMOJIS[tag] || '') + ' ' + capitalizedTag) + '\n';

    for (let snippet of taggedSnippets) {
      if (snippet.attributes.tags.includes('advanced'))
        output +=
          headers.h3(
            snippet.title + ' ' + misc.image('advanced', '/advanced.svg'),
          ) + '\n';
      else output += headers.h3(snippet.title) + '\n';

      output += snippet.attributes.text;

      output += `\`\`\`${config.language.short}\n${snippet.attributes.codeBlocks.es6}\n\`\`\``;

      output += misc.collapsible(
        'Examples',
        `\`\`\`${config.language.short}\n${snippet.attributes.codeBlocks.example}\n\`\`\``,
      );

      output +=
        '\n<br>' + misc.link('⬆ Back to top', misc.anchor('Contents')) + '\n';
    }
  }

  // Add the ending static part
  output += `\n${endPart}\n`;
  // Write to the README file
  fs.writeFileSync('README.md', output);
} catch (err) {
  console.log(`${red('ERROR!')} During README generation: ${err}`);
  process.exit(1);
}

// Snippets archive README file
output = '';
archivedSnippets = util.readSnippets(SNIPPETS_ARCHIVE_PATH);
archivedSnippetsArray = Object.keys(archivedSnippets).reduce((acc, key) => {
  acc.push(archivedSnippets[key]);
  return acc;
}, []);

// Load static parts for the README file
try {
  startPart = fs.readFileSync(
    path.join(STATIC_PARTS_PATH, 'snippets_archive_README-start.md'),
    'utf8',
  );
} catch (err) {
  console.log(`${red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}

// Create the output for the README file
try {
  output += `${startPart}\n`;

  // Loop over tags and snippets to create the table of contents
  output += lists.ul(archivedSnippetsArray, snippet =>
    misc.link(
      `\`${snippet.title}\``,
      `${misc.anchor(snippet.title)}`,
    ),
  );

  for (let snippet of archivedSnippetsArray) {
    output += headers.h3(snippet.title) + '\n';

    output += snippet.attributes.text;

    output += `\`\`\`${config.language.short}\n${snippet.attributes.codeBlocks.es6}\n\`\`\``;

    output += misc.collapsible(
      'Examples',
      `\`\`\`${config.language.short}\n${snippet.attributes.codeBlocks.example}\n\`\`\``,
    );

    output +=
      '\n<br>' + misc.link('⬆ Back to top', misc.anchor('Contents')) + '\n';
  }
  // Write to the README file
  fs.writeFileSync(path.join(SNIPPETS_ARCHIVE_PATH, 'README.md'), output);
} catch (err) {
  console.log(`${red('ERROR!')} During README generation: ${err}`);
  process.exit(1);
}

// Glossary README file
output = '';
glossarySnippets = util.readSnippets(GLOSSARY_PATH);
glossarySnippetsArray = Object.keys(glossarySnippets).reduce((acc, key) => {
  acc.push(glossarySnippets[key]);
  return acc;
}, []);

// Load static parts for the README file
try {
  startPart = fs.readFileSync(
    path.join(STATIC_PARTS_PATH, 'glossary_README-start.md'),
    'utf8',
  );
} catch (err) {
  console.log(`${red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}

// Create the output for the README file
try {
  output += `${startPart}\n`;

  // Loop over tags and snippets to create the table of contents
  output += lists.ul(glossarySnippetsArray, snippet =>
    misc.link(
      `\`${snippet.title}\``,
      `${misc.anchor(snippet.title)}`,
    ),
  );

  for (let snippet of glossarySnippetsArray) {
    output += headers.h3(snippet.title) + '\n';

    output += snippet.attributes.text;

    output +=
      '\n<br>' + misc.link('⬆ Back to top', misc.anchor('Contents')) + '\n';
  }
  // Write to the README file
  fs.writeFileSync(path.join(GLOSSARY_PATH, 'README.md'), output);
} catch (err) {
  console.log(`${red('ERROR!')} During README generation: ${err}`);
  process.exit(1);
}

console.log(`${green('SUCCESS!')} README files generated!`);
console.timeEnd('Builder');