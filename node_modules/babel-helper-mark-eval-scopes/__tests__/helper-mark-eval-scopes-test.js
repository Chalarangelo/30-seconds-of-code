jest.autoMockOff();

const babel = require("babel-core");
const helper = require("../src");

function getPath(source) {
  let path;

  babel.transform(source, {
    babelrc: false,
    plugins: [
      function({ traverse }) {
        (traverse.clearCache || traverse.cache.clear)();
        return {
          visitor: {
            Program(programPath) {
              path = programPath;
            }
          }
        };
      }
    ]
  });

  return path;
}

describe("babel-helper-mark-eval-scopes", () => {
  it("getEvalScopes - should give a set of scopes which contains eval", () => {
    const source = `
      function foo() {
        function bar() {
          eval(";");
        }
        function baz() {
          noeval();
        }
      }
    `;

    const program = getPath(source);
    const evalScopes = [...helper.getEvalScopes(program)];

    expect(evalScopes).toContain(program.scope);
    expect(evalScopes).toContain(program.get("body.0.body.body.0").scope);
    expect(evalScopes).not.toContain(program.get("body.0.body.body.1").scope);
  });
});
