import CallOptions from '../CallOptions';
import ExecutionPathOptions from '../ExecutionPathOptions';
import SpreadElement from './SpreadElement';
import { ForEachReturnExpressionCallback, SomeReturnExpressionCallback } from './shared/Expression';
import { NodeType } from './NodeType';
import { ExpressionNode, NodeBase } from './shared/Node';
import { ObjectPath } from '../values';
export default class CallExpression extends NodeBase {
    type: NodeType.CallExpression;
    callee: ExpressionNode;
    arguments: (ExpressionNode | SpreadElement)[];
    private _callOptions;
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    bindNode(): void;
    forEachReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, callback: ForEachReturnExpressionCallback, options: ExecutionPathOptions): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    initialiseNode(): void;
    someReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
}
