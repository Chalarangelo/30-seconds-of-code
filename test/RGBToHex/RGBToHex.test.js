const expect = require('expect');
const RGBToHex = require('./RGBToHex.js');


  test('RGBToHex is a Function', () => {
  expect(RGBToHex).toBeInstanceOf(Function);
});
  t.equal(RGBToHex(255, 165, 1), 'ffa501', "Converts the values of RGB components to a color code.");
  
