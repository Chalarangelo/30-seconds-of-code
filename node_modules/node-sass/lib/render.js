/*!
 * node-sass: lib/render.js
 */

var chalk = require('chalk'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  sass = require('./');

/**
 * Render
 *
 * @param {Object} options
 * @param {Object} emitter
 * @api public
 */

module.exports = function(options, emitter) {
  var renderOptions = {
    includePaths: options.includePath,
    omitSourceMapUrl: options.omitSourceMapUrl,
    indentedSyntax: options.indentedSyntax,
    outFile: options.dest,
    outputStyle: options.outputStyle,
    precision: options.precision,
    sourceComments: options.sourceComments,
    sourceMapEmbed: options.sourceMapEmbed,
    sourceMapContents: options.sourceMapContents,
    sourceMap: options.sourceMap,
    sourceMapRoot: options.sourceMapRoot,
    importer: options.importer,
    functions: options.functions,
    indentWidth: options.indentWidth,
    indentType: options.indentType,
    linefeed: options.linefeed
  };

  if (options.data) {
    renderOptions.data = options.data;
  } else if (options.src) {
    renderOptions.file = options.src;
  }

  var sourceMap = options.sourceMap;
  var destination = options.dest;
  var stdin = options.stdin;

  var success = function(result) {
    var todo = 1;
    var done = function() {
      if (--todo <= 0) {
        emitter.emit('done');
      }
    };

    if (!destination || stdin) {
      emitter.emit('log', result.css.toString());

      if (sourceMap && !options.sourceMapEmbed) {
        emitter.emit('log', result.map.toString());
      }

      return done();
    }

    emitter.emit('info', chalk.green('Rendering Complete, saving .css file...'));

    mkdirp(path.dirname(destination), function(err) {
      if (err) {
        return emitter.emit('error', chalk.red(err));
      }

      fs.writeFile(destination, result.css.toString(), function(err) {
        if (err) {
          return emitter.emit('error', chalk.red(err));
        }

        emitter.emit('info', chalk.green('Wrote CSS to ' + destination));
        emitter.emit('write', err, destination, result.css.toString());
        done();
      });
    });

    if (sourceMap) {
      todo++;

      mkdirp(path.dirname(sourceMap), function(err) {
        if (err) {
          return emitter.emit('error', chalk.red(err));
        }
        fs.writeFile(sourceMap, result.map, function(err) {
          if (err) {
            return emitter.emit('error', chalk.red('Error' + err));
          }

          emitter.emit('info', chalk.green('Wrote Source Map to ' + sourceMap));
          emitter.emit('write-source-map', err, sourceMap, result.map);
          done();
        });
      });
    }

    emitter.emit('render', result.css.toString());
  };

  var error = function(error) {
    emitter.emit('error', chalk.red(JSON.stringify(error, null, 2)));
  };

  var renderCallback = function(err, result) {
    if (err) {
      error(err);
    }
    else {
      success(result);
    }
  };

  sass.render(renderOptions, renderCallback);
};
