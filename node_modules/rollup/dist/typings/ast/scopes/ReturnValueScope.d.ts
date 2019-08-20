import ParameterScope from './ParameterScope';
import CallOptions from '../CallOptions';
import ExecutionPathOptions from '../ExecutionPathOptions';
import { ExpressionEntity, ForEachReturnExpressionCallback } from '../nodes/shared/Expression';
export default class ReturnValueScope extends ParameterScope {
    _returnExpressions: Set<ExpressionEntity>;
    constructor(options?: {});
    addReturnExpression(expression: ExpressionEntity): void;
    forEachReturnExpressionWhenCalled(_callOptions: CallOptions, callback: ForEachReturnExpressionCallback, options: ExecutionPathOptions): void;
    someReturnExpressionWhenCalled(_callOptions: CallOptions, predicateFunction: (options: ExecutionPathOptions) => (node: ExpressionEntity) => boolean, options: ExecutionPathOptions): boolean;
}
