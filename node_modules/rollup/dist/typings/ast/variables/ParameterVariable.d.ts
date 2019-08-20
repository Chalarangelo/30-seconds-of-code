import ReplaceableInitializationVariable from './ReplaceableInitializationVariable';
import Identifier from '../nodes/Identifier';
export default class ParameterVariable extends ReplaceableInitializationVariable {
    constructor(identifier: Identifier);
}
