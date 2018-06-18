const expect = require('expect');
const chunk = require('./chunk.js');


  test('chunk is a Function', () => {
  expect(chunk).toBeInstanceOf(Function);
});
  t.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1,2],[3,4],[5]], "chunk([1, 2, 3, 4, 5], 2) returns [[1,2],[3,4],[5]] ");
  test('chunk([]) returns []', () => {
  expect(chunk([]), []).toEqual()
});
  test('chunk(123) returns []', () => {
  expect(chunk(123), []).toEqual()
});
  test('chunk({ a: 123}) returns []', () => {
  expect(chunk({ a: 123}), []).toEqual()
});
  test('chunk(string, 2) returns [ st, ri, ng ]', () => {
  expect(chunk('string', 2), [ 'st', 'ri', 'ng' ]).toEqual()
});
  t.throws(() => chunk(), 'chunk() throws an error');
  t.throws(() => chunk(undefined), 'chunk(undefined) throws an error');
  t.throws(() => chunk(null), 'chunk(null) throws an error');

  let start = new Date().getTime();
  chunk('This is a string', 2);
  let end = new Date().getTime();
  test('chunk(This is a string, 2) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
  

