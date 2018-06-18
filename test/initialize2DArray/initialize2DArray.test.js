const expect = require('expect');
const initialize2DArray = require('./initialize2DArray.js');


  test('initialize2DArray is a Function', () => {
  expect(initialize2DArray).toBeInstanceOf(Function);
});
  t.deepEqual(initialize2DArray(2, 2, 0), [[0,0], [0,0]], "Initializes a 2D array of given width and height and value");
  
