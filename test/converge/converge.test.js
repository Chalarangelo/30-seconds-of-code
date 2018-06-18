const expect = require('expect');
const converge = require('./converge.js');


  test('converge is a Function', () => {
  expect(converge).toBeInstanceOf(Function);
});
  const average = converge((a, b) => a / b, [
    arr => arr.reduce((a, v) => a + v, 0),
    arr => arr.length,
  ]);
  t.equal(average([1, 2, 3, 4, 5, 6, 7]), 4, 'Produces the average of the array');
  const strangeConcat = converge((a, b) => a + b, [
    x => x.toUpperCase(),
    x => x.toLowerCase()]
  );
  t.equal(strangeConcat('Yodel'), "YODELyodel", 'Produces the strange concatenation');
  

