import { ObjectPath, PathCallback, PathPredicate } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { ExpressionEntity } from '../nodes/shared/Expression';
export default class VariableReassignmentTracker {
    private _initialExpression;
    private _reassignedPathTracker;
    constructor(initialExpression: ExpressionEntity);
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    forEachAtPath(path: ObjectPath, callback: PathCallback): void;
    someAtPath(path: ObjectPath, predicateFunction: PathPredicate): boolean;
}
