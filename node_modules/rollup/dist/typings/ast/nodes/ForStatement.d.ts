import VariableDeclaration from './VariableDeclaration';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Scope from '../scopes/Scope';
import { NodeType } from './NodeType';
import { ExpressionNode, Node, StatementBase, StatementNode } from './shared/Node';
import MagicString from 'magic-string';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isForStatement(node: Node): node is ForStatement;
export default class ForStatement extends StatementBase {
    type: NodeType.ForStatement;
    init: VariableDeclaration | ExpressionNode | null;
    test: ExpressionNode | null;
    update: ExpressionNode | null;
    body: StatementNode;
    hasEffects(options: ExecutionPathOptions): boolean;
    initialiseChildren(): void;
    initialiseScope(parentScope: Scope): void;
    render(code: MagicString, options: RenderOptions): void;
}
