/**
 * @flow
 */

import IdentifierMock from './IdentifierMock';

export default function JSXSpreadAttributeMock(identifier: string) {
  return {
    type: 'JSXSpreadAttribute',
    argument: IdentifierMock(identifier),
  };
}
