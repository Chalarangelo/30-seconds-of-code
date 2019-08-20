import Variable from './Variable';
import Identifier from '../nodes/Identifier';
import ExternalModule from '../../ExternalModule';
export declare function isExternalVariable(variable: Variable): variable is ExternalVariable;
export default class ExternalVariable extends Variable {
    module: ExternalModule;
    isExternal: true;
    isNamespace: boolean;
    constructor(module: ExternalModule, name: string);
    addReference(identifier: Identifier): void;
    includeVariable(): boolean;
}
