import Scope from '../scopes/Scope';
import { ExpressionNode, StatementBase, StatementNode } from './shared/Node';
import MagicString from 'magic-string';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
export default class IfStatement extends StatementBase {
    type: NodeType.IfStatement;
    test: ExpressionNode;
    consequent: StatementNode;
    alternate: StatementNode | null;
    private testValue;
    private hoistedVars?;
    initialiseChildren(parentScope: Scope): void;
    initialiseNode(): void;
    render(code: MagicString, options: RenderOptions): void;
    shouldBeIncluded(): boolean;
}
