const test = require('tape');
const httpGet = require('./httpGet.js');

test('Testing httpGet', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof httpGet === 'function', 'httpGet is a Function');
  //t.deepEqual(httpGet(args..), 'Expected');
  //t.equal(httpGet(args..), 'Expected');
  //t.false(httpGet(args..), 'Expected');
  //t.throws(httpGet(args..), 'Expected');
  t.end();
});