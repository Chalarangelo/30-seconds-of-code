'use strict'

const workerFarm = require('../')
    , workers    = workerFarm(require.resolve('./child'), ['args'])


workers.args(function(err, result) {
  console.log(result);
  workerFarm.end(workers)
  console.log('FINISHED')
  process.exit(0)
})
