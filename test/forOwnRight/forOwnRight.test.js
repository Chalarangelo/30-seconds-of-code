const test = require('tape');
const forOwnRight = require('./forOwnRight.js');

test('Testing forOwnRight', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof forOwnRight === 'function', 'forOwnRight is a Function');
  let output = [];
  forOwnRight({ foo: 'bar', a: 1 }, v => output.push(v)); // 'bar', 1
  t.deepEqual(output, [1, 'bar'], 'Iterates over an element\'s key-value pairs in reverse');
  //t.deepEqual(forOwnRight(args..), 'Expected');
  //t.equal(forOwnRight(args..), 'Expected');
  //t.false(forOwnRight(args..), 'Expected');
  //t.throws(forOwnRight(args..), 'Expected');
  t.end();
});
