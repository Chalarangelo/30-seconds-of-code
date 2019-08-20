/* These definitions were imported from https://github.com/DefinitelyTyped/DefinitelyTyped
 * and includes previous contributions from the DefinitelyTyped community by:
 *   - Albert Willemsen <https://github.com/AlbertWillemsen-Centric>
 *   - Boris Yankov <https://github.com/borisyankov>
 *   - Jessica Franco <https://github.com/Kovensky>
 *   - Masahiro Wakame <https://github.com/vvakame>
 *   - Raanan Weber <https://github.com/RaananW>
 *   - Sergei Dorogin <https://github.com/evil-shrike>
 *   - webbiesdk <https://github.com/webbiesdk>
 * For full history prior to their migration to handlebars.js, please see:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commits/1ce60bdc07f10e0b076778c6c953271c072bc894/types/handlebars/index.d.ts
 */
// TypeScript Version: 2.3

declare namespace Handlebars {
  export interface TemplateDelegate<T = any> {
      (context: T, options?: RuntimeOptions): string;
  }

  export type Template<T = any> = TemplateDelegate<T>|string;

  export interface RuntimeOptions {
      partial?: boolean;
      depths?: any[];
      helpers?: { [name: string]: Function };
      partials?: { [name: string]: HandlebarsTemplateDelegate };
      decorators?: { [name: string]: Function };
      data?: any;
      blockParams?: any[];
  }

  export interface HelperOptions {
      fn: TemplateDelegate;
      inverse: TemplateDelegate;
      hash: any;
      data?: any;
  }

  export interface HelperDelegate {
      (context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, options?: HelperOptions): any;
  }
  export interface HelperDeclareSpec {
      [key: string]: HelperDelegate;
  }

  export interface ParseOptions {
      srcName?: string,
      ignoreStandalone?: boolean
  }

  export function registerHelper(name: string, fn: HelperDelegate): void;
  export function registerHelper(name: HelperDeclareSpec): void;
  export function unregisterHelper(name: string): void;

  export function registerPartial(name: string, fn: Template): void;
  export function registerPartial(spec: { [name: string]: HandlebarsTemplateDelegate }): void;
  export function unregisterPartial(name: string): void;

  // TODO: replace Function with actual signature
  export function registerDecorator(name: string, fn: Function): void;
  export function unregisterDecorator(name: string): void;

  export function K(): void;
  export function createFrame(object: any): any;
  export function blockParams(obj: any[], ids: any[]): any[];
  export function Exception(message: string): void;
  export function log(level: number, obj: any): void;
  export function parse(input: string, options?: ParseOptions): hbs.AST.Program;
  export function compile<T = any>(input: any, options?: CompileOptions): HandlebarsTemplateDelegate<T>;
  export function precompile(input: any, options?: PrecompileOptions): TemplateSpecification;
  export function template<T = any>(precompilation: TemplateSpecification): HandlebarsTemplateDelegate<T>;

  export function create(): typeof Handlebars;

  export const escapeExpression: typeof Utils.escapeExpression;
  //export const Utils: typeof hbs.Utils;
  export const logger: Logger;
  export const templates: HandlebarsTemplates;
  export const helpers: { [name: string]: HelperDelegate };
  export const partials: { [name: string]: any };
  // TODO: replace Function with actual signature
  export const decorators: { [name: string]: Function };

  export function noConflict(): typeof Handlebars;

  export class SafeString {
      constructor(str: string);
      toString(): string;
      toHTML(): string;
  }

  export namespace Utils {
      export function escapeExpression(str: string): string;
      export function createFrame(object: any): any;
      export function blockParams(obj: any[], ids: any[]): any[];
      export function isEmpty(obj: any) : boolean;
      export function extend(obj: any, ...source: any[]): any;
      export function toString(obj: any): string;
      export function isArray(obj: any): boolean;
      export function isFunction(obj: any): boolean;
  }

  export namespace AST {
      export const helpers: hbs.AST.helpers;
  }

  interface ICompiler {
      accept(node: hbs.AST.Node): void;
      Program(program: hbs.AST.Program): void;
      BlockStatement(block: hbs.AST.BlockStatement): void;
      PartialStatement(partial: hbs.AST.PartialStatement): void;
      PartialBlockStatement(partial: hbs.AST.PartialBlockStatement): void;
      DecoratorBlock(decorator: hbs.AST.DecoratorBlock): void;
      Decorator(decorator: hbs.AST.Decorator): void;
      MustacheStatement(mustache: hbs.AST.MustacheStatement): void;
      ContentStatement(content: hbs.AST.ContentStatement): void;
      CommentStatement(comment?: hbs.AST.CommentStatement): void;
      SubExpression(sexpr: hbs.AST.SubExpression): void;
      PathExpression(path: hbs.AST.PathExpression): void;
      StringLiteral(str: hbs.AST.StringLiteral): void;
      NumberLiteral(num: hbs.AST.NumberLiteral): void;
      BooleanLiteral(bool: hbs.AST.BooleanLiteral): void;
      UndefinedLiteral(): void;
      NullLiteral(): void;
      Hash(hash: hbs.AST.Hash): void;
  }

  export class Visitor implements ICompiler {
      accept(node: hbs.AST.Node): void;
      acceptKey(node: hbs.AST.Node, name: string): void;
      acceptArray(arr: hbs.AST.Expression[]): void;
      Program(program: hbs.AST.Program): void;
      BlockStatement(block: hbs.AST.BlockStatement): void;
      PartialStatement(partial: hbs.AST.PartialStatement): void;
      PartialBlockStatement(partial: hbs.AST.PartialBlockStatement): void;
      DecoratorBlock(decorator: hbs.AST.DecoratorBlock): void;
      Decorator(decorator: hbs.AST.Decorator): void;
      MustacheStatement(mustache: hbs.AST.MustacheStatement): void;
      ContentStatement(content: hbs.AST.ContentStatement): void;
      CommentStatement(comment?: hbs.AST.CommentStatement): void;
      SubExpression(sexpr: hbs.AST.SubExpression): void;
      PathExpression(path: hbs.AST.PathExpression): void;
      StringLiteral(str: hbs.AST.StringLiteral): void;
      NumberLiteral(num: hbs.AST.NumberLiteral): void;
      BooleanLiteral(bool: hbs.AST.BooleanLiteral): void;
      UndefinedLiteral(): void;
      NullLiteral(): void;
      Hash(hash: hbs.AST.Hash): void;
  }
}

/**
* Implement this interface on your MVW/MVVM/MVC views such as Backbone.View
**/
interface HandlebarsTemplatable {
  template: HandlebarsTemplateDelegate;
}

// NOTE: for backward compatibility of this typing
type HandlebarsTemplateDelegate<T = any> = Handlebars.TemplateDelegate<T>;

interface HandlebarsTemplates {
  [index: string]: HandlebarsTemplateDelegate;
}

interface TemplateSpecification {

}

// for backward compatibility of this typing
type RuntimeOptions = Handlebars.RuntimeOptions;

interface CompileOptions {
  data?: boolean;
  compat?: boolean;
  knownHelpers?: {
      helperMissing?: boolean;
      blockHelperMissing?: boolean;
      each?: boolean;
      if?: boolean;
      unless?: boolean;
      with?: boolean;
      log?: boolean;
      lookup?: boolean;
  };
  knownHelpersOnly?: boolean;
  noEscape?: boolean;
  strict?: boolean;
  assumeObjects?: boolean;
  preventIndent?: boolean;
  ignoreStandalone?: boolean;
  explicitPartialContext?: boolean;
}

interface PrecompileOptions extends CompileOptions {
  srcName?: string;
  destName?: string;
}

declare namespace hbs {
  // for backward compatibility of this typing
  type SafeString = Handlebars.SafeString;

  type Utils = typeof Handlebars.Utils;
}

interface Logger {
  DEBUG: number;
  INFO: number;
  WARN: number;
  ERROR: number;
  level: number;

  methodMap: { [level: number]: string };

  log(level: number, obj: string): void;
}

declare namespace hbs {
  namespace AST {
      interface Node {
          type: string;
          loc: SourceLocation;
      }

      interface SourceLocation {
          source: string;
          start: Position;
          end: Position;
      }

      interface Position {
          line: number;
          column: number;
      }

      interface Program extends Node {
          body: Statement[];
          blockParams: string[];
      }

      interface Statement extends Node {}

      interface MustacheStatement extends Statement {
          path: PathExpression | Literal;
          params: Expression[];
          hash: Hash;
          escaped: boolean;
          strip: StripFlags;
      }

      interface Decorator extends MustacheStatement { }

      interface BlockStatement extends Statement {
          path: PathExpression;
          params: Expression[];
          hash: Hash;
          program: Program;
          inverse: Program;
          openStrip: StripFlags;
          inverseStrip: StripFlags;
          closeStrip: StripFlags;
      }

      interface DecoratorBlock extends BlockStatement { }

      interface PartialStatement extends Statement {
          name: PathExpression | SubExpression;
          params: Expression[];
          hash: Hash;
          indent: string;
          strip: StripFlags;
      }

      interface PartialBlockStatement extends Statement {
          name: PathExpression | SubExpression;
          params: Expression[];
          hash: Hash;
          program: Program;
          openStrip: StripFlags;
          closeStrip: StripFlags;
      }

      interface ContentStatement extends Statement {
          value: string;
          original: StripFlags;
      }

      interface CommentStatement extends Statement {
          value: string;
          strip: StripFlags;
      }

      interface Expression extends Node {}

      interface SubExpression extends Expression {
          path: PathExpression;
          params: Expression[];
          hash: Hash;
      }

      interface PathExpression extends Expression {
          data: boolean;
          depth: number;
          parts: string[];
          original: string;
      }

      interface Literal extends Expression {}
      interface StringLiteral extends Literal {
          value: string;
          original: string;
      }

      interface BooleanLiteral extends Literal {
          value: boolean;
          original: boolean;
      }

      interface NumberLiteral extends Literal {
          value: number;
          original: number;
      }

      interface UndefinedLiteral extends Literal {}

      interface NullLiteral extends Literal {}

      interface Hash extends Node {
          pairs: HashPair[];
      }

      interface HashPair extends Node {
          key: string;
          value: Expression;
      }

      interface StripFlags {
          open: boolean;
          close: boolean;
      }

      interface helpers {
          helperExpression(node: Node): boolean;
          scopeId(path: PathExpression): boolean;
          simpleId(path: PathExpression): boolean;
      }
  }
}

declare module "handlebars" {
  export = Handlebars;
}

declare module "handlebars/runtime" {
  export = Handlebars;
}
