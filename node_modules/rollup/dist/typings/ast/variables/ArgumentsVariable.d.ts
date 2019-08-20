import LocalVariable from './LocalVariable';
import { ObjectPath } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import CallOptions from '../CallOptions';
import ParameterVariable from './ParameterVariable';
import { SomeReturnExpressionCallback } from '../nodes/shared/Expression';
export default class ArgumentsVariable extends LocalVariable {
    private _parameters;
    constructor(parameters: ParameterVariable[]);
    reassignPath(path: ObjectPath, options: ExecutionPathOptions): void;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    someReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
}
