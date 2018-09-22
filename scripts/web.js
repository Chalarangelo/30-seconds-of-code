/*
  This is the web builder script that generates the web files.
  Run using `npm run webber`.
*/
// Load modules
const fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk'),
  md = require('markdown-it')(),
  minify = require('html-minifier').minify;
const util = require('./util');
var Prism = require('prismjs');
const minifyHTML = str =>
  minify(str, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: false,
    minifyCSS: true,
    minifyJS: true,
    keepClosingSlash: true,
    processConditionalComments: true,
    removeAttributeQuotes: false,
    removeComments: true,
    removeEmptyAttributes: false,
    removeOptionalTags: false,
    removeScriptTypeAttributes: false,
    removeStyleLinkTypeAttributes: false,
    trimCustomFragments: true
  });
const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  );
const generateSnippetCard = (snippetList, snippetKey, addCornerTag = false) => `<div class="card code-card">
${addCornerTag ? `<div class="corner ${
    snippetKey[1].includes('advanced')
      ? 'advanced'
      : snippetKey[1].includes('beginner')
        ? 'beginner'
        : 'intermediate'
  }"></div>`: ''}
  ${md
  .render(`\n${addCornerTag ? snippetList[snippetKey[0] + '.md'] : snippetList[snippetKey[0]]}`)
  .replace(
    /<h3/g,
  `<div class="section card-content"><h4 id="${snippetKey[0].toLowerCase()}"`
  )
  .replace(/<\/h3>/g, '</h4>')
  .replace(
    /<pre><code class="language-js">/m,
    '</div><div class="copy-button-container"><button class="copy-button" aria-label="Copy to clipboard"></button></div><pre><code class="language-js">'
  )
  .replace(
    /<pre><code class="language-js">([^\0]*?)<\/code><\/pre>/gm,
    (match, p1) =>
      `<pre class="language-js">${Prism.highlight(
        unescapeHTML(p1),
        Prism.languages.javascript
      )}</pre>`
  )
  .replace(/<\/div>\s*<pre class="/g, '</div><pre class="section card-code ')
  .replace(
    /<\/pre>\s+<pre class="/g,
    '</pre><label class="collapse">examples</label><pre class="section card-examples '
  )}
  </div>`;
const filterSnippets = (snippetList, excludedFiles) =>
  Object.keys(snippetList)
    .filter(key => !excludedFiles.includes(key))
    .reduce((obj, key) => {
      obj[key] = snippetList[key];
      return obj;
    }, {});
if (
  util.isTravisCI() &&
  /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE']) &&
  process.env['TRAVIS_EVENT_TYPE'] !== 'cron' &&
  process.env['TRAVIS_EVENT_TYPE'] !== 'api'
) {
  console.log(
    `${chalk.green('NOBUILD')} website build terminated, parent commit is a Travis build!`
  );
  process.exit(0);
}
// Compile the SCSS file, using `node-sass`.
const sass = require('node-sass');
sass.render(
  {
    file: path.join('docs', 'scss', 'style.scss'),
    outFile: path.join('docs', 'style.css'),
    outputStyle: 'compressed'
  },
  function(err, result) {
    if (!err) {
      fs.writeFile(path.join('docs', 'style.css'), result.css, function(err2) {
        if (!err2) console.log(`${chalk.green('SUCCESS!')} style.css file generated!`);
        else console.log(`${chalk.red('ERROR!')} During style.css file generation: ${err}`);
      });
    } else {
      console.log(`${chalk.red('ERROR!')} During style.css file generation: ${err}`);
    }
  }
);
// Set variables for paths
const snippetsPath = './snippets',
  archivedSnippetsPath = './snippets_archive',
  glossarySnippetsPath = './glossary',
  staticPartsPath = './static-parts',
  docsPath = './docs',
  staticFiles = ['about.html', 'contributing.html', 'array.html'];
// Set variables for script
let snippets = {},
  archivedSnippets = {},
  glossarySnippets = {},
  startPart = '',
  endPart = '',
  output = '',
  archivedStartPart = '',
  archivedEndPart = '',
  archivedOutput = '',
  glossaryStartPart = '',
  glossaryEndPart = '',
  glossaryOutput = '',
  pagesOutput = [],
  tagDbData = {};
// Start the timer of the script
console.time('Webber');
// Synchronously read all snippets and sort them as necessary (case-insensitive)
snippets = util.readSnippets(snippetsPath);
archivedSnippets = util.readSnippets(archivedSnippetsPath);
glossarySnippets = util.readSnippets(glossarySnippetsPath);

// Load static parts for all pages
try {
  [startPart, endPart, archivedStartPart, archivedEndPart, glossaryStartPart, glossaryEndPart] = [
    'page-start.html',
    'page-end.html',
    'archived-page-start.html',
    'archived-page-end.html',
    'glossary-page-start.html',
    'glossary-page-end.html'
  ].map(filename => fs.readFileSync(path.join(staticPartsPath, filename), 'utf8'));
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}
// Load tag data from the database
tagDbData = util.readTags();

// Create the output for individual category pages
try {
  let taggedData = [...new Set(Object.entries(tagDbData).map(t => t[1][0]))]
    .filter(v => v)
    .sort(
      (a, b) =>
        util.capitalize(a, true) === 'Uncategorized'
          ? 1
          : util.capitalize(b, true) === 'Uncategorized'
            ? -1
            : a.localeCompare(b)
    );
  // Add the start static part
  output += `${startPart}${'\n'}`;
  // Loop over tags and snippets to create the table of contents
  for (let tag of taggedData) {
    output +=
      '<h4>' +
      md
        .render(`${util.capitalize(tag, true)}\n`)
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '') +
      '</h4>';
    for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1][0] === tag))
      output += md
        .render(
          `[${taggedSnippet[0]}](./${
            tag === 'array' ? 'index' : tag
          }#${taggedSnippet[0].toLowerCase()})\n`
        )
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<a/g, `<a tags="${taggedSnippet[1].join(',')}"`);
    output += '\n';
  }
  output += '</nav><main class="col-centered"><span id="top"><br/><br/></span>';
  // Loop over tags and snippets to create the list of snippets
  for (let tag of taggedData) {
    let localOutput = output
      .replace(/\$tag/g, util.capitalize(tag))
      .replace(new RegExp(`./${tag}#`, 'g'), '#');
    if (tag === 'array') localOutput = localOutput.replace(new RegExp('./index#', 'g'), '#');
    localOutput += md
      .render(`## ${util.capitalize(tag, true)}\n`)
      .replace(/<h2>/g, '<h2 class="category-name">');
    for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1][0] === tag))
      localOutput += generateSnippetCard(snippets, taggedSnippet, true);
    // Add the ending static part
    localOutput += `\n${endPart + '\n'}`;
    // Optimize punctuation nodes
    localOutput = util.optimizeNodes(
      localOutput,
      /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
      (match, p1, p2, p3) => `<span class="token punctuation">${p1}${p2}${p3}</span>`
    );
    // Optimize operator nodes
    localOutput = util.optimizeNodes(
      localOutput,
      /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
      (match, p1, p2, p3) => `<span class="token operator">${p1}${p2}${p3}</span>`
    );
    // Optimize keyword nodes
    localOutput = util.optimizeNodes(
      localOutput,
      /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
      (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
    );
    pagesOutput.push({ tag: tag, content: localOutput });
  }
  // Minify output
  pagesOutput.forEach(page => {
    page.content = minifyHTML(page.content);
    fs.writeFileSync(
      path.join(docsPath, (page.tag === 'array' ? 'index' : page.tag) + '.html'),
      page.content
    );
    console.log(
      `${chalk.green('SUCCESS!')} ${page.tag === 'array' ? 'index' : page.tag}.html file generated!`
    );
  });
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During category page generation: ${err}`);
  process.exit(1);
}

// Create the output for the archive.html file
try {
  // Add the static part
  archivedOutput += `${archivedStartPart}\n`;

  // Filter README.md from folder
  const filteredArchivedSnippets = filterSnippets(archivedSnippets, ['README.md']);

  // Generate archived snippets from md files
  for (let snippet of Object.entries(filteredArchivedSnippets))
    archivedOutput += generateSnippetCard(filteredArchivedSnippets, snippet, false);

  // Optimize punctuation nodes
  archivedOutput = util.optimizeNodes(
    archivedOutput,
    /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token punctuation">${p1}${p2}${p3}</span>`
  );
  // Optimize operator nodes
  archivedOutput = util.optimizeNodes(
    archivedOutput,
    /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token operator">${p1}${p2}${p3}</span>`
  );
  // Optimize keyword nodes
  archivedOutput = util.optimizeNodes(
    archivedOutput,
    /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
  );

  archivedOutput += `${archivedEndPart}`;

  // Generate and minify 'archive.html' file
  const minifiedArchivedOutput = minifyHTML(archivedOutput);

  fs.writeFileSync(path.join(docsPath, 'archive.html'), minifiedArchivedOutput);
  console.log(`${chalk.green('SUCCESS!')} archive.html file generated!`);
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During archive.html generation: ${err}`);
  process.exit(1);
}

// Create the output for the glossary.html file
try {
  // Add the static part
  glossaryOutput += `${glossaryStartPart}\n`;

  // Filter README.md from folder
  const filteredGlossarySnippets = filterSnippets(glossarySnippets, ['README.md']);

  // Generate glossary snippets from md files
  for (let snippet of Object.entries(filteredGlossarySnippets))
    glossaryOutput += 
      '<div class="card code-card"><div class="section card-content">' +
      md
        .render(`\n${filteredGlossarySnippets[snippet[0]]}`)
        .replace(/<h3/g, `<h4 id="${snippet[0].toLowerCase()}"`)
        .replace(/<\/h3>/g, '</h4>') +
      '</div></div>';

  glossaryOutput += `${glossaryEndPart}`;

  // Generate and minify 'glossary.html' file
  const minifiedGlossaryOutput = minifyHTML(glossaryOutput);

  fs.writeFileSync(path.join(docsPath, 'glossary.html'), minifiedGlossaryOutput);
  console.log(`${chalk.green('SUCCESS!')} glossary.html file generated!`);
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During glossary.html generation: ${err}`);
  process.exit(1);
}

// Copy static files
staticFiles.forEach(f => {
  try {
    fs.copyFileSync(path.join(staticPartsPath, f), path.join(docsPath, f));
    console.log(`${chalk.green('SUCCESS!')} ${f} file copied!`);
  } catch (err) {
    console.log(`${chalk.red('ERROR!')} During ${f} copying: ${err}`);
    process.exit(1);
  }
});

// Log the time taken
console.timeEnd('Webber');
