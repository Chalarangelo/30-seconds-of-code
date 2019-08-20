import ExecutionPathOptions from '../ExecutionPathOptions';
import Scope from '../scopes/Scope';
import { PatternNode } from './shared/Pattern';
import { ExpressionEntity } from './shared/Expression';
import { ExpressionNode, NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import { ObjectPath } from '../values';
export default class AssignmentPattern extends NodeBase implements PatternNode {
    type: NodeType.AssignmentPattern;
    left: PatternNode;
    right: ExpressionNode;
    bindNode(): void;
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    initialiseAndDeclare(parentScope: Scope, kind: string, init: ExpressionEntity | null): void;
}
