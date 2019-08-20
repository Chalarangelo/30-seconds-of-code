import { ExpressionNode, NodeBase, StatementNode } from './shared/Node';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
import MagicString from 'magic-string';
export default class SwitchCase extends NodeBase {
    type: NodeType.SwitchCase;
    test: ExpressionNode | null;
    consequent: StatementNode[];
    includeInBundle(): boolean;
    render(code: MagicString, options: RenderOptions): void;
}
