/* eslint-env jest */
/**
 * @fileoverview Enforce autoFocus prop is not used.
 * @author Ethan Cohen <@evcohen>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-autofocus';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'The autoFocus prop should not be used, as it can reduce usability and accessibility for users.',
  type: 'JSXAttribute',
};

const ignoreNonDOMSchema = [
  {
    ignoreNonDOM: true,
  },
];

ruleTester.run('no-autofocus', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<div autofocus />;' },
    { code: '<input autofocus="true" />;' },
    { code: '<Foo bar />' },
    { code: '<Foo autoFocus />', options: ignoreNonDOMSchema },
    { code: '<div><div autofocus /></div>', options: ignoreNonDOMSchema },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<div autoFocus />', errors: [expectedError] },
    { code: '<div autoFocus={true} />', errors: [expectedError] },
    { code: '<div autoFocus={false} />', errors: [expectedError] },
    { code: '<div autoFocus={undefined} />', errors: [expectedError] },
    { code: '<div autoFocus="true" />', errors: [expectedError] },
    { code: '<div autoFocus="false" />', errors: [expectedError] },
    { code: '<input autoFocus />', errors: [expectedError] },
    { code: '<Foo autoFocus />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
