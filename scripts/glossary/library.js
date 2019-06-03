/*
  This is the "librarian" script that generates the glossary/README file.
  Run using `npm run glossary:librarian`.
*/

const fs = require('fs-extra');
const { red } = require('kleur');
const util = require('../util');

const glossaryFiles = util.getFilesInDir('./glossary', true, ['keyword_database', 'README.md']);
const fileTitles = [];

const getGlossaryTermMarkdownBlock = fileName => {
  let fileContent = fs.readFileSync(fileName, 'utf8');

  let title = fileContent
    .match(/###[^\n]*/)[0]
    .replace('### ', '')
    .trim();
  // let description = fileContent.replace(title, '').trim();
  fileTitles.push(title);

  return fileContent.trim() + '\n';
};

const glossaryFilesContentReducer = (accumulator, currentFilename) => {
  // handle first array item
  if (accumulator === glossaryFiles[0]) {
    return (
      getGlossaryTermMarkdownBlock(accumulator) +
      '\n' +
      getGlossaryTermMarkdownBlock(currentFilename)
    );
  }
  return accumulator + '\n' + getGlossaryTermMarkdownBlock(currentFilename);
};

const getTermLinkMarkdownBlock = termTitle => {
  let anchor = util.getMarkDownAnchor(termTitle);
  return `* [\`${termTitle}\`](#${anchor})` + '\n';
};

const glossaryTableOfContentsReducer = (accumulator, currentFile) => {
  if (accumulator === fileTitles[0])
    return getTermLinkMarkdownBlock(accumulator) + getTermLinkMarkdownBlock(currentFile);

  return accumulator + getTermLinkMarkdownBlock(currentFile);
};

try {
  const fileContents = glossaryFiles.reduce(glossaryFilesContentReducer);
  const TOC = '## Table of Contents\n\n' + fileTitles.reduce(glossaryTableOfContentsReducer);

  const README = '# 30-seconds-of-code JavaScript Glossary\n\n' + TOC + '\n\n' + fileContents;
  fs.writeFileSync('glossary/README.md', README);
} catch (err) {
  console.log(`${red('ERROR!')} During glossary README generation: ${err}`);
  process.exit(1);
}
