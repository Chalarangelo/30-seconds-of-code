// Type definitions for postcss-selector-parser 2.2.3
// Definitions by: Chris Eppstein <chris@eppsteins.net>

/*~ Note that ES6 modules cannot directly export callable functions.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ This declaration specifies that the function
 *~ is the exported object from the file
 */
export = parser;

declare function parser(): parser.Processor<never>;
declare function parser<Transform extends any>(processor: parser.AsyncProcessor<Transform>): parser.Processor<Transform, never>;
declare function parser(processor: parser.AsyncProcessor): parser.Processor<never>;
declare function parser<Transform extends any>(processor: parser.SyncProcessor<Transform>): parser.Processor<Transform, never>;
declare function parser(processor: parser.SyncProcessor): parser.Processor<never>;
declare function parser<Transform>(processor?: parser.SyncProcessor<Transform> | parser.AsyncProcessor<Transform>): parser.Processor<Transform>;

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block. Often you will want to describe the
 *~ shape of the return type of the function; that type should
 *~ be declared in here, as this example shows.
 */
declare namespace parser {
    /* copied from postcss -- so we don't need to add a dependency */
    type ErrorOptions = {
        plugin?: string;
        word?: string;
        index?: number
    };
    /* the bits we use of postcss.Rule, copied from postcss -- so we don't need to add a dependency */
    type PostCSSRuleNode = {
        selector: string
        /**
         * @returns postcss.CssSyntaxError but it's a complex object, caller
         *   should cast to it if they have a dependency on postcss.
         */
        error(message: string, options?: ErrorOptions): Error;
    };
    /** Accepts a string  */
    type Selectors = string | PostCSSRuleNode
    type SyncProcessor<Transform = void> = (root: parser.Root) => Transform
    type AsyncProcessor<Transform = void> = (root: parser.Root) => Transform | PromiseLike<Transform>

    const TAG: "tag";
    const STRING: "string";
    const SELECTOR: "selector";
    const ROOT: "root";
    const PSEUDO: "pseudo";
    const NESTING: "nesting";
    const ID: "id";
    const COMMENT: "comment";
    const COMBINATOR: "combinator";
    const CLASS: "class";
    const ATTRIBUTE: "attribute";
    const UNIVERSAL: "universal";

    interface NodeTypes {
        tag: Tag,
        string: String,
        selector: Selector,
        root: Root,
        pseudo: Pseudo,
        nesting: Nesting,
        id: Identifier,
        comment: Comment,
        combinator: Combinator,
        class: ClassName,
        attribute: Attribute,
        universal: Universal
    }

    type Node = NodeTypes[keyof NodeTypes];

    function isNode(node: any): node is Node;

    interface Options {
        /**
         * Preserve whitespace when true. Default: false;
         */
        lossless: boolean;
        /**
         * When true and a postcss.Rule is passed, set the result of
         * processing back onto the rule when done. Default: false.
         */
        updateSelector: boolean;
    }
    class Processor<
        TransformType = never,
        SyncSelectorsType extends Selectors | never = Selectors
    > {
        res: Root;
        readonly result: String;
        ast(selectors: Selectors, options?: Partial<Options>): Promise<Root>;
        astSync(selectors: SyncSelectorsType, options?: Partial<Options>): Root;
        transform(selectors: Selectors, options?: Partial<Options>): Promise<TransformType>;
        transformSync(selectors: SyncSelectorsType, options?: Partial<Options>): TransformType;
        process(selectors: Selectors, options?: Partial<Options>): Promise<string>;
        processSync(selectors: SyncSelectorsType, options?: Partial<Options>): string;
    }
    interface ParserOptions {
        css: string;
        error: (message: string, options: ErrorOptions) => Error;
        options: Options;
    }
    class Parser {
        input: ParserOptions;
        lossy: boolean;
        position: number;
        root: Root;
        selectors: string;
        current: Selector;
        constructor(input: ParserOptions);
        /**
         * Raises an error, if the processor is invoked on
         * a postcss Rule node, a better error message is raised.
         */
        error(message: string, options?: ErrorOptions): void;
    }
    interface NodeSource {
        start?: {
            line: number,
            column: number
        },
        end?: {
            line: number,
            column: number
        }
    }
    interface SpaceAround {
      before: string;
      after: string;
    }
    interface Spaces extends SpaceAround {
      [spaceType: string]: string | Partial<SpaceAround> | undefined;
    }
    interface NodeOptions<Value = string> {
        value: Value;
        spaces?: Partial<Spaces>;
        source?: NodeSource;
        sourceIndex?: number;
    }
    interface Base<
        Value extends string | undefined = string,
        ParentType extends Container | undefined = Container | undefined
    > {
        type: keyof NodeTypes;
        parent: ParentType;
        value: Value;
        spaces: Spaces;
        source?: NodeSource;
        sourceIndex: number;
        remove(): Node;
        replaceWith(...nodes: Node[]): Node;
        next(): Node;
        prev(): Node;
        clone(opts: {[override: string]:any}): Node;
        toString(): string;
    }
    interface ContainerOptions extends NodeOptions {
        nodes?: Array<Node>;
    }
    interface Container<Value extends string | undefined = string> extends Base<Value> {
        nodes: Array<Node>;
        append(selector: Selector): Container;
        prepend(selector: Selector): Container;
        at(index: number): Node;
        index(child: Node): number;
        readonly first: Node;
        readonly last: Node;
        readonly length: number;
        removeChild(child: Node): Container;
        removeAll(): Container;
        empty(): Container;
        insertAfter(oldNode: Node, newNode: Node): Container;
        insertBefore(oldNode: Node, newNode: Node): Container;
        each(callback: (node: Node) => boolean | void): boolean | undefined;
        walk(callback: (node: Node) => boolean | void): boolean | undefined;
        walkAttributes(callback: (node: Node) => boolean | void): boolean | undefined;
        walkClasses(callback: (node: Node) => boolean | void): boolean | undefined;
        walkCombinators(callback: (node: Node) => boolean | void): boolean | undefined;
        walkComments(callback: (node: Node) => boolean | void): boolean | undefined;
        walkIds(callback: (node: Node) => boolean | void): boolean | undefined;
        walkNesting(callback: (node: Node) => boolean | void): boolean | undefined;
        walkPseudos(callback: (node: Node) => boolean | void): boolean | undefined;
        walkTags(callback: (node: Node) => boolean | void): boolean | undefined;
        split(callback: (node: Node) => boolean): [Node[], Node[]];
        map(callback: (node: Node) => Node): Node[];
        reduce<T>(callback: (node: Node) => Node, memo: T): T;
        every(callback: (node: Node) => boolean): boolean;
        some(callback: (node: Node) => boolean): boolean;
        filter(callback: (node: Node) => boolean): Node[];
        sort(callback: (nodeA: Node, nodeB: Node) => number): Node[];
        toString(): string;
    }
    function isContainer(node: any): node is Root | Selector | Pseudo;

    interface NamespaceOptions<Value extends string | undefined = string> extends NodeOptions<Value> {
        namespace?: string | true;
    }
    interface Namespace<Value extends string | undefined = string> extends Base<Value> {
        /** alias for namespace */
        ns: string | true;
        /**
         *  namespace prefix.
         */
        namespace: string | true;
        /**
         * If a namespace exists, prefix the value provided with it, separated by |.
         */
        qualifiedName(value: string): string;
        /**
         * A string representing the namespace suitable for output.
         */
        readonly namespaceString: string;
    }
    function isNamespace(node: any): node is ClassName | Attribute | Tag;

    interface Root extends Container<undefined> {
        type: "root";
        /**
         * Raises an error, if the processor is invoked on
         * a postcss Rule node, a better error message is raised.
         */
        error(message: string, options?: ErrorOptions): Error;
    }
    function root(opts: ContainerOptions): Root;
    function isRoot(node: any): node is Root;

    interface Selector extends Container {
        type: "selector";
    }
    function selector(opts: ContainerOptions): Selector;
    function isSelector(node: any): node is Selector;

    interface Combinator extends Base {
        type: "combinator"
    }
    function combinator(opts: NodeOptions): Combinator;
    function isCombinator(node: any): node is Combinator;

    interface ClassName extends Namespace {
        type: "class";
    }
    function className(opts: NamespaceOptions): ClassName;
    function isClassName(node: any): node is ClassName;

    type AttributeOperator = "=" | "~=" | "|=" | "^=" | "$=" | "*=";
    interface AttributeOptions extends NamespaceOptions<string | undefined> {
        attribute: string;
        operator?: AttributeOperator;
        insensitive?: boolean;
        quoted?: boolean;
        spaces?: {
            before?: string;
            after?: string;
            attribute?: Partial<SpaceAround>;
            operator?: Partial<SpaceAround>;
            value?: Partial<SpaceAround>;
            insensitive?: Partial<SpaceAround>;
        }
        raws: {
            unquoted?: string;
            attribute?: string;
            operator?: string;
            value?: string;
            insensitive?: string;
            spaces?: {
                attribute?: Partial<Spaces>;
                operator?: Partial<Spaces>;
                value?: Partial<Spaces>;
                insensitive?: Partial<Spaces>;
            }
        };
    }
    interface Attribute extends Namespace<string | undefined> {
        type: "attribute";
        attribute: string;
        operator?: AttributeOperator;
        insensitive?: boolean;
        quoted?: boolean;
        spaces: {
            before: string;
            after: string;
            attribute?: Partial<Spaces>;
            operator?: Partial<Spaces>;
            value?: Partial<Spaces>;
            insensitive?: Partial<Spaces>;
        }
        raws: {
            unquoted?: string;
            attribute?: string;
            operator?: string;
            value?: string;
            insensitive?: string;
            spaces?: {
                attribute?: Partial<Spaces>;
                operator?: Partial<Spaces>;
                value?: Partial<Spaces>;
                insensitive?: Partial<Spaces>;
            }
        };
        /**
         * The attribute name after having been qualified with a namespace.
         */
        readonly qualifiedAttribute: string;
        /**
         * returns the offset of the attribute part specified relative to the
         * start of the node of the output string.
         *
         * * "ns" - alias for "namespace"
         * * "namespace" - the namespace if it exists.
         * * "attribute" - the attribute name
         * * "attributeNS" - the start of the attribute or its namespace
         * * "operator" - the match operator of the attribute
         * * "value" - The value (string or identifier)
         * * "insensitive" - the case insensitivity flag;
         * @param part One of the possible values inside an attribute.
         * @returns -1 if the name is invalid or the value doesn't exist in this attribute.
         */
        offsetOf(part: "ns" | "namespace" | "attribute" | "attributeNS" | "operator" | "value" | "insensitive"): number;
    }
    function attribute(opts: AttributeOptions): Attribute;
    function isAttribute(node: any): node is Attribute;

    interface Pseudo extends Container {
        type: "pseudo";
    }
    function pseudo(opts: ContainerOptions): Pseudo;
    /**
     * Checks wether the node is the Psuedo subtype of node.
     */
    function isPseudo(node: any): node is Pseudo;

    /**
     * Checks wether the node is, specifically, a pseudo element instead of
     * pseudo class.
     */
    function isPseudoElement(node: any): node is Pseudo;

    /**
     * Checks wether the node is, specifically, a pseudo class instead of
     * pseudo element.
     */
    function isPseudoClass(node: any): node is Pseudo;


    interface Tag extends Namespace {
        type: "tag";
    }
    function tag(opts: NamespaceOptions): Tag;
    function isTag(node: any): node is Tag;

    interface Comment extends Base {
        type: "comment";
    }
    function comment(opts: NodeOptions): Comment;
    function isComment(node: any): node is Comment;

    interface Identifier extends Base {
        type: "id";
    }
    function id(opts: any): any;
    function isIdentifier(node: any): node is Identifier;

    interface Nesting extends Base {
        type: "nesting";
    }
    function nesting(opts: any): any;
    function isNesting(node: any): node is Nesting;

    interface String extends Base {
        type: "string";
    }
    function string(opts: NodeOptions): String;
    function isString(node: any): node is String;

    interface Universal extends Base {
        type: "universal";
    }
    function universal(opts?: NamespaceOptions): any;
    function isUniversal(node: any): node is Universal;
}
