import Scope from './Scope';
import Identifier from '../nodes/Identifier';
import LocalVariable from '../variables/LocalVariable';
export default class BlockScope extends Scope {
    parent: Scope;
    addDeclaration(identifier: Identifier, options?: {
        isHoisted: boolean;
    }): LocalVariable;
}
