import ParameterScope from './ParameterScope';
import Identifier from '../nodes/Identifier';
import Scope from './Scope';
import LocalVariable from '../variables/LocalVariable';
export default class CatchScope extends ParameterScope {
    parent: Scope;
    addDeclaration(identifier: Identifier, options?: {
        isHoisted: boolean;
    }): LocalVariable;
}
