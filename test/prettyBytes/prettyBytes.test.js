const test = require('tape');
const prettyBytes = require('./prettyBytes.js');

test('Testing prettyBytes', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof prettyBytes === 'function', 'prettyBytes is a Function');
  t.equal(prettyBytes(1000), '1 KB', "Converts a number in bytes to a human-readable string.");
  t.equal(prettyBytes(-27145424323.5821, 5), '-27.145 GB', "Converts a number in bytes to a human-readable string.");
  t.equal(prettyBytes(123456789, 3, false), '123MB', "Converts a number in bytes to a human-readable string.");

  //t.deepEqual(prettyBytes(args..), 'Expected');
  //t.equal(prettyBytes(args..), 'Expected');
  //t.false(prettyBytes(args..), 'Expected');
  //t.throws(prettyBytes(args..), 'Expected');
  t.end();
});