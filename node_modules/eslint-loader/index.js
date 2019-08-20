"use strict";

//var fs = require("fs");
var assign = require("object-assign");
var loaderUtils = require("loader-utils");
var objectHash = require("object-hash");
var createCache = require("loader-fs-cache");

var pkg = require("./package.json");

var cache = createCache("eslint-loader");

var engines = {};

/**
 * Class representing an ESLintError.
 * @extends Error
 */
class ESLintError extends Error {
  /**
   * Create an ESLintError.
   * @param {string} messages - Formatted eslint errors.
   */
  constructor(messages) {
    super();
    this.name = "ESLintError";
    this.message = messages;
    this.stack = "";
  }

  /**
   * Returns a stringified representation of our error. This method is called
   * when an error is consumed by console methods
   * ex: console.error(new ESLintError(formattedMessage))
   * @return {string} error - A stringified representation of the error.
   */
  inspect() {
    return this.message;
  }
}

/**
 * printLinterOutput
 *
 * @param {Object} eslint.executeOnText return value
 * @param {Object} config eslint configuration
 * @param {Object} webpack webpack instance
 * @return {void}
 */
function printLinterOutput(res, config, webpack) {
  // skip ignored file warning
  if (
    !(
      res.warningCount === 1 &&
      res.results[0].messages[0] &&
      res.results[0].messages[0].message &&
      res.results[0].messages[0].message.indexOf("ignore") > 1
    )
  ) {
    // quiet filter done now
    // eslint allow rules to be specified in the input between comments
    // so we can found warnings defined in the input itself
    if (res.warningCount && config.quiet) {
      res.warningCount = 0;
      res.results[0].warningCount = 0;
      res.results[0].messages = res.results[0].messages.filter(function(
        message
      ) {
        return message.severity !== 1;
      });
    }

    // if enabled, use eslint auto-fixing where possible
    if (
      config.fix &&
      (res.results[0].output !== res.src ||
        res.results[0].fixableErrorCount > 0 ||
        res.results[0].fixableWarningCount > 0)
    ) {
      var eslint = require(config.eslintPath);
      eslint.CLIEngine.outputFixes(res);
    }

    if (res.errorCount || res.warningCount) {
      // add filename for each results so formatter can have relevant filename
      res.results.forEach(function(r) {
        r.filePath = webpack.resourcePath;
      });
      var messages = config.formatter(res.results);

      if (config.outputReport && config.outputReport.filePath) {
        var reportOutput;
        // if a different formatter is passed in as an option use that
        if (config.outputReport.formatter) {
          reportOutput = config.outputReport.formatter(res.results);
        } else {
          reportOutput = messages;
        }
        var filePath = loaderUtils.interpolateName(
          webpack,
          config.outputReport.filePath,
          {
            content: res.results
              .map(function(r) {
                return r.source;
              })
              .join("\n")
          }
        );
        webpack.emitFile(filePath, reportOutput);
      }

      // default behavior: emit error only if we have errors
      var emitter = res.errorCount ? webpack.emitError : webpack.emitWarning;

      // force emitError or emitWarning if user want this
      if (config.emitError) {
        emitter = webpack.emitError;
      } else if (config.emitWarning) {
        emitter = webpack.emitWarning;
      }

      if (emitter) {
        if (config.failOnError && res.errorCount) {
          throw new ESLintError(
            "Module failed because of a eslint error.\n" + messages
          );
        } else if (config.failOnWarning && res.warningCount) {
          throw new ESLintError(
            "Module failed because of a eslint warning.\n" + messages
          );
        }

        emitter(new ESLintError(messages));
      } else {
        throw new Error(
          "Your module system doesn't support emitWarning. " +
            "Update available? \n" +
            messages
        );
      }
    }
  }
}

/**
 * webpack loader
 *
 * @param  {String|Buffer} input JavaScript string
 * @param {Object} map input source map
 * @return {void}
 */
module.exports = function(input, map) {
  var webpack = this;

  var userOptions = assign(
    // user defaults
    (webpack.options && webpack.options.eslint) || webpack.query || {},
    // loader query string
    loaderUtils.getOptions(webpack)
  );

  var eslintPkgPath = "eslint/package.json";
  var userEslintPath = eslintPkgPath;

  if (userOptions.eslintPath) {
    userEslintPath = userOptions.eslintPath + "/package.json";
  }

  var eslintVersion;

  try {
    eslintVersion = require(require.resolve(userEslintPath)).version;
  } catch (_) {
    // ignored
  }

  if (!eslintVersion) {
    try {
      eslintVersion = require(require.resolve(eslintPkgPath)).version;
    } catch (_) {
      // ignored
    }
  }

  var config = assign(
    // loader defaults
    {
      cacheIdentifier: JSON.stringify({
        "eslint-loader": pkg.version,
        eslint: eslintVersion || "unknown version"
      }),
      eslintPath: "eslint"
    },
    userOptions
  );

  if (typeof config.formatter === "string") {
    try {
      config.formatter = require(config.formatter);
      if (
        config.formatter &&
        typeof config.formatter !== "function" &&
        typeof config.formatter.default === "function"
      ) {
        config.formatter = config.formatter.default;
      }
    } catch (_) {
      // ignored
    }
  }

  var cacheDirectory = config.cache;
  var cacheIdentifier = config.cacheIdentifier;

  delete config.cacheIdentifier;

  // Create the engine only once per config
  var configHash = objectHash(config);

  if (!engines[configHash]) {
    var eslint = require(config.eslintPath);
    engines[configHash] = new eslint.CLIEngine(config);
  }

  var engine = engines[configHash];
  if (config.formatter == null || typeof config.formatter !== "function") {
    config.formatter = engine.getFormatter("stylish");
  }

  webpack.cacheable();

  var resourcePath = webpack.resourcePath;
  var cwd = process.cwd();

  // remove cwd from resource path in case webpack has been started from project
  // root, to allow having relative paths in .eslintignore
  if (resourcePath.indexOf(cwd) === 0) {
    resourcePath = resourcePath.substr(cwd.length + 1);
  }

  // return early if cached
  if (config.cache) {
    var callback = webpack.async();
    return cache(
      {
        directory: cacheDirectory,
        identifier: cacheIdentifier,
        options: config,
        source: input,
        transform: function() {
          return lint(engine, input, resourcePath);
        }
      },
      function(err, res) {
        if (err) {
          return callback(err);
        }

        try {
          printLinterOutput(
            assign({}, res || {}, { src: input }),
            config,
            webpack
          );
        } catch (e) {
          err = e;
        }
        return callback(err, input, map);
      }
    );
  }
  printLinterOutput(lint(engine, input, resourcePath), config, webpack);
  webpack.callback(null, input, map);
};

function lint(engine, input, resourcePath) {
  return engine.executeOnText(input, resourcePath, true);
}
