// babel-plugin adding `plugin-` prefix to each "id" JSX attribute
module.exports = main

function main({types: t}) {
  return {
    visitor: {
      // intentionally traversing from Program,
      // if it matches JSXAttribute here the issue won't be reproduced
      Program(progPath) {
        progPath.traverse({
          JSXAttribute(path) {
            const name = path.get('name')
            if (t.isJSXIdentifier(name) && name.node.name === 'id') {
              const value = path.get('value')
              if (t.isStringLiteral(value))
                value.replaceWith(t.stringLiteral(`plugin-${value.node.value}`))
            }
          },
        })
      },
    },
  }
}
