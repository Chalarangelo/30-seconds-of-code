const test = require('tape');
const forEachRight = require('./forEachRight.js');

test('Testing forEachRight', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof forEachRight === 'function', 'forEachRight is a Function');
  let output = '';
  forEachRight([1, 2, 3, 4], val => output+=val);
  t.equal(output, '4321', 'Iterates over the array in reverse');
  //t.deepEqual(forEachRight(args..), 'Expected');
  //t.equal(forEachRight(args..), 'Expected');
  //t.false(forEachRight(args..), 'Expected');
  //t.throws(forEachRight(args..), 'Expected');
  t.end();
});
