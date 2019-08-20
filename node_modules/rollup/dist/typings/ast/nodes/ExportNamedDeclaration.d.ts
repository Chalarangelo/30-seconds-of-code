import { NodeBase } from './shared/Node';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Literal from './Literal';
import MagicString from 'magic-string';
import ExportSpecifier from './ExportSpecifier';
import FunctionDeclaration from './FunctionDeclaration';
import ClassDeclaration from './ClassDeclaration';
import VariableDeclaration from './VariableDeclaration';
import { NodeType } from './NodeType';
import { NodeRenderOptions, RenderOptions } from '../../utils/renderHelpers';
export default class ExportNamedDeclaration extends NodeBase {
    type: NodeType.ExportNamedDeclaration;
    declaration: FunctionDeclaration | ClassDeclaration | VariableDeclaration | null;
    specifiers: ExportSpecifier[];
    source: Literal<string> | null;
    needsBoundaries: true;
    isExportDeclaration: true;
    bindChildren(): void;
    hasEffects(options: ExecutionPathOptions): boolean;
    render(code: MagicString, options: RenderOptions, {start, end}?: NodeRenderOptions): void;
}
