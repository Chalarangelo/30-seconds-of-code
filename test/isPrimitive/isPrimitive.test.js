const test = require('tape');
const isPrimitive = require('./isPrimitive.js');

test('Testing isPrimitive', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof isPrimitive === 'function', 'isPrimitive is a Function');
  t.true(isPrimitive(null), "isPrimitive(null) is primitive");
  t.true(isPrimitive(undefined), "isPrimitive(undefined) is primitive");
  t.true(isPrimitive('string'), "isPrimitive(string) is primitive");
	t.true(isPrimitive(true), "isPrimitive(true) is primitive");
	t.true(isPrimitive(50), "isPrimitive(50) is primitive");
	t.true(isPrimitive('Hello'), "isPrimitive('Hello') is primitive");
	t.true(isPrimitive(false), "isPrimitive(false) is primitive");
	t.true(isPrimitive(Symbol()), "isPrimitive(Symbol()) is primitive");
	t.false(isPrimitive([1, 2, 3]), "isPrimitive([1, 2, 3]) is not primitive");
  t.false(isPrimitive({ a: 123 }), "isPrimitive({ a: 123 }) is not primitive");
  
  let start = new Date().getTime();
  isPrimitive({ a: 123 });
  let end = new Date().getTime();  
  t.true((end - start) < 2000, 'isPrimitive({ a: 123 }) takes less than 2s to run');
	t.end();
});