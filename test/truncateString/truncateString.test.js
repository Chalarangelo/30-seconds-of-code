const expect = require('expect');
const truncateString = require('./truncateString.js');


  test('truncateString is a Function', () => {
  expect(truncateString).toBeInstanceOf(Function);
});
  t.equal(truncateString('boomerang', 7), 'boom...', 'Truncates a "boomerang" up to a specified length.');
  
