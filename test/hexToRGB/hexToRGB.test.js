const test = require('tape');
const hexToRGB = require('./hexToRGB.js');

test('Testing hexToRGB', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof hexToRGB === 'function', 'hexToRGB is a Function');
  t.equal(hexToRGB('#27ae60ff'), 'rgba(39, 174, 96, 255)', "Converts a color code to a rgb() or rgba() string");
  t.equal(hexToRGB('27ae60'), 'rgb(39, 174, 96)', "Converts a color code to a rgb() or rgba() string");
  t.equal(hexToRGB('#fff'), 'rgb(255, 255, 255)', "Converts a color code to a rgb() or rgba() string");
  //t.deepEqual(hexToRGB(args..), 'Expected');
  //t.equal(hexToRGB(args..), 'Expected');
  //t.false(hexToRGB(args..), 'Expected');
  //t.throws(hexToRGB(args..), 'Expected');
  t.end();
});