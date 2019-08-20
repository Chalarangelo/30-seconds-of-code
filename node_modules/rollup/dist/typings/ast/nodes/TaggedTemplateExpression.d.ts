import TemplateLiteral from './TemplateLiteral';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, NodeBase } from './shared/Node';
export default class TaggedTemplateExpression extends NodeBase {
    type: NodeType.TaggedTemplateExpression;
    tag: ExpressionNode;
    quasi: TemplateLiteral;
    private _callOptions;
    bindNode(): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    initialiseNode(): void;
}
