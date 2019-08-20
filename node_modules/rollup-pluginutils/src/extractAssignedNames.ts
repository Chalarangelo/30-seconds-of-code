import { Node } from 'estree-walker';

interface Extractors {
	[key: string]: (names: Array<string>, param: Node) => void;
}

const extractors: Extractors = {
	ArrayPattern(names: Array<string>, param: Node) {
		for (const element of param.elements) {
			if (element) extractors[element.type](names, element);
		}
	},

	AssignmentPattern(names: Array<string>, param: Node) {
		extractors[param.left.type](names, param.left);
	},

	Identifier(names: Array<string>, param: Node) {
		names.push(param.name);
	},

	MemberExpression() {},

	ObjectPattern(names: Array<string>, param: Node) {
		for (const prop of param.properties) {
			if (prop.type === 'RestElement') {
				extractors.RestElement(names, prop);
			} else {
				extractors[prop.value.type](names, prop.value);
			}
		}
	},

	RestElement(names: Array<string>, param: Node) {
		extractors[param.argument.type](names, param.argument);
	}
};

const extractAssignedNames = function extractAssignedNames(param: Node): Array<string> {
	const names: Array<string> = [];

	extractors[param.type](names, param);
	return names;
};

export { extractAssignedNames as default };
