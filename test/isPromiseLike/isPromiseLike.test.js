const test = require('tape');
const isPromiseLike = require('./isPromiseLike.js');

test('Testing isPromiseLike', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isPromiseLike === 'function', 'isPromiseLike is a Function');
  t.equal(isPromiseLike({
    then: function() {
      return '';
    }
  }), true, 'Returns true for a promise-like object');
  t.equal(isPromiseLike(null), false, 'Returns false for null');
  t.equal(isPromiseLike({}), false, 'Returns false for an empty object');
  //t.deepEqual(isPromiseLike(args..), 'Expected');
  //t.equal(isPromiseLike(args..), 'Expected');
  //t.false(isPromiseLike(args..), 'Expected');
  //t.throws(isPromiseLike(args..), 'Expected');
  t.end();
});
