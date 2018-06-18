const expect = require('expect');
const recordAnimationFrames = require('./recordAnimationFrames.js');


  test('recordAnimationFrames is a Function', () => {
  expect(recordAnimationFrames).toBeInstanceOf(Function);
});
  
