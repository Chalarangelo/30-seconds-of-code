import { Node, walk } from 'estree-walker';
import extractAssignedNames from './extractAssignedNames';
import { AttachedScope, AttachScopes } from './pluginutils';

const blockDeclarations = {
	const: true,
	let: true
};

interface ScopeOptions {
	parent?: AttachedScope;
	block?: boolean;
	params?: Array<Node>;
}

class Scope implements AttachedScope {
	parent?: AttachedScope;
	isBlockScope: boolean;
	declarations: { [key: string]: boolean };

	constructor(options: ScopeOptions = {}) {
		this.parent = options.parent;
		this.isBlockScope = !!options.block;

		this.declarations = Object.create(null);

		if (options.params) {
			options.params.forEach(param => {
				extractAssignedNames(param).forEach(name => {
					this.declarations[name] = true;
				});
			});
		}
	}

	addDeclaration(node: Node, isBlockDeclaration: boolean, isVar: boolean): void {
		if (!isBlockDeclaration && this.isBlockScope) {
			// it's a `var` or function node, and this
			// is a block scope, so we need to go up
			this.parent!.addDeclaration(node, isBlockDeclaration, isVar);
		} else if (node.id) {
			extractAssignedNames(node.id).forEach(name => {
				this.declarations[name] = true;
			});
		}
	}

	contains(name: string): boolean {
		return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
	}
}

const attachScopes: AttachScopes = function attachScopes(ast, propertyName = 'scope') {
	let scope = new Scope();

	walk(ast, {
		enter(node, parent) {
			// function foo () {...}
			// class Foo {...}
			if (/(Function|Class)Declaration/.test(node.type)) {
				scope.addDeclaration(node, false, false);
			}

			// var foo = 1
			if (node.type === 'VariableDeclaration') {
				const kind: keyof typeof blockDeclarations = node.kind;
				const isBlockDeclaration = blockDeclarations[kind];

				node.declarations.forEach((declaration: Node) => {
					scope.addDeclaration(declaration, isBlockDeclaration, true);
				});
			}

			let newScope: AttachedScope | undefined;

			// create new function scope
			if (/Function/.test(node.type)) {
				newScope = new Scope({
					parent: scope,
					block: false,
					params: node.params
				});

				// named function expressions - the name is considered
				// part of the function's scope
				if (node.type === 'FunctionExpression' && node.id) {
					newScope.addDeclaration(node, false, false);
				}
			}

			// create new block scope
			if (node.type === 'BlockStatement' && !/Function/.test(parent!.type)) {
				newScope = new Scope({
					parent: scope,
					block: true
				});
			}

			// catch clause has its own block scope
			if (node.type === 'CatchClause') {
				newScope = new Scope({
					parent: scope,
					params: [node.param],
					block: true
				});
			}

			if (newScope) {
				Object.defineProperty(node, propertyName, {
					value: newScope,
					configurable: true
				});

				scope = newScope;
			}
		},
		leave(node) {
			if (node[propertyName]) scope = scope.parent!;
		}
	});

	return scope;
};

export { attachScopes as default };
