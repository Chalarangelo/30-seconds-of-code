import SpreadElement from './SpreadElement';
import { SomeReturnExpressionCallback } from './shared/Expression';
import { ExpressionNode, NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import CallOptions from '../CallOptions';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { ObjectPath } from '../values';
export default class ArrayExpression extends NodeBase {
    type: NodeType.ArrayExpression;
    elements: (ExpressionNode | SpreadElement | null)[];
    hasEffectsWhenAccessedAtPath(path: ObjectPath): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    someReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
}
