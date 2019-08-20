import { NodeBase } from './shared/Node';
import CatchScope from '../scopes/CatchScope';
import BlockStatement from './BlockStatement';
import Scope from '../scopes/Scope';
import { PatternNode } from './shared/Pattern';
import { NodeType } from './NodeType';
export default class CatchClause extends NodeBase {
    type: NodeType.CatchClause;
    param: PatternNode;
    body: BlockStatement;
    scope: CatchScope;
    initialiseChildren(): void;
    initialiseScope(parentScope: Scope): void;
}
