/* eslint-env jest */
/**
 * @fileoverview Enforce that elements with ARIA roles must
 *  have all required attributes for that role.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { roles } from 'aria-query';
import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/role-has-required-aria-props';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const errorMessage = (role) => {
  const requiredProps = Object.keys(roles.get(role).requiredProps);

  return {
    message: `Elements with the ARIA role "${role}" must have the following attributes defined: ${requiredProps}`,
    type: 'JSXAttribute',
  };
};


// Create basic test cases using all valid role types.
const basicValidityTests = [...roles.keys()].map((role) => {
  const {
    requiredProps: requiredPropKeyValues,
  } = roles.get(role);
  const requiredProps = Object.keys(requiredPropKeyValues);
  const propChain = requiredProps.join(' ');

  return {
    code: `<div role="${role.toLowerCase()}" ${propChain} />`,
  };
});

ruleTester.run('role-has-required-aria-props', rule, {
  valid: [
    { code: '<Bar baz />' },
    { code: '<MyComponent role="combobox" />' },
    // Variables should pass, as we are only testing literals.
    { code: '<div />' },
    { code: '<div></div>' },
    { code: '<div role={role} />' },
    { code: '<div role={role || "button"} />' },
    { code: '<div role={role || "foobar"} />' },
    { code: '<div role="row" />' },
    { code: '<span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span>' },
    { code: '<input role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0" {...props} type="checkbox" />' },
    { code: '<input type="checkbox" role="switch" />' },
  ].concat(basicValidityTests).map(parserOptionsMapper),

  invalid: [
    // SLIDER
    { code: '<div role="slider" />', errors: [errorMessage('slider')] },
    {
      code: '<div role="slider" aria-valuemax />',
      errors: [errorMessage('slider')],
    },
    {
      code: '<div role="slider" aria-valuemax aria-valuemin />',
      errors: [errorMessage('slider')],
    },
    {
      code: '<div role="slider" aria-valuemax aria-valuenow />',
      errors: [errorMessage('slider')],
    },
    {
      code: '<div role="slider" aria-valuemin aria-valuenow />',
      errors: [errorMessage('slider')],
    },

    // SPINBUTTON
    { code: '<div role="spinbutton" />', errors: [errorMessage('spinbutton')] },
    {
      code: '<div role="spinbutton" aria-valuemax />',
      errors: [errorMessage('spinbutton')],
    },
    {
      code: '<div role="spinbutton" aria-valuemax aria-valuemin />',
      errors: [errorMessage('spinbutton')],
    },
    {
      code: '<div role="spinbutton" aria-valuemax aria-valuenow />',
      errors: [errorMessage('spinbutton')],
    },
    {
      code: '<div role="spinbutton" aria-valuemin aria-valuenow />',
      errors: [errorMessage('spinbutton')],
    },

    // CHECKBOX
    { code: '<div role="checkbox" />', errors: [errorMessage('checkbox')] },
    { code: '<div role="checkbox" checked />', errors: [errorMessage('checkbox')] },
    {
      code: '<div role="checkbox" aria-chcked />',
      errors: [errorMessage('checkbox')],
    },
    {
      code: '<span role="checkbox" aria-labelledby="foo" tabindex="0"></span>',
      errors: [errorMessage('checkbox')],
    },

    // COMBOBOX
    { code: '<div role="combobox" />', errors: [errorMessage('combobox')] },
    { code: '<div role="combobox" expanded />', errors: [errorMessage('combobox')] },
    {
      code: '<div role="combobox" aria-expandd />',
      errors: [errorMessage('combobox')],
    },

    // SCROLLBAR
    { code: '<div role="scrollbar" />', errors: [errorMessage('scrollbar')] },
    {
      code: '<div role="scrollbar" aria-valuemax />',
      errors: [errorMessage('scrollbar')],
    },
    {
      code: '<div role="scrollbar" aria-valuemax aria-valuemin />',
      errors: [errorMessage('scrollbar')],
    },
    {
      code: '<div role="scrollbar" aria-valuemax aria-valuenow />',
      errors: [errorMessage('scrollbar')],
    },
    {
      code: '<div role="scrollbar" aria-valuemin aria-valuenow />',
      errors: [errorMessage('scrollbar')],
    },
  ].map(parserOptionsMapper),
});
