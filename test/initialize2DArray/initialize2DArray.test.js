const test = require('tape');
const initialize2DArray = require('./initialize2DArray.js');

test('Testing initialize2DArray', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof initialize2DArray === 'function', 'initialize2DArray is a Function');
  t.deepEqual(initialize2DArray(2, 2, 0), [[0,0], [0,0]], "Initializes a 2D array of given width and height and value");
  //t.deepEqual(initialize2DArray(args..), 'Expected');
  //t.equal(initialize2DArray(args..), 'Expected');
  //t.false(initialize2DArray(args..), 'Expected');
  //t.throws(initialize2DArray(args..), 'Expected');
  t.end();
});