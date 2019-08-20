import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, StatementBase, StatementNode } from './shared/Node';
export default class WhileStatement extends StatementBase {
    type: NodeType.WhileStatement;
    test: ExpressionNode;
    body: StatementNode;
    hasEffects(options: ExecutionPathOptions): boolean;
}
