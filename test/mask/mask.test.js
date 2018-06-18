const expect = require('expect');
const mask = require('./mask.js');


  test('mask is a Function', () => {
  expect(mask).toBeInstanceOf(Function);
});
  t.equal(mask(1234567890), '******7890', "Replaces all but the last num of characters with the specified mask character");
  t.equal(mask(1234567890, 3), '*******890', "Replaces all but the last num of characters with the specified mask character");
  t.equal(mask(1234567890, -4, '$'), '$$$$567890', "Replaces all but the last num of characters with the specified mask character");
  
