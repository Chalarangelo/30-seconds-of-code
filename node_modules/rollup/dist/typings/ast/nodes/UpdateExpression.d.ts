import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, NodeBase } from './shared/Node';
import { ObjectPath } from '../values';
export default class UpdateExpression extends NodeBase {
    type: NodeType.UpdateExpression;
    operator: '++' | '--' | '**';
    argument: ExpressionNode;
    prefix: boolean;
    bindNode(): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
}
