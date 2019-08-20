"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = exports.nodes = void 0;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function crawl(node, state = {}) {
  if (t().isMemberExpression(node)) {
    crawl(node.object, state);
    if (node.computed) crawl(node.property, state);
  } else if (t().isBinary(node) || t().isAssignmentExpression(node)) {
    crawl(node.left, state);
    crawl(node.right, state);
  } else if (t().isCallExpression(node)) {
    state.hasCall = true;
    crawl(node.callee, state);
  } else if (t().isFunction(node)) {
    state.hasFunction = true;
  } else if (t().isIdentifier(node)) {
    state.hasHelper = state.hasHelper || isHelper(node.callee);
  }

  return state;
}

function isHelper(node) {
  if (t().isMemberExpression(node)) {
    return isHelper(node.object) || isHelper(node.property);
  } else if (t().isIdentifier(node)) {
    return node.name === "require" || node.name[0] === "_";
  } else if (t().isCallExpression(node)) {
    return isHelper(node.callee);
  } else if (t().isBinary(node) || t().isAssignmentExpression(node)) {
    return t().isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right);
  } else {
    return false;
  }
}

function isType(node) {
  return t().isLiteral(node) || t().isObjectExpression(node) || t().isArrayExpression(node) || t().isIdentifier(node) || t().isMemberExpression(node);
}

const nodes = {
  AssignmentExpression(node) {
    const state = crawl(node.right);

    if (state.hasCall && state.hasHelper || state.hasFunction) {
      return {
        before: state.hasFunction,
        after: true
      };
    }
  },

  SwitchCase(node, parent) {
    return {
      before: node.consequent.length || parent.cases[0] === node,
      after: !node.consequent.length && parent.cases[parent.cases.length - 1] === node
    };
  },

  LogicalExpression(node) {
    if (t().isFunction(node.left) || t().isFunction(node.right)) {
      return {
        after: true
      };
    }
  },

  Literal(node) {
    if (node.value === "use strict") {
      return {
        after: true
      };
    }
  },

  CallExpression(node) {
    if (t().isFunction(node.callee) || isHelper(node)) {
      return {
        before: true,
        after: true
      };
    }
  },

  VariableDeclaration(node) {
    for (let i = 0; i < node.declarations.length; i++) {
      const declar = node.declarations[i];
      let enabled = isHelper(declar.id) && !isType(declar.init);

      if (!enabled) {
        const state = crawl(declar.init);
        enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
      }

      if (enabled) {
        return {
          before: true,
          after: true
        };
      }
    }
  },

  IfStatement(node) {
    if (t().isBlockStatement(node.consequent)) {
      return {
        before: true,
        after: true
      };
    }
  }

};
exports.nodes = nodes;

nodes.ObjectProperty = nodes.ObjectTypeProperty = nodes.ObjectMethod = function (node, parent) {
  if (parent.properties[0] === node) {
    return {
      before: true
    };
  }
};

nodes.ObjectTypeCallProperty = function (node, parent) {
  if (parent.callProperties[0] === node && (!parent.properties || !parent.properties.length)) {
    return {
      before: true
    };
  }
};

nodes.ObjectTypeIndexer = function (node, parent) {
  if (parent.indexers[0] === node && (!parent.properties || !parent.properties.length) && (!parent.callProperties || !parent.callProperties.length)) {
    return {
      before: true
    };
  }
};

nodes.ObjectTypeInternalSlot = function (node, parent) {
  if (parent.internalSlots[0] === node && (!parent.properties || !parent.properties.length) && (!parent.callProperties || !parent.callProperties.length) && (!parent.indexers || !parent.indexers.length)) {
    return {
      before: true
    };
  }
};

const list = {
  VariableDeclaration(node) {
    return node.declarations.map(decl => decl.init);
  },

  ArrayExpression(node) {
    return node.elements;
  },

  ObjectExpression(node) {
    return node.properties;
  }

};
exports.list = list;
[["Function", true], ["Class", true], ["Loop", true], ["LabeledStatement", true], ["SwitchStatement", true], ["TryStatement", true]].forEach(function ([type, amounts]) {
  if (typeof amounts === "boolean") {
    amounts = {
      after: amounts,
      before: amounts
    };
  }

  [type].concat(t().FLIPPED_ALIAS_KEYS[type] || []).forEach(function (type) {
    nodes[type] = function () {
      return amounts;
    };
  });
});