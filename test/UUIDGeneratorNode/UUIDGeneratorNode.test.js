const expect = require('expect');
const UUIDGeneratorNode = require('./UUIDGeneratorNode.js');


  test('UUIDGeneratorNode is a Function', () => {
  expect(UUIDGeneratorNode).toBeInstanceOf(Function);
});
  const uuid = UUIDGeneratorNode();
  t.deepEqual([uuid[8], uuid[13], uuid[18], uuid[23]], ['-', '-', '-', '-'], 'Contains dashes in the proper places');
  test('Only contains hexadecimal digits', () => {
  expect(/^[0-9A-Fa-f-]+$/.test(uuid)).toBeTruthy();
});
  

