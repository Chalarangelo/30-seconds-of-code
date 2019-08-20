'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _assert = require('assert');

var _ExpectationFailed = _interopRequireDefault(
  require('../ExpectationFailed')
);

var _expectationResultFactory = _interopRequireDefault(
  require('../expectationResultFactory')
);

var _assertionErrorMessage = _interopRequireDefault(
  require('../assertionErrorMessage')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

class Spec {
  static isPendingSpecException(e) {
    return !!(
      e &&
      e.toString &&
      e.toString().indexOf(Spec.pendingSpecExceptionMessage) !== -1
    );
  }

  constructor(attrs) {
    _defineProperty(this, 'id', void 0);

    _defineProperty(this, 'description', void 0);

    _defineProperty(this, 'resultCallback', void 0);

    _defineProperty(this, 'queueableFn', void 0);

    _defineProperty(this, 'beforeAndAfterFns', void 0);

    _defineProperty(this, 'userContext', void 0);

    _defineProperty(this, 'onStart', void 0);

    _defineProperty(this, 'getSpecName', void 0);

    _defineProperty(this, 'queueRunnerFactory', void 0);

    _defineProperty(this, 'throwOnExpectationFailure', void 0);

    _defineProperty(this, 'initError', void 0);

    _defineProperty(this, 'result', void 0);

    _defineProperty(this, 'disabled', void 0);

    _defineProperty(this, 'currentRun', void 0);

    _defineProperty(this, 'markedTodo', void 0);

    _defineProperty(this, 'markedPending', void 0);

    _defineProperty(this, 'expand', void 0);

    this.resultCallback = attrs.resultCallback || function() {};

    this.id = attrs.id;
    this.description = attrs.description || '';
    this.queueableFn = attrs.queueableFn;

    this.beforeAndAfterFns =
      attrs.beforeAndAfterFns ||
      function() {
        return {
          befores: [],
          afters: []
        };
      };

    this.userContext =
      attrs.userContext ||
      function() {
        return {};
      };

    this.onStart = attrs.onStart || function() {};

    this.getSpecName =
      attrs.getSpecName ||
      function() {
        return '';
      };

    this.queueRunnerFactory = attrs.queueRunnerFactory || function() {};

    this.throwOnExpectationFailure = !!attrs.throwOnExpectationFailure;
    this.initError = new Error();
    this.initError.name = ''; // Without this line v8 stores references to all closures
    // in the stack in the Error object. This line stringifies the stack
    // property to allow garbage-collecting objects on the stack
    // https://crbug.com/v8/7142

    this.initError.stack = this.initError.stack;
    this.queueableFn.initError = this.initError; // @ts-ignore

    this.result = {
      id: this.id,
      description: this.description,
      fullName: this.getFullName(),
      failedExpectations: [],
      passedExpectations: [],
      pendingReason: '',
      testPath: attrs.getTestPath()
    };
  }

  addExpectationResult(passed, data, isError) {
    const expectationResult = (0, _expectationResultFactory.default)(
      data,
      this.initError
    );

    if (passed) {
      this.result.passedExpectations.push(expectationResult);
    } else {
      this.result.failedExpectations.push(expectationResult);

      if (this.throwOnExpectationFailure && !isError) {
        throw new _ExpectationFailed.default();
      }
    }
  }

  execute(onComplete, enabled) {
    const self = this;
    this.onStart(this);

    if (
      !this.isExecutable() ||
      this.markedPending ||
      this.markedTodo ||
      enabled === false
    ) {
      complete(enabled);
      return;
    }

    const fns = this.beforeAndAfterFns();
    const allFns = fns.befores.concat(this.queueableFn).concat(fns.afters);
    this.currentRun = this.queueRunnerFactory({
      queueableFns: allFns,

      onException() {
        // @ts-ignore
        self.onException.apply(self, arguments);
      },

      userContext: this.userContext(),
      setTimeout,
      clearTimeout,
      fail: () => {}
    });
    this.currentRun.then(() => complete(true));

    function complete(enabledAgain) {
      self.result.status = self.status(enabledAgain);
      self.resultCallback(self.result);

      if (onComplete) {
        onComplete();
      }
    }
  }

  cancel() {
    if (this.currentRun) {
      this.currentRun.cancel();
    }
  }

  onException(error) {
    if (Spec.isPendingSpecException(error)) {
      this.pend(extractCustomPendingMessage(error));
      return;
    }

    if (error instanceof _ExpectationFailed.default) {
      return;
    }

    this.addExpectationResult(
      false,
      {
        matcherName: '',
        passed: false,
        expected: '',
        actual: '',
        error: this.isAssertionError(error)
          ? (0, _assertionErrorMessage.default)(error, {
              expand: this.expand
            })
          : error
      },
      true
    );
  }

  disable() {
    this.disabled = true;
  }

  pend(message) {
    this.markedPending = true;

    if (message) {
      this.result.pendingReason = message;
    }
  }

  todo() {
    this.markedTodo = true;
  }

  getResult() {
    this.result.status = this.status();
    return this.result;
  }

  status(enabled) {
    if (this.disabled || enabled === false) {
      return 'disabled';
    }

    if (this.markedTodo) {
      return 'todo';
    }

    if (this.markedPending) {
      return 'pending';
    }

    if (this.result.failedExpectations.length > 0) {
      return 'failed';
    } else {
      return 'passed';
    }
  }

  isExecutable() {
    return !this.disabled;
  }

  getFullName() {
    return this.getSpecName(this);
  }

  isAssertionError(error) {
    return (
      error instanceof _assert.AssertionError ||
      (error && error.name === _assert.AssertionError.name)
    );
  }
}

exports.default = Spec;

_defineProperty(Spec, 'pendingSpecExceptionMessage', void 0);

Spec.pendingSpecExceptionMessage = '=> marked Pending';

const extractCustomPendingMessage = function extractCustomPendingMessage(e) {
  const fullMessage = e.toString();
  const boilerplateStart = fullMessage.indexOf(
    Spec.pendingSpecExceptionMessage
  );
  const boilerplateEnd =
    boilerplateStart + Spec.pendingSpecExceptionMessage.length;
  return fullMessage.substr(boilerplateEnd);
};
