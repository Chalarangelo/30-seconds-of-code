import TemplateElement from './TemplateElement';
import MagicString from 'magic-string';
import { ExpressionNode, Node, NodeBase } from './shared/Node';
import { NodeType } from './NodeType';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isTemplateLiteral(node: Node): node is TemplateLiteral;
export default class TemplateLiteral extends NodeBase {
    type: NodeType.TemplateLiteral;
    quasis: TemplateElement[];
    expressions: ExpressionNode[];
    render(code: MagicString, options: RenderOptions): void;
}
