import ThisVariable from '../variables/ThisVariable';
import ExecutionPathOptions from '../ExecutionPathOptions';
import MagicString from 'magic-string';
import { NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
import { ObjectPath } from '../values';
export default class ThisExpression extends NodeBase {
    type: NodeType.ThisExpression;
    variable: ThisVariable;
    alias: string;
    initialiseNode(): void;
    bindNode(): void;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(path: ObjectPath, options: ExecutionPathOptions): boolean;
    render(code: MagicString, _options: RenderOptions): void;
}
