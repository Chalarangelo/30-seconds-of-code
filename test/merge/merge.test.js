const test = require('tape');
const merge = require('./merge.js');

test('Testing merge', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof merge === 'function', 'merge is a Function');
  const object = {
    a: [{ x: 2 }, { y: 4 }],
    b: 1
  };
  const other = {
    a: { z: 3 },
    b: [2, 3],
    c: 'foo'
  };
  t.deepEqual(merge(object, other), { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }, 'Merges two objects');
  //t.deepEqual(merge(args..), 'Expected');
  //t.equal(merge(args..), 'Expected');
  //t.false(merge(args..), 'Expected');
  //t.throws(merge(args..), 'Expected');
  t.end();
});
