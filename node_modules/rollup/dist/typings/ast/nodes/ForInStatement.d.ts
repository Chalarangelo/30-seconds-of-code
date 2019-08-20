import VariableDeclaration from './VariableDeclaration';
import Scope from '../scopes/Scope';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { PatternNode } from './shared/Pattern';
import { NodeType } from './NodeType';
import { ExpressionNode, Node, StatementBase, StatementNode } from './shared/Node';
import MagicString from 'magic-string';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isForInStatement(node: Node): node is ForInStatement;
export default class ForInStatement extends StatementBase {
    type: NodeType.ForInStatement;
    left: VariableDeclaration | PatternNode;
    right: ExpressionNode;
    body: StatementNode;
    hasEffects(options: ExecutionPathOptions): boolean;
    initialiseChildren(): void;
    includeInBundle(): boolean;
    initialiseScope(parentScope: Scope): void;
    render(code: MagicString, options: RenderOptions): void;
}
