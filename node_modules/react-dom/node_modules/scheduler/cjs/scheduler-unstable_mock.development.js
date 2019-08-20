/** @license React v0.15.0
 * scheduler-unstable_mock.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enableSchedulerDebugging = false;

var currentTime = 0;
var scheduledCallback = null;
var scheduledTimeout = null;
var timeoutTime = -1;
var yieldedValues = null;
var expectedNumberOfYields = -1;
var didStop = false;
var isFlushing = false;
var needsPaint = false;
var shouldYieldForPaint = false;

function requestHostCallback(callback) {
  scheduledCallback = callback;
}



function requestHostTimeout(callback, ms) {
  scheduledTimeout = callback;
  timeoutTime = currentTime + ms;
}

function cancelHostTimeout() {
  scheduledTimeout = null;
  timeoutTime = -1;
}

function shouldYieldToHost() {
  if (expectedNumberOfYields !== -1 && yieldedValues !== null && yieldedValues.length >= expectedNumberOfYields || shouldYieldForPaint && needsPaint) {
    // We yielded at least as many values as expected. Stop flushing.
    didStop = true;
    return true;
  }
  return false;
}

function getCurrentTime() {
  return currentTime;
}

function forceFrameRate() {
  // No-op
}



// Should only be used via an assertion helper that inspects the yielded values.
function unstable_flushNumberOfYields(count) {
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }
  if (scheduledCallback !== null) {
    var cb = scheduledCallback;
    expectedNumberOfYields = count;
    isFlushing = true;
    try {
      var hasMoreWork = true;
      do {
        hasMoreWork = cb(true, currentTime);
      } while (hasMoreWork && !didStop);
      if (!hasMoreWork) {
        scheduledCallback = null;
      }
    } finally {
      expectedNumberOfYields = -1;
      didStop = false;
      isFlushing = false;
    }
  }
}

function unstable_flushUntilNextPaint() {
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }
  if (scheduledCallback !== null) {
    var cb = scheduledCallback;
    shouldYieldForPaint = true;
    needsPaint = false;
    isFlushing = true;
    try {
      var hasMoreWork = true;
      do {
        hasMoreWork = cb(true, currentTime);
      } while (hasMoreWork && !didStop);
      if (!hasMoreWork) {
        scheduledCallback = null;
      }
    } finally {
      shouldYieldForPaint = false;
      didStop = false;
      isFlushing = false;
    }
  }
}

function unstable_flushExpired() {
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }
  if (scheduledCallback !== null) {
    isFlushing = true;
    try {
      var hasMoreWork = scheduledCallback(false, currentTime);
      if (!hasMoreWork) {
        scheduledCallback = null;
      }
    } finally {
      isFlushing = false;
    }
  }
}

function unstable_flushAllWithoutAsserting() {
  // Returns false if no work was flushed.
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }
  if (scheduledCallback !== null) {
    var cb = scheduledCallback;
    isFlushing = true;
    try {
      var hasMoreWork = true;
      do {
        hasMoreWork = cb(true, currentTime);
      } while (hasMoreWork);
      if (!hasMoreWork) {
        scheduledCallback = null;
      }
      return true;
    } finally {
      isFlushing = false;
    }
  } else {
    return false;
  }
}

function unstable_clearYields() {
  if (yieldedValues === null) {
    return [];
  }
  var values = yieldedValues;
  yieldedValues = null;
  return values;
}

function unstable_flushAll() {
  if (yieldedValues !== null) {
    throw new Error('Log is not empty. Assert on the log of yielded values before ' + 'flushing additional work.');
  }
  unstable_flushAllWithoutAsserting();
  if (yieldedValues !== null) {
    throw new Error('While flushing work, something yielded a value. Use an ' + 'assertion helper to assert on the log of yielded values, e.g. ' + 'expect(Scheduler).toFlushAndYield([...])');
  }
}

function unstable_yieldValue(value) {
  if (yieldedValues === null) {
    yieldedValues = [value];
  } else {
    yieldedValues.push(value);
  }
}

function unstable_advanceTime(ms) {
  currentTime += ms;
  if (!isFlushing) {
    if (scheduledTimeout !== null && timeoutTime <= currentTime) {
      scheduledTimeout(currentTime);
      timeoutTime = -1;
      scheduledTimeout = null;
    }
    unstable_flushExpired();
  }
}

function requestPaint() {
  needsPaint = true;
}

/* eslint-disable no-var */

// TODO: Use symbols?
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY = maxSigned31BitInt;

// Tasks are stored as a circular, doubly linked list.
var firstTask = null;
var firstDelayedTask = null;

// Pausing the scheduler is useful for debugging.
var isSchedulerPaused = false;

var currentTask = null;
var currentPriorityLevel = NormalPriority;

// This is set while performing work, to prevent re-entrancy.
var isPerformingWork = false;

var isHostCallbackScheduled = false;
var isHostTimeoutScheduled = false;

function scheduler_flushTaskAtPriority_Immediate(callback, didTimeout) {
  return callback(didTimeout);
}
function scheduler_flushTaskAtPriority_UserBlocking(callback, didTimeout) {
  return callback(didTimeout);
}
function scheduler_flushTaskAtPriority_Normal(callback, didTimeout) {
  return callback(didTimeout);
}
function scheduler_flushTaskAtPriority_Low(callback, didTimeout) {
  return callback(didTimeout);
}
function scheduler_flushTaskAtPriority_Idle(callback, didTimeout) {
  return callback(didTimeout);
}

function flushTask(task, currentTime) {
  // Remove the task from the list before calling the callback. That way the
  // list is in a consistent state even if the callback throws.
  var next = task.next;
  if (next === task) {
    // This is the only scheduled task. Clear the list.
    firstTask = null;
  } else {
    // Remove the task from its position in the list.
    if (task === firstTask) {
      firstTask = next;
    }
    var previous = task.previous;
    previous.next = next;
    next.previous = previous;
  }
  task.next = task.previous = null;

  // Now it's safe to execute the task.
  var callback = task.callback;
  var previousPriorityLevel = currentPriorityLevel;
  var previousTask = currentTask;
  currentPriorityLevel = task.priorityLevel;
  currentTask = task;
  var continuationCallback;
  try {
    var didUserCallbackTimeout = task.expirationTime <= currentTime;
    // Add an extra function to the callstack. Profiling tools can use this
    // to infer the priority of work that appears higher in the stack.
    switch (currentPriorityLevel) {
      case ImmediatePriority:
        continuationCallback = scheduler_flushTaskAtPriority_Immediate(callback, didUserCallbackTimeout);
        break;
      case UserBlockingPriority:
        continuationCallback = scheduler_flushTaskAtPriority_UserBlocking(callback, didUserCallbackTimeout);
        break;
      case NormalPriority:
        continuationCallback = scheduler_flushTaskAtPriority_Normal(callback, didUserCallbackTimeout);
        break;
      case LowPriority:
        continuationCallback = scheduler_flushTaskAtPriority_Low(callback, didUserCallbackTimeout);
        break;
      case IdlePriority:
        continuationCallback = scheduler_flushTaskAtPriority_Idle(callback, didUserCallbackTimeout);
        break;
    }
  } catch (error) {
    throw error;
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentTask = previousTask;
  }

  // A callback may return a continuation. The continuation should be scheduled
  // with the same priority and expiration as the just-finished callback.
  if (typeof continuationCallback === 'function') {
    var expirationTime = task.expirationTime;
    var continuationTask = task;
    continuationTask.callback = continuationCallback;

    // Insert the new callback into the list, sorted by its timeout. This is
    // almost the same as the code in `scheduleCallback`, except the callback
    // is inserted into the list *before* callbacks of equal timeout instead
    // of after.
    if (firstTask === null) {
      // This is the first callback in the list.
      firstTask = continuationTask.next = continuationTask.previous = continuationTask;
    } else {
      var nextAfterContinuation = null;
      var t = firstTask;
      do {
        if (expirationTime <= t.expirationTime) {
          // This task times out at or after the continuation. We will insert
          // the continuation *before* this task.
          nextAfterContinuation = t;
          break;
        }
        t = t.next;
      } while (t !== firstTask);
      if (nextAfterContinuation === null) {
        // No equal or lower priority task was found, which means the new task
        // is the lowest priority task in the list.
        nextAfterContinuation = firstTask;
      } else if (nextAfterContinuation === firstTask) {
        // The new task is the highest priority task in the list.
        firstTask = continuationTask;
      }

      var _previous = nextAfterContinuation.previous;
      _previous.next = nextAfterContinuation.previous = continuationTask;
      continuationTask.next = nextAfterContinuation;
      continuationTask.previous = _previous;
    }
  }
}

function advanceTimers(currentTime) {
  // Check for tasks that are no longer delayed and add them to the queue.
  if (firstDelayedTask !== null && firstDelayedTask.startTime <= currentTime) {
    do {
      var task = firstDelayedTask;
      var next = task.next;
      if (task === next) {
        firstDelayedTask = null;
      } else {
        firstDelayedTask = next;
        var previous = task.previous;
        previous.next = next;
        next.previous = previous;
      }
      task.next = task.previous = null;
      insertScheduledTask(task, task.expirationTime);
    } while (firstDelayedTask !== null && firstDelayedTask.startTime <= currentTime);
  }
}

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    if (firstTask !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else if (firstDelayedTask !== null) {
      requestHostTimeout(handleTimeout, firstDelayedTask.startTime - currentTime);
    }
  }
}

function flushWork(hasTimeRemaining, initialTime) {
  // Exit right away if we're currently paused
  if (enableSchedulerDebugging && isSchedulerPaused) {
    return;
  }

  // We'll need a host callback the next time work is scheduled.
  isHostCallbackScheduled = false;
  if (isHostTimeoutScheduled) {
    // We scheduled a timeout but it's no longer needed. Cancel it.
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  }

  var currentTime = initialTime;
  advanceTimers(currentTime);

  isPerformingWork = true;
  try {
    if (!hasTimeRemaining) {
      // Flush all the expired callbacks without yielding.
      // TODO: Split flushWork into two separate functions instead of using
      // a boolean argument?
      while (firstTask !== null && firstTask.expirationTime <= currentTime && !(enableSchedulerDebugging && isSchedulerPaused)) {
        flushTask(firstTask, currentTime);
        currentTime = getCurrentTime();
        advanceTimers(currentTime);
      }
    } else {
      // Keep flushing callbacks until we run out of time in the frame.
      if (firstTask !== null) {
        do {
          flushTask(firstTask, currentTime);
          currentTime = getCurrentTime();
          advanceTimers(currentTime);
        } while (firstTask !== null && !shouldYieldToHost() && !(enableSchedulerDebugging && isSchedulerPaused));
      }
    }
    // Return whether there's additional work
    if (firstTask !== null) {
      return true;
    } else {
      if (firstDelayedTask !== null) {
        requestHostTimeout(handleTimeout, firstDelayedTask.startTime - currentTime);
      }
      return false;
    }
  } finally {
    isPerformingWork = false;
  }
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function unstable_next(eventHandler) {
  var priorityLevel;
  switch (currentPriorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
      // Shift down to normal priority
      priorityLevel = NormalPriority;
      break;
    default:
      // Anything lower than normal priority should remain at the current level.
      priorityLevel = currentPriorityLevel;
      break;
  }

  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    // This is a fork of runWithPriority, inlined for performance.
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;

    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
}

function timeoutForPriorityLevel(priorityLevel) {
  switch (priorityLevel) {
    case ImmediatePriority:
      return IMMEDIATE_PRIORITY_TIMEOUT;
    case UserBlockingPriority:
      return USER_BLOCKING_PRIORITY;
    case IdlePriority:
      return IDLE_PRIORITY;
    case LowPriority:
      return LOW_PRIORITY_TIMEOUT;
    case NormalPriority:
    default:
      return NORMAL_PRIORITY_TIMEOUT;
  }
}

function unstable_scheduleCallback(priorityLevel, callback, options) {
  var currentTime = getCurrentTime();

  var startTime;
  var timeout;
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
    timeout = typeof options.timeout === 'number' ? options.timeout : timeoutForPriorityLevel(priorityLevel);
  } else {
    timeout = timeoutForPriorityLevel(priorityLevel);
    startTime = currentTime;
  }

  var expirationTime = startTime + timeout;

  var newTask = {
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: expirationTime,
    next: null,
    previous: null
  };

  if (startTime > currentTime) {
    // This is a delayed task.
    insertDelayedTask(newTask, startTime);
    if (firstTask === null && firstDelayedTask === newTask) {
      // All tasks are delayed, and this is the task with the earliest delay.
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      }
      // Schedule a timeout.
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    insertScheduledTask(newTask, expirationTime);
    // Schedule a host callback, if needed. If we're already performing work,
    // wait until the next time we yield.
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}

function insertScheduledTask(newTask, expirationTime) {
  // Insert the new task into the list, ordered first by its timeout, then by
  // insertion. So the new task is inserted after any other task the
  // same timeout
  if (firstTask === null) {
    // This is the first task in the list.
    firstTask = newTask.next = newTask.previous = newTask;
  } else {
    var next = null;
    var task = firstTask;
    do {
      if (expirationTime < task.expirationTime) {
        // The new task times out before this one.
        next = task;
        break;
      }
      task = task.next;
    } while (task !== firstTask);

    if (next === null) {
      // No task with a later timeout was found, which means the new task has
      // the latest timeout in the list.
      next = firstTask;
    } else if (next === firstTask) {
      // The new task has the earliest expiration in the entire list.
      firstTask = newTask;
    }

    var previous = next.previous;
    previous.next = next.previous = newTask;
    newTask.next = next;
    newTask.previous = previous;
  }
}

function insertDelayedTask(newTask, startTime) {
  // Insert the new task into the list, ordered by its start time.
  if (firstDelayedTask === null) {
    // This is the first task in the list.
    firstDelayedTask = newTask.next = newTask.previous = newTask;
  } else {
    var next = null;
    var task = firstDelayedTask;
    do {
      if (startTime < task.startTime) {
        // The new task times out before this one.
        next = task;
        break;
      }
      task = task.next;
    } while (task !== firstDelayedTask);

    if (next === null) {
      // No task with a later timeout was found, which means the new task has
      // the latest timeout in the list.
      next = firstDelayedTask;
    } else if (next === firstDelayedTask) {
      // The new task has the earliest expiration in the entire list.
      firstDelayedTask = newTask;
    }

    var previous = next.previous;
    previous.next = next.previous = newTask;
    newTask.next = next;
    newTask.previous = previous;
  }
}

function unstable_pauseExecution() {
  isSchedulerPaused = true;
}

function unstable_continueExecution() {
  isSchedulerPaused = false;
  if (!isHostCallbackScheduled && !isPerformingWork) {
    isHostCallbackScheduled = true;
    requestHostCallback(flushWork);
  }
}

function unstable_getFirstCallbackNode() {
  return firstTask;
}

function unstable_cancelCallback(task) {
  var next = task.next;
  if (next === null) {
    // Already cancelled.
    return;
  }

  if (task === next) {
    if (task === firstTask) {
      firstTask = null;
    } else if (task === firstDelayedTask) {
      firstDelayedTask = null;
    }
  } else {
    if (task === firstTask) {
      firstTask = next;
    } else if (task === firstDelayedTask) {
      firstDelayedTask = next;
    }
    var previous = task.previous;
    previous.next = next;
    next.previous = previous;
  }

  task.next = task.previous = null;
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

function unstable_shouldYield() {
  var currentTime = getCurrentTime();
  advanceTimers(currentTime);
  return currentTask !== null && firstTask !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
}

var unstable_requestPaint = requestPaint;

exports.unstable_flushAllWithoutAsserting = unstable_flushAllWithoutAsserting;
exports.unstable_flushNumberOfYields = unstable_flushNumberOfYields;
exports.unstable_flushExpired = unstable_flushExpired;
exports.unstable_clearYields = unstable_clearYields;
exports.unstable_flushUntilNextPaint = unstable_flushUntilNextPaint;
exports.unstable_flushAll = unstable_flushAll;
exports.unstable_yieldValue = unstable_yieldValue;
exports.unstable_advanceTime = unstable_advanceTime;
exports.unstable_ImmediatePriority = ImmediatePriority;
exports.unstable_UserBlockingPriority = UserBlockingPriority;
exports.unstable_NormalPriority = NormalPriority;
exports.unstable_IdlePriority = IdlePriority;
exports.unstable_LowPriority = LowPriority;
exports.unstable_runWithPriority = unstable_runWithPriority;
exports.unstable_next = unstable_next;
exports.unstable_scheduleCallback = unstable_scheduleCallback;
exports.unstable_cancelCallback = unstable_cancelCallback;
exports.unstable_wrapCallback = unstable_wrapCallback;
exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
exports.unstable_shouldYield = unstable_shouldYield;
exports.unstable_requestPaint = unstable_requestPaint;
exports.unstable_continueExecution = unstable_continueExecution;
exports.unstable_pauseExecution = unstable_pauseExecution;
exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
exports.unstable_now = getCurrentTime;
exports.unstable_forceFrameRate = forceFrameRate;
  })();
}
