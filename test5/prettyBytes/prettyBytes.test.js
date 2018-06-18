const expect = require('expect');
const prettyBytes = require('./prettyBytes.js');

test('Testing prettyBytes', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof prettyBytes === 'function').toBeTruthy();
  expect(prettyBytes(1000)).toBe('1 KB');
  expect(prettyBytes(-27145424323.5821, 5)).toBe('-27.145 GB');
  expect(prettyBytes(123456789, 3, false)).toBe('123MB');
});