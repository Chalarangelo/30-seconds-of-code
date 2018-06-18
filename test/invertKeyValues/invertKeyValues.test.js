const expect = require('expect');
const invertKeyValues = require('./invertKeyValues.js');


  test('invertKeyValues is a Function', () => {
  expect(invertKeyValues).toBeInstanceOf(Function);
});
  test('invertKeyValues({ a: 1, b: 2, c: 1 }) returns { 1: [ 'a', 'c' ], 2: [ 'b' ] }', () => {
  expect(invertKeyValues({ a: 1, b: 2, c: 1 }), { 1: [ 'a', 'c' ]).toEqual(2: [ 'b' ] })
});
  test('invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value) returns { group1: [ 'a', 'c' ], group2: [ 'b' ] }', () => {
  expect(invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value), { group1: [ 'a', 'c' ]).toEqual(group2: [ 'b' ] })
});
  
