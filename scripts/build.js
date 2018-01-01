/*
  This is the builder script that generates the README file.
  Run using `npm run builder`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const SNIPPETS_PATH = './snippets';
const STATIC_PARTS_PATH = './static-parts';

const snippets = {};
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
  utility: '🔧'
};

let startPart = '',
  endPart = '',
  output = '',
  tagDbData = {};

// Load helper functions (these are from existing snippets in 30 seconds of code!)
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));

console.time('Builder');

// Synchronously read all snippets and sort them as necessary (case-insensitive)
try {
  const snippetFilenames = fs
    .readdirSync(SNIPPETS_PATH)
    .sort((a, b) => a.toLowerCase() - b.toLowerCase());
  // Store the data read from each snippet in the appropriate object
  for (const name of snippetFilenames) {
    snippets[name] = fs.readFileSync(path.join(SNIPPETS_PATH, name), 'utf8');
  }
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During snippet loading: ${err}`);
  process.exit(1);
}

// Load static parts for the README file
try {
  startPart = fs.readFileSync(path.join(STATIC_PARTS_PATH, 'README-start.md'), 'utf8');
  endPart = fs.readFileSync(path.join(STATIC_PARTS_PATH, 'README-end.md'), 'utf8');
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}

// Load tag data from the database
try {
  tagDbData = objectFromPairs(
    fs
      .readFileSync('tag_database', 'utf8')
      .split('\n')
      .slice(0, -1)
      .map(v => v.split(':').slice(0, 2))
  );
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During tag database loading: ${err}`);
  process.exit(1);
}

// Create the output for the README file
try {
  const tags = [
    ...new Set(
      Object.entries(tagDbData)
        .map(t => t[1])
        .filter(v => v)
        .sort((a, b) => a.localeCompare(b))
    )
  ];

  // Add the start static part
  output += `${startPart + '\n'}`;
  let uncategorizedOutput = '';

  // Loop over tags and snippets to create the table of contents
  for (const tag of tags) {
    const capitalizedTag = capitalize(tag, true);

    if (capitalizedTag === 'Uncategorized') {
      uncategorizedOutput += `### _${capitalizedTag}_\n\n<details>\n<summary>View contents</summary>\n\n`;
      for (const taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag)) {
        uncategorizedOutput += `* [\`${taggedSnippet[0]}\`](#${taggedSnippet[0].toLowerCase()})\n`;
      }
      uncategorizedOutput += '\n</details>\n\n';
    } else {
      output += `### ${
        EMOJIS[tag] || ''
      } ${capitalizedTag}\n\n<details>\n<summary>View contents</summary>\n\n`;
      for (const taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag)) {
        output += `* [\`${taggedSnippet[0]}\`](#${taggedSnippet[0].toLowerCase()})\n`;
      }
      output += '\n</details>\n\n';
    }
  }

  output += uncategorizedOutput;
  uncategorizedOutput = '';

  // Loop over tags and snippets to create the list of snippets
  for (const tag of tags) {
    const capitalizedTag = capitalize(tag, true);

    if (capitalizedTag == 'Uncategorized') {
      uncategorizedOutput += `---\n ## _${capitalizedTag}_\n`;
      for (const taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag)) {
        uncategorizedOutput += `\n${snippets[taggedSnippet[0] + '.md'] +
          '\n<br>[⬆ back to top](#table-of-contents)\n\n'}`;
      }
    } else {
      output += `---\n ## ${EMOJIS[tag] || ''} ${capitalizedTag}\n`;
      for (const taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag)) {
        let data = snippets[taggedSnippet[0] + '.md'];
        data =
          data.slice(0, data.lastIndexOf('```js')) +
          '<details>\n<summary>Examples</summary>\n\n' +
          data.slice(data.lastIndexOf('```js'), data.lastIndexOf('```')) +
          data.slice(data.lastIndexOf('```')) +
          '\n</details>\n';
        output += `\n${data + '\n<br>[⬆ Back to top](#table-of-contents)\n\n'}`;
      }
    }
  }

  output += uncategorizedOutput;
  // Add the ending static part
  output += `\n${endPart + '\n'}`;
  // Write to the README file
  fs.writeFileSync('README.md', output);
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During README generation: ${err}`);
  process.exit(1);
}

console.log(`${chalk.green('SUCCESS!')} README file generated!`);
console.timeEnd('Builder');
