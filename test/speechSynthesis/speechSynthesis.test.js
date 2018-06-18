const expect = require('expect');
const speechSynthesis = require('./speechSynthesis.js');


  test('speechSynthesis is a Function', () => {
  expect(speechSynthesis).toBeInstanceOf(Function);
});
  
