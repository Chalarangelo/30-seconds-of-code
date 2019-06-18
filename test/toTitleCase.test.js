const {toTitleCase} = require('./_30s.js');

test('toTitleCase is a Function', () => {
  expect(toTitleCase).toBeInstanceOf(Function);
});
test("toTitleCase('some_database_field_name') returns Some Database Field Name", () => {
  expect(toTitleCase('some_database_field_name')).toBe('Some Database Field Name');
});
test("toTitleCase('Some label that needs to be titled') returns Some Label That Needs To Be Titled", () => {
  expect(toTitleCase('Some label that needs to be titled')).toBe(
    'Some Label That Needs To Be Titled'
  );
});
test("toTitleCase('some-javaScript-property') return Some Java Script Property", () => {
  expect(toTitleCase('some-javaScript-property')).toBe('Some Java Script Property');
});
test("toTitleCase('some-mixed_string with spaces_underscores-and-hyphens') returns Some Mixed String With Spaces Underscores And Hyphens", () => {
  expect(toTitleCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe(
    'Some Mixed String With Spaces Underscores And Hyphens'
  );
});
test('toTitleCase() throws a error', () => {
  expect(() => {
    toTitleCase();
  }).toThrow();
});
test('toTitleCase([]) throws a error', () => {
  expect(() => {
    toCamelCase([]);
  }).toThrow();
});
test('toCamelCase({}) throws a error', () => {
  expect(() => {
    toTitleCase({});
  }).toThrow();
});
test('toTitleCase(123) throws a error', () => {
  expect(() => {
    toTitleCase(123);
  }).toThrow();
});
let start = new Date().getTime();
toTitleCase('some-mixed_string with spaces_underscores-and-hyphens');
let end = new Date().getTime();
test('toTitleCase(some-mixed_string with spaces_underscores-and-hyphens) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
