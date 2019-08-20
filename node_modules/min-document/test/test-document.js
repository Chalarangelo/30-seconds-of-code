var test = require("tape")

module.exports = testDocument

function testDocument(document) {
    var cleanup = require('./cleanup')(document)
    var Event = require('../event');

    test("document is a Document", function (assert) {
        assert.equal(typeof document.createTextNode, "function")
        assert.equal(typeof document.createElement, "function")
        assert.equal(typeof document.createDocumentFragment, "function")

        assert.end()
    })

    test("document has a head property", function(assert) {
        assert.equal(document.head.tagName, "HEAD")
        assert.end()
    })

    test("document has nodeType 9", function (assert) {
        assert.equal(document.nodeType, 9)
        assert.end()
    })

    test("can do stuff", function (assert) {
        var div = document.createElement("div")
        div.className = "foo bar"

        var span = document.createElement("span")
        div.appendChild(span)
        span.textContent = "Hello! <&>"

        var html = String(div.outerHTML || div)

        assert.equal(html, "<div class=\"foo bar\">" +
            "<span>Hello! &lt;&amp;&gt;</span></div>")

        cleanup()
        assert.end()
    })

    test("can createDocumentFragment", function (assert) {
        var frag = document.createDocumentFragment()

        assert.equal(frag.nodeType, 11)

        var h1 = document.createElement("h1")
        var h2 = document.createElement("h2")

        assert.equal(h1.nodeType, 1)
        assert.equal(h1.nodeType, 1)

        frag.appendChild(h1)
        assert.equal(fragString(frag), "<h1></h1>")

        frag.appendChild(h2)
        assert.equal(fragString(frag), "<h1></h1><h2></h2>")

        frag.removeChild(h1)
        assert.equal(fragString(frag), "<h2></h2>")

        frag.replaceChild(h1, h2)
        assert.equal(fragString(frag), "<h1></h1>")

        cleanup()
        assert.end()
    })

    test("can getElementById", function (assert) {

        function append_div(id, parent) {
            var div = document.createElement("div")
            div.id = id
            parent.appendChild(div)
            return div
        }

        var div1   = append_div(1, document.body)
        var div2   = append_div(2, document.body)
        var div3   = append_div(3, document.body)

        var div11  = append_div(11, div1)
        var div12  = append_div(12, div1)
        var div21  = append_div(21, div2)
        var div22  = append_div(22, div2)
        var div221 = append_div(221, div22)
        var div222 = append_div(222, div22)

        assert.equal(document.getElementById(1),    div1)
        assert.equal(document.getElementById("2"),  div2)
        assert.equal(document.getElementById(3),    div3)
        assert.equal(document.getElementById(11),   div11)
        assert.equal(document.getElementById(12),   div12)
        assert.equal(document.getElementById(21),   div21)
        assert.equal(document.getElementById(22),   div22)
        assert.equal(document.getElementById(221),  div221)
        assert.equal(document.getElementById(222),  div222)

        cleanup()
        assert.end()
    })

    test("can getElementsByClassName for a single class", function(assert) {
        function append_div(className, parent) {
            var div = document.createElement("div")
            div.className = className
            parent.appendChild(div)
            return div
        }

        function assertSingleMatch(className, expectedElement) {
            var result = document.getElementsByClassName(className)
            assert.equal(result.length, 1)
            assert.equal(result[0], expectedElement)
        }

        var divA   = append_div("A", document.body)
        var divB   = append_div("B", document.body)
        var divC   = append_div("C", document.body)

        var divA1  = append_div("A1",  divA)
        var divA2  = append_div("A2",  divA)
        var divB1  = append_div("B1",  divB)
        var divB2  = append_div("B2",  divB)
        var divB2a = append_div("B2a", divB2)
        var divB2b = append_div("B2b", divB2)

        assertSingleMatch("A",    divA)
        assertSingleMatch("B",    divB)
        assertSingleMatch("C",    divC)
        assertSingleMatch("A1",   divA1)
        assertSingleMatch("A2",   divA2)
        assertSingleMatch("B1",   divB1)
        assertSingleMatch("B2",   divB2)
        assertSingleMatch("B2a",  divB2a)
        assertSingleMatch("B2b",  divB2b)

        cleanup()
        assert.end()
    })

    test("can getElementsByClassName for many elements", function (assert) {
        function h(className) {
            var div = document.createElement("div")
            div.className = className
            return div
        }

        document.body.appendChild(h("multi-class-bar"))
        document.body.appendChild(h("multi-class-bar"))

        var elems = document.getElementsByClassName("multi-class-bar")
        assert.equal(elems.length, 2)

        cleanup()
        assert.end()
    })

    test("can getElementsByClassName for many classes", function(assert) {
        function append_div(classNames, parent) {
            var div = document.createElement("div")
            div.className = classNames
            parent.appendChild(div)
            return div
        }

        function assertMatch(classNames, expectedElements) {
            var result = document.getElementsByClassName(classNames)
            assert.equal(result.length, expectedElements.length)
            for (var i = 0; i < expectedElements.length; i++) {
                assert.notEqual(expectedElements.indexOf(result[i]), -1)
            }
        }

        var divXYZ   = append_div("X Y Z", document.body)
        var divYZ   = append_div("Y Z", document.body)
        var divZX  = append_div("Z X", document.body)

        var divX1X2  = append_div("X1 X2",  divXYZ)
        var divX1X2Y1  = append_div("X1 X2 Y1",  divXYZ)


        assertMatch("X",    [divXYZ, divZX])
        assertMatch("Y Z",    [divXYZ, divYZ])
        assertMatch("X Y Z",    [divXYZ])
        assertMatch("X1 X2",   [divX1X2, divX1X2Y1])

        cleanup()
        assert.end()
    })

    test("can create/manipulate textnodes", function (assert) {
        var textnode = document.createTextNode("hello")

        assert.equal(textnode.nodeType, 3)
        assert.equal(textnode.data, "hello")
        assert.equal(typeof textnode.replaceData, "function")

        textnode.replaceData(0, 7, "nightly")
        assert.equal(textnode.nodeType, 3)
        assert.equal(textnode.data, "nightly")
        assert.equal(typeof textnode.replaceData, "function")

        textnode.replaceData(1, 1, "ou")
        assert.equal(textnode.nodeType, 3)
        assert.equal(textnode.data, "noughtly")

        assert.end()
    })

    test("owner document is set", function (assert) {
        var textnode = document.createTextNode("hello")
        var domnode = document.createElement("div")
        var fragment = document.createDocumentFragment()

        assert.equal(textnode.ownerDocument, document)
        assert.equal(domnode.ownerDocument, document)
        assert.equal(fragment.ownerDocument, document)

        assert.end()
    })

    test("Create namespaced nodes", function (assert) {
        var svgURI = "http://www.w3.org/2000/svg"
        var htmlURI = "http://www.w3.org/1999/xhtml"

        var noNS = document.createElement("div")
        var svgNS = document.createElementNS(svgURI, "svg")
        var emptyNS = document.createElementNS("", "div")
        var nullNS = document.createElementNS(null, "div")
        var undefNS = document.createElementNS(undefined, "div")
        var caseNS = document.createElementNS("Oops", "AbC")
        var htmlNS = document.createElement("div")

        assert.equal(noNS.tagName, "DIV")
        assert.equal(noNS.namespaceURI, htmlURI)
        assert.equal(elemString(noNS), "<div></div>")

        assert.equal(svgNS.tagName, "svg")
        assert.equal(svgNS.namespaceURI, svgURI)
        assert.equal(elemString(svgNS), "<svg></svg>")

        assert.equal(emptyNS.tagName, "div")
        assert.equal(emptyNS.namespaceURI, null)
        assert.equal(elemString(emptyNS), "<div></div>")

        assert.equal(nullNS.tagName, "div")
        assert.equal(nullNS.namespaceURI, null)
        assert.equal(elemString(nullNS), "<div></div>")

        assert.equal(undefNS.tagName, "div")
        assert.equal(undefNS.namespaceURI, "undefined")
        assert.equal(elemString(undefNS), "<div></div>")

        assert.equal(caseNS.tagName, "AbC")
        assert.equal(caseNS.namespaceURI, "Oops")
        assert.equal(elemString(caseNS), "<AbC></AbC>")

        assert.equal(htmlNS.tagName, "DIV")
        assert.equal(htmlNS.namespaceURI, htmlURI)
        assert.equal(elemString(htmlNS), "<div></div>")

        assert.end()
    })

    test("Can insert before", function (assert) {
        var rootNode = document.createElement("div")
        var child = document.createElement("div")
        var newElement = document.createElement("div")
        rootNode.appendChild(child)
        var el = rootNode.insertBefore(newElement, child)
        assert.equal(el, newElement)
        assert.equal(rootNode.childNodes.length, 2)
        assert.equal(rootNode.childNodes[0], newElement)
        assert.equal(rootNode.childNodes[1], child)
        cleanup()
        assert.end()
    })

    test("Insert before null appends to end", function (assert) {
        var rootNode = document.createElement("div")
        var child = document.createElement("div")
        var newElement = document.createElement("div")
        rootNode.appendChild(child)
        var el = rootNode.insertBefore(newElement, null)
        assert.equal(el, newElement)
        assert.equal(rootNode.childNodes.length, 2)
        assert.equal(rootNode.childNodes[0], child)
        assert.equal(rootNode.childNodes[1], newElement)
        cleanup()
        assert.end()
    })

    test("Node insertions remove node from parent", function (assert) {
        var parent = document.createElement("div")
        var c1 = document.createElement("div")
        var c2 = document.createElement("div")
        var c3 = document.createElement("div")
        parent.appendChild(c1)
        parent.appendChild(c2)
        parent.appendChild(c3)

        var rootNode = document.createElement("div")

        var node1 = rootNode.appendChild(c1)
        assert.equal(node1, c1)
        assert.equal(parent.childNodes.length, 2)
        assert.equal(c1.parentNode, rootNode)

        var node2 = rootNode.insertBefore(c2, c1)
        assert.equal(node2, c2)
        assert.equal(parent.childNodes.length, 1)
        assert.equal(c2.parentNode, rootNode)

        var node3 = rootNode.replaceChild(c3, c2)
        assert.equal(node3, c2)
        assert.equal(parent.childNodes.length, 0)
        assert.equal(c3.parentNode, rootNode)
        assert.equal(c2.parentNode, null)

        cleanup()
        assert.end()
    })

    test("input has type=text by default", function (assert) {
        var elem = document.createElement("input")
        assert.equal(elem.getAttribute("type"), "text");
        assert.equal(elemString(elem), "<input type=\"text\" />")
        assert.end()
    })

    test("input type=text can be overridden", function (assert) {
        var elem = document.createElement("input")
        elem.setAttribute("type", "hidden")
        assert.equal(elem.getAttribute("type"), "hidden");
        assert.equal(elemString(elem), "<input type=\"hidden\" />")
        assert.end()
    })

    test("can set and get attributes", function (assert) {
        var elem = document.createElement("div")
        assert.equal(elem.getAttribute("foo"), null)
        assert.equal(elemString(elem), "<div></div>")
        assert.notOk(elem.hasAttribute('foo'))

        elem.setAttribute("foo", "bar")
        assert.equal(elem.getAttribute("foo"), "bar")
        assert.equal(elemString(elem), "<div foo=\"bar\"></div>")
        assert.ok(elem.hasAttribute('foo'))

        elem.removeAttribute("foo")
        assert.equal(elem.getAttribute("foo"), null)
        assert.equal(elemString(elem), "<div></div>")
        assert.notOk(elem.hasAttribute('foo'))

        assert.end()
    })

    test("can set and set style properties", function(assert) {
      var elem = document.createElement("div")
      assert.equal(elemString(elem), "<div></div>")

      elem.style.color = "red";
      assert.equal(elem.style.color, "red")
      assert.equal(elemString(elem), "<div style=\"color:red;\"></div>")

      elem.style.background = "blue";
      assert.equal(elem.style.color, "red")
      assert.equal(elem.style.background, "blue")
      assert.equal(elemString(elem),
                   "<div style=\"color:red;background:blue;\"></div>")

      assert.end()
    })

    test("can set and get namespaced attributes", function(assert) {
        var elem = document.createElement("div")

        var ns = "http://ns.com/my"
        assert.equal(elem.getAttributeNS(ns, "myattr"), blankAttributeNS())
        elem.setAttributeNS(ns, "myns:myattr", "the value")
        assert.equal(elem.getAttributeNS(ns, "myattr"), "the value")
        assert.equal(elemString(elem), '<div myns:myattr="the value"></div>')
        elem.removeAttributeNS(ns, "myattr")
        assert.equal(elem.getAttributeNS(ns, "myattr"), blankAttributeNS())

        // Should work much like get/setAttribute when namespace is null.
        assert.equal(elem.getAttributeNS(null, "foo"), blankAttributeNS())
        assert.equal(elem.getAttribute("foo"), null)
        elem.setAttributeNS(null, "foo", "bar")
        assert.equal(elem.getAttributeNS(null, "foo"), "bar")
        assert.equal(elem.getAttribute("foo"), "bar")
        elem.removeAttributeNS(null, "foo")
        assert.equal(elem.getAttributeNS(null, "foo"), blankAttributeNS())
        assert.equal(elem.getAttribute("foo"), null)
        assert.end()
    })

    test("can getElementsByTagName", function(assert) {
        var parent = document.createElement("div")
        var child1 = document.createElement("span")
        var child2 = document.createElement("span")

        child1.id = "foo"
        child2.id = "bar"

        child1.appendChild(child2)
        parent.appendChild(child1)
        document.body.appendChild(parent)

        var elems = document.getElementsByTagName("SPAN")

        assert.equal(elems.length, 2)
        assert.equal(elems[0].id, "foo")
        assert.equal(elems[1].id, "bar")

        cleanup()
        assert.end()
    })

    test("can getElementsByTagName with *", function(assert) {
        document.body.appendChild(document.createElement("div"))

        var elems = document.getElementsByTagName("*")

        assert.equal(elems.length, 4)
        assert.equal(elems[0].tagName, "HTML")
        assert.equal(elems[1].tagName, "HEAD")
        assert.equal(elems[2].tagName, "BODY")
        assert.equal(elems[3].tagName, "DIV")

        cleanup()
        assert.end()
    })

    test("getElement* methods search outside the body", function(assert) {
        var html = document.documentElement;
        assert.equal(document.getElementsByTagName("html")[0], html)

        html.id = "foo"
        assert.equal(document.getElementById("foo"), html)

        html.className = "bar"
        assert.equal(document.getElementsByClassName("bar")[0], html)

        // cleanup
        html.id = ""
        html.className = ""

        cleanup()
        assert.end()
    })

    test("getElement* methods can be passed to map()", function(assert) {
        var e1 = document.createElement("div")
        var e2 = document.createElement("span")

        document.body.appendChild(e1)
        document.body.appendChild(e2)

        assert.deepEqual(
            ["div", "span"].map(document.getElementsByTagName.bind(document)),
            [[e1], [e2]]
        )

        e1.id = "1"
        e2.id = "2"

        assert.deepEqual(
            ["1", "2"].map(document.getElementById.bind(document)),
            [e1, e2]
        )

        e1.className = "foo"
        e2.className = "bar"

        assert.deepEqual(
            ["foo", "bar"].map(document.getElementsByClassName.bind(document)),
            [[e1], [e2]]
        )

        cleanup()
        assert.end()
    })

    test("can check if it contains an element", function(assert) {
    	var el = document.createElement("div")
    	document.body.appendChild(el)

    	assert.equals(document.contains(document.body), true)
    	assert.equals(document.contains(el), true)

    	cleanup()
    	assert.end()
    })

    test("can do events", function (assert) {
        var x = 1
        function incx() { x++ }

        var ev = new Event();
        ev.initEvent("click");
        document.addEventListener("click", incx)
        document.dispatchEvent(ev)

        assert.equal(x, 2)

        document.removeEventListener("click", incx)
        document.dispatchEvent(ev)

        assert.equal(x, 2)
        assert.end()
    })

    function blankAttributeNS() {
        // Most browsers conform to the latest version of the DOM spec,
        // which requires `getAttributeNS` to return `null` when the attribute
        // doesn't exist, but some browsers (including phantomjs) implement the
        // old version of the spec and return an empty string instead, see:
        // https://developer.mozilla.org/en-US/docs/Web/API/element.getAttributeNS#Return_value
        var div = document.createElement("div")
        var blank = div.getAttributeNS(null, "foo")
        if (!(blank === null || blank === "")) {
            throw "Expected blank attribute to be either null or empty string"
        }
        return blank;
    }

    function elemString(element) {
        var html = String(element) || "[]"

        if (html.charAt(0) === "[") {
            html = element.outerHTML
            if (!html && !element.parentNode) {
                var div = document.createElement("div")
                div.appendChild(element)
                html = div.innerHTML
                div.removeChild(element)
            }
        }

        return html
    }

    function fragString(fragment) {
        var html = String(fragment)


        if (html === "[object DocumentFragment]") {
            var innerHTML = []
            for (var i = 0; i < fragment.childNodes.length; i++) {
                var node = fragment.childNodes[i]
                innerHTML.push(String(node.outerHTML || node))
            }
            html = innerHTML.join("")
        }

        return html
    }
}


