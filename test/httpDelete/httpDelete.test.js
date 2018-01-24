const test = require('tape');
const httpDelete = require('./httpDelete.js');

test('Testing httpDelete', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof httpDelete === 'function', 'httpDelete is a Function');
  //t.deepEqual(httpDelete(args..), 'Expected');
  //t.equal(httpDelete(args..), 'Expected');
  //t.false(httpDelete(args..), 'Expected');
  //t.throws(httpDelete(args..), 'Expected');
  t.end();
});