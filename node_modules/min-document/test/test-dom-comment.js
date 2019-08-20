var test = require("tape")

module.exports = testDomComment

function testDomComment(document) {
    var cleanup = require('./cleanup')(document)

    test("can createComment", function(assert) {
        var comment = document.createComment("test")
        assert.equal(comment.data, "test")
        assert.equal(comment.length, 4)
        assert.equal(comment.nodeName, "#comment")
        assert.equal(comment.nodeType, 8)
        assert.equal(comment.nodeValue, "test")
        assert.equal(comment.ownerDocument, document)
        assert.equal(comment.toString(), "[object Comment]")
        cleanup()
        assert.end()
    })
}
