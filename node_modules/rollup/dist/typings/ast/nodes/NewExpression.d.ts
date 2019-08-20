import CallOptions from '../CallOptions';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { ExpressionNode, NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import { ObjectPath } from '../values';
export default class NewExpression extends NodeBase {
    type: NodeType.NewExpression;
    callee: ExpressionNode;
    arguments: ExpressionNode[];
    _callOptions: CallOptions;
    hasEffects(options: ExecutionPathOptions): boolean;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    initialiseNode(): void;
}
