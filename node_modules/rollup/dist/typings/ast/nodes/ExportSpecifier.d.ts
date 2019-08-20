import { Node } from './shared/Node';
import Identifier from './Identifier';
import { NodeType } from './NodeType';
export default interface ExportSpecifier extends Node {
    type: NodeType.ExportSpecifier;
    local: Identifier;
    exported: Identifier;
}
