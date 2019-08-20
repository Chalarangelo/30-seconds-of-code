import ReturnValueScope from './ReturnValueScope';
import ArgumentsVariable from '../variables/ArgumentsVariable';
import ThisVariable from '../variables/ThisVariable';
import ExecutionPathOptions from '../ExecutionPathOptions';
import CallOptions from '../CallOptions';
import ExportDefaultVariable from '../variables/ExportDefaultVariable';
import LocalVariable from '../variables/LocalVariable';
import GlobalVariable from '../variables/GlobalVariable';
import ExternalVariable from '../variables/ExternalVariable';
export default class FunctionScope extends ReturnValueScope {
    variables: {
        this: ThisVariable;
        default: ExportDefaultVariable;
        arguments: ArgumentsVariable;
        [name: string]: LocalVariable | GlobalVariable | ExternalVariable | ArgumentsVariable;
    };
    constructor(options?: {});
    findLexicalBoundary(): this;
    getOptionsWhenCalledWith({args, withNew}: CallOptions, options: ExecutionPathOptions): ExecutionPathOptions;
}
