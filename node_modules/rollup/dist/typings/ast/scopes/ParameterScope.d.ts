import Scope from './Scope';
import ParameterVariable from '../variables/ParameterVariable';
import Identifier from '../nodes/Identifier';
export default class ParameterScope extends Scope {
    parent: Scope;
    _parameters: ParameterVariable[];
    constructor(options?: {});
    /**
     * Adds a parameter to this scope. Parameters must be added in the correct
     * order, e.g. from left to right.
     * @param {Identifier} identifier
     * @returns {Variable}
     */
    addParameterDeclaration(identifier: Identifier): ParameterVariable;
    getParameterVariables(): ParameterVariable[];
}
