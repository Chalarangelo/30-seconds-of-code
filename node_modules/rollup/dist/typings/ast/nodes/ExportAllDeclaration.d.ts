import { NodeBase } from './shared/Node';
import Literal from './Literal';
import MagicString from 'magic-string';
import { NodeType } from './NodeType';
import { NodeRenderOptions, RenderOptions } from '../../utils/renderHelpers';
export default class ExportAllDeclaration extends NodeBase {
    type: NodeType.ExportAllDeclaration;
    source: Literal<string>;
    isExportDeclaration: true;
    needsBoundaries: true;
    render(code: MagicString, _options: RenderOptions, {start, end}?: NodeRenderOptions): void;
}
