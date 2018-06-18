const expect = require('expect');
const get = require('./get.js');


  test('get is a Function', () => {
  expect(get).toBeInstanceOf(Function);
});
  const obj = { selector: { to: { val: 'val to get' } } };
  t.deepEqual(get(obj, 'selector.to.val'), ['val to get'], "Retrieve a property indicated by the selector from an object.");
  

