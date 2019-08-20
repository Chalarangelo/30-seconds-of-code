import * as mozilla from 'source-map';

/**
 * @param plugins Can also be included with the Processor#use method.
 * @returns A processor that will apply plugins as CSS processors.
 */
declare function postcss(plugins?: postcss.AcceptedPlugin[]): postcss.Processor;
declare function postcss(...plugins: postcss.AcceptedPlugin[]): postcss.Processor;
declare namespace postcss {
  type AcceptedPlugin = Plugin<any> | Transformer | {
    postcss: TransformCallback | Processor;
  } | Processor;
  /**
   * Creates a PostCSS plugin with a standard API.
   * @param name Plugin name. Same as in name property in package.json. It will
   * be saved in plugin.postcssPlugin property.
   * @param initializer Will receive plugin options and should return functions
   * to modify nodes in input CSS.
   */
  function plugin<T>(name: string, initializer: PluginInitializer<T>): Plugin<T>;
  interface Plugin<T> extends Transformer {
    (opts?: T): Transformer;
    postcss: Transformer;
    process: (css: string | {
      toString(): string;
    } | Result, opts?: any) => LazyResult;
  }
  interface Transformer extends TransformCallback {
    postcssPlugin?: string;
    postcssVersion?: string;
  }
  interface TransformCallback {
    /**
     * @returns A Promise that resolves when all work is complete. May return
     * synchronously, but that style of plugin is only meant for debugging and
     * development. In either case, the resolved or returned value is not used -
     * the "result" is the output.
     */
    (root: Root, result: Result): Promise<any> | any;
  }
  interface PluginInitializer<T> {
    (pluginOptions?: T): Transformer;
  }
  /**
   * Contains helpers for working with vendor prefixes.
   */
  export namespace vendor {
    /**
     * @returns The vendor prefix extracted from the input string.
     */
    function prefix(prop: string): string;
    /**
     * @returns The input string stripped of its vendor prefix.
     */
    function unprefixed(prop: string): string;
  }
  type ParserInput = string | { toString(): string };
  interface Parser {
    (css: ParserInput, opts?: Pick<ProcessOptions, 'map' | 'from'>): Root;
  }
  interface Builder {
    (part: string, node?: Node, type?: 'start' | 'end'): void;
  }
  interface Stringifier {
    (node: Node, builder: Builder): void;
  }
  /**
   * Default function to convert a node tree into a CSS string.
   */
  const stringify: Stringifier;
  /**
   * Parses source CSS.
   * @param css The CSS to parse.
   * @param options
   * @returns {} A new Root node, which contains the source CSS nodes.
   */
  const parse: Parser;
  /**
   * Contains helpers for safely splitting lists of CSS values, preserving
   * parentheses and quotes.
   */
  export namespace list {
    /**
     * Safely splits space-separated values (such as those for background,
     * border-radius and other shorthand properties).
     */
    function space(str: string): string[];
    /**
     * Safely splits comma-separated values (such as those for transition-* and
     * background  properties).
     */
    function comma(str: string): string[];
  }
  /**
   * Creates a new Comment node.
   * @param defaults Properties for the new Comment node.
   * @returns The new node.
   */
  function comment(defaults?: CommentNewProps): Comment;
  /**
   * Creates a new AtRule node.
   * @param defaults Properties for the new AtRule node.
   * @returns The new node.
   */
  function atRule(defaults?: AtRuleNewProps): AtRule;
  /**
   * Creates a new Declaration node.
   * @param defaults Properties for the new Declaration node.
   * @returns The new node.
   */
  function decl(defaults?: DeclarationNewProps): Declaration;
  /**
   * Creates a new Rule node.
   * @param defaults Properties for the new Rule node.
   * @returns The new node.
   */
  function rule(defaults?: RuleNewProps): Rule;
  /**
   * Creates a new Root node.
   * @param defaults Properties for the new Root node.
   * @returns The new node.
   */
  function root(defaults?: object): Root;
  interface SourceMapOptions {
    /**
     * Indicates that the source map should be embedded in the output CSS as a
     * Base64-encoded comment. By default, it is true. But if all previous maps
     * are external, not inline, PostCSS will not embed the map even if you do
     * not set this option.
     *
     * If you have an inline source map, the result.map property will be empty,
     * as the source map will be contained within the text of result.css.
     */
    inline?: boolean;
    /**
     * Source map content from a previous processing step (e.g., Sass compilation).
     * PostCSS will try to read the previous source map automatically (based on comments
     * within the source CSS), but you can use this option to identify it manually.
     * If desired, you can omit the previous map with prev: false.
     */
    prev?: any;
    /**
     * Indicates that PostCSS should set the origin content (e.g., Sass source)
     * of the source map. By default, it is true. But if all previous maps do not
     * contain sources content, PostCSS will also leave it out even if you do not set
     * this option.
     */
    sourcesContent?: boolean;
    /**
     * Indicates that PostCSS should add annotation comments to the CSS. By default,
     * PostCSS will always add a comment with a path to the source map. PostCSS will
     * not add annotations to CSS files that do not contain any comments.
     *
     * By default, PostCSS presumes that you want to save the source map as
     * opts.to + '.map' and will use this path in the annotation comment. A different
     * path can be set by providing a string value for annotation.
     *
     * If you have set inline: true, annotation cannot be disabled.
     */
    annotation?: string | false;
    /**
     * Override "from" in map's sources.
     */
    from?: string;
  }
  /**
   * A Processor instance contains plugins to process CSS. Create one
   * Processor  instance, initialize its plugins, and then use that instance
   * on numerous CSS files.
   */
  interface Processor {
    /**
     * Adds a plugin to be used as a CSS processor. Plugins can also be
     * added by passing them as arguments when creating a postcss instance.
     */
    use(plugin: AcceptedPlugin): Processor;
    /**
     * Parses source CSS. Because some plugins can be asynchronous it doesn't
     * make any transformations. Transformations will be applied in LazyResult's
     * methods.
     * @param css Input CSS or any object with toString() method, like a file
     * stream. If a Result instance is passed the processor will take the
     * existing Root parser from it.
     */
    process(css: ParserInput | Result | LazyResult | Root, options?: ProcessOptions): LazyResult;
    /**
     * Contains plugins added to this processor.
     */
    plugins: Plugin<any>[];
    /**
     * Contains the current version of PostCSS (e.g., "4.0.5").
     */
    version: string;
  }
  interface ProcessOptions {
    /**
     * The path of the CSS source file. You should always set "from", because it is
     * used in source map generation and syntax error messages.
     */
    from?: string;
    /**
     * The path where you'll put the output CSS file. You should always set "to"
     * to generate correct source maps.
     */
    to?: string;
    /**
     * Function to generate AST by string.
     */
    parser?: Parser;
    /**
     * Class to generate string by AST.
     */
    stringifier?: Stringifier;
    /**
     * Object with parse and stringify.
     */
    syntax?: Syntax;
    /**
     * Source map options
     */
    map?: SourceMapOptions | boolean;
  }
  interface Syntax {
    /**
     * Function to generate AST by string.
     */
    parse?: Parser;
    /**
     * Class to generate string by AST.
     */
    stringify?: Stringifier;
  }
  /**
   * A promise proxy for the result of PostCSS transformations.
   */
  interface LazyResult {
    /**
     * Processes input CSS through synchronous and asynchronous plugins.
     * @param onRejected Called if any plugin throws an error.
     */
    then: Promise<Result>["then"];
    /**
     * Processes input CSS through synchronous and asynchronous plugins.
     * @param onRejected Called if any plugin throws an error.
     */
    catch: Promise<Result>["catch"];
    /**
     * Alias for css property.
     */
    toString(): string;
    /**
     * Processes input CSS through synchronous plugins and converts Root to
     * CSS string. This property will only work with synchronous plugins. If
     * the processor contains any asynchronous plugins it will throw an error.
     * In this case, you should use LazyResult#then() instead.
     * @returns Result#css.
     */
    css: string;
    /**
     * Alias for css property to use when syntaxes generate non-CSS output.
     */
    content: string;
    /**
     * Processes input CSS through synchronous plugins. This property will
     * work only with synchronous plugins. If processor contains any
     * asynchronous plugins it will throw an error. You should use
     * LazyResult#then() instead.
     */
    map: ResultMap;
    /**
     * Processes input CSS through synchronous plugins. This property will work
     * only with synchronous plugins. If processor contains any asynchronous
     * plugins it will throw an error. You should use LazyResult#then() instead.
     */
    root: Root;
    /**
     * Processes input CSS through synchronous plugins and calls Result#warnings().
     * This property will only work with synchronous plugins. If the processor
     * contains any asynchronous plugins it will throw an error. In this case,
     * you should use LazyResult#then() instead.
     */
    warnings(): ResultMessage[];
    /**
     * Processes input CSS through synchronous plugins. This property will work
     * only with synchronous plugins. If processor contains any asynchronous
     * plugins it will throw an error. You should use LazyResult#then() instead.
     */
    messages: ResultMessage[];
    /**
     * @returns A processor used for CSS transformations.
     */
    processor: Processor;
    /**
     * @returns Options from the Processor#process(css, opts) call that produced
     * this Result instance.
     */
    opts: ResultOptions;
  }
  /**
   * Provides the result of the PostCSS transformations.
   */
  interface Result {
    /**
     * Alias for css property.
     */
    toString(): string;
    /**
     * Creates an instance of Warning and adds it to messages.
     * @param message Used in the text property of the message object.
     * @param options Properties for Message object.
     */
    warn(message: string, options?: WarningOptions): void;
    /**
     * @returns Warnings from plugins, filtered from messages.
     */
    warnings(): ResultMessage[];
    /**
     * A CSS string representing this Result's Root instance.
     */
    css: string;
    /**
     * Alias for css property to use with syntaxes that generate non-CSS output.
     */
    content: string;
    /**
     * An instance of the SourceMapGenerator class from the source-map library,
     * representing changes to the Result's Root instance.
     * This property will have a value only if the user does not want an inline
     * source map. By default, PostCSS generates inline source maps, written
     * directly into the processed CSS. The map property will be empty by default.
     * An external source map will be generated — and assigned to map — only if
     * the user has set the map.inline option to false, or if PostCSS was passed
     * an external input source map.
     */
    map: ResultMap;
    /**
     * Contains the Root node after all transformations.
     */
    root?: Root;
    /**
     * Contains messages from plugins (e.g., warnings or custom messages).
     * Add a warning using Result#warn() and get all warnings
     * using the Result#warnings() method.
     */
    messages: ResultMessage[];
    /**
     * The Processor instance used for this transformation.
     */
    processor?: Processor;
    /**
     * Options from the Processor#process(css, opts) or Root#toResult(opts) call
     * that produced this Result instance.
     */
    opts?: ResultOptions;
  }
  interface ResultOptions extends ProcessOptions {
    /**
     * The CSS node that was the source of the warning.
     */
    node?: postcss.Node;
    /**
     * Name of plugin that created this warning. Result#warn() will fill it
     * automatically with plugin.postcssPlugin value.
     */
    plugin?: string;
  }
  interface ResultMap {
    /**
     * Add a single mapping from original source line and column to the generated
     * source's line and column for this source map being created. The mapping
     * object should have the following properties:
     * @param mapping
     * @returns {}
     */
    addMapping(mapping: mozilla.Mapping): void;
    /**
     * Set the source content for an original source file.
     * @param sourceFile The URL of the original source file.
     * @param sourceContent The content of the source file.
     */
    setSourceContent(sourceFile: string, sourceContent: string): void;
    /**
     * Applies a SourceMap for a source file to the SourceMap. Each mapping to
     * the supplied source file is rewritten using the supplied SourceMap.
     * Note: The resolution for the resulting mappings is the minimum of this
     * map and the supplied map.
     * @param sourceMapConsumer The SourceMap to be applied.
     * @param sourceFile The filename of the source file. If omitted, sourceMapConsumer
     * file will be used, if it exists. Otherwise an error will be thrown.
     * @param sourceMapPath The dirname of the path to the SourceMap to be applied.
     * If relative, it is relative to the SourceMap. This parameter is needed when
     * the two SourceMaps aren't in the same directory, and the SourceMap to be
     * applied contains relative source paths. If so, those relative source paths
     * need to be rewritten relative to the SourceMap.
     * If omitted, it is assumed that both SourceMaps are in the same directory;
     * thus, not needing any rewriting (Supplying '.' has the same effect).
     */
    applySourceMap(
        sourceMapConsumer: mozilla.SourceMapConsumer,
        sourceFile?: string,
        sourceMapPath?: string
    ): void;
    /**
     * Renders the source map being generated to JSON.
     */
    toJSON: () => mozilla.RawSourceMap;
    /**
     * Renders the source map being generated to a string.
     */
    toString: () => string;
  }
  interface ResultMessage {
    type: string;
    plugin: string;
    [others: string]: any;
  }
  /**
   * Represents a plugin warning. It can be created using Result#warn().
   */
  interface Warning {
    /**
     * @returns Error position, message.
     */
    toString(): string;
    /**
     * Contains the warning message.
     */
    text: string;
    /**
     * Contains the name of the plugin that created this warning. When you
     * call Result#warn(), it will fill this property automatically.
     */
    plugin: string;
    /**
     * The CSS node that caused the warning.
     */
    node: Node;
    /**
     * The line in the input file with this warning's source.
     */
    line: number;
    /**
     * Column in the input file with this warning's source.
     */
    column: number;
  }
  interface WarningOptions extends ResultOptions {
    /**
     * A word inside a node's string that should be highlighted as source
     * of warning.
     */
    word?: string;
    /**
     * The index inside a node's string that should be highlighted as
     * source of warning.
     */
    index?: number;
  }
  /**
   * The CSS parser throws this error for broken CSS.
   */
  interface CssSyntaxError extends InputOrigin {
    name: string;
    /**
     * @returns Error position, message and source code of broken part.
     */
    toString(): string;
    /**
     * @param color Whether arrow should be colored red by terminal color codes.
     * By default, PostCSS will use process.stdout.isTTY and
     * process.env.NODE_DISABLE_COLORS.
     * @returns A few lines of CSS source that caused the error. If CSS has
     * input source map without sourceContent this method will return an empty
     * string.
     */
    showSourceCode(color?: boolean): string;
    /**
     * Contains full error text in the GNU error format.
     */
    message: string;
    /**
     * Contains only the error description.
     */
    reason: string;
    /**
     * Contains the PostCSS plugin name if the error didn't come from the
     * CSS parser.
     */
    plugin?: string;
    input?: InputOrigin;
  }
  interface InputOrigin {
    /**
     * If parser's from option is set, contains the absolute path to the
     * broken file. PostCSS will use the input source map to detect the
     * original error location. If you wrote a Sass file, then compiled it
     * to CSS and parsed it with PostCSS, PostCSS will show the original
     * position in the Sass file. If you need the position in the PostCSS
     * input (e.g., to debug the previous compiler), use error.input.file.
     */
    file?: string;
    /**
     * Contains the source line of the error. PostCSS will use the input
     * source map to detect the original error location. If you wrote a Sass
     * file, then compiled it to CSS and parsed it with PostCSS, PostCSS
     * will show the original position in the Sass file. If you need the
     * position in the PostCSS input (e.g., to debug the previous
     * compiler), use error.input.line.
     */
    line?: number;
    /**
     * Contains the source column of the error. PostCSS will use input
     * source map to detect the original error location. If you wrote a
     * Sass file, then compiled it to CSS and parsed it with PostCSS,
     * PostCSS will show the original position in the Sass file. If you
     * need the position in the PostCSS input (e.g., to debug the
     * previous compiler), use error.input.column.
     */
    column?: number;
    /**
     * Contains the source code of the broken file. PostCSS will use the
     * input source map to detect the original error location. If you wrote
     * a Sass file, then compiled it to CSS and parsed it with PostCSS,
     * PostCSS will show the original position in the Sass file. If you need
     * the position in the PostCSS input (e.g., to debug the previous
     * compiler), use error.input.source.
     */
    source?: string;
  }
  export class PreviousMap {
    private inline;
    annotation: string;
    root: string;
    private consumerCache;
    text: string;
    file: string;
    constructor(css: any, opts: any);
    consumer(): mozilla.SourceMapConsumer;
    withContent(): boolean;
    startWith(string: string, start: string): boolean;
    loadAnnotation(css: string): void;
    decodeInline(text: string): string;
    loadMap(
      file: any,
      prev: string | Function | mozilla.SourceMapConsumer | mozilla.SourceMapGenerator | mozilla.RawSourceMap
    ): string;
    isMap(map: any): boolean;
  }
  /**
   * Represents the source CSS.
   */
  interface Input {
    /**
     * The absolute path to the CSS source file defined with the "from" option.
     * Either this property or the "id" property are always defined.
     */
    file?: string;
    /**
     * The unique ID of the CSS source. Used if "from" option is not provided
     * (because PostCSS does not know the file path). Either this property
     * or the "file" property are always defined.
     */
    id?: string;
    /**
     * The CSS source identifier. Contains input.file if the user set the
     * "from" option, or input.id if they did not.
     */
    from: string;
    /**
     * Represents the input source map passed from a compilation step before
     * PostCSS (e.g., from the Sass compiler).
     */
    map: PreviousMap;
    /**
     * The flag to indicate whether or not the source code has Unicode BOM.
     */
    hasBOM: boolean;
    /**
     * Reads the input source map.
     * @returns A symbol position in the input source (e.g., in a Sass file
     * that was compiled to CSS before being passed to PostCSS):
     */
    origin(line: number, column: number): InputOrigin;
  }
  type ChildNode = AtRule | Rule | Declaration | Comment;
  type Node = Root | ChildNode;
  interface NodeBase {
    /**
     * Returns the input source of the node. The property is used in source
     * map generation. If you create a node manually
     * (e.g., with postcss.decl() ), that node will not have a source
     * property and will be absent from the source map. For this reason, the
     * plugin developer should consider cloning nodes to create new ones
     * (in which case the new node's source will reference the original,
     * cloned node) or setting the source property manually.
     */
    source?: NodeSource;
    /**
     * Contains information to generate byte-to-byte equal node string as it
     * was in origin input.
     */
    raws: NodeRaws;
    /**
     * @returns A CSS string representing the node.
     */
    toString(): string;
    /**
     * This method produces very useful error messages. If present, an input
     * source map will be used to get the original position of the source, even
     * from a previous compilation step (e.g., from Sass compilation).
     * @returns The original position of the node in the source, showing line
     * and column numbers and also a small excerpt to facilitate debugging.
     */
    error(
      /**
       * Error description.
       */
      message: string, options?: NodeErrorOptions): CssSyntaxError;
    /**
     * Creates an instance of Warning and adds it to messages. This method is
     * provided as a convenience wrapper for Result#warn.
     * Note that `opts.node` is automatically passed to Result#warn for you.
     * @param result The result that will receive the warning.
     * @param text Warning message. It will be used in the `text` property of
     * the message object.
     * @param opts Properties to assign to the message object.
     */
    warn(result: Result, text: string, opts?: WarningOptions): void;
    /**
     * @returns The next child of the node's parent; or, returns undefined if
     * the current node is the last child.
     */
    next(): ChildNode | void;
    /**
     * @returns The previous child of the node's parent; or, returns undefined
     * if the current node is the first child.
     */
    prev(): ChildNode | void;
    /**
     * Insert new node before current node to current node’s parent.
     *
     * Just an alias for `node.parent.insertBefore(node, newNode)`.
     *
     * @returns this node for method chaining.
     *
     * @example
     * decl.before('content: ""');
     */
    before(newNode: Node | object | string | Node[]): this;
    /**
     * Insert new node after current node to current node’s parent.
     *
     * Just an alias for `node.parent.insertAfter(node, newNode)`.
     *
     * @returns this node for method chaining.
     *
     * @example
     * decl.after('color: black');
     */
    after(newNode: Node | object | string | Node[]): this;
    /**
     * @returns The Root instance of the node's tree.
     */
    root(): Root;
    /**
     * Removes the node from its parent and cleans the parent property in the
     * node and its children.
     * @returns This node for chaining.
     */
    remove(): this;
    /**
     * Inserts node(s) before the current node and removes the current node.
     * @returns This node for chaining.
     */
    replaceWith(...nodes: (Node | object)[]): this;
    /**
     * @param overrides New properties to override in the clone.
     * @returns A clone of this node. The node and its (cloned) children will
     * have a clean parent and code style properties.
     */
    clone(overrides?: object): this;
    /**
     * Shortcut to clone the node and insert the resulting cloned node before
     * the current node.
     * @param overrides New Properties to override in the clone.
     * @returns The cloned node.
     */
    cloneBefore(overrides?: object): this;
    /**
     * Shortcut to clone the node and insert the resulting cloned node after
     * the current node.
     * @param overrides New Properties to override in the clone.
     * @returns The cloned node.
     */
    cloneAfter(overrides?: object): this;
    /**
     * @param prop Name or code style property.
     * @param defaultType Name of default value. It can be easily missed if the
     * value is the same as prop.
     * @returns A code style property value. If the node is missing the code
     * style property (because the node was manually built or cloned), PostCSS
     * will try to autodetect the code style property by looking at other nodes
     * in the tree.
     */
    raw(prop: string, defaultType?: string): any;
  }
  interface NodeNewProps {
    source?: NodeSource;
    raws?: NodeRaws;
  }
  interface NodeRaws {
    /**
     * The space symbols before the node. It also stores `*` and `_`
     * symbols before the declaration (IE hack).
     */
    before?: string;
    /**
     * The space symbols after the last child of the node to the end of
     * the node.
     */
    after?: string;
    /**
     * The symbols between the property and value for declarations,
     * selector and "{" for rules, last parameter and "{" for at-rules.
     */
    between?: string;
    /**
     * True if last child has (optional) semicolon.
     */
    semicolon?: boolean;
    /**
     * The space between the at-rule's name and parameters.
     */
    afterName?: string;
    /**
     * The space symbols between "/*" and comment's text.
     */
    left?: string;
    /**
     * The space symbols between comment's text and "*\/".
     */
    right?: string;
    /**
     * The content of important statement, if it is not just "!important".
     */
    important?: string;
  }
  interface NodeSource {
    input: Input;
    /**
     * The starting position of the node's source.
     */
    start?: {
      column: number;
      line: number;
    };
    /**
     * The ending position of the node's source.
     */
    end?: {
      column: number;
      line: number;
    };
  }
  interface NodeErrorOptions {
    /**
     * Plugin name that created this error. PostCSS will set it automatically.
     */
    plugin?: string;
    /**
     * A word inside a node's string, that should be highlighted as source
     * of error.
     */
    word?: string;
    /**
     * An index inside a node's string that should be highlighted as source
     * of error.
     */
    index?: number;
  }
  interface JsonNode {
    /**
     * Returns a string representing the node's type. Possible values are
     * root, atrule, rule, decl or comment.
     */
    type?: string;
    /**
     * Returns the node's parent node.
     */
    parent?: JsonContainer;
    /**
     * Returns the input source of the node. The property is used in source
     * map generation. If you create a node manually (e.g., with
     * postcss.decl() ), that node will not have a  source  property and
     * will be absent from the source map. For this reason, the plugin
     * developer should consider cloning nodes to create new ones (in which
     * case the new node's source will reference the original, cloned node)
     * or setting the source property manually.
     */
    source?: NodeSource;
    /**
     * Contains information to generate byte-to-byte equal node string as it
     * was in origin input.
     */
    raws?: NodeRaws;
  }
  type Container = Root | AtRule | Rule;
  /**
   * Containers can store any content. If you write a rule inside a rule,
   * PostCSS will parse it.
   */
  interface ContainerBase extends NodeBase {
    /**
     * Contains the container's children.
     */
    nodes?: ChildNode[];
    /**
     * @returns The container's first child.
     */
    first?: ChildNode;
    /**
     * @returns The container's last child.
     */
    last?: ChildNode;
    /**
     * @param overrides New properties to override in the clone.
     * @returns A clone of this node. The node and its (cloned) children will
     * have a clean parent and code style properties.
     */
    clone(overrides?: object): this;
    /**
     * @param child Child of the current container.
     * @returns The child's index within the container's "nodes" array.
     */
    index(child: ChildNode | number): number;
    /**
     * Determines whether all child nodes satisfy the specified test.
     * @param callback A function that accepts up to three arguments. The
     * every method calls the callback function for each node until the
     * callback returns false, or until the end of the array.
     * @returns True if the callback returns true for all of the container's
     * children.
     */
    every(callback: (node: ChildNode, index: number, nodes: ChildNode[]) => any, thisArg?: any): boolean;
    /**
     * Determines whether the specified callback returns true for any child node.
     * @param callback A function that accepts up to three arguments. The some
     * method calls the callback for each node until the callback returns true,
     * or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the
     * callback function. If thisArg is omitted, undefined is used as the
     * this value.
     * @returns True if callback returns true for (at least) one of the
     * container's children.
     */
    some(callback: (node: ChildNode, index: number, nodes: ChildNode[]) => boolean, thisArg?: any): boolean;
    /**
     * Iterates through the container's immediate children, calling the
     * callback function for each child. If you need to recursively iterate
     * through all the container's descendant nodes, use container.walk().
     * Unlike the for {} -cycle or Array#forEach() this iterator is safe if
     * you are mutating the array of child nodes during iteration.
     * @param callback Iterator. Returning false will break iteration. Safe
     * if you are mutating the array of child nodes during iteration. PostCSS
     * will adjust the current index to match the mutations.
     * @returns False if the callback returns false during iteration.
     */
    each(callback: (node: ChildNode, index: number) => any): boolean | void;
    /**
     * Traverses the container's descendant nodes, calling `callback` for each
     * node. Like container.each(), this method is safe to use if you are
     * mutating arrays during iteration. If you only need to iterate through
     * the container's immediate children, use container.each().
     * @param callback Iterator.
     */
    walk(callback: (node: ChildNode, index: number) => any): boolean | void;
    /**
     * Traverses the container's descendant nodes, calling `callback` for each
     * declaration. Like container.each(), this method is safe to use if you
     * are mutating arrays during iteration.
     * @param propFilter Filters declarations by property name. Only those
     * declarations whose property matches propFilter will be iterated over.
     * @param callback Called for each declaration node within the container.
     */
    walkDecls(propFilter: string | RegExp, callback?: (decl: Declaration, index: number) => any): boolean | void;
    walkDecls(callback: (decl: Declaration, index: number) => any): boolean | void;
    /**
     * Traverses the container's descendant nodes, calling `callback` for each
     * at-rule. Like container.each(), this method is safe to use if you are
     * mutating arrays during iteration.
     * @param nameFilter Filters at-rules by name. If provided, iteration
     * will only happen over at-rules that have matching names.
     * @param callback Iterator called for each at-rule node within the
     * container.
     */
    walkAtRules(nameFilter: string | RegExp, callback: (atRule: AtRule, index: number) => any): boolean | void;
    walkAtRules(callback: (atRule: AtRule, index: number) => any): boolean | void;
    /**
     * Traverses the container's descendant nodes, calling `callback` for each
     * rule. Like container.each(), this method is safe to use if you are
     * mutating arrays during iteration.
     * @param selectorFilter Filters rules by selector. If provided,
     * iteration will only happen over rules that have matching names.
     * @param callback Iterator called for each rule node within the
     * container.
     */
    walkRules(selectorFilter: string | RegExp, callback: (atRule: Rule, index: number) => any): boolean | void;
    walkRules(callback: (atRule: Rule, index: number) => any): boolean | void;
    walkRules(selectorFilter: any, callback?: (atRule: Rule, index: number) => any): boolean | void;
    /**
     * Traverses the container's descendant nodes, calling `callback` for each
     * comment. Like container.each(), this method is safe to use if you are
     * mutating arrays during iteration.
     * @param callback Iterator called for each comment node within the container.
     */
    walkComments(callback: (comment: Comment, indexed: number) => any): void | boolean;
    /**
     * Passes all declaration values within the container that match pattern
     * through the callback, replacing those values with the returned result of
     * callback. This method is useful if you are using a custom unit or
     * function and need to iterate through all values.
     * @param pattern Pattern that we need to replace.
     * @param options Options to speed up the search.
     * @param callbackOrReplaceValue String to replace pattern or callback
     * that will return a new value. The callback will receive the same
     * arguments as those passed to a function parameter of String#replace.
     */
    replaceValues(pattern: string | RegExp, options: {
        /**
         * Property names. The method will only search for values that match
         * regexp  within declarations of listed properties.
         */
        props?: string[];
        /**
         * Used to narrow down values and speed up the regexp search. Searching
         * every single value with a regexp can be slow. If you pass a fast
         * string, PostCSS will first check whether the value contains the fast
         * string; and only if it does will PostCSS check that value against
         * regexp. For example, instead of just checking for /\d+rem/ on all
         * values, set fast: 'rem' to first check whether a value has the rem
         * unit, and only if it does perform the regexp check.
         */
        fast?: string;
    }, callbackOrReplaceValue: string | {
      (substring: string, ...args: any[]): string;
    }): this;
    replaceValues(pattern: string | RegExp, callbackOrReplaceValue: string | {
      (substring: string, ...args: any[]): string;
    }): this;
    /**
     * Inserts new nodes to the beginning of the container.
     * Because each node class is identifiable by unique properties, use the
     * following shortcuts to create nodes in insert methods:
     *     root.prepend({ name: '@charset', params: '"UTF-8"' }); // at-rule
     *     root.prepend({ selector: 'a' });                       // rule
     *     rule.prepend({ prop: 'color', value: 'black' });       // declaration
     *     rule.prepend({ text: 'Comment' })                      // comment
     * A string containing the CSS of the new element can also be used. This
     * approach is slower than the above shortcuts.
     *     root.prepend('a {}');
     *     root.first.prepend('color: black; z-index: 1');
     * @param nodes New nodes.
     * @returns This container for chaining.
     */
    prepend(...nodes: (Node | object | string)[]): this;
    /**
     * Inserts new nodes to the end of the container.
     * Because each node class is identifiable by unique properties, use the
     * following shortcuts to create nodes in insert methods:
     *     root.append({ name: '@charset', params: '"UTF-8"' }); // at-rule
     *     root.append({ selector: 'a' });                       // rule
     *     rule.append({ prop: 'color', value: 'black' });       // declaration
     *     rule.append({ text: 'Comment' })                      // comment
     * A string containing the CSS of the new element can also be used. This
     * approach is slower than the above shortcuts.
     *     root.append('a {}');
     *     root.first.append('color: black; z-index: 1');
     * @param nodes New nodes.
     * @returns This container for chaining.
     */
    append(...nodes: (Node | object | string)[]): this;
    /**
     * Insert newNode before oldNode within the container.
     * @param oldNode Child or child's index.
     * @returns This container for chaining.
     */
    insertBefore(oldNode: ChildNode | number, newNode: ChildNode | object | string): this;
    /**
     * Insert newNode after oldNode within the container.
     * @param oldNode Child or child's index.
     * @returns This container for chaining.
     */
    insertAfter(oldNode: ChildNode | number, newNode: ChildNode | object | string): this;
    /**
     * Removes the container from its parent and cleans the parent property in the
     * container and its children.
     * @returns This container for chaining.
     */
    remove(): this;
    /**
     * Removes child from the container and cleans the parent properties
     * from the node and its children.
     * @param child Child or child's index.
     * @returns This container for chaining.
     */
    removeChild(child: ChildNode | number): this;
    /**
     * Removes all children from the container and cleans their parent
     * properties.
     * @returns This container for chaining.
     */
    removeAll(): this;
  }
  interface ContainerNewProps extends NodeNewProps {
    /**
     * Contains the container's children.
     */
    nodes?: ChildNode[];
    raws?: ContainerRaws;
  }
  interface ContainerRaws extends NodeRaws {
    indent?: string;
  }
  interface JsonContainer extends JsonNode {
    /**
     * Contains the container's children.
     */
    nodes?: ChildNode[];
    /**
     * @returns The container's first child.
     */
    first?: ChildNode;
    /**
     * @returns The container's last child.
     */
    last?: ChildNode;
  }
    /**
     * Represents a CSS file and contains all its parsed nodes.
     */
  interface Root extends ContainerBase {
    type: 'root';
    /**
     * Inherited from Container. Should always be undefined for a Root node.
     */
    parent: void;
    /**
     * @param overrides New properties to override in the clone.
     * @returns A clone of this node. The node and its (cloned) children will
     * have a clean parent and code style properties.
     */
    clone(overrides?: object): this;
    /**
     * @returns A Result instance representing the root's CSS.
     */
    toResult(options?: {
      /**
       * The path where you'll put the output CSS file. You should always
       * set "to" to generate correct source maps.
       */
      to?: string;
      map?: SourceMapOptions;
    }): Result;
    /**
     * Removes child from the root node, and the parent properties of node and
     * its children.
     * @param child Child or child's index.
     * @returns This root node for chaining.
     */
    removeChild(child: ChildNode | number): this;
  }
  interface RootNewProps extends ContainerNewProps {
  }
  interface JsonRoot extends JsonContainer {
  }
  /**
   * Represents an at-rule. If it's followed in the CSS by a {} block, this
   * node will have a nodes property representing its children.
   */
  interface AtRule extends ContainerBase {
    type: 'atrule';
    /**
     * Returns the atrule's parent node.
     */
    parent: Container;
    /**
     * The identifier that immediately follows the @.
     */
    name: string;
    /**
     * These are the values that follow the at-rule's name, but precede any {}
     * block. The spec refers to this area as the at-rule's "prelude".
     */
    params: string;
    /**
     * @param overrides New properties to override in the clone.
     * @returns A clone of this node. The node and its (cloned) children will
     * have a clean parent and code style properties.
     */
    clone(overrides?: object): this;
  }
  interface AtRuleNewProps extends ContainerNewProps {
    /**
     * The identifier that immediately follows the @.
     */
    name?: string;
    /**
     * These are the values that follow the at-rule's name, but precede any {}
     * block. The spec refers to this area as the at-rule's "prelude".
     */
    params?: string | number;
    raws?: AtRuleRaws;
  }
  interface AtRuleRaws extends NodeRaws {
    params?: string;
  }
  interface JsonAtRule extends JsonContainer {
    /**
     * The identifier that immediately follows the @.
     */
    name?: string;
    /**
     * These are the values that follow the at-rule's name, but precede any {}
     * block. The spec refers to this area as the at-rule's "prelude".
     */
    params?: string;
  }
  /**
   * Represents a CSS rule: a selector followed by a declaration block.
   */
  interface Rule extends ContainerBase {
    type: 'rule';
    /**
     * Returns the rule's parent node.
     */
    parent: Container;
    /**
     * The rule's full selector. If there are multiple comma-separated selectors,
     * the entire group will be included.
     */
    selector: string;
    /**
     * An array containing the rule's individual selectors.
     * Groups of selectors are split at commas.
     */
    selectors: string[];
    /**
     * @param overrides New properties to override in the clone.
     * @returns A clone of this node. The node and its (cloned) children will
     * have a clean parent and code style properties.
     */
    clone(overrides?: object): this;
  }
  interface RuleNewProps extends ContainerNewProps {
    /**
     * The rule's full selector. If there are multiple comma-separated selectors,
     * the entire group will be included.
     */
    selector?: string;
    /**
     * An array containing the rule's individual selectors. Groups of selectors
     * are split at commas.
     */
    selectors?: string[];
    raws?: RuleRaws;
  }
  interface RuleRaws extends ContainerRaws {
    /**
    * The rule's full selector. If there are multiple comma-separated selectors,
    * the entire group will be included.
    */
    selector?: string;
  }
  interface JsonRule extends JsonContainer {
    /**
     * The rule's full selector. If there are multiple comma-separated selectors,
     * the entire group will be included.
     */
    selector?: string;
    /**
     * An array containing the rule's individual selectors.
     * Groups of selectors are split at commas.
     */
    selectors?: string[];
  }
  /**
   * Represents a CSS declaration.
   */
  interface Declaration extends NodeBase {
    type: 'decl';
    /**
     * Returns the declaration's parent node.
     */
    parent: Container;
    /**
     * The declaration's property name.
     */
    prop: string;
    /**
     * The declaration's value. This value will be cleaned of comments. If the
     * source value contained comments, those comments will be available in the
     * _value.raws property. If you have not changed the value, the result of
     * decl.toString() will include the original raws value (comments and all).
     */
    value: string;
    /**
     * True if the declaration has an !important annotation.
     */
    important: boolean;
    /**
     * @param overrides New properties to override in the clone.
     * @returns A clone of this node. The node and its (cloned) children will
     * have a clean parent and code style properties.
     */
    clone(overrides?: object): this;
  }
  interface DeclarationNewProps {
    /**
     * The declaration's property name.
     */
    prop?: string;
    /**
     * The declaration's value. This value will be cleaned of comments. If the
     * source value contained comments, those comments will be available in the
     * _value.raws property. If you have not changed the value, the result of
     * decl.toString() will include the original raws value (comments and all).
     */
    value?: string;
    raws?: DeclarationRaws;
  }
  interface DeclarationRaws extends NodeRaws {
    /**
     * The declaration's value. This value will be cleaned of comments.
     * If the source value contained comments, those comments will be
     * available in the _value.raws property. If you have not changed the value, the result of
     * decl.toString() will include the original raws value (comments and all).
     */
    value?: string;
  }
  interface JsonDeclaration extends JsonNode {
    /**
     * True if the declaration has an !important annotation.
     */
    important?: boolean;
  }
  /**
   * Represents a comment between declarations or statements (rule and at-rules).
   * Comments inside selectors, at-rule parameters, or declaration values will
   * be stored in the Node#raws properties.
   */
  interface Comment extends NodeBase {
    type: 'comment';
    /**
     * Returns the comment's parent node.
     */
    parent: Container;
    /**
     * The comment's text.
     */
    text: string;
    /**
     * @param overrides New properties to override in the clone.
     * @returns A clone of this node. The node and its (cloned) children will
     * have a clean parent and code style properties.
     */
    clone(overrides?: object): this;
  }
  interface CommentNewProps {
    /**
     * The comment's text.
     */
    text?: string;
  }
  interface JsonComment extends JsonNode {
  }
}
export = postcss;
