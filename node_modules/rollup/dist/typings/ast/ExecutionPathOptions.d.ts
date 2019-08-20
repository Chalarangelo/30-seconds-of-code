import CallExpression from './nodes/CallExpression';
import CallOptions from './CallOptions';
import ThisVariable from './variables/ThisVariable';
import ParameterVariable from './variables/ParameterVariable';
import { Entity, WritableEntity } from './Entity';
import Property from './nodes/Property';
import { ExpressionEntity } from './nodes/shared/Expression';
import { ObjectPath } from './values';
export declare enum OptionTypes {
    IGNORED_LABELS = 0,
    ACCESSED_NODES = 1,
    ARGUMENTS_VARIABLES = 2,
    ASSIGNED_NODES = 3,
    IGNORE_BREAK_STATEMENTS = 4,
    IGNORE_RETURN_AWAIT_YIELD = 5,
    NODES_CALLED_AT_PATH_WITH_OPTIONS = 6,
    REPLACED_VARIABLE_INITS = 7,
    RETURN_EXPRESSIONS_ACCESSED_AT_PATH = 8,
    RETURN_EXPRESSIONS_ASSIGNED_AT_PATH = 9,
    RETURN_EXPRESSIONS_CALLED_AT_PATH = 10,
}
export declare type RESULT_KEY = {};
export declare const RESULT_KEY: RESULT_KEY;
export declare type KeyTypes = OptionTypes | Entity | RESULT_KEY;
export default class ExecutionPathOptions {
    private optionValues;
    static create(): ExecutionPathOptions;
    private constructor();
    private get(option);
    private remove(option);
    private set(option, value);
    private setIn(optionPath, value);
    addAccessedNodeAtPath(path: ObjectPath, node: ExpressionEntity): ExecutionPathOptions;
    addAccessedReturnExpressionAtPath(path: ObjectPath, callExpression: CallExpression | Property): ExecutionPathOptions;
    addAssignedNodeAtPath(path: ObjectPath, node: WritableEntity): ExecutionPathOptions;
    addAssignedReturnExpressionAtPath(path: ObjectPath, callExpression: CallExpression | Property): ExecutionPathOptions;
    addCalledNodeAtPathWithOptions(path: ObjectPath, node: ExpressionEntity, callOptions: CallOptions): ExecutionPathOptions;
    addCalledReturnExpressionAtPath(path: ObjectPath, callExpression: CallExpression | Property): ExecutionPathOptions;
    getArgumentsVariables(): ExpressionEntity[];
    getHasEffectsWhenCalledOptions(): ExecutionPathOptions;
    getReplacedVariableInit(variable: ThisVariable | ParameterVariable): ExpressionEntity;
    hasNodeBeenAccessedAtPath(path: ObjectPath, node: ExpressionEntity): boolean;
    hasNodeBeenAssignedAtPath(path: ObjectPath, node: WritableEntity): boolean;
    hasNodeBeenCalledAtPathWithOptions(path: ObjectPath, node: ExpressionEntity, callOptions: CallOptions): boolean;
    hasReturnExpressionBeenAccessedAtPath(path: ObjectPath, callExpression: CallExpression | Property): boolean;
    hasReturnExpressionBeenAssignedAtPath(path: ObjectPath, callExpression: CallExpression | Property): boolean;
    hasReturnExpressionBeenCalledAtPath(path: ObjectPath, callExpression: CallExpression | Property): boolean;
    ignoreBreakStatements(): boolean | Entity | ExpressionEntity[];
    ignoreLabel(labelName: string): any;
    ignoreReturnAwaitYield(): boolean | Entity | ExpressionEntity[];
    replaceVariableInit(variable: ThisVariable | ParameterVariable, init: ExpressionEntity): ExecutionPathOptions;
    setArgumentsVariables(variables: ExpressionEntity[]): ExecutionPathOptions;
    setIgnoreBreakStatements(value?: boolean): ExecutionPathOptions;
    setIgnoreLabel(labelName: string): ExecutionPathOptions;
    setIgnoreNoLabels(): ExecutionPathOptions;
    setIgnoreReturnAwaitYield(value?: boolean): ExecutionPathOptions;
}
