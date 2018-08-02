const expect = require('expect');
const uniqueElementsBy = require('./uniqueElementsBy.js');

test('uniqueElementsBy is a Function', () => {
  expect(uniqueElementsBy).toBeInstanceOf(Function);
});

test('uniqueElementsBy works for properties', () => {
  expect(uniqueElementsBy(
  	[
  		{ id: 0, value: 'a' },
  		{ id: 1, value: 'b' },
  		{ id: 2, value: 'c' },
  		{ id: 1, value: 'd' },
  		{ id: 0, value: 'e' },
  	],
  	(a, b) => a.id === b.id
  )).toEqual([ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]);
});

test('uniqueElementsBy works for nested properties', () => {
  expect(uniqueElementsBy(
  	[
  		{ id: 0, value: 'a', n: {p: 0} },
  		{ id: 1, value: 'b', n: {p: 1} },
  		{ id: 2, value: 'c', n: {p: 2} },
  		{ id: 1, value: 'd', n: {p: 0} },
  		{ id: 0, value: 'e', n: {p: 1} },
  	],
  	(a, b) => a.id === b.id
  )).toEqual([ { id: 0, value: 'a', n: {p: 0} }, { id: 1, value: 'b', n: {p: 1} }, { id: 2, value: 'c', n: {p: 2} } ]);
});
