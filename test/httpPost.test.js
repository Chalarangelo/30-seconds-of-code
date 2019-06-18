const {httpPost} = require('./_30s.js');

test('httpPost is a Function', () => {
  expect(httpPost).toBeInstanceOf(Function);
});
test('httpPost does not throw errors', () => {
  expect(() => {
    httpPost('http://localhost', x => x, console.log);
    httpPost('http://localhost', x => x);
  }).not.toThrow(TypeError);
});
