import MagicString from 'magic-string';
import { NodeType } from './NodeType';
import { StatementBase } from './shared/Node';
import { RenderOptions } from '../../utils/renderHelpers';
export default class EmptyStatement extends StatementBase {
    type: NodeType.EmptyStatement;
    render(code: MagicString, _options: RenderOptions): void;
}
