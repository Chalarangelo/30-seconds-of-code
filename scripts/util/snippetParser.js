const fs = require('fs-extra'),
  path = require('path'),
  { red } = require('kleur'),
  crypto = require('crypto'),
  frontmatter = require('front-matter'),
  babel = require('@babel/core');
const config = require('../../config');

// Reade all files in a directory
const getFilesInDir = (directoryPath, withPath, exclude = null) => {
  try {
    let directoryFilenames = fs.readdirSync(directoryPath);
    directoryFilenames.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    if (withPath) {
      // a hacky way to do conditional array.map
      return directoryFilenames.reduce((fileNames, fileName) => {
        if (
          exclude == null ||
          !exclude.some(toExclude => fileName === toExclude)
        )
          fileNames.push(`${directoryPath}/${fileName}`);
        return fileNames;
      }, []);
    }
    return directoryFilenames.filter(v => v !== 'README.md');
  } catch (err) {
    console.log(`${red('ERROR!')} During snippet loading: ${err}`);
    process.exit(1);
  }
};
// Creates a hash for a value using the SHA-256 algorithm.
const hashData = val =>
  crypto
    .createHash('sha256')
    .update(val)
    .digest('hex');
// Gets the code blocks for a snippet file.
const getCodeBlocks = str => {
  const regex = /```[.\S\s]*?```/g;
  let results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  const replacer = new RegExp(
    `\`\`\`${config.language}([\\s\\S]*?)\`\`\``,
    'g',
  );
  results = results.map(v => v.replace(replacer, '$1').trim());
  return {
    es6: results[0],
    es5: babel.transformSync(results[0], { presets: ['@babel/preset-env'] }).code.replace('"use strict";\n\n', ''),
    example: results[1],
  };
};
// Gets the textual content for a snippet file.
const getTextualContent = str => {
  const regex = /([\s\S]*?)```/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  if (!results.length) return str.replace(/\r\n/g, '\n');
  return results[1].replace(/\r\n/g, '\n');
};

// Synchronously read all snippets and sort them as necessary (case-insensitive)
const readSnippets = snippetsPath => {
  const snippetFilenames = getFilesInDir(snippetsPath, false);

  let snippets = {};
  try {
    for (let snippet of snippetFilenames) {
      let data = frontmatter(
        fs.readFileSync(path.join(snippetsPath, snippet), 'utf8'),
      );
      snippets[snippet] = {
        id: snippet.slice(0, -3),
        title: data.attributes.title,
        type: 'snippet',
        attributes: {
          fileName: snippet,
          text: getTextualContent(data.body),
          codeBlocks: getCodeBlocks(data.body),
          tags: data.attributes.tags.split(',').map(t => t.trim()),
        },
        meta: {
          hash: hashData(data.body),
        },
      };
    }
  } catch (err) {
    console.log(`${red('ERROR!')} During snippet loading: ${err}`);
    process.exit(1);
  }
  return snippets;
};

module.exports = {
  getFilesInDir,
  hashData,
  getCodeBlocks,
  getTextualContent,
  readSnippets,
};
