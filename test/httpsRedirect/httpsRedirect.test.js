const expect = require('expect');
const httpsRedirect = require('./httpsRedirect.js');

test('httpsRedirect is a Function', () => {
  expect(httpsRedirect).toBeInstanceOf(Function);
});
