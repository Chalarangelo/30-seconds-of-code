/* eslint-env jest */
/**
 * @fileoverview Enforce usage of onBlur over onChange on select menus for accessibility.
 * @author Ethan Cohen
 */


// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-onchange';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'onBlur must be used instead of onchange, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users.',
  type: 'JSXOpeningElement',
};

ruleTester.run('no-onchange', rule, {
  valid: [
    { code: '<select onBlur={() => {}} />;' },
    { code: '<select onBlur={handleOnBlur} />;' },
    { code: '<option />;' },
    { code: '<option onBlur={() => {}} onChange={() => {}} />;' },
    { code: '<option {...props} />' },
    { code: '<input onChange={() => {}} />;' },
    { code: '<input onChange={handleOnChange} />;' },
    { code: '<input />;' },
    { code: '<input onChange={() => {}} onChange={() => {}} />;' },
    { code: '<input {...props} />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<select onChange={() => {}} />;', errors: [expectedError] },
    { code: '<select onChange={handleOnChange} />;', errors: [expectedError] },
    { code: '<option onChange={() => {}} />', errors: [expectedError] },
    { code: '<option onChange={() => {}} {...props} />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
