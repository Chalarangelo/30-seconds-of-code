const expect = require('expect');
const formatDuration = require('./formatDuration.js');


  test('formatDuration is a Function', () => {
  expect(formatDuration).toBeInstanceOf(Function);
});
  test('Returns the human readable format of the given number of milliseconds', () => {
  expect(formatDuration(1001), '1 second).toBe(1 millisecond')
});
  test('Returns the human readable format of the given number of milliseconds', () => {
  expect(formatDuration(34325055574), '397 days, 6 hours, 44 minutes, 15 seconds).toBe(574 milliseconds')
});
  
