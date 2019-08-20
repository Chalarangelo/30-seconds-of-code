import ExecutionPathOptions from '../ExecutionPathOptions';
import { PatternNode } from './shared/Pattern';
import { ExpressionNode, NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import { ObjectPath } from '../values';
export default class AssignmentExpression extends NodeBase {
    type: NodeType.AssignmentExpression;
    left: PatternNode | ExpressionNode;
    right: ExpressionNode;
    bindNode(): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
}
