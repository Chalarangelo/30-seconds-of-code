Layout = require '../../src/Layout'
{object} = require 'utila'

{open, get, conf} = do ->
  show = (layout) ->
    got = layout.get()
    got = got.replace /<[^>]+>/g, ''

  defaultBlockConfig =
    linePrependor: options: amount: 2

  c = (add = {}) ->
    object.append defaultBlockConfig, add

  ret = {}

  ret.open = (block, name, top = 0, bottom = 0) ->
    config = c
      blockPrependor: options: amount: top
      blockAppendor: options: amount: bottom

    b = block.openBlock config, name
    b.write name + ' | top ' + top + ' bottom ' + bottom
    b

  ret.get = (layout) ->
    layout.get().replace(/<[^>]+>/g, '')

  ret.conf = (props) ->
    config = {}
    if props.left?
      object.appendOnto config, linePrependor: options: amount: props.left

    if props.right?
      object.appendOnto config, lineAppendor:  options: amount: props.right

    if props.top?
      object.appendOnto config, blockPrependor: options: amount: props.top

    if props.bottom?
      object.appendOnto config, blockAppendor:  options: amount: props.bottom

    if props.width?
      object.appendOnto config, width: props.width

    if props.bullet is yes
      object.appendOnto config, linePrependor: options: bullet: {char: '-', alignment: 'left'}

    config

  ret


describe "Layout", ->
  describe "inline inputs", ->
    it "should be merged", ->
      l = new Layout

      l.write 'a'
      l.write 'b'

      get(l).should.equal 'ab'

    it "should be correctly wrapped", ->
      l = new Layout
      block = l.openBlock conf width: 20
      block.write '123456789012345678901234567890'
      block.close()
      get(l).should.equal '12345678901234567890\n1234567890'

    it "should trim from left when wrapping to a new line", ->
      l = new Layout
      block = l.openBlock conf width: 20
      block.write '12345678901234567890 \t 123456789012345678901'
      block.close()
      get(l).should.equal '12345678901234567890\n12345678901234567890\n1'

    it "should handle line breaks correctly", ->
      l = new Layout
      block = l.openBlock conf width: 20
      block.write '\na\n\nb\n'
      block.close()
      get(l).should.equal '\na\n\nb\n'

    it "should not put extra line breaks when a line is already broken", ->
      l = new Layout
      block = l.openBlock conf width: 20
      block.write '01234567890123456789\n0123456789'
      block.close()
      get(l).should.equal '01234567890123456789\n0123456789'

  describe "horizontal margins", ->
    it "should account for left margins", ->
      l = new Layout
      block = l.openBlock conf width: 20, left: 2
      block.write '01'
      block.close()
      get(l).should.equal '  01'

    it "should account for right margins", ->
      l = new Layout
      block = l.openBlock conf width: 20, right: 2
      block.write '01'
      block.close()
      get(l).should.equal '01  '

    it "should account for both margins", ->
      l = new Layout
      block = l.openBlock conf width: 20, right: 2, left: 1
      block.write '01'
      block.close()
      get(l).should.equal ' 01  '

    it "should break lines according to left margins", ->
      l = new Layout
      global.tick = yes
      block = l.openBlock conf width: 20, left: 2
      block.write '01234567890123456789'
      block.close()
      global.tick = no
      get(l).should.equal '  01234567890123456789'

    it "should break lines according to right margins", ->
      l = new Layout
      block = l.openBlock conf width: 20, right: 2
      block.write '01234567890123456789'
      block.close()
      get(l).should.equal '01234567890123456789  '

    it "should break lines according to both margins", ->
      l = new Layout
      block = l.openBlock conf width: 20, right: 2, left: 1
      block.write '01234567890123456789'
      block.close()
      get(l).should.equal ' 01234567890123456789  '

    it "should break lines according to terminal width", ->
      l = new Layout terminalWidth: 20
      block = l.openBlock conf right: 2, left: 1
      block.write '01234567890123456789'
      block.close()

      # Note: We don't expect ' 01234567890123456  \n 789  ',
      # since the first line (' 01234567890123456  ') is a full line
      # according to layout.config.terminalWidth and doesn't need
      # a break line.
      get(l).should.equal ' 01234567890123456   789  '

  describe "lines and blocks", ->
    it "should put one break line between: line, block", ->
      l = new Layout
      l.write 'a'
      l.openBlock().write('b').close()
      get(l).should.equal 'a\nb'

    it "should put one break line between: block, line", ->
      l = new Layout
      l.openBlock().write('a').close()
      l.write 'b'
      get(l).should.equal 'a\nb'

    it "should put one break line between: line, block, line", ->
      l = new Layout
      l.write 'a'
      l.openBlock().write('b').close()
      l.write 'c'
      get(l).should.equal 'a\nb\nc'

    it "margin top should work for: line, block", ->
      l = new Layout
      l.write 'a'
      l.openBlock(conf top: 2).write('b').close()
      get(l).should.equal 'a\n\n\nb'

    it "margin top should work for: block, line", ->
      l = new Layout
      l.openBlock(conf top: 1).write('a').close()
      l.write 'b'
      get(l).should.equal '\na\nb'

    it "margin top should work for: block, line, when block starts with a break", ->
      l = new Layout
      l.openBlock(conf top: 1).write('\na').close()
      l.write 'b'
      get(l).should.equal '\n\na\nb'

    it "margin top should work for: line, block, when line ends with a break", ->
      l = new Layout
      l.write 'a\n'
      l.openBlock(conf top: 1).write('b').close()
      get(l).should.equal 'a\n\n\nb'

    it "margin top should work for: line, block, when there are two breaks in between", ->
      l = new Layout
      l.write 'a\n'
      l.openBlock(conf top: 1).write('\nb').close()
      get(l).should.equal 'a\n\n\n\nb'

    it "margin bottom should work for: line, block", ->
      l = new Layout
      l.write 'a'
      l.openBlock(conf bottom: 1).write('b').close()
      get(l).should.equal 'a\nb\n'

    it "margin bottom should work for: block, line", ->
      l = new Layout
      l.openBlock(conf bottom: 1).write('a').close()
      l.write 'b'
      get(l).should.equal 'a\n\nb'

    it "margin bottom should work for: block, line, when block ends with a break", ->
      l = new Layout
      l.openBlock(conf bottom: 1).write('a\n').close()
      l.write 'b'
      get(l).should.equal 'a\n\n\nb'

    it "margin bottom should work for: block, line, when line starts with a break", ->
      l = new Layout
      l.openBlock(conf bottom: 1).write('a').close()
      l.write '\nb'
      get(l).should.equal 'a\n\n\nb'

    it "margin bottom should work for: block, line, when there are two breaks in between", ->
      l = new Layout
      l.openBlock(conf bottom: 1).write('a\n').close()
      l.write '\nb'
      get(l).should.equal 'a\n\n\n\nb'

  describe "blocks and blocks", ->
    it "should not get extra break lines for full-width lines", ->
      l = new Layout
      l.openBlock(conf width: 20).write('01234567890123456789').close()
      l.openBlock().write('b').close()
      get(l).should.equal '01234567890123456789\nb'

    it "should not get extra break lines for full-width lines followed by a margin", ->
      l = new Layout
      l.openBlock(conf width: 20, bottom: 1).write('01234567890123456789').close()
      l.openBlock().write('b').close()
      get(l).should.equal '01234567890123456789\n\nb'

    it "a(top: 0, bottom: 0) b(top: 0, bottom: 0)", ->
      l = new Layout
      l.openBlock().write('a').close()
      l.openBlock().write('b').close()
      get(l).should.equal 'a\nb'

    it "a(top: 0, bottom: 0) b(top: 1, bottom: 0)", ->
      l = new Layout
      l.openBlock().write('a').close()
      l.openBlock(conf(top: 1)).write('b').close()
      get(l).should.equal 'a\n\nb'

    it "a(top: 0, bottom: 1) b(top: 0, bottom: 0)", ->
      l = new Layout
      l.openBlock(conf(bottom: 1)).write('a').close()
      l.openBlock().write('b').close()
      get(l).should.equal 'a\n\nb'

    it "a(top: 0, bottom: 1   ) b(   top: 1, bottom: 0)", ->
      l = new Layout
      l.openBlock(conf(bottom: 1)).write('a').close()
      l.openBlock(conf(top: 1)).write('b').close()
      get(l).should.equal 'a\n\n\nb'

    it "a(top: 0, bottom: 1 br) b(br top: 1, bottom: 0)", ->
      l = new Layout
      l.openBlock(conf(bottom: 1)).write('a\n').close()
      l.openBlock(conf(top: 1)).write('\nb').close()
      get(l).should.equal 'a\n\n\n\n\nb'

    it "a(top: 2, bottom: 3 a1-br-a2) b(br-b1-br-br-b2-br top: 2, bottom: 3)", ->
      l = new Layout
      l.openBlock(conf(top: 2, bottom: 3)).write('a1\na2').close()
      l.openBlock(conf(top: 2, bottom: 3)).write('\nb1\n\nb2\n').close()
      get(l).should.equal '\n\na1\na2\n\n\n\n\n\n\nb1\n\nb2\n\n\n\n'

  describe "nesting", ->
    it "should break one line for nested blocks", ->
      l = new Layout
      l.write 'a'
      b = l.openBlock()
      c = b.openBlock().write('c').close()
      b.close()
      get(l).should.equal 'a\nc'

    it "a(left: 2) > b(top: 2)", ->
      l = new Layout
      a = l.openBlock(conf(left: 2))
      a.openBlock(conf(top: 2)).write('b').close()
      a.close()
      get(l).should.equal '  \n  \n  b'

    it "a(left: 2) > b(bottom: 2)", ->
      l = new Layout
      a = l.openBlock(conf(left: 2))
      a.openBlock(conf(bottom: 2)).write('b').close()
      a.close()
      get(l).should.equal '  b\n  \n  '

  describe "bullets", ->
    it "basic bullet", ->
      l = new Layout
      l.openBlock(conf(left: 3, bullet: yes)).write('a').close()
      get(l).should.equal '-  a'

    it "a(left: 3, bullet) > b(top:1)", ->
      l = new Layout
      a = l.openBlock(conf(left: 3, bullet: yes))
      b = a.openBlock(conf(top: 1)).write('b').close()
      a.close()
      get(l).should.equal '-  \n   b'