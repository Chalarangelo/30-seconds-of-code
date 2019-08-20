"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NullableTypeAnnotation = NullableTypeAnnotation;
exports.FunctionTypeAnnotation = FunctionTypeAnnotation;
exports.UpdateExpression = UpdateExpression;
exports.ObjectExpression = ObjectExpression;
exports.DoExpression = DoExpression;
exports.Binary = Binary;
exports.IntersectionTypeAnnotation = exports.UnionTypeAnnotation = UnionTypeAnnotation;
exports.TSAsExpression = TSAsExpression;
exports.TSTypeAssertion = TSTypeAssertion;
exports.TSIntersectionType = exports.TSUnionType = TSUnionType;
exports.BinaryExpression = BinaryExpression;
exports.SequenceExpression = SequenceExpression;
exports.AwaitExpression = exports.YieldExpression = YieldExpression;
exports.ClassExpression = ClassExpression;
exports.UnaryLike = UnaryLike;
exports.FunctionExpression = FunctionExpression;
exports.ArrowFunctionExpression = ArrowFunctionExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.OptionalMemberExpression = OptionalMemberExpression;
exports.AssignmentExpression = AssignmentExpression;
exports.NewExpression = NewExpression;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const PRECEDENCE = {
  "||": 0,
  "&&": 1,
  "|": 2,
  "^": 3,
  "&": 4,
  "==": 5,
  "===": 5,
  "!=": 5,
  "!==": 5,
  "<": 6,
  ">": 6,
  "<=": 6,
  ">=": 6,
  in: 6,
  instanceof: 6,
  ">>": 7,
  "<<": 7,
  ">>>": 7,
  "+": 8,
  "-": 8,
  "*": 9,
  "/": 9,
  "%": 9,
  "**": 10
};

const isClassExtendsClause = (node, parent) => (t().isClassDeclaration(parent) || t().isClassExpression(parent)) && parent.superClass === node;

function NullableTypeAnnotation(node, parent) {
  return t().isArrayTypeAnnotation(parent);
}

function FunctionTypeAnnotation(node, parent) {
  return t().isUnionTypeAnnotation(parent) || t().isIntersectionTypeAnnotation(parent) || t().isArrayTypeAnnotation(parent);
}

function UpdateExpression(node, parent) {
  return t().isMemberExpression(parent, {
    object: node
  }) || t().isCallExpression(parent, {
    callee: node
  }) || t().isNewExpression(parent, {
    callee: node
  }) || isClassExtendsClause(node, parent);
}

function ObjectExpression(node, parent, printStack) {
  return isFirstInStatement(printStack, {
    considerArrow: true
  });
}

function DoExpression(node, parent, printStack) {
  return isFirstInStatement(printStack);
}

function Binary(node, parent) {
  if (node.operator === "**" && t().isBinaryExpression(parent, {
    operator: "**"
  })) {
    return parent.left === node;
  }

  if (isClassExtendsClause(node, parent)) {
    return true;
  }

  if ((t().isCallExpression(parent) || t().isNewExpression(parent)) && parent.callee === node || t().isUnaryLike(parent) || t().isMemberExpression(parent) && parent.object === node || t().isAwaitExpression(parent)) {
    return true;
  }

  if (t().isBinary(parent)) {
    const parentOp = parent.operator;
    const parentPos = PRECEDENCE[parentOp];
    const nodeOp = node.operator;
    const nodePos = PRECEDENCE[nodeOp];

    if (parentPos === nodePos && parent.right === node && !t().isLogicalExpression(parent) || parentPos > nodePos) {
      return true;
    }
  }

  return false;
}

function UnionTypeAnnotation(node, parent) {
  return t().isArrayTypeAnnotation(parent) || t().isNullableTypeAnnotation(parent) || t().isIntersectionTypeAnnotation(parent) || t().isUnionTypeAnnotation(parent);
}

function TSAsExpression() {
  return true;
}

function TSTypeAssertion() {
  return true;
}

function TSUnionType(node, parent) {
  return t().isTSArrayType(parent) || t().isTSOptionalType(parent) || t().isTSIntersectionType(parent) || t().isTSUnionType(parent) || t().isTSRestType(parent);
}

function BinaryExpression(node, parent) {
  return node.operator === "in" && (t().isVariableDeclarator(parent) || t().isFor(parent));
}

function SequenceExpression(node, parent) {
  if (t().isForStatement(parent) || t().isThrowStatement(parent) || t().isReturnStatement(parent) || t().isIfStatement(parent) && parent.test === node || t().isWhileStatement(parent) && parent.test === node || t().isForInStatement(parent) && parent.right === node || t().isSwitchStatement(parent) && parent.discriminant === node || t().isExpressionStatement(parent) && parent.expression === node) {
    return false;
  }

  return true;
}

function YieldExpression(node, parent) {
  return t().isBinary(parent) || t().isUnaryLike(parent) || t().isCallExpression(parent) || t().isMemberExpression(parent) || t().isNewExpression(parent) || t().isAwaitExpression(parent) && t().isYieldExpression(node) || t().isConditionalExpression(parent) && node === parent.test || isClassExtendsClause(node, parent);
}

function ClassExpression(node, parent, printStack) {
  return isFirstInStatement(printStack, {
    considerDefaultExports: true
  });
}

function UnaryLike(node, parent) {
  return t().isMemberExpression(parent, {
    object: node
  }) || t().isCallExpression(parent, {
    callee: node
  }) || t().isNewExpression(parent, {
    callee: node
  }) || t().isBinaryExpression(parent, {
    operator: "**",
    left: node
  }) || isClassExtendsClause(node, parent);
}

function FunctionExpression(node, parent, printStack) {
  return isFirstInStatement(printStack, {
    considerDefaultExports: true
  });
}

function ArrowFunctionExpression(node, parent) {
  return t().isExportDeclaration(parent) || ConditionalExpression(node, parent);
}

function ConditionalExpression(node, parent) {
  if (t().isUnaryLike(parent) || t().isBinary(parent) || t().isConditionalExpression(parent, {
    test: node
  }) || t().isAwaitExpression(parent) || t().isOptionalMemberExpression(parent) || t().isTaggedTemplateExpression(parent) || t().isTSTypeAssertion(parent) || t().isTSAsExpression(parent)) {
    return true;
  }

  return UnaryLike(node, parent);
}

function OptionalMemberExpression(node, parent) {
  return t().isCallExpression(parent) || t().isMemberExpression(parent);
}

function AssignmentExpression(node) {
  if (t().isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression(...arguments);
  }
}

function NewExpression(node, parent) {
  return isClassExtendsClause(node, parent);
}

function isFirstInStatement(printStack, {
  considerArrow = false,
  considerDefaultExports = false
} = {}) {
  let i = printStack.length - 1;
  let node = printStack[i];
  i--;
  let parent = printStack[i];

  while (i > 0) {
    if (t().isExpressionStatement(parent, {
      expression: node
    }) || t().isTaggedTemplateExpression(parent) || considerDefaultExports && t().isExportDefaultDeclaration(parent, {
      declaration: node
    }) || considerArrow && t().isArrowFunctionExpression(parent, {
      body: node
    })) {
      return true;
    }

    if (t().isCallExpression(parent, {
      callee: node
    }) || t().isSequenceExpression(parent) && parent.expressions[0] === node || t().isMemberExpression(parent, {
      object: node
    }) || t().isConditional(parent, {
      test: node
    }) || t().isBinary(parent, {
      left: node
    }) || t().isAssignmentExpression(parent, {
      left: node
    })) {
      node = parent;
      i--;
      parent = printStack[i];
    } else {
      return false;
    }
  }

  return false;
}