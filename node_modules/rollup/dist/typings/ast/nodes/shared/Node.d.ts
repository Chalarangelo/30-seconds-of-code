import ExecutionPathOptions from '../../ExecutionPathOptions';
import Scope from '../../scopes/Scope';
import Module from '../../../Module';
import MagicString from 'magic-string';
import Variable from '../../variables/Variable';
import { ExpressionEntity, ForEachReturnExpressionCallback, SomeReturnExpressionCallback } from './Expression';
import CallOptions from '../../CallOptions';
import { ObjectPath } from '../../values';
import { Entity } from '../../Entity';
import { NodeRenderOptions, RenderOptions } from '../../../utils/renderHelpers';
export interface Node extends Entity {
    end: number;
    included: boolean;
    keys: string[];
    module: Module;
    needsBoundaries?: boolean;
    parent: Node | {
        type?: string;
    };
    start: number;
    type: string;
    variable?: Variable;
    __enhanced: boolean;
    /**
     * Called once all nodes have been initialised and the scopes have been populated.
     * Usually one should not override this function but override bindNode and/or
     * bindChildren instead.
     */
    bind(): void;
    eachChild(callback: (node: Node) => void): void;
    /**
     * Determine if this Node would have an effect on the bundle.
     * This is usually true for already included nodes. Exceptions are e.g. break statements
     * which only have an effect if their surrounding loop or switch statement is included.
     * The options pass on information like this about the current execution path.
     */
    hasEffects(options: ExecutionPathOptions): boolean;
    /**
     * Includes the node in the bundle. Children are usually included if they are
     * necessary for this node (e.g. a function body) or if they have effects.
     * Necessary variables need to be included as well. Should return true if any
     * nodes or variables have been added that were missing before.
     */
    includeInBundle(): boolean;
    /**
     * Alternative version of includeInBundle to override the default behaviour of
     * declarations to only include nodes for declarators that have an effect. Necessary
     * for for-loops that do not use a declared loop variable.
     */
    includeWithAllDeclaredVariables(): boolean;
    /**
     * Assign a scope to this node and make sure all children have the right scopes.
     * Perform any additional initialisation that does not depend on the scope being
     * populated with variables.
     * Usually one should not override this function but override initialiseScope,
     * initialiseNode and/or initialiseChildren instead. BlockScopes have a special
     * alternative initialisation initialiseAndReplaceScope.
     */
    initialise(parentScope: Scope): void;
    initialiseAndDeclare(parentScope: Scope, kind: string, init: ExpressionEntity | null): void;
    render(code: MagicString, options: RenderOptions, nodeRenderOptions?: NodeRenderOptions): void;
    /**
     * Start a new execution path to determine if this node has an effect on the bundle and
     * should therefore be included. Included nodes should always be included again in subsequent
     * visits as the inclusion of additional variables may require the inclusion of more child
     * nodes in e.g. block statements.
     */
    shouldBeIncluded(): boolean;
    someChild(callback: (node: Node) => boolean): boolean;
}
export interface StatementNode extends Node {
}
export interface ExpressionNode extends ExpressionEntity, Node {
}
export declare class NodeBase implements ExpressionNode {
    type: string;
    keys: string[];
    included: boolean;
    scope: Scope;
    start: number;
    end: number;
    module: Module;
    parent: Node | {
        type?: string;
    };
    __enhanced: boolean;
    constructor();
    bind(): void;
    /**
     * Override to control on which children "bind" is called.
     */
    bindChildren(): void;
    /**
     * Override this to bind assignments to variables and do any initialisations that
     * require the scopes to be populated with variables.
     */
    bindNode(): void;
    eachChild(callback: (node: Node) => void): void;
    forEachReturnExpressionWhenCalledAtPath(_path: ObjectPath, _callOptions: CallOptions, _callback: ForEachReturnExpressionCallback, _options: ExecutionPathOptions): void;
    getValue(): {
        toString: () => string;
    };
    hasEffects(options: ExecutionPathOptions): boolean;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenAssignedAtPath(_path: ObjectPath, _options: ExecutionPathOptions): boolean;
    hasEffectsWhenCalledAtPath(_path: ObjectPath, _callOptions: CallOptions, _options: ExecutionPathOptions): boolean;
    private hasIncludedChild();
    includeInBundle(): boolean;
    includeWithAllDeclaredVariables(): boolean;
    initialise(parentScope: Scope): void;
    initialiseAndDeclare(_parentScope: Scope, _kind: string, _init: ExpressionEntity | null): void;
    /**
     * Override to change how and with what scopes children are initialised
     */
    initialiseChildren(_parentScope: Scope): void;
    /**
     * Override to perform special initialisation steps after the scope is initialised
     */
    initialiseNode(_parentScope: Scope): void;
    /**
     * Override if this scope should receive a different scope than the parent scope.
     */
    initialiseScope(parentScope: Scope): void;
    insertSemicolon(code: MagicString): void;
    locate(): any;
    reassignPath(_path: ObjectPath, _options: ExecutionPathOptions): void;
    render(code: MagicString, options: RenderOptions): void;
    shouldBeIncluded(): boolean;
    someChild(callback: (node: NodeBase) => boolean): boolean;
    someReturnExpressionWhenCalledAtPath(_path: ObjectPath, _callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
    toString(): string;
}
export { NodeBase as StatementBase };
