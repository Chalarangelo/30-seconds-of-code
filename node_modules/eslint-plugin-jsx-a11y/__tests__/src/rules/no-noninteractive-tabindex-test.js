/* eslint-env jest */
/**
 * @fileoverview Disallow tabindex on static and noninteractive elements
 * @author jessebeach
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import { configs } from '../../../src/index';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-noninteractive-tabindex';
import ruleOptionsMapperFactory from '../../__util__/ruleOptionsMapperFactory';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const ruleName = 'no-noninteractive-tabindex';

const expectedError = {
  message: '`tabIndex` should only be declared on interactive elements.',
  type: 'JSXAttribute',
};

const alwaysValid = [
  { code: '<MyButton tabIndex={0} />' },
  { code: '<button />' },
  { code: '<button tabIndex="0" />' },
  { code: '<button tabIndex={0} />' },
  { code: '<div />' },
  { code: '<div tabIndex="-1" />' },
  { code: '<div role="button" tabIndex="0" />' },
  { code: '<div role="article" tabIndex="-1" />' },
  { code: '<article tabIndex="-1" />' },
];

const neverValid = [
  { code: '<div tabIndex="0" />', errors: [expectedError] },
  { code: '<div role="article" tabIndex="0" />', errors: [expectedError] },
  { code: '<article tabIndex="0" />', errors: [expectedError] },
  { code: '<article tabIndex={0} />', errors: [expectedError] },
];

const recommendedOptions = (
  configs.recommended.rules[`jsx-a11y/${ruleName}`][1] || {}
);

ruleTester.run(`${ruleName}:recommended`, rule, {
  valid: [
    ...alwaysValid,
    { code: '<div role="tabpanel" tabIndex="0" />' },
    // Expressions should fail in strict mode
    { code: '<div role={ROLE_BUTTON} onClick={() => {}} tabIndex="0" />;' },
  ]
    .map(ruleOptionsMapperFactory(recommendedOptions))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
  ]
    .map(ruleOptionsMapperFactory(recommendedOptions))
    .map(parserOptionsMapper),
});

ruleTester.run(`${ruleName}:strict`, rule, {
  valid: [
    ...alwaysValid,
  ].map(parserOptionsMapper),
  invalid: [
    ...neverValid,
    { code: '<div role="tabpanel" tabIndex="0" />', errors: [expectedError] },
    // Expressions should fail in strict mode
    { code: '<div role={ROLE_BUTTON} onClick={() => {}} tabIndex="0" />;', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
