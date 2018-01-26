const test = require('tape');
const serializeCookie = require('./serializeCookie.js');

test('Testing serializeCookie', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof serializeCookie === 'function', 'serializeCookie is a Function');
  //t.deepEqual(serializeCookie(args..), 'Expected');
  //t.equal(serializeCookie(args..), 'Expected');
  //t.false(serializeCookie(args..), 'Expected');
  //t.throws(serializeCookie(args..), 'Expected');
  t.end();
});