// Type definitions for @babel/template 7.0
// Project: https://github.com/babel/babel/tree/master/packages/babel-template, https://babeljs.io
// Definitions by: Troy Gerwien <https://github.com/yortus>
//                 Marvin Hagemeister <https://github.com/marvinhagemeister>
//                 Melvin Groenhoff <https://github.com/mgroenhoff>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.9

import { ParserOptions } from "@babel/parser";
import { Expression, File, Program, Statement } from "@babel/types";

export interface TemplateBuilderOptions extends ParserOptions {
    /**
     * A set of placeholder names to automatically accept. Items in this list do not need to match the given placeholder pattern.
     */
    placeholderWhitelist?: Set<string>;

    /**
     * A pattern to search for when looking for Identifier and StringLiteral nodes that should be considered placeholders. `false` will
     * disable placeholder searching entirely, leaving only the `placeholderWhitelist` value to find placeholders.
     */
    placeholderPattern?: RegExp | false;

    /**
     * Set this to `true` to preserve any comments from the `code` parameter.
     */
    preserveComments?: boolean;
}

export interface TemplateBuilder<T> {
    /**
     * Build a new builder, merging the given options with the previous ones.
     */
    (opts: TemplateBuilderOptions): TemplateBuilder<T>;

    /**
     * Building from a string produces an AST builder function by default.
     */
    (code: string, opts?: TemplateBuilderOptions): (arg?: PublicReplacements) => T;

    /**
     * Building from a template literal produces an AST builder function by default.
     */
    (tpl: TemplateStringsArray, ...args: any[]): (arg?: PublicReplacements) => T;

    // Allow users to explicitly create templates that produce ASTs, skipping the need for an intermediate function.
    ast: {
        (tpl: string, opts?: TemplateBuilderOptions): T;
        (tpl: TemplateStringsArray, ...args: any[]): T;
    };
}

export type PublicReplacements = { [index: string]: any; } | any[];

export const smart: TemplateBuilder<Statement | Statement[]>;
export const statement: TemplateBuilder<Statement>;
export const statements: TemplateBuilder<Statement[]>;
export const expression: TemplateBuilder<Expression>;
export const program: TemplateBuilder<Program>;

type DefaultTemplateBuilder = typeof smart & {
    smart: typeof smart;
    statement: typeof statement;
    statements: typeof statements;
    expression: typeof expression;
    program: typeof program;
    ast: typeof smart.ast;
};

declare const templateBuilder: DefaultTemplateBuilder;

export default templateBuilder;
