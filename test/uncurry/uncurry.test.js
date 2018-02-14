const test = require('tape');
const uncurry = require('./uncurry.js');

test('Testing uncurry', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof uncurry === 'function', 'uncurry is a Function');
  const add = x => y => z => x + y + z;
  const add1 = uncurry(add);
  const add2 = uncurry(add, 2);
  const add3 = uncurry(add, 3);
  t.equal(add1(1)(2)(3), 6, 'Works without a provided value for n');
  t.equal(add2(1,2)(3), 6, 'Works without n = 2');
  t.equal(add3(1,2,3), 6, 'Works withoutn = 3');
  //t.deepEqual(uncurry(args..), 'Expected');
  //t.equal(uncurry(args..), 'Expected');
  //t.false(uncurry(args..), 'Expected');
  //t.throws(uncurry(args..), 'Expected');
  t.end();
});
