#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var $ = require('cheerio');
var fromEntries = require('object.fromentries');

if (process.argv.length !== 3) {
	throw new RangeError('please provide a year');
}
var year = parseInt(process.argv[2]);
if (year < 2016) {
	throw new RangeError('ES2016+ only');
}
var edition = year - 2009;

var specHTMLurl = new URL('https://raw.githubusercontent.com/tc39/ecma262/es' + year + '/spec.html');

var specHTML = String(execSync('curl --silent ' + specHTMLurl));

var root = $(specHTML);

var aOps = root.filter('[aoid]').add(root.find('[aoid]'));

var missings = [];

var entries = aOps.toArray().map(function (x) {
  var op = $(x);
  var aoid = op.attr('aoid');
  var id = op.attr('id');

  if (!id) {
    id = op.closest('[id]').attr('id');
  }

  if (!id) {
    missings.push(aoid);
  }

  return [
    aoid,
    'https://ecma-international.org/ecma-262/' + edition + '.0/#' + id
  ];
});

if (missings.length > 0) {
  console.error('Missing URLs:', missings);
  process.exit(1);
}

entries.sort(function (a, b) { return a[0].localeCompare(b[0]); });

var obj = fromEntries(entries);

var outputPath = path.join('operations', year + '.js');
fs.writeFileSync(outputPath, '\'use strict\';\n\nmodule.exports = ' + JSON.stringify(obj, null, '\t')+ ';\n');

console.log('npx eslint --quiet --fix ' + outputPath);
execSync('npx eslint --quiet --fix ' + outputPath);
