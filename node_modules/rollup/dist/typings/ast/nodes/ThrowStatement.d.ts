import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, StatementBase } from './shared/Node';
export default class ThrowStatement extends StatementBase {
    type: NodeType.ThrowStatement;
    argument: ExpressionNode;
    hasEffects(_options: ExecutionPathOptions): boolean;
}
