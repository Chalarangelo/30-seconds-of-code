"use strict";

var cheerio = require("cheerio");

var path = require("path");

var fs = require("fs");

var _ = require("lodash");

module.exports = function (htmlPath) {
  // load index.html to pull scripts/links necessary for proper offline reload
  var html;

  try {
    // load index.html to pull scripts/links necessary for proper offline reload
    html = fs.readFileSync(path.resolve(htmlPath));
  } catch (err) {
    // ENOENT means the file doesn't exist, which is to be expected when trying
    // to open 404.html if the user hasn't created a custom 404 page -- return
    // an empty array.
    if (err.code === "ENOENT") {
      return [];
    } else {
      throw err;
    }
  } // party like it's 2006


  var $ = cheerio.load(html); // holds any paths for scripts and links

  var criticalFilePaths = [];
  $("\n    script[src],\n    link[as=script],\n    link[as=font],\n    link[as=fetch],\n    link[rel=stylesheet],\n    style[data-href]\n  ").each(function (_, elem) {
    var $elem = $(elem);
    var url = $elem.attr("src") || $elem.attr("href") || $elem.attr("data-href"); // Don't cache XML files, or external resources (beginning with // or http)

    var blackListRegex = /(\.xml$|^\/\/|^http)/;

    if (!blackListRegex.test(url)) {
      criticalFilePaths.push(url.replace(/^\//, ""));
    }
  });
  return _.uniq(criticalFilePaths);
};