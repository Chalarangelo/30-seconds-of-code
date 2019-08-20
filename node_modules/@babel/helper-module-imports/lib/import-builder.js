"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
    return data;
  };

  return data;
}

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImportBuilder {
  constructor(importedSource, scope, hub) {
    this._statements = [];
    this._resultName = null;
    this._scope = null;
    this._hub = null;
    this._scope = scope;
    this._hub = hub;
    this._importedSource = importedSource;
  }

  done() {
    return {
      statements: this._statements,
      resultName: this._resultName
    };
  }

  import() {
    this._statements.push(t().importDeclaration([], t().stringLiteral(this._importedSource)));

    return this;
  }

  require() {
    this._statements.push(t().expressionStatement(t().callExpression(t().identifier("require"), [t().stringLiteral(this._importedSource)])));

    return this;
  }

  namespace(name = "namespace") {
    name = this._scope.generateUidIdentifier(name);
    const statement = this._statements[this._statements.length - 1];
    (0, _assert().default)(statement.type === "ImportDeclaration");
    (0, _assert().default)(statement.specifiers.length === 0);
    statement.specifiers = [t().importNamespaceSpecifier(name)];
    this._resultName = t().cloneNode(name);
    return this;
  }

  default(name) {
    name = this._scope.generateUidIdentifier(name);
    const statement = this._statements[this._statements.length - 1];
    (0, _assert().default)(statement.type === "ImportDeclaration");
    (0, _assert().default)(statement.specifiers.length === 0);
    statement.specifiers = [t().importDefaultSpecifier(name)];
    this._resultName = t().cloneNode(name);
    return this;
  }

  named(name, importName) {
    if (importName === "default") return this.default(name);
    name = this._scope.generateUidIdentifier(name);
    const statement = this._statements[this._statements.length - 1];
    (0, _assert().default)(statement.type === "ImportDeclaration");
    (0, _assert().default)(statement.specifiers.length === 0);
    statement.specifiers = [t().importSpecifier(name, t().identifier(importName))];
    this._resultName = t().cloneNode(name);
    return this;
  }

  var(name) {
    name = this._scope.generateUidIdentifier(name);
    let statement = this._statements[this._statements.length - 1];

    if (statement.type !== "ExpressionStatement") {
      (0, _assert().default)(this._resultName);
      statement = t().expressionStatement(this._resultName);

      this._statements.push(statement);
    }

    this._statements[this._statements.length - 1] = t().variableDeclaration("var", [t().variableDeclarator(name, statement.expression)]);
    this._resultName = t().cloneNode(name);
    return this;
  }

  defaultInterop() {
    return this._interop(this._hub.addHelper("interopRequireDefault"));
  }

  wildcardInterop() {
    return this._interop(this._hub.addHelper("interopRequireWildcard"));
  }

  _interop(callee) {
    const statement = this._statements[this._statements.length - 1];

    if (statement.type === "ExpressionStatement") {
      statement.expression = t().callExpression(callee, [statement.expression]);
    } else if (statement.type === "VariableDeclaration") {
      (0, _assert().default)(statement.declarations.length === 1);
      statement.declarations[0].init = t().callExpression(callee, [statement.declarations[0].init]);
    } else {
      _assert().default.fail("Unexpected type.");
    }

    return this;
  }

  prop(name) {
    const statement = this._statements[this._statements.length - 1];

    if (statement.type === "ExpressionStatement") {
      statement.expression = t().memberExpression(statement.expression, t().identifier(name));
    } else if (statement.type === "VariableDeclaration") {
      (0, _assert().default)(statement.declarations.length === 1);
      statement.declarations[0].init = t().memberExpression(statement.declarations[0].init, t().identifier(name));
    } else {
      _assert().default.fail("Unexpected type:" + statement.type);
    }

    return this;
  }

  read(name) {
    this._resultName = t().memberExpression(this._resultName, t().identifier(name));
  }

}

exports.default = ImportBuilder;