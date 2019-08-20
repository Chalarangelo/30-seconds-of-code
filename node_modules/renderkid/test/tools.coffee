tools = require '../src/tools'

describe "tools", ->
  describe "quote()", ->
    it "should convert html special strings to their entities", ->
      tools.quote(" abc<>\"\n")
      .should.equal '&sp;abc&lt;&gt;&quot;<br />'

  describe "stringToDom()", ->
    it "should work", ->
      tools.stringToDom('<a> text<a1>text</a1> text <a2>text</a2><a3>text</a3>text</a>text')

  describe "objectToDom()", ->
    it "should work", ->
      tools.objectToDom({a: 'text'})

    it "should have quoted text nodes", ->
      tools.objectToDom({a: '&<> "'})[0].children[0]
      .data.should.equal '&amp;&lt;&gt;&sp;&quot;'