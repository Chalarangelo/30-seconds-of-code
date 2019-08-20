# Better Queue - Powerful flow control

[![npm package](https://nodei.co/npm/better-queue.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/better-queue/)

[![Build status](https://img.shields.io/travis/diamondio/better-queue.svg?style=flat-square)](https://travis-ci.org/diamondio/better-queue)
[![Dependency Status](https://img.shields.io/david/diamondio/better-queue.svg?style=flat-square)](https://david-dm.org/diamondio/better-queue)
[![Known Vulnerabilities](https://snyk.io/test/npm/better-queue/badge.svg?style=flat-square)](https://snyk.io/test/npm/better-queue)
[![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square)](https://gitter.im/diamondio/better-queue?utm_source=badge)


## Super simple to use

Better Queue is designed to be simple to set up but still let you do complex things.

- Persistent (and extendable) storage
- Batched processing
- Prioritize tasks
- Merge/filter tasks
- Progress events (with ETA!)
- Fine-tuned timing controls
- Retry on fail
- Concurrent batch processing
- Task statistics (average completion time, failure rate and peak queue size)
- ... and more!

---

#### Install (via npm)

```bash
npm install --save better-queue
```

---

#### Quick Example

```js
var Queue = require('better-queue');

var q = new Queue(function (input, cb) {
  
  // Some processing here ...

  cb(null, result);
})

q.push(1)
q.push({ x: 1 })
```

## Table of contents

- [Queuing](#queuing)
- [Task Management](#task-management)
- [Queue Management](#queue-management)
- [Advanced](#advanced)
- [Storage](#storage)
- [Full Documentation](#full-documentation)

---

You will be able to combine any (and all) of these options
for your queue!


## Queuing

It's very easy to push tasks into the queue.

```js
var q = new Queue(fn);
q.push(1);
q.push({ x: 1, y: 2 });
q.push("hello");
```

You can also include a callback as a second parameter to the push
function, which would be called when that task is done. For example:

```js
var q = new Queue(fn);
q.push(1, function (err, result) {
  // Results from the task!
});
```

You can also listen to events on the results of the `push` call.

```js
var q = new Queue(fn);
q.push(1)
  .on('finish', function (result) {
    // Task succeeded with {result}!
  })
  .on('failed', function (err) {
    // Task failed!
  })
```

Alternatively, you can subscribe to the queue's events.

```js
var q = new Queue(fn);
q.on('task_finish', function (taskId, result, stats) {
  // taskId = 1, result: 3, stats = { elapsed: <time taken> }
  // taskId = 2, result: 5, stats = { elapsed: <time taken> }
})
q.on('task_failed', function (taskId, err, stats) {
  // Handle error, stats = { elapsed: <time taken> }
})
q.on('empty', function (){})
q.on('drain', function (){})
q.push({ id: 1, a: 1, b: 2 });
q.push({ id: 2, a: 2, b: 3 });
```

`empty` event fires when all of the tasks have been pulled off of
the queue (there may still be tasks running!)

`drain` event fires when there are no more tasks on the queue _and_
when no more tasks are running.

You can control how many tasks process at the same time.

```js
var q = new Queue(fn, { concurrent: 3 })
```

Now the queue will allow 3 tasks running at the same time. (By 
default, we handle tasks one at a time.)

You can also turn the queue into a stack by turning on `filo`.

```js
var q = new Queue(fn, { filo: true })
```

Now items you push on will be handled first.



[back to top](#table-of-contents)

---

## Task Management

#### Task ID

Tasks can be given an ID to help identify and track it as it goes through
the queue.

By default, we look for `task.id` to see if it's a string property,
otherwise we generate a random ID for the task.

You can pass in an `id` property to options to change this behaviour.
Here are some examples of how:

```js
var q = new Queue(fn, {
  id: 'id',   // Default: task's `id` property
  id: 'name', // task's `name` property
  id: function (task, cb) {
    // Compute the ID
    cb(null, 'computed_id');
  }
})
```

One thing you can do with Task ID is merge tasks:

```js
var counter = new Queue(function (task, cb) {
  console.log("I have %d %ss.", task.count, task.id);
  cb();
}, {
  merge: function (oldTask, newTask, cb) {
    oldTask.count += newTask.count;
    cb(null, oldTask);
  }
})
counter.push({ id: 'apple', count: 2 });
counter.push({ id: 'apple', count: 1 });
counter.push({ id: 'orange', count: 1 });
counter.push({ id: 'orange', count: 1 });
// Prints out:
//   I have 3 apples.
//   I have 2 oranges.
```

By default, if tasks have the same ID they replace the previous task.

```js
var counter = new Queue(function (task, cb) {
  console.log("I have %d %ss.", task.count, task.id);
  cb();
})
counter.push({ id: 'apple', count: 1 });
counter.push({ id: 'apple', count: 3 });
counter.push({ id: 'orange', count: 1 });
counter.push({ id: 'orange', count: 2 });
// Prints out:
//   I have 3 apples.
//   I have 2 oranges.
```

You can also use the task ID when subscribing to events from Queue.

```js
var counter = new Queue(fn)
counter.on('task_finish', function (taskId, result) {
  // taskId will be 'jim' or 'bob'
})
counter.push({ id: 'jim', count: 2 });
counter.push({ id: 'bob', count: 1 });
```


#### Batch Processing

Your processing function can also be modified to handle multiple
tasks at the same time. For example:

```js
var ages = new Queue(function (batch, cb) {
  // Batch 1:
  //   [ { id: 'steve', age: 21 },
  //     { id: 'john', age: 34 },
  //     { id: 'joe', age: 18 } ]
  // Batch 2:
  //   [ { id: 'mary', age: 23 } ]
  cb();
}, { batchSize: 3 })
ages.push({ id: 'steve', age: 21 });
ages.push({ id: 'john', age: 34 });
ages.push({ id: 'joe', age: 18 });
ages.push({ id: 'mary', age: 23 });
```

Note how the queue will only handle at most 3 items at a time.

Below is another example of a batched call with numbers.

```js
var ages = new Queue(function (batch, cb) {
  // batch = [1,2,3]
  cb();
}, { batchSize: 3 })
ages.push(1);
ages.push(2);
ages.push(3);
```


#### Filtering, Validation and Priority

You can also format (and filter) the input that arrives from a push
before it gets processed by the queue by passing in a `filter` 
function.

```js
var greeter = new Queue(function (name, cb) {
  console.log("Hello, %s!", name)
  cb();
}, {
  filter: function (input, cb) {
    if (input === 'Bob') {
      return cb('not_allowed');
    }
    return cb(null, input.toUpperCase())
  }
});
greeter.push('anna'); // Prints 'Hello, ANNA!'
```

This can be particularly useful if your queue needs to do some pre-processing,
input validation, database lookup, etc. before you load it onto the queue.

You can also define a priority function to control which tasks get
processed first.

```js
var greeter = new Queue(function (name, cb) {
  console.log("Greetings, %s.", name);
  cb();
}, {
  priority: function (name, cb) {
    if (name === "Steve") return cb(null, 10);
    if (name === "Mary") return cb(null, 5);
    if (name === "Joe") return cb(null, 5);
    cb(null, 1);
  }
})
greeter.push("Steve");
greeter.push("John");
greeter.push("Joe");
greeter.push("Mary");

// Prints out:
//   Greetings, Steve.
//   Greetings, Joe.
//   Greetings, Mary.
//   Greetings, John.
```

If `filo` is set to `true` in the example above, then Joe and Mary 
would swap order.


[back to top](#table-of-contents)

---

## Queue Management

#### Retry

You can set tasks to retry `maxRetries` times if they fail. By default,
tasks will fail (and will not retry.) Optionally, you can set a `retryDelay`
to wait a little while before retrying.

```js
var q = new Queue(fn, { maxRetries: 10, retryDelay: 1000 })
```


#### Timing

You can configure the queue to have a `maxTimeout`.

```js
var q = new Queue(function (name, cb) {
  someLongTask(function () {
    cb();
  })
}, { maxTimeout: 2000 })
```

After 2 seconds, the process will throw an error instead of waiting for the
callback to finish.

You can also delay the queue before it starts its processing. This is the 
behaviour of a timed cargo.

```js
var q = new Queue(function (batch, cb) {
  // Batch [1,2] will process after 2s.
  cb();
}, { batchSize: 5, batchDelay: 2000 })
q.push(1);
setTimeout(function () {
  q.push(2);
}, 1000)
```

You can also set `afterProcessDelay`, which will delay processing between tasks.

```js
var q = new Queue(function (task, cb) {
  cb(); // Will wait 1 second before taking the next task
}, { afterProcessDelay: 1000 })
q.push(1);
q.push(2);
```

Instead of just the `batchDelay`, you can add a `batchDelayTimeout`, which is for firing off a batch if it hasn't had any new tasks pushed to the queue in the `batchDelayTimeout` time (in milliseconds.)

```js
var q = new Queue(fn, {
  batchSize: 50,
  batchDelay: 5000,
  batchDelayTimeout: 1000
})
q.push(1);
q.push(2);
```

In the example above, the queue will wait for 50 items to fill up in 5s or process the queue if no new tasks were added in 1s.

#### Precondition

You can define a function called `precondition` that checks that it's ok to process
the next batch. If the preconditions fail, it will keep calling this function until
it passes again.

```js
var q = new Queue(function (batch, cb) {

  // Do something that requires internet

}, {
  precondition: function (cb) {
    isOnline(function (err, ok) {
      if (ok) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    })
  },
  preconditionRetryTimeout: 10*1000 // If we go offline, retry every 10s
})
```


#### Pause/Resume

There are options to control processes while they are running.

You can return an object in your processing function with the functions
`cancel`, `pause` and `resume`. This will allow operations to pause, resume 
or cancel while it's running.

```js
var uploader = new Queue(function (file, cb) {
  
  var worker = someLongProcess(file);

  return {
    cancel: function () {
      // Cancel the file upload
    },
    pause: function () {
      // Pause the file upload
    },
    resume: function () {
      // Resume the file upload
    }
  }
})
uploader.push('/path/to/file.pdf');
uploader.pause();
uploader.resume();
```

#### Cancel/Abort

You can also set `cancelIfRunning` to `true`. This will cancel a running task if
a task with the same ID is pushed onto the queue.

```js
var uploader = new Queue(function (file, cb) {
  var request = someLongProcess(file);
  return {
    cancel: function () {
      request.cancel();
    }
  }
}, {
  id: 'path',
  cancelIfRunning: true
})
uploader.push({ path: '/path/to/file.pdf' });
// ... Some time later
uploader.push({ path: '/path/to/file.pdf' });
```

In the example above, the first upload process is cancelled and the task is requeued.

You can also call `.cancel(taskId)` to cancel and unqueue the task.

```js
uploader.cancel('/path/to/file.pdf');
```

Note that if you enable this option in batch mode, it will cancel the entire batch!


[back to top](#table-of-contents)

---

## Advanced

#### Updating Task Status

The process function will be run in a context with `progress`,
`finishBatch` and `failedBatch` functions.

The example below illustrates how you can use these:

```js
var uploader = new Queue(function (file, cb) {
  this.failedBatch('some_error')
  this.finishBatch(result)
  this.progressBatch(bytesUploaded, totalBytes, "uploading")
});
uploader.on('task_finish', function (taskId, result) {
  // Handle finished result
})
uploader.on('task_failed', function (taskId, errorMessage) {
  // Handle error
})
uploader.on('task_progress', function (taskId, completed, total) {
  // Handle task progress
})

uploader.push('/some/file.jpg')
  .on('finish', function (result) {
    // Handle upload result
  })
  .on('failed', function (err) {
    // Handle error
  })
  .on('progress', function (progress) {
    // progress.eta - human readable string estimating time remaining
    // progress.pct - % complete (out of 100)
    // progress.complete - # completed so far
    // progress.total - # for completion
    // progress.message - status message
  })
```

#### Update Status in Batch mode (batchSize > 1)

You can also complete individual tasks in a batch by using `failedTask` and
`finishTask` functions.

```js
var uploader = new Queue(function (files, cb) {
  this.failedTask(0, 'some_error')         // files[0] has failed with 'some_error'
  this.finishTask(1, result)               // files[1] has finished with {result}
  this.progressTask(2, 30, 100, "copying") // files[2] is 30% done, currently copying
}, { batchSize: 3 });
uploader.push('/some/file1.jpg')
uploader.push('/some/file2.jpg')
uploader.push('/some/file3.jpg')
```

Note that if you use *-Task and *-Batch functions together, the batch functions will only
apply to the tasks that have not yet finished/failed.


#### Queue Statistics

You can inspect the queue at any given time to see information about how many items are
queued, average queue time, success rate and total item processed.

```js
var q = new Queue(fn);
var stats = q.getStats();

// stats.total = Total tasks processed
// stats.average = Average process time
// stats.successRate = % success (between 0 and 1)
// stats.peak = Most tasks queued at any given point in time
```


[back to top](#table-of-contents)

---


## Storage


#### Using a store

For your convenience, we have added compatibility for a few storage options.

By default, we are using an in-memory store that doesn't persist. You can change
to one of our other built in stores by passing in the `store` option.

#### Built-in store

Currently, we support the following stores:

 - memory
 - sql (SQLite, PostgreSQL)

#### SQLite store (`npm install sqlite3`)
```
var q = new Queue(fn, {
  store: {
    type: 'sql',
    dialect: 'sqlite',
    path: '/path/to/sqlite/file'
  }
});
```

#### PostgreSQL store (`npm install pg`)
```
var q = new Queue(fn, {
  store: {
    type: 'sql',
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'username',
    password: 'password',
    dbname: 'template1',
    tableName: 'tasks'
  }
});
```

Please help us add support for more stores; contributions are welcome!

#### Custom Store

Writing your own store is very easy; you just need to implement a few functions
then call `queue.use(store)` on your store.

```js
var q = new Queue(fn, { store: myStore });
```

or

```js
q.use(myStore);
```

Your store needs the following functions:
```js
q.use({
  connect: function (cb) {
    // Connect to your db
  },
  getTask: function (taskId, cb) {
    // Retrieves a task
  },
  putTask: function (taskId, task, priority, cb) {
    // Save task with given priority
  },
  takeFirstN: function (n, cb) {
    // Removes the first N items (sorted by priority and age)
  },
  takeLastN: function (n, cb) {
    // Removes the last N items (sorted by priority and recency)
  }
})
```

[back to top](#table-of-contents)

---

## Full Documentation

#### new Queue(process, options)

The first argument can be either the process function or the `options` object.

A process function is required, all other options are optional.

- `process` - function to process tasks. Will be run with either one single task (if `batchSize` is 1) or as an array of at most `batchSize` items. The second argument will be a callback `cb(error, result)` that must be called regardless of success or failure.

---

- `filter` - function to filter input. Will be run with `input` whatever was passed to `q.push()`. If you define this function, then you will be expected to call the callback `cb(error, task)`. If an error is sent in the callback then the input is rejected.
- `merge` - function to merge tasks with the same task ID. Will be run with `oldTask`, `newTask` and a callback `cb(error, mergedTask)`. If you define this function then the callback is expected to be called.
- `priority` - function to determine the priority of a task. Takes in a task and returns callback `cb(error, priority)`.
- `precondition` - function that runs a check before processing to ensure it can process the next batch. Takes a callback `cb(error, passOrFail)`.

---

- `id` - The property to use as the task ID. This can be a string or a function (for more complicated IDs). The function `(task, cb)` and must call the callback with `cb(error, taskId)`.
- `cancelIfRunning` - If true, when a task with the same ID is running, its worker will be cancelled. Defaults to `false`.
- `autoResume` - If true, tasks in the store will automatically start processing once it connects to the store. Defaults to `true`.
- `failTaskOnProcessException` - If true, when the process function throws an error the batch fails. Defaults to `true`.
- `filo` - If true, tasks will be completed in a first in, last out order. Defaults to `false`.
- `batchSize` - The number of tasks (at most) that can be processed at once. Defaults to `1`.
- `batchDelay` - Number of milliseconds to delay before starting to popping items off the queue. Defaults to `0`.
- `batchDelayTimeout` - Number of milliseconds to wait for a new task to arrive before firing off the batch. Defaults to `Infinity`.
- `concurrent` - Number of workers that can be running at any given time. Defaults to `1`.
- `maxTimeout` - Number of milliseconds before a task is considered timed out. Defaults to `Infinity`.
- `afterProcessDelay` - Number of milliseconds to delay before processing the next batch of items. Defaults to `1`.
- `maxRetries` - Maximum number of attempts to retry on a failed task. Defaults to `0`.
- `retryDelay` - Number of milliseconds before retrying. Defaults to `0`.
- `storeMaxRetries` - Maximum number of attempts before giving up on the store. Defaults to `Infinity`.
- `storeRetryTimeout` - Number of milliseconds to delay before trying to connect to the store again. Defaults to `1000`.
- `preconditionRetryTimeout` - Number of milliseconds to delay before checking the precondition function again. Defaults to `1000`.
- `store` - Represents the options for the initial store. Can be an object containing `{ type: storeType, ... options ... }`, or the store instance itself.

#### Methods on Queue

- `push(task, cb)` - Push a task onto the queue, with an optional callback when it completes. Returns a `Ticket` object.
- `pause()` - Pauses the queue: tries to pause running tasks and prevents tasks from getting processed until resumed.
- `resume()` - Resumes the queue and its runnign tasks.
- `destroy(cb)` - Destroys the queue: closes the store, tries to clean up.
- `use(store)` - Sets the queue to read from and write to the given store.
- `getStats()` - Gets the aggregate stats for the queue. Returns an object with properties `successRate`, `peak`, `total` and `average`, representing the success rate on tasks, peak number of items queued, total number of items processed and average processing time, respectively.
- `resetStats()` - Resets all of the aggregate stats.

#### Events on Queue

- `task_queued` - When a task is queued
- `task_accepted` - When a task is accepted
- `task_started` - When a task begins processing
- `task_finish` - When a task is completed
- `task_failed` - When a task fails
- `task_progress` - When a task progress changes
- `batch_finish` - When a batch of tasks (or worker) completes
- `batch_failed` - When a batch of tasks (or worker) fails
- `batch_progress` - When a batch of tasks (or worker) updates its progress

#### Events on Ticket

- `accept` - When the corresponding task is accepted (has passed filter)
- `queued` - When the corresponding task is queued (and saved into the store)
- `started` - When the corresponding task is started
- `progress` - When the corresponding task progress changes
- `finish` - When the corresponding task completes
- `failed` - When the corresponding task fails

