const expect = require('expect');
const truthCheckCollection = require('./truthCheckCollection.js');


  test('truthCheckCollection is a Function', () => {
  expect(truthCheckCollection).toBeInstanceOf(Function);
});
  t.equal(truthCheckCollection([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex'), true, "second argument is truthy on all elements of a collection");
  
