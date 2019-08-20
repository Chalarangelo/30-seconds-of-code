import LocalVariable from '../variables/LocalVariable';
import ExportDefaultVariable from '../variables/ExportDefaultVariable';
import Identifier from '../nodes/Identifier';
import ExportDefaultDeclaration from '../nodes/ExportDefaultDeclaration';
import GlobalVariable from '../variables/GlobalVariable';
import ThisVariable from '../variables/ThisVariable';
import ArgumentsVariable from '../variables/ArgumentsVariable';
import Variable from '../variables/Variable';
import { ExpressionEntity } from '../nodes/shared/Expression';
import ExternalVariable from '../variables/ExternalVariable';
export default class Scope {
    parent: Scope | void;
    variables: {
        this: ThisVariable | LocalVariable;
        default: ExportDefaultVariable;
        arguments: ArgumentsVariable;
        [name: string]: LocalVariable | GlobalVariable | ExternalVariable | ArgumentsVariable;
    };
    isModuleScope: boolean;
    children: Scope[];
    constructor(options?: {
        parent?: Scope;
        isModuleScope?: boolean;
    });
    /**
     * @param identifier
     * @param {Object} [options] - valid options are
     *        {(Node|null)} init
     *        {boolean} isHoisted
     * @return {Variable}
     */
    addDeclaration(identifier: Identifier, options?: {
        init?: ExpressionEntity | null;
        isHoisted?: boolean;
    }): LocalVariable | GlobalVariable | ExternalVariable | ArgumentsVariable;
    addExportDefaultDeclaration(name: string, exportDefaultDeclaration: ExportDefaultDeclaration): ExportDefaultVariable;
    addReturnExpression(expression: ExpressionEntity): void;
    contains(name: string): boolean;
    deshadow(names: Set<string>, children?: Scope[]): void;
    findLexicalBoundary(): Scope;
    findVariable(name: string): Variable;
}
