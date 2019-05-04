const expect = require('expect');
const {coalesceFactory} = require('./_30s.js');

test('coalesceFactory is a Function', () => {
  expect(coalesceFactory).toBeInstanceOf(Function);
});
const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
test('Returns a customized coalesce function', () => {
  expect(customCoalesce(undefined, null, NaN, '', 'Waldo')).toEqual('Waldo');
});
