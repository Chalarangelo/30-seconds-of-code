// Type definitions for @babel/traverse 7.0
// Project: https://github.com/babel/babel/tree/master/packages/babel-traverse, https://babeljs.io
// Definitions by: Troy Gerwien <https://github.com/yortus>
//                 Marvin Hagemeister <https://github.com/marvinhagemeister>
//                 Ryan Petrich <https://github.com/rpetrich>
//                 Melvin Groenhoff <https://github.com/mgroenhoff>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.9

import * as t from "@babel/types";

export type Node = t.Node;

export default function traverse<S>(
    parent: Node | Node[],
    opts: TraverseOptions<S>,
    scope: Scope | undefined,
    state: S,
    parentPath?: NodePath,
): void;
export default function traverse(
    parent: Node | Node[],
    opts: TraverseOptions,
    scope?: Scope,
    state?: any,
    parentPath?: NodePath,
): void;

export interface TraverseOptions<S = Node> extends Visitor<S> {
    scope?: Scope;
    noScope?: boolean;
}

export class Scope {
    constructor(path: NodePath, parentScope?: Scope);
    path: NodePath;
    block: Node;
    parentBlock: Node;
    parent: Scope;
    hub: Hub;
    bindings: { [name: string]: Binding; };

    /** Traverse node with current scope and path. */
    traverse<S>(node: Node | Node[], opts: TraverseOptions<S>, state: S): void;
    traverse(node: Node | Node[], opts?: TraverseOptions, state?: any): void;

    /** Generate a unique identifier and add it to the current scope. */
    generateDeclaredUidIdentifier(name?: string): t.Identifier;

    /** Generate a unique identifier. */
    generateUidIdentifier(name?: string): t.Identifier;

    /** Generate a unique `_id1` binding. */
    generateUid(name?: string): string;

    /** Generate a unique identifier based on a node. */
    generateUidIdentifierBasedOnNode(parent: Node, defaultName?: string): t.Identifier;

    /**
     * Determine whether evaluating the specific input `node` is a consequenceless reference. ie.
     * evaluating it wont result in potentially arbitrary code from being ran. The following are
     * whitelisted and determined not to cause side effects:
     *
     *  - `this` expressions
     *  - `super` expressions
     *  - Bound identifiers
     */
    isStatic(node: Node): boolean;

    /** Possibly generate a memoised identifier if it is not static and has consequences. */
    maybeGenerateMemoised(node: Node, dontPush?: boolean): t.Identifier;

    checkBlockScopedCollisions(local: Node, kind: string, name: string, id: object): void;

    rename(oldName: string, newName?: string, block?: Node): void;

    dump(): void;

    toArray(node: Node, i?: number): Node;

    registerDeclaration(path: NodePath): void;

    buildUndefinedNode(): Node;

    registerConstantViolation(path: NodePath): void;

    registerBinding(kind: string, path: NodePath, bindingPath?: NodePath): void;

    addGlobal(node: Node): void;

    hasUid(name: string): boolean;

    hasGlobal(name: string): boolean;

    hasReference(name: string): boolean;

    isPure(node: Node, constantsOnly?: boolean): boolean;

    setData(key: string, val: any): any;

    getData(key: string): any;

    removeData(key: string): void;

    push(opts: {
        id: t.LVal,
        init?: t.Expression,
        unique?: boolean,
        kind?: "var" | "let" | "const",
    }): void;

    getProgramParent(): Scope;

    getFunctionParent(): Scope | null;

    getBlockParent(): Scope;

    /** Walks the scope tree and gathers **all** bindings. */
    getAllBindings(...kinds: string[]): object;

    bindingIdentifierEquals(name: string, node: Node): boolean;

    getBinding(name: string): Binding | undefined;

    getOwnBinding(name: string): Binding | undefined;

    getBindingIdentifier(name: string): t.Identifier;

    getOwnBindingIdentifier(name: string): t.Identifier;

    hasOwnBinding(name: string): boolean;

    hasBinding(name: string, noGlobals?: boolean): boolean;

    parentHasBinding(name: string, noGlobals?: boolean): boolean;

    /** Move a binding of `name` to another `scope`. */
    moveBindingTo(name: string, scope: Scope): void;

    removeOwnBinding(name: string): void;

    removeBinding(name: string): void;
}

export class Binding {
    constructor(opts: { existing: Binding; identifier: t.Identifier; scope: Scope; path: NodePath; kind: "var" | "let" | "const"; });
    identifier: t.Identifier;
    scope: Scope;
    path: NodePath;
    kind: "var" | "let" | "const" | "module";
    referenced: boolean;
    references: number;
    referencePaths: NodePath[];
    constant: boolean;
    constantViolations: NodePath[];
}

export type Visitor<S = {}> = VisitNodeObject<S, Node> & {
    [Type in Node["type"]]?: VisitNode<S, Extract<Node, { type: Type; }>>;
} & {
    [K in keyof t.Aliases]?: VisitNode<S, t.Aliases[K]>
};

export type VisitNode<S, P> = VisitNodeFunction<S, P> | VisitNodeObject<S, P>;

export type VisitNodeFunction<S, P> = (this: S, path: NodePath<P>, state: S) => void;

export interface VisitNodeObject<S, P> {
    enter?: VisitNodeFunction<S, P>;
    exit?: VisitNodeFunction<S, P>;
}

export class NodePath<T = Node> {
    constructor(hub: Hub, parent: Node);
    parent: Node;
    hub: Hub;
    contexts: TraversalContext[];
    data: object;
    shouldSkip: boolean;
    shouldStop: boolean;
    removed: boolean;
    state: any;
    opts: object;
    skipKeys: object;
    parentPath: NodePath;
    context: TraversalContext;
    container: object | object[];
    listKey: string;
    inList: boolean;
    parentKey: string;
    key: string | number;
    node: T;
    scope: Scope;
    type: T extends undefined | null ? string | null : string;
    typeAnnotation: object;

    getScope(scope: Scope): Scope;

    setData(key: string, val: any): any;

    getData(key: string, def?: any): any;

    buildCodeFrameError<TError extends Error>(msg: string, Error?: new (msg: string) => TError): TError;

    traverse<T>(visitor: Visitor<T>, state: T): void;
    traverse(visitor: Visitor): void;

    set(key: string, node: Node): void;

    getPathLocation(): string;

    // Example: https://github.com/babel/babel/blob/63204ae51e020d84a5b246312f5eeb4d981ab952/packages/babel-traverse/src/path/modification.js#L83
    debug(buildMessage: () => string): void;

    // ------------------------- ancestry -------------------------
    /**
     * Call the provided `callback` with the `NodePath`s of all the parents.
     * When the `callback` returns a truthy value, we return that node path.
     */
    findParent(callback: (path: NodePath) => boolean): NodePath;

    find(callback: (path: NodePath) => boolean): NodePath;

    /** Get the parent function of the current path. */
    getFunctionParent(): NodePath<t.Function>;

    /** Walk up the tree until we hit a parent node path in a list. */
    getStatementParent(): NodePath<t.Statement>;

    /**
     * Get the deepest common ancestor and then from it, get the earliest relationship path
     * to that ancestor.
     *
     * Earliest is defined as being "before" all the other nodes in terms of list container
     * position and visiting key.
     */
    getEarliestCommonAncestorFrom(paths: NodePath[]): NodePath[];

    /** Get the earliest path in the tree where the provided `paths` intersect. */
    getDeepestCommonAncestorFrom(
        paths: NodePath[],
        filter?: (deepest: Node, i: number, ancestries: NodePath[]) => NodePath
    ): NodePath;

    /**
     * Build an array of node paths containing the entire ancestry of the current node path.
     *
     * NOTE: The current node path is included in this.
     */
    getAncestry(): NodePath[];

    inType(...candidateTypes: string[]): boolean;

    // ------------------------- inference -------------------------
    /** Infer the type of the current `NodePath`. */
    getTypeAnnotation(): t.FlowType;

    isBaseType(baseName: string, soft?: boolean): boolean;

    couldBeBaseType(name: string): boolean;

    baseTypeStrictlyMatches(right: NodePath): boolean;

    isGenericType(genericName: string): boolean;

    // ------------------------- replacement -------------------------
    /**
     * Replace a node with an array of multiple. This method performs the following steps:
     *
     *  - Inherit the comments of first provided node with that of the current node.
     *  - Insert the provided nodes after the current node.
     *  - Remove the current node.
     */
    replaceWithMultiple(nodes: Node[]): void;

    /**
     * Parse a string as an expression and replace the current node with the result.
     *
     * NOTE: This is typically not a good idea to use. Building source strings when
     * transforming ASTs is an antipattern and SHOULD NOT be encouraged. Even if it's
     * easier to use, your transforms will be extremely brittle.
     */
    replaceWithSourceString(replacement: any): void;

    /** Replace the current node with another. */
    replaceWith(replacement: Node | NodePath): void;

    /**
     * This method takes an array of statements nodes and then explodes it
     * into expressions. This method retains completion records which is
     * extremely important to retain original semantics.
     */
    replaceExpressionWithStatements(nodes: Node[]): Node;

    replaceInline(nodes: Node | Node[]): void;

    // ------------------------- evaluation -------------------------
    /**
     * Walk the input `node` and statically evaluate if it's truthy.
     *
     * Returning `true` when we're sure that the expression will evaluate to a
     * truthy value, `false` if we're sure that it will evaluate to a falsy
     * value and `undefined` if we aren't sure. Because of this please do not
     * rely on coercion when using this method and check with === if it's false.
     */
    evaluateTruthy(): boolean;

    /**
     * Walk the input `node` and statically evaluate it.
     *
     * Returns an object in the form `{ confident, value }`. `confident` indicates
     * whether or not we had to drop out of evaluating the expression because of
     * hitting an unknown node that we couldn't confidently find the value of.
     *
     * Example:
     *
     *   t.evaluate(parse("5 + 5")) // { confident: true, value: 10 }
     *   t.evaluate(parse("!true")) // { confident: true, value: false }
     *   t.evaluate(parse("foo + foo")) // { confident: false, value: undefined }
     */
    evaluate(): { confident: boolean; value: any };

    // ------------------------- introspection -------------------------
    /**
     * Match the current node if it matches the provided `pattern`.
     *
     * For example, given the match `React.createClass` it would match the
     * parsed nodes of `React.createClass` and `React["createClass"]`.
     */
    matchesPattern(pattern: string, allowPartial?: boolean): boolean;

    /**
     * Check whether we have the input `key`. If the `key` references an array then we check
     * if the array has any items, otherwise we just check if it's falsy.
     */
    has(key: string): boolean;

    isStatic(): boolean;

    /** Alias of `has`. */
    is(key: string): boolean;

    /** Opposite of `has`. */
    isnt(key: string): boolean;

    /** Check whether the path node `key` strict equals `value`. */
    equals(key: string, value: any): boolean;

    /**
     * Check the type against our stored internal type of the node. This is handy when a node has
     * been removed yet we still internally know the type and need it to calculate node replacement.
     */
    isNodeType(type: string): boolean;

    /**
     * This checks whether or not we're in one of the following positions:
     *
     *   for (KEY in right);
     *   for (KEY;;);
     *
     * This is because these spots allow VariableDeclarations AND normal expressions so we need
     * to tell the path replacement that it's ok to replace this with an expression.
     */
    canHaveVariableDeclarationOrExpression(): boolean;

    /**
     * This checks whether we are swapping an arrow function's body between an
     * expression and a block statement (or vice versa).
     *
     * This is because arrow functions may implicitly return an expression, which
     * is the same as containing a block statement.
     */
    canSwapBetweenExpressionAndStatement(replacement: Node): boolean;

    /** Check whether the current path references a completion record */
    isCompletionRecord(allowInsideFunction?: boolean): boolean;

    /**
     * Check whether or not the current `key` allows either a single statement or block statement
     * so we can explode it if necessary.
     */
    isStatementOrBlock(): boolean;

    /** Check if the currently assigned path references the `importName` of `moduleSource`. */
    referencesImport(moduleSource: string, importName: string): boolean;

    /** Get the source code associated with this node. */
    getSource(): string;

    /** Check if the current path will maybe execute before another path */
    willIMaybeExecuteBefore(path: NodePath): boolean;

    // ------------------------- context -------------------------
    call(key: string): boolean;

    isBlacklisted(): boolean;

    visit(): boolean;

    skip(): void;

    skipKey(key: string): void;

    stop(): void;

    setScope(): void;

    setContext(context: TraversalContext): NodePath<T>;

    popContext(): void;

    pushContext(context: TraversalContext): void;

    // ------------------------- removal -------------------------
    remove(): void;

    // ------------------------- modification -------------------------
    /** Insert the provided nodes before the current one. */
    insertBefore(nodes: Node | Node[]): any;

    /**
     * Insert the provided nodes after the current one. When inserting nodes after an
     * expression, ensure that the completion record is correct by pushing the current node.
     */
    insertAfter(nodes: Node | Node[]): any;

    /** Update all sibling node paths after `fromIndex` by `incrementBy`. */
    updateSiblingKeys(fromIndex: number, incrementBy: number): void;

    /** Hoist the current node to the highest scope possible and return a UID referencing it. */
    hoist(scope: Scope): void;

    // ------------------------- family -------------------------
    getOpposite(): NodePath;

    getCompletionRecords(): NodePath[];

    getSibling(key: string | number): NodePath;
    getAllPrevSiblings(): NodePath[];
    getAllNextSiblings(): NodePath[];

    get<K extends keyof T>(key: K, context?: boolean | TraversalContext):
        T[K] extends Array<Node | null | undefined> ? Array<NodePath<T[K][number]>> :
        T[K] extends Node | null | undefined ? NodePath<T[K]> :
        never;
    get(key: string, context?: boolean | TraversalContext): NodePath | NodePath[];

    getBindingIdentifiers(duplicates?: boolean): Node[];

    getOuterBindingIdentifiers(duplicates?: boolean): Node[];

    // ------------------------- comments -------------------------
    /** Share comments amongst siblings. */
    shareCommentsWithSiblings(): void;

    addComment(type: string, content: string, line?: boolean): void;

    /** Give node `comments` of the specified `type`. */
    addComments(type: string, comments: any[]): void;

    // ------------------------- isXXX -------------------------
    isArrayExpression(opts?: object): this is NodePath<t.ArrayExpression>;
    isAssignmentExpression(opts?: object): this is NodePath<t.AssignmentExpression>;
    isBinaryExpression(opts?: object): this is NodePath<t.BinaryExpression>;
    isDirective(opts?: object): this is NodePath<t.Directive>;
    isDirectiveLiteral(opts?: object): this is NodePath<t.DirectiveLiteral>;
    isBlockStatement(opts?: object): this is NodePath<t.BlockStatement>;
    isBreakStatement(opts?: object): this is NodePath<t.BreakStatement>;
    isCallExpression(opts?: object): this is NodePath<t.CallExpression>;
    isCatchClause(opts?: object): this is NodePath<t.CatchClause>;
    isConditionalExpression(opts?: object): this is NodePath<t.ConditionalExpression>;
    isContinueStatement(opts?: object): this is NodePath<t.ContinueStatement>;
    isDebuggerStatement(opts?: object): this is NodePath<t.DebuggerStatement>;
    isDoWhileStatement(opts?: object): this is NodePath<t.DoWhileStatement>;
    isEmptyStatement(opts?: object): this is NodePath<t.EmptyStatement>;
    isExpressionStatement(opts?: object): this is NodePath<t.ExpressionStatement>;
    isFile(opts?: object): this is NodePath<t.File>;
    isForInStatement(opts?: object): this is NodePath<t.ForInStatement>;
    isForStatement(opts?: object): this is NodePath<t.ForStatement>;
    isFunctionDeclaration(opts?: object): this is NodePath<t.FunctionDeclaration>;
    isFunctionExpression(opts?: object): this is NodePath<t.FunctionExpression>;
    isIdentifier(opts?: object): this is NodePath<t.Identifier>;
    isIfStatement(opts?: object): this is NodePath<t.IfStatement>;
    isLabeledStatement(opts?: object): this is NodePath<t.LabeledStatement>;
    isStringLiteral(opts?: object): this is NodePath<t.StringLiteral>;
    isNumericLiteral(opts?: object): this is NodePath<t.NumericLiteral>;
    isNullLiteral(opts?: object): this is NodePath<t.NullLiteral>;
    isBooleanLiteral(opts?: object): this is NodePath<t.BooleanLiteral>;
    isRegExpLiteral(opts?: object): this is NodePath<t.RegExpLiteral>;
    isLogicalExpression(opts?: object): this is NodePath<t.LogicalExpression>;
    isMemberExpression(opts?: object): this is NodePath<t.MemberExpression>;
    isNewExpression(opts?: object): this is NodePath<t.NewExpression>;
    isProgram(opts?: object): this is NodePath<t.Program>;
    isObjectExpression(opts?: object): this is NodePath<t.ObjectExpression>;
    isObjectMethod(opts?: object): this is NodePath<t.ObjectMethod>;
    isObjectProperty(opts?: object): this is NodePath<t.ObjectProperty>;
    isRestElement(opts?: object): this is NodePath<t.RestElement>;
    isReturnStatement(opts?: object): this is NodePath<t.ReturnStatement>;
    isSequenceExpression(opts?: object): this is NodePath<t.SequenceExpression>;
    isSwitchCase(opts?: object): this is NodePath<t.SwitchCase>;
    isSwitchStatement(opts?: object): this is NodePath<t.SwitchStatement>;
    isThisExpression(opts?: object): this is NodePath<t.ThisExpression>;
    isThrowStatement(opts?: object): this is NodePath<t.ThrowStatement>;
    isTryStatement(opts?: object): this is NodePath<t.TryStatement>;
    isUnaryExpression(opts?: object): this is NodePath<t.UnaryExpression>;
    isUpdateExpression(opts?: object): this is NodePath<t.UpdateExpression>;
    isVariableDeclaration(opts?: object): this is NodePath<t.VariableDeclaration>;
    isVariableDeclarator(opts?: object): this is NodePath<t.VariableDeclarator>;
    isWhileStatement(opts?: object): this is NodePath<t.WhileStatement>;
    isWithStatement(opts?: object): this is NodePath<t.WithStatement>;
    isAssignmentPattern(opts?: object): this is NodePath<t.AssignmentPattern>;
    isArrayPattern(opts?: object): this is NodePath<t.ArrayPattern>;
    isArrowFunctionExpression(opts?: object): this is NodePath<t.ArrowFunctionExpression>;
    isClassBody(opts?: object): this is NodePath<t.ClassBody>;
    isClassDeclaration(opts?: object): this is NodePath<t.ClassDeclaration>;
    isClassExpression(opts?: object): this is NodePath<t.ClassExpression>;
    isExportAllDeclaration(opts?: object): this is NodePath<t.ExportAllDeclaration>;
    isExportDefaultDeclaration(opts?: object): this is NodePath<t.ExportDefaultDeclaration>;
    isExportNamedDeclaration(opts?: object): this is NodePath<t.ExportNamedDeclaration>;
    isExportSpecifier(opts?: object): this is NodePath<t.ExportSpecifier>;
    isForOfStatement(opts?: object): this is NodePath<t.ForOfStatement>;
    isImportDeclaration(opts?: object): this is NodePath<t.ImportDeclaration>;
    isImportDefaultSpecifier(opts?: object): this is NodePath<t.ImportDefaultSpecifier>;
    isImportNamespaceSpecifier(opts?: object): this is NodePath<t.ImportNamespaceSpecifier>;
    isImportSpecifier(opts?: object): this is NodePath<t.ImportSpecifier>;
    isMetaProperty(opts?: object): this is NodePath<t.MetaProperty>;
    isClassMethod(opts?: object): this is NodePath<t.ClassMethod>;
    isObjectPattern(opts?: object): this is NodePath<t.ObjectPattern>;
    isSpreadElement(opts?: object): this is NodePath<t.SpreadElement>;
    isSuper(opts?: object): this is NodePath<t.Super>;
    isTaggedTemplateExpression(opts?: object): this is NodePath<t.TaggedTemplateExpression>;
    isTemplateElement(opts?: object): this is NodePath<t.TemplateElement>;
    isTemplateLiteral(opts?: object): this is NodePath<t.TemplateLiteral>;
    isYieldExpression(opts?: object): this is NodePath<t.YieldExpression>;
    isAnyTypeAnnotation(opts?: object): this is NodePath<t.AnyTypeAnnotation>;
    isArrayTypeAnnotation(opts?: object): this is NodePath<t.ArrayTypeAnnotation>;
    isBooleanTypeAnnotation(opts?: object): this is NodePath<t.BooleanTypeAnnotation>;
    isBooleanLiteralTypeAnnotation(opts?: object): this is NodePath<t.BooleanLiteralTypeAnnotation>;
    isNullLiteralTypeAnnotation(opts?: object): this is NodePath<t.NullLiteralTypeAnnotation>;
    isClassImplements(opts?: object): this is NodePath<t.ClassImplements>;
    isClassProperty(opts?: object): this is NodePath<t.ClassProperty>;
    isDeclareClass(opts?: object): this is NodePath<t.DeclareClass>;
    isDeclareFunction(opts?: object): this is NodePath<t.DeclareFunction>;
    isDeclareInterface(opts?: object): this is NodePath<t.DeclareInterface>;
    isDeclareModule(opts?: object): this is NodePath<t.DeclareModule>;
    isDeclareTypeAlias(opts?: object): this is NodePath<t.DeclareTypeAlias>;
    isDeclareVariable(opts?: object): this is NodePath<t.DeclareVariable>;
    isFunctionTypeAnnotation(opts?: object): this is NodePath<t.FunctionTypeAnnotation>;
    isFunctionTypeParam(opts?: object): this is NodePath<t.FunctionTypeParam>;
    isGenericTypeAnnotation(opts?: object): this is NodePath<t.GenericTypeAnnotation>;
    isInterfaceExtends(opts?: object): this is NodePath<t.InterfaceExtends>;
    isInterfaceDeclaration(opts?: object): this is NodePath<t.InterfaceDeclaration>;
    isIntersectionTypeAnnotation(opts?: object): this is NodePath<t.IntersectionTypeAnnotation>;
    isMixedTypeAnnotation(opts?: object): this is NodePath<t.MixedTypeAnnotation>;
    isNullableTypeAnnotation(opts?: object): this is NodePath<t.NullableTypeAnnotation>;
    isNumberTypeAnnotation(opts?: object): this is NodePath<t.NumberTypeAnnotation>;
    isStringLiteralTypeAnnotation(opts?: object): this is NodePath<t.StringLiteralTypeAnnotation>;
    isStringTypeAnnotation(opts?: object): this is NodePath<t.StringTypeAnnotation>;
    isThisTypeAnnotation(opts?: object): this is NodePath<t.ThisTypeAnnotation>;
    isTupleTypeAnnotation(opts?: object): this is NodePath<t.TupleTypeAnnotation>;
    isTypeofTypeAnnotation(opts?: object): this is NodePath<t.TypeofTypeAnnotation>;
    isTypeAlias(opts?: object): this is NodePath<t.TypeAlias>;
    isTypeAnnotation(opts?: object): this is NodePath<t.TypeAnnotation>;
    isTypeCastExpression(opts?: object): this is NodePath<t.TypeCastExpression>;
    isTypeParameterDeclaration(opts?: object): this is NodePath<t.TypeParameterDeclaration>;
    isTypeParameterInstantiation(opts?: object): this is NodePath<t.TypeParameterInstantiation>;
    isObjectTypeAnnotation(opts?: object): this is NodePath<t.ObjectTypeAnnotation>;
    isObjectTypeCallProperty(opts?: object): this is NodePath<t.ObjectTypeCallProperty>;
    isObjectTypeIndexer(opts?: object): this is NodePath<t.ObjectTypeIndexer>;
    isObjectTypeProperty(opts?: object): this is NodePath<t.ObjectTypeProperty>;
    isQualifiedTypeIdentifier(opts?: object): this is NodePath<t.QualifiedTypeIdentifier>;
    isUnionTypeAnnotation(opts?: object): this is NodePath<t.UnionTypeAnnotation>;
    isVoidTypeAnnotation(opts?: object): this is NodePath<t.VoidTypeAnnotation>;
    isJSXAttribute(opts?: object): this is NodePath<t.JSXAttribute>;
    isJSXClosingElement(opts?: object): this is NodePath<t.JSXClosingElement>;
    isJSXElement(opts?: object): this is NodePath<t.JSXElement>;
    isJSXEmptyExpression(opts?: object): this is NodePath<t.JSXEmptyExpression>;
    isJSXExpressionContainer(opts?: object): this is NodePath<t.JSXExpressionContainer>;
    isJSXIdentifier(opts?: object): this is NodePath<t.JSXIdentifier>;
    isJSXMemberExpression(opts?: object): this is NodePath<t.JSXMemberExpression>;
    isJSXNamespacedName(opts?: object): this is NodePath<t.JSXNamespacedName>;
    isJSXOpeningElement(opts?: object): this is NodePath<t.JSXOpeningElement>;
    isJSXSpreadAttribute(opts?: object): this is NodePath<t.JSXSpreadAttribute>;
    isJSXText(opts?: object): this is NodePath<t.JSXText>;
    isNoop(opts?: object): this is NodePath<t.Noop>;
    isParenthesizedExpression(opts?: object): this is NodePath<t.ParenthesizedExpression>;
    isAwaitExpression(opts?: object): this is NodePath<t.AwaitExpression>;
    isBindExpression(opts?: object): this is NodePath<t.BindExpression>;
    isDecorator(opts?: object): this is NodePath<t.Decorator>;
    isDoExpression(opts?: object): this is NodePath<t.DoExpression>;
    isExportDefaultSpecifier(opts?: object): this is NodePath<t.ExportDefaultSpecifier>;
    isExportNamespaceSpecifier(opts?: object): this is NodePath<t.ExportNamespaceSpecifier>;
    isRestProperty(opts?: object): this is NodePath<t.RestProperty>;
    isSpreadProperty(opts?: object): this is NodePath<t.SpreadProperty>;
    isExpression(opts?: object): this is NodePath<t.Expression>;
    isBinary(opts?: object): this is NodePath<t.Binary>;
    isScopable(opts?: object): this is NodePath<t.Scopable>;
    isBlockParent(opts?: object): this is NodePath<t.BlockParent>;
    isBlock(opts?: object): this is NodePath<t.Block>;
    isStatement(opts?: object): this is NodePath<t.Statement>;
    isTerminatorless(opts?: object): this is NodePath<t.Terminatorless>;
    isCompletionStatement(opts?: object): this is NodePath<t.CompletionStatement>;
    isConditional(opts?: object): this is NodePath<t.Conditional>;
    isLoop(opts?: object): this is NodePath<t.Loop>;
    isWhile(opts?: object): this is NodePath<t.While>;
    isExpressionWrapper(opts?: object): this is NodePath<t.ExpressionWrapper>;
    isFor(opts?: object): this is NodePath<t.For>;
    isForXStatement(opts?: object): this is NodePath<t.ForXStatement>;
    isFunction(opts?: object): this is NodePath<t.Function>;
    isFunctionParent(opts?: object): this is NodePath<t.FunctionParent>;
    isPureish(opts?: object): this is NodePath<t.Pureish>;
    isDeclaration(opts?: object): this is NodePath<t.Declaration>;
    isLVal(opts?: object): this is NodePath<t.LVal>;
    isLiteral(opts?: object): this is NodePath<t.Literal>;
    isImmutable(opts?: object): this is NodePath<t.Immutable>;
    isUserWhitespacable(opts?: object): this is NodePath<t.UserWhitespacable>;
    isMethod(opts?: object): this is NodePath<t.Method>;
    isObjectMember(opts?: object): this is NodePath<t.ObjectMember>;
    isProperty(opts?: object): this is NodePath<t.Property>;
    isUnaryLike(opts?: object): this is NodePath<t.UnaryLike>;
    isPattern(opts?: object): this is NodePath<t.Pattern>;
    isClass(opts?: object): this is NodePath<t.Class>;
    isModuleDeclaration(opts?: object): this is NodePath<t.ModuleDeclaration>;
    isExportDeclaration(opts?: object): this is NodePath<t.ExportDeclaration>;
    isModuleSpecifier(opts?: object): this is NodePath<t.ModuleSpecifier>;
    isFlow(opts?: object): this is NodePath<t.Flow>;
    isFlowBaseAnnotation(opts?: object): this is NodePath<t.FlowBaseAnnotation>;
    isFlowDeclaration(opts?: object): this is NodePath<t.FlowDeclaration>;
    isJSX(opts?: object): this is NodePath<t.JSX>;
    isNumberLiteral(opts?: object): this is NodePath<t.NumericLiteral>;
    isRegexLiteral(opts?: object): this is NodePath<t.RegExpLiteral>;
    isReferencedIdentifier(opts?: object): this is NodePath<t.Identifier | t.JSXIdentifier>;
    isReferencedMemberExpression(opts?: object): this is NodePath<t.MemberExpression>;
    isBindingIdentifier(opts?: object): this is NodePath<t.Identifier>;
    isScope(opts?: object): this is NodePath<t.Scopable>;
    isReferenced(opts?: object): boolean;
    isBlockScoped(opts?: object): this is NodePath<t.FunctionDeclaration | t.ClassDeclaration | t.VariableDeclaration>;
    isVar(opts?: object): this is NodePath<t.VariableDeclaration>;
    isUser(opts?: object): boolean;
    isGenerated(opts?: object): boolean;
    isPure(opts?: object): boolean;

    // ------------------------- assertXXX -------------------------
    assertArrayExpression(opts?: object): void;
    assertAssignmentExpression(opts?: object): void;
    assertBinaryExpression(opts?: object): void;
    assertDirective(opts?: object): void;
    assertDirectiveLiteral(opts?: object): void;
    assertBlockStatement(opts?: object): void;
    assertBreakStatement(opts?: object): void;
    assertCallExpression(opts?: object): void;
    assertCatchClause(opts?: object): void;
    assertConditionalExpression(opts?: object): void;
    assertContinueStatement(opts?: object): void;
    assertDebuggerStatement(opts?: object): void;
    assertDoWhileStatement(opts?: object): void;
    assertEmptyStatement(opts?: object): void;
    assertExpressionStatement(opts?: object): void;
    assertFile(opts?: object): void;
    assertForInStatement(opts?: object): void;
    assertForStatement(opts?: object): void;
    assertFunctionDeclaration(opts?: object): void;
    assertFunctionExpression(opts?: object): void;
    assertIdentifier(opts?: object): void;
    assertIfStatement(opts?: object): void;
    assertLabeledStatement(opts?: object): void;
    assertStringLiteral(opts?: object): void;
    assertNumericLiteral(opts?: object): void;
    assertNullLiteral(opts?: object): void;
    assertBooleanLiteral(opts?: object): void;
    assertRegExpLiteral(opts?: object): void;
    assertLogicalExpression(opts?: object): void;
    assertMemberExpression(opts?: object): void;
    assertNewExpression(opts?: object): void;
    assertProgram(opts?: object): void;
    assertObjectExpression(opts?: object): void;
    assertObjectMethod(opts?: object): void;
    assertObjectProperty(opts?: object): void;
    assertRestElement(opts?: object): void;
    assertReturnStatement(opts?: object): void;
    assertSequenceExpression(opts?: object): void;
    assertSwitchCase(opts?: object): void;
    assertSwitchStatement(opts?: object): void;
    assertThisExpression(opts?: object): void;
    assertThrowStatement(opts?: object): void;
    assertTryStatement(opts?: object): void;
    assertUnaryExpression(opts?: object): void;
    assertUpdateExpression(opts?: object): void;
    assertVariableDeclaration(opts?: object): void;
    assertVariableDeclarator(opts?: object): void;
    assertWhileStatement(opts?: object): void;
    assertWithStatement(opts?: object): void;
    assertAssignmentPattern(opts?: object): void;
    assertArrayPattern(opts?: object): void;
    assertArrowFunctionExpression(opts?: object): void;
    assertClassBody(opts?: object): void;
    assertClassDeclaration(opts?: object): void;
    assertClassExpression(opts?: object): void;
    assertExportAllDeclaration(opts?: object): void;
    assertExportDefaultDeclaration(opts?: object): void;
    assertExportNamedDeclaration(opts?: object): void;
    assertExportSpecifier(opts?: object): void;
    assertForOfStatement(opts?: object): void;
    assertImportDeclaration(opts?: object): void;
    assertImportDefaultSpecifier(opts?: object): void;
    assertImportNamespaceSpecifier(opts?: object): void;
    assertImportSpecifier(opts?: object): void;
    assertMetaProperty(opts?: object): void;
    assertClassMethod(opts?: object): void;
    assertObjectPattern(opts?: object): void;
    assertSpreadElement(opts?: object): void;
    assertSuper(opts?: object): void;
    assertTaggedTemplateExpression(opts?: object): void;
    assertTemplateElement(opts?: object): void;
    assertTemplateLiteral(opts?: object): void;
    assertYieldExpression(opts?: object): void;
    assertAnyTypeAnnotation(opts?: object): void;
    assertArrayTypeAnnotation(opts?: object): void;
    assertBooleanTypeAnnotation(opts?: object): void;
    assertBooleanLiteralTypeAnnotation(opts?: object): void;
    assertNullLiteralTypeAnnotation(opts?: object): void;
    assertClassImplements(opts?: object): void;
    assertClassProperty(opts?: object): void;
    assertDeclareClass(opts?: object): void;
    assertDeclareFunction(opts?: object): void;
    assertDeclareInterface(opts?: object): void;
    assertDeclareModule(opts?: object): void;
    assertDeclareTypeAlias(opts?: object): void;
    assertDeclareVariable(opts?: object): void;
    assertExistentialTypeParam(opts?: object): void;
    assertFunctionTypeAnnotation(opts?: object): void;
    assertFunctionTypeParam(opts?: object): void;
    assertGenericTypeAnnotation(opts?: object): void;
    assertInterfaceExtends(opts?: object): void;
    assertInterfaceDeclaration(opts?: object): void;
    assertIntersectionTypeAnnotation(opts?: object): void;
    assertMixedTypeAnnotation(opts?: object): void;
    assertNullableTypeAnnotation(opts?: object): void;
    assertNumericLiteralTypeAnnotation(opts?: object): void;
    assertNumberTypeAnnotation(opts?: object): void;
    assertStringLiteralTypeAnnotation(opts?: object): void;
    assertStringTypeAnnotation(opts?: object): void;
    assertThisTypeAnnotation(opts?: object): void;
    assertTupleTypeAnnotation(opts?: object): void;
    assertTypeofTypeAnnotation(opts?: object): void;
    assertTypeAlias(opts?: object): void;
    assertTypeAnnotation(opts?: object): void;
    assertTypeCastExpression(opts?: object): void;
    assertTypeParameterDeclaration(opts?: object): void;
    assertTypeParameterInstantiation(opts?: object): void;
    assertObjectTypeAnnotation(opts?: object): void;
    assertObjectTypeCallProperty(opts?: object): void;
    assertObjectTypeIndexer(opts?: object): void;
    assertObjectTypeProperty(opts?: object): void;
    assertQualifiedTypeIdentifier(opts?: object): void;
    assertUnionTypeAnnotation(opts?: object): void;
    assertVoidTypeAnnotation(opts?: object): void;
    assertJSXAttribute(opts?: object): void;
    assertJSXClosingElement(opts?: object): void;
    assertJSXElement(opts?: object): void;
    assertJSXEmptyExpression(opts?: object): void;
    assertJSXExpressionContainer(opts?: object): void;
    assertJSXIdentifier(opts?: object): void;
    assertJSXMemberExpression(opts?: object): void;
    assertJSXNamespacedName(opts?: object): void;
    assertJSXOpeningElement(opts?: object): void;
    assertJSXSpreadAttribute(opts?: object): void;
    assertJSXText(opts?: object): void;
    assertNoop(opts?: object): void;
    assertParenthesizedExpression(opts?: object): void;
    assertAwaitExpression(opts?: object): void;
    assertBindExpression(opts?: object): void;
    assertDecorator(opts?: object): void;
    assertDoExpression(opts?: object): void;
    assertExportDefaultSpecifier(opts?: object): void;
    assertExportNamespaceSpecifier(opts?: object): void;
    assertRestProperty(opts?: object): void;
    assertSpreadProperty(opts?: object): void;
    assertExpression(opts?: object): void;
    assertBinary(opts?: object): void;
    assertScopable(opts?: object): void;
    assertBlockParent(opts?: object): void;
    assertBlock(opts?: object): void;
    assertStatement(opts?: object): void;
    assertTerminatorless(opts?: object): void;
    assertCompletionStatement(opts?: object): void;
    assertConditional(opts?: object): void;
    assertLoop(opts?: object): void;
    assertWhile(opts?: object): void;
    assertExpressionWrapper(opts?: object): void;
    assertFor(opts?: object): void;
    assertForXStatement(opts?: object): void;
    assertFunction(opts?: object): void;
    assertFunctionParent(opts?: object): void;
    assertPureish(opts?: object): void;
    assertDeclaration(opts?: object): void;
    assertLVal(opts?: object): void;
    assertLiteral(opts?: object): void;
    assertImmutable(opts?: object): void;
    assertUserWhitespacable(opts?: object): void;
    assertMethod(opts?: object): void;
    assertObjectMember(opts?: object): void;
    assertProperty(opts?: object): void;
    assertUnaryLike(opts?: object): void;
    assertPattern(opts?: object): void;
    assertClass(opts?: object): void;
    assertModuleDeclaration(opts?: object): void;
    assertExportDeclaration(opts?: object): void;
    assertModuleSpecifier(opts?: object): void;
    assertFlow(opts?: object): void;
    assertFlowBaseAnnotation(opts?: object): void;
    assertFlowDeclaration(opts?: object): void;
    assertJSX(opts?: object): void;
    assertNumberLiteral(opts?: object): void;
    assertRegexLiteral(opts?: object): void;
}

export class Hub {
    constructor(file: any, options: any);
    file: any;
    options: any;
}

export interface TraversalContext {
    parentPath: NodePath;
    scope: Scope;
    state: any;
    opts: any;
}
