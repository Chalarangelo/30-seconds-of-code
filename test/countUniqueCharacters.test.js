const { countUniqueCharacters } = require("./_30s.js");

test("countUniqueCharacters is a Function", () => {
  expect(countUniqueCharacters).toBeInstanceOf(Function);
});
test("'thisisawesome' has total 9 unique characters", () => {
  expect(countUniqueCharacters("thisisawesome")).toEqual(9);
});
test("'Hhello World!' has total 8 unique characters", () => {
  expect(countUniqueCharacters("Hhello World!")).toEqual(8);
});
test("'thequickbrownfoxjumpsoverthelazydog' has total 26 unique characters", () => {
  expect(countUniqueCharacters("thequickbrownfoxjumpsoverthelazydog")).toEqual(
    26
  );
});
test("'HHHLLL' has total 2 unique characters", () => {
 expect(countUniqueCharacters("HHHLLL")).toEqual(2);
});
test("'1,2,3,4,5,6' returns null", () => {
  expect(countUniqueCharacters(1, 2, 3, 4, 5, 6)).toBeNull()
});
