const expect = require('expect');
const uncurry = require('./uncurry.js');


  test('uncurry is a Function', () => {
  expect(uncurry).toBeInstanceOf(Function);
});
  const add = x => y => z => x + y + z;
  const add1 = uncurry(add);
  const add2 = uncurry(add, 2);
  const add3 = uncurry(add, 3);
  t.equal(add1(1)(2)(3), 6, 'Works without a provided value for n');
  t.equal(add2(1,2)(3), 6, 'Works without n = 2');
  t.equal(add3(1,2,3), 6, 'Works withoutn = 3');
  

