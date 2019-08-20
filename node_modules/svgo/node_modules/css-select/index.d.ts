export = CSSselect;

/**
 * Alias for CSSselect.selectAll(query, elems, options).
 * @see [CSSselect.compile] for supported selector queries.
 */
declare function CSSselect<Node, ElementNode extends Node>(
    query: CSSselect.Query,
    elems: Array<ElementNode> | ElementNode,
    options?: CSSselect.Options<Node, ElementNode>
  ): Array<ElementNode>;

declare namespace CSSselect {
  type Predicate<Value> = (v: Value) => boolean;
  interface Adapter<Node, ElementNode extends Node> {
    /**
     *  is the node a tag?
     */
    isTag(node: Node): node is ElementNode;

    /**
     * Does at least one of passed element nodes pass the test predicate?
     */
    existsOne(test: Predicate<ElementNode>, elems: Array<ElementNode>): boolean;

    /**
     * get the attribute value.
     */
    getAttributeValue(elem: ElementNode, name: string): string;

    /**
     * get the node's children
     */
    getChildren(node: Node): Array<Node>;

    /**
     * get the name of the tag
     */
    getName(elem: ElementNode): string;

    /**
     * get the parent of the node
     */
    getParent(node: Node): Node;

    /*
      Get the siblings of the node. Note that unlike jQuery's `siblings` method,
      this is expected to include the current node as well
    */
    getSiblings(node: Node): Array<Node>;

    /*
     * Get the text content of the node, and its children if it has any.
     */
    getText(node: Node): string;

    /**
     * Does the element have the named attribute?
     */
    hasAttrib(elem: ElementNode, name: string): boolean;

    /**
     * takes an array of nodes, and removes any duplicates, as well as any
     * nodes whose ancestors are also in the array.
     */
    removeSubsets(nodes: Array<Node>): Array<Node>;

    /**
     * finds all of the element nodes in the array that match the test predicate,
     * as well as any of their children that match it.
     */
    findAll(test: Predicate<ElementNode>, nodes: Array<Node>): Array<ElementNode>;

    /**
     * finds the first node in the array that matches the test predicate, or one
     * of its children.
     */
    findOne(test: Predicate<ElementNode>, elems: Array<ElementNode>): ElementNode | undefined,

    /**
      The adapter can also optionally include an equals method, if your DOM
      structure needs a custom equality test to compare two objects which refer
      to the same underlying node. If not provided, `css-select` will fall back to
      `a === b`.
    */
    equals?: (a: Node, b: Node) => boolean;
  }

  // TODO default types to the domutil/httpparser2 types
  interface Options<Node, ElementNode extends Node> {
    /**
     * When enabled, tag names will be case-sensitive. Default: false.
     */
    xmlMode?: boolean;
    /**
     * Limits the module to only use CSS3 selectors. Default: false.
     */
    strict?: boolean;
    /**
     * The last function in the stack, will be called with the last element
     * that's looked at. Should return true.
     */
    rootFunc?: (element: ElementNode) => true;
    /**
     * The adapter to use when interacting with the backing DOM structure. By
     * default it uses domutils.
     */
    adapter?: Adapter<Node, ElementNode>;
  }

  type CompiledQuery = (node: any) => boolean;
  type Query = string | CompiledQuery;

  /**
   * Compiles the query, returns a function.
   * 
   * Supported simple selectors:
   *   * Universal (*)
   *   * Tag (<tagname>)
   *   * Attribute ([attr=foo]), with supported comparisons:
   *     * [attr] (existential)
   *     * =
   *     * ~=
   *     * |=
   *     * *=
   *     * ^=
   *     * $=
   *     * != 
   *     * Can be case insensitive (E.g. [attr=foo i])
   *   * Pseudos:
   *     * :not
   *     * :root
   *     * :empty
   *     * :[first|last]-child[-of-type]
   *     * :only-of-type, :only-child
   *     * :nth-[last-]child[-of-type]
   *     * :link, :visited (the latter doesn't match any elements)
   *     * :checked
   *     * :enabled, :disabled
   *     * :required, :optional
   *   * Nonstandard Pseudos (available when strict mode is not enabled):
   *     * `:contains`
   *     * `:icontains` (case-insensitive version of :contains)
   *     * `:has`
   *     * `:parent`
   *     * `:selected`
   *     * `:header, :button, :input, :text, :checkbox, :file, :password, :reset, :radio etc.
   *     * :matches
   * 
   * Supported Combinators:
   * 
   *   * Descendant (` `)
   *   * Child (`>`)
   *   * Parent (`<`) (when strict mode is not enabled)
   *   * Sibling (`~`)
   *   * Adjacent (`+`)
   */
  function compile(query: string): CompiledQuery;
  /**
   * @template Node The generic Node type for the DOM adapter being used.
   * @template ElementNode The Node type for elements for the DOM adapter being used.
   * @param elems Elements to query. If it is an element, its children will be queried..
   * @param query can be either a CSS selector string or a compiled query function.
   * @param [options] options for querying the document.
   * @see CSSselect.compile for supported selector queries.
   * @returns All matching elements.
   */
  function selectAll<Node, ElementNode extends Node>(
    query: Query,
    elems: Array<ElementNode> | ElementNode,
    options?: Options<Node, ElementNode>
  ): Array<ElementNode>;
  /**
   * @template Node The generic Node type for the DOM adapter being used.
   * @template ElementNode The Node type for elements for the DOM adapter being used.
   * @param elems Elements to query. If it is an element, its children will be queried..
   * @param query can be either a CSS selector string or a compiled query function.
   * @param [options] options for querying the document.
   * @see CSSselect.compile for supported selector queries.
   * @returns the first match, or null if there was no match.
   */
  function selectOne<Node, ElementNode extends Node>(
    query: Query,
    elems: Array<ElementNode> | ElementNode,
    options?: Options<Node, ElementNode>
  ): ElementNode | null;

  /**
   * Tests whether or not an element is matched by query.
   * 
   * @template Node The generic Node type for the DOM adapter being used.
   * @template ElementNode The Node type for elements for the DOM adapter being used.
   * @param elem The element to test if it matches the query.
   * @param query can be either a CSS selector string or a compiled query function.
   * @param [options] options for querying the document.
   * @see CSSselect.compile for supported selector queries.
   * @returns 
   */
  function is<Node, ElementNode extends Node>(
    elem: ElementNode,
    query: Query,
    options?: Options<Node, ElementNode>
  ): boolean;
}