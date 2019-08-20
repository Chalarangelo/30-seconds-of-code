var fm = require('../')
var fs = require('fs')
var path = require('path')
var test = require('tape')

test('var fm = require("front-matter")', function (t) {
  t.equal(typeof fm, 'function')
  t.end()
})

test('fm(string) - parse yaml delinetead by `---`', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/dashes-seperator.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')

      var content = fm(data)

      t.ok(content.attributes, 'should have `attributes` key')
      t.equal(content.attributes.title, 'Three dashes marks the spot')
      t.equal(content.attributes.tags.length, 3)

      t.ok(content.body, 'should have a `body` key')
      t.ok(content.body.match("don't break"), 'should match body')
      t.ok(content.body.match('---'), 'should match body')
      t.ok(content.body.match("Also this shouldn't be a problem"),
        'should match body')

      t.ok(content.frontmatter, 'should have a `frontmatter` key')
      t.ok(content.frontmatter.match('title: Three dashes marks the spot'), 'should match frontmatter')
      t.ok(content.frontmatter.match('expaned-description: with some --- crazy stuff in it'), 'should match frontmatter')

      t.end()
    })
})

test('fm(string) - parse yaml delinetead by `= yaml =`', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/yaml-seperator.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')

      var content = fm(data)
      var meta = content.attributes
      var body = content.body

      t.equal(meta.title, "I couldn't think of a better name")
      t.equal(meta.description, 'Just an example of using `= yaml =`')
      t.ok(body.match('Plays nice with markdown syntax highlighting'),
        'should match body')

      t.end()
    })
})

test('fm(string) - parse yaml ended by `...`', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/dots-ending.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')

      var content = fm(data)
      var meta = content.attributes
      var body = content.body

      t.equal(meta.title, 'Example with dots document ending')
      t.equal(meta.description, 'Just an example of using `...`')
      t.ok(body.match("It shouldn't break with ..."),
        'should match body')

      t.end()
    })
})

test('fm(string) - string missing front-matter', function (t) {
  var content = fm('No front matter here')

  t.equal(content.body, 'No front matter here')
  t.end()
})

test('fm(string) - string missing body', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/missing-body.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')

      var content = fm(data)

      t.equal(content.attributes.title, 'Three dashes marks the spot')
      t.equal(content.attributes.tags.length, 3)
      t.equal(content.body, '')
      t.end()
    })
})

test('fm(string) - wrapped test in yaml', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/wrapped-text.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')

      var content = fm(data)
      var folded = [
        'There once was a man from Darjeeling',
        'Who got on a bus bound for Ealing',
        '    It said on the door',
        '    "Please don\'t spit on the floor"',
        'So he carefully spat on the ceiling\n'
      ].join('\n')

      t.equal(content.attributes['folded-text'], folded)
      t.ok(content.body.match('Some crazy stuff going on up there'),
        'should match body')

      t.end()
    })
})

test('fm(string) - strings with byte order mark', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/bom.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')

      var content = fm(data)

      t.equal(content.attributes.title, "Relax guy, I'm not hiding any BOMs")

      t.end()
    })
})

test('fm(string) - no front matter, markdown with hr', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/no-front-matter.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read should not error')

      var content = fm(data)
      t.equal(content.body, data)
      t.end()
    })
})

test('fm(string) - complex yaml', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/complex-yaml.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')
      var content = fm(data)
      t.ok(content.attributes, 'should have `attributes` key')
      t.equal(content.attributes.title, 'This is a title!')
      t.equal(content.attributes.contact, null)
      t.equal(content.attributes.match.toString(), '/pattern/gim')
      t.end()
    })
})

test('fm.test(string) - yaml seperator', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/yaml-seperator.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')
      t.equal(fm.test(data), true)
      t.end()
    })
})

test('fm.test(string) - dashes seperator', function (t) {
  fs.readFile(
    path.resolve(__dirname, '../examples/dashes-seperator.md'),
    'utf8',
    function (err, data) {
      t.error(err, 'read(...) should not error')
      t.equal(fm.test(data), true)
      t.end()
    })
})

test('fm.test(string) - no front-matter', function (t) {
  t.equal(fm.test('no front matter here'), false)
  t.end()
})

test('Supports live updating', function (t) {
  var seperator = '---'
  var string = ''
  for (var i = 0; i < seperator.length; i++) {
    string += seperator[i]

    try {
      fm(string)
    } catch (e) {
      t.error(e)
    }
  }

  string += '\n'
  string += 'foo: bar'

  var content = fm(string)

  t.same(content, {
    attributes: {},
    body: string
  })

  string += '\n---\n'
  content = fm(string)
  t.same(content, {
    attributes: { foo: 'bar' },
    body: '',
    frontmatter: 'foo: bar'
  })

  t.end()
})
