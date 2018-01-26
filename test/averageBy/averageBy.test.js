const test = require('tape');
const averageBy = require('./averageBy.js');

test('Testing averageBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof averageBy === 'function', 'averageBy is a Function');
  t.equals(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n), 5, 'Produces the right result with a function');
  t.equals(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'), 5, 'Produces the right result with a property name');
  //t.deepEqual(averageBy(args..), 'Expected');
  //t.equal(averageBy(args..), 'Expected');
  //t.false(averageBy(args..), 'Expected');
  //t.throws(averageBy(args..), 'Expected');
  t.end();
});
