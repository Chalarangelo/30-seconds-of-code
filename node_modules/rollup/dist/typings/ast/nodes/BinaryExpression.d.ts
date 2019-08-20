import { ObjectPath } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { NodeType } from './NodeType';
import { ExpressionNode, NodeBase } from './shared/Node';
export declare type BinaryOperator = '==' | '!=' | '===' | '!==' | '<' | '<=' | '>' | '>=' | '<<' | '>>' | '>>>' | '+' | '-' | '*' | '/' | '%' | ' |' | '^' | '&' | '**' | 'in' | 'instanceof';
export default class BinaryExpression extends NodeBase {
    type: NodeType.BinaryExpression;
    left: ExpressionNode;
    right: ExpressionNode;
    operator: BinaryOperator;
    getValue(): any;
    hasEffectsWhenAccessedAtPath(path: ObjectPath, _options: ExecutionPathOptions): boolean;
}
