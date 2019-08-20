/* global describe, it */

import postcss from 'postcss'
import assert from 'assert'

import constants from '../src'

const test = (input, expected) => {
  let processor = postcss([constants])
  assert.equal(processor.process(input).css, expected)
}

describe('constants', () => {
  it('should pass through an empty string', () => {
    test('', '')
  })

  it('should export a constant', () => {
    test('@value red blue;', ':export {\n  red: blue\n}')
  })

  it('gives an error when there is no semicolon between lines', () => {
    const input = '@value red blue\n@value green yellow'
    let processor = postcss([constants])
    const result = processor.process(input)
    const warnings = result.warnings()

    assert.equal(warnings.length, 1)
    assert.equal(warnings[0].text, 'Invalid value definition: red blue\n@value green yellow')
  })

  it('should export a more complex constant', () => {
    test('@value small (max-width: 599px);', ':export {\n  small: (max-width: 599px)\n}')
  })

  it('should replace constants within the file', () => {
    test('@value blue red; .foo { color: blue; }', ':export {\n  blue: red;\n}\n.foo { color: red; }')
  })

  it('should import and re-export a simple constant', () => {
    test('@value red from "./colors.css";', ':import("./colors.css") {\n  i__const_red_0: red\n}\n:export {\n  red: i__const_red_0\n}')
  })

  it('should import a simple constant and replace usages', () => {
    test('@value red from "./colors.css"; .foo { color: red; }', ':import("./colors.css") {\n  i__const_red_1: red;\n}\n:export {\n  red: i__const_red_1;\n}\n.foo { color: i__const_red_1; }')
  })

  it('should import and alias a constant and replace usages', () => {
    test('@value blue as red from "./colors.css"; .foo { color: red; }', ':import("./colors.css") {\n  i__const_red_2: blue;\n}\n:export {\n  red: i__const_red_2;\n}\n.foo { color: i__const_red_2; }')
  })

  it('should import multiple from a single file', () => {
    test(
      `@value blue, red from "./colors.css";
.foo { color: red; }
.bar { color: blue }`,
      `:import("./colors.css") {
  i__const_blue_3: blue;
  i__const_red_4: red;
}
:export {
  blue: i__const_blue_3;
  red: i__const_red_4;
}
.foo { color: i__const_red_4; }
.bar { color: i__const_blue_3 }`)
  })

  it('should import from a definition', () => {
    test(
      '@value colors: "./colors.css"; @value red from colors;',
      ':import("./colors.css") {\n  i__const_red_5: red\n}\n' +
      ':export {\n  colors: "./colors.css";\n  red: i__const_red_5\n}'
    )
  })

  it('should only allow values for paths if defined in the right order', () => {
    test(
      '@value red from colors; @value colors: "./colors.css";',
      ':import(colors) {\n  i__const_red_6: red\n}\n' +
      ':export {\n  red: i__const_red_6;\n  colors: "./colors.css"\n}'
    )
  })

  it('should allow transitive values', () => {
    test(
      '@value aaa: red;\n@value bbb: aaa;\n.a { color: bbb; }',
      ':export {\n  aaa: red;\n  bbb: red;\n}\n.a { color: red; }'
    )
  })

  it('should allow transitive values within calc', () => {
    test(
      '@value base: 10px;\n@value large: calc(base * 2);\n.a { margin: large; }',
      ':export {\n  base: 10px;\n  large: calc(10px * 2);\n}\n.a { margin: calc(10px * 2); }'
    )
  })

  it('should preserve import order', () => {
    test(
      '@value a from "./a.css"; @value b from "./b.css";',
      ':import("./a.css") {\n  i__const_a_7: a\n}\n' +
      ':import("./b.css") {\n  i__const_b_8: b\n}\n' +
      ':export {\n  a: i__const_a_7;\n  b: i__const_b_8\n}'
    )
  })

  it('should allow custom-property-style names', () => {
    test(
      '@value --red from "./colors.css"; .foo { color: --red; }',
      ':import("./colors.css") {\n  i__const___red_9: --red;\n}\n' +
      ':export {\n  --red: i__const___red_9;\n}\n' +
      '.foo { color: i__const___red_9; }')
  })

  it('should allow all colour types', () => {
    test(
      '@value named: red; @value 3char #0f0; @value 6char #00ff00; @value rgba rgba(34, 12, 64, 0.3); @value hsla hsla(220, 13.0%, 18.0%, 1);\n' +
      '.foo { color: named; background-color: 3char; border-top-color: 6char; border-bottom-color: rgba; outline-color: hsla; }',
      ':export {\n  named: red;\n  3char: #0f0;\n  6char: #00ff00;\n  rgba: rgba(34, 12, 64, 0.3);\n  hsla: hsla(220, 13.0%, 18.0%, 1);\n}\n' +
      '.foo { color: red; background-color: #0f0; border-top-color: #00ff00; border-bottom-color: rgba(34, 12, 64, 0.3); outline-color: hsla(220, 13.0%, 18.0%, 1); }')
  })

  it('should import multiple from a single file on multiple lines', () => {
    test(
      `@value (
  blue,
  red
) from "./colors.css";
.foo { color: red; }
.bar { color: blue }`,
      `:import("./colors.css") {
  i__const_blue_10: blue;
  i__const_red_11: red;
}
:export {
  blue: i__const_blue_10;
  red: i__const_red_11;
}
.foo { color: i__const_red_11; }
.bar { color: i__const_blue_10 }`)
  })

  it('should allow definitions with commas in them', () => {
    test(
      '@value coolShadow: 0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14)   ;\n' +
      '.foo { box-shadow: coolShadow; }',
      ':export {\n  coolShadow: 0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14);\n}\n' +
      '.foo { box-shadow: 0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14); }')
  })

  it('should allow values with nested parantheses', () => {
    test(
      '@value aaa: color(red lightness(50%));',
      ':export {\n  aaa: color(red lightness(50%))\n}'
    )
  })
})
