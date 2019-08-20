import Scope from '../../scopes/Scope';
import CallOptions from '../../CallOptions';
import ExecutionPathOptions from '../../ExecutionPathOptions';
import Identifier from '../Identifier';
import ClassBody from '../ClassBody';
import { ExpressionNode, NodeBase } from './Node';
import { ObjectPath } from '../../values';
export default class ClassNode extends NodeBase {
    body: ClassBody;
    superClass: ExpressionNode | null;
    id: Identifier | null;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    initialiseChildren(_parentScope: Scope): void;
    initialiseScope(parentScope: Scope): void;
}
