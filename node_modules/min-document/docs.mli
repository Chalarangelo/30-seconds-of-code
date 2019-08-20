type Comment := {
    data: String,
    length: Number,
    nodeName: "#comment",
    nodeType: 8,
    nodeValue: String,
    ownerDoucment: null | Document,

    toString: (this: Comment) => String
}

type DOMText := {
    data: String,
    type: "DOMTextNode",
    length: Number,
    nodeType: 3,

    toString: (this: DOMText) => String,
    replaceChild: (
        this: DOMText,
        index: Number,
        length: Number,
        value: String
    ) => void
}

type DOMNode := DOMText | DOMElement | DocumentFragment
type DOMChild := DOMText | DOMElement

type DOMElement := {
    tagName: String,
    className: String,
    dataset: Object<String, Any>,
    childNodes: Array<DOMChild>,
    parentNode: null | DOMElement,
    style: Object<String, String>,
    type: "DOMElement",
    nodeType: 1,
    ownerDoucment: null | Document,
    namespaceURI: null | String,

    appendChild: (this: DOMElement, child: DOMChild) => DOMChild,
    replaceChild:(
        this: DOMElement,
        elem: DOMChild,
        needle: DOMChild
    ) => DOMChild,
    removeChild: (this: DOMElement, child: DOMChild) => DOMChild,
    insertBefore: (
        this: DOMElement,
        elem: DOMChild,
        needle: DOMChild | null | undefined
    ) => DOMChild,
    addEventListener: addEventListener,
    dispatchEvent: dispatchEvent,
    focus: () => void,
    toString: (this: DOMElement) => String,
    getElementsByClassName: (
        this: DOMElement,
        className: String
    ) => Array<DOMElement>,
    getElementsByTagName: (
        this: DOMElement,
        tagName: String
    ) => Array<DOMElement>,
}

type DocumentFragment := {
    childNodes: Array<DOMChild>,
    parentNode: null | DOMElement,
    type: "DocumentFragment",
    nodeType: 11,
    nodeName: "#document-fragment",
    ownerDoucment: Document | null,

    appendChild: (this: DocumentFragment, child: DOMChild),
    replaceChild:
        (this: DocumentFragment, elem: DOMChild, needle: DOMChild),
    removeChild: (this: DocumentFragment, child: DOMChild),
    toString: (this: DocumentFragment) => String
}

type Document := {
    body: DOMElement,
    childNodes: Array<DOMChild>,
    documentElement: DOMElement,
    nodeType: 9,

    createComment: (this: Document, data: String) => Commment,
    createTextNode: (this: Document, value: String) => DOMText,
    createElement: (this: Document, tagName: String) => DOMElement,
    createElementNS: (
        this: Document,
        namespace: String | null,
        tagName: String
    ) => DOMElement,
    createDocumentFragment: (this: Document) => DocumentFragment,
    createEvent: () => Event,
    getElementById: (
        this: Document,
        id: String,
    ) => null | DOMElement,
    getElementsByClassName: (
        this: Document,
        className: String
    ) => Array<DOMElement>,
    getElementsByTagName: (
        this: Document,
        tagName: String
    ) => Array<DOMElement>
}

type Event := {
    type: String,
    bubbles: Boolean,
    cancelable: Boolean,

    initEvent: (
        this: Event,
        type: String,
        bubbles: Boolean,
        cancelable: Boolean
    ) => void
}

type addEventListener := (
    this: DOMElement,
    type: String,
    listener: Listener
) => void

type dispatchEvent := (
    this: DOMElement,
    ev: Event
)

min-document/event/add-event-listener := addEventListener

min-document/event/dispatch-event := dispatchEvent

min-document/document := () => Document

min-document/dom-element :=
    (tagName: String, owner?: Document, namespace?: String | null) => DOMElement

min-document/dom-fragment :=
    (owner?: Document) => DocumentFragment

min-document/dom-text :=
    (value: String, owner?: Document) => DOMText

min-document/event := () => Event

min-document/serialize := (DOMElement) => String

min-document := Document
