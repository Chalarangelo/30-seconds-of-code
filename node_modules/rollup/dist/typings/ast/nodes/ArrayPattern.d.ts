import { ObjectPath } from '../values';
import Scope from '../scopes/Scope';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { PatternNode } from './shared/Pattern';
import { ExpressionEntity } from './shared/Expression';
import { NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
export default class ArrayPattern extends NodeBase implements PatternNode {
    type: NodeType.ArrayPattern;
    elements: (PatternNode | null)[];
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    initialiseAndDeclare(parentScope: Scope, kind: string, _init: ExpressionEntity | null): void;
}
