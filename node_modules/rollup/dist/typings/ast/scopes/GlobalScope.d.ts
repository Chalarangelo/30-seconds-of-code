import GlobalVariable from '../variables/GlobalVariable';
import Scope from './Scope';
export default class GlobalScope extends Scope {
    parent: void;
    findVariable(name: string): GlobalVariable;
    deshadow(names: Set<string>, children?: Scope[]): void;
}
