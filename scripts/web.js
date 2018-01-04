/*
  This is the web builder script that generates the README file.
  Run using `npm run webber`.
*/
// Load modules
const fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk'),
  md = require('markdown-it')(),
  minify = require('html-minifier').minify;
var Prism = require('prismjs');
  // Load helper functions (these are from existing snippets in 30 seconds of code!)
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
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
if(isTravisCI() && /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])) {
  console.log(`${chalk.green('NOBUILD')} index build terminated, parent commit is a Travis build!`);
  process.exit(0);
}
// Compile the mini.css framework and custom CSS styles, using `node-sass`.
const sass = require('node-sass');
sass.render(
  {
    file: path.join('docs', 'mini', 'flavor.scss'),
    outFile: path.join('docs', 'mini.css'),
    outputStyle: 'compressed'
  },
  function(err, result) {
    if (!err) {
      fs.writeFile(path.join('docs', 'mini.css'), result.css, function(err2) {
        if (!err2) console.log(`${chalk.green('SUCCESS!')} mini.css file generated!`);
        else console.log(`${chalk.red('ERROR!')} During mini.css file generation: ${err}`);
      });
    } else {
      console.log(`${chalk.red('ERROR!')} During mini.css file generation: ${err}`);
    }
  }
);
// Set variables for paths
const snippetsPath = './snippets',
  staticPartsPath = './static-parts',
  docsPath = './docs';
// Set variables for script
let snippets = {},
  startPart = '',
  endPart = '',
  output = '',
  tagDbData = {};
// Load helper functions (these are from existing snippets in 30 seconds of code!)
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// Start the timer of the script
console.time('Builder');
// Synchronously read all snippets and sort them as necessary (case-insensitive)
try {
  let snippetFilenames = fs.readdirSync(snippetsPath);
  snippetFilenames.sort((a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  // Store the data read from each snippet in the appropriate object
  for (let snippet of snippetFilenames)
    snippets[snippet] = fs.readFileSync(path.join(snippetsPath, snippet), 'utf8');
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During snippet loading: ${err}`);
  process.exit(1);
}
// Load static parts for the index.html file
try {
  startPart = fs.readFileSync(path.join(staticPartsPath, 'index-start.html'), 'utf8');
  endPart = fs.readFileSync(path.join(staticPartsPath, 'index-end.html'), 'utf8');
} catch (err) {
  // Handle errors (hopefully not!)
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
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During tag database loading: ${err}`);
  process.exit(1);
}
// Create the output for the index.html file
try {
  // Add the start static part
  output += `${startPart + '\n'}`;
  let uncategorizedOutput = '';
  // Loop over tags and snippets to create the table of contents
  for (let tag of [...new Set(Object.entries(tagDbData).map(t => t[1]))]
    .filter(v => v)
    .sort((a, b) => a.localeCompare(b))) {
    if (capitalize(tag, true) == 'Uncategorized') {
      uncategorizedOutput +=
        `<h3>` +
        md
          .render(`${capitalize(tag, true)}\n`)
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '') +
        `</h3>`;
      for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
        uncategorizedOutput += md
          .render(`[${taggedSnippet[0]}](#${taggedSnippet[0].toLowerCase()})\n`)
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<a/g, '<a class="sublink-1"');
      uncategorizedOutput += '\n';
    } else {
      output +=
        `<h3>` +
        md
          .render(`${capitalize(tag, true)}\n`)
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '') +
        `</h3>`;
      for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
        output += md
          .render(`[${taggedSnippet[0]}](#${taggedSnippet[0].toLowerCase()})\n`)
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<a/g, '<a class="sublink-1"');
      output += '\n';
    }
  }
  output += uncategorizedOutput;
  output += `</nav><main class="col-sm-12 col-md-8 col-lg-9" style="height: 100%;overflow-y: auto; background: #eceef2; padding: 0;">`;
  output += `<a id="top">&nbsp;</a>`;
  uncategorizedOutput = '';
  // Loop over tags and snippets to create the list of snippets
  for (let tag of [...new Set(Object.entries(tagDbData).map(t => t[1]))]
    .filter(v => v)
    .sort((a, b) => a.localeCompare(b))) {
    if (capitalize(tag, true) == 'Uncategorized') {
      uncategorizedOutput += md
        .render(`## ${capitalize(tag, true)}\n`)
        .replace(/<h2>/g, '<h2 style="text-align:center;">');
      for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
        uncategorizedOutput +=
          '<div class="card fluid">' +
          md
            .render(`\n${snippets[taggedSnippet[0] + '.md']}`)
            .replace(/<h3/g, `<h3 id="${taggedSnippet[0].toLowerCase()}" class="section double-padded"`)
            .replace(/<pre><code class="language-js">([^\0]*?)<\/code><\/pre>/gm, (match, p1) => `<pre class="language-js">${Prism.highlight(unescapeHTML(p1), Prism.languages.javascript)}</pre>`)
            .replace(/<\/pre>\s+<pre/g, '</pre><label class="collapse">Show examples</label><pre') +
          '<button class="primary clipboard-copy"><img src="clipboard.svg" alt="clipboard">&nbsp;Copy to clipboard</button>' +
          '</div></div>';
    } else {
      output += md
        .render(`## ${capitalize(tag, true)}\n`)
        .replace(/<h2>/g, '<h2 style="text-align:center;">');
      for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
        output +=
          '<div class="card fluid">' +
          md
            .render(`\n${snippets[taggedSnippet[0] + '.md']}`)
            .replace(/<h3/g, `<h3 id="${taggedSnippet[0].toLowerCase()}" class="section double-padded"`)
            .replace(/<\/h3>/g, '</h3><div class="section double-padded">')
            .replace(/<pre><code class="language-js">([^\0]*?)<\/code><\/pre>/gm, (match, p1) => `<pre class="language-js">${Prism.highlight(unescapeHTML(p1), Prism.languages.javascript)}</pre>`)
            .replace(/<\/pre>\s+<pre/g, '</pre><label class="collapse">Show examples</label><pre') +
          '<button class="primary clipboard-copy"><img src="clipboard.svg" alt="clipboard">&nbsp;Copy to clipboard</button>' +
          '</div></div>';
    }
  }
  output += uncategorizedOutput;
  // Add the ending static part
  output += `\n${endPart + '\n'}`;
  // Optimize punctuation nodes
  let count = 0;
  do {
    const punctuationRegex = /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm;
    output = output.replace(punctuationRegex,
      (match, p1, p2, p3)  => `<span class="token punctuation">${p1}${p2}${p3}</span>`
    );
    count = 0;
    while (punctuationRegex.exec(output) !== null) {
      ++count;
    }
  } while (count > 0);
  // Optimize operator nodes
  do {
    const operatorRegex = /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm;
    output = output.replace(operatorRegex,
      (match, p1, p2, p3)  => `<span class="token operator">${p1}${p2}${p3}</span>`
    );
    count = 0;
    while (operatorRegex.exec(output) !== null) {
      ++count;
    }
  } while (count > 0);
  // Optimize keyword nodes
  do {
    const keyWordRegex = /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm;
    output = output.replace(keyWordRegex,
      (match, p1, p2, p3)  => `<span class="token keyword">${p1}${p2}${p3}</span>`
    );
    count = 0;
    while (keyWordRegex.exec(output) !== null) {
      ++count;
    }
  } while (count > 0);
  // Minify output
  output = minify(output, {
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
  // Write to the index.html file
  fs.writeFileSync(path.join(docsPath, 'index.html'), output);
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During index.html generation: ${err}`);
  process.exit(1);
}
// Log a success message
console.log(`${chalk.green('SUCCESS!')} index.html file generated!`);
// Log the time taken
console.timeEnd('Builder');
