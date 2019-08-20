import AssignmentProperty from './AssignmentProperty';
import Scope from '../scopes/Scope';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { ExpressionEntity } from './shared/Expression';
import { PatternNode } from './shared/Pattern';
import { NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import { ObjectPath } from '../values';
export default class ObjectPattern extends NodeBase implements PatternNode {
    type: NodeType.ObjectPattern;
    properties: AssignmentProperty[];
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    initialiseAndDeclare(parentScope: Scope, kind: string, init: ExpressionEntity | null): void;
}
