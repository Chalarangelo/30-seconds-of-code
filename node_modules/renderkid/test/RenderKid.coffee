RenderKid = require '../src/RenderKid'
{strip} = require '../src/AnsiPainter'

match = (input, expected, setStuff) ->
  r = new RenderKid
  r.style
    span:
      display: 'inline'
    div:
      display: 'block'

  setStuff?(r)
  strip(r.render(input)).trim().should.equal expected.trim()

describe "RenderKid", ->
  describe "constructor()", ->
    it "should work", ->
      new RenderKid

  describe "whitespace management - inline", ->
    it "shouldn't put extra whitespaces", ->
      input = """

      a<span>b</span>c

      """

      expected = """

        abc

      """

      match input, expected

    it "should allow 1 whitespace character on each side", ->
      input = """

      a<span>   b     </span>c

      """

      expected = """

        a b c

      """

      match input, expected

    it "should eliminate extra whitespaces inside text", ->
      input = """

      a<span>b1 \n  b2</span>c

      """

      expected = """

        ab1 b2c

      """

      match input, expected

    it "should allow line breaks with <br />", ->
      input = """

      a<span>b1<br />b2</span>c

      """

      expected = """

        ab1\nb2c

      """

      match input, expected

    it "should allow line breaks with &nl;", ->
      input = """

      a<span>b1&nl;b2</span>c

      """

      expected = """

        ab1\nb2c

      """

      match input, expected

    it "should allow whitespaces with &sp;", ->
      input = """

      a<span>b1&sp;b2</span>c

      """

      expected = """

        ab1 b2c

      """

      match input, expected

  describe "whitespace management - block", ->
    it "should add one linebreak between two blocks", ->
      input = """

        <div>a</div>
        <div>b</div>

      """

      expected = """

        a
        b

      """

      match input, expected

    it "should ignore empty blocks", ->
      input = """

        <div>a</div>
        <div></div>
        <div>b</div>

      """

      expected = """

        a
        b

      """

      match input, expected

    it "should add an extra linebreak between two adjacent blocks inside an inline", ->
      input = """

        <span>
          <div>a</div>
          <div>b</div>
        </span>

      """

      expected = """

        a

        b

      """

      match input, expected

    it "example: div(marginBottom:1)+div", ->
      input = """

        <div class="first">a</div>
        <div>b</div>

      """

      expected = """

        a

        b

      """

      match input, expected, (r) ->
        r.style '.first': marginBottom: 1

    it "example: div+div(marginTop:1)", ->
      input = """

        <div>a</div>
        <div class="second">b</div>

      """

      expected = """

        a

        b

      """

      match input, expected, (r) ->
        r.style '.second': marginTop: 1

    it "example: div(marginBottom:1)+div(marginTop:1)", ->
      input = """

        <div class="first">a</div>
        <div class="second">b</div>

      """

      expected = """

        a


        b

      """

      match input, expected, (r) ->
        r.style
          '.first': marginBottom: 1
          '.second': marginTop: 1

    it "example: div(marginBottom:2)+div(marginTop:1)", ->
      input = """

        <div class="first">a</div>
        <div class="second">b</div>

      """

      expected = """

        a



        b

      """

      match input, expected, (r) ->
        r.style
          '.first': marginBottom: 2
          '.second': marginTop: 1

    it "example: div(marginBottom:2)+span+div(marginTop:1)", ->
      input = """

        <div class="first">a</div>
        <span>span</span>
        <div class="second">b</div>

      """

      expected = """

        a


        span

        b

      """

      match input, expected, (r) ->
        r.style
          '.first': marginBottom: 2
          '.second': marginTop: 1