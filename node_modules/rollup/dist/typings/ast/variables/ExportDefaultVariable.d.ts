import LocalVariable from './LocalVariable';
import ExportDefaultDeclaration from '../nodes/ExportDefaultDeclaration';
import Identifier from '../nodes/Identifier';
import Variable from './Variable';
export declare function isExportDefaultVariable(variable: Variable): variable is ExportDefaultVariable;
export default class ExportDefaultVariable extends LocalVariable {
    isDefault: true;
    hasId: boolean;
    private _original;
    constructor(name: string, exportDefaultDeclaration: ExportDefaultDeclaration);
    addReference(identifier: Identifier): void;
    getName(reset?: boolean): string;
    referencesOriginal(): boolean;
    getOriginalVariableName(): string;
    setOriginalVariable(original: Variable): void;
}
