/** Types of elements found in the DOM */
export declare const enum ElementType {
    Text = "text",
    Directive = "directive",
    Comment = "comment",
    Script = "script",
    Style = "style",
    Tag = "tag",
    CDATA = "cdata",
    Doctype = "doctype"
}
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
export declare function isTag(elem: {
    type: ElementType;
}): boolean;
export declare const Text = ElementType.Text;
export declare const Directive = ElementType.Directive;
export declare const Comment = ElementType.Comment;
export declare const Script = ElementType.Script;
export declare const Style = ElementType.Style;
export declare const Tag = ElementType.Tag;
export declare const CDATA = ElementType.CDATA;
export declare const Doctype = ElementType.Doctype;
//# sourceMappingURL=index.d.ts.map