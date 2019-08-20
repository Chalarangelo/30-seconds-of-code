/**
 * @flow
 */

import JSXAttributeMock from './JSXAttributeMock';

export type TJSXElementMock = {
  type: 'JSXElement',
  openingElement: {
    type: 'JSXOpeningElement',
    name: {
      type: 'JSXIdentifier',
      name: string,
    },
    attributes: Array<JSXAttributeMock>,
  },
  children: Array<Node>,
};

export default function JSXElementMock(
  tagName: string,
  attributes: Array<JSXAttributeMock> = [],
  children: Array<Node> = [],
): TJSXElementMock {
  return {
    type: 'JSXElement',
    openingElement: {
      type: 'JSXOpeningElement',
      name: {
        type: 'JSXIdentifier',
        name: tagName,
      },
      attributes,
    },
    children,
  };
}
