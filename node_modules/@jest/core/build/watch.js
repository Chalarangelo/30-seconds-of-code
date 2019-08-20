'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = watch;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _ansiEscapes() {
  const data = _interopRequireDefault(require('ansi-escapes'));

  _ansiEscapes = function _ansiEscapes() {
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

function _exit() {
  const data = _interopRequireDefault(require('exit'));

  _exit = function _exit() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _jestMessageUtil() {
  const data = require('jest-message-util');

  _jestMessageUtil = function _jestMessageUtil() {
    return data;
  };

  return data;
}

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

function _jestValidate() {
  const data = require('jest-validate');

  _jestValidate = function _jestValidate() {
    return data;
  };

  return data;
}

function _jestResolve() {
  const data = _interopRequireDefault(require('jest-resolve'));

  _jestResolve = function _jestResolve() {
    return data;
  };

  return data;
}

function _jestWatcher() {
  const data = require('jest-watcher');

  _jestWatcher = function _jestWatcher() {
    return data;
  };

  return data;
}

var _getChangedFilesPromise = _interopRequireDefault(
  require('./getChangedFilesPromise')
);

var _is_valid_path = _interopRequireDefault(require('./lib/is_valid_path'));

var _create_context = _interopRequireDefault(require('./lib/create_context'));

var _runJest = _interopRequireDefault(require('./runJest'));

var _update_global_config = _interopRequireDefault(
  require('./lib/update_global_config')
);

var _SearchSource = _interopRequireDefault(require('./SearchSource'));

var _TestWatcher = _interopRequireDefault(require('./TestWatcher'));

var _FailedTestsCache = _interopRequireDefault(require('./FailedTestsCache'));

var _test_path_pattern = _interopRequireDefault(
  require('./plugins/test_path_pattern')
);

var _test_name_pattern = _interopRequireDefault(
  require('./plugins/test_name_pattern')
);

var _update_snapshots = _interopRequireDefault(
  require('./plugins/update_snapshots')
);

var _update_snapshots_interactive = _interopRequireDefault(
  require('./plugins/update_snapshots_interactive')
);

var _quit = _interopRequireDefault(require('./plugins/quit'));

var _watch_plugins_helpers = require('./lib/watch_plugins_helpers');

var _active_filters_message = _interopRequireDefault(
  require('./lib/active_filters_message')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const preRunMessagePrint = _jestUtil().preRunMessage.print;

let hasExitListener = false;
const INTERNAL_PLUGINS = [
  _test_path_pattern.default,
  _test_name_pattern.default,
  _update_snapshots.default,
  _update_snapshots_interactive.default,
  _quit.default
];
const RESERVED_KEY_PLUGINS = new Map([
  [
    _update_snapshots.default,
    {
      forbiddenOverwriteMessage: 'updating snapshots',
      key: 'u'
    }
  ],
  [
    _update_snapshots_interactive.default,
    {
      forbiddenOverwriteMessage: 'updating snapshots interactively',
      key: 'i'
    }
  ],
  [
    _quit.default,
    {
      forbiddenOverwriteMessage: 'quitting watch mode'
    }
  ]
]);

function watch(
  initialGlobalConfig,
  contexts,
  outputStream,
  hasteMapInstances,
  stdin = process.stdin,
  hooks = new (_jestWatcher()).JestHook(),
  filter
) {
  // `globalConfig` will be constantly updated and reassigned as a result of
  // watch mode interactions.
  let globalConfig = initialGlobalConfig;
  let activePlugin;
  globalConfig = (0, _update_global_config.default)(globalConfig, {
    mode: globalConfig.watch ? 'watch' : 'watchAll',
    passWithNoTests: true
  });

  const updateConfigAndRun = ({
    bail,
    changedSince,
    collectCoverage,
    collectCoverageFrom,
    collectCoverageOnlyFrom,
    coverageDirectory,
    coverageReporters,
    mode,
    notify,
    notifyMode,
    onlyFailures,
    reporters,
    testNamePattern,
    testPathPattern,
    updateSnapshot,
    verbose
  } = {}) => {
    const previousUpdateSnapshot = globalConfig.updateSnapshot;
    globalConfig = (0, _update_global_config.default)(globalConfig, {
      bail,
      changedSince,
      collectCoverage,
      collectCoverageFrom,
      collectCoverageOnlyFrom,
      coverageDirectory,
      coverageReporters,
      mode,
      notify,
      notifyMode,
      onlyFailures,
      reporters,
      testNamePattern,
      testPathPattern,
      updateSnapshot,
      verbose
    });
    startRun(globalConfig);
    globalConfig = (0, _update_global_config.default)(globalConfig, {
      // updateSnapshot is not sticky after a run.
      updateSnapshot:
        previousUpdateSnapshot === 'all' ? 'none' : previousUpdateSnapshot
    });
  };

  const watchPlugins = INTERNAL_PLUGINS.map(
    InternalPlugin =>
      new InternalPlugin({
        stdin,
        stdout: outputStream
      })
  );
  watchPlugins.forEach(plugin => {
    const hookSubscriber = hooks.getSubscriber();

    if (plugin.apply) {
      plugin.apply(hookSubscriber);
    }
  });

  if (globalConfig.watchPlugins != null) {
    const watchPluginKeys = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = watchPlugins[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        const plugin = _step.value;
        const reservedInfo = RESERVED_KEY_PLUGINS.get(plugin.constructor) || {};
        const key = reservedInfo.key || getPluginKey(plugin, globalConfig);

        if (!key) {
          continue;
        }

        const forbiddenOverwriteMessage =
          reservedInfo.forbiddenOverwriteMessage;
        watchPluginKeys.set(key, {
          forbiddenOverwriteMessage,
          overwritable: forbiddenOverwriteMessage == null,
          plugin
        });
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
        var _iterator2 = globalConfig.watchPlugins[Symbol.iterator](), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        const pluginWithConfig = _step2.value;
        let plugin;

        try {
          const ThirdPartyPlugin = require(pluginWithConfig.path);

          plugin = new ThirdPartyPlugin({
            config: pluginWithConfig.config,
            stdin,
            stdout: outputStream
          });
        } catch (error) {
          const errorWithContext = new Error(
            `Failed to initialize watch plugin "${_chalk().default.bold(
              (0, _slash().default)(
                _path().default.relative(process.cwd(), pluginWithConfig.path)
              )
            )}":\n\n${(0, _jestMessageUtil().formatExecError)(
              error,
              contexts[0].config,
              {
                noStackTrace: false
              }
            )}`
          );
          delete errorWithContext.stack;
          return Promise.reject(errorWithContext);
        }

        checkForConflicts(watchPluginKeys, plugin, globalConfig);
        const hookSubscriber = hooks.getSubscriber();

        if (plugin.apply) {
          plugin.apply(hookSubscriber);
        }

        watchPlugins.push(plugin);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  const failedTestsCache = new _FailedTestsCache.default();
  let searchSources = contexts.map(context => ({
    context,
    searchSource: new _SearchSource.default(context)
  }));
  let isRunning = false;
  let testWatcher;
  let shouldDisplayWatchUsage = true;
  let isWatchUsageDisplayed = false;

  const emitFileChange = () => {
    if (hooks.isUsed('onFileChange')) {
      const projects = searchSources.map(({context, searchSource}) => ({
        config: context.config,
        testPaths: searchSource.findMatchingTests('').tests.map(t => t.path)
      }));
      hooks.getEmitter().onFileChange({
        projects
      });
    }
  };

  emitFileChange();
  hasteMapInstances.forEach((hasteMapInstance, index) => {
    hasteMapInstance.on('change', ({eventsQueue, hasteFS, moduleMap}) => {
      const validPaths = eventsQueue.filter(({filePath}) =>
        (0, _is_valid_path.default)(globalConfig, filePath)
      );

      if (validPaths.length) {
        const context = (contexts[index] = (0, _create_context.default)(
          contexts[index].config,
          {
            hasteFS,
            moduleMap
          }
        ));
        activePlugin = null;
        searchSources = searchSources.slice();
        searchSources[index] = {
          context,
          searchSource: new _SearchSource.default(context)
        };
        emitFileChange();
        startRun(globalConfig);
      }
    });
  });

  if (!hasExitListener) {
    hasExitListener = true;
    process.on('exit', () => {
      if (activePlugin) {
        outputStream.write(_ansiEscapes().default.cursorDown());
        outputStream.write(_ansiEscapes().default.eraseDown);
      }
    });
  }

  const startRun = globalConfig => {
    if (isRunning) {
      return Promise.resolve(null);
    }

    testWatcher = new _TestWatcher.default({
      isWatchMode: true
    });
    _jestUtil().isInteractive &&
      outputStream.write(_jestUtil().specialChars.CLEAR);
    preRunMessagePrint(outputStream);
    isRunning = true;
    const configs = contexts.map(context => context.config);
    const changedFilesPromise = (0, _getChangedFilesPromise.default)(
      globalConfig,
      configs
    ); // Clear cache for required modules

    _jestResolve().default.clearDefaultResolverCache();

    return (0, _runJest.default)({
      changedFilesPromise,
      contexts,
      failedTestsCache,
      filter,
      globalConfig,
      jestHooks: hooks.getEmitter(),
      onComplete: results => {
        isRunning = false;
        hooks.getEmitter().onTestRunComplete(results); // Create a new testWatcher instance so that re-runs won't be blocked.
        // The old instance that was passed to Jest will still be interrupted
        // and prevent test runs from the previous run.

        testWatcher = new _TestWatcher.default({
          isWatchMode: true
        }); // Do not show any Watch Usage related stuff when running in a
        // non-interactive environment

        if (_jestUtil().isInteractive) {
          if (shouldDisplayWatchUsage) {
            outputStream.write(usage(globalConfig, watchPlugins));
            shouldDisplayWatchUsage = false; // hide Watch Usage after first run

            isWatchUsageDisplayed = true;
          } else {
            outputStream.write(showToggleUsagePrompt());
            shouldDisplayWatchUsage = false;
            isWatchUsageDisplayed = false;
          }
        } else {
          outputStream.write('\n');
        }

        failedTestsCache.setTestResults(results.testResults);
      },
      outputStream,
      startRun,
      testWatcher
    }).catch((
      error // Errors thrown inside `runJest`, e.g. by resolvers, are caught here for
    ) =>
      // continuous watch mode execution. We need to reprint them to the
      // terminal and give just a little bit of extra space so they fit below
      // `preRunMessagePrint` message nicely.
      console.error(
        '\n\n' +
          (0, _jestMessageUtil().formatExecError)(error, contexts[0].config, {
            noStackTrace: false
          })
      )
    );
  };

  const onKeypress = key => {
    if (
      key === _jestWatcher().KEYS.CONTROL_C ||
      key === _jestWatcher().KEYS.CONTROL_D
    ) {
      if (typeof stdin.setRawMode === 'function') {
        stdin.setRawMode(false);
      }

      outputStream.write('\n');
      (0, _exit().default)(0);
      return;
    }

    if (activePlugin != null && activePlugin.onKey) {
      // if a plugin is activate, Jest should let it handle keystrokes, so ignore
      // them here
      activePlugin.onKey(key);
      return;
    } // Abort test run

    const pluginKeys = (0, _watch_plugins_helpers.getSortedUsageRows)(
      watchPlugins,
      globalConfig
    ).map(usage => Number(usage.key).toString(16));

    if (
      isRunning &&
      testWatcher &&
      ['q', _jestWatcher().KEYS.ENTER, 'a', 'o', 'f']
        .concat(pluginKeys)
        .includes(key)
    ) {
      testWatcher.setState({
        interrupted: true
      });
      return;
    }

    const matchingWatchPlugin = (0,
    _watch_plugins_helpers.filterInteractivePlugins)(
      watchPlugins,
      globalConfig
    ).find(plugin => getPluginKey(plugin, globalConfig) === key);

    if (matchingWatchPlugin != null) {
      if (isRunning) {
        testWatcher.setState({
          interrupted: true
        });
        return;
      } // "activate" the plugin, which has jest ignore keystrokes so the plugin
      // can handle them

      activePlugin = matchingWatchPlugin;

      if (activePlugin.run) {
        activePlugin.run(globalConfig, updateConfigAndRun).then(
          shouldRerun => {
            activePlugin = null;

            if (shouldRerun) {
              updateConfigAndRun();
            }
          },
          () => {
            activePlugin = null;
            onCancelPatternPrompt();
          }
        );
      } else {
        activePlugin = null;
      }
    }

    switch (key) {
      case _jestWatcher().KEYS.ENTER:
        startRun(globalConfig);
        break;

      case 'a':
        globalConfig = (0, _update_global_config.default)(globalConfig, {
          mode: 'watchAll',
          testNamePattern: '',
          testPathPattern: ''
        });
        startRun(globalConfig);
        break;

      case 'c':
        updateConfigAndRun({
          mode: 'watch',
          testNamePattern: '',
          testPathPattern: ''
        });
        break;

      case 'f':
        globalConfig = (0, _update_global_config.default)(globalConfig, {
          onlyFailures: !globalConfig.onlyFailures
        });
        startRun(globalConfig);
        break;

      case 'o':
        globalConfig = (0, _update_global_config.default)(globalConfig, {
          mode: 'watch',
          testNamePattern: '',
          testPathPattern: ''
        });
        startRun(globalConfig);
        break;

      case '?':
        break;

      case 'w':
        if (!shouldDisplayWatchUsage && !isWatchUsageDisplayed) {
          outputStream.write(_ansiEscapes().default.cursorUp());
          outputStream.write(_ansiEscapes().default.eraseDown);
          outputStream.write(usage(globalConfig, watchPlugins));
          isWatchUsageDisplayed = true;
          shouldDisplayWatchUsage = false;
        }

        break;
    }
  };

  const onCancelPatternPrompt = () => {
    outputStream.write(_ansiEscapes().default.cursorHide);
    outputStream.write(_jestUtil().specialChars.CLEAR);
    outputStream.write(usage(globalConfig, watchPlugins));
    outputStream.write(_ansiEscapes().default.cursorShow);
  };

  if (typeof stdin.setRawMode === 'function') {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', onKeypress);
  }

  startRun(globalConfig);
  return Promise.resolve();
}

const checkForConflicts = (watchPluginKeys, plugin, globalConfig) => {
  const key = getPluginKey(plugin, globalConfig);

  if (!key) {
    return;
  }

  const conflictor = watchPluginKeys.get(key);

  if (!conflictor || conflictor.overwritable) {
    watchPluginKeys.set(key, {
      overwritable: false,
      plugin
    });
    return;
  }

  let error;

  if (conflictor.forbiddenOverwriteMessage) {
    error = `
  Watch plugin ${_chalk().default.bold.red(
    getPluginIdentifier(plugin)
  )} attempted to register key ${_chalk().default.bold.red(`<${key}>`)},
  that is reserved internally for ${_chalk().default.bold.red(
    conflictor.forbiddenOverwriteMessage
  )}.
  Please change the configuration key for this plugin.`.trim();
  } else {
    const plugins = [conflictor.plugin, plugin]
      .map(p => _chalk().default.bold.red(getPluginIdentifier(p)))
      .join(' and ');
    error = `
  Watch plugins ${plugins} both attempted to register key ${_chalk().default.bold.red(
      `<${key}>`
    )}.
  Please change the key configuration for one of the conflicting plugins to avoid overlap.`.trim();
  }

  throw new (_jestValidate()).ValidationError(
    'Watch plugin configuration error',
    error
  );
};

const getPluginIdentifier = (
  plugin // This breaks as `displayName` is not defined as a static, but since
  // WatchPlugin is an interface, and it is my understanding interface
  // static fields are not definable anymore, no idea how to circumvent
  // this :-(
  // @ts-ignore: leave `displayName` be.
) => plugin.constructor.displayName || plugin.constructor.name;

const getPluginKey = (plugin, globalConfig) => {
  if (typeof plugin.getUsageInfo === 'function') {
    return (
      plugin.getUsageInfo(globalConfig) || {
        key: null
      }
    ).key;
  }

  return null;
};

const usage = (globalConfig, watchPlugins, delimiter = '\n') => {
  const messages = [
    (0, _active_filters_message.default)(globalConfig),
    globalConfig.testPathPattern || globalConfig.testNamePattern
      ? _chalk().default.dim(' \u203A Press ') +
        'c' +
        _chalk().default.dim(' to clear filters.')
      : null,
    '\n' + _chalk().default.bold('Watch Usage'),
    globalConfig.watch
      ? _chalk().default.dim(' \u203A Press ') +
        'a' +
        _chalk().default.dim(' to run all tests.')
      : null,
    globalConfig.onlyFailures
      ? _chalk().default.dim(' \u203A Press ') +
        'f' +
        _chalk().default.dim(' to quit "only failed tests" mode.')
      : _chalk().default.dim(' \u203A Press ') +
        'f' +
        _chalk().default.dim(' to run only failed tests.'),
    (globalConfig.watchAll ||
      globalConfig.testPathPattern ||
      globalConfig.testNamePattern) &&
    !globalConfig.noSCM
      ? _chalk().default.dim(' \u203A Press ') +
        'o' +
        _chalk().default.dim(' to only run tests related to changed files.')
      : null,
    ...(0, _watch_plugins_helpers.getSortedUsageRows)(
      watchPlugins,
      globalConfig
    ).map(
      plugin =>
        _chalk().default.dim(' \u203A Press') +
        ' ' +
        plugin.key +
        ' ' +
        _chalk().default.dim(`to ${plugin.prompt}.`)
    ),
    _chalk().default.dim(' \u203A Press ') +
      'Enter' +
      _chalk().default.dim(' to trigger a test run.')
  ];
  return messages.filter(message => !!message).join(delimiter) + '\n';
};

const showToggleUsagePrompt = () =>
  '\n' +
  _chalk().default.bold('Watch Usage: ') +
  _chalk().default.dim('Press ') +
  'w' +
  _chalk().default.dim(' to show more.');
