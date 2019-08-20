import MagicString from 'magic-string';
import Scope from '../scopes/Scope';
import { StatementBase } from './shared/Node';
import { RenderOptions } from '../../utils/renderHelpers';
export default class ExpressionStatement extends StatementBase {
    directive?: string;
    initialiseNode(_parentScope: Scope): void;
    shouldBeIncluded(): boolean;
    render(code: MagicString, options: RenderOptions): void;
}
