/* eslint-env jest */
/**
 * @fileoverview Enforce scope prop is only used on <th> elements.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/scope';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'The scope prop can only be used on <th> elements.',
  type: 'JSXAttribute',
};

ruleTester.run('scope', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<div foo />;' },
    { code: '<th scope />' },
    { code: '<th scope="row" />' },
    { code: '<th scope={foo} />' },
    { code: '<th scope={"col"} {...props} />' },
    { code: '<Foo scope="bar" {...props} />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<div scope />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
