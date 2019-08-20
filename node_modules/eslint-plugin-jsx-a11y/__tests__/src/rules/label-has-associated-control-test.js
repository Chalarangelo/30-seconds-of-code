/* eslint-env jest */
/**
 * @fileoverview Enforce label tags have an associated control.
 * @author Jesse Beach
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/label-has-associated-control';
import ruleOptionsMapperFactory from '../../__util__/ruleOptionsMapperFactory';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const ruleName = 'label-has-associated-control';

const expectedError = {
  message: 'A form label must be associated with a control.',
  type: 'JSXOpeningElement',
};

const htmlForValid = [
  { code: '<label htmlFor="js_id"><span><span><span>A label</span></span></span></label>', options: [{ depth: 4 }] },
  { code: '<label htmlFor="js_id" aria-label="A label" />' },
  { code: '<label htmlFor="js_id" aria-labelledby="A label" />' },
  // Custom label component.
  { code: '<CustomLabel htmlFor="js_id" aria-label="A label" />', options: [{ labelComponents: ['CustomLabel'] }] },
  { code: '<CustomLabel htmlFor="js_id" label="A label" />', options: [{ labelAttributes: ['label'], labelComponents: ['CustomLabel'] }] },
  // Custom label attributes.
  { code: '<label htmlFor="js_id" label="A label" />', options: [{ labelAttributes: ['label'] }] },
];
const nestingValid = [
  { code: '<label>A label<input /></label>' },
  { code: '<label>A label<textarea /></label>' },
  { code: '<label><img alt="A label" /><input /></label>' },
  { code: '<label><img aria-label="A label" /><input /></label>' },
  { code: '<label><span>A label<input /></span></label>' },
  { code: '<label><span><span>A label<input /></span></span></label>', options: [{ depth: 3 }] },
  { code: '<label><span><span><span>A label<input /></span></span></span></label>', options: [{ depth: 4 }] },
  { code: '<label><span><span><span><span>A label</span><input /></span></span></span></label>', options: [{ depth: 5 }] },
  { code: '<label><span><span><span><span aria-label="A label" /><input /></span></span></span></label>', options: [{ depth: 5 }] },
  { code: '<label><span><span><span><input aria-label="A label" /></span></span></span></label>', options: [{ depth: 5 }] },
  // Custom controlComponents.
  { code: '<label><span>A label<CustomInput /></span></label>', options: [{ controlComponents: ['CustomInput'] }] },
  { code: '<CustomLabel><span>A label<CustomInput /></span></CustomLabel>', options: [{ controlComponents: ['CustomInput'], labelComponents: ['CustomLabel'] }] },
  { code: '<CustomLabel><span label="A label"><CustomInput /></span></CustomLabel>', options: [{ controlComponents: ['CustomInput'], labelComponents: ['CustomLabel'], labelAttributes: ['label'] }] },
];

const bothValid = [
  { code: '<label htmlFor="js_id"><span><span><span>A label<input /></span></span></span></label>', options: [{ depth: 4 }] },
  { code: '<label htmlFor="js_id" aria-label="A label"><input /></label>' },
  { code: '<label htmlFor="js_id" aria-labelledby="A label"><input /></label>' },
  { code: '<label htmlFor="js_id" aria-labelledby="A label"><textarea /></label>' },
  // Custom label component.
  { code: '<CustomLabel htmlFor="js_id" aria-label="A label"><input /></CustomLabel>', options: [{ labelComponents: ['CustomLabel'] }] },
  { code: '<CustomLabel htmlFor="js_id" label="A label"><input /></CustomLabel>', options: [{ labelAttributes: ['label'], labelComponents: ['CustomLabel'] }] },
  // Custom label attributes.
  { code: '<label htmlFor="js_id" label="A label"><input /></label>', options: [{ labelAttributes: ['label'] }] },
  { code: '<label htmlFor="selectInput">Some text<select id="selectInput" /></label>' },
];

const alwaysValid = [
  { code: '<div />' },
  { code: '<CustomElement />' },
];

const htmlForInvalid = [
  { code: '<label htmlFor="js_id"><span><span><span>A label</span></span></span></label>', options: [{ depth: 4 }], errors: [expectedError] },
  { code: '<label htmlFor="js_id" aria-label="A label" />', errors: [expectedError] },
  { code: '<label htmlFor="js_id" aria-labelledby="A label" />', errors: [expectedError] },
  // Custom label component.
  { code: '<CustomLabel htmlFor="js_id" aria-label="A label" />', options: [{ labelComponents: ['CustomLabel'] }], errors: [expectedError] },
  { code: '<CustomLabel htmlFor="js_id" label="A label" />', options: [{ labelAttributes: ['label'], labelComponents: ['CustomLabel'] }], errors: [expectedError] },
  // Custom label attributes.
  { code: '<label htmlFor="js_id" label="A label" />', options: [{ labelAttributes: ['label'] }], errors: [expectedError] },
];
const nestingInvalid = [
  { code: '<label>A label<input /></label>', errors: [expectedError] },
  { code: '<label>A label<textarea /></label>', errors: [expectedError] },
  { code: '<label><img alt="A label" /><input /></label>', errors: [expectedError] },
  { code: '<label><img aria-label="A label" /><input /></label>', errors: [expectedError] },
  { code: '<label><span>A label<input /></span></label>', errors: [expectedError] },
  { code: '<label><span><span>A label<input /></span></span></label>', options: [{ depth: 3 }], errors: [expectedError] },
  { code: '<label><span><span><span>A label<input /></span></span></span></label>', options: [{ depth: 4 }], errors: [expectedError] },
  { code: '<label><span><span><span><span>A label</span><input /></span></span></span></label>', options: [{ depth: 5 }], errors: [expectedError] },
  { code: '<label><span><span><span><span aria-label="A label" /><input /></span></span></span></label>', options: [{ depth: 5 }], errors: [expectedError] },
  { code: '<label><span><span><span><input aria-label="A label" /></span></span></span></label>', options: [{ depth: 5 }], errors: [expectedError] },
  // Custom controlComponents.
  { code: '<label><span>A label<CustomInput /></span></label>', options: [{ controlComponents: ['CustomInput'] }], errors: [expectedError] },
  { code: '<CustomLabel><span>A label<CustomInput /></span></CustomLabel>', options: [{ controlComponents: ['CustomInput'], labelComponents: ['CustomLabel'] }], errors: [expectedError] },
  { code: '<CustomLabel><span label="A label"><CustomInput /></span></CustomLabel>', options: [{ controlComponents: ['CustomInput'], labelComponents: ['CustomLabel'], labelAttributes: ['label'] }], errors: [expectedError] },
];

const neverValid = [
  { code: '<label htmlFor="js_id" />', errors: [expectedError] },
  { code: '<label htmlFor="js_id"><input /></label>', errors: [expectedError] },
  { code: '<label htmlFor="js_id"><textarea /></label>', errors: [expectedError] },
  { code: '<label></label>', errors: [expectedError] },
  { code: '<label>A label</label>', errors: [expectedError] },
  { code: '<div><label /><input /></div>', errors: [expectedError] },
  { code: '<div><label>A label</label><input /></div>', errors: [expectedError] },
  // Custom label component.
  { code: '<CustomLabel aria-label="A label" />', options: [{ labelComponents: ['CustomLabel'] }], errors: [expectedError] },
  { code: '<CustomLabel label="A label" />', options: [{ labelAttributes: ['label'], labelComponents: ['CustomLabel'] }], errors: [expectedError] },
  // Custom label attributes.
  { code: '<label label="A label" />', options: [{ labelAttributes: ['label'] }], errors: [expectedError] },
  // Custom controlComponents.
  { code: '<label><span><CustomInput /></span></label>', options: [{ controlComponents: ['CustomInput'] }], errors: [expectedError] },
  { code: '<CustomLabel><span><CustomInput /></span></CustomLabel>', options: [{ controlComponents: ['CustomInput'], labelComponents: ['CustomLabel'] }], errors: [expectedError] },
  { code: '<CustomLabel><span><CustomInput /></span></CustomLabel>', options: [{ controlComponents: ['CustomInput'], labelComponents: ['CustomLabel'], labelAttributes: ['label'] }], errors: [expectedError] },
];
// htmlFor valid
ruleTester.run(ruleName, rule, {
  valid: [
    ...alwaysValid,
    ...htmlForValid,
  ]
    .map(ruleOptionsMapperFactory({
      assert: 'htmlFor',
    }))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
    ...nestingInvalid,
  ]
    .map(ruleOptionsMapperFactory({
      assert: 'htmlFor',
    }))
    .map(parserOptionsMapper),
});

// nesting valid
ruleTester.run(ruleName, rule, {
  valid: [
    ...alwaysValid,
    ...nestingValid,
  ]
    .map(ruleOptionsMapperFactory({
      assert: 'nesting',
    }))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
    ...htmlForInvalid,
  ]
    .map(ruleOptionsMapperFactory({
      assert: 'nesting',
    }))
    .map(parserOptionsMapper),
});

// either valid
ruleTester.run(ruleName, rule, {
  valid: [
    ...alwaysValid,
    ...htmlForValid,
    ...nestingValid,
  ]
    .map(ruleOptionsMapperFactory({
      assert: 'either',
    }))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
  ].map(parserOptionsMapper),
});

// both valid
ruleTester.run(ruleName, rule, {
  valid: [
    ...alwaysValid,
    ...bothValid,
  ]
    .map(ruleOptionsMapperFactory({
      assert: 'both',
    }))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
  ].map(parserOptionsMapper),
});
