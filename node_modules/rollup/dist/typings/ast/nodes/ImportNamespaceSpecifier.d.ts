import Identifier from './Identifier';
import { Node } from './shared/Node';
import { NodeType } from './NodeType';
export default interface ImportNamespaceSpecifier extends Node {
    type: NodeType.ImportNamespaceSpecifier;
    local: Identifier;
}
