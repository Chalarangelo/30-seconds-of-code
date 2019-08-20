'use strict';

function _jestSnapshot() {
  const data = require('jest-snapshot');

  _jestSnapshot = function _jestSnapshot() {
    return data;
  };

  return data;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * DependencyResolver is used to resolve the direct dependencies of a module or
 * to retrieve a list of all transitive inverse dependencies.
 */

/* eslint-disable-next-line no-redeclare */
class DependencyResolver {
  constructor(resolver, hasteFS, snapshotResolver) {
    _defineProperty(this, '_hasteFS', void 0);

    _defineProperty(this, '_resolver', void 0);

    _defineProperty(this, '_snapshotResolver', void 0);

    this._resolver = resolver;
    this._hasteFS = hasteFS;
    this._snapshotResolver = snapshotResolver;
  }

  resolve(file, options) {
    const dependencies = this._hasteFS.getDependencies(file);

    if (!dependencies) {
      return [];
    }

    return dependencies.reduce((acc, dependency) => {
      if (this._resolver.isCoreModule(dependency)) {
        return acc;
      }

      let resolvedDependency;

      try {
        resolvedDependency = this._resolver.resolveModule(
          file,
          dependency,
          options
        );
      } catch (e) {
        resolvedDependency = this._resolver.getMockModule(file, dependency);
      }

      if (resolvedDependency) {
        acc.push(resolvedDependency);
      }

      return acc;
    }, []);
  }

  resolveInverseModuleMap(paths, filter, options) {
    if (!paths.size) {
      return [];
    }

    const collectModules = (related, moduleMap, changed) => {
      const visitedModules = new Set();
      const result = [];

      while (changed.size) {
        changed = new Set(
          moduleMap.reduce((acc, module) => {
            if (
              visitedModules.has(module.file) ||
              !module.dependencies.some(dep => changed.has(dep))
            ) {
              return acc;
            }

            const file = module.file;

            if (filter(file)) {
              result.push(module);
              related.delete(file);
            }

            visitedModules.add(file);
            acc.push(file);
            return acc;
          }, [])
        );
      }

      return result.concat(
        Array.from(related).map(file => ({
          dependencies: [],
          file
        }))
      );
    };

    const relatedPaths = new Set();
    const changed = new Set();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = paths[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        const path = _step.value;

        if (this._hasteFS.exists(path)) {
          const modulePath = (0, _jestSnapshot().isSnapshotPath)(path)
            ? this._snapshotResolver.resolveTestPath(path)
            : path;
          changed.add(modulePath);

          if (filter(modulePath)) {
            relatedPaths.add(modulePath);
          }
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

    const modules = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
        var _iterator2 = this._hasteFS
            .getAbsoluteFileIterator()
            [Symbol.iterator](),
          _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        const file = _step2.value;
        modules.push({
          dependencies: this.resolve(file, options),
          file
        });
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

    return collectModules(relatedPaths, modules, changed);
  }

  resolveInverse(paths, filter, options) {
    return this.resolveInverseModuleMap(paths, filter, options).map(
      module => module.file
    );
  }
}

module.exports = DependencyResolver;
