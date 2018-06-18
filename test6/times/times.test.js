const expect = require('expect');
const times = require('./times.js');

test('Testing times', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof times === 'function').toBeTruthy();
  var output = '';
  times(5, i => (output += i));
  expect(output).toBe('01234');
});
