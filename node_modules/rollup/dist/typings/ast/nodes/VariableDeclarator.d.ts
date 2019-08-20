import { ExpressionNode, NodeBase } from './shared/Node';
import Scope from '../scopes/Scope';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { PatternNode } from './shared/Pattern';
import { NodeType } from './NodeType';
import { ObjectPath } from '../values';
export default class VariableDeclarator extends NodeBase {
    type: NodeType.VariableDeclarator;
    id: PatternNode;
    init: ExpressionNode | null;
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    initialiseDeclarator(parentScope: Scope, kind: string): void;
}
