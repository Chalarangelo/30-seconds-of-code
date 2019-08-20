/**
 * @fileoverview Main CLI object.
 * @author Nicholas C. Zakas
 */

"use strict";

/*
 * The CLI object should *not* call process.exit() directly. It should only return
 * exit codes. This allows other programs to use the CLI object and still control
 * when the program exits.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require("fs"),
    path = require("path"),
    options = require("./options"),
    CLIEngine = require("./cli-engine"),
    mkdirp = require("mkdirp"),
    log = require("./util/logging");

const debug = require("debug")("eslint:cli");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Predicate function for whether or not to apply fixes in quiet mode.
 * If a message is a warning, do not apply a fix.
 * @param {LintResult} lintResult The lint result.
 * @returns {boolean} True if the lint message is an error (and thus should be
 * autofixed), false otherwise.
 */
function quietFixPredicate(lintResult) {
    return lintResult.severity === 2;
}

/**
 * Translates the CLI options into the options expected by the CLIEngine.
 * @param {Object} cliOptions The CLI options to translate.
 * @returns {CLIEngineOptions} The options object for the CLIEngine.
 * @private
 */
function translateOptions(cliOptions) {
    return {
        envs: cliOptions.env,
        extensions: cliOptions.ext,
        rules: cliOptions.rule,
        plugins: cliOptions.plugin,
        globals: cliOptions.global,
        ignore: cliOptions.ignore,
        ignorePath: cliOptions.ignorePath,
        ignorePattern: cliOptions.ignorePattern,
        configFile: cliOptions.config,
        rulePaths: cliOptions.rulesdir,
        useEslintrc: cliOptions.eslintrc,
        parser: cliOptions.parser,
        parserOptions: cliOptions.parserOptions,
        cache: cliOptions.cache,
        cacheFile: cliOptions.cacheFile,
        cacheLocation: cliOptions.cacheLocation,
        fix: (cliOptions.fix || cliOptions.fixDryRun) && (cliOptions.quiet ? quietFixPredicate : true),
        fixTypes: cliOptions.fixType,
        allowInlineConfig: cliOptions.inlineConfig,
        reportUnusedDisableDirectives: cliOptions.reportUnusedDisableDirectives
    };
}

/**
 * Outputs the results of the linting.
 * @param {CLIEngine} engine The CLIEngine to use.
 * @param {LintResult[]} results The results to print.
 * @param {string} format The name of the formatter to use or the path to the formatter.
 * @param {string} outputFile The path for the output file.
 * @returns {boolean} True if the printing succeeds, false if not.
 * @private
 */
function printResults(engine, results, format, outputFile) {
    let formatter;
    let rules;

    try {
        formatter = engine.getFormatter(format);
        rules = engine.getRules();
    } catch (e) {
        log.error(e.message);
        return false;
    }

    const rulesMeta = {};

    rules.forEach((rule, ruleId) => {
        rulesMeta[ruleId] = rule.meta;
    });

    const output = formatter(results, { rulesMeta });

    if (output) {
        if (outputFile) {
            const filePath = path.resolve(process.cwd(), outputFile);

            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
                log.error("Cannot write to output file path, it is a directory: %s", outputFile);
                return false;
            }

            try {
                mkdirp.sync(path.dirname(filePath));
                fs.writeFileSync(filePath, output);
            } catch (ex) {
                log.error("There was a problem writing the output file:\n%s", ex);
                return false;
            }
        } else {
            log.info(output);
        }
    }

    return true;

}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Encapsulates all CLI behavior for eslint. Makes it easier to test as well as
 * for other Node.js programs to effectively run the CLI.
 */
const cli = {

    /**
     * Executes the CLI based on an array of arguments that is passed in.
     * @param {string|Array|Object} args The arguments to process.
     * @param {string} [text] The text to lint (used for TTY).
     * @returns {int} The exit code for the operation.
     */
    execute(args, text) {
        if (Array.isArray(args)) {
            debug("CLI args: %o", args.slice(2));
        }

        let currentOptions;

        try {
            currentOptions = options.parse(args);
        } catch (error) {
            log.error(error.message);
            return 2;
        }

        const files = currentOptions._;

        const useStdin = typeof text === "string";

        if (currentOptions.version) { // version from package.json

            log.info(`v${require("../package.json").version}`);

        } else if (currentOptions.printConfig) {
            if (files.length) {
                log.error("The --print-config option must be used with exactly one file name.");
                return 2;
            }
            if (useStdin) {
                log.error("The --print-config option is not available for piped-in code.");
                return 2;
            }

            const engine = new CLIEngine(translateOptions(currentOptions));

            const fileConfig = engine.getConfigForFile(currentOptions.printConfig);

            log.info(JSON.stringify(fileConfig, null, "  "));
            return 0;
        } else if (currentOptions.help || (!files.length && !useStdin)) {

            log.info(options.generateHelp());

        } else {

            debug(`Running on ${useStdin ? "text" : "files"}`);

            if (currentOptions.fix && currentOptions.fixDryRun) {
                log.error("The --fix option and the --fix-dry-run option cannot be used together.");
                return 2;
            }

            if (useStdin && currentOptions.fix) {
                log.error("The --fix option is not available for piped-in code; use --fix-dry-run instead.");
                return 2;
            }

            if (currentOptions.fixType && !currentOptions.fix && !currentOptions.fixDryRun) {
                log.error("The --fix-type option requires either --fix or --fix-dry-run.");
                return 2;
            }

            const engine = new CLIEngine(translateOptions(currentOptions));
            const report = useStdin ? engine.executeOnText(text, currentOptions.stdinFilename, true) : engine.executeOnFiles(files);

            if (currentOptions.fix) {
                debug("Fix mode enabled - applying fixes");
                CLIEngine.outputFixes(report);
            }

            if (currentOptions.quiet) {
                debug("Quiet mode enabled - filtering out warnings");
                report.results = CLIEngine.getErrorResults(report.results);
            }

            if (printResults(engine, report.results, currentOptions.format, currentOptions.outputFile)) {
                const tooManyWarnings = currentOptions.maxWarnings >= 0 && report.warningCount > currentOptions.maxWarnings;

                if (!report.errorCount && tooManyWarnings) {
                    log.error("ESLint found too many warnings (maximum: %s).", currentOptions.maxWarnings);
                }

                return (report.errorCount || tooManyWarnings) ? 1 : 0;
            }
            return 2;


        }

        return 0;
    }
};

module.exports = cli;
