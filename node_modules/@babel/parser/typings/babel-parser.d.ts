// Type definitions for @babel/parser
// Project: https://github.com/babel/babel/tree/master/packages/babel-parser
// Definitions by: Troy Gerwien <https://github.com/yortus>
//                 Marvin Hagemeister <https://github.com/marvinhagemeister>
//                 Avi Vahl <https://github.com/AviVahl>
// TypeScript Version: 2.9

/**
 * Parse the provided code as an entire ECMAScript program.
 */
export function parse(input: string, options?: ParserOptions): import('@babel/types').File;

/**
 * Parse the provided code as a single expression.
 */
export function parseExpression(input: string, options?: ParserOptions): import('@babel/types').Expression;

export interface ParserOptions {
    /**
     * By default, import and export declarations can only appear at a program's top level.
     * Setting this option to true allows them anywhere where a statement is allowed.
     */
    allowImportExportEverywhere?: boolean;

    /**
     * By default, await use is not allowed outside of an async function.
     * Set this to true to accept such code.
     */
    allowAwaitOutsideFunction?: boolean;

    /**
     * By default, a return statement at the top level raises an error.
     * Set this to true to accept such code.
     */
    allowReturnOutsideFunction?: boolean;

    allowSuperOutsideMethod?: boolean;

    /**
     * Indicate the mode the code should be parsed in.
     * Can be one of "script", "module", or "unambiguous". Defaults to "script".
     * "unambiguous" will make @babel/parser attempt to guess, based on the presence
     * of ES6 import or export statements.
     * Files with ES6 imports and exports are considered "module" and are otherwise "script".
     */
    sourceType?: 'script' | 'module' | 'unambiguous';

    /**
     * Correlate output AST nodes with their source filename.
     * Useful when generating code and source maps from the ASTs of multiple input files.
     */
    sourceFilename?: string;

    /**
     * By default, the first line of code parsed is treated as line 1.
     * You can provide a line number to alternatively start with.
     * Useful for integration with other source tools.
     */
    startLine?: number;

    /**
     * Array containing the plugins that you want to enable.
     */
    plugins?: ParserPlugin[];

    /**
     * Should the parser work in strict mode.
     * Defaults to true if sourceType === 'module'. Otherwise, false.
     */
    strictMode?: boolean;

    /**
     * Adds a ranges property to each node: [node.start, node.end]
     */
    ranges?: boolean;

    /**
     * Adds all parsed tokens to a tokens property on the File node.
     */
    tokens?: boolean;

    /**
     * By default, the parser adds information about parentheses by setting
     * `extra.parenthesized` to `true` as needed.
     * When this option is `true` the parser creates `ParenthesizedExpression`
     * AST nodes instead of using the `extra` property.
     */
    createParenthesizedExpressions?: boolean;
}

export type ParserPlugin =
    'estree' |
    'jsx' |
    'flow' |
    'flowComments' |
    'typescript' |
    'doExpressions' |
    'objectRestSpread' |
    'decorators' |
    'decorators-legacy' |
    'classProperties' |
    'classPrivateProperties' |
    'classPrivateMethods' |
    'exportDefaultFrom' |
    'exportNamespaceFrom' |
    'asyncGenerators' |
    'functionBind' |
    'functionSent' |
    'dynamicImport' |
    'numericSeparator' |
    'optionalChaining' |
    'importMeta' |
    'bigInt' |
    'optionalCatchBinding' |
    'throwExpressions' |
    'pipelineOperator' |
    'nullishCoalescingOperator' |
    ParserPluginWithOptions;

export type ParserPluginWithOptions =
    ['decorators', DecoratorsPluginOptions] |
    ['pipelineOperator', PipelineOperatorPluginOptions] |
    ['flow', FlowPluginOptions];

export interface DecoratorsPluginOptions {
    decoratorsBeforeExport?: boolean;
}

export interface PipelineOperatorPluginOptions {
    proposal: 'minimal' | 'smart';
}

export interface FlowPluginOptions {
    all?: boolean;
}
