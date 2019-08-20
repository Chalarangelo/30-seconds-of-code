import { ObjectPath } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Scope from '../scopes/Scope';
import { PatternNode } from './shared/Pattern';
import { ExpressionEntity } from './shared/Expression';
import { NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
export default class RestElement extends NodeBase implements PatternNode {
    type: NodeType.RestElement;
    argument: PatternNode;
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    initialiseAndDeclare(parentScope: Scope, kind: string, _init: ExpressionEntity | null): void;
}
