import { PatternNode } from './shared/Pattern';
import { ExpressionNode } from './shared/Node';
import { NodeType } from './NodeType';
export default interface AssignmentProperty extends PatternNode {
    type: NodeType.Property;
    value: PatternNode;
    key: ExpressionNode;
    kind: 'init';
    method: false;
}
