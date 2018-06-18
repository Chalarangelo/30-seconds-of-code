const expect = require('expect');
const formatDuration = require('./formatDuration.js');

test('Testing formatDuration', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof formatDuration === 'function').toBeTruthy();
  expect(formatDuration(1001)).toBe('1 second, 1 millisecond');
  expect(formatDuration(34325055574)).toBe('397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds');
});