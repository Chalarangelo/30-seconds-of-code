#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var mimeScore = require('mime-score');

var db = require('mime-db');
var chalk = require('chalk');

var STANDARD_FACET_SCORE = 900;

var byExtension = {};

// Clear out any conflict extensions in mime-db
for (var type in db) {
  var entry = db[type];
  entry.type = type;
  if (!entry.extensions) continue;

  entry.extensions.forEach(function(ext) {
    var drop;
    var keep = entry;
    if (ext in byExtension) {
      var e0 = entry;
      var e1 = byExtension[ext];

      e0.pri = mimeScore(e0.type, e0.source);
      e1.pri = mimeScore(e1.type, e1.source);

      drop = e0.pri < e1.pri ? e0 : e1;
      keep = e0.pri >= e1.pri ? e0 : e1;

      // Prefix lower-priority extensions with '*'
      drop.extensions = drop.extensions.map(function(e) {return e == ext ? '*' + e : e});

      console.log(
        ext + ': Preferring ' + chalk.green(keep.type) + ' (' + keep.pri +
        ') over ' + chalk.red(drop.type) + ' (' + drop.pri + ')' + ' for ' + ext
      );
    }

    // Cache the hightest ranking type for this extension
    if (keep == entry) byExtension[ext] = entry;
  });
}

function writeTypesFile(types, path) {
  fs.writeFileSync(path, 'module.exports = ' + JSON.stringify(types) + ';');
}

// Segregate into standard and non-standard types based on facet per
// https://tools.ietf.org/html/rfc6838#section-3.1
var standard = {};
var other = {};

Object.keys(db).sort().forEach(function(k) {
  var entry = db[k];

  if (entry.extensions) {
    if (mimeScore(entry.type, entry.source) >= STANDARD_FACET_SCORE) {
      standard[entry.type] = entry.extensions;
    } else {
      other[entry.type] = entry.extensions;
    }
  }
});

writeTypesFile(standard, path.join(__dirname, '../types', 'standard.js'));
writeTypesFile(other, path.join(__dirname, '../types', 'other.js'));
