const expect = require('expect');
const range = require('./range.js');

test('range is a Function', () => {
  expect(range).toBeInstanceOf(Function);
});

range(10); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
range(5, 10); // [ 5, 6, 7, 8, 9 ]
range(1, 10, 2); // [ 1, 3, 5, 7, 9 ]
range(10, 0, -1) // [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
range(1, 5, 0.5); // [ 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5 ]

test('range(stop)', () => {
  expect(range(10)).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
});

test('range(start, stop)', () => {
  expect(range(5, 10)).toEqual([ 5, 6, 7, 8, 9 ]);
});

test('range(start, stop, positive step)', () => {
  expect(range(1, 10, 2)).toEqual([ 1, 3, 5, 7, 9 ]);
});

test('range(start, stop, negative step)', () => {
  expect(range(10, 0, -1)).toEqual([ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]);
});

test('range(start, stop, fractional step)', () => {
  expect(range(1, 5, 0.5)).toEqual([ 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5 ]);
});
