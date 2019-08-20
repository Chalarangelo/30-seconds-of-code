/* eslint-env mocha */
import expect from 'expect';
import JSXAttributeMock from '../../../../__mocks__/JSXAttributeMock';
import getImplicitRoleForMenuitem from '../../../../src/util/implicitRoles/menuitem';

describe('isAbstractRole', () => {
  it('works for menu items', () => {
    expect(getImplicitRoleForMenuitem([JSXAttributeMock('type', 'command')])).toBe('menuitem');
  });
  it('works for menu item checkboxes', () => {
    expect(getImplicitRoleForMenuitem([JSXAttributeMock('type', 'checkbox')])).toBe('menuitemcheckbox');
  });
  it('works for menu item radios', () => {
    expect(getImplicitRoleForMenuitem([JSXAttributeMock('type', 'radio')])).toBe('menuitemradio');
  });
  it('works for non-toolbars', () => {
    expect(getImplicitRoleForMenuitem([JSXAttributeMock('type', '')])).toBe('');
  });
  it('works for the true case', () => {
    expect(getImplicitRoleForMenuitem([JSXAttributeMock('type', true)])).toBe('');
  });
});
