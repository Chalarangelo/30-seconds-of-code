const testBoilerplate = (name, author, description) => `/* eslint-env jest */
/**
 * @fileoverview ${description}
 * @author ${author}
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/${name}';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '',
  type: 'JSXOpeningElement',
};

ruleTester.run('${name}', rule, {
  valid: [
    { code: '<div />;' },
  ].map(parserOptionsMapper),
  invalid: [].map(parserOptionsMapper),
});
`;

module.exports = testBoilerplate;
