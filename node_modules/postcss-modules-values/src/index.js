import postcss from 'postcss'
import replaceSymbols, {replaceAll} from 'icss-replace-symbols'

const matchImports = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/
const matchValueDefinition = /(?:\s+|^)([\w-]+):?\s+(.+?)\s*$/g
const matchImport = /^([\w-]+)(?:\s+as\s+([\w-]+))?/
let options = {}
let importIndex = 0
let createImportedName = options && options.createImportedName || ((importName/*, path*/) => `i__const_${importName.replace(/\W/g, '_')}_${importIndex++}`)

export default postcss.plugin('postcss-modules-values', () => (css, result) => {
  let importAliases = []
  let definitions = {}

  const addDefinition = atRule => {
    let matches
    while (matches = matchValueDefinition.exec(atRule.params)) {
      let [/*match*/, key, value] = matches
      // Add to the definitions, knowing that values can refer to each other
      definitions[key] = replaceAll(definitions, value)
      atRule.remove()
    }
  }

  const addImport = atRule => {
    let matches = matchImports.exec(atRule.params)
    if (matches) {
      let [/*match*/, aliases, path] = matches
      // We can use constants for path names
      if (definitions[path]) path = definitions[path]
      let imports = aliases.replace(/^\(\s*([\s\S]+)\s*\)$/, '$1').split(/\s*,\s*/).map(alias => {
        let tokens = matchImport.exec(alias)
        if (tokens) {
          let [/*match*/, theirName, myName = theirName] = tokens
          let importedName = createImportedName(myName)
          definitions[myName] = importedName
          return { theirName, importedName }
        } else {
          throw new Error(`@import statement "${alias}" is invalid!`)
        }
      })
      importAliases.push({ path, imports })
      atRule.remove()
    }
  }

  /* Look at all the @value statements and treat them as locals or as imports */
  css.walkAtRules('value', atRule => {
    if (matchImports.exec(atRule.params)) {
      addImport(atRule)
    } else {
      if (atRule.params.indexOf('@value') !== -1) {
        result.warn('Invalid value definition: ' + atRule.params)
      }

      addDefinition(atRule)
    }
  })

  /* We want to export anything defined by now, but don't add it to the CSS yet or
   it well get picked up by the replacement stuff */
  let exportDeclarations = Object.keys(definitions).map(key => postcss.decl({
    value: definitions[key],
    prop: key,
    raws: { before: "\n  " }
  }))

  /* If we have no definitions, don't continue */
  if (!Object.keys(definitions).length) return

  /* Perform replacements */
  replaceSymbols(css, definitions)

  /* Add export rules if any */
  if (exportDeclarations.length > 0) {
    let exportRule = postcss.rule({
      selector: `:export`,
      raws: { after: "\n" }
    })
    exportRule.append(exportDeclarations)
    css.prepend(exportRule)
  }

  /* Add import rules */
  importAliases.reverse().forEach(({ path, imports }) => {
    let importRule = postcss.rule({
      selector: `:import(${path})`,
      raws: { after: "\n" }
    })
    imports.forEach(({ theirName, importedName }) => {
      importRule.append({
        value: theirName,
        prop: importedName,
        raws: { before: "\n  " }
      })
    })

    css.prepend(importRule)
  })
})
