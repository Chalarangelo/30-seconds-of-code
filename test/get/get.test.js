const expect = require('expect');
const get = require('./get.js');

test('get is a Function', () => {
  expect(get).toBeInstanceOf(Function);
});
const obj = { selector: { to: { val: 'val to get' } } };
test('Retrieve a property indicated by the selector from an object.', () => {
  expect(get(obj, 'selector.to.val')).toEqual(['val to get'])
});
