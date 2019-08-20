import LocalVariable from './LocalVariable';
import { ObjectPath } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import CallOptions from '../CallOptions';
import Identifier from '../nodes/Identifier';
import { ExpressionEntity, SomeReturnExpressionCallback } from '../nodes/shared/Expression';
export default class ReplaceableInitializationVariable extends LocalVariable {
    constructor(name: string, declarator: Identifier | null);
    hasEffectsWhenAccessedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    someReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
    _getInit(options: ExecutionPathOptions): ExpressionEntity;
}
