const expect = require('expect');
const {recordAnimationFrames} = require('./_30s.js');

test('recordAnimationFrames is a Function', () => {
  expect(recordAnimationFrames).toBeInstanceOf(Function);
});
