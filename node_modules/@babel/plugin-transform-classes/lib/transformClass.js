"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformClass;

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
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

function _helperOptimiseCallExpression() {
  const data = _interopRequireDefault(require("@babel/helper-optimise-call-expression"));

  _helperOptimiseCallExpression = function () {
    return data;
  };

  return data;
}

function defineMap() {
  const data = _interopRequireWildcard(require("@babel/helper-define-map"));

  defineMap = function () {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildConstructor(classRef, constructorBody, node) {
  const func = _core().types.functionDeclaration(_core().types.cloneNode(classRef), [], constructorBody);

  _core().types.inherits(func, node);

  return func;
}

function transformClass(path, file, builtinClasses, isLoose) {
  const classState = {
    parent: undefined,
    scope: undefined,
    node: undefined,
    path: undefined,
    file: undefined,
    classId: undefined,
    classRef: undefined,
    superName: undefined,
    superReturns: [],
    isDerived: false,
    extendsNative: false,
    construct: undefined,
    constructorBody: undefined,
    userConstructor: undefined,
    userConstructorPath: undefined,
    hasConstructor: false,
    instancePropBody: [],
    instancePropRefs: {},
    staticPropBody: [],
    body: [],
    superThises: [],
    pushedConstructor: false,
    pushedInherits: false,
    protoAlias: null,
    isLoose: false,
    hasInstanceDescriptors: false,
    hasStaticDescriptors: false,
    instanceMutatorMap: {},
    staticMutatorMap: {}
  };

  const setState = newState => {
    Object.assign(classState, newState);
  };

  const findThisesVisitor = _core().traverse.visitors.merge([_helperReplaceSupers().environmentVisitor, {
    ThisExpression(path) {
      classState.superThises.push(path);
    }

  }]);

  function pushToMap(node, enumerable, kind = "value", scope) {
    let mutatorMap;

    if (node.static) {
      setState({
        hasStaticDescriptors: true
      });
      mutatorMap = classState.staticMutatorMap;
    } else {
      setState({
        hasInstanceDescriptors: true
      });
      mutatorMap = classState.instanceMutatorMap;
    }

    const map = defineMap().push(mutatorMap, node, kind, classState.file, scope);

    if (enumerable) {
      map.enumerable = _core().types.booleanLiteral(true);
    }

    return map;
  }

  function maybeCreateConstructor() {
    let hasConstructor = false;
    const paths = classState.path.get("body.body");

    for (const path of paths) {
      hasConstructor = path.equals("kind", "constructor");
      if (hasConstructor) break;
    }

    if (hasConstructor) return;
    let params, body;

    if (classState.isDerived) {
      const constructor = _core().template.expression.ast`
        (function () {
          super(...arguments);
        })
      `;
      params = constructor.params;
      body = constructor.body;
    } else {
      params = [];
      body = _core().types.blockStatement([]);
    }

    classState.path.get("body").unshiftContainer("body", _core().types.classMethod("constructor", _core().types.identifier("constructor"), params, body));
  }

  function buildBody() {
    maybeCreateConstructor();
    pushBody();
    verifyConstructor();

    if (classState.userConstructor) {
      const {
        constructorBody,
        userConstructor,
        construct
      } = classState;
      constructorBody.body = constructorBody.body.concat(userConstructor.body.body);

      _core().types.inherits(construct, userConstructor);

      _core().types.inherits(constructorBody, userConstructor.body);
    }

    pushDescriptors();
  }

  function pushBody() {
    const classBodyPaths = classState.path.get("body.body");

    for (const path of classBodyPaths) {
      const node = path.node;

      if (path.isClassProperty()) {
        throw path.buildCodeFrameError("Missing class properties transform.");
      }

      if (node.decorators) {
        throw path.buildCodeFrameError("Method has decorators, put the decorator plugin before the classes one.");
      }

      if (_core().types.isClassMethod(node)) {
        const isConstructor = node.kind === "constructor";
        const replaceSupers = new (_helperReplaceSupers().default)({
          methodPath: path,
          objectRef: classState.classRef,
          superRef: classState.superName,
          isLoose: classState.isLoose,
          file: classState.file
        });
        replaceSupers.replace();
        const superReturns = [];
        path.traverse(_core().traverse.visitors.merge([_helperReplaceSupers().environmentVisitor, {
          ReturnStatement(path) {
            if (!path.getFunctionParent().isArrowFunctionExpression()) {
              superReturns.push(path);
            }
          }

        }]));

        if (isConstructor) {
          pushConstructor(superReturns, node, path);
        } else {
          pushMethod(node, path);
        }
      }
    }
  }

  function clearDescriptors() {
    setState({
      hasInstanceDescriptors: false,
      hasStaticDescriptors: false,
      instanceMutatorMap: {},
      staticMutatorMap: {}
    });
  }

  function pushDescriptors() {
    pushInheritsToBody();
    const {
      body
    } = classState;
    let instanceProps;
    let staticProps;

    if (classState.hasInstanceDescriptors) {
      instanceProps = defineMap().toClassObject(classState.instanceMutatorMap);
    }

    if (classState.hasStaticDescriptors) {
      staticProps = defineMap().toClassObject(classState.staticMutatorMap);
    }

    if (instanceProps || staticProps) {
      if (instanceProps) {
        instanceProps = defineMap().toComputedObjectFromClass(instanceProps);
      }

      if (staticProps) {
        staticProps = defineMap().toComputedObjectFromClass(staticProps);
      }

      let args = [_core().types.cloneNode(classState.classRef), _core().types.nullLiteral(), _core().types.nullLiteral()];
      if (instanceProps) args[1] = instanceProps;
      if (staticProps) args[2] = staticProps;
      let lastNonNullIndex = 0;

      for (let i = 0; i < args.length; i++) {
        if (!_core().types.isNullLiteral(args[i])) lastNonNullIndex = i;
      }

      args = args.slice(0, lastNonNullIndex + 1);
      body.push(_core().types.expressionStatement(_core().types.callExpression(classState.file.addHelper("createClass"), args)));
    }

    clearDescriptors();
  }

  function wrapSuperCall(bareSuper, superRef, thisRef, body) {
    let bareSuperNode = bareSuper.node;
    let call;

    if (classState.isLoose) {
      bareSuperNode.arguments.unshift(_core().types.thisExpression());

      if (bareSuperNode.arguments.length === 2 && _core().types.isSpreadElement(bareSuperNode.arguments[1]) && _core().types.isIdentifier(bareSuperNode.arguments[1].argument, {
        name: "arguments"
      })) {
        bareSuperNode.arguments[1] = bareSuperNode.arguments[1].argument;
        bareSuperNode.callee = _core().types.memberExpression(_core().types.cloneNode(superRef), _core().types.identifier("apply"));
      } else {
        bareSuperNode.callee = _core().types.memberExpression(_core().types.cloneNode(superRef), _core().types.identifier("call"));
      }

      call = _core().types.logicalExpression("||", bareSuperNode, _core().types.thisExpression());
    } else {
      bareSuperNode = (0, _helperOptimiseCallExpression().default)(_core().types.callExpression(classState.file.addHelper("getPrototypeOf"), [_core().types.cloneNode(classState.classRef)]), _core().types.thisExpression(), bareSuperNode.arguments);
      call = _core().types.callExpression(classState.file.addHelper("possibleConstructorReturn"), [_core().types.thisExpression(), bareSuperNode]);
    }

    if (bareSuper.parentPath.isExpressionStatement() && bareSuper.parentPath.container === body.node.body && body.node.body.length - 1 === bareSuper.parentPath.key) {
      if (classState.superThises.length) {
        call = _core().types.assignmentExpression("=", thisRef(), call);
      }

      bareSuper.parentPath.replaceWith(_core().types.returnStatement(call));
    } else {
      bareSuper.replaceWith(_core().types.assignmentExpression("=", thisRef(), call));
    }
  }

  function verifyConstructor() {
    if (!classState.isDerived) return;
    const path = classState.userConstructorPath;
    const body = path.get("body");
    path.traverse(findThisesVisitor);

    let thisRef = function () {
      const ref = path.scope.generateDeclaredUidIdentifier("this");

      thisRef = () => _core().types.cloneNode(ref);

      return ref;
    };

    for (const thisPath of classState.superThises) {
      const {
        node,
        parentPath
      } = thisPath;

      if (parentPath.isMemberExpression({
        object: node
      })) {
        thisPath.replaceWith(thisRef());
        continue;
      }

      thisPath.replaceWith(_core().types.callExpression(classState.file.addHelper("assertThisInitialized"), [thisRef()]));
    }

    const bareSupers = new Set();
    path.traverse(_core().traverse.visitors.merge([_helperReplaceSupers().environmentVisitor, {
      Super(path) {
        const {
          node,
          parentPath
        } = path;

        if (parentPath.isCallExpression({
          callee: node
        })) {
          bareSupers.add(parentPath);
        }
      }

    }]));
    let guaranteedSuperBeforeFinish = !!bareSupers.size;

    for (const bareSuper of bareSupers) {
      wrapSuperCall(bareSuper, classState.superName, thisRef, body);

      if (guaranteedSuperBeforeFinish) {
        bareSuper.find(function (parentPath) {
          if (parentPath === path) {
            return true;
          }

          if (parentPath.isLoop() || parentPath.isConditional() || parentPath.isArrowFunctionExpression()) {
            guaranteedSuperBeforeFinish = false;
            return true;
          }
        });
      }
    }

    let wrapReturn;

    if (classState.isLoose) {
      wrapReturn = returnArg => {
        const thisExpr = _core().types.callExpression(classState.file.addHelper("assertThisInitialized"), [thisRef()]);

        return returnArg ? _core().types.logicalExpression("||", returnArg, thisExpr) : thisExpr;
      };
    } else {
      wrapReturn = returnArg => _core().types.callExpression(classState.file.addHelper("possibleConstructorReturn"), [thisRef()].concat(returnArg || []));
    }

    const bodyPaths = body.get("body");

    if (!bodyPaths.length || !bodyPaths.pop().isReturnStatement()) {
      body.pushContainer("body", _core().types.returnStatement(guaranteedSuperBeforeFinish ? thisRef() : wrapReturn()));
    }

    for (const returnPath of classState.superReturns) {
      returnPath.get("argument").replaceWith(wrapReturn(returnPath.node.argument));
    }
  }

  function pushMethod(node, path) {
    const scope = path ? path.scope : classState.scope;

    if (node.kind === "method") {
      if (processMethod(node, scope)) return;
    }

    pushToMap(node, false, null, scope);
  }

  function processMethod(node, scope) {
    if (classState.isLoose && !node.decorators) {
      let {
        classRef
      } = classState;

      if (!node.static) {
        insertProtoAliasOnce();
        classRef = classState.protoAlias;
      }

      const methodName = _core().types.memberExpression(_core().types.cloneNode(classRef), node.key, node.computed || _core().types.isLiteral(node.key));

      let func = _core().types.functionExpression(null, node.params, node.body, node.generator, node.async);

      _core().types.inherits(func, node);

      const key = _core().types.toComputedKey(node, node.key);

      if (_core().types.isStringLiteral(key)) {
        func = (0, _helperFunctionName().default)({
          node: func,
          id: key,
          scope
        });
      }

      const expr = _core().types.expressionStatement(_core().types.assignmentExpression("=", methodName, func));

      _core().types.inheritsComments(expr, node);

      classState.body.push(expr);
      return true;
    }

    return false;
  }

  function insertProtoAliasOnce() {
    if (classState.protoAlias === null) {
      setState({
        protoAlias: classState.scope.generateUidIdentifier("proto")
      });

      const classProto = _core().types.memberExpression(classState.classRef, _core().types.identifier("prototype"));

      const protoDeclaration = _core().types.variableDeclaration("var", [_core().types.variableDeclarator(classState.protoAlias, classProto)]);

      classState.body.push(protoDeclaration);
    }
  }

  function pushConstructor(superReturns, method, path) {
    if (path.scope.hasOwnBinding(classState.classRef.name)) {
      path.scope.rename(classState.classRef.name);
    }

    setState({
      userConstructorPath: path,
      userConstructor: method,
      hasConstructor: true,
      superReturns
    });
    const {
      construct
    } = classState;

    _core().types.inheritsComments(construct, method);

    construct.params = method.params;

    _core().types.inherits(construct.body, method.body);

    construct.body.directives = method.body.directives;
    pushConstructorToBody();
  }

  function pushConstructorToBody() {
    if (classState.pushedConstructor) return;
    classState.pushedConstructor = true;

    if (classState.hasInstanceDescriptors || classState.hasStaticDescriptors) {
      pushDescriptors();
    }

    classState.body.push(classState.construct);
    pushInheritsToBody();
  }

  function pushInheritsToBody() {
    if (!classState.isDerived || classState.pushedInherits) return;
    setState({
      pushedInherits: true
    });
    classState.body.unshift(_core().types.expressionStatement(_core().types.callExpression(classState.file.addHelper(classState.isLoose ? "inheritsLoose" : "inherits"), [_core().types.cloneNode(classState.classRef), _core().types.cloneNode(classState.superName)])));
  }

  function setupClosureParamsArgs() {
    const {
      superName
    } = classState;
    const closureParams = [];
    const closureArgs = [];

    if (classState.isDerived) {
      const arg = classState.extendsNative ? _core().types.callExpression(classState.file.addHelper("wrapNativeSuper"), [_core().types.cloneNode(superName)]) : _core().types.cloneNode(superName);
      const param = classState.scope.generateUidIdentifierBasedOnNode(superName);
      closureParams.push(param);
      closureArgs.push(arg);
      setState({
        superName: _core().types.cloneNode(param)
      });
    }

    return {
      closureParams,
      closureArgs
    };
  }

  function classTransformer(path, file, builtinClasses, isLoose) {
    setState({
      parent: path.parent,
      scope: path.scope,
      node: path.node,
      path,
      file,
      isLoose
    });
    setState({
      classId: classState.node.id,
      classRef: classState.node.id ? _core().types.identifier(classState.node.id.name) : classState.scope.generateUidIdentifier("class"),
      superName: classState.node.superClass,
      isDerived: !!classState.node.superClass,
      constructorBody: _core().types.blockStatement([])
    });
    setState({
      extendsNative: classState.isDerived && builtinClasses.has(classState.superName.name) && !classState.scope.hasBinding(classState.superName.name, true)
    });
    const {
      classRef,
      node,
      constructorBody
    } = classState;
    setState({
      construct: buildConstructor(classRef, constructorBody, node)
    });
    let {
      body
    } = classState;
    const {
      closureParams,
      closureArgs
    } = setupClosureParamsArgs();
    buildBody();

    if (!classState.isLoose) {
      constructorBody.body.unshift(_core().types.expressionStatement(_core().types.callExpression(classState.file.addHelper("classCallCheck"), [_core().types.thisExpression(), _core().types.cloneNode(classState.classRef)])));
    }

    body = body.concat(classState.staticPropBody.map(fn => fn(_core().types.cloneNode(classState.classRef))));
    const isStrict = path.isInStrictMode();
    let constructorOnly = classState.classId && body.length === 1;

    if (constructorOnly && !isStrict) {
      for (const param of classState.construct.params) {
        if (!_core().types.isIdentifier(param)) {
          constructorOnly = false;
          break;
        }
      }
    }

    const directives = constructorOnly ? body[0].body.directives : [];

    if (!isStrict) {
      directives.push(_core().types.directive(_core().types.directiveLiteral("use strict")));
    }

    if (constructorOnly) {
      return _core().types.toExpression(body[0]);
    }

    body.push(_core().types.returnStatement(_core().types.cloneNode(classState.classRef)));

    const container = _core().types.arrowFunctionExpression(closureParams, _core().types.blockStatement(body, directives));

    return _core().types.callExpression(container, closureArgs);
  }

  return classTransformer(path, file, builtinClasses, isLoose);
}