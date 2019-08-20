var gulp       = require("gulp");
var istanbul   = require("gulp-istanbul");
var mocha      = require("gulp-mocha");
var plumber    = require("gulp-plumber");
var jshint     = require("gulp-jshint");
var uglify     = require("gulp-uglify");
var jscs       = require("gulp-jscs");
var coveralls  = require("gulp-coveralls");
var rename     = require("gulp-rename");
var options    = require("yargs").argv;

var pkg = require("./package");

/**
 */

var paths = {
  testFiles  : ["test/**/*-test.js"],
  appFiles   : ["sift.js"],
  allFiles   : ["test/**/*-test.js", "sift.js"]
};

/**
 */

var mochaOptions = {
  bail     : options.bail     !== 'false',
  reporter : options.reporter || 'dot',
  grep     : options.grep   || options.only,
  timeout  : 500
}

/**
 */

gulp.task("test-coverage", function (complete) {
  gulp.
  src(paths.appFiles).
  pipe(istanbul()).
  pipe(istanbul.hookRequire()).
  on("finish", function () {
    gulp.
    src(paths.testFiles).
    pipe(plumber()).
    pipe(mocha(mochaOptions)).
    pipe(istanbul.writeReports({
        reporters: ["text","text-summary", "lcov"]
    })).
    on("end", complete);
  });
});

/**
 */

gulp.task("test-coveralls", ["test-coverage"], function () {
  return gulp.
  src("coverage/**/lcov.info").
  pipe(coveralls());
});
/**
 */

gulp.task("minify", function() {
  return gulp.
  src("./" + pkg.name + ".js").
  pipe(uglify()).
  pipe(rename(function(path) {
      path.basename += ".min";
  })).
  pipe(gulp.dest("./"));
});

/**
 */

gulp.task("lint", function() {
  return gulp.run(["jshint", "jscs"]);
});

/**
 */

gulp.task("jscs", function() {
  return gulp.
  src(paths.allFiles).
  pipe(jscs({
    "preset": "google",
    "requireParenthesesAroundIIFE": true,
    "maximumLineLength": 200,
    "validateLineBreaks": "LF",
    "validateIndentation": 2,
    "validateQuoteMarks": "\"",

    "disallowKeywords": ["with"],
    "disallowSpacesInsideObjectBrackets": null,
    "disallowImplicitTypeConversion": ["string"],
    "requireCurlyBraces": [],

    "safeContextKeyword": "self"
  }));
});

/**
 */

gulp.task("jshint", function() {
    return gulp.
    src(paths.allFiles).
    pipe(jshint({
      es3: true,
      evil: true
    })).
    pipe(jshint.reporter('default'));
});

/**
 */

gulp.task("test", function (complete) {
  gulp.
  src(paths.testFiles, { read: false }).
  pipe(plumber()).
  pipe(mocha(mochaOptions)).
  on("error", complete).
  on("end", complete);
});

var iofwatch = process.argv.indexOf("watch");

/**
 * runs previous tasks (1 or more)
 */

gulp.task("watch", function () {
  gulp.watch(paths.allFiles, process.argv.slice(2, iofwatch));
});

/**
 */

gulp.task("default", function () {
  return gulp.run("test-coverage");
});

/**
 */

gulp.doneCallback = function (err) {

  // a bit hacky, but fixes issue with testing where process
  // doesn't exist process. Also fixes case where timeout / interval are set (CC)
  if (!~iofwatch) process.exit(err ? 1 : 0);
};
