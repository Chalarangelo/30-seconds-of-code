const test = require('tape');
const minBy = require('./minBy.js');

test('Testing minBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof minBy === 'function', 'minBy is a Function');
  t.equals(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n), 2, 'Produces the right result with a function');
  t.equals(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'), 2, 'Produces the right result with a property name');
	//t.deepEqual(minBy(args..), 'Expected');
	//t.equal(minBy(args..), 'Expected');
	//t.false(minBy(args..), 'Expected');
	//t.throws(minBy(args..), 'Expected');
	t.end();
});
