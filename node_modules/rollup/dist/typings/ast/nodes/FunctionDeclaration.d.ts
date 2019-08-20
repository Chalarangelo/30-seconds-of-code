import FunctionNode from './shared/FunctionNode';
import Scope from '../scopes/Scope';
import { NodeType } from './NodeType';
import { Node } from './shared/Node';
export declare function isFunctionDeclaration(node: Node): node is FunctionDeclaration;
export default class FunctionDeclaration extends FunctionNode {
    type: NodeType.FunctionDeclaration;
    initialiseChildren(parentScope: Scope): void;
}
