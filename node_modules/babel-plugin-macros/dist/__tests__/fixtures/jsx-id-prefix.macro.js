// adds "prefix-" to each `id` attribute
const {createMacro} = require('../../')

module.exports = createMacro(wrapWidget)

function wrapWidget({references, babel}) {
  const {types: t} = babel
  references.default.forEach(wrap => {
    wrap.parentPath.traverse({
      JSXAttribute(path) {
        const name = path.get('name')
        if (t.isJSXIdentifier(name) && name.node.name === 'id') {
          const value = path.get('value')
          if (t.isStringLiteral(value))
            value.replaceWith(t.stringLiteral(`macro-${value.node.value}`))
        }
      },
    })
  })
}
