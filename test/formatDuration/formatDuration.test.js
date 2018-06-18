const expect = require('expect');
const formatDuration = require('./formatDuration.js');


  test('formatDuration is a Function', () => {
  expect(formatDuration).toBeInstanceOf(Function);
});
  t.equal(formatDuration(1001), '1 second, 1 millisecond', "Returns the human readable format of the given number of milliseconds");
  t.equal(formatDuration(34325055574), '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds', "Returns the human readable format of the given number of milliseconds");
  
