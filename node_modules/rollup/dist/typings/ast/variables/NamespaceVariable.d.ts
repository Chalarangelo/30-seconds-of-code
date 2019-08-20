import Variable from './Variable';
import Identifier from '../nodes/Identifier';
import Module from '../../Module';
import { RenderOptions } from '../../utils/renderHelpers';
export declare function isNamespaceVariable(variable: Variable): variable is NamespaceVariable;
export default class NamespaceVariable extends Variable {
    isNamespace: true;
    module: Module;
    needsNamespaceBlock: boolean;
    referencedEarly: boolean;
    originals: {
        [name: string]: Variable;
    };
    references: Identifier[];
    constructor(module: Module);
    addReference(identifier: Identifier): void;
    includeVariable(): boolean;
    renderFirst(): boolean;
    renderBlock(options: RenderOptions): string;
}
