/* eslint-env jest */
/**
 * @fileoverview Enforce html element has lang prop.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/html-has-lang';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '<html> elements must have the lang prop.',
  type: 'JSXOpeningElement',
};

ruleTester.run('html-has-lang', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<html lang="en" />' },
    { code: '<html lang="en-US" />' },
    { code: '<html lang={foo} />' },
    { code: '<html lang />' },
    { code: '<HTML />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<html />', errors: [expectedError] },
    { code: '<html {...props} />', errors: [expectedError] },
    { code: '<html lang={undefined} />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
