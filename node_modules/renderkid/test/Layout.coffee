Layout = require '../src/Layout'

describe "Layout", ->
  describe "constructor()", ->
    it "should create root block", ->
      l = new Layout
      expect(l._root).to.exist
      l._root._name.should.equal '__root'

  describe "get()", ->
    it "should not be allowed when any block is open", ->
      l = new Layout
      l.openBlock()
      (->
        l.get()
      ).should.throw Error