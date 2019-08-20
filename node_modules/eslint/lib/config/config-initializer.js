/**
 * @fileoverview Config initialization wizard.
 * @author Ilya Volodin
 */


"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const util = require("util"),
    inquirer = require("inquirer"),
    ProgressBar = require("progress"),
    semver = require("semver"),
    autoconfig = require("./autoconfig.js"),
    ConfigFile = require("./config-file"),
    ConfigOps = require("./config-ops"),
    getSourceCodeOfFiles = require("../util/source-code-utils").getSourceCodeOfFiles,
    ModuleResolver = require("../util/module-resolver"),
    npmUtils = require("../util/npm-utils"),
    recConfig = require("../../conf/eslint-recommended"),
    log = require("../util/logging");

const debug = require("debug")("eslint:config-initializer");

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

const DEFAULT_ECMA_VERSION = 2018;

/* istanbul ignore next: hard to test fs function */
/**
 * Create .eslintrc file in the current working directory
 * @param {Object} config object that contains user's answers
 * @param {string} format The file format to write to.
 * @returns {void}
 */
function writeFile(config, format) {

    // default is .js
    let extname = ".js";

    if (format === "YAML") {
        extname = ".yml";
    } else if (format === "JSON") {
        extname = ".json";
    }

    const installedESLint = config.installedESLint;

    delete config.installedESLint;

    ConfigFile.write(config, `./.eslintrc${extname}`);
    log.info(`Successfully created .eslintrc${extname} file in ${process.cwd()}`);

    if (installedESLint) {
        log.info("ESLint was installed locally. We recommend using this local copy instead of your globally-installed copy.");
    }
}

/**
 * Get the peer dependencies of the given module.
 * This adds the gotten value to cache at the first time, then reuses it.
 * In a process, this function is called twice, but `npmUtils.fetchPeerDependencies` needs to access network which is relatively slow.
 * @param {string} moduleName The module name to get.
 * @returns {Object} The peer dependencies of the given module.
 * This object is the object of `peerDependencies` field of `package.json`.
 * Returns null if npm was not found.
 */
function getPeerDependencies(moduleName) {
    let result = getPeerDependencies.cache.get(moduleName);

    if (!result) {
        log.info(`Checking peerDependencies of ${moduleName}`);

        result = npmUtils.fetchPeerDependencies(moduleName);
        getPeerDependencies.cache.set(moduleName, result);
    }

    return result;
}
getPeerDependencies.cache = new Map();

/**
 * Return necessary plugins, configs, parsers, etc. based on the config
 * @param   {Object} config  config object
 * @param   {boolean} [installESLint=true]  If `false` is given, it does not install eslint.
 * @returns {string[]} An array of modules to be installed.
 */
function getModulesList(config, installESLint) {
    const modules = {};

    // Create a list of modules which should be installed based on config
    if (config.plugins) {
        for (const plugin of config.plugins) {
            modules[`eslint-plugin-${plugin}`] = "latest";
        }
    }
    if (config.extends && config.extends.indexOf("eslint:") === -1) {
        const moduleName = `eslint-config-${config.extends}`;

        modules[moduleName] = "latest";
        Object.assign(
            modules,
            getPeerDependencies(`${moduleName}@latest`)
        );
    }

    if (installESLint === false) {
        delete modules.eslint;
    } else {
        const installStatus = npmUtils.checkDevDeps(["eslint"]);

        // Mark to show messages if it's new installation of eslint.
        if (installStatus.eslint === false) {
            log.info("Local ESLint installation not found.");
            modules.eslint = modules.eslint || "latest";
            config.installedESLint = true;
        }
    }

    return Object.keys(modules).map(name => `${name}@${modules[name]}`);
}

/**
 * Set the `rules` of a config by examining a user's source code
 *
 * Note: This clones the config object and returns a new config to avoid mutating
 * the original config parameter.
 *
 * @param   {Object} answers  answers received from inquirer
 * @param   {Object} config   config object
 * @returns {Object}          config object with configured rules
 */
function configureRules(answers, config) {
    const BAR_TOTAL = 20,
        BAR_SOURCE_CODE_TOTAL = 4,
        newConfig = Object.assign({}, config),
        disabledConfigs = {};
    let sourceCodes,
        registry;

    // Set up a progress bar, as this process can take a long time
    const bar = new ProgressBar("Determining Config: :percent [:bar] :elapseds elapsed, eta :etas ", {
        width: 30,
        total: BAR_TOTAL
    });

    bar.tick(0); // Shows the progress bar

    // Get the SourceCode of all chosen files
    const patterns = answers.patterns.split(/[\s]+/u);

    try {
        sourceCodes = getSourceCodeOfFiles(patterns, { baseConfig: newConfig, useEslintrc: false }, total => {
            bar.tick((BAR_SOURCE_CODE_TOTAL / total));
        });
    } catch (e) {
        log.info("\n");
        throw e;
    }
    const fileQty = Object.keys(sourceCodes).length;

    if (fileQty === 0) {
        log.info("\n");
        throw new Error("Automatic Configuration failed.  No files were able to be parsed.");
    }

    // Create a registry of rule configs
    registry = new autoconfig.Registry();
    registry.populateFromCoreRules();

    // Lint all files with each rule config in the registry
    registry = registry.lintSourceCode(sourceCodes, newConfig, total => {
        bar.tick((BAR_TOTAL - BAR_SOURCE_CODE_TOTAL) / total); // Subtract out ticks used at beginning
    });
    debug(`\nRegistry: ${util.inspect(registry.rules, { depth: null })}`);

    // Create a list of recommended rules, because we don't want to disable them
    const recRules = Object.keys(recConfig.rules).filter(ruleId => ConfigOps.isErrorSeverity(recConfig.rules[ruleId]));

    // Find and disable rules which had no error-free configuration
    const failingRegistry = registry.getFailingRulesRegistry();

    Object.keys(failingRegistry.rules).forEach(ruleId => {

        // If the rule is recommended, set it to error, otherwise disable it
        disabledConfigs[ruleId] = (recRules.indexOf(ruleId) !== -1) ? 2 : 0;
    });

    // Now that we know which rules to disable, strip out configs with errors
    registry = registry.stripFailingConfigs();

    /*
     * If there is only one config that results in no errors for a rule, we should use it.
     * createConfig will only add rules that have one configuration in the registry.
     */
    const singleConfigs = registry.createConfig().rules;

    /*
     * The "sweet spot" for number of options in a config seems to be two (severity plus one option).
     * Very often, a third option (usually an object) is available to address
     * edge cases, exceptions, or unique situations. We will prefer to use a config with
     * specificity of two.
     */
    const specTwoConfigs = registry.filterBySpecificity(2).createConfig().rules;

    // Maybe a specific combination using all three options works
    const specThreeConfigs = registry.filterBySpecificity(3).createConfig().rules;

    // If all else fails, try to use the default (severity only)
    const defaultConfigs = registry.filterBySpecificity(1).createConfig().rules;

    // Combine configs in reverse priority order (later take precedence)
    newConfig.rules = Object.assign({}, disabledConfigs, defaultConfigs, specThreeConfigs, specTwoConfigs, singleConfigs);

    // Make sure progress bar has finished (floating point rounding)
    bar.update(BAR_TOTAL);

    // Log out some stats to let the user know what happened
    const finalRuleIds = Object.keys(newConfig.rules);
    const totalRules = finalRuleIds.length;
    const enabledRules = finalRuleIds.filter(ruleId => (newConfig.rules[ruleId] !== 0)).length;
    const resultMessage = [
        `\nEnabled ${enabledRules} out of ${totalRules}`,
        `rules based on ${fileQty}`,
        `file${(fileQty === 1) ? "." : "s."}`
    ].join(" ");

    log.info(resultMessage);

    ConfigOps.normalizeToStrings(newConfig);
    return newConfig;
}

/**
 * process user's answers and create config object
 * @param {Object} answers answers received from inquirer
 * @returns {Object} config object
 */
function processAnswers(answers) {
    let config = {
        rules: {},
        env: {},
        parserOptions: {},
        extends: []
    };

    // set the latest ECMAScript version
    config.parserOptions.ecmaVersion = DEFAULT_ECMA_VERSION;
    config.env.es6 = true;
    config.globals = {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    };

    // set the module type
    if (answers.moduleType === "esm") {
        config.parserOptions.sourceType = "module";
    } else if (answers.moduleType === "commonjs") {
        config.env.commonjs = true;
    }

    // add in browser and node environments if necessary
    answers.env.forEach(env => {
        config.env[env] = true;
    });

    // add in library information
    if (answers.framework === "react") {
        config.parserOptions.ecmaFeatures = {
            jsx: true
        };
        config.plugins = ["react"];
    } else if (answers.framework === "vue") {
        config.plugins = ["vue"];
        config.extends.push("plugin:vue/essential");
    }

    // setup rules based on problems/style enforcement preferences
    if (answers.purpose === "problems") {
        config.extends.unshift("eslint:recommended");
    } else if (answers.purpose === "style") {
        if (answers.source === "prompt") {
            config.extends.unshift("eslint:recommended");
            config.rules.indent = ["error", answers.indent];
            config.rules.quotes = ["error", answers.quotes];
            config.rules["linebreak-style"] = ["error", answers.linebreak];
            config.rules.semi = ["error", answers.semi ? "always" : "never"];
        } else if (answers.source === "auto") {
            config = configureRules(answers, config);
            config = autoconfig.extendFromRecommended(config);
        }
    }

    // normalize extends
    if (config.extends.length === 0) {
        delete config.extends;
    } else if (config.extends.length === 1) {
        config.extends = config.extends[0];
    }

    ConfigOps.normalizeToStrings(config);
    return config;
}

/**
 * process user's style guide of choice and return an appropriate config object.
 * @param {string} guide name of the chosen style guide
 * @returns {Object} config object
 */
function getConfigForStyleGuide(guide) {
    const guides = {
        google: { extends: "google" },
        airbnb: { extends: "airbnb" },
        "airbnb-base": { extends: "airbnb-base" },
        standard: { extends: "standard" }
    };

    if (!guides[guide]) {
        throw new Error("You referenced an unsupported guide.");
    }

    return guides[guide];
}

/**
 * Get the version of the local ESLint.
 * @returns {string|null} The version. If the local ESLint was not found, returns null.
 */
function getLocalESLintVersion() {
    try {
        const resolver = new ModuleResolver();
        const eslintPath = resolver.resolve("eslint", process.cwd());
        const eslint = require(eslintPath);

        return eslint.linter.version || null;
    } catch (_err) {
        return null;
    }
}

/**
 * Get the shareable config name of the chosen style guide.
 * @param {Object} answers The answers object.
 * @returns {string} The shareable config name.
 */
function getStyleGuideName(answers) {
    if (answers.styleguide === "airbnb" && answers.framework !== "react") {
        return "airbnb-base";
    }
    return answers.styleguide;
}

/**
 * Check whether the local ESLint version conflicts with the required version of the chosen shareable config.
 * @param {Object} answers The answers object.
 * @returns {boolean} `true` if the local ESLint is found then it conflicts with the required version of the chosen shareable config.
 */
function hasESLintVersionConflict(answers) {

    // Get the local ESLint version.
    const localESLintVersion = getLocalESLintVersion();

    if (!localESLintVersion) {
        return false;
    }

    // Get the required range of ESLint version.
    const configName = getStyleGuideName(answers);
    const moduleName = `eslint-config-${configName}@latest`;
    const peerDependencies = getPeerDependencies(moduleName) || {};
    const requiredESLintVersionRange = peerDependencies.eslint;

    if (!requiredESLintVersionRange) {
        return false;
    }

    answers.localESLintVersion = localESLintVersion;
    answers.requiredESLintVersionRange = requiredESLintVersionRange;

    // Check the version.
    if (semver.satisfies(localESLintVersion, requiredESLintVersionRange)) {
        answers.installESLint = false;
        return false;
    }

    return true;
}

/**
 * Install modules.
 * @param   {string[]} modules Modules to be installed.
 * @returns {void}
 */
function installModules(modules) {
    log.info(`Installing ${modules.join(", ")}`);
    npmUtils.installSyncSaveDev(modules);
}

/* istanbul ignore next: no need to test inquirer */
/**
 * Ask user to install modules.
 * @param   {string[]} modules Array of modules to be installed.
 * @param   {boolean} packageJsonExists Indicates if package.json is existed.
 * @returns {Promise} Answer that indicates if user wants to install.
 */
function askInstallModules(modules, packageJsonExists) {

    // If no modules, do nothing.
    if (modules.length === 0) {
        return Promise.resolve();
    }

    log.info("The config that you've selected requires the following dependencies:\n");
    log.info(modules.join(" "));
    return inquirer.prompt([
        {
            type: "confirm",
            name: "executeInstallation",
            message: "Would you like to install them now with npm?",
            default: true,
            when() {
                return modules.length && packageJsonExists;
            }
        }
    ]).then(({ executeInstallation }) => {
        if (executeInstallation) {
            installModules(modules);
        }
    });
}

/* istanbul ignore next: no need to test inquirer */
/**
 * Ask use a few questions on command prompt
 * @returns {Promise} The promise with the result of the prompt
 */
function promptUser() {

    return inquirer.prompt([
        {
            type: "list",
            name: "purpose",
            message: "How would you like to use ESLint?",
            default: "problems",
            choices: [
                { name: "To check syntax only", value: "syntax" },
                { name: "To check syntax and find problems", value: "problems" },
                { name: "To check syntax, find problems, and enforce code style", value: "style" }
            ]
        },
        {
            type: "list",
            name: "moduleType",
            message: "What type of modules does your project use?",
            default: "esm",
            choices: [
                { name: "JavaScript modules (import/export)", value: "esm" },
                { name: "CommonJS (require/exports)", value: "commonjs" },
                { name: "None of these", value: "none" }
            ]
        },
        {
            type: "list",
            name: "framework",
            message: "Which framework does your project use?",
            default: "react",
            choices: [
                { name: "React", value: "react" },
                { name: "Vue.js", value: "vue" },
                { name: "None of these", value: "none" }
            ]
        },
        {
            type: "checkbox",
            name: "env",
            message: "Where does your code run?",
            default: ["browser"],
            choices: [
                { name: "Browser", value: "browser" },
                { name: "Node", value: "node" }
            ]
        },
        {
            type: "list",
            name: "source",
            message: "How would you like to define a style for your project?",
            default: "guide",
            choices: [
                { name: "Use a popular style guide", value: "guide" },
                { name: "Answer questions about your style", value: "prompt" },
                { name: "Inspect your JavaScript file(s)", value: "auto" }
            ],
            when(answers) {
                return answers.purpose === "style";
            }
        },
        {
            type: "list",
            name: "styleguide",
            message: "Which style guide do you want to follow?",
            choices: [
                { name: "Airbnb (https://github.com/airbnb/javascript)", value: "airbnb" },
                { name: "Standard (https://github.com/standard/standard)", value: "standard" },
                { name: "Google (https://github.com/google/eslint-config-google)", value: "google" }
            ],
            when(answers) {
                answers.packageJsonExists = npmUtils.checkPackageJson();
                return answers.source === "guide" && answers.packageJsonExists;
            }
        },
        {
            type: "input",
            name: "patterns",
            message: "Which file(s), path(s), or glob(s) should be examined?",
            when(answers) {
                return (answers.source === "auto");
            },
            validate(input) {
                if (input.trim().length === 0 && input.trim() !== ",") {
                    return "You must tell us what code to examine. Try again.";
                }
                return true;
            }
        },
        {
            type: "list",
            name: "format",
            message: "What format do you want your config file to be in?",
            default: "JavaScript",
            choices: ["JavaScript", "YAML", "JSON"]
        },
        {
            type: "confirm",
            name: "installESLint",
            message(answers) {
                const verb = semver.ltr(answers.localESLintVersion, answers.requiredESLintVersionRange)
                    ? "upgrade"
                    : "downgrade";

                return `The style guide "${answers.styleguide}" requires eslint@${answers.requiredESLintVersionRange}. You are currently using eslint@${answers.localESLintVersion}.\n  Do you want to ${verb}?`;
            },
            default: true,
            when(answers) {
                return answers.source === "guide" && answers.packageJsonExists && hasESLintVersionConflict(answers);
            }
        }
    ]).then(earlyAnswers => {

        // early exit if no style guide is necessary
        if (earlyAnswers.purpose !== "style") {
            const config = processAnswers(earlyAnswers);
            const modules = getModulesList(config);

            return askInstallModules(modules, earlyAnswers.packageJsonExists)
                .then(() => writeFile(config, earlyAnswers.format));
        }

        // early exit if you are using a style guide
        if (earlyAnswers.source === "guide") {
            if (!earlyAnswers.packageJsonExists) {
                log.info("A package.json is necessary to install plugins such as style guides. Run `npm init` to create a package.json file and try again.");
                return void 0;
            }
            if (earlyAnswers.installESLint === false && !semver.satisfies(earlyAnswers.localESLintVersion, earlyAnswers.requiredESLintVersionRange)) {
                log.info(`Note: it might not work since ESLint's version is mismatched with the ${earlyAnswers.styleguide} config.`);
            }
            if (earlyAnswers.styleguide === "airbnb" && earlyAnswers.framework !== "react") {
                earlyAnswers.styleguide = "airbnb-base";
            }

            const config = ConfigOps.merge(processAnswers(earlyAnswers), getConfigForStyleGuide(earlyAnswers.styleguide));
            const modules = getModulesList(config);

            return askInstallModules(modules, earlyAnswers.packageJsonExists)
                .then(() => writeFile(config, earlyAnswers.format));

        }

        if (earlyAnswers.source === "auto") {
            const combinedAnswers = Object.assign({}, earlyAnswers);
            const config = processAnswers(combinedAnswers);
            const modules = getModulesList(config);

            return askInstallModules(modules).then(() => writeFile(config, earlyAnswers.format));
        }

        // continue with the style questions otherwise...
        return inquirer.prompt([
            {
                type: "list",
                name: "indent",
                message: "What style of indentation do you use?",
                default: "tab",
                choices: [{ name: "Tabs", value: "tab" }, { name: "Spaces", value: 4 }]
            },
            {
                type: "list",
                name: "quotes",
                message: "What quotes do you use for strings?",
                default: "double",
                choices: [{ name: "Double", value: "double" }, { name: "Single", value: "single" }]
            },
            {
                type: "list",
                name: "linebreak",
                message: "What line endings do you use?",
                default: "unix",
                choices: [{ name: "Unix", value: "unix" }, { name: "Windows", value: "windows" }]
            },
            {
                type: "confirm",
                name: "semi",
                message: "Do you require semicolons?",
                default: true
            },
            {
                type: "list",
                name: "format",
                message: "What format do you want your config file to be in?",
                default: "JavaScript",
                choices: ["JavaScript", "YAML", "JSON"]
            }
        ]).then(answers => {
            const totalAnswers = Object.assign({}, earlyAnswers, answers);

            const config = processAnswers(totalAnswers);
            const modules = getModulesList(config);

            return askInstallModules(modules).then(() => writeFile(config, answers.format));
        });
    });
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

const init = {
    getConfigForStyleGuide,
    getModulesList,
    hasESLintVersionConflict,
    installModules,
    processAnswers,
    /* istanbul ignore next */initializeConfig() {
        return promptUser();
    }
};

module.exports = init;
