'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var fastPath = _interopRequireWildcard(require('./lib/fast_path'));

var _constants = _interopRequireDefault(require('./constants'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

const EMPTY_OBJ = {};
const EMPTY_MAP = new Map();

class ModuleMap {
  static mapToArrayRecursive(map) {
    let arr = Array.from(map);

    if (arr[0] && arr[0][1] instanceof Map) {
      arr = arr.map(el => [el[0], this.mapToArrayRecursive(el[1])]);
    }

    return arr;
  }

  static mapFromArrayRecursive(arr) {
    if (arr[0] && Array.isArray(arr[1])) {
      arr = arr.map(el => [el[0], this.mapFromArrayRecursive(el[1])]);
    }

    return new Map(arr);
  }

  constructor(raw) {
    _defineProperty(this, '_raw', void 0);

    _defineProperty(this, 'json', void 0);

    this._raw = raw;
  }

  getModule(name, platform, supportsNativePlatform, type) {
    if (type == null) {
      type = _constants.default.MODULE;
    }

    const module = this._getModuleMetadata(
      name,
      platform,
      !!supportsNativePlatform
    );

    if (module && module[_constants.default.TYPE] === type) {
      const modulePath = module[_constants.default.PATH];
      return modulePath && fastPath.resolve(this._raw.rootDir, modulePath);
    }

    return null;
  }

  getPackage(name, platform, _supportsNativePlatform) {
    return this.getModule(name, platform, null, _constants.default.PACKAGE);
  }

  getMockModule(name) {
    const mockPath =
      this._raw.mocks.get(name) || this._raw.mocks.get(name + '/index');

    return mockPath && fastPath.resolve(this._raw.rootDir, mockPath);
  }

  getRawModuleMap() {
    return {
      duplicates: this._raw.duplicates,
      map: this._raw.map,
      mocks: this._raw.mocks,
      rootDir: this._raw.rootDir
    };
  }

  toJSON() {
    if (!this.json) {
      this.json = {
        duplicates: ModuleMap.mapToArrayRecursive(this._raw.duplicates),
        map: Array.from(this._raw.map),
        mocks: Array.from(this._raw.mocks),
        rootDir: this._raw.rootDir
      };
    }

    return this.json;
  }

  static fromJSON(serializableModuleMap) {
    return new ModuleMap({
      duplicates: ModuleMap.mapFromArrayRecursive(
        serializableModuleMap.duplicates
      ),
      map: new Map(serializableModuleMap.map),
      mocks: new Map(serializableModuleMap.mocks),
      rootDir: serializableModuleMap.rootDir
    });
  }
  /**
   * When looking up a module's data, we walk through each eligible platform for
   * the query. For each platform, we want to check if there are known
   * duplicates for that name+platform pair. The duplication logic normally
   * removes elements from the `map` object, but we want to check upfront to be
   * extra sure. If metadata exists both in the `duplicates` object and the
   * `map`, this would be a bug.
   */

  _getModuleMetadata(name, platform, supportsNativePlatform) {
    const map = this._raw.map.get(name) || EMPTY_OBJ;
    const dupMap = this._raw.duplicates.get(name) || EMPTY_MAP;

    if (platform != null) {
      this._assertNoDuplicates(
        name,
        platform,
        supportsNativePlatform,
        dupMap.get(platform)
      );

      if (map[platform] != null) {
        return map[platform];
      }
    }

    if (supportsNativePlatform) {
      this._assertNoDuplicates(
        name,
        _constants.default.NATIVE_PLATFORM,
        supportsNativePlatform,
        dupMap.get(_constants.default.NATIVE_PLATFORM)
      );

      if (map[_constants.default.NATIVE_PLATFORM]) {
        return map[_constants.default.NATIVE_PLATFORM];
      }
    }

    this._assertNoDuplicates(
      name,
      _constants.default.GENERIC_PLATFORM,
      supportsNativePlatform,
      dupMap.get(_constants.default.GENERIC_PLATFORM)
    );

    if (map[_constants.default.GENERIC_PLATFORM]) {
      return map[_constants.default.GENERIC_PLATFORM];
    }

    return null;
  }

  _assertNoDuplicates(name, platform, supportsNativePlatform, relativePathSet) {
    if (relativePathSet == null) {
      return;
    } // Force flow refinement

    const previousSet = relativePathSet;
    const duplicates = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = previousSet[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        const _step$value = _slicedToArray(_step.value, 2),
          relativePath = _step$value[0],
          type = _step$value[1];

        const duplicatePath = fastPath.resolve(this._raw.rootDir, relativePath);
        duplicates.set(duplicatePath, type);
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

    throw new DuplicateHasteCandidatesError(
      name,
      platform,
      supportsNativePlatform,
      duplicates
    );
  }

  static create(rootDir) {
    return new ModuleMap({
      duplicates: new Map(),
      map: new Map(),
      mocks: new Map(),
      rootDir
    });
  }
}

exports.default = ModuleMap;

_defineProperty(ModuleMap, 'DuplicateHasteCandidatesError', void 0);

class DuplicateHasteCandidatesError extends Error {
  constructor(name, platform, supportsNativePlatform, duplicatesSet) {
    const platformMessage = getPlatformMessage(platform);
    super(
      `The name \`${name}\` was looked up in the Haste module map. It ` +
        `cannot be resolved, because there exists several different ` +
        `files, or packages, that provide a module for ` +
        `that particular name and platform. ${platformMessage} You must ` +
        `delete or blacklist files until there remains only one of these:\n\n` +
        Array.from(duplicatesSet)
          .map(
            ([dupFilePath, dupFileType]) =>
              `  * \`${dupFilePath}\` (${getTypeMessage(dupFileType)})\n`
          )
          .sort()
          .join('')
    );

    _defineProperty(this, 'hasteName', void 0);

    _defineProperty(this, 'platform', void 0);

    _defineProperty(this, 'supportsNativePlatform', void 0);

    _defineProperty(this, 'duplicatesSet', void 0);

    this.hasteName = name;
    this.platform = platform;
    this.supportsNativePlatform = supportsNativePlatform;
    this.duplicatesSet = duplicatesSet;
  }
}

function getPlatformMessage(platform) {
  if (platform === _constants.default.GENERIC_PLATFORM) {
    return 'The platform is generic (no extension).';
  }

  return `The platform extension is \`${platform}\`.`;
}

function getTypeMessage(type) {
  switch (type) {
    case _constants.default.MODULE:
      return 'module';

    case _constants.default.PACKAGE:
      return 'package';
  }

  return 'unknown';
}

ModuleMap.DuplicateHasteCandidatesError = DuplicateHasteCandidatesError;
