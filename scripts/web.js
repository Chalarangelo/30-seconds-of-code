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
const util = require('./util');
var Prism = require('prismjs');
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
if(util.isTravisCI() && /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])) {
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
  pagesOutput = [];
  tagDbData = {};
// Start the timer of the script
console.time('Webber');
// Synchronously read all snippets and sort them as necessary (case-insensitive)
snippets = util.readSnippets(snippetsPath);
// Load static parts for the index.html file
try {
  startPart = fs.readFileSync(path.join(staticPartsPath, 'page-start.html'), 'utf8');
  endPart = fs.readFileSync(path.join(staticPartsPath, 'page-end.html'), 'utf8');
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}
// Load tag data from the database
tagDbData = util.readTags();
// Create the output for the index.html file
try {
  // Add the start static part
  output += `${startPart + '\n'}`;
  // Loop over tags and snippets to create the table of contents
  for (let tag of [...new Set(Object.entries(tagDbData).map(t => t[1][0]))]
    .filter(v => v)
    .sort((a, b) => util.capitalize(a, true) === 'Uncategorized' ? 1 : util.capitalize(b, true) === 'Uncategorized' ? -1 : a.localeCompare(b))) {
        output += `<h3>` +
        md
          .render(`${util.capitalize(tag, true)}\n`)
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '') +
        `</h3>`;
      for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1][0] === tag))
        output += md
          .render(`[${taggedSnippet[0]}](./${tag}.html#${taggedSnippet[0].toLowerCase()})\n`)
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<a/g, `<a class="sublink-1" tags="${taggedSnippet[1].join(',')}"`);
      output += '\n';
  }
  output += `</nav><main class="col-sm-12 col-md-8 col-lg-9" style="height: 100%;overflow-y: auto; background: #eceef2; padding: 0;">`;
  output += `<a id="top">&nbsp;</a>`;
  // Loop over tags and snippets to create the list of snippets
  for (let tag of [...new Set(Object.entries(tagDbData).map(t => t[1][0]))]
    .filter(v => v)
    .sort((a, b) => util.capitalize(a, true) === 'Uncategorized' ? 1 : util.capitalize(b, true) === 'Uncategorized' ? -1 : a.localeCompare(b))) {
      let localOutput = output.replace(/\$tag/g, util.capitalize(tag)).replace(new RegExp(`./${tag}.html#`,'g'),'#');
      localOutput += md
        .render(`## ${util.capitalize(tag, true)}\n`)
        .replace(/<h2>/g, '<h2 style="text-align:center;">');
      for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1][0] === tag))
        localOutput +=
          '<div class="card fluid">' +
          md
            .render(`\n${snippets[taggedSnippet[0] + '.md']}`)
            .replace(/<h3/g, `<h3 id="${taggedSnippet[0].toLowerCase()}" class="section double-padded"`)
            .replace(/<\/h3>/g, `${taggedSnippet[1].includes('advanced')?'<mark class="tag">advanced</mark>':''}</h3>`)
            .replace(/<\/h3>/g, '</h3><div class="section double-padded">')
            .replace(/<pre><code class="language-js">([^\0]*?)<\/code><\/pre>/gm, (match, p1) => `<pre class="language-js">${Prism.highlight(unescapeHTML(p1), Prism.languages.javascript)}</pre>`)
            .replace(/<\/pre>\s+<pre/g, '</pre><label class="collapse">Show examples</label><pre') +
          '<button class="primary clipboard-copy">&#128203;&nbsp;Copy to clipboard</button>' +
          '</div></div>';
          // Add the ending static part
          localOutput += `\n${endPart + '\n'}`;
          localOutput = util.optimizeNodes(localOutput, /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm, (match, p1, p2, p3)  => `<span class="token punctuation">${p1}${p2}${p3}</span>`);
          // Optimize operator nodes
          localOutput = util.optimizeNodes(localOutput, /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm, (match, p1, p2, p3)  => `<span class="token operator">${p1}${p2}${p3}</span>`);
          // Optimize keyword nodes
          localOutput = util.optimizeNodes(localOutput, /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm, (match, p1, p2, p3)  => `<span class="token keyword">${p1}${p2}${p3}</span>`);
          pagesOutput.push({'tag': tag,'content': localOutput});
  }
  // // Optimize punctuation nodes
  // output = util.optimizeNodes(output, /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm, (match, p1, p2, p3)  => `<span class="token punctuation">${p1}${p2}${p3}</span>`);
  // // Optimize operator nodes
  // output = util.optimizeNodes(output, /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm, (match, p1, p2, p3)  => `<span class="token operator">${p1}${p2}${p3}</span>`);
  // // Optimize keyword nodes
  // output = util.optimizeNodes(output, /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm, (match, p1, p2, p3)  => `<span class="token keyword">${p1}${p2}${p3}</span>`);
  // Minify output
  pagesOutput.forEach(page => {
    page.content = minify(page.content, {
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
    fs.writeFileSync(path.join(docsPath, page.tag+'.html'), page.content);
  })
  // Write to the index.html file
  //fs.writeFileSync(path.join(docsPath, 'index.html'), output);
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During index.html generation: ${err}`);
  process.exit(1);
}
// Log a success message
console.log(`${chalk.green('SUCCESS!')} index.html file generated!`);
// Log the time taken
console.timeEnd('Webber');
