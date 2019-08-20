AnsiPainter = require '../src/AnsiPainter'

paint = (t) ->
  AnsiPainter.paint(t)

describe "AnsiPainter", ->
  describe "paint()", ->
    it "should handle basic coloring", ->
      t = "<bg-white><black>a</black></bg-white>"
      paint(t).should.equal '\u001b[30m\u001b[47ma\u001b[0m'

    it "should handle color in color", ->
      t = "<red>a<blue>b</blue></red>"
      paint(t).should.equal '\u001b[31ma\u001b[0m\u001b[34mb\u001b[0m'

    it "should skip empty tags", ->
      t = "<blue></blue>a"
      paint(t).should.equal 'a\u001b[0m'

  describe "_replaceSpecialStrings()", ->
    it "should work", ->
      AnsiPainter::_replaceSpecialStrings('&lt;&gt;&quot;&sp;&amp;').should.equal '<>" &'