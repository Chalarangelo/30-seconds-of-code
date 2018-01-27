const test = require('tape');
const isAbsoluteURL = require('./isAbsoluteURL.js');

test('Testing isAbsoluteURL', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isAbsoluteURL === 'function', 'isAbsoluteURL is a Function');
  t.equal(isAbsoluteURL('https://google.com'), true, "Given string is an absolute URL");
  t.equal(isAbsoluteURL('ftp://www.myserver.net'), true, "Given string is an absolute URL");
  t.equal(isAbsoluteURL('/foo/bar'), false, "Given string is not an absolute URL");
  //t.deepEqual(isAbsoluteURL(args..), 'Expected');
  //t.equal(isAbsoluteURL(args..), 'Expected');
  //t.false(isAbsoluteURL(args..), 'Expected');
  //t.throws(isAbsoluteURL(args..), 'Expected');
  t.end();
});