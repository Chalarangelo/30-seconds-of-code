/* eslint-env jest */
/**
 * @fileoverview Enforce onmouseover/onmouseout are accompanied
 *  by onfocus/onblur.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/mouse-events-have-key-events';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const mouseOverError = {
  message: 'onMouseOver must be accompanied by onFocus for accessibility.',
  type: 'JSXOpeningElement',
};
const mouseOutError = {
  message: 'onMouseOut must be accompanied by onBlur for accessibility.',
  type: 'JSXOpeningElement',
};

ruleTester.run('mouse-events-have-key-events', rule, {
  valid: [
    { code: '<div onMouseOver={() => void 0} onFocus={() => void 0} />;' },
    {
      code: '<div onMouseOver={() => void 0} onFocus={() => void 0} {...props} />;',
    },
    { code: '<div onMouseOver={handleMouseOver} onFocus={handleFocus} />;' },
    {
      code: '<div onMouseOver={handleMouseOver} onFocus={handleFocus} {...props} />;',
    },
    { code: '<div />;' },
    { code: '<div onMouseOut={() => void 0} onBlur={() => void 0} />' },
    { code: '<div onMouseOut={() => void 0} onBlur={() => void 0} {...props} />' },
    { code: '<div onMouseOut={handleMouseOut} onBlur={handleOnBlur} />' },
    { code: '<div onMouseOut={handleMouseOut} onBlur={handleOnBlur} {...props} />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<div onMouseOver={() => void 0} />;', errors: [mouseOverError] },
    { code: '<div onMouseOut={() => void 0} />', errors: [mouseOutError] },
    {
      code: '<div onMouseOver={() => void 0} onFocus={undefined} />;',
      errors: [mouseOverError],
    },
    {
      code: '<div onMouseOut={() => void 0} onBlur={undefined} />',
      errors: [mouseOutError],
    },
    {
      code: '<div onMouseOver={() => void 0} {...props} />',
      errors: [mouseOverError],
    },
    {
      code: '<div onMouseOut={() => void 0} {...props} />',
      errors: [mouseOutError],
    },
  ].map(parserOptionsMapper),
});
