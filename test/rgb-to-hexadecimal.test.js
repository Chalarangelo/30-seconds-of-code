const test = require('tape');
const rgbToHex = require('../snippets/rgb-to-hexadecimal/rgb-to-hexadecimal');

test('rgbToHex', (t) => {
  
  t.equal( rgbToHex(255, 165, 1), 'ffa501', 'Should Return True | rgbToHex(255, 165, 1) -> ffa501' );
  t.equal( rgbToHex(155, 212, 23), '9bd417', 'Should Return True | rgbToHex(255, 165, 1) -> 9bd417' );
  
  t.end();
});