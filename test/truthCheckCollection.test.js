const expect = require('expect');
const {truthCheckCollection} = require('./_30s.js');

test('truthCheckCollection is a Function', () => {
  expect(truthCheckCollection).toBeInstanceOf(Function);
});
test('second argument is truthy on all elements of a collection', () => {
  expect(
    truthCheckCollection(
      [{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }],
      'sex'
    )
  ).toBeTruthy();
});
