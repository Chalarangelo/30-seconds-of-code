var test = require("tape")

module.exports = testDomElement

function testDomElement(document) {

    var cleanup = require('./cleanup')(document)

    test("can getElementsByClassName", function(assert) {
        function append_div(classNames, parent) {
            var div = document.createElement("div")
            div.className = classNames
            parent.appendChild(div)
            return div
        }

        function assertMatch(classNames, expectedElements, parent) {
            var parent = parent || document
            var result = parent.getElementsByClassName(classNames)
            assert.equal(result.length, expectedElements.length)
            for (var i = 0; i < expectedElements.length; i++) {
                assert.notEqual(expectedElements.indexOf(result[i]), -1)
            }
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

        assertMatch("A",    [divA])
        assertMatch("B",    [divB])
        assertMatch("C",    [divC])
        assertMatch("A1",   [divA1])
        assertMatch("A2",   [divA2])
        assertMatch("B1",   [divB1])
        assertMatch("B2",   [divB2])
        assertMatch("B2a",  [divB2a])
        assertMatch("B2b",  [divB2b])

        assertMatch("A1",   [divA1], divA)
        assertMatch("A2",   [divA2], divA)
        assertMatch("A1",   [], divB)
        assertMatch("A2",   [], divC)
        assertMatch("B1",   [divB1], divB)
        assertMatch("B2",   [divB2], divB)
        assertMatch("B2a",  [divB2a], divB)
        assertMatch("B2a",  [divB2a], divB2)
        assertMatch("B2b",  [], divA)

        cleanup()
        assert.end()
    })

    test("does not serialize innerText as an attribute", function(assert) {
      var div = document.createElement("div")
      div.innerText = "Test <&>"
      assert.equal(div.toString(), "<div>Test &lt;&amp;&gt;</div>")
      cleanup()
      assert.end()
    })

    test("does not serialize innerHTML as an attribute", function(assert) {
      var div = document.createElement("div")
      div.innerHTML = "Test <img />"
      assert.equal(div.toString(), "<div>Test <img /></div>")
      cleanup()
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

        var elems = parent.getElementsByTagName("SPAN")

        assert.equal(elems.length, 2)
        assert.equal(elems[0].id, "foo")
        assert.equal(elems[1].id, "bar")

        cleanup()
        assert.end()
    })

    test("can getElementsByTagName with *", function(assert) {
        var e1 = document.createElement("div")
        var e2 = document.createElement("p")
        var e3 = document.createElement("span")

        e1.appendChild(e2)
        e2.appendChild(e3)
        // non-elements should be ignored
        e3.appendChild(document.createTextNode('foo'))
        e3.appendChild(document.createComment('bar'))

        var elems = e1.getElementsByTagName("*")

        assert.equal(elems.length, 2)
        assert.equal(elems[0].tagName, "P")
        assert.equal(elems[1].tagName, "SPAN")

        cleanup()
        assert.end()
    })

    test("getElement* methods can be passed to map()", function(assert) {
        var container = document.createElement("div")
        var e1 = document.createElement("div")
        var e2 = document.createElement("span")
        container.appendChild(e1)
        container.appendChild(e2)

        assert.deepEqual(
            ["div", "span"].map(container.getElementsByTagName.bind(container)),
            [[e1], [e2]]
        )

        e1.className = "foo"
        e2.className = "bar"

        assert.deepEqual(
            ["foo", "bar"].map(container.getElementsByClassName.bind(container)),
            [[e1], [e2]]
        )

        cleanup()
        assert.end()
    })

    test("can serialize comment nodes", function(assert) {
        var div = document.createElement("div")
        div.appendChild(document.createComment("test"))
        assert.equal(div.toString(), "<div><!--test--></div>")
        cleanup()
        assert.end()
    })

    test("can serialize style property", function(assert) {
        var div = document.createElement("div")
        div.style.fontSize = "16px"
        assert.equal(div.toString(), "<div style=\"font-size:16px;\"></div>")
        cleanup(); 
        assert.end()
    })

    test("can serialize style as a string", function(assert) {
      var div = document.createElement("div")
      div.setAttribute('style', 'display: none')
      assert.equal(div.toString(), "<div style=\"display: none\"></div>")
      cleanup()
      assert.end()
    })

    test("can serialize text nodes", function(assert) {
        var div = document.createElement("div")
        div.appendChild(document.createTextNode('<test> "&'))
        assert.equal(div.toString(), '<div>&lt;test&gt; "&amp;</div>')
        cleanup()
        assert.end()
    })

    test("escapes serialized attribute values", function(assert) {
        var div = document.createElement("div")
        div.setAttribute("data-foo", '<p>"&')
        assert.equal(div.toString(), '<div data-foo="&lt;p&gt;&quot;&amp;"></div>')
        cleanup()
        assert.end()
    })

    test("can check if an element contains another", function(assert) {
        var parent = document.createElement("div")
        var sibling = document.createElement("div")
        var child1 = document.createElement("div")
        var child2 = document.createElement("div")

        child1.appendChild(child2)
        parent.appendChild(child1)

        assert.equal(parent.contains(parent), true)
        assert.equal(parent.contains(sibling), false)
        assert.equal(parent.contains(child1), true)
        assert.equal(parent.contains(child2), true)

        cleanup()
        assert.end()
    })

    test("can handle non string attribute values", function(assert) {
        var div = document.createElement("div")
        div.setAttribute("data-number", 100)
        div.setAttribute("data-boolean", true)
        div.setAttribute("data-null", null)
        assert.equal(div.toString(), '<div data-number="100" data-boolean="true" data-null=""></div>')
        cleanup()
        assert.end()
    })

    test("can serialize textarea correctly", function(assert) {
        var input = document.createElement("textarea")
        input.setAttribute("name", "comment")
        input.innerHTML = "user input here"
        assert.equal(input.toString(), '<textarea name="comment">user input here</textarea>')
        cleanup()
        assert.end()
    })
}
