const expect = require('expect');
const renameKeys = require('./renameKeys.js');

test('renameKeys is a Function', () => {
  expect(renameKeys).toBeInstanceOf(Function);
});
const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
const renamedObj = renameKeys({ name: 'firstName', job: 'passion' }, obj);
test('renameKeys is a Function', () => {
  expect(renamedObj).toEqual({ firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 });
});
