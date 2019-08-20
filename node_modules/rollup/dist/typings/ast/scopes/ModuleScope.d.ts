import Scope from './Scope';
import Module from '../../Module';
import Variable from '../variables/Variable';
export default class ModuleScope extends Scope {
    parent: Scope;
    module: Module;
    constructor(module: Module);
    deshadow(names: Set<string>, children?: Scope[]): void;
    findLexicalBoundary(): this;
    findVariable(name: string): Variable;
}
