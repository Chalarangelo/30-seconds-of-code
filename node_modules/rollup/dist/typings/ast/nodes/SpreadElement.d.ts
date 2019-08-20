import { ExpressionNode } from './shared/Node';
import { NodeType } from './NodeType';
export default interface SpreadElement extends ExpressionNode {
    type: NodeType.SpreadElement;
    argument: ExpressionNode;
}
