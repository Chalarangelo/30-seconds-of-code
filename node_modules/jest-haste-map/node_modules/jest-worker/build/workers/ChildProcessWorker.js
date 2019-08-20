'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _child_process() {
  const data = _interopRequireDefault(require('child_process'));

  _child_process = function _child_process() {
    return data;
  };

  return data;
}

function _stream() {
  const data = require('stream');

  _stream = function _stream() {
    return data;
  };

  return data;
}

function _mergeStream() {
  const data = _interopRequireDefault(require('merge-stream'));

  _mergeStream = function _mergeStream() {
    return data;
  };

  return data;
}

function _supportsColor() {
  const data = _interopRequireDefault(require('supports-color'));

  _supportsColor = function _supportsColor() {
    return data;
  };

  return data;
}

var _types = require('../types');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
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
 * This class wraps the child process and provides a nice interface to
 * communicate with. It takes care of:
 *
 *  - Re-spawning the process if it dies.
 *  - Queues calls while the worker is busy.
 *  - Re-sends the requests if the worker blew up.
 *
 * The reason for queueing them here (since childProcess.send also has an
 * internal queue) is because the worker could be doing asynchronous work, and
 * this would lead to the child process to read its receiving buffer and start a
 * second call. By queueing calls here, we don't send the next call to the
 * children until we receive the result of the previous one.
 *
 * As soon as a request starts to be processed by a worker, its "processed"
 * field is changed to "true", so that other workers which might encounter the
 * same call skip it.
 */
class ChildProcessWorker {
  constructor(options) {
    _defineProperty(this, '_child', void 0);

    _defineProperty(this, '_options', void 0);

    _defineProperty(this, '_onProcessEnd', void 0);

    _defineProperty(this, '_fakeStream', void 0);

    _defineProperty(this, '_request', void 0);

    _defineProperty(this, '_retries', void 0);

    _defineProperty(this, '_stderr', void 0);

    _defineProperty(this, '_stdout', void 0);

    this._options = options;
    this._fakeStream = null;
    this._request = null;
    this._stderr = null;
    this._stdout = null;
    this.initialize();
  }

  initialize() {
    const forceColor = _supportsColor().default.stdout
      ? {
          FORCE_COLOR: '1'
        }
      : {};

    const child = _child_process().default.fork(
      require.resolve('./processChild'),
      [],
      _objectSpread(
        {
          cwd: process.cwd(),
          env: _objectSpread(
            {},
            process.env,
            {
              JEST_WORKER_ID: String(this._options.workerId + 1)
            },
            forceColor
          ),
          // Suppress --debug / --inspect flags while preserving others (like --harmony).
          execArgv: process.execArgv.filter(v => !/^--(debug|inspect)/.test(v)),
          silent: true
        },
        this._options.forkOptions
      )
    );

    if (child.stdout) {
      if (!this._stdout) {
        // We need to add a permanent stream to the merged stream to prevent it
        // from ending when the subprocess stream ends
        this._stdout = (0, _mergeStream().default)(this._getFakeStream());
      }

      this._stdout.add(child.stdout);
    }

    if (child.stderr) {
      if (!this._stderr) {
        // We need to add a permanent stream to the merged stream to prevent it
        // from ending when the subprocess stream ends
        this._stderr = (0, _mergeStream().default)(this._getFakeStream());
      }

      this._stderr.add(child.stderr);
    }

    child.on('message', this.onMessage.bind(this));
    child.on('exit', this.onExit.bind(this));
    child.send([
      _types.CHILD_MESSAGE_INITIALIZE,
      false,
      this._options.workerPath,
      this._options.setupArgs
    ]);
    this._child = child;
    this._retries++; // If we exceeded the amount of retries, we will emulate an error reply
    // coming from the child. This avoids code duplication related with cleaning
    // the queue, and scheduling the next call.

    if (this._retries > this._options.maxRetries) {
      const error = new Error('Call retries were exceeded');
      this.onMessage([
        _types.PARENT_MESSAGE_CLIENT_ERROR,
        error.name,
        error.message,
        error.stack,
        {
          type: 'WorkerError'
        }
      ]);
    }
  }

  _shutdown() {
    // End the temporary streams so the merged streams end too
    if (this._fakeStream) {
      this._fakeStream.end();

      this._fakeStream = null;
    }
  }

  onMessage(response) {
    let error;

    switch (response[0]) {
      case _types.PARENT_MESSAGE_OK:
        this._onProcessEnd(null, response[1]);

        break;

      case _types.PARENT_MESSAGE_CLIENT_ERROR:
        error = response[4];

        if (error != null && typeof error === 'object') {
          const extra = error; // @ts-ignore: no index

          const NativeCtor = global[response[1]];
          const Ctor = typeof NativeCtor === 'function' ? NativeCtor : Error;
          error = new Ctor(response[2]);
          error.type = response[1];
          error.stack = response[3];

          for (const key in extra) {
            // @ts-ignore: adding custom properties to errors.
            error[key] = extra[key];
          }
        }

        this._onProcessEnd(error, null);

        break;

      case _types.PARENT_MESSAGE_SETUP_ERROR:
        error = new Error('Error when calling setup: ' + response[2]); // @ts-ignore: adding custom properties to errors.

        error.type = response[1];
        error.stack = response[3];

        this._onProcessEnd(error, null);

        break;

      default:
        throw new TypeError('Unexpected response from worker: ' + response[0]);
    }
  }

  onExit(exitCode) {
    if (exitCode !== 0) {
      this.initialize();

      if (this._request) {
        this._child.send(this._request);
      }
    } else {
      this._shutdown();
    }
  }

  send(request, onProcessStart, onProcessEnd) {
    onProcessStart(this);

    this._onProcessEnd = (...args) => {
      // Clean the request to avoid sending past requests to workers that fail
      // while waiting for a new request (timers, unhandled rejections...)
      this._request = null;
      return onProcessEnd(...args);
    };

    this._request = request;
    this._retries = 0;

    this._child.send(request);
  }

  getWorkerId() {
    return this._options.workerId;
  }

  getStdout() {
    return this._stdout;
  }

  getStderr() {
    return this._stderr;
  }

  _getFakeStream() {
    if (!this._fakeStream) {
      this._fakeStream = new (_stream()).PassThrough();
    }

    return this._fakeStream;
  }
}

exports.default = ChildProcessWorker;
