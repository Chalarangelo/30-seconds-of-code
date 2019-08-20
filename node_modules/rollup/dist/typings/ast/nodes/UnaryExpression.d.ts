import { ObjectPath } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, NodeBase } from './shared/Node';
export default class UnaryExpression extends NodeBase {
    type: NodeType.UnaryExpression;
    operator: '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete';
    prefix: boolean;
    argument: ExpressionNode;
    value: any;
    bindNode(): void;
    getValue(): any;
    hasEffects(options: ExecutionPathOptions): boolean;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    initialiseNode(): void;
}
