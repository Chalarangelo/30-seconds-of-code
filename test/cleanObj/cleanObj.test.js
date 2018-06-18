const expect = require('expect');
const cleanObj = require('./cleanObj.js');


  test('cleanObj is a Function', () => {
  expect(cleanObj).toBeInstanceOf(Function);
});
  const testObj = { a: 1, b: 2, children: { a: 1, b: 2 } };
  t.deepEqual(cleanObj(testObj, ['a'], 'children'), { a: 1, children : { a: 1}}, "Removes any properties except the ones specified from a JSON object");
  
