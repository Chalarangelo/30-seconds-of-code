const expect = require('expect');
const tomorrow = require('./tomorrow.js');


  test('tomorrow is a Function', () => {
  expect(tomorrow).toBeInstanceOf(Function);
});
  const t1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  const t2 = new Date(tomorrow());
  t.equal(t1.getFullYear(), t2.getFullYear(), 'Returns the correct year');
  t.equal(t1.getMonth(), t2.getMonth(), 'Returns the correct month');
  t.equal(t1.getDate(), t2.getDate(), 'Returns the correct date');
  

