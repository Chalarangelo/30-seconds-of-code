import MagicString from 'magic-string';
import { NodeBase, StatementNode } from './shared/Node';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
export default class Program extends NodeBase {
    type: NodeType.Program;
    body: StatementNode[];
    render(code: MagicString, options: RenderOptions): void;
}
