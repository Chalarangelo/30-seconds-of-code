const expect = require("expect");
const dropProperties = require("./dropProperties.js");

test("drop is a Function", () => {
  expect(dropProperties).toBeInstanceOf(Function);
});

test("removes one property", () => {
  expect(
    dropProperties(
      [
        { id: 1, name: "jon", gender: "male" },
        { id: 2, name: "jane", gender: "female" }
      ],
      "gender"
    )[0].hasOwnProperty("gender")
  ).toBeFalsy();
});
test("removes multiple properties", () => {
  expect(
    Object.keys(
      dropProperties(
        [
          { id: 1, name: "jon", gender: "male", age: 19 },
          { id: 2, name: "jane", gender: "female", age: 24 }
        ],
        "gender",
        "age"
      )[0]
    ).length
  ).toEqual(2);
});
