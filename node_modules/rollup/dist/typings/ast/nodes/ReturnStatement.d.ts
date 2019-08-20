import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, StatementBase } from './shared/Node';
export default class ReturnStatement extends StatementBase {
    type: NodeType.ReturnStatement;
    argument: ExpressionNode | null;
    hasEffects(options: ExecutionPathOptions): boolean;
    initialiseNode(): void;
}
