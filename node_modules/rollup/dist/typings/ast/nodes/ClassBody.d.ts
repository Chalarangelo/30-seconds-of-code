import { NodeBase } from './shared/Node';
import ExecutionPathOptions from '../ExecutionPathOptions';
import CallOptions from '../CallOptions';
import MethodDefinition from './MethodDefinition';
import { NodeType } from './NodeType';
import { ObjectPath } from '../values';
export default class ClassBody extends NodeBase {
    type: NodeType.ClassBody;
    body: MethodDefinition[];
    classConstructor: MethodDefinition | null;
    hasEffectsWhenCalledAtPath(path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
    initialiseNode(): void;
}
