const test = require('tape');
const httpPut = require('./httpPut.js');

test('Testing httpPut', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof httpPut === 'function', 'httpPut is a Function');
  //t.deepEqual(httpPut(args..), 'Expected');
  //t.equal(httpPut(args..), 'Expected');
  //t.false(httpPut(args..), 'Expected');
  //t.throws(httpPut(args..), 'Expected');
  t.end();
});