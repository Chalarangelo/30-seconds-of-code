const test = require('tape');
const mapObject = require('./mapObject.js');

test('Testing mapObject', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof mapObject === 'function', 'mapObject is a Function');
  t.deepEqual(mapObject([1, 2, 3], a => a * a), { 1: 1, 2: 4, 3: 9 }, "mapObject([1, 2, 3], a => a * a) returns { 1: 1, 2: 4, 3: 9 }");
  t.deepEqual(mapObject([1, 2, 3, 4], (a, b) => b - a), { 1: -1, 2: -1, 3: -1, 4: -1 }, 'mapObject([1, 2, 3, 4], (a, b) => b - a) returns { 1: -1, 2: -1, 3: -1, 4: -1 }');
  t.deepEqual(mapObject([1, 2, 3, 4], (a, b) => a - b), { 1: 1, 2: 1, 3: 1, 4: 1 }, 'mapObject([1, 2, 3, 4], (a, b) => a - b) returns { 1: 1, 2: 1, 3: 1, 4: 1 }');

  //t.equal(mapObject(args..), 'Expected');
  //t.false(mapObject(args..), 'Expected');
  //t.throws(mapObject(args..), 'Expected');
  t.end();
});
