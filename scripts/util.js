const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const SNIPPETS_PATH = './snippets';

const attempt = (task, cb) => {
  try {
    return cb();
  } catch (e) {
    console.log(`${chalk.red('ERROR!')} During ${task}: ${e}`);
    process.exit(1);
    return null;
  }
};

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

const readSnippets = () =>
  attempt('read snippets', () =>
    fs
      .readdirSync(SNIPPETS_PATH)
      .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
      .reduce((acc, name) => {
        acc[name] = fs.readFileSync(path.join(SNIPPETS_PATH, name), 'utf8').replace(/\r\n/g, '\n');
        return acc;
      }, {})
  );

const getCodeBlocks = str => {
  const regex = /```[.\S\s]*?```/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }
    m.forEach(match => results.push(match));
  }
  return results;
};

const getSection = (searchString, contents, includeSubsections = true) => {
  const indexOfSearch = contents.indexOf(searchString);
  if (indexOfSearch < 0) return '';

  let endSearch = '\\n#';
  if (includeSubsections) {
    let i;
    for (i = 0; searchString[i] === '#' && i < searchString.length; i++);

    if (i > 0) {
      endSearch += `{${i - 1},${i}}[^#]`;
    }
  }
  const endRegex = new RegExp(endSearch);

  const sliceStart = indexOfSearch + searchString.length + 1;
  const endIndex = contents.slice(sliceStart).search(endRegex);
  const sliceEnd = endIndex === -1 ? undefined : endIndex + sliceStart;

  return contents.slice(sliceStart, sliceEnd).trim();
};

const getTextualContent = str => {
  const regex = /###.*\n*([\s\S]*?)```/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  return results[1];
};

const getTitle = contents => contents.split('\n')[0].replace(/^#+\s+/g, '');

module.exports = {
  attempt,
  readSnippets,
  SNIPPETS_PATH,
  capitalize,
  getTextualContent,
  getCodeBlocks,
  getSection,
  getTitle
};
