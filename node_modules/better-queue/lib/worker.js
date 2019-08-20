
var util = require('util');
var EE   = require('events').EventEmitter;
var ETA  = require('node-eta');

function Worker(opts) {
  this.fn = opts.fn;
  this.batch = opts.batch;
  this.single = opts.single;
  this.active = false;
  this.cancelled = false;
  this.failTaskOnProcessException = opts.failTaskOnProcessException;
}

util.inherits(Worker, EE);

Worker.prototype.setup = function () {
  var self = this;

  // Internal
  self._taskIds = Object.keys(self.batch);
  self._process = {};
  self._waiting = {};
  self._eta = new ETA();

  // Task counts
  self.counts = {
    finished: 0,
    failed: 0,
    completed: 0,
    total: self._taskIds.length,
  };

  // Progress
  self.status = 'ready';
  self.progress = {
    tasks: {},
    complete: 0,
    total: self._taskIds.length,
    eta: '',
  };

  // Setup
  self._taskIds.forEach(function (taskId, id) {
    self._waiting[id] = true;
    self.progress.tasks[id] = {
      pct: 0,
      complete: 0,
      total: 1,
    }
  })
}

Worker.prototype.start = function () {
  var self = this;
  if (self.active) return;

  self.setup();
  self._eta.count = self.progress.total;
  self._eta.start();

  self.active = true;
  self.status = 'in-progress';
  var tasks = self._taskIds.map(function (taskId) { return self.batch[taskId] });
  if (self.single) {
    tasks = tasks[0]
  }
  try {
    self._process = self.fn.call(self, tasks, function (err, result) {
      if (!self.active) return;
      if (err) {
        self.failedBatch(err);
      } else {
        self.finishBatch(result);
      }
    })
  } catch (err) {
    if (self.failTaskOnProcessException) {
      self.failedBatch(err);
    } else {
      throw new Error(err);
    }
  }
  self._process = self._process || {};
}

Worker.prototype.end = function () {
  if (!this.active) return;
  this.status = 'finished';
  this.active = false;
  this.emit('end');
}

Worker.prototype.resume = function () {
  if (typeof this._process.resume === 'function') {
    this._process.resume();
  }
  this.status = 'in-progress';
}

Worker.prototype.pause = function () {
  if (typeof this._process.pause === 'function') {
    this._process.pause();
  }
  this.status = 'paused';
}

Worker.prototype.cancel = function () {
  this.cancelled = true;
  if (typeof this._process.cancel === 'function') {
    this._process.cancel();
  }
  if (typeof this._process.abort === 'function') {
    this._process.abort();
  }
  this.failedBatch('cancelled');
}

Worker.prototype.failedBatch = function (msg) {
  var self = this;
  if (!self.active) return;
  Object.keys(self._waiting).forEach(function (id) {
    if (!self._waiting[id]) return;
    self.failedTask(id, msg);
  })
  self.emit('failed', msg);
  self.end();
}

Worker.prototype.failedTask = function (id, msg) {
  var self = this;
  if (!self.active) return;
  if (self._waiting[id]) {
    self._waiting[id] = false;
    self.counts.failed++;
    self.counts.completed++;
    self.emit('task_failed', id, msg);
  }
}

Worker.prototype.finishBatch = function (result) {
  var self = this;
  if (!self.active) return;
  Object.keys(self._waiting).forEach(function (id) {
    if (!self._waiting[id]) return;
    self.finishTask(id, result);
  })
  self.emit('finish', result);
  self.end();
}

Worker.prototype.finishTask = function (id, result) {
  var self = this;
  if (!self.active) return;
  if (self._waiting[id]) {
    self._waiting[id] = false;
    self.counts.finished++;
    self.counts.completed++;
    self.emit('task_finish', id, result);
  }
}

Worker.prototype.progressBatch = function (complete, total, msg) {
  var self = this;
  if (!self.active) return;
  Object.keys(self._waiting).forEach(function (id) {
    if (!self._waiting[id]) return;
    self.progressTask(id, complete, total, msg);
  })
  self.progress.complete = 0;
  self._taskIds.forEach(function (taskId, id) {
    self.progress.complete += self.progress.tasks[id].pct;
  })
  self._eta.done = self.progress.complete;
  self.progress.eta = self._eta.format('{{etah}}')
  self.progress.message = msg || '';
  self.emit('progress', self.progress);
}

Worker.prototype.progressTask = function (id, complete, total, msg) {
  var self = this;
  if (!self.active) return;
  if (self._waiting[id]) {
    self.progress.tasks[id].complete = complete;
    self.progress.tasks[id].total = self.progress.tasks[id].total || total;
    self.progress.tasks[id].message = self.progress.tasks[id].message || msg;
    self.progress.tasks[id].pct = Math.max(0, Math.min(1, complete/total));
    self.emit('task_progress', id, self.progress.tasks[id]);
  }
}

module.exports = Worker;
