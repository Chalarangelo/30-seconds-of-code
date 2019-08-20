import ExecutionPathOptions from '../ExecutionPathOptions';
import { ExpressionNode, StatementNode, StatementBase } from './shared/Node';
import { NodeType } from './NodeType';
export default class DoWhileStatement extends StatementBase {
    type: NodeType.DoWhileStatement;
    body: StatementNode;
    test: ExpressionNode;
    hasEffects(options: ExecutionPathOptions): boolean;
}
