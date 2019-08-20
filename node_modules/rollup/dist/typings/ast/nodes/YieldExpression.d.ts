import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, NodeBase } from './shared/Node';
export default class YieldExpression extends NodeBase {
    type: NodeType.YieldExpression;
    argument: ExpressionNode | null;
    delegate: boolean;
    hasEffects(options: ExecutionPathOptions): boolean;
}
