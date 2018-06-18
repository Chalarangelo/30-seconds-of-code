const expect = require('expect');
const UUIDGeneratorNode = require('./UUIDGeneratorNode.js');

test('UUIDGeneratorNode is a Function', () => {
  expect(UUIDGeneratorNode).toBeInstanceOf(Function);
});
const uuid = UUIDGeneratorNode();
test('Contains dashes in the proper places', () => {
  expect([uuid[8], uuid[13], uuid[18], uuid[23]]).toEqual(['-', '-', '-', '-']);
});
test('Only contains hexadecimal digits', () => {
  expect(/^[0-9A-Fa-f-]+$/.test(uuid)).toBeTruthy();
});
