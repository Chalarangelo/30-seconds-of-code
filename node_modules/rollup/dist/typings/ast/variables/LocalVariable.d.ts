import Variable from './Variable';
import VariableReassignmentTracker from './VariableReassignmentTracker';
import ExecutionPathOptions from '../ExecutionPathOptions';
import CallOptions from '../CallOptions';
import Identifier from '../nodes/Identifier';
import ExportDefaultDeclaration from '../nodes/ExportDefaultDeclaration';
import { ExpressionEntity, ForEachReturnExpressionCallback, SomeReturnExpressionCallback } from '../nodes/shared/Expression';
import { ObjectPath } from '../values';
export default class LocalVariable extends Variable {
    declarations: Set<Identifier | ExportDefaultDeclaration>;
    boundExpressions: VariableReassignmentTracker;
    constructor(name: string, declarator: Identifier | ExportDefaultDeclaration | null, init: ExpressionEntity);
    addDeclaration(identifier: Identifier): void;
    forEachReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, callback: ForEachReturnExpressionCallback, options: ExecutionPathOptions): void;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    includeVariable(): boolean;
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    someReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
}
