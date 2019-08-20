/* eslint-env jest */
/**
 * @fileoverview Enforce explicit role property is not the
 * same as implicit default role property on element.
 * @author Ethan Cohen <@evcohen>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-redundant-roles';
import ruleOptionsMapperFactory from '../../__util__/ruleOptionsMapperFactory';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = (element, implicitRole) => ({
  message: `The element ${element} has an implicit role of ${implicitRole}. Defining this explicitly is redundant and should be avoided.`,
  type: 'JSXOpeningElement',
});

const ruleName = 'jsx-a11y/no-redundant-roles';

const alwaysValid = [
  { code: '<div />;' },
  { code: '<button role="main" />' },
  { code: '<MyComponent role="button" />' },
  { code: '<button role={`${foo}button`} />' },
];

const neverValid = [
  { code: '<button role="button" />', errors: [expectedError('button', 'button')] },
  { code: '<body role="DOCUMENT" />', errors: [expectedError('body', 'document')] },
];

ruleTester.run(`${ruleName}:recommended`, rule, {
  valid: [
    ...alwaysValid,
    { code: '<nav role="navigation" />' },
  ]
    .map(parserOptionsMapper),
  invalid: neverValid
    .map(parserOptionsMapper),
});

const noNavExceptionsOptions = { nav: [] };

ruleTester.run(`${ruleName}:recommended`, rule, {
  valid: alwaysValid
    .map(ruleOptionsMapperFactory(noNavExceptionsOptions))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
    { code: '<nav role="navigation" />', errors: [expectedError('nav', 'navigation')] },
  ]
    .map(ruleOptionsMapperFactory(noNavExceptionsOptions))
    .map(parserOptionsMapper),
});
