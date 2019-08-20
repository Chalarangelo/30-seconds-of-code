import { ObjectPath } from '../values';
import CallOptions from '../CallOptions';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Identifier from '../nodes/Identifier';
import { ExpressionEntity, ForEachReturnExpressionCallback, SomeReturnExpressionCallback } from '../nodes/shared/Expression';
export default class Variable implements ExpressionEntity {
    exportName?: string;
    included: boolean;
    isExternal?: boolean;
    isGlobal?: boolean;
    isDefault?: boolean;
    isNamespace?: boolean;
    isReassigned: boolean;
    isId: boolean;
    name: string;
    reexported?: boolean;
    safeName: string;
    constructor(name: string);
    /**
     * Binds identifiers that reference this variable to this variable.
     * Necessary to be able to change variable names.
     */
    addReference(_identifier: Identifier): void;
    reassignPath(_path: ObjectPath, _options: ExecutionPathOptions): void;
    forEachReturnExpressionWhenCalledAtPath(_path: ObjectPath, _callOptions: CallOptions, _callback: ForEachReturnExpressionCallback, _options: ExecutionPathOptions): void;
    getName(reset?: boolean): string;
    getValue(): {
        toString: () => string;
    };
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(_path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(_path: ObjectPath, _callOptions: CallOptions, _options: ExecutionPathOptions): boolean;
    /**
     * Marks this variable as being part of the bundle, which is usually the case when one of
     * its identifiers becomes part of the bundle. Returns true if it has not been included
     * previously.
     * Once a variable is included, it should take care all its declarations are included.
     */
    includeVariable(): boolean;
    someReturnExpressionWhenCalledAtPath(_path: ObjectPath, _callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
    toString(): string;
    setSafeName(name: string): void;
}
