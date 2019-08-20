"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VariableDeclarator = VariableDeclarator;
exports.TypeCastExpression = TypeCastExpression;
exports.NewExpression = NewExpression;
exports.TemplateLiteral = TemplateLiteral;
exports.UnaryExpression = UnaryExpression;
exports.BinaryExpression = BinaryExpression;
exports.LogicalExpression = LogicalExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.SequenceExpression = SequenceExpression;
exports.ParenthesizedExpression = ParenthesizedExpression;
exports.AssignmentExpression = AssignmentExpression;
exports.UpdateExpression = UpdateExpression;
exports.StringLiteral = StringLiteral;
exports.NumericLiteral = NumericLiteral;
exports.BooleanLiteral = BooleanLiteral;
exports.NullLiteral = NullLiteral;
exports.RegExpLiteral = RegExpLiteral;
exports.ObjectExpression = ObjectExpression;
exports.ArrayExpression = ArrayExpression;
exports.RestElement = RestElement;
exports.ClassDeclaration = exports.ClassExpression = exports.FunctionDeclaration = exports.ArrowFunctionExpression = exports.FunctionExpression = Func;
exports.CallExpression = CallExpression;
exports.TaggedTemplateExpression = TaggedTemplateExpression;
Object.defineProperty(exports, "Identifier", {
  enumerable: true,
  get: function () {
    return _infererReference.default;
  }
});

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

var _infererReference = _interopRequireDefault(require("./inferer-reference"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function VariableDeclarator() {
  const id = this.get("id");
  if (!id.isIdentifier()) return;
  const init = this.get("init");
  let type = init.getTypeAnnotation();

  if (type && type.type === "AnyTypeAnnotation") {
    if (init.isCallExpression() && init.get("callee").isIdentifier({
      name: "Array"
    }) && !init.scope.hasBinding("Array", true)) {
      type = ArrayExpression();
    }
  }

  return type;
}

function TypeCastExpression(node) {
  return node.typeAnnotation;
}

TypeCastExpression.validParent = true;

function NewExpression(node) {
  if (this.get("callee").isIdentifier()) {
    return t().genericTypeAnnotation(node.callee);
  }
}

function TemplateLiteral() {
  return t().stringTypeAnnotation();
}

function UnaryExpression(node) {
  const operator = node.operator;

  if (operator === "void") {
    return t().voidTypeAnnotation();
  } else if (t().NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t().numberTypeAnnotation();
  } else if (t().STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t().stringTypeAnnotation();
  } else if (t().BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t().booleanTypeAnnotation();
  }
}

function BinaryExpression(node) {
  const operator = node.operator;

  if (t().NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t().numberTypeAnnotation();
  } else if (t().BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t().booleanTypeAnnotation();
  } else if (operator === "+") {
    const right = this.get("right");
    const left = this.get("left");

    if (left.isBaseType("number") && right.isBaseType("number")) {
      return t().numberTypeAnnotation();
    } else if (left.isBaseType("string") || right.isBaseType("string")) {
      return t().stringTypeAnnotation();
    }

    return t().unionTypeAnnotation([t().stringTypeAnnotation(), t().numberTypeAnnotation()]);
  }
}

function LogicalExpression() {
  return t().createUnionTypeAnnotation([this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation()]);
}

function ConditionalExpression() {
  return t().createUnionTypeAnnotation([this.get("consequent").getTypeAnnotation(), this.get("alternate").getTypeAnnotation()]);
}

function SequenceExpression() {
  return this.get("expressions").pop().getTypeAnnotation();
}

function ParenthesizedExpression() {
  return this.get("expression").getTypeAnnotation();
}

function AssignmentExpression() {
  return this.get("right").getTypeAnnotation();
}

function UpdateExpression(node) {
  const operator = node.operator;

  if (operator === "++" || operator === "--") {
    return t().numberTypeAnnotation();
  }
}

function StringLiteral() {
  return t().stringTypeAnnotation();
}

function NumericLiteral() {
  return t().numberTypeAnnotation();
}

function BooleanLiteral() {
  return t().booleanTypeAnnotation();
}

function NullLiteral() {
  return t().nullLiteralTypeAnnotation();
}

function RegExpLiteral() {
  return t().genericTypeAnnotation(t().identifier("RegExp"));
}

function ObjectExpression() {
  return t().genericTypeAnnotation(t().identifier("Object"));
}

function ArrayExpression() {
  return t().genericTypeAnnotation(t().identifier("Array"));
}

function RestElement() {
  return ArrayExpression();
}

RestElement.validParent = true;

function Func() {
  return t().genericTypeAnnotation(t().identifier("Function"));
}

const isArrayFrom = t().buildMatchMemberExpression("Array.from");
const isObjectKeys = t().buildMatchMemberExpression("Object.keys");
const isObjectValues = t().buildMatchMemberExpression("Object.values");
const isObjectEntries = t().buildMatchMemberExpression("Object.entries");

function CallExpression() {
  const {
    callee
  } = this.node;

  if (isObjectKeys(callee)) {
    return t().arrayTypeAnnotation(t().stringTypeAnnotation());
  } else if (isArrayFrom(callee) || isObjectValues(callee)) {
    return t().arrayTypeAnnotation(t().anyTypeAnnotation());
  } else if (isObjectEntries(callee)) {
    return t().arrayTypeAnnotation(t().tupleTypeAnnotation([t().stringTypeAnnotation(), t().anyTypeAnnotation()]));
  }

  return resolveCall(this.get("callee"));
}

function TaggedTemplateExpression() {
  return resolveCall(this.get("tag"));
}

function resolveCall(callee) {
  callee = callee.resolve();

  if (callee.isFunction()) {
    if (callee.is("async")) {
      if (callee.is("generator")) {
        return t().genericTypeAnnotation(t().identifier("AsyncIterator"));
      } else {
        return t().genericTypeAnnotation(t().identifier("Promise"));
      }
    } else {
      if (callee.node.returnType) {
        return callee.node.returnType;
      } else {}
    }
  }
}