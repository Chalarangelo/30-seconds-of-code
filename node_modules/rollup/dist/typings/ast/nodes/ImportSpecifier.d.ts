import Identifier from './Identifier';
import { Node } from './shared/Node';
import { NodeType } from './NodeType';
export default interface ImportSpecifier extends Node {
    type: NodeType.ImportSpecifier;
    local: Identifier;
    imported: Identifier;
}
