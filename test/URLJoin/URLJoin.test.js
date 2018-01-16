const test = require('tape');
const URLJoin = require('./URLJoin.js');

test('Testing URLJoin', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof URLJoin === 'function', 'URLJoin is a Function');
  t.equal(URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'), 'http://www.google.com/a/b/cd?foo=123&bar=foo', 'Returns proper URL');
  t.equal(URLJoin('file://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'), 'file:///www.google.com/a/b/cd?foo=123&bar=foo', 'Returns proper URL');
	//t.deepEqual(URLJoin(args..), 'Expected');
	//t.equal(URLJoin(args..), 'Expected');
	//t.false(URLJoin(args..), 'Expected');
	//t.throws(URLJoin(args..), 'Expected');
	t.end();
});
