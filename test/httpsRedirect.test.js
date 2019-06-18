const {httpsRedirect} = require('./_30s.js');

test('httpsRedirect is a Function', () => {
  expect(httpsRedirect).toBeInstanceOf(Function);
});
