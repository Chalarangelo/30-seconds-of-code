const test = require('tape');
const orderBy = require('./orderBy.js');

test('Testing orderBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof orderBy === 'function', 'orderBy is a Function');
	const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
	t.deepEqual(orderBy(users, ['name', 'age'], ['asc', 'desc']), [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}], "Returns a sorted array of objects ordered by properties and orders.");
	t.deepEqual(orderBy(users, ['name', 'age']), [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}], "Returns a sorted array of objects ordered by properties and orders.");
	//t.deepEqual(orderBy(args..), 'Expected');
	//t.equal(orderBy(args..), 'Expected');
	//t.false(orderBy(args..), 'Expected');
	//t.throws(orderBy(args..), 'Expected');
	t.end();
});