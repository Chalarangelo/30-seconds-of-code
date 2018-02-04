const test = require('tape');
const pullBy = require('./pullBy.js');

test('Testing pullBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pullBy === 'function', 'pullBy is a Function');
  var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
  pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x);
  t.deepEqual(myArray, [{ x: 2 }], 'Pulls the specified values');
  //t.deepEqual(pullBy(args..), 'Expected');
  //t.equal(pullBy(args..), 'Expected');
  //t.false(pullBy(args..), 'Expected');
  //t.throws(pullBy(args..), 'Expected');
  t.end();
});
