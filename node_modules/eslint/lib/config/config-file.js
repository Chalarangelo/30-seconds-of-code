/**
 * @fileoverview Helper to locate and load configuration files.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require("fs"),
    path = require("path"),
    ConfigOps = require("./config-ops"),
    validator = require("./config-validator"),
    ModuleResolver = require("../util/module-resolver"),
    naming = require("../util/naming"),
    pathIsInside = require("path-is-inside"),
    stripComments = require("strip-json-comments"),
    stringify = require("json-stable-stringify-without-jsonify"),
    importFresh = require("import-fresh");

const debug = require("debug")("eslint:config-file");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Determines sort order for object keys for json-stable-stringify
 *
 * see: https://github.com/samn/json-stable-stringify#cmp
 *
 * @param   {Object} a The first comparison object ({key: akey, value: avalue})
 * @param   {Object} b The second comparison object ({key: bkey, value: bvalue})
 * @returns {number}   1 or -1, used in stringify cmp method
 */
function sortByKey(a, b) {
    return a.key > b.key ? 1 : -1;
}

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

const CONFIG_FILES = [
    ".eslintrc.js",
    ".eslintrc.yaml",
    ".eslintrc.yml",
    ".eslintrc.json",
    ".eslintrc",
    "package.json"
];

const resolver = new ModuleResolver();

/**
 * Convenience wrapper for synchronously reading file contents.
 * @param {string} filePath The filename to read.
 * @returns {string} The file contents, with the BOM removed.
 * @private
 */
function readFile(filePath) {
    return fs.readFileSync(filePath, "utf8").replace(/^\ufeff/u, "");
}

/**
 * Determines if a given string represents a filepath or not using the same
 * conventions as require(), meaning that the first character must be nonalphanumeric
 * and not the @ sign which is used for scoped packages to be considered a file path.
 * @param {string} filePath The string to check.
 * @returns {boolean} True if it's a filepath, false if not.
 * @private
 */
function isFilePath(filePath) {
    return path.isAbsolute(filePath) || !/\w|@/u.test(filePath.charAt(0));
}

/**
 * Loads a YAML configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadYAMLConfigFile(filePath) {
    debug(`Loading YAML config file: ${filePath}`);

    // lazy load YAML to improve performance when not used
    const yaml = require("js-yaml");

    try {

        // empty YAML file can be null, so always use
        return yaml.safeLoad(readFile(filePath)) || {};
    } catch (e) {
        debug(`Error reading YAML file: ${filePath}`);
        e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
        throw e;
    }
}

/**
 * Loads a JSON configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadJSONConfigFile(filePath) {
    debug(`Loading JSON config file: ${filePath}`);

    try {
        return JSON.parse(stripComments(readFile(filePath)));
    } catch (e) {
        debug(`Error reading JSON file: ${filePath}`);
        e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
        e.messageTemplate = "failed-to-read-json";
        e.messageData = {
            path: filePath,
            message: e.message
        };
        throw e;
    }
}

/**
 * Loads a legacy (.eslintrc) configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadLegacyConfigFile(filePath) {
    debug(`Loading config file: ${filePath}`);

    // lazy load YAML to improve performance when not used
    const yaml = require("js-yaml");

    try {
        return yaml.safeLoad(stripComments(readFile(filePath))) || /* istanbul ignore next */ {};
    } catch (e) {
        debug(`Error reading YAML file: ${filePath}`);
        e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
        throw e;
    }
}

/**
 * Loads a JavaScript configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadJSConfigFile(filePath) {
    debug(`Loading JS config file: ${filePath}`);
    try {
        return importFresh(filePath);
    } catch (e) {
        debug(`Error reading JavaScript file: ${filePath}`);
        e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
        throw e;
    }
}

/**
 * Loads a configuration from a package.json file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadPackageJSONConfigFile(filePath) {
    debug(`Loading package.json config file: ${filePath}`);
    try {
        return loadJSONConfigFile(filePath).eslintConfig || null;
    } catch (e) {
        debug(`Error reading package.json file: ${filePath}`);
        e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
        throw e;
    }
}

/**
 * Creates an error to notify about a missing config to extend from.
 * @param {string} configName The name of the missing config.
 * @returns {Error} The error object to throw
 * @private
 */
function configMissingError(configName) {
    const error = new Error(`Failed to load config "${configName}" to extend from.`);

    error.messageTemplate = "extend-config-missing";
    error.messageData = {
        configName
    };
    return error;
}

/**
 * Loads a configuration file regardless of the source. Inspects the file path
 * to determine the correctly way to load the config file.
 * @param {Object} file The path to the configuration.
 * @returns {Object} The configuration information.
 * @private
 */
function loadConfigFile(file) {
    const filePath = file.filePath;
    let config;

    switch (path.extname(filePath)) {
        case ".js":
            config = loadJSConfigFile(filePath);
            if (file.configName) {
                config = config.configs[file.configName];
                if (!config) {
                    throw configMissingError(file.configFullName);
                }
            }
            break;

        case ".json":
            if (path.basename(filePath) === "package.json") {
                config = loadPackageJSONConfigFile(filePath);
                if (config === null) {
                    return null;
                }
            } else {
                config = loadJSONConfigFile(filePath);
            }
            break;

        case ".yaml":
        case ".yml":
            config = loadYAMLConfigFile(filePath);
            break;

        default:
            config = loadLegacyConfigFile(filePath);
    }

    return ConfigOps.merge(ConfigOps.createEmptyConfig(), config);
}

/**
 * Writes a configuration file in JSON format.
 * @param {Object} config The configuration object to write.
 * @param {string} filePath The filename to write to.
 * @returns {void}
 * @private
 */
function writeJSONConfigFile(config, filePath) {
    debug(`Writing JSON config file: ${filePath}`);

    const content = stringify(config, { cmp: sortByKey, space: 4 });

    fs.writeFileSync(filePath, content, "utf8");
}

/**
 * Writes a configuration file in YAML format.
 * @param {Object} config The configuration object to write.
 * @param {string} filePath The filename to write to.
 * @returns {void}
 * @private
 */
function writeYAMLConfigFile(config, filePath) {
    debug(`Writing YAML config file: ${filePath}`);

    // lazy load YAML to improve performance when not used
    const yaml = require("js-yaml");

    const content = yaml.safeDump(config, { sortKeys: true });

    fs.writeFileSync(filePath, content, "utf8");
}

/**
 * Writes a configuration file in JavaScript format.
 * @param {Object} config The configuration object to write.
 * @param {string} filePath The filename to write to.
 * @throws {Error} If an error occurs linting the config file contents.
 * @returns {void}
 * @private
 */
function writeJSConfigFile(config, filePath) {
    debug(`Writing JS config file: ${filePath}`);

    let contentToWrite;
    const stringifiedContent = `module.exports = ${stringify(config, { cmp: sortByKey, space: 4 })};`;

    try {
        const CLIEngine = require("../cli-engine");
        const linter = new CLIEngine({
            baseConfig: config,
            fix: true,
            useEslintrc: false
        });
        const report = linter.executeOnText(stringifiedContent);

        contentToWrite = report.results[0].output || stringifiedContent;
    } catch (e) {
        debug("Error linting JavaScript config file, writing unlinted version");
        const errorMessage = e.message;

        contentToWrite = stringifiedContent;
        e.message = "An error occurred while generating your JavaScript config file. ";
        e.message += "A config file was still generated, but the config file itself may not follow your linting rules.";
        e.message += `\nError: ${errorMessage}`;
        throw e;
    } finally {
        fs.writeFileSync(filePath, contentToWrite, "utf8");
    }
}

/**
 * Writes a configuration file.
 * @param {Object} config The configuration object to write.
 * @param {string} filePath The filename to write to.
 * @returns {void}
 * @throws {Error} When an unknown file type is specified.
 * @private
 */
function write(config, filePath) {
    switch (path.extname(filePath)) {
        case ".js":
            writeJSConfigFile(config, filePath);
            break;

        case ".json":
            writeJSONConfigFile(config, filePath);
            break;

        case ".yaml":
        case ".yml":
            writeYAMLConfigFile(config, filePath);
            break;

        default:
            throw new Error("Can't write to unknown file type.");
    }
}

/**
 * Determines the base directory for node packages referenced in a config file.
 * This does not include node_modules in the path so it can be used for all
 * references relative to a config file.
 * @param {string} configFilePath The config file referencing the file.
 * @returns {string} The base directory for the file path.
 * @private
 */
function getBaseDir(configFilePath) {

    // calculates the path of the project including ESLint as dependency
    const projectPath = path.resolve(__dirname, "../../../");

    if (configFilePath && pathIsInside(configFilePath, projectPath)) {

        // be careful of https://github.com/substack/node-resolve/issues/78
        return path.join(path.resolve(configFilePath));
    }

    /*
     * default to ESLint project path since it's unlikely that plugins will be
     * in this directory
     */
    return path.join(projectPath);
}

/**
 * Determines the lookup path, including node_modules, for package
 * references relative to a config file.
 * @param {string} configFilePath The config file referencing the file.
 * @returns {string} The lookup path for the file path.
 * @private
 */
function getLookupPath(configFilePath) {
    const basedir = getBaseDir(configFilePath);

    return path.join(basedir, "node_modules");
}

/**
 * Resolves a eslint core config path
 * @param {string} name The eslint config name.
 * @returns {string} The resolved path of the config.
 * @private
 */
function getEslintCoreConfigPath(name) {
    if (name === "eslint:recommended") {

        /*
         * Add an explicit substitution for eslint:recommended to
         * conf/eslint-recommended.js.
         */
        return path.resolve(__dirname, "../../conf/eslint-recommended.js");
    }

    if (name === "eslint:all") {

        /*
         * Add an explicit substitution for eslint:all to conf/eslint-all.js
         */
        return path.resolve(__dirname, "../../conf/eslint-all.js");
    }

    throw configMissingError(name);
}

/**
 * Applies values from the "extends" field in a configuration file.
 * @param {Object} config The configuration information.
 * @param {Config} configContext Plugin context for the config instance
 * @param {string} filePath The file path from which the configuration information
 *      was loaded.
 * @param {string} [relativeTo] The path to resolve relative to.
 * @returns {Object} A new configuration object with all of the "extends" fields
 *      loaded and merged.
 * @private
 */
function applyExtends(config, configContext, filePath, relativeTo) {
    let configExtends = config.extends;

    // normalize into an array for easier handling
    if (!Array.isArray(config.extends)) {
        configExtends = [config.extends];
    }

    // Make the last element in an array take the highest precedence
    return configExtends.reduceRight((previousValue, parentPath) => {
        try {
            let extensionPath;

            if (parentPath.startsWith("eslint:")) {
                extensionPath = getEslintCoreConfigPath(parentPath);
            } else if (isFilePath(parentPath)) {

                /*
                 * If the `extends` path is relative, use the directory of the current configuration
                 * file as the reference point. Otherwise, use as-is.
                 */
                extensionPath = (path.isAbsolute(parentPath)
                    ? parentPath
                    : path.join(relativeTo || path.dirname(filePath), parentPath)
                );
            } else {
                extensionPath = parentPath;
            }
            debug(`Loading ${extensionPath}`);

            // eslint-disable-next-line no-use-before-define
            return ConfigOps.merge(load(extensionPath, configContext, relativeTo), previousValue);
        } catch (e) {

            /*
             * If the file referenced by `extends` failed to load, add the path
             * to the configuration file that referenced it to the error
             * message so the user is able to see where it was referenced from,
             * then re-throw.
             */
            e.message += `\nReferenced from: ${filePath}`;
            throw e;
        }

    }, config);
}

/**
 * Resolves a configuration file path into the fully-formed path, whether filename
 * or package name.
 * @param {string} filePath The filepath to resolve.
 * @param {string} [relativeTo] The path to resolve relative to.
 * @returns {Object} An object containing 3 properties:
 * - 'filePath' (required) the resolved path that can be used directly to load the configuration.
 * - 'configName' the name of the configuration inside the plugin.
 * - 'configFullName' (required) the name of the configuration as used in the eslint config(e.g. 'plugin:node/recommended'),
 *     or the absolute path to a config file. This should uniquely identify a config.
 * @private
 */
function resolve(filePath, relativeTo) {
    if (isFilePath(filePath)) {
        const fullPath = path.resolve(relativeTo || "", filePath);

        return { filePath: fullPath, configFullName: fullPath };
    }
    let normalizedPackageName;

    if (filePath.startsWith("plugin:")) {
        const configFullName = filePath;
        const pluginName = filePath.slice(7, filePath.lastIndexOf("/"));
        const configName = filePath.slice(filePath.lastIndexOf("/") + 1);

        normalizedPackageName = naming.normalizePackageName(pluginName, "eslint-plugin");
        debug(`Attempting to resolve ${normalizedPackageName}`);

        return {
            filePath: require.resolve(normalizedPackageName),
            configName,
            configFullName
        };
    }
    normalizedPackageName = naming.normalizePackageName(filePath, "eslint-config");
    debug(`Attempting to resolve ${normalizedPackageName}`);

    return {
        filePath: resolver.resolve(normalizedPackageName, getLookupPath(relativeTo)),
        configFullName: filePath
    };


}

/**
 * Loads a configuration file from the given file path.
 * @param {Object} resolvedPath The value from calling resolve() on a filename or package name.
 * @param {Config} configContext Plugins context
 * @returns {Object} The configuration information.
 */
function loadFromDisk(resolvedPath, configContext) {
    const dirname = path.dirname(resolvedPath.filePath),
        lookupPath = getLookupPath(dirname);
    let config = loadConfigFile(resolvedPath);

    if (config) {

        // ensure plugins are properly loaded first
        if (config.plugins) {
            configContext.plugins.loadAll(config.plugins);
        }

        // include full path of parser if present
        if (config.parser) {
            if (isFilePath(config.parser)) {
                config.parser = path.resolve(dirname || "", config.parser);
            } else {
                config.parser = resolver.resolve(config.parser, lookupPath);
            }
        }

        const ruleMap = configContext.linterContext.getRules();

        // validate the configuration before continuing
        validator.validate(config, ruleMap.get.bind(ruleMap), configContext.linterContext.environments, resolvedPath.configFullName);

        /*
         * If an `extends` property is defined, it represents a configuration file to use as
         * a "parent". Load the referenced file and merge the configuration recursively.
         */
        if (config.extends) {
            config = applyExtends(config, configContext, resolvedPath.filePath, dirname);
        }
    }

    return config;
}

/**
 * Loads a config object, applying extends if present.
 * @param {Object} configObject a config object to load
 * @param {Config} configContext Context for the config instance
 * @returns {Object} the config object with extends applied if present, or the passed config if not
 * @private
 */
function loadObject(configObject, configContext) {
    return configObject.extends ? applyExtends(configObject, configContext, "") : configObject;
}

/**
 * Loads a config object from the config cache based on its filename, falling back to the disk if the file is not yet
 * cached.
 * @param {string} filePath the path to the config file
 * @param {Config} configContext Context for the config instance
 * @param {string} [relativeTo] The path to resolve relative to.
 * @returns {Object} the parsed config object (empty object if there was a parse error)
 * @private
 */
function load(filePath, configContext, relativeTo) {
    const resolvedPath = resolve(filePath, relativeTo);

    const cachedConfig = configContext.configCache.getConfig(resolvedPath.configFullName);

    if (cachedConfig) {
        return cachedConfig;
    }

    const config = loadFromDisk(resolvedPath, configContext);

    if (config) {
        config.filePath = resolvedPath.filePath;
        config.baseDirectory = path.dirname(resolvedPath.filePath);
        configContext.configCache.setConfig(resolvedPath.configFullName, config);
    }

    return config;
}

/**
 * Checks whether the given filename points to a file
 * @param {string} filename A path to a file
 * @returns {boolean} `true` if a file exists at the given location
 */
function isExistingFile(filename) {
    try {
        return fs.statSync(filename).isFile();
    } catch (err) {
        if (err.code === "ENOENT") {
            return false;
        }
        throw err;
    }
}


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = {

    getBaseDir,
    getLookupPath,
    load,
    loadObject,
    resolve,
    write,
    applyExtends,
    CONFIG_FILES,

    /**
     * Retrieves the configuration filename for a given directory. It loops over all
     * of the valid configuration filenames in order to find the first one that exists.
     * @param {string} directory The directory to check for a config file.
     * @returns {?string} The filename of the configuration file for the directory
     *      or null if there is no configuration file in the directory.
     */
    getFilenameForDirectory(directory) {
        return CONFIG_FILES.map(filename => path.join(directory, filename)).find(isExistingFile) || null;
    }
};
