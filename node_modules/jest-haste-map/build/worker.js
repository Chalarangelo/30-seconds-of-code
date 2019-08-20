'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.worker = worker;
exports.getSha1 = getSha1;

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
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

function _gracefulFs() {
  const data = _interopRequireDefault(require('graceful-fs'));

  _gracefulFs = function _gracefulFs() {
    return data;
  };

  return data;
}

var _blacklist = _interopRequireDefault(require('./blacklist'));

var _constants = _interopRequireDefault(require('./constants'));

var dependencyExtractor = _interopRequireWildcard(
  require('./lib/dependencyExtractor')
);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

const PACKAGE_JSON = _path().default.sep + 'package.json';
let hasteImpl = null;
let hasteImplModulePath = null;

function sha1hex(content) {
  return _crypto()
    .default.createHash('sha1')
    .update(content)
    .digest('hex');
}

function worker(_x) {
  return _worker.apply(this, arguments);
}

function _worker() {
  _worker = _asyncToGenerator(function*(data) {
    if (
      data.hasteImplModulePath &&
      data.hasteImplModulePath !== hasteImplModulePath
    ) {
      if (hasteImpl) {
        throw new Error('jest-haste-map: hasteImplModulePath changed');
      }

      hasteImplModulePath = data.hasteImplModulePath;
      hasteImpl = require(hasteImplModulePath);
    }

    let content;
    let dependencies;
    let id;
    let module;
    let sha1;
    const computeDependencies = data.computeDependencies,
      computeSha1 = data.computeSha1,
      rootDir = data.rootDir,
      filePath = data.filePath;

    const getContent = () => {
      if (content === undefined) {
        content = _gracefulFs().default.readFileSync(filePath, 'utf8');
      }

      return content;
    };

    if (filePath.endsWith(PACKAGE_JSON)) {
      // Process a package.json that is returned as a PACKAGE type with its name.
      try {
        const fileData = JSON.parse(getContent());

        if (fileData.name) {
          const relativeFilePath = _path().default.relative(rootDir, filePath);

          id = fileData.name;
          module = [relativeFilePath, _constants.default.PACKAGE];
        }
      } catch (err) {
        throw new Error(`Cannot parse ${filePath} as JSON: ${err.message}`);
      }
    } else if (
      !_blacklist.default.has(filePath.substr(filePath.lastIndexOf('.')))
    ) {
      // Process a random file that is returned as a MODULE.
      if (hasteImpl) {
        id = hasteImpl.getHasteName(filePath);
      }

      if (computeDependencies) {
        const content = getContent();
        dependencies = Array.from(
          data.dependencyExtractor
            ? require(data.dependencyExtractor).extract(
                content,
                filePath,
                dependencyExtractor.extract
              )
            : dependencyExtractor.extract(content)
        );
      }

      if (id) {
        const relativeFilePath = _path().default.relative(rootDir, filePath);

        module = [relativeFilePath, _constants.default.MODULE];
      }
    } // If a SHA-1 is requested on update, compute it.

    if (computeSha1) {
      sha1 = sha1hex(
        getContent() || _gracefulFs().default.readFileSync(filePath)
      );
    }

    return {
      dependencies,
      id,
      module,
      sha1
    };
  });
  return _worker.apply(this, arguments);
}

function getSha1(_x2) {
  return _getSha.apply(this, arguments);
}

function _getSha() {
  _getSha = _asyncToGenerator(function*(data) {
    const sha1 = data.computeSha1
      ? sha1hex(_gracefulFs().default.readFileSync(data.filePath))
      : null;
    return {
      dependencies: undefined,
      id: undefined,
      module: undefined,
      sha1
    };
  });
  return _getSha.apply(this, arguments);
}
