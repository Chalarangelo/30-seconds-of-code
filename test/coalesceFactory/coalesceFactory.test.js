const expect = require('expect');
const coalesceFactory = require('./coalesceFactory.js');


  test('coalesceFactory is a Function', () => {
  expect(coalesceFactory).toBeInstanceOf(Function);
});
  const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
  t.deepEqual(customCoalesce(undefined, null, NaN, '', 'Waldo'), 'Waldo', "Returns a customized coalesce function");
  
