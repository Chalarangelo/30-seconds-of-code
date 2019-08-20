/* eslint-env jest */
/**
 * @fileoverview Enforce that an element does not have an unsupported ARIA attribute.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import {
  aria,
  roles,
} from 'aria-query';
import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/role-supports-aria-props';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const generateErrorMessage = (attr, role, tag, isImplicit) => {
  if (isImplicit) {
    return `The attribute ${attr} is not supported by the role ${role}. \
This role is implicit on the element ${tag}.`;
  }

  return `The attribute ${attr} is not supported by the role ${role}.`;
};

const errorMessage = (attr, role, tag, isImplicit) => ({
  message: generateErrorMessage(attr, role, tag, isImplicit),
  type: 'JSXOpeningElement',
});

const nonAbstractRoles = [...roles.keys()].filter(role => roles.get(role).abstract === false);

const createTests = rolesNames => rolesNames.reduce((tests, role) => {
  const {
    props: propKeyValues,
  } = roles.get(role);
  const validPropsForRole = Object.keys(propKeyValues);
  const invalidPropsForRole = [...aria.keys()]
    .map(attribute => attribute.toLowerCase())
    .filter(attribute => validPropsForRole.indexOf(attribute) === -1);
  const normalRole = role.toLowerCase();

  const allTests = [];

  allTests[0] = tests[0].concat(validPropsForRole.map(prop => ({
    code: `<div role="${normalRole}" ${prop.toLowerCase()} />`,
  })));

  allTests[1] = tests[1].concat(invalidPropsForRole.map(prop => ({
    code: `<div role="${normalRole}" ${prop.toLowerCase()} />`,
    errors: [errorMessage(prop.toLowerCase(), normalRole, 'div', false)],
  })));

  return allTests;
}, [[], []]);

const [validTests, invalidTests] = createTests(nonAbstractRoles);

ruleTester.run('role-supports-aria-props', rule, {
  valid: [
    { code: '<Foo bar />' },
    { code: '<div />' },
    { code: '<div id="main" />' },
    { code: '<div role />' },
    { code: '<div role="presentation" {...props} />' },
    { code: '<Foo.Bar baz={true} />' },

    // IMPLICIT ROLE TESTS
    // A TESTS - implicit role is `link`
    { code: '<a href="#" aria-expanded />' },
    { code: '<a href="#" aria-atomic />' },
    { code: '<a href="#" aria-busy />' },
    { code: '<a href="#" aria-controls />' },
    { code: '<a href="#" aria-current />' },
    { code: '<a href="#" aria-describedby />' },
    { code: '<a href="#" aria-disabled />' },
    { code: '<a href="#" aria-dropeffect />' },
    { code: '<a href="#" aria-flowto />' },
    { code: '<a href="#" aria-grabbed />' },
    { code: '<a href="#" aria-haspopup />' },
    { code: '<a href="#" aria-hidden />' },
    { code: '<a href="#" aria-invalid />' },
    { code: '<a href="#" aria-label />' },
    { code: '<a href="#" aria-labelledby />' },
    { code: '<a href="#" aria-live />' },
    { code: '<a href="#" aria-owns />' },
    { code: '<a href="#" aria-relevant />' },

    // this will have global
    { code: '<a aria-checked />' },

    // AREA TESTS - implicit role is `link`
    { code: '<area href="#" aria-expanded />' },
    { code: '<area href="#" aria-atomic />' },
    { code: '<area href="#" aria-busy />' },
    { code: '<area href="#" aria-controls />' },
    { code: '<area href="#" aria-describedby />' },
    { code: '<area href="#" aria-disabled />' },
    { code: '<area href="#" aria-dropeffect />' },
    { code: '<area href="#" aria-flowto />' },
    { code: '<area href="#" aria-grabbed />' },
    { code: '<area href="#" aria-haspopup />' },
    { code: '<area href="#" aria-hidden />' },
    { code: '<area href="#" aria-invalid />' },
    { code: '<area href="#" aria-label />' },
    { code: '<area href="#" aria-labelledby />' },
    { code: '<area href="#" aria-live />' },
    { code: '<area href="#" aria-owns />' },
    { code: '<area href="#" aria-relevant />' },

    // this will have global
    { code: '<area aria-checked />' },

    // LINK TESTS - implicit role is `link`
    { code: '<link href="#" aria-expanded />' },
    { code: '<link href="#" aria-atomic />' },
    { code: '<link href="#" aria-busy />' },
    { code: '<link href="#" aria-controls />' },
    { code: '<link href="#" aria-describedby />' },
    { code: '<link href="#" aria-disabled />' },
    { code: '<link href="#" aria-dropeffect />' },
    { code: '<link href="#" aria-flowto />' },
    { code: '<link href="#" aria-grabbed />' },
    { code: '<link href="#" aria-haspopup />' },
    { code: '<link href="#" aria-hidden />' },
    { code: '<link href="#" aria-invalid />' },
    { code: '<link href="#" aria-label />' },
    { code: '<link href="#" aria-labelledby />' },
    { code: '<link href="#" aria-live />' },
    { code: '<link href="#" aria-owns />' },
    { code: '<link href="#" aria-relevant />' },

    // this will have global
    { code: '<link aria-checked />' },

    // IMG TESTS - no implicit role
    { code: '<img alt="" aria-checked />' },

    // this will have role of `img`
    { code: '<img alt="foobar" aria-busy />' },

    // MENU TESTS - implicit role is `toolbar` when `type="toolbar"`
    { code: '<menu type="toolbar" aria-activedescendant />' },
    { code: '<menu type="toolbar" aria-expanded />' },
    { code: '<menu type="toolbar" aria-atomic />' },
    { code: '<menu type="toolbar" aria-busy />' },
    { code: '<menu type="toolbar" aria-controls />' },
    { code: '<menu type="toolbar" aria-describedby />' },
    { code: '<menu type="toolbar" aria-disabled />' },
    { code: '<menu type="toolbar" aria-dropeffect />' },
    { code: '<menu type="toolbar" aria-flowto />' },
    { code: '<menu type="toolbar" aria-grabbed />' },
    { code: '<menu type="toolbar" aria-haspopup />' },
    { code: '<menu type="toolbar" aria-hidden />' },
    { code: '<menu type="toolbar" aria-invalid />' },
    { code: '<menu type="toolbar" aria-label />' },
    { code: '<menu type="toolbar" aria-labelledby />' },
    { code: '<menu type="toolbar" aria-live />' },
    { code: '<menu type="toolbar" aria-owns />' },
    { code: '<menu type="toolbar" aria-relevant />' },

    // this will have global
    { code: '<menu aria-checked />' },

    // MENUITEM TESTS
    // when `type="command`, the implicit role is `menuitem`
    { code: '<menuitem type="command" aria-atomic />' },
    { code: '<menuitem type="command" aria-busy />' },
    { code: '<menuitem type="command" aria-controls />' },
    { code: '<menuitem type="command" aria-describedby />' },
    { code: '<menuitem type="command" aria-disabled />' },
    { code: '<menuitem type="command" aria-dropeffect />' },
    { code: '<menuitem type="command" aria-flowto />' },
    { code: '<menuitem type="command" aria-grabbed />' },
    { code: '<menuitem type="command" aria-haspopup />' },
    { code: '<menuitem type="command" aria-hidden />' },
    { code: '<menuitem type="command" aria-invalid />' },
    { code: '<menuitem type="command" aria-label />' },
    { code: '<menuitem type="command" aria-labelledby />' },
    { code: '<menuitem type="command" aria-live />' },
    { code: '<menuitem type="command" aria-owns />' },
    { code: '<menuitem type="command" aria-relevant />' },
    // when `type="checkbox`, the implicit role is `menuitemcheckbox`
    { code: '<menuitem type="checkbox" aria-checked />' },
    { code: '<menuitem type="checkbox" aria-atomic />' },
    { code: '<menuitem type="checkbox" aria-busy />' },
    { code: '<menuitem type="checkbox" aria-controls />' },
    { code: '<menuitem type="checkbox" aria-describedby />' },
    { code: '<menuitem type="checkbox" aria-disabled />' },
    { code: '<menuitem type="checkbox" aria-dropeffect />' },
    { code: '<menuitem type="checkbox" aria-flowto />' },
    { code: '<menuitem type="checkbox" aria-grabbed />' },
    { code: '<menuitem type="checkbox" aria-haspopup />' },
    { code: '<menuitem type="checkbox" aria-hidden />' },
    { code: '<menuitem type="checkbox" aria-invalid />' },
    { code: '<menuitem type="checkbox" aria-label />' },
    { code: '<menuitem type="checkbox" aria-labelledby />' },
    { code: '<menuitem type="checkbox" aria-live />' },
    { code: '<menuitem type="checkbox" aria-owns />' },
    { code: '<menuitem type="checkbox" aria-relevant />' },
    // when `type="radio`, the implicit role is `menuitemradio`
    { code: '<menuitem type="radio" aria-checked />' },
    { code: '<menuitem type="radio" aria-atomic />' },
    { code: '<menuitem type="radio" aria-busy />' },
    { code: '<menuitem type="radio" aria-controls />' },
    { code: '<menuitem type="radio" aria-describedby />' },
    { code: '<menuitem type="radio" aria-disabled />' },
    { code: '<menuitem type="radio" aria-dropeffect />' },
    { code: '<menuitem type="radio" aria-flowto />' },
    { code: '<menuitem type="radio" aria-grabbed />' },
    { code: '<menuitem type="radio" aria-haspopup />' },
    { code: '<menuitem type="radio" aria-hidden />' },
    { code: '<menuitem type="radio" aria-invalid />' },
    { code: '<menuitem type="radio" aria-label />' },
    { code: '<menuitem type="radio" aria-labelledby />' },
    { code: '<menuitem type="radio" aria-live />' },
    { code: '<menuitem type="radio" aria-owns />' },
    { code: '<menuitem type="radio" aria-relevant />' },
    { code: '<menuitem type="radio" aria-posinset />' },
    { code: '<menuitem type="radio" aria-selected />' },
    { code: '<menuitem type="radio" aria-setsize />' },

    // these will have global
    { code: '<menuitem aria-checked />' },
    { code: '<menuitem type="foo" aria-checked />' },

    // INPUT TESTS
    // when `type="button"`, the implicit role is `button`
    { code: '<input type="button" aria-expanded />' },
    { code: '<input type="button" aria-pressed />' },
    { code: '<input type="button" aria-atomic />' },
    { code: '<input type="button" aria-busy />' },
    { code: '<input type="button" aria-controls />' },
    { code: '<input type="button" aria-describedby />' },
    { code: '<input type="button" aria-disabled />' },
    { code: '<input type="button" aria-dropeffect />' },
    { code: '<input type="button" aria-flowto />' },
    { code: '<input type="button" aria-grabbed />' },
    { code: '<input type="button" aria-haspopup />' },
    { code: '<input type="button" aria-hidden />' },
    { code: '<input type="button" aria-invalid />' },
    { code: '<input type="button" aria-label />' },
    { code: '<input type="button" aria-labelledby />' },
    { code: '<input type="button" aria-live />' },
    { code: '<input type="button" aria-owns />' },
    { code: '<input type="button" aria-relevant />' },
    // when `type="image"`, the implicit role is `button`
    { code: '<input type="image" aria-expanded />' },
    { code: '<input type="image" aria-pressed />' },
    { code: '<input type="image" aria-atomic />' },
    { code: '<input type="image" aria-busy />' },
    { code: '<input type="image" aria-controls />' },
    { code: '<input type="image" aria-describedby />' },
    { code: '<input type="image" aria-disabled />' },
    { code: '<input type="image" aria-dropeffect />' },
    { code: '<input type="image" aria-flowto />' },
    { code: '<input type="image" aria-grabbed />' },
    { code: '<input type="image" aria-haspopup />' },
    { code: '<input type="image" aria-hidden />' },
    { code: '<input type="image" aria-invalid />' },
    { code: '<input type="image" aria-label />' },
    { code: '<input type="image" aria-labelledby />' },
    { code: '<input type="image" aria-live />' },
    { code: '<input type="image" aria-owns />' },
    { code: '<input type="image" aria-relevant />' },
    // when `type="reset"`, the implicit role is `button`
    { code: '<input type="reset" aria-expanded />' },
    { code: '<input type="reset" aria-pressed />' },
    { code: '<input type="reset" aria-atomic />' },
    { code: '<input type="reset" aria-busy />' },
    { code: '<input type="reset" aria-controls />' },
    { code: '<input type="reset" aria-describedby />' },
    { code: '<input type="reset" aria-disabled />' },
    { code: '<input type="reset" aria-dropeffect />' },
    { code: '<input type="reset" aria-flowto />' },
    { code: '<input type="reset" aria-grabbed />' },
    { code: '<input type="reset" aria-haspopup />' },
    { code: '<input type="reset" aria-hidden />' },
    { code: '<input type="reset" aria-invalid />' },
    { code: '<input type="reset" aria-label />' },
    { code: '<input type="reset" aria-labelledby />' },
    { code: '<input type="reset" aria-live />' },
    { code: '<input type="reset" aria-owns />' },
    { code: '<input type="reset" aria-relevant />' },
    // when `type="submit"`, the implicit role is `button`
    { code: '<input type="submit" aria-expanded />' },
    { code: '<input type="submit" aria-pressed />' },
    { code: '<input type="submit" aria-atomic />' },
    { code: '<input type="submit" aria-busy />' },
    { code: '<input type="submit" aria-controls />' },
    { code: '<input type="submit" aria-describedby />' },
    { code: '<input type="submit" aria-disabled />' },
    { code: '<input type="submit" aria-dropeffect />' },
    { code: '<input type="submit" aria-flowto />' },
    { code: '<input type="submit" aria-grabbed />' },
    { code: '<input type="submit" aria-haspopup />' },
    { code: '<input type="submit" aria-hidden />' },
    { code: '<input type="submit" aria-invalid />' },
    { code: '<input type="submit" aria-label />' },
    { code: '<input type="submit" aria-labelledby />' },
    { code: '<input type="submit" aria-live />' },
    { code: '<input type="submit" aria-owns />' },
    { code: '<input type="submit" aria-relevant />' },
    // when `type="checkbox"`, the implicit role is `checkbox`
    { code: '<input type="checkbox" aria-checked />' },
    { code: '<input type="checkbox" aria-atomic />' },
    { code: '<input type="checkbox" aria-busy />' },
    { code: '<input type="checkbox" aria-controls />' },
    { code: '<input type="checkbox" aria-describedby />' },
    { code: '<input type="checkbox" aria-disabled />' },
    { code: '<input type="checkbox" aria-dropeffect />' },
    { code: '<input type="checkbox" aria-flowto />' },
    { code: '<input type="checkbox" aria-grabbed />' },
    { code: '<input type="checkbox" aria-haspopup />' },
    { code: '<input type="checkbox" aria-hidden />' },
    { code: '<input type="checkbox" aria-invalid />' },
    { code: '<input type="checkbox" aria-label />' },
    { code: '<input type="checkbox" aria-labelledby />' },
    { code: '<input type="checkbox" aria-live />' },
    { code: '<input type="checkbox" aria-owns />' },
    { code: '<input type="checkbox" aria-relevant />' },
    // when `type="radio"`, the implicit role is `radio`
    { code: '<input type="radio" aria-checked />' },
    { code: '<input type="radio" aria-atomic />' },
    { code: '<input type="radio" aria-busy />' },
    { code: '<input type="radio" aria-controls />' },
    { code: '<input type="radio" aria-describedby />' },
    { code: '<input type="radio" aria-disabled />' },
    { code: '<input type="radio" aria-dropeffect />' },
    { code: '<input type="radio" aria-flowto />' },
    { code: '<input type="radio" aria-grabbed />' },
    { code: '<input type="radio" aria-haspopup />' },
    { code: '<input type="radio" aria-hidden />' },
    { code: '<input type="radio" aria-invalid />' },
    { code: '<input type="radio" aria-label />' },
    { code: '<input type="radio" aria-labelledby />' },
    { code: '<input type="radio" aria-live />' },
    { code: '<input type="radio" aria-owns />' },
    { code: '<input type="radio" aria-relevant />' },
    { code: '<input type="radio" aria-posinset />' },
    { code: '<input type="radio" aria-selected />' },
    { code: '<input type="radio" aria-setsize />' },
    // when `type="range"`, the implicit role is `slider`
    { code: '<input type="range" aria-valuemax />' },
    { code: '<input type="range" aria-valuemin />' },
    { code: '<input type="range" aria-valuenow />' },
    { code: '<input type="range" aria-orientation />' },
    { code: '<input type="range" aria-atomic />' },
    { code: '<input type="range" aria-busy />' },
    { code: '<input type="range" aria-controls />' },
    { code: '<input type="range" aria-describedby />' },
    { code: '<input type="range" aria-disabled />' },
    { code: '<input type="range" aria-dropeffect />' },
    { code: '<input type="range" aria-flowto />' },
    { code: '<input type="range" aria-grabbed />' },
    { code: '<input type="range" aria-haspopup />' },
    { code: '<input type="range" aria-hidden />' },
    { code: '<input type="range" aria-invalid />' },
    { code: '<input type="range" aria-label />' },
    { code: '<input type="range" aria-labelledby />' },
    { code: '<input type="range" aria-live />' },
    { code: '<input type="range" aria-owns />' },
    { code: '<input type="range" aria-relevant />' },
    { code: '<input type="range" aria-valuetext />' },

    // these will have role of `textbox`,
    { code: '<input type="email" aria-disabled />' },
    { code: '<input type="password" aria-disabled />' },
    { code: '<input type="search" aria-disabled />' },
    { code: '<input type="tel" aria-disabled />' },
    { code: '<input type="url" aria-disabled />' },
    { code: '<input aria-disabled />' },

    // Allow null/undefined values regardless of role
    { code: '<h2 role="presentation" aria-level={null} />' },
    { code: '<h2 role="presentation" aria-level={undefined} />' },

    // OTHER TESTS
    { code: '<aside aria-expanded />' },
    { code: '<article aria-expanded />' },
    { code: '<body aria-expanded />' },
    { code: '<button aria-pressed />' },
    { code: '<datalist aria-expanded />' },
    { code: '<details aria-expanded />' },
    { code: '<dialog aria-expanded />' },
    { code: '<dl aria-expanded />' },
    { code: '<form aria-hidden />' },
    { code: '<h1 aria-hidden />' },
    { code: '<h2 aria-hidden />' },
    { code: '<h3 aria-hidden />' },
    { code: '<h4 aria-hidden />' },
    { code: '<h5 aria-hidden />' },
    { code: '<h6 aria-hidden />' },
    { code: '<hr aria-hidden />' },
    { code: '<li aria-current />' },
    { code: '<li aria-expanded />' },
    { code: '<meter aria-atomic />' },
    { code: '<nav aria-expanded />' },
    { code: '<ol aria-expanded />' },
    { code: '<option aria-atomic />' },
    { code: '<output aria-expanded />' },
    { code: '<progress aria-atomic />' },
    { code: '<section aria-expanded />' },
    { code: '<select aria-expanded />' },
    { code: '<tbody aria-expanded />' },
    { code: '<textarea aria-hidden />' },
    { code: '<tfoot aria-expanded />' },
    { code: '<thead aria-expanded />' },
    { code: '<ul aria-expanded />' },

  ].concat(validTests).map(parserOptionsMapper),

  invalid: [
    // implicit basic checks
    {
      code: '<a href="#" aria-checked />',
      errors: [errorMessage('aria-checked', 'link', 'a', true)],
    },
    {
      code: '<area href="#" aria-checked />',
      errors: [errorMessage('aria-checked', 'link', 'area', true)],
    },
    {
      code: '<link href="#" aria-checked />',
      errors: [errorMessage('aria-checked', 'link', 'link', true)],
    },
    {
      code: '<img alt="foobar" aria-checked />',
      errors: [errorMessage('aria-checked', 'img', 'img', true)],
    },
    {
      code: '<menu type="toolbar" aria-checked />',
      errors: [errorMessage('aria-checked', 'toolbar', 'menu', true)],
    },
    {
      code: '<aside aria-checked />',
      errors: [errorMessage('aria-checked', 'complementary', 'aside', true)],
    },
  ].concat(invalidTests).map(parserOptionsMapper),
});
