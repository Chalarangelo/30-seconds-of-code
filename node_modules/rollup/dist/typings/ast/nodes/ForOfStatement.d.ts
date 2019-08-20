import ExecutionPathOptions from '../ExecutionPathOptions';
import VariableDeclaration from './VariableDeclaration';
import Scope from '../scopes/Scope';
import { PatternNode } from './shared/Pattern';
import { NodeType } from './NodeType';
import { ExpressionNode, Node, StatementBase, StatementNode } from './shared/Node';
import MagicString from 'magic-string';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isForOfStatement(node: Node): node is ForOfStatement;
export default class ForOfStatement extends StatementBase {
    type: NodeType.ForOfStatement;
    left: VariableDeclaration | PatternNode;
    right: ExpressionNode;
    body: StatementNode;
    bindNode(): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    includeInBundle(): boolean;
    initialiseChildren(): void;
    initialiseScope(parentScope: Scope): void;
    render(code: MagicString, options: RenderOptions): void;
}
