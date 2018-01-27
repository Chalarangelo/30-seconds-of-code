const test = require('tape');
const mapObject = require('./mapObject.js');

test('Testing mapObject', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof mapObject === 'function', 'mapObject is a Function');
  const squareIt = arr => mapObject(arr, a => a * a);
  t.deepEqual(squareIt([1, 2, 3]), { 1: 1, 2: 4, 3: 9 }, "Maps the values of an array to an object using a function");
  //t.deepEqual(mapObject(args..), 'Expected');
  //t.equal(mapObject(args..), 'Expected');
  //t.false(mapObject(args..), 'Expected');
  //t.throws(mapObject(args..), 'Expected');
  t.end();
});