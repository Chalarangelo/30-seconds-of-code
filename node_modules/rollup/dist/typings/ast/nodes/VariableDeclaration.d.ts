import { Node, NodeBase } from './shared/Node';
import ExecutionPathOptions from '../ExecutionPathOptions';
import VariableDeclarator from './VariableDeclarator';
import MagicString from 'magic-string';
import { NodeType } from './NodeType';
import { NodeRenderOptions, RenderOptions } from '../../utils/renderHelpers';
import { ObjectPath } from '../values';
export declare function isVariableDeclaration(node: Node): node is VariableDeclaration;
export default class VariableDeclaration extends NodeBase {
    type: NodeType.VariableDeclaration;
    declarations: VariableDeclarator[];
    kind: 'var' | 'let' | 'const';
    reassignPath(_path: ObjectPath, _options: ExecutionPathOptions): void;
    hasEffectsWhenAssignedAtPath(_path: ObjectPath, _options: ExecutionPathOptions): boolean;
    includeWithAllDeclaredVariables(): boolean;
    includeInBundle(): boolean;
    initialiseChildren(): void;
    render(code: MagicString, options: RenderOptions, nodeRenderOptions?: NodeRenderOptions): void;
    private renderReplacedDeclarations(code, options, {start, end, isNoStatement});
    private renderDeclarationEnd(code, separatorString, lastSeparatorPos, actualContentEnd, renderedContentEnd, addSemicolon);
}
