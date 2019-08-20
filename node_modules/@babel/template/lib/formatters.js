"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.program = exports.expression = exports.statement = exports.statements = exports.smart = void 0;

function makeStatementFormatter(fn) {
  return {
    code: str => `/* @babel/template */;\n${str}`,
    validate: () => {},
    unwrap: ast => {
      return fn(ast.program.body.slice(1));
    }
  };
}

const smart = makeStatementFormatter(body => {
  if (body.length > 1) {
    return body;
  } else {
    return body[0];
  }
});
exports.smart = smart;
const statements = makeStatementFormatter(body => body);
exports.statements = statements;
const statement = makeStatementFormatter(body => {
  if (body.length === 0) {
    throw new Error("Found nothing to return.");
  }

  if (body.length > 1) {
    throw new Error("Found multiple statements but wanted one");
  }

  return body[0];
});
exports.statement = statement;
const expression = {
  code: str => `(\n${str}\n)`,
  validate: ({
    program
  }) => {
    if (program.body.length > 1) {
      throw new Error("Found multiple statements but wanted one");
    }

    const expression = program.body[0].expression;

    if (expression.start === 0) {
      throw new Error("Parse result included parens.");
    }
  },
  unwrap: ast => ast.program.body[0].expression
};
exports.expression = expression;
const program = {
  code: str => str,
  validate: () => {},
  unwrap: ast => ast.program
};
exports.program = program;