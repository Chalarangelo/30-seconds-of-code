const expect = require('expect');
const forEachRight = require('./forEachRight.js');

test('Testing forEachRight', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof forEachRight === 'function').toBeTruthy();
  let output = '';
  forEachRight([1, 2, 3, 4], val => output+=val);
  expect(output).toBe('4321');
});
