/* eslint-env jest */
/**
 * @fileoverview Enforce tabIndex value is not greater than zero.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/tabindex-no-positive';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Avoid positive integer values for tabIndex.',
  type: 'JSXAttribute',
};

ruleTester.run('tabindex-no-positive', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<div {...props} />' },
    { code: '<div id="main" />' },
    { code: '<div tabIndex={undefined} />' },
    { code: '<div tabIndex={`${undefined}`} />' },
    { code: '<div tabIndex={`${undefined}${undefined}`} />' },
    { code: '<div tabIndex={0} />' },
    { code: '<div tabIndex={-1} />' },
    { code: '<div tabIndex={null} />' },
    { code: '<div tabIndex={bar()} />' },
    { code: '<div tabIndex={bar} />' },
    { code: '<div tabIndex={"foobar"} />' },
    { code: '<div tabIndex="0" />' },
    { code: '<div tabIndex="-1" />' },
    { code: '<div tabIndex="-5" />' },
    { code: '<div tabIndex="-5.5" />' },
    { code: '<div tabIndex={-5.5} />' },
    { code: '<div tabIndex={-5} />' },
  ].map(parserOptionsMapper),

  invalid: [
    { code: '<div tabIndex="1" />', errors: [expectedError] },
    { code: '<div tabIndex={1} />', errors: [expectedError] },
    { code: '<div tabIndex={"1"} />', errors: [expectedError] },
    { code: '<div tabIndex={`1`} />', errors: [expectedError] },
    { code: '<div tabIndex={1.589} />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
