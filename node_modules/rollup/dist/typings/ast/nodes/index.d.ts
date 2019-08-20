import { NodeBase } from './shared/Node';
declare const nodes: {
    [name: string]: typeof NodeBase;
};
export { NodeType } from './NodeType';
export default nodes;
