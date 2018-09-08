/*
  This is the web builder script that generates the web files.
  Run using `npm run webber`.
*/
// Load modules
const fs = require('fs-extra'),
  https = require('https'),
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
  staticPartsPath = './static-parts',
  docsPath = './docs';
// Set variables for script
let snippets = {},
  archivedSnippets = {},
  beginnerSnippetNames = [
    'allEqual',
    'everyNth',
    'filterNonUnique',
    'last',
    'maxN',
    'minN',
    'nthElement',
    'offset',
    'sample',
    'similarity',
    'tail',
    'currentURL',
    'hasClass',
    'getMeridiemSuffixOfInteger',
    'factorial',
    'fibonacci',
    'gcd',
    'isDivisible',
    'isEven',
    'isPrime',
    'lcm',
    'randomIntegerInRange',
    'sum',
    'reverseString',
    'truncateString'
  ],
  startPart = '',
  endPart = '',
  output = '',
  beginnerStartPart = '',
  beginnerEndPart = '',
  beginnerOutput = '',
  archivedStartPart = '',
  archivedEndPart = '',
  archivedOutput = '',
  indexStaticFile = '',
  pagesOutput = [],
  tagDbData = {};
// Start the timer of the script
console.time('Webber');
// Synchronously read all snippets and sort them as necessary (case-insensitive)
snippets = util.readSnippets(snippetsPath);
archivedSnippets = util.readSnippets(archivedSnippetsPath);

// Load static parts for all pages
try {
  startPart = fs.readFileSync(path.join(staticPartsPath, 'page-start.html'), 'utf8');
  endPart = fs.readFileSync(path.join(staticPartsPath, 'page-end.html'), 'utf8');

  beginnerStartPart = fs.readFileSync(
    path.join(staticPartsPath, 'beginner-page-start.html'),
    'utf8'
  );
  beginnerEndPart = fs.readFileSync(path.join(staticPartsPath, 'beginner-page-end.html'), 'utf8');

  archivedStartPart = fs.readFileSync(
    path.join(staticPartsPath, 'archived-page-start.html'),
    'utf8'
  );
  archivedEndPart = fs.readFileSync(path.join(staticPartsPath, 'archived-page-end.html'), 'utf8');

  indexStaticFile = fs.readFileSync(path.join(staticPartsPath, 'index.html'), 'utf8');
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}
// Load tag data from the database
tagDbData = util.readTags();
/*
// Create the output for the index.html file (only locally or on Travis CRON or custom job)
if (
  !util.isTravisCI() ||
  (util.isTravisCI() &&
    (process.env['TRAVIS_EVENT_TYPE'] === 'cron' || process.env['TRAVIS_EVENT_TYPE'] === 'api'))
) {
  try {
    // Shuffle the array of snippets, pick 3
    let indexDailyPicks = '';
    let shuffledSnippets = util.shuffle(Object.keys(snippets)).slice(0, 3);
    const dailyPicks = Object.keys(snippets)
      .filter(key => shuffledSnippets.includes(key))
      .reduce((obj, key) => {
        obj[key] = snippets[key];
        return obj;
      }, {});

    // Generate the html for the picked snippets
    for (let snippet of Object.entries(dailyPicks))
      indexDailyPicks +=
        '<div class="card fluid pick">' +
        md
          .render(`\n${snippets[snippet[0]]}`)
          .replace(/<h3/g, `<h3 id="${snippet[0].toLowerCase()}" class="section double-padded"`)
          .replace(
            /<\/h3>/g,
            `${snippet[1].includes('advanced') ? '<mark class="tag">advanced</mark>' : ''}</h3>`
          )
          .replace(/<\/h3>/g, '</h3><div class="section double-padded">')
          .replace(
            /<pre><code class="language-js">([^\0]*?)<\/code><\/pre>/gm,
            (match, p1) =>
              `<pre class="language-js">${Prism.highlight(
                unescapeHTML(p1),
                Prism.languages.javascript
              )}</pre>`
          )
          .replace(/<\/pre>\s+<pre/g, '</pre><label class="collapse">Show examples</label><pre') +
        '<button class="primary clipboard-copy">&#128203;&nbsp;Copy to clipboard</button>' +
        '</div></div>';
    // Select the first snippet from today's picks
    indexDailyPicks = indexDailyPicks.replace('card fluid pick', 'card fluid pick selected');
    // Optimize punctuation nodes
    indexDailyPicks = util.optimizeNodes(
      indexDailyPicks,
      /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
      (match, p1, p2, p3) => `<span class="token punctuation">${p1}${p2}${p3}</span>`
    );
    // Optimize operator nodes
    indexDailyPicks = util.optimizeNodes(
      indexDailyPicks,
      /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
      (match, p1, p2, p3) => `<span class="token operator">${p1}${p2}${p3}</span>`
    );
    // Optimize keyword nodes
    indexDailyPicks = util.optimizeNodes(
      indexDailyPicks,
      /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
      (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
    );
    // Put the daily picks into the page
    indexStaticFile = indexStaticFile.replace('$daily-picks', indexDailyPicks);
    // Use the Github API to get the needed data
    const githubApi = 'api.github.com';
    const headers = util.isTravisCI()
      ? { 'User-Agent': '30-seconds-of-code', Authorization: 'token ' + process.env['GH_TOKEN'] }
      : { 'User-Agent': '30-seconds-of-code' };
    // Test the API's rate limit (keep for various reasons)
    https.get({ host: githubApi, path: '/rate_limit?', headers: headers }, res => {
      res.on('data', function(chunk) {
        console.log(`Remaining requests: ${JSON.parse(chunk).resources.core.remaining}`);
      });
    });
    // Send requests and wait for responses, write to the page
    https.get(
      {
        host: githubApi,
        path: '/repos/chalarangelo/30-seconds-of-code/commits?per_page=1',
        headers: headers
      },
      resCommits => {
        https.get(
          {
            host: githubApi,
            path: '/repos/chalarangelo/30-seconds-of-code/contributors?per_page=1',
            headers: headers
          },
          resContributors => {
            https.get(
              {
                host: githubApi,
                path: '/repos/chalarangelo/30-seconds-of-code/stargazers?per_page=1',
                headers: headers
              },
              resStars => {
                let commits = resCommits.headers.link
                    .split('&')
                    .slice(-1)[0]
                    .replace(/[^\d]/g, ''),
                  contribs = resContributors.headers.link
                    .split('&')
                    .slice(-1)[0]
                    .replace(/[^\d]/g, ''),
                  stars = resStars.headers.link
                    .split('&')
                    .slice(-1)[0]
                    .replace(/[^\d]/g, '');
                indexStaticFile = indexStaticFile
                  .replace(/\$snippet-count/g, Object.keys(snippets).length)
                  .replace(/\$commit-count/g, commits)
                  .replace(/\$contrib-count/g, contribs)
                  .replace(/\$star-count/g, stars);
                indexStaticFile = minify(indexStaticFile, {
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
                // Generate 'index.html' file
                fs.writeFileSync(path.join(docsPath, 'index.html'), indexStaticFile);
                console.log(`${chalk.green('SUCCESS!')} index.html file generated!`);
              }
            );
          }
        );
      }
    );
  } catch (err) {
    console.log(`${chalk.red('ERROR!')} During index.html generation: ${err}`);
    process.exit(1);
  }
}
*/
// Create the output for individual category pages
try {
  // Add the start static part
  output += `${startPart}${'\n'}`;
  // Loop over tags and snippets to create the table of contents
  for (let tag of [...new Set(Object.entries(tagDbData).map(t => t[1][0]))]
    .filter(v => v)
    .sort(
      (a, b) =>
        util.capitalize(a, true) === 'Uncategorized'
          ? 1
          : util.capitalize(b, true) === 'Uncategorized'
            ? -1
            : a.localeCompare(b)
    )) {
    output +=
      '<h4>' +
      md
        .render(`${util.capitalize(tag, true)}\n`)
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '') +
      '</h4>';
    for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1][0] === tag))
      output += md
        .render(`[${taggedSnippet[0]}](./${tag}#${taggedSnippet[0].toLowerCase()})\n`)
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<a/g, `<a tags="${taggedSnippet[1].join(',')}"`);
    output += '\n';
  }
  output +=
    '</nav><main class="col-centered">';
  output += '<a id="top">&nbsp;</a>';
  // Loop over tags and snippets to create the list of snippets
  for (let tag of [...new Set(Object.entries(tagDbData).map(t => t[1][0]))]
    .filter(v => v)
    .sort(
      (a, b) =>
        util.capitalize(a, true) === 'Uncategorized'
          ? 1
          : util.capitalize(b, true) === 'Uncategorized'
            ? -1
            : a.localeCompare(b)
    )) {
    let localOutput = output
      .replace(/\$tag/g, util.capitalize(tag))
      .replace(new RegExp(`./${tag}#`, 'g'), '#');
    localOutput += md
      .render(`## ${util.capitalize(tag, true)}\n`)
      .replace(/<h2>/g, '<h2 class="category-name">');
    for (let taggedSnippet of Object.entries(tagDbData).filter(v => v[1][0] === tag))
      localOutput +=
        '<div class="card code-card">' +
       `<div class="corner ${taggedSnippet[1].includes('advanced') ? 'advanced' : taggedSnippet[1].includes('beginner') ? 'beginner' : 'intermediate'}">${taggedSnippet[1].includes('advanced') ? 'advanced' : taggedSnippet[1].includes('beginner') ? 'beginner' : 'intermediate'}</div>` +
        md
          .render(`\n${snippets[taggedSnippet[0] + '.md']}`)
          .replace(
            /<h3/g,
            `<div class="section card-content"><h4 id="${taggedSnippet[0].toLowerCase()}"`
          )
          .replace(
            /<\/h3>/g,
            '</h4>'
          )
          .replace(
            /<pre><code class="language-js">/m,
            '</div><div class="copy-button-container"><button class="copy-button"></button></div><pre><code class="language-js">'
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
          .replace(/<\/pre>\s+<pre class="/g, '</pre><label class="collapse">examples</label><pre class="section card-examples ') +
        '</div>';
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
    fs.writeFileSync(path.join(docsPath, (page.tag == 'array' ? 'index' : page.tag) + '.html'), page.content);
    console.log(`${chalk.green('SUCCESS!')} ${page.tag == 'array' ? 'index' : page.tag}.html file generated!`);
  });
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During category page generation: ${err}`);
  process.exit(1);
}

/*
// Create the output for the beginner.html file
try {
  // Add the static part
  beginnerOutput += `${beginnerStartPart + '\n'}`;

  // Filter begginer snippets
  const filteredBeginnerSnippets = Object.keys(snippets)
    .filter(key => beginnerSnippetNames.map(name => name + '.md').includes(key))
    .reduce((obj, key) => {
      obj[key] = snippets[key];
      return obj;
    }, {});

  for (let snippet of Object.entries(filteredBeginnerSnippets))
    beginnerOutput +=
      '<div class="row">' +
      '<div class="col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">' +
      '<div class="card fluid">' +
      md
        .render(`\n${snippets[snippet[0]]}`)
        .replace(/<h3/g, `<h3 id="${snippet[0].toLowerCase()}" class="section double-padded"`)
        .replace(
          /<\/h3>/g,
          `${snippet[1].includes('advanced') ? '<mark class="tag">advanced</mark>' : ''}</h3>`
        )
        .replace(/<\/h3>/g, '</h3><div class="section double-padded">')
        .replace(
          /<pre><code class="language-js">([^\0]*?)<\/code><\/pre>/gm,
          (match, p1) =>
            `<pre class="language-js">${Prism.highlight(
              unescapeHTML(p1),
              Prism.languages.javascript
            )}</pre>`
        )
        .replace(/<\/pre>\s+<pre/g, '</pre><label class="collapse">Show examples</label><pre') +
      '<button class="primary clipboard-copy">&#128203;&nbsp;Copy to clipboard</button>' +
      '</div></div></div></div>';

  // Optimize punctuation nodes
  beginnerOutput = util.optimizeNodes(
    beginnerOutput,
    /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token punctuation">${p1}${p2}${p3}</span>`
  );
  // Optimize operator nodes
  beginnerOutput = util.optimizeNodes(
    beginnerOutput,
    /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token operator">${p1}${p2}${p3}</span>`
  );
  // Optimize keyword nodes
  beginnerOutput = util.optimizeNodes(
    beginnerOutput,
    /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
  );

  beginnerOutput += `${beginnerEndPart}`;

  // Generate and minify 'beginner.html' file
  const minifiedBeginnerOutput = minify(beginnerOutput, {
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
  fs.writeFileSync(path.join(docsPath, 'beginner.html'), minifiedBeginnerOutput);
  console.log(`${chalk.green('SUCCESS!')} beginner.html file generated!`);
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During beginner.html generation: ${err}`);
  process.exit(1);
}

// Create the output for the archive.html file
try {
  // Add the static part
  archivedOutput += `${archivedStartPart + '\n'}`;

  // Filter README.md from folder
  const excludeFiles = ['README.md'];

  const filteredArchivedSnippets = Object.keys(archivedSnippets)
    .filter(key => !excludeFiles.includes(key))
    .reduce((obj, key) => {
      obj[key] = archivedSnippets[key];
      return obj;
    }, {});

  // Generate archived snippets from md files
  for (let snippet of Object.entries(filteredArchivedSnippets))
    archivedOutput +=
      '<div class="row">' +
      '<div class="col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">' +
      '<div class="card fluid">' +
      md
        .render(`\n${filteredArchivedSnippets[snippet[0]]}`)
        .replace(/<h3/g, `<h3 id="${snippet[0].toLowerCase()}" class="section double-padded"`)
        .replace(/<\/h3>/g, '</h3><div class="section double-padded">')
        .replace(
          /<pre><code class="language-js">([^\0]*?)<\/code><\/pre>/gm,
          (match, p1) =>
            `<pre class="language-js">${Prism.highlight(
              unescapeHTML(p1),
              Prism.languages.javascript
            )}</pre>`
        )
        .replace(/<\/pre>\s+<pre/g, '</pre><label class="collapse">Show examples</label><pre') +
      '<button class="primary clipboard-copy">&#128203;&nbsp;Copy to clipboard</button>' +
      '</div></div></div></div>';

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
  const minifiedArchivedOutput = minify(archivedOutput, {
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

  fs.writeFileSync(path.join(docsPath, 'archive.html'), minifiedArchivedOutput);
  console.log(`${chalk.green('SUCCESS!')} archive.html file generated!`);
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During archive.html generation: ${err}`);
  process.exit(1);
}
*/

// Log the time taken
console.timeEnd('Webber');
