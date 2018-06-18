const expect = require('expect');
const recordAnimationFrames = require('./recordAnimationFrames.js');

test('Testing recordAnimationFrames', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof recordAnimationFrames === 'function').toBeTruthy();
});