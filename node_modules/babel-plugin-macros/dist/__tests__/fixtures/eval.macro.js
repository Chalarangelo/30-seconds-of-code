const {parse} = require('@babel/parser')
// const printAST = require('ast-pretty-print')
const {createMacro} = require('../../')

module.exports = createMacro(evalMacro)

function evalMacro({references, state}) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === 'TaggedTemplateExpression') {
      asTag(referencePath.parentPath.get('quasi'), state)
    } else if (referencePath.parentPath.type === 'CallExpression') {
      asFunction(referencePath.parentPath.get('arguments'), state)
    } else if (referencePath.parentPath.type === 'JSXOpeningElement') {
      asJSX(
        {
          attributes: referencePath.parentPath.get('attributes'),
          children: referencePath.parentPath.parentPath.get('children'),
        },
        state,
      )
    } else {
      // TODO: throw a helpful error message
    }
  })
}

function asTag(quasiPath) {
  const value = quasiPath.parentPath.get('quasi').evaluate().value
  quasiPath.parentPath.replaceWith(evalToAST(value))
}

function asFunction(argumentsPaths) {
  const value = argumentsPaths[0].evaluate().value
  argumentsPaths[0].parentPath.replaceWith(evalToAST(value))
}

// eslint-disable-next-line no-unused-vars
function asJSX({attributes, children}) {
  // It's a shame you cannot use evaluate() with JSX
  const value = children[0].node.value
  children[0].parentPath.replaceWith(evalToAST(value))
}

function evalToAST(value) {
  let x
  // eslint-disable-next-line
  eval(`x = ${value}`)
  return thingToAST(x)
}

function thingToAST(object) {
  const fileNode = parse(`var x = ${JSON.stringify(object)}`)
  return fileNode.program.body[0].declarations[0].init
}
