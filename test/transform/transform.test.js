const test = require('tape');
const transform = require('./transform.js');

test('Testing transform', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof transform === 'function', 'transform is a Function');
  t.deepEqual(transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
), { '1': ['a', 'c'], '2': ['b'] }, 'Transforms an object');
  //t.deepEqual(transform(args..), 'Expected');
  //t.equal(transform(args..), 'Expected');
  //t.false(transform(args..), 'Expected');
  //t.throws(transform(args..), 'Expected');
  t.end();
});
