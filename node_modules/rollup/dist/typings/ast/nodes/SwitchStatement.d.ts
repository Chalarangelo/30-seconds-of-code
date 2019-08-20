import SwitchCase from './SwitchCase';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Scope from '../scopes/Scope';
import { NodeType } from './NodeType';
import { ExpressionNode, StatementBase } from './shared/Node';
export default class SwitchStatement extends StatementBase {
    type: NodeType.SwitchStatement;
    discriminant: ExpressionNode;
    cases: SwitchCase[];
    hasEffects(options: ExecutionPathOptions): boolean;
    initialiseScope(parentScope: Scope): void;
}
