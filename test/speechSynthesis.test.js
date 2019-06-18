const {speechSynthesis} = require('./_30s.js');

test('speechSynthesis is a Function', () => {
  expect(speechSynthesis).toBeInstanceOf(Function);
});
