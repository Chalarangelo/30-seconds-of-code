"use strict";

function MemoryStoreWithPriorityBuckets() {
  let uuid = 0;
  /**
   * Task ids grouped by priority
   */

  const queueMap = new Map();
  /**
   * Task id to task lookup
   */

  const tasks = new Map();
  /**
   * Task id to priority lookup
   */

  const taskIdToPriority = new Map();
  /**
   * Lock to running tasks object
   */

  const running = {};
  let priorityKeys = [];

  const updatePriorityKeys = () => {
    priorityKeys = Array.from(queueMap.keys()).sort((a, b) => b - a);
  };

  const addTaskWithPriority = (taskId, priority) => {
    let needToUpdatePriorityKeys = false;
    let priorityTasks = queueMap.get(priority);

    if (!priorityTasks) {
      priorityTasks = [];
      queueMap.set(priority, priorityTasks);
      needToUpdatePriorityKeys = true;
    }

    taskIdToPriority.set(taskId, priority);
    priorityTasks.push(taskId);
    return needToUpdatePriorityKeys;
  };

  return {
    connect: function (cb) {
      cb(null, tasks.size);
    },
    getTask: function (taskId, cb) {
      cb(null, tasks.get(taskId));
    },
    deleteTask: function (taskId, cb) {
      if (tasks.get(taskId)) {
        tasks.delete(taskId);
        const priority = taskIdToPriority.get(taskId);
        const priorityTasks = queueMap.get(priority);
        priorityTasks.splice(priorityTasks.indexOf(taskId), 1);
        taskIdToPriority.delete(taskId);
      }

      cb();
    },
    putTask: function (taskId, task, priority = 0, cb) {
      const oldTask = tasks.get(taskId);
      tasks.set(taskId, task);
      let needToUpdatePriorityKeys = false;

      if (oldTask) {
        const oldPriority = taskIdToPriority.get(taskId);

        if (oldPriority !== priority) {
          const oldPriorityTasks = queueMap.get(oldPriority);
          oldPriorityTasks.splice(oldPriorityTasks.indexOf(taskId), 1);

          if (addTaskWithPriority(taskId, priority) || oldPriority.length === 0) {
            needToUpdatePriorityKeys = true;
          }
        }
      } else {
        needToUpdatePriorityKeys = addTaskWithPriority(taskId, priority);
      }

      if (needToUpdatePriorityKeys) {
        updatePriorityKeys();
      }

      cb();
    },
    takeFirstN: function (n, cb) {
      const lockId = uuid++;
      let remainingTasks = n;
      let needToUpdatePriorityKeys = false;
      let haveSomeTasks = false;
      const tasksToRun = {};

      for (let priority of priorityKeys) {
        const taskWithSamePriority = queueMap.get(priority);
        const grabbedTaskIds = taskWithSamePriority.splice(0, remainingTasks);
        grabbedTaskIds.forEach(taskId => {
          // add task to task that will run
          // and remove it from waiting list
          tasksToRun[taskId] = tasks.get(taskId);
          tasks.delete(taskId);
          taskIdToPriority.delete(taskId);
          haveSomeTasks = true;
        });
        remainingTasks -= grabbedTaskIds.length;

        if (taskWithSamePriority.length === 0) {
          queueMap.delete(priority);
          needToUpdatePriorityKeys = true;
        }

        if (remainingTasks <= 0) {
          break;
        }
      }

      if (needToUpdatePriorityKeys) {
        updatePriorityKeys();
      }

      if (haveSomeTasks) {
        running[lockId] = tasksToRun;
      }

      cb(null, lockId);
    },
    takeLastN: function (n, cb) {
      // This is not really used by Gatsby, but will be implemented for
      // completion in easiest possible way (so not very performant).
      // Mostly done so generic test suite used by other stores passes.
      // This is mostly C&P from takeFirstN, with array reversal and different
      // splice args
      const lockId = uuid++;
      let remainingTasks = n;
      let needToUpdatePriorityKeys = false;
      let haveSomeTasks = false;
      const tasksToRun = {};

      for (let priority of priorityKeys.reverse()) {
        const taskWithSamePriority = queueMap.get(priority);
        const deleteCount = Math.min(remainingTasks, taskWithSamePriority.length);
        const grabbedTaskIds = taskWithSamePriority.splice(taskWithSamePriority.length - deleteCount, deleteCount);
        grabbedTaskIds.forEach(taskId => {
          // add task to task that will run
          // and remove it from waiting list
          tasksToRun[taskId] = tasks.get(taskId);
          tasks.delete(taskId);
          taskIdToPriority.delete(taskId);
          haveSomeTasks = true;
        });
        remainingTasks -= grabbedTaskIds.length;

        if (taskWithSamePriority.length === 0) {
          queueMap.delete(priority);
          needToUpdatePriorityKeys = true;
        }

        if (remainingTasks <= 0) {
          break;
        }
      }

      if (needToUpdatePriorityKeys) {
        updatePriorityKeys();
      }

      if (haveSomeTasks) {
        running[lockId] = tasksToRun;
      }

      cb(null, lockId);
    },
    getRunningTasks: function (cb) {
      cb(null, running);
    },
    getLock: function (lockId, cb) {
      cb(null, running[lockId]);
    },
    releaseLock: function (lockId, cb) {
      delete running[lockId];
      cb();
    }
  };
}

module.exports = MemoryStoreWithPriorityBuckets;
//# sourceMappingURL=better-queue-custom-store.js.map