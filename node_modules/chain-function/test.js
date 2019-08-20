var assert = require('assert')
var chain = require('./index')

console.log('testing...')

var count = 0;

chain(
  function(step){ count += step },
  function(step){ count += step },
  function(step){ count += step }
)(1)

assert.equal(count, 3, 'should chain calls')

count = 0;

chain(
  function(step){ count += step },
  null, undefined,
  function(step){ count += step }
)(1)

assert.equal(count, 2, 'should filter out null and undefined arguments')

var fn = function(){}
assert.equal(chain(fn, null), fn, 'should return the only function argument')

console.log('done. tests pass!')
