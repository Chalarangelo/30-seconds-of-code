/**
 * Support for concurrent task management and synchronization in web
 * applications.
 *
 * @author Dave Longley
 * @author David I. Lehn <dlehn@digitalbazaar.com>
 *
 * Copyright (c) 2009-2013 Digital Bazaar, Inc.
 */
var forge = require('./forge');
require('./debug');
require('./log');
require('./util');

// logging category
var cat = 'forge.task';

// verbose level
// 0: off, 1: a little, 2: a whole lot
// Verbose debug logging is surrounded by a level check to avoid the
// performance issues with even calling the logging code regardless if it
// is actually logged.  For performance reasons this should not be set to 2
// for production use.
// ex: if(sVL >= 2) forge.log.verbose(....)
var sVL = 0;

// track tasks for debugging
var sTasks = {};
var sNextTaskId = 0;
// debug access
forge.debug.set(cat, 'tasks', sTasks);

// a map of task type to task queue
var sTaskQueues = {};
// debug access
forge.debug.set(cat, 'queues', sTaskQueues);

// name for unnamed tasks
var sNoTaskName = '?';

// maximum number of doNext() recursions before a context swap occurs
// FIXME: might need to tweak this based on the browser
var sMaxRecursions = 30;

// time slice for doing tasks before a context swap occurs
// FIXME: might need to tweak this based on the browser
var sTimeSlice = 20;

/**
 * Task states.
 *
 * READY: ready to start processing
 * RUNNING: task or a subtask is running
 * BLOCKED: task is waiting to acquire N permits to continue
 * SLEEPING: task is sleeping for a period of time
 * DONE: task is done
 * ERROR: task has an error
 */
var READY = 'ready';
var RUNNING = 'running';
var BLOCKED = 'blocked';
var SLEEPING = 'sleeping';
var DONE = 'done';
var ERROR = 'error';

/**
 * Task actions.  Used to control state transitions.
 *
 * STOP: stop processing
 * START: start processing tasks
 * BLOCK: block task from continuing until 1 or more permits are released
 * UNBLOCK: release one or more permits
 * SLEEP: sleep for a period of time
 * WAKEUP: wakeup early from SLEEPING state
 * CANCEL: cancel further tasks
 * FAIL: a failure occured
 */
var STOP = 'stop';
var START = 'start';
var BLOCK = 'block';
var UNBLOCK = 'unblock';
var SLEEP = 'sleep';
var WAKEUP = 'wakeup';
var CANCEL = 'cancel';
var FAIL = 'fail';

/**
 * State transition table.
 *
 * nextState = sStateTable[currentState][action]
 */
var sStateTable = {};

sStateTable[READY] = {};
sStateTable[READY][STOP] = READY;
sStateTable[READY][START] = RUNNING;
sStateTable[READY][CANCEL] = DONE;
sStateTable[READY][FAIL] = ERROR;

sStateTable[RUNNING] = {};
sStateTable[RUNNING][STOP] = READY;
sStateTable[RUNNING][START] = RUNNING;
sStateTable[RUNNING][BLOCK] = BLOCKED;
sStateTable[RUNNING][UNBLOCK] = RUNNING;
sStateTable[RUNNING][SLEEP] = SLEEPING;
sStateTable[RUNNING][WAKEUP] = RUNNING;
sStateTable[RUNNING][CANCEL] = DONE;
sStateTable[RUNNING][FAIL] = ERROR;

sStateTable[BLOCKED] = {};
sStateTable[BLOCKED][STOP] = BLOCKED;
sStateTable[BLOCKED][START] = BLOCKED;
sStateTable[BLOCKED][BLOCK] = BLOCKED;
sStateTable[BLOCKED][UNBLOCK] = BLOCKED;
sStateTable[BLOCKED][SLEEP] = BLOCKED;
sStateTable[BLOCKED][WAKEUP] = BLOCKED;
sStateTable[BLOCKED][CANCEL] = DONE;
sStateTable[BLOCKED][FAIL] = ERROR;

sStateTable[SLEEPING] = {};
sStateTable[SLEEPING][STOP] = SLEEPING;
sStateTable[SLEEPING][START] = SLEEPING;
sStateTable[SLEEPING][BLOCK] = SLEEPING;
sStateTable[SLEEPING][UNBLOCK] = SLEEPING;
sStateTable[SLEEPING][SLEEP] = SLEEPING;
sStateTable[SLEEPING][WAKEUP] = SLEEPING;
sStateTable[SLEEPING][CANCEL] = DONE;
sStateTable[SLEEPING][FAIL] = ERROR;

sStateTable[DONE] = {};
sStateTable[DONE][STOP] = DONE;
sStateTable[DONE][START] = DONE;
sStateTable[DONE][BLOCK] = DONE;
sStateTable[DONE][UNBLOCK] = DONE;
sStateTable[DONE][SLEEP] = DONE;
sStateTable[DONE][WAKEUP] = DONE;
sStateTable[DONE][CANCEL] = DONE;
sStateTable[DONE][FAIL] = ERROR;

sStateTable[ERROR] = {};
sStateTable[ERROR][STOP] = ERROR;
sStateTable[ERROR][START] = ERROR;
sStateTable[ERROR][BLOCK] = ERROR;
sStateTable[ERROR][UNBLOCK] = ERROR;
sStateTable[ERROR][SLEEP] = ERROR;
sStateTable[ERROR][WAKEUP] = ERROR;
sStateTable[ERROR][CANCEL] = ERROR;
sStateTable[ERROR][FAIL] = ERROR;

/**
 * Creates a new task.
 *
 * @param options options for this task
 *   run: the run function for the task (required)
 *   name: the run function for the task (optional)
 *   parent: parent of this task (optional)
 *
 * @return the empty task.
 */
var Task = function(options) {
  // task id
  this.id = -1;

  // task name
  this.name = options.name || sNoTaskName;

  // task has no parent
  this.parent = options.parent || null;

  // save run function
  this.run = options.run;

  // create a queue of subtasks to run
  this.subtasks = [];

  // error flag
  this.error = false;

  // state of the task
  this.state = READY;

  // number of times the task has been blocked (also the number
  // of permits needed to be released to continue running)
  this.blocks = 0;

  // timeout id when sleeping
  this.timeoutId = null;

  // no swap time yet
  this.swapTime = null;

  // no user data
  this.userData = null;

  // initialize task
  // FIXME: deal with overflow
  this.id = sNextTaskId++;
  sTasks[this.id] = this;
  if(sVL >= 1) {
    forge.log.verbose(cat, '[%s][%s] init', this.id, this.name, this);
  }
};

/**
 * Logs debug information on this task and the system state.
 */
Task.prototype.debug = function(msg) {
  msg = msg || '';
  forge.log.debug(cat, msg,
    '[%s][%s] task:', this.id, this.name, this,
    'subtasks:', this.subtasks.length,
    'queue:', sTaskQueues);
};

/**
 * Adds a subtask to run after task.doNext() or task.fail() is called.
 *
 * @param name human readable name for this task (optional).
 * @param subrun a function to run that takes the current task as
 *          its first parameter.
 *
 * @return the current task (useful for chaining next() calls).
 */
Task.prototype.next = function(name, subrun) {
  // juggle parameters if it looks like no name is given
  if(typeof(name) === 'function') {
    subrun = name;

    // inherit parent's name
    name = this.name;
  }
  // create subtask, set parent to this task, propagate callbacks
  var subtask = new Task({
    run: subrun,
    name: name,
    parent: this
  });
  // start subtasks running
  subtask.state = RUNNING;
  subtask.type = this.type;
  subtask.successCallback = this.successCallback || null;
  subtask.failureCallback = this.failureCallback || null;

  // queue a new subtask
  this.subtasks.push(subtask);

  return this;
};

/**
 * Adds subtasks to run in parallel after task.doNext() or task.fail()
 * is called.
 *
 * @param name human readable name for this task (optional).
 * @param subrun functions to run that take the current task as
 *          their first parameter.
 *
 * @return the current task (useful for chaining next() calls).
 */
Task.prototype.parallel = function(name, subrun) {
  // juggle parameters if it looks like no name is given
  if(forge.util.isArray(name)) {
    subrun = name;

    // inherit parent's name
    name = this.name;
  }
  // Wrap parallel tasks in a regular task so they are started at the
  // proper time.
  return this.next(name, function(task) {
    // block waiting for subtasks
    var ptask = task;
    ptask.block(subrun.length);

    // we pass the iterator from the loop below as a parameter
    // to a function because it is otherwise included in the
    // closure and changes as the loop changes -- causing i
    // to always be set to its highest value
    var startParallelTask = function(pname, pi) {
      forge.task.start({
        type: pname,
        run: function(task) {
           subrun[pi](task);
        },
        success: function(task) {
           ptask.unblock();
        },
        failure: function(task) {
           ptask.unblock();
        }
      });
    };

    for(var i = 0; i < subrun.length; i++) {
      // Type must be unique so task starts in parallel:
      //    name + private string + task id + sub-task index
      // start tasks in parallel and unblock when the finish
      var pname = name + '__parallel-' + task.id + '-' + i;
      var pi = i;
      startParallelTask(pname, pi);
    }
  });
};

/**
 * Stops a running task.
 */
Task.prototype.stop = function() {
  this.state = sStateTable[this.state][STOP];
};

/**
 * Starts running a task.
 */
Task.prototype.start = function() {
  this.error = false;
  this.state = sStateTable[this.state][START];

  // try to restart
  if(this.state === RUNNING) {
    this.start = new Date();
    this.run(this);
    runNext(this, 0);
  }
};

/**
 * Blocks a task until it one or more permits have been released. The
 * task will not resume until the requested number of permits have
 * been released with call(s) to unblock().
 *
 * @param n number of permits to wait for(default: 1).
 */
Task.prototype.block = function(n) {
  n = typeof(n) === 'undefined' ? 1 : n;
  this.blocks += n;
  if(this.blocks > 0) {
    this.state = sStateTable[this.state][BLOCK];
  }
};

/**
 * Releases a permit to unblock a task. If a task was blocked by
 * requesting N permits via block(), then it will only continue
 * running once enough permits have been released via unblock() calls.
 *
 * If multiple processes need to synchronize with a single task then
 * use a condition variable (see forge.task.createCondition). It is
 * an error to unblock a task more times than it has been blocked.
 *
 * @param n number of permits to release (default: 1).
 *
 * @return the current block count (task is unblocked when count is 0)
 */
Task.prototype.unblock = function(n) {
  n = typeof(n) === 'undefined' ? 1 : n;
  this.blocks -= n;
  if(this.blocks === 0 && this.state !== DONE) {
    this.state = RUNNING;
    runNext(this, 0);
  }
  return this.blocks;
};

/**
 * Sleep for a period of time before resuming tasks.
 *
 * @param n number of milliseconds to sleep (default: 0).
 */
Task.prototype.sleep = function(n) {
  n = typeof(n) === 'undefined' ? 0 : n;
  this.state = sStateTable[this.state][SLEEP];
  var self = this;
  this.timeoutId = setTimeout(function() {
    self.timeoutId = null;
    self.state = RUNNING;
    runNext(self, 0);
  }, n);
};

/**
 * Waits on a condition variable until notified. The next task will
 * not be scheduled until notification. A condition variable can be
 * created with forge.task.createCondition().
 *
 * Once cond.notify() is called, the task will continue.
 *
 * @param cond the condition variable to wait on.
 */
Task.prototype.wait = function(cond) {
  cond.wait(this);
};

/**
 * If sleeping, wakeup and continue running tasks.
 */
Task.prototype.wakeup = function() {
  if(this.state === SLEEPING) {
    cancelTimeout(this.timeoutId);
    this.timeoutId = null;
    this.state = RUNNING;
    runNext(this, 0);
  }
};

/**
 * Cancel all remaining subtasks of this task.
 */
Task.prototype.cancel = function() {
  this.state = sStateTable[this.state][CANCEL];
  // remove permits needed
  this.permitsNeeded = 0;
  // cancel timeouts
  if(this.timeoutId !== null) {
    cancelTimeout(this.timeoutId);
    this.timeoutId = null;
  }
  // remove subtasks
  this.subtasks = [];
};

/**
 * Finishes this task with failure and sets error flag. The entire
 * task will be aborted unless the next task that should execute
 * is passed as a parameter. This allows levels of subtasks to be
 * skipped. For instance, to abort only this tasks's subtasks, then
 * call fail(task.parent). To abort this task's subtasks and its
 * parent's subtasks, call fail(task.parent.parent). To abort
 * all tasks and simply call the task callback, call fail() or
 * fail(null).
 *
 * The task callback (success or failure) will always, eventually, be
 * called.
 *
 * @param next the task to continue at, or null to abort entirely.
 */
Task.prototype.fail = function(next) {
  // set error flag
  this.error = true;

  // finish task
  finish(this, true);

  if(next) {
    // propagate task info
    next.error = this.error;
    next.swapTime = this.swapTime;
    next.userData = this.userData;

    // do next task as specified
    runNext(next, 0);
  } else {
    if(this.parent !== null) {
      // finish root task (ensures it is removed from task queue)
      var parent = this.parent;
      while(parent.parent !== null) {
        // propagate task info
        parent.error = this.error;
        parent.swapTime = this.swapTime;
        parent.userData = this.userData;
        parent = parent.parent;
      }
      finish(parent, true);
    }

    // call failure callback if one exists
    if(this.failureCallback) {
      this.failureCallback(this);
    }
  }
};

/**
 * Asynchronously start a task.
 *
 * @param task the task to start.
 */
var start = function(task) {
  task.error = false;
  task.state = sStateTable[task.state][START];
  setTimeout(function() {
    if(task.state === RUNNING) {
      task.swapTime = +new Date();
      task.run(task);
      runNext(task, 0);
    }
  }, 0);
};

/**
 * Run the next subtask or finish this task.
 *
 * @param task the task to process.
 * @param recurse the recursion count.
 */
var runNext = function(task, recurse) {
  // get time since last context swap (ms), if enough time has passed set
  // swap to true to indicate that doNext was performed asynchronously
  // also, if recurse is too high do asynchronously
  var swap =
    (recurse > sMaxRecursions) ||
    (+new Date() - task.swapTime) > sTimeSlice;

  var doNext = function(recurse) {
    recurse++;
    if(task.state === RUNNING) {
      if(swap) {
        // update swap time
        task.swapTime = +new Date();
      }

      if(task.subtasks.length > 0) {
        // run next subtask
        var subtask = task.subtasks.shift();
        subtask.error = task.error;
        subtask.swapTime = task.swapTime;
        subtask.userData = task.userData;
        subtask.run(subtask);
        if(!subtask.error) {
           runNext(subtask, recurse);
        }
      } else {
        finish(task);

        if(!task.error) {
          // chain back up and run parent
          if(task.parent !== null) {
            // propagate task info
            task.parent.error = task.error;
            task.parent.swapTime = task.swapTime;
            task.parent.userData = task.userData;

            // no subtasks left, call run next subtask on parent
            runNext(task.parent, recurse);
          }
        }
      }
    }
  };

  if(swap) {
    // we're swapping, so run asynchronously
    setTimeout(doNext, 0);
  } else {
    // not swapping, so run synchronously
    doNext(recurse);
  }
};

/**
 * Finishes a task and looks for the next task in the queue to start.
 *
 * @param task the task to finish.
 * @param suppressCallbacks true to suppress callbacks.
 */
var finish = function(task, suppressCallbacks) {
  // subtask is now done
  task.state = DONE;

  delete sTasks[task.id];
  if(sVL >= 1) {
    forge.log.verbose(cat, '[%s][%s] finish',
      task.id, task.name, task);
  }

  // only do queue processing for root tasks
  if(task.parent === null) {
    // report error if queue is missing
    if(!(task.type in sTaskQueues)) {
      forge.log.error(cat,
        '[%s][%s] task queue missing [%s]',
        task.id, task.name, task.type);
    } else if(sTaskQueues[task.type].length === 0) {
      // report error if queue is empty
      forge.log.error(cat,
        '[%s][%s] task queue empty [%s]',
        task.id, task.name, task.type);
    } else if(sTaskQueues[task.type][0] !== task) {
      // report error if this task isn't the first in the queue
      forge.log.error(cat,
        '[%s][%s] task not first in queue [%s]',
        task.id, task.name, task.type);
    } else {
      // remove ourselves from the queue
      sTaskQueues[task.type].shift();
      // clean up queue if it is empty
      if(sTaskQueues[task.type].length === 0) {
        if(sVL >= 1) {
          forge.log.verbose(cat, '[%s][%s] delete queue [%s]',
            task.id, task.name, task.type);
        }
        /* Note: Only a task can delete a queue of its own type. This
         is used as a way to synchronize tasks. If a queue for a certain
         task type exists, then a task of that type is running.
         */
        delete sTaskQueues[task.type];
      } else {
        // dequeue the next task and start it
        if(sVL >= 1) {
          forge.log.verbose(cat,
            '[%s][%s] queue start next [%s] remain:%s',
            task.id, task.name, task.type,
            sTaskQueues[task.type].length);
        }
        sTaskQueues[task.type][0].start();
      }
    }

    if(!suppressCallbacks) {
      // call final callback if one exists
      if(task.error && task.failureCallback) {
        task.failureCallback(task);
      } else if(!task.error && task.successCallback) {
        task.successCallback(task);
      }
    }
  }
};

/* Tasks API */
module.exports = forge.task = forge.task || {};

/**
 * Starts a new task that will run the passed function asynchronously.
 *
 * In order to finish the task, either task.doNext() or task.fail()
 * *must* be called.
 *
 * The task must have a type (a string identifier) that can be used to
 * synchronize it with other tasks of the same type. That type can also
 * be used to cancel tasks that haven't started yet.
 *
 * To start a task, the following object must be provided as a parameter
 * (each function takes a task object as its first parameter):
 *
 * {
 *   type: the type of task.
 *   run: the function to run to execute the task.
 *   success: a callback to call when the task succeeds (optional).
 *   failure: a callback to call when the task fails (optional).
 * }
 *
 * @param options the object as described above.
 */
forge.task.start = function(options) {
  // create a new task
  var task = new Task({
    run: options.run,
    name: options.name || sNoTaskName
  });
  task.type = options.type;
  task.successCallback = options.success || null;
  task.failureCallback = options.failure || null;

  // append the task onto the appropriate queue
  if(!(task.type in sTaskQueues)) {
    if(sVL >= 1) {
      forge.log.verbose(cat, '[%s][%s] create queue [%s]',
        task.id, task.name, task.type);
    }
    // create the queue with the new task
    sTaskQueues[task.type] = [task];
    start(task);
  } else {
    // push the task onto the queue, it will be run after a task
    // with the same type completes
    sTaskQueues[options.type].push(task);
  }
};

/**
 * Cancels all tasks of the given type that haven't started yet.
 *
 * @param type the type of task to cancel.
 */
forge.task.cancel = function(type) {
  // find the task queue
  if(type in sTaskQueues) {
    // empty all but the current task from the queue
    sTaskQueues[type] = [sTaskQueues[type][0]];
  }
};

/**
 * Creates a condition variable to synchronize tasks. To make a task wait
 * on the condition variable, call task.wait(condition). To notify all
 * tasks that are waiting, call condition.notify().
 *
 * @return the condition variable.
 */
forge.task.createCondition = function() {
  var cond = {
    // all tasks that are blocked
    tasks: {}
  };

  /**
   * Causes the given task to block until notify is called. If the task
   * is already waiting on this condition then this is a no-op.
   *
   * @param task the task to cause to wait.
   */
  cond.wait = function(task) {
    // only block once
    if(!(task.id in cond.tasks)) {
       task.block();
       cond.tasks[task.id] = task;
    }
  };

  /**
   * Notifies all waiting tasks to wake up.
   */
  cond.notify = function() {
    // since unblock() will run the next task from here, make sure to
    // clear the condition's blocked task list before unblocking
    var tmp = cond.tasks;
    cond.tasks = {};
    for(var id in tmp) {
      tmp[id].unblock();
    }
  };

  return cond;
};
