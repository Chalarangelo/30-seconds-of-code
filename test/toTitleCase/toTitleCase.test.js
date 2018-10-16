const expect = require('expect');
const toTitleCase = require('./toTitleCase.js');

test('toTitleCase is a Function', () => {
  expect(toTitleCase).toBeInstanceOf(Function);
});
test("toTitleCase('john smith') returns John Smith", () => {
  expect(toTitleCase('john smith')).toBe('John Smith');
});
test("toTitleCase('singlesuperlongword') returns Singlesuperlongword", () => {
  expect(toTitleCase('singlesuperlongword')).toBe('Singlesuperlongword');
});
test("toTitleCase('very short words used a b c) returns Very Short Words Used A B C", () => {
  expect(toTitleCase('very short words used a b c')).toBe(
    'Very Short Words Used A B C'
  );
});
test("toTitleCase('this is a long sentance that will get transformed wow') returns This Is A Long Sentance That Will Get Transformed Wow", () => {
  expect(
    toTitleCase('this is a long sentance that will get transformed wow')
  ).toBe(
    'This Is A Long Sentance That Will Get Transformed Wow'
  );
});
test('toTitleCase() returns undefined', () => {
  expect(toTitleCase()).toBe(undefined);
});
test('toTitleCase([]) throws an error', () => {
  expect(() => {
    toTitleCase([]);
  }).toThrow();
});
test('toTitleCase({}) throws an error', () => {
  expect(() => {
    toTitleCase({});
  }).toThrow();
});
test('toTitleCase(123) throws an error', () => {
  expect(() => {
    toTitleCase(123);
  }).toThrow();
});
