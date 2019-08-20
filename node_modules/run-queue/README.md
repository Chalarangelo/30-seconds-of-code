# run-queue

A promise based, dynamic priority queue runner, with concurrency limiting.

```js
const RunQueue = require('run-queue')

const queue = new RunQueue({
  maxConcurrency: 1
})

queue.add(1, example, [-1])
for (let ii = 0; ii < 5; ++ii) {
  queue.add(0, example, [ii])
}
const finished = []
queue.run().then(
  console.log(finished)
})

function example (num, next) {
  setTimeout(() => {
    finished.push(num)
    next()
  }, 5 - Math.abs(num))
}
```

would output

```
[ 0, 1, 2, 3, 4, -1 ]
```

If you bump concurrency to `2`, then you get:

```
[ 1, 0, 3, 2, 4, -1 ]
```

The concurrency means that they don't finish in order, because some take
longer than others.  Each priority level must finish entirely before the
next priority level is run.  See
[PRIORITIES](https://github.com/iarna/run-queue#priorities) below.  This is
even true if concurrency is set high enough that all of the regular queue
can execute at once, for instance, with `maxConcurrency: 10`:

```
[ 4, 3, 2, 1, 0, -1 ]
```

## API

### const queue = new RunQueue(options)

Create a new queue. Options may contain:

* maxConcurrency - (Default: `1`) The maximum number of jobs to execute at once.
* Promise - (Default: global.Promise) The promise implementation to use.

### queue.add (prio, fn, args)

Add a new job to the end of the queue at priority `prio` that will run `fn`
with `args`. If `fn` is async then it should return a Promise.

### queue.run ()

Start running the job queue.  Returns a Promise that resolves when either
all the jobs are complete or a job ends in error (throws or returns a
rejected promise). If a job ended in error then this Promise will be rejected
with that error and no further queue running will be done.

## PRIORITIES

Priorities are any integer value >= 0.

Lowest is executed first.

Priorities essentially represent distinct job queues.  All jobs in a queue
must complete before the next highest priority job queue is executed.

This means that if you have two queues, `0` and `1` then ALL jobs in `0`
must complete before ANY execute in `1`.  If you add new `0` level jobs
while `1` level jobs are running then it will switch back processing the `0`
queue and won't execute any more `1` jobs till all of the new `0` jobs
complete.
