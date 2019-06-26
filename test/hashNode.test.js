const {hashNode} = require('./_30s.js');

test('hashNode is a Function', () => {
  expect(hashNode).toBeInstanceOf(Function);
});
test("Produces the appropriate hash", () => {
  expect(
    hashNode(JSON.stringify({ a: "a", b: [1, 2, 3, 4], foo: { c: "bar" } }))
  ).resolves.toBe(
    "04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393"
  );
});
