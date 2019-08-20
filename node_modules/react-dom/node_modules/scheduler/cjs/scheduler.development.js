/** @license React v0.15.0
 * scheduler.development.js
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
var enableIsInputPending = false;
var requestIdleCallbackBeforeFirstFrame = false;
var requestTimerEventBeforeFirstFrame = false;
var enableMessageLoopImplementation = false;

// The DOM Scheduler implementation is similar to requestIdleCallback. It
// works by scheduling a requestAnimationFrame, storing the time for the start
// of the frame, then scheduling a postMessage which gets scheduled after paint.
// Within the postMessage handler do as much work as possible until time + frame
// rate. By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

var requestHostCallback = void 0;

var requestHostTimeout = void 0;
var cancelHostTimeout = void 0;
var shouldYieldToHost = void 0;
var requestPaint = void 0;
exports.unstable_now = void 0;
exports.unstable_forceFrameRate = void 0;

if (
// If Scheduler runs in a non-DOM environment, it falls back to a naive
// implementation using setTimeout.
typeof window === 'undefined' ||
// Check if MessageChannel is supported, too.
typeof MessageChannel !== 'function') {
  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
  // fallback to a naive implementation.
  var _callback = null;
  var _timeoutID = null;
  var _flushCallback = function () {
    if (_callback !== null) {
      try {
        var currentTime = exports.unstable_now();
        var hasRemainingTime = true;
        _callback(hasRemainingTime, currentTime);
        _callback = null;
      } catch (e) {
        setTimeout(_flushCallback, 0);
        throw e;
      }
    }
  };
  exports.unstable_now = function () {
    return Date.now();
  };
  requestHostCallback = function (cb) {
    if (_callback !== null) {
      // Protect against re-entrancy.
      setTimeout(requestHostCallback, 0, cb);
    } else {
      _callback = cb;
      setTimeout(_flushCallback, 0);
    }
  };
  requestHostTimeout = function (cb, ms) {
    _timeoutID = setTimeout(cb, ms);
  };
  cancelHostTimeout = function () {
    clearTimeout(_timeoutID);
  };
  shouldYieldToHost = function () {
    return false;
  };
  requestPaint = exports.unstable_forceFrameRate = function () {};
} else {
  // Capture local references to native APIs, in case a polyfill overrides them.
  var performance = window.performance;
  var _Date = window.Date;
  var _setTimeout = window.setTimeout;
  var _clearTimeout = window.clearTimeout;
  var requestAnimationFrame = window.requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;
  var requestIdleCallback = window.requestIdleCallback;

  if (typeof console !== 'undefined') {
    // TODO: Remove fb.me link
    if (typeof requestAnimationFrame !== 'function') {
      console.error("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
    if (typeof cancelAnimationFrame !== 'function') {
      console.error("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
  }

  var requestIdleCallbackBeforeFirstFrame$1 = requestIdleCallbackBeforeFirstFrame && typeof requestIdleCallback === 'function' && typeof cancelIdleCallback === 'function';

  exports.unstable_now = typeof performance === 'object' && typeof performance.now === 'function' ? function () {
    return performance.now();
  } : function () {
    return _Date.now();
  };

  var isRAFLoopRunning = false;
  var isMessageLoopRunning = false;
  var scheduledHostCallback = null;
  var rAFTimeoutID = -1;
  var taskTimeoutID = -1;

  var frameLength = enableMessageLoopImplementation ? // We won't attempt to align with the vsync. Instead we'll yield multiple
  // times per frame, often enough to keep it responsive even at really
  // high frame rates > 120.
  5 : // Use a heuristic to measure the frame rate and yield at the end of the
  // frame. We start out assuming that we run at 30fps but then the
  // heuristic tracking will adjust this value to a faster fps if we get
  // more frequent animation frames.
  33.33;

  var prevRAFTime = -1;
  var prevRAFInterval = -1;
  var frameDeadline = 0;

  var fpsLocked = false;

  // TODO: Make this configurable
  // TODO: Adjust this based on priority?
  var maxFrameLength = 300;
  var needsPaint = false;

  if (enableIsInputPending && navigator !== undefined && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined) {
    var scheduling = navigator.scheduling;
    shouldYieldToHost = function () {
      var currentTime = exports.unstable_now();
      if (currentTime >= frameDeadline) {
        // There's no time left in the frame. We may want to yield control of
        // the main thread, so the browser can perform high priority tasks. The
        // main ones are painting and user input. If there's a pending paint or
        // a pending input, then we should yield. But if there's neither, then
        // we can yield less often while remaining responsive. We'll eventually
        // yield regardless, since there could be a pending paint that wasn't
        // accompanied by a call to `requestPaint`, or other main thread tasks
        // like network events.
        if (needsPaint || scheduling.isInputPending()) {
          // There is either a pending paint or a pending input.
          return true;
        }
        // There's no pending input. Only yield if we've reached the max
        // frame length.
        return currentTime >= frameDeadline + maxFrameLength;
      } else {
        // There's still time left in the frame.
        return false;
      }
    };

    requestPaint = function () {
      needsPaint = true;
    };
  } else {
    // `isInputPending` is not available. Since we have no way of knowing if
    // there's pending input, always yield at the end of the frame.
    shouldYieldToHost = function () {
      return exports.unstable_now() >= frameDeadline;
    };

    // Since we yield every frame regardless, `requestPaint` has no effect.
    requestPaint = function () {};
  }

  exports.unstable_forceFrameRate = function (fps) {
    if (fps < 0 || fps > 125) {
      console.error('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing framerates higher than 125 fps is not unsupported');
      return;
    }
    if (fps > 0) {
      frameLength = Math.floor(1000 / fps);
      fpsLocked = true;
    } else {
      // reset the framerate
      frameLength = 33.33;
      fpsLocked = false;
    }
  };

  var performWorkUntilDeadline = function () {
    if (enableMessageLoopImplementation) {
      if (scheduledHostCallback !== null) {
        var currentTime = exports.unstable_now();
        // Yield after `frameLength` ms, regardless of where we are in the vsync
        // cycle. This means there's always time remaining at the beginning of
        // the message event.
        frameDeadline = currentTime + frameLength;
        var hasTimeRemaining = true;
        try {
          var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
          if (!hasMoreWork) {
            isMessageLoopRunning = false;
            scheduledHostCallback = null;
          } else {
            // If there's more work, schedule the next message event at the end
            // of the preceding one.
            port.postMessage(null);
          }
        } catch (error) {
          // If a scheduler task throws, exit the current browser task so the
          // error can be observed.
          port.postMessage(null);
          throw error;
        }
      }
      // Yielding to the browser will give it a chance to paint, so we can
      // reset this.
      needsPaint = false;
    } else {
      if (scheduledHostCallback !== null) {
        var _currentTime = exports.unstable_now();
        var _hasTimeRemaining = frameDeadline - _currentTime > 0;
        try {
          var _hasMoreWork = scheduledHostCallback(_hasTimeRemaining, _currentTime);
          if (!_hasMoreWork) {
            scheduledHostCallback = null;
          }
        } catch (error) {
          // If a scheduler task throws, exit the current browser task so the
          // error can be observed, and post a new task as soon as possible
          // so we can continue where we left off.
          port.postMessage(null);
          throw error;
        }
      }
      // Yielding to the browser will give it a chance to paint, so we can
      // reset this.
      needsPaint = false;
    }
  };

  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;

  var onAnimationFrame = function (rAFTime) {
    if (scheduledHostCallback === null) {
      // No scheduled work. Exit.
      prevRAFTime = -1;
      prevRAFInterval = -1;
      isRAFLoopRunning = false;
      return;
    }

    // Eagerly schedule the next animation callback at the beginning of the
    // frame. If the scheduler queue is not empty at the end of the frame, it
    // will continue flushing inside that callback. If the queue *is* empty,
    // then it will exit immediately. Posting the callback at the start of the
    // frame ensures it's fired within the earliest possible frame. If we
    // waited until the end of the frame to post the callback, we risk the
    // browser skipping a frame and not firing the callback until the frame
    // after that.
    isRAFLoopRunning = true;
    requestAnimationFrame(function (nextRAFTime) {
      _clearTimeout(rAFTimeoutID);
      onAnimationFrame(nextRAFTime);
    });

    // requestAnimationFrame is throttled when the tab is backgrounded. We
    // don't want to stop working entirely. So we'll fallback to a timeout loop.
    // TODO: Need a better heuristic for backgrounded work.
    var onTimeout = function () {
      frameDeadline = exports.unstable_now() + frameLength / 2;
      performWorkUntilDeadline();
      rAFTimeoutID = _setTimeout(onTimeout, frameLength * 3);
    };
    rAFTimeoutID = _setTimeout(onTimeout, frameLength * 3);

    if (prevRAFTime !== -1 &&
    // Make sure this rAF time is different from the previous one. This check
    // could fail if two rAFs fire in the same frame.
    rAFTime - prevRAFTime > 0.1) {
      var rAFInterval = rAFTime - prevRAFTime;
      if (!fpsLocked && prevRAFInterval !== -1) {
        // We've observed two consecutive frame intervals. We'll use this to
        // dynamically adjust the frame rate.
        //
        // If one frame goes long, then the next one can be short to catch up.
        // If two frames are short in a row, then that's an indication that we
        // actually have a higher frame rate than what we're currently
        // optimizing. For example, if we're running on 120hz display or 90hz VR
        // display. Take the max of the two in case one of them was an anomaly
        // due to missed frame deadlines.
        if (rAFInterval < frameLength && prevRAFInterval < frameLength) {
          frameLength = rAFInterval < prevRAFInterval ? prevRAFInterval : rAFInterval;
          if (frameLength < 8.33) {
            // Defensive coding. We don't support higher frame rates than 120hz.
            // If the calculated frame length gets lower than 8, it is probably
            // a bug.
            frameLength = 8.33;
          }
        }
      }
      prevRAFInterval = rAFInterval;
    }
    prevRAFTime = rAFTime;
    frameDeadline = rAFTime + frameLength;

    // We use the postMessage trick to defer idle work until after the repaint.
    port.postMessage(null);
  };

  requestHostCallback = function (callback) {
    scheduledHostCallback = callback;
    if (enableMessageLoopImplementation) {
      if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
      }
    } else {
      if (!isRAFLoopRunning) {
        // Start a rAF loop.
        isRAFLoopRunning = true;
        requestAnimationFrame(function (rAFTime) {
          if (requestIdleCallbackBeforeFirstFrame$1) {
            cancelIdleCallback(idleCallbackID);
          }
          if (requestTimerEventBeforeFirstFrame) {
            _clearTimeout(idleTimeoutID);
          }
          onAnimationFrame(rAFTime);
        });

        // If we just missed the last vsync, the next rAF might not happen for
        // another frame. To claim as much idle time as possible, post a
        // callback with `requestIdleCallback`, which should fire if there's
        // idle time left in the frame.
        //
        // This should only be an issue for the first rAF in the loop;
        // subsequent rAFs are scheduled at the beginning of the
        // preceding frame.
        var idleCallbackID = void 0;
        if (requestIdleCallbackBeforeFirstFrame$1) {
          idleCallbackID = requestIdleCallback(function onIdleCallbackBeforeFirstFrame() {
            if (requestTimerEventBeforeFirstFrame) {
              _clearTimeout(idleTimeoutID);
            }
            frameDeadline = exports.unstable_now() + frameLength;
            performWorkUntilDeadline();
          });
        }
        // Alternate strategy to address the same problem. Scheduler a timer
        // with no delay. If this fires before the rAF, that likely indicates
        // that there's idle time before the next vsync. This isn't always the
        // case, but we'll be aggressive and assume it is, as a trade off to
        // prevent idle periods.
        var idleTimeoutID = void 0;
        if (requestTimerEventBeforeFirstFrame) {
          idleTimeoutID = _setTimeout(function onTimerEventBeforeFirstFrame() {
            if (requestIdleCallbackBeforeFirstFrame$1) {
              cancelIdleCallback(idleCallbackID);
            }
            frameDeadline = exports.unstable_now() + frameLength;
            performWorkUntilDeadline();
          }, 0);
        }
      }
    }
  };

  requestHostTimeout = function (callback, ms) {
    taskTimeoutID = _setTimeout(function () {
      callback(exports.unstable_now());
    }, ms);
  };

  cancelHostTimeout = function () {
    _clearTimeout(taskTimeoutID);
    taskTimeoutID = -1;
  };
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
        currentTime = exports.unstable_now();
        advanceTimers(currentTime);
      }
    } else {
      // Keep flushing callbacks until we run out of time in the frame.
      if (firstTask !== null) {
        do {
          flushTask(firstTask, currentTime);
          currentTime = exports.unstable_now();
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
  var currentTime = exports.unstable_now();

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
  var currentTime = exports.unstable_now();
  advanceTimers(currentTime);
  return currentTask !== null && firstTask !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
}

var unstable_requestPaint = requestPaint;

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
  })();
}
