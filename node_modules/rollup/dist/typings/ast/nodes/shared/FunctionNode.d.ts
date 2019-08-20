import FunctionScope from '../../scopes/FunctionScope';
import BlockScope from '../../scopes/FunctionScope';
import BlockStatement from '../BlockStatement';
import Identifier from '../Identifier';
import CallOptions from '../../CallOptions';
import ExecutionPathOptions from '../../ExecutionPathOptions';
import { PatternNode } from './Pattern';
import { ForEachReturnExpressionCallback, SomeReturnExpressionCallback } from './Expression';
import { NodeBase } from './Node';
import { ObjectPath } from '../../values';
export default class FunctionNode extends NodeBase {
    id: Identifier;
    body: BlockStatement;
    scope: BlockScope;
    params: PatternNode[];
    bindNode(): void;
    forEachReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, callback: ForEachReturnExpressionCallback, options: ExecutionPathOptions): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    hasEffectsWhenAccessedAtPath(path: ObjectPath): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    includeInBundle(): boolean;
    initialiseScope(parentScope: FunctionScope): void;
    someReturnExpressionWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
}
