import toAST from 'to-ast'; // eslint-disable-line import/no-extraneous-dependencies
import JSXExpressionContainerMock from './JSXExpressionContainerMock';

export default function JSXAttributeMock(prop, value, isExpressionContainer = false) {
  let astValue;
  if (value && value.type !== undefined) {
    astValue = value;
  } else {
    astValue = toAST(value);
  }
  let attributeValue = astValue;
  if (isExpressionContainer || astValue.type !== 'Literal') {
    attributeValue = JSXExpressionContainerMock(astValue);
  }

  return {
    type: 'JSXAttribute',
    name: {
      type: 'JSXIdentifier',
      name: prop,
    },
    value: attributeValue,
  };
}
