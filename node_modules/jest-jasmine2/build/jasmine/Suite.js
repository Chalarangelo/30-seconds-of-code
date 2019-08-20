'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _jestUtil = require('jest-util');

var _ExpectationFailed = _interopRequireDefault(
  require('../ExpectationFailed')
);

var _expectationResultFactory = _interopRequireDefault(
  require('../expectationResultFactory')
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

class Suite {
  constructor(attrs) {
    _defineProperty(this, 'id', void 0);

    _defineProperty(this, 'parentSuite', void 0);

    _defineProperty(this, 'description', void 0);

    _defineProperty(this, 'throwOnExpectationFailure', void 0);

    _defineProperty(this, 'beforeFns', void 0);

    _defineProperty(this, 'afterFns', void 0);

    _defineProperty(this, 'beforeAllFns', void 0);

    _defineProperty(this, 'afterAllFns', void 0);

    _defineProperty(this, 'disabled', void 0);

    _defineProperty(this, 'children', void 0);

    _defineProperty(this, 'result', void 0);

    _defineProperty(this, 'sharedContext', void 0);

    _defineProperty(this, 'markedPending', void 0);

    _defineProperty(this, 'markedTodo', void 0);

    _defineProperty(this, 'isFocused', void 0);

    this.markedPending = false;
    this.markedTodo = false;
    this.isFocused = false;
    this.id = attrs.id;
    this.parentSuite = attrs.parentSuite;
    this.description = (0, _jestUtil.convertDescriptorToString)(
      attrs.description
    );
    this.throwOnExpectationFailure = !!attrs.throwOnExpectationFailure;
    this.beforeFns = [];
    this.afterFns = [];
    this.beforeAllFns = [];
    this.afterAllFns = [];
    this.disabled = false;
    this.children = [];
    this.result = {
      id: this.id,
      description: this.description,
      fullName: this.getFullName(),
      failedExpectations: [],
      testPath: attrs.getTestPath()
    };
  }

  getFullName() {
    const fullName = [];

    for (
      let parentSuite = this;
      parentSuite;
      parentSuite = parentSuite.parentSuite
    ) {
      if (parentSuite.parentSuite) {
        fullName.unshift(parentSuite.description);
      }
    }

    return fullName.join(' ');
  }

  disable() {
    this.disabled = true;
  }

  pend(_message) {
    this.markedPending = true;
  }

  beforeEach(fn) {
    this.beforeFns.unshift(fn);
  }

  beforeAll(fn) {
    this.beforeAllFns.push(fn);
  }

  afterEach(fn) {
    this.afterFns.unshift(fn);
  }

  afterAll(fn) {
    this.afterAllFns.unshift(fn);
  }

  addChild(child) {
    this.children.push(child);
  }

  status() {
    if (this.disabled) {
      return 'disabled';
    }

    if (this.markedPending) {
      return 'pending';
    }

    if (this.result.failedExpectations.length > 0) {
      return 'failed';
    } else {
      return 'finished';
    }
  }

  isExecutable() {
    return !this.disabled;
  }

  canBeReentered() {
    return this.beforeAllFns.length === 0 && this.afterAllFns.length === 0;
  }

  getResult() {
    this.result.status = this.status();
    return this.result;
  }

  sharedUserContext() {
    if (!this.sharedContext) {
      this.sharedContext = {};
    }

    return this.sharedContext;
  }

  clonedSharedUserContext() {
    return this.sharedUserContext();
  }

  onException(...args) {
    if (args[0] instanceof _ExpectationFailed.default) {
      return;
    }

    if (isAfterAll(this.children)) {
      const data = {
        matcherName: '',
        passed: false,
        expected: '',
        actual: '',
        error: arguments[0]
      };
      this.result.failedExpectations.push(
        (0, _expectationResultFactory.default)(data)
      );
    } else {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.onException.apply(child, args);
      }
    }
  }

  addExpectationResult(...args) {
    if (isAfterAll(this.children) && isFailure(args)) {
      const data = args[1];
      this.result.failedExpectations.push(
        (0, _expectationResultFactory.default)(data)
      );

      if (this.throwOnExpectationFailure) {
        throw new _ExpectationFailed.default();
      }
    } else {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];

        try {
          child.addExpectationResult.apply(child, args);
        } catch (e) {
          // keep going
        }
      }
    }
  }

  execute(..._args) {}
}

exports.default = Suite;

function isAfterAll(children) {
  return children && children[0] && children[0].result.status;
}

function isFailure(args) {
  return !args[0];
}
