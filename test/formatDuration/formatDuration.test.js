const test = require('tape');
const formatDuration = require('./formatDuration.js');

test('Testing formatDuration', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof formatDuration === 'function', 'formatDuration is a Function');
  t.equal(formatDuration(1001), '1 second, 1 millisecond', "Returns the human readable format of the given number of milliseconds");
  t.equal(formatDuration(34325055574), '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds', "Returns the human readable format of the given number of milliseconds");
  //t.deepEqual(formatDuration(args..), 'Expected');
  //t.equal(formatDuration(args..), 'Expected');
  //t.false(formatDuration(args..), 'Expected');
  //t.throws(formatDuration(args..), 'Expected');
  t.end();
});