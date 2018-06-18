const expect = require('expect');
const renameKeys = require('./renameKeys.js');

test('Testing renameKeys', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof renameKeys === 'function').toBeTruthy();

  const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
  const renamedObj = renameKeys({ name: 'firstName', job: 'passion' }, obj);

  expect(renamedObj).toEqual({ firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 });
});
