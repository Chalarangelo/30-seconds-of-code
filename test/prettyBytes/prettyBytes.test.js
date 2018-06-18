const expect = require('expect');
const prettyBytes = require('./prettyBytes.js');


  test('prettyBytes is a Function', () => {
  expect(prettyBytes).toBeInstanceOf(Function);
});
  t.equal(prettyBytes(1000), '1 KB', "Converts a number in bytes to a human-readable string.");
  t.equal(prettyBytes(-27145424323.5821, 5), '-27.145 GB', "Converts a number in bytes to a human-readable string.");
  t.equal(prettyBytes(123456789, 3, false), '123MB', "Converts a number in bytes to a human-readable string.");
  
