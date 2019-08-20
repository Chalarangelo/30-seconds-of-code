# Worker Farm [![Build Status](https://secure.travis-ci.org/rvagg/node-worker-farm.svg)](http://travis-ci.org/rvagg/node-worker-farm)

[![NPM](https://nodei.co/npm/worker-farm.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/worker-farm/) [![NPM](https://nodei.co/npm-dl/worker-farm.png?months=6&height=3)](https://nodei.co/npm/worker-farm/)


Distribute processing tasks to child processes with an über-simple API and baked-in durability & custom concurrency options. *Available in npm as <strong>worker-farm</strong>*.

## Example

Given a file, *child.js*:

```js
module.exports = function (inp, callback) {
  callback(null, inp + ' BAR (' + process.pid + ')')
}
```

And a main file:

```js
var workerFarm = require('worker-farm')
  , workers    = workerFarm(require.resolve('./child'))
  , ret        = 0

for (var i = 0; i < 10; i++) {
  workers('#' + i + ' FOO', function (err, outp) {
    console.log(outp)
    if (++ret == 10)
      workerFarm.end(workers)
  })
}
```

We'll get an output something like the following:

```
#1 FOO BAR (8546)
#0 FOO BAR (8545)
#8 FOO BAR (8545)
#9 FOO BAR (8546)
#2 FOO BAR (8548)
#4 FOO BAR (8551)
#3 FOO BAR (8549)
#6 FOO BAR (8555)
#5 FOO BAR (8553)
#7 FOO BAR (8557)
```

This example is contained in the *[examples/basic](https://github.com/rvagg/node-worker-farm/tree/master/examples/basic/)* directory.

### Example #1: Estimating π using child workers

You will also find a more complex example in *[examples/pi](https://github.com/rvagg/node-worker-farm/tree/master/examples/pi/)* that estimates the value of **π** by using a Monte Carlo *area-under-the-curve* method and compares the speed of doing it all in-process vs using child workers to complete separate portions.

Running `node examples/pi` will give you something like:

```
Doing it the slow (single-process) way...
π ≈ 3.1416269360000006  (0.0000342824102075312 away from actual!)
took 8341 milliseconds
Doing it the fast (multi-process) way...
π ≈ 3.1416233600000036  (0.00003070641021052367 away from actual!)
took 1985 milliseconds
```

## Durability

An important feature of Worker Farm is **call durability**. If a child process dies for any reason during the execution of call(s), those calls will be re-queued and taken care of by other child processes. In this way, when you ask for something to be done, unless there is something *seriously* wrong with what you're doing, you should get a result on your callback function.

## My use-case

There are other libraries for managing worker processes available but my use-case was fairly specific: I need to make heavy use of the [node-java](https://github.com/nearinfinity/node-java) library to interact with JVM code. Unfortunately, because the JVM garbage collector is so difficult to interact with, it's prone to killing your Node process when the GC kicks under heavy load. For safety I needed a durable way to make calls so that (1) it wouldn't kill my main process and (2) any calls that weren't successful would be resubmitted for processing.

Worker Farm allows me to spin up multiple JVMs to be controlled by Node, and have a single, uncomplicated API that acts the same way as an in-process API and the calls will be taken care of by a child process even if an error kills a child process while it is working as the call will simply be passed to a new child process.

**But**, don't think that Worker Farm is specific to that use-case, it's designed to be very generic and simple to adapt to anything requiring the use of child Node processes.

## API

Worker Farm exports a main function and an `end()` method. The main function sets up a "farm" of coordinated child-process workers and it can be used to instantiate multiple farms, all operating independently.

### workerFarm([options, ]pathToModule[, exportedMethods])

In its most basic form, you call `workerFarm()` with the path to a module file to be invoked by the child process. You should use an **absolute path** to the module file, the best way to obtain the path is with `require.resolve('./path/to/module')`, this function can be used in exactly the same way as `require('./path/to/module')` but it returns an absolute path.

#### `exportedMethods`

If your module exports a single function on `module.exports` then you should omit the final parameter. However, if you are exporting multiple functions on `module.exports` then you should list them in an Array of Strings:

```js
var workers = workerFarm(require.resolve('./mod'), [ 'doSomething', 'doSomethingElse' ])
workers.doSomething(function () {})
workers.doSomethingElse(function () {})
```

Listing the available methods will instruct Worker Farm what API to provide you with on the returned object. If you don't list a `exportedMethods` Array then you'll get a single callable function to use; but if you list the available methods then you'll get an object with callable functions by those names.

**It is assumed that each function you call on your child module will take a `callback` function as the last argument.**

#### `options`

If you don't provide an `options` object then the following defaults will be used:

```js
{
    workerOptions               : {}
  , maxCallsPerWorker           : Infinity
  , maxConcurrentWorkers        : require('os').cpus().length
  , maxConcurrentCallsPerWorker : 10
  , maxConcurrentCalls          : Infinity
  , maxCallTime                 : Infinity
  , maxRetries                  : Infinity
  , autoStart                   : false
  , onChild                     : function() {}
}
```

  * **<code>workerOptions</code>** allows you to customize all the parameters passed to child nodes. This object supports [all possible options of `child_process.fork`](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options). The default options passed are the parent `execArgv`, `cwd` and `env`. Any (or all) of them can be overridden, and others can be added as well.

  * **<code>maxCallsPerWorker</code>** allows you to control the lifespan of your child processes. A positive number will indicate that you only want each child to accept that many calls before it is terminated. This may be useful if you need to control memory leaks or similar in child processes.

  * **<code>maxConcurrentWorkers</code>** will set the number of child processes to maintain concurrently. By default it is set to the number of CPUs available on the current system, but it can be any reasonable number, including `1`.

  * **<code>maxConcurrentCallsPerWorker</code>** allows you to control the *concurrency* of individual child processes. Calls are placed into a queue and farmed out to child processes according to the number of calls they are allowed to handle concurrently. It is arbitrarily set to 10 by default so that calls are shared relatively evenly across workers, however if your calls predictably take a similar amount of time then you could set it to `Infinity` and Worker Farm won't queue any calls but spread them evenly across child processes and let them go at it. If your calls aren't I/O bound then it won't matter what value you use here as the individual workers won't be able to execute more than a single call at a time.

  * **<code>maxConcurrentCalls</code>** allows you to control the maximum number of calls in the queue&mdash;either actively being processed or waiting for a worker to be processed. `Infinity` indicates no limit but if you have conditions that may endlessly queue jobs and you need to set a limit then provide a `>0` value and any calls that push the limit will return on their callback with a `MaxConcurrentCallsError` error (check `err.type == 'MaxConcurrentCallsError'`).

  * **<code>maxCallTime</code>** *(use with caution, understand what this does before you use it!)* when `!== Infinity`, will cap a time, in milliseconds, that *any single call* can take to execute in a worker. If this time limit is exceeded by just a single call then the worker running that call will be killed and any calls running on that worker will have their callbacks returned with a `TimeoutError` (check `err.type == 'TimeoutError'`). If you are running with `maxConcurrentCallsPerWorker` value greater than `1` then **all calls currently executing** will fail and will be automatically resubmitted uless you've changed the `maxRetries` option. Use this if you have jobs that may potentially end in infinite loops that you can't programatically end with your child code. Preferably run this with a `maxConcurrentCallsPerWorker` so you don't interrupt other calls when you have a timeout. This timeout operates on a per-call basis but will interrupt a whole worker.

  * **<code>maxRetries</code>** allows you to control the max number of call requeues after worker termination (unexpected or timeout). By default this option is set to `Infinity` which means that each call of each terminated worker will always be auto requeued. When the number of retries exceeds `maxRetries` value, the job callback will be executed with a `ProcessTerminatedError`. Note that if you are running with finite `maxCallTime` and `maxConcurrentCallsPerWorkers` greater than `1` then any `TimeoutError` will increase the retries counter *for each* concurrent call of the terminated worker.

  * **<code>autoStart</code>** when set to `true` will start the workers as early as possible. Use this when your workers have to do expensive initialization. That way they'll be ready when the first request comes through.

  * **<code>onChild</code>** when new child process starts this callback will be called with subprocess object as an argument. Use this when you need to add some custom communication with child processes.

### workerFarm.end(farm)

Child processes stay alive waiting for jobs indefinitely and your farm manager will stay alive managing its workers, so if you need it to stop then you have to do so explicitly. If you send your farm API to `workerFarm.end()` then it'll cleanly end your worker processes. Note though that it's a *soft* ending so it'll wait for child processes to finish what they are working on before asking them to die.

Any calls that are queued and not yet being handled by a child process will be discarded. `end()` only waits for those currently in progress.

Once you end a farm, it won't handle any more calls, so don't even try!

## Related

* [farm-cli](https://github.com/Kikobeats/farm-cli) – Launch a farm of workers from CLI.

## License

Worker Farm is Copyright (c) 2014 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.
