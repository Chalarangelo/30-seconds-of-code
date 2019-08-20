'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.readConfig = readConfig;
exports.readConfigs = readConfigs;
Object.defineProperty(exports, 'getTestEnvironment', {
  enumerable: true,
  get: function get() {
    return _utils.getTestEnvironment;
  }
});
Object.defineProperty(exports, 'isJSONString', {
  enumerable: true,
  get: function get() {
    return _utils.isJSONString;
  }
});
Object.defineProperty(exports, 'replaceRootDirInPath', {
  enumerable: true,
  get: function get() {
    return _utils.replaceRootDirInPath;
  }
});
Object.defineProperty(exports, 'normalize', {
  enumerable: true,
  get: function get() {
    return _normalize2.default;
  }
});
Object.defineProperty(exports, 'deprecationEntries', {
  enumerable: true,
  get: function get() {
    return _Deprecated.default;
  }
});
Object.defineProperty(exports, 'defaults', {
  enumerable: true,
  get: function get() {
    return _Defaults.default;
  }
});
Object.defineProperty(exports, 'descriptions', {
  enumerable: true,
  get: function get() {
    return _Descriptions.default;
  }
});

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

var _utils = require('./utils');

var _normalize2 = _interopRequireDefault(require('./normalize'));

var _resolveConfigPath = _interopRequireDefault(require('./resolveConfigPath'));

var _readConfigFileAndSetRootDir = _interopRequireDefault(
  require('./readConfigFileAndSetRootDir')
);

var _Deprecated = _interopRequireDefault(require('./Deprecated'));

var _Defaults = _interopRequireDefault(require('./Defaults'));

var _Descriptions = _interopRequireDefault(require('./Descriptions'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function readConfig(
  argv,
  packageRootOrConfig, // Whether it needs to look into `--config` arg passed to CLI.
  // It only used to read initial config. If the initial config contains
  // `project` property, we don't want to read `--config` value and rather
  skipArgvConfigOption,
  parentConfigPath,
  projectIndex = Infinity
) {
  let rawOptions;
  let configPath = null;

  if (typeof packageRootOrConfig !== 'string') {
    if (parentConfigPath) {
      const parentConfigDirname = _path().default.dirname(parentConfigPath);

      rawOptions = packageRootOrConfig;
      rawOptions.rootDir = rawOptions.rootDir
        ? (0, _utils.replaceRootDirInPath)(
            parentConfigDirname,
            rawOptions.rootDir
          )
        : parentConfigDirname;
    } else {
      throw new Error(
        'Jest: Cannot use configuration as an object without a file path.'
      );
    }
  } else if ((0, _utils.isJSONString)(argv.config)) {
    // A JSON string was passed to `--config` argument and we can parse it
    // and use as is.
    let config;

    try {
      config = JSON.parse(argv.config);
    } catch (e) {
      throw new Error(
        'There was an error while parsing the `--config` argument as a JSON string.'
      );
    } // NOTE: we might need to resolve this dir to an absolute path in the future

    config.rootDir = config.rootDir || packageRootOrConfig;
    rawOptions = config; // A string passed to `--config`, which is either a direct path to the config
    // or a path to directory containing `package.json` or `jest.config.js`
  } else if (!skipArgvConfigOption && typeof argv.config == 'string') {
    configPath = (0, _resolveConfigPath.default)(argv.config, process.cwd());
    rawOptions = (0, _readConfigFileAndSetRootDir.default)(configPath);
  } else {
    // Otherwise just try to find config in the current rootDir.
    configPath = (0, _resolveConfigPath.default)(
      packageRootOrConfig,
      process.cwd()
    );
    rawOptions = (0, _readConfigFileAndSetRootDir.default)(configPath);
  }

  const _normalize = (0, _normalize2.default)(
      rawOptions,
      argv,
      configPath,
      projectIndex
    ),
    options = _normalize.options,
    hasDeprecationWarnings = _normalize.hasDeprecationWarnings;

  const _groupOptions = groupOptions(options),
    globalConfig = _groupOptions.globalConfig,
    projectConfig = _groupOptions.projectConfig;

  return {
    configPath,
    globalConfig,
    hasDeprecationWarnings,
    projectConfig
  };
}

const groupOptions = options => ({
  globalConfig: Object.freeze({
    bail: options.bail,
    changedFilesWithAncestor: options.changedFilesWithAncestor,
    changedSince: options.changedSince,
    collectCoverage: options.collectCoverage,
    collectCoverageFrom: options.collectCoverageFrom,
    collectCoverageOnlyFrom: options.collectCoverageOnlyFrom,
    coverageDirectory: options.coverageDirectory,
    coverageReporters: options.coverageReporters,
    coverageThreshold: options.coverageThreshold,
    detectLeaks: options.detectLeaks,
    detectOpenHandles: options.detectOpenHandles,
    enabledTestsMap: options.enabledTestsMap,
    errorOnDeprecated: options.errorOnDeprecated,
    expand: options.expand,
    extraGlobals: options.extraGlobals,
    filter: options.filter,
    findRelatedTests: options.findRelatedTests,
    forceExit: options.forceExit,
    globalSetup: options.globalSetup,
    globalTeardown: options.globalTeardown,
    json: options.json,
    lastCommit: options.lastCommit,
    listTests: options.listTests,
    logHeapUsage: options.logHeapUsage,
    maxConcurrency: options.maxConcurrency,
    maxWorkers: options.maxWorkers,
    noSCM: undefined,
    noStackTrace: options.noStackTrace,
    nonFlagArgs: options.nonFlagArgs,
    notify: options.notify,
    notifyMode: options.notifyMode,
    onlyChanged: options.onlyChanged,
    onlyFailures: options.onlyFailures,
    outputFile: options.outputFile,
    passWithNoTests: options.passWithNoTests,
    projects: options.projects,
    replname: options.replname,
    reporters: options.reporters,
    rootDir: options.rootDir,
    runTestsByPath: options.runTestsByPath,
    silent: options.silent,
    skipFilter: options.skipFilter,
    testFailureExitCode: options.testFailureExitCode,
    testNamePattern: options.testNamePattern,
    testPathPattern: options.testPathPattern,
    testResultsProcessor: options.testResultsProcessor,
    testSequencer: options.testSequencer,
    testTimeout: options.testTimeout,
    updateSnapshot: options.updateSnapshot,
    useStderr: options.useStderr,
    verbose: options.verbose,
    watch: options.watch,
    watchAll: options.watchAll,
    watchPlugins: options.watchPlugins,
    watchman: options.watchman
  }),
  projectConfig: Object.freeze({
    automock: options.automock,
    browser: options.browser,
    cache: options.cache,
    cacheDirectory: options.cacheDirectory,
    clearMocks: options.clearMocks,
    coveragePathIgnorePatterns: options.coveragePathIgnorePatterns,
    cwd: options.cwd,
    dependencyExtractor: options.dependencyExtractor,
    detectLeaks: options.detectLeaks,
    detectOpenHandles: options.detectOpenHandles,
    displayName: options.displayName,
    errorOnDeprecated: options.errorOnDeprecated,
    extraGlobals: options.extraGlobals,
    filter: options.filter,
    forceCoverageMatch: options.forceCoverageMatch,
    globalSetup: options.globalSetup,
    globalTeardown: options.globalTeardown,
    globals: options.globals,
    haste: options.haste,
    moduleDirectories: options.moduleDirectories,
    moduleFileExtensions: options.moduleFileExtensions,
    moduleLoader: options.moduleLoader,
    moduleNameMapper: options.moduleNameMapper,
    modulePathIgnorePatterns: options.modulePathIgnorePatterns,
    modulePaths: options.modulePaths,
    name: options.name,
    prettierPath: options.prettierPath,
    resetMocks: options.resetMocks,
    resetModules: options.resetModules,
    resolver: options.resolver,
    restoreMocks: options.restoreMocks,
    rootDir: options.rootDir,
    roots: options.roots,
    runner: options.runner,
    setupFiles: options.setupFiles,
    setupFilesAfterEnv: options.setupFilesAfterEnv,
    skipFilter: options.skipFilter,
    skipNodeResolution: options.skipNodeResolution,
    snapshotResolver: options.snapshotResolver,
    snapshotSerializers: options.snapshotSerializers,
    testEnvironment: options.testEnvironment,
    testEnvironmentOptions: options.testEnvironmentOptions,
    testLocationInResults: options.testLocationInResults,
    testMatch: options.testMatch,
    testPathIgnorePatterns: options.testPathIgnorePatterns,
    testRegex: options.testRegex,
    testRunner: options.testRunner,
    testURL: options.testURL,
    timers: options.timers,
    transform: options.transform,
    transformIgnorePatterns: options.transformIgnorePatterns,
    unmockedModulePathPatterns: options.unmockedModulePathPatterns,
    watchPathIgnorePatterns: options.watchPathIgnorePatterns
  })
});

const ensureNoDuplicateConfigs = (parsedConfigs, projects) => {
  if (projects.length <= 1) {
    return;
  }

  const configPathMap = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = parsedConfigs[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      const config = _step.value;
      const configPath = config.configPath;

      if (configPathMap.has(configPath)) {
        const message = `Whoops! Two projects resolved to the same config path: ${_chalk().default.bold(
          String(configPath)
        )}:

  Project 1: ${_chalk().default.bold(
    projects[parsedConfigs.findIndex(x => x === config)]
  )}
  Project 2: ${_chalk().default.bold(
    projects[parsedConfigs.findIndex(x => x === configPathMap.get(configPath))]
  )}

This usually means that your ${_chalk().default.bold(
          '"projects"'
        )} config includes a directory that doesn't have any configuration recognizable by Jest. Please fix it.
`;
        throw new Error(message);
      }

      if (configPath !== null) {
        configPathMap.set(configPath, config);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}; // Possible scenarios:
//  1. jest --config config.json
//  2. jest --projects p1 p2
//  3. jest --projects p1 p2 --config config.json
//  4. jest --projects p1
//  5. jest
//
// If no projects are specified, process.cwd() will be used as the default
// (and only) project.

function readConfigs(argv, projectPaths) {
  let globalConfig;
  let hasDeprecationWarnings;
  let configs = [];
  let projects = projectPaths;
  let configPath;

  if (projectPaths.length === 1) {
    const parsedConfig = readConfig(argv, projects[0]);
    configPath = parsedConfig.configPath;

    if (parsedConfig.globalConfig.projects) {
      // If this was a single project, and its config has `projects`
      // settings, use that value instead.
      projects = parsedConfig.globalConfig.projects;
    }

    hasDeprecationWarnings = parsedConfig.hasDeprecationWarnings;
    globalConfig = parsedConfig.globalConfig;
    configs = [parsedConfig.projectConfig];

    if (globalConfig.projects && globalConfig.projects.length) {
      // Even though we had one project in CLI args, there might be more
      // projects defined in the config.
      projects = globalConfig.projects;
    }
  }

  if (
    projects.length > 1 ||
    (projects.length && typeof projects[0] === 'object')
  ) {
    const parsedConfigs = projects
      .filter(root => {
        // Ignore globbed files that cannot be `require`d.
        if (
          typeof root === 'string' &&
          _fs().default.existsSync(root) &&
          !_fs()
            .default.lstatSync(root)
            .isDirectory() &&
          !root.endsWith('.js') &&
          !root.endsWith('.json')
        ) {
          return false;
        }

        return true;
      })
      .map((root, projectIndex) =>
        readConfig(argv, root, true, configPath, projectIndex)
      );
    ensureNoDuplicateConfigs(parsedConfigs, projects);
    configs = parsedConfigs.map(({projectConfig}) => projectConfig);

    if (!hasDeprecationWarnings) {
      hasDeprecationWarnings = parsedConfigs.some(
        ({hasDeprecationWarnings}) => !!hasDeprecationWarnings
      );
    } // If no config was passed initially, use the one from the first project

    if (!globalConfig) {
      globalConfig = parsedConfigs[0].globalConfig;
    }
  }

  if (!globalConfig || !configs.length) {
    throw new Error('jest: No configuration found for any project.');
  }

  return {
    configs,
    globalConfig,
    hasDeprecationWarnings: !!hasDeprecationWarnings
  };
}
