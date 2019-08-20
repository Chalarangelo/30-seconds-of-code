export const parser = 'flow';

export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const s = j(file.source);
  const { ruleName, rulePath } = options || {};

  const nameSort = (a, b) => {
    const aName = a.key.type === 'Literal' ? a.key.value : a.key.name;
    const bName = b.key.type === 'Literal' ? b.key.value : b.key.name;
    if (aName < bName) {
      return -1;
    }
    if (bName < aName) {
      return 1;
    }
    return 0;
  };

  let changesMade = 0;

  const rulePathInSrc = `./${rulePath.match(/src\/(.*)\.js/)[1]}`;

  changesMade += s
    .find(j.Identifier, {
      name: 'rules',
    })
    .forEach((path, index) => {
      // Add rule path.
      if (index === 0) {
        path.parentPath.value.value.properties.unshift(j.property(
          'init',
          j.literal(ruleName),
          j.callExpression(j.identifier('require'), [j.literal(rulePathInSrc)]),
        ));
        path.parentPath.value.value.properties.sort(nameSort);
      }
      // Set default reporting to error.
      if (index === 1) {
        path.parentPath.value.value.properties.unshift(j.property('init', j.literal(`jsx-a11y/${ruleName}`), j.literal('error')));
        path.parentPath.value.value.properties.sort(nameSort);
      }
    }).length;

  if (changesMade === 0) {
    return null;
  }

  return s.toSource({
    quote: 'single',
    trailingComma: true,
  });
}
