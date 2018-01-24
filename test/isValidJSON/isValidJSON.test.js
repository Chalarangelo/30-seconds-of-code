const test = require('tape');
const isValidJSON = require('./isValidJSON.js');

test('Testing isValidJSON', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isValidJSON === 'function', 'isValidJSON is a Function');
  t.equal(isValidJSON('{"name":"Adam","age":20}'), true, '{"name":"Adam","age":20} is a valid JSON');
  t.equal(isValidJSON('{"name":"Adam",age:"20"}'), false, '{"name":"Adam",age:"20"} is not a valid JSON');
  t.equal(isValidJSON(null), true, 'null is a valid JSON');
  //t.deepEqual(isValidJSON(args..), 'Expected');
  //t.equal(isValidJSON(args..), 'Expected');
  //t.false(isValidJSON(args..), 'Expected');
  //t.throws(isValidJSON(args..), 'Expected');
  t.end();
});