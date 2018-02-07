const test = require('tape');
const forOwn = require('./forOwn.js');

test('Testing forOwn', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof forOwn === 'function', 'forOwn is a Function');
  let output = [];
  forOwn({ foo: 'bar', a: 1 }, v => output.push(v)); // 'bar', 1
  t.deepEqual(output, ['bar', 1], 'Iterates over an element\'s key-value pairs');
  //t.deepEqual(forOwn(args..), 'Expected');
  //t.equal(forOwn(args..), 'Expected');
  //t.false(forOwn(args..), 'Expected');
  //t.throws(forOwn(args..), 'Expected');
  t.end();
});
