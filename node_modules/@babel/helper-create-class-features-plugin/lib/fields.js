"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPrivateNamesMap = buildPrivateNamesMap;
exports.buildPrivateNamesNodes = buildPrivateNamesNodes;
exports.transformPrivateNamesUsage = transformPrivateNamesUsage;
exports.buildFieldsInitNodes = buildFieldsInitNodes;

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function _helperReplaceSupers() {
  const data = _interopRequireWildcard(require("@babel/helper-replace-supers"));

  _helperReplaceSupers = function () {
    return data;
  };

  return data;
}

function _helperMemberExpressionToFunctions() {
  const data = _interopRequireDefault(require("@babel/helper-member-expression-to-functions"));

  _helperMemberExpressionToFunctions = function () {
    return data;
  };

  return data;
}

function _helperOptimiseCallExpression() {
  const data = _interopRequireDefault(require("@babel/helper-optimise-call-expression"));

  _helperOptimiseCallExpression = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function buildPrivateNamesMap(props) {
  const privateNamesMap = new Map();

  for (const prop of props) {
    const isPrivate = prop.isPrivate();
    const isMethod = !prop.isProperty();
    const isInstance = !prop.node.static;

    if (isPrivate) {
      const {
        name
      } = prop.node.key.id;
      const update = privateNamesMap.has(name) ? privateNamesMap.get(name) : {
        id: prop.scope.generateUidIdentifier(name),
        static: !isInstance,
        method: isMethod
      };

      if (prop.node.kind === "get") {
        update.getId = prop.scope.generateUidIdentifier(`get_${name}`);
      } else if (prop.node.kind === "set") {
        update.setId = prop.scope.generateUidIdentifier(`set_${name}`);
      } else if (prop.node.kind === "method") {
        update.methodId = prop.scope.generateUidIdentifier(name);
      }

      privateNamesMap.set(name, update);
    }
  }

  return privateNamesMap;
}

function buildPrivateNamesNodes(privateNamesMap, loose, state) {
  const initNodes = [];

  for (const [name, value] of privateNamesMap) {
    const {
      id,
      static: isStatic,
      method: isMethod,
      getId,
      setId
    } = value;

    if (loose) {
      initNodes.push(_core().template.statement.ast`
          var ${id} = ${state.addHelper("classPrivateFieldLooseKey")}("${name}")
        `);
    } else if (isMethod && !isStatic) {
      if (getId || setId) {
        initNodes.push(_core().template.statement.ast`var ${id} = new WeakMap();`);
      } else {
        initNodes.push(_core().template.statement.ast`var ${id} = new WeakSet();`);
      }
    } else if (!isStatic) {
      initNodes.push(_core().template.statement.ast`var ${id} = new WeakMap();`);
    }
  }

  return initNodes;
}

const privateNameVisitor = {
  PrivateName(path) {
    const {
      privateNamesMap
    } = this;
    const {
      node,
      parentPath
    } = path;
    if (!parentPath.isMemberExpression({
      property: node
    })) return;
    if (!privateNamesMap.has(node.id.name)) return;
    this.handle(parentPath);
  },

  Class(path) {
    const {
      privateNamesMap
    } = this;
    const body = path.get("body.body");

    for (const prop of body) {
      if (!prop.isPrivate()) {
        continue;
      }

      if (!privateNamesMap.has(prop.node.key.id.name)) continue;
      path.traverse(privateNameInnerVisitor, this);
      path.skip();
      break;
    }
  }

};

const privateNameInnerVisitor = _core().traverse.visitors.merge([{
  PrivateName: privateNameVisitor.PrivateName
}, _helperReplaceSupers().environmentVisitor]);

const privateNameHandlerSpec = {
  memoise(member, count) {
    const {
      scope
    } = member;
    const {
      object
    } = member.node;
    const memo = scope.maybeGenerateMemoised(object);

    if (!memo) {
      return;
    }

    this.memoiser.set(object, memo, count);
  },

  receiver(member) {
    const {
      object
    } = member.node;

    if (this.memoiser.has(object)) {
      return _core().types.cloneNode(this.memoiser.get(object));
    }

    return _core().types.cloneNode(object);
  },

  get(member) {
    const {
      classRef,
      privateNamesMap,
      file
    } = this;
    const {
      name
    } = member.node.property.id;
    const {
      id,
      static: isStatic,
      method: isMethod,
      methodId,
      getId,
      setId
    } = privateNamesMap.get(name);

    if (isStatic) {
      const helperName = isMethod ? "classStaticPrivateMethodGet" : "classStaticPrivateFieldSpecGet";
      return _core().types.callExpression(file.addHelper(helperName), [this.receiver(member), _core().types.cloneNode(classRef), _core().types.cloneNode(id)]);
    }

    if (isMethod) {
      if (getId || setId) {
        return _core().types.callExpression(file.addHelper("classPrivateFieldGet"), [this.receiver(member), _core().types.cloneNode(id)]);
      }

      return _core().types.callExpression(file.addHelper("classPrivateMethodGet"), [this.receiver(member), _core().types.cloneNode(id), _core().types.cloneNode(methodId)]);
    }

    return _core().types.callExpression(file.addHelper("classPrivateFieldGet"), [this.receiver(member), _core().types.cloneNode(id)]);
  },

  set(member, value) {
    const {
      classRef,
      privateNamesMap,
      file
    } = this;
    const {
      name
    } = member.node.property.id;
    const {
      id,
      static: isStatic,
      method: isMethod,
      setId
    } = privateNamesMap.get(name);

    if (isStatic) {
      const helperName = isMethod ? "classStaticPrivateMethodSet" : "classStaticPrivateFieldSpecSet";
      return _core().types.callExpression(file.addHelper(helperName), [this.receiver(member), _core().types.cloneNode(classRef), _core().types.cloneNode(id), value]);
    }

    if (isMethod) {
      if (setId) {
        return _core().types.callExpression(file.addHelper("classPrivateFieldSet"), [this.receiver(member), _core().types.cloneNode(id), value]);
      }

      return _core().types.callExpression(file.addHelper("classPrivateMethodSet"), []);
    }

    return _core().types.callExpression(file.addHelper("classPrivateFieldSet"), [this.receiver(member), _core().types.cloneNode(id), value]);
  },

  destructureSet(member) {
    const {
      privateNamesMap,
      file
    } = this;
    const {
      name
    } = member.node.property.id;
    const {
      id
    } = privateNamesMap.get(name);
    return _core().types.memberExpression(_core().types.callExpression(file.addHelper("classPrivateFieldDestructureSet"), [this.receiver(member), _core().types.cloneNode(id)]), _core().types.identifier("value"));
  },

  call(member, args) {
    this.memoise(member, 1);
    return (0, _helperOptimiseCallExpression().default)(this.get(member), this.receiver(member), args);
  }

};
const privateNameHandlerLoose = {
  handle(member) {
    const {
      privateNamesMap,
      file
    } = this;
    const {
      object
    } = member.node;
    const {
      name
    } = member.node.property.id;
    member.replaceWith(_core().template.expression`BASE(REF, PROP)[PROP]`({
      BASE: file.addHelper("classPrivateFieldLooseBase"),
      REF: object,
      PROP: privateNamesMap.get(name).id
    }));
  }

};

function transformPrivateNamesUsage(ref, path, privateNamesMap, loose, state) {
  const body = path.get("body");

  if (loose) {
    body.traverse(privateNameVisitor, Object.assign({
      privateNamesMap,
      file: state
    }, privateNameHandlerLoose));
  } else {
    (0, _helperMemberExpressionToFunctions().default)(body, privateNameVisitor, Object.assign({
      privateNamesMap,
      classRef: ref,
      file: state
    }, privateNameHandlerSpec));
  }
}

function buildPrivateFieldInitLoose(ref, prop, privateNamesMap) {
  const {
    id
  } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();
  return _core().template.statement.ast`
    Object.defineProperty(${ref}, ${id}, {
      // configurable is false by default
      // enumerable is false by default
      writable: true,
      value: ${value}
    });
  `;
}

function buildPrivateInstanceFieldInitSpec(ref, prop, privateNamesMap) {
  const {
    id
  } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();
  return _core().template.statement.ast`${id}.set(${ref}, {
    // configurable is always false for private elements
    // enumerable is always false for private elements
    writable: true,
    value: ${value},
  })`;
}

function buildPrivateStaticFieldInitSpec(prop, privateNamesMap) {
  const {
    id
  } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();
  return _core().template.statement.ast`
    var ${id} = {
      // configurable is false by default
      // enumerable is false by default
      writable: true,
      value: ${value}
    };
  `;
}

function buildPrivateMethodInitLoose(ref, prop, privateNamesMap) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    methodId,
    id,
    getId,
    setId,
    initAdded
  } = privateName;
  if (initAdded) return;

  if (methodId) {
    return _core().template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          value: ${methodId.name}
        });
      `;
  }

  if (getId || setId) {
    privateNamesMap.set(prop.node.key.id.name, Object.assign({}, privateName, {
      initAdded: true
    }));

    if (getId && setId) {
      return _core().template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId.name},
          set: ${setId.name}
        });
      `;
    } else if (getId && !setId) {
      return _core().template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId.name}
        });
      `;
    } else if (!getId && setId) {
      return _core().template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          set: ${setId.name}
        });
      `;
    }
  }
}

function buildPrivateInstanceMethodInitSpec(ref, prop, privateNamesMap) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    id,
    getId,
    setId,
    initAdded
  } = privateName;
  if (initAdded) return;

  if (getId || setId) {
    privateNamesMap.set(prop.node.key.id.name, Object.assign({}, privateName, {
      initAdded: true
    }));

    if (getId && setId) {
      return _core().template.statement.ast`
        ${id}.set(${ref}, {
          get: ${getId.name},
          set: ${setId.name}
        });
      `;
    } else if (getId && !setId) {
      return _core().template.statement.ast`
        ${id}.set(${ref}, {
          get: ${getId.name}
        });
      `;
    } else if (!getId && setId) {
      return _core().template.statement.ast`
        ${id}.set(${ref}, {
          set: ${setId.name}
        });
      `;
    }
  }

  return _core().template.statement.ast`${id}.add(${ref})`;
}

function buildPublicFieldInitLoose(ref, prop) {
  const {
    key,
    computed
  } = prop.node;
  const value = prop.node.value || prop.scope.buildUndefinedNode();
  return _core().types.expressionStatement(_core().types.assignmentExpression("=", _core().types.memberExpression(ref, key, computed || _core().types.isLiteral(key)), value));
}

function buildPublicFieldInitSpec(ref, prop, state) {
  const {
    key,
    computed
  } = prop.node;
  const value = prop.node.value || prop.scope.buildUndefinedNode();
  return _core().types.expressionStatement(_core().types.callExpression(state.addHelper("defineProperty"), [ref, computed || _core().types.isLiteral(key) ? key : _core().types.stringLiteral(key.name), value]));
}

function buildPrivateStaticMethodInitLoose(ref, prop, state, privateNamesMap) {
  const {
    id,
    methodId
  } = privateNamesMap.get(prop.node.key.id.name);
  return _core().template.statement.ast`
    Object.defineProperty(${ref}, ${id}, {
      // configurable is false by default
      // enumerable is false by default
      // writable is false by default
      value: ${methodId.name}
    });
  `;
}

function buildPrivateMethodDeclaration(prop, privateNamesMap, loose = false) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    id,
    methodId,
    getId,
    setId,
    getterDeclared,
    setterDeclared,
    static: isStatic
  } = privateName;
  const {
    params,
    body,
    generator,
    async
  } = prop.node;

  const methodValue = _core().types.functionExpression(methodId, params, body, generator, async);

  const isGetter = getId && !getterDeclared && params.length === 0;
  const isSetter = setId && !setterDeclared && params.length > 0;

  if (isGetter) {
    privateNamesMap.set(prop.node.key.id.name, Object.assign({}, privateName, {
      getterDeclared: true
    }));
    return _core().types.variableDeclaration("var", [_core().types.variableDeclarator(getId, methodValue)]);
  }

  if (isSetter) {
    privateNamesMap.set(prop.node.key.id.name, Object.assign({}, privateName, {
      setterDeclared: true
    }));
    return _core().types.variableDeclaration("var", [_core().types.variableDeclarator(setId, methodValue)]);
  }

  if (isStatic && !loose) {
    return _core().types.variableDeclaration("var", [_core().types.variableDeclarator(id, _core().types.functionExpression(id, params, body, generator, async))]);
  }

  return _core().types.variableDeclaration("var", [_core().types.variableDeclarator(methodId, methodValue)]);
}

const thisContextVisitor = _core().traverse.visitors.merge([{
  ThisExpression(path, state) {
    state.needsClassRef = true;
    path.replaceWith(_core().types.cloneNode(state.classRef));
  }

}, _helperReplaceSupers().environmentVisitor]);

function replaceThisContext(path, ref, superRef, file, loose) {
  const state = {
    classRef: ref,
    needsClassRef: false
  };
  const replacer = new (_helperReplaceSupers().default)({
    methodPath: path,
    isLoose: loose,
    superRef,
    file,

    getObjectRef() {
      state.needsClassRef = true;
      return path.node.static ? ref : _core().types.memberExpression(ref, _core().types.identifier("prototype"));
    }

  });
  replacer.replace();

  if (path.isProperty()) {
    path.traverse(thisContextVisitor, state);
  }

  return state.needsClassRef;
}

function buildFieldsInitNodes(ref, superRef, props, privateNamesMap, state, loose) {
  const staticNodes = [];
  const instanceNodes = [];
  let needsClassRef = false;

  for (const prop of props) {
    const isStatic = prop.node.static;
    const isInstance = !isStatic;
    const isPrivate = prop.isPrivate();
    const isPublic = !isPrivate;
    const isField = prop.isProperty();
    const isMethod = !isField;

    if (isStatic || isMethod && isPrivate) {
      const replaced = replaceThisContext(prop, ref, superRef, state, loose);
      needsClassRef = needsClassRef || replaced;
    }

    switch (true) {
      case isStatic && isPrivate && isField && loose:
        needsClassRef = true;
        staticNodes.push(buildPrivateFieldInitLoose(_core().types.cloneNode(ref), prop, privateNamesMap));
        break;

      case isStatic && isPrivate && isField && !loose:
        needsClassRef = true;
        staticNodes.push(buildPrivateStaticFieldInitSpec(prop, privateNamesMap));
        break;

      case isStatic && isPublic && isField && loose:
        needsClassRef = true;
        staticNodes.push(buildPublicFieldInitLoose(_core().types.cloneNode(ref), prop));
        break;

      case isStatic && isPublic && isField && !loose:
        needsClassRef = true;
        staticNodes.push(buildPublicFieldInitSpec(_core().types.cloneNode(ref), prop, state));
        break;

      case isInstance && isPrivate && isField && loose:
        instanceNodes.push(buildPrivateFieldInitLoose(_core().types.thisExpression(), prop, privateNamesMap));
        break;

      case isInstance && isPrivate && isField && !loose:
        instanceNodes.push(buildPrivateInstanceFieldInitSpec(_core().types.thisExpression(), prop, privateNamesMap));
        break;

      case isInstance && isPrivate && isMethod && loose:
        instanceNodes.unshift(buildPrivateMethodInitLoose(_core().types.thisExpression(), prop, privateNamesMap));
        staticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, loose));
        break;

      case isInstance && isPrivate && isMethod && !loose:
        instanceNodes.unshift(buildPrivateInstanceMethodInitSpec(_core().types.thisExpression(), prop, privateNamesMap));
        staticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, loose));
        break;

      case isStatic && isPrivate && isMethod && !loose:
        needsClassRef = true;
        staticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, loose));
        break;

      case isStatic && isPrivate && isMethod && loose:
        needsClassRef = true;
        staticNodes.push(buildPrivateMethodDeclaration(prop, privateNamesMap, loose));
        staticNodes.push(buildPrivateStaticMethodInitLoose(_core().types.cloneNode(ref), prop, state, privateNamesMap));
        break;

      case isInstance && isPublic && isField && loose:
        instanceNodes.push(buildPublicFieldInitLoose(_core().types.thisExpression(), prop));
        break;

      case isInstance && isPublic && isField && !loose:
        instanceNodes.push(buildPublicFieldInitSpec(_core().types.thisExpression(), prop, state));
        break;

      default:
        throw new Error("Unreachable.");
    }
  }

  return {
    staticNodes,
    instanceNodes: instanceNodes.filter(Boolean),

    wrapClass(path) {
      for (const prop of props) {
        prop.remove();
      }

      if (!needsClassRef) return path;

      if (path.isClassExpression()) {
        path.scope.push({
          id: ref
        });
        path.replaceWith(_core().types.assignmentExpression("=", _core().types.cloneNode(ref), path.node));
      } else if (!path.node.id) {
        path.node.id = ref;
      }

      return path;
    }

  };
}