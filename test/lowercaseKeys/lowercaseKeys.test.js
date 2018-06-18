const expect = require('expect');
const lowercaseKeys = require('./lowercaseKeys.js');


  test('lowercaseKeys is a Function', () => {
  expect(lowercaseKeys).toBeInstanceOf(Function);
});
  const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
  const myObjLower = lowercaseKeys(myObj);
  t.deepEqual(myObjLower, {name: 'Adam', surname: 'Smith'}, 'Lowercases object keys');
  t.deepEqual(myObj, { Name: 'Adam', sUrnAME: 'Smith' }, 'Does not mutate original object');
  

