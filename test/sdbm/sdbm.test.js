const expect = require('expect');
const sdbm = require('./sdbm.js');


  test('sdbm is a Function', () => {
  expect(sdbm).toBeInstanceOf(Function);
});
  t.equal(sdbm('name'), -3521204949, "Hashes the input string into a whole number.");
  
