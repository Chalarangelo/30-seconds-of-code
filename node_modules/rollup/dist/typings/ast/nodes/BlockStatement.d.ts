import ExecutionPathOptions from '../ExecutionPathOptions';
import Scope from '../scopes/Scope';
import MagicString from 'magic-string';
import { Node, StatementBase, StatementNode } from './shared/Node';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isBlockStatement(node: Node): node is BlockStatement;
export default class BlockStatement extends StatementBase {
    type: NodeType.BlockStatement;
    scope: Scope;
    body: StatementNode[];
    bindImplicitReturnExpressionToScope(): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    includeInBundle(): boolean;
    initialiseAndReplaceScope(scope: Scope): void;
    initialiseChildren(_parentScope: Scope): void;
    initialiseScope(parentScope: Scope): void;
    render(code: MagicString, options: RenderOptions): void;
}
