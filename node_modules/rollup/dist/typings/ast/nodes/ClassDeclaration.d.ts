import ClassNode from './shared/ClassNode';
import Scope from '../scopes/Scope';
import Identifier from './Identifier';
import MagicString from 'magic-string';
import { NodeType } from './NodeType';
import { Node } from './shared/Node';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isClassDeclaration(node: Node): node is ClassDeclaration;
export default class ClassDeclaration extends ClassNode {
    type: NodeType.ClassDeclaration;
    id: Identifier;
    initialiseChildren(parentScope: Scope): void;
    render(code: MagicString, options: RenderOptions): void;
}
