import ExecutionPathOptions from '../ExecutionPathOptions';
import MagicString from 'magic-string';
import { SomeReturnExpressionCallback } from './shared/Expression';
import { Node, NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import CallOptions from '../CallOptions';
import { ObjectPath } from '../values';
import { RenderOptions } from '../../utils/renderHelpers';
export declare type LiteralValueTypes = string | boolean | null | number | RegExp;
export declare function isLiteral(node: Node): node is Literal;
export default class Literal<T = LiteralValueTypes> extends NodeBase {
    type: NodeType.Literal;
    value: T;
    private members;
    getValue(): T;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    initialiseNode(): void;
    render(code: MagicString, _options: RenderOptions): void;
    someReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
}
