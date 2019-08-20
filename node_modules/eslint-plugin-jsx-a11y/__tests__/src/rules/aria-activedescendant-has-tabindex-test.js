/**
 * @fileoverview Enforce elements with aria-activedescendant are tabbable.
 * @author Jesse Beach <@jessebeach>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/aria-activedescendant-has-tabindex';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'An element that manages focus with `aria-activedescendant` must be tabbable',
  type: 'JSXOpeningElement',
};

ruleTester.run('aria-activedescendant-has-tabindex', rule, {
  valid: [
    {
      code: '<CustomComponent />;',
    },
    {
      code: '<CustomComponent aria-activedescendant={someID} />;',
    },
    {
      code: '<CustomComponent aria-activedescendant={someID} tabIndex={0} />;',
    },
    {
      code: '<CustomComponent aria-activedescendant={someID} tabIndex={-1} />;',
    },
    {
      code: '<div />;',
    },
    {
      code: '<input />;',
    },
    {
      code: '<div tabIndex={0} />;',
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex={0} />;',
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex="0" />;',
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex={1} />;',
    },
    {
      code: '<input aria-activedescendant={someID} />;',
    },
    {
      code: '<input aria-activedescendant={someID} tabIndex={0} />;',
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<div aria-activedescendant={someID} />;',
      errors: [expectedError],
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex={-1} />;',
      errors: [expectedError],
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex="-1" />;',
      errors: [expectedError],
    },
    {
      code: '<input aria-activedescendant={someID} tabIndex={-1} />;',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
