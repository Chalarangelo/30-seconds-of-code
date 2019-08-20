/* eslint-env mocha */
import expect from 'expect';
import JSXAttributeMock from '../../../../__mocks__/JSXAttributeMock';
import getImplicitRoleForMenu from '../../../../src/util/implicitRoles/menu';

describe('isAbstractRole', () => {
  it('works for toolbars', () => {
    expect(getImplicitRoleForMenu([JSXAttributeMock('type', 'toolbar')])).toBe('toolbar');
  });
  it('works for non-toolbars', () => {
    expect(getImplicitRoleForMenu([JSXAttributeMock('type', '')])).toBe('');
  });
});
