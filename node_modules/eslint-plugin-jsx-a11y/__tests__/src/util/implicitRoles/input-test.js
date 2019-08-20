/* eslint-env mocha */
import expect from 'expect';
import JSXAttributeMock from '../../../../__mocks__/JSXAttributeMock';
import getImplicitRoleForInput from '../../../../src/util/implicitRoles/input';

describe('isAbstractRole', () => {
  it('works for buttons', () => {
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'button')])).toBe('button');
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'image')])).toBe('button');
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'reset')])).toBe('button');
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'submit')])).toBe('button');
  });
  it('works for checkboxes', () => {
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'checkbox')])).toBe('checkbox');
  });
  it('works for radios', () => {
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'radio')])).toBe('radio');
  });
  it('works for ranges', () => {
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'range')])).toBe('slider');
  });
  it('works for textboxes', () => {
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'email')])).toBe('textbox');
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'password')])).toBe('textbox');
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'search')])).toBe('textbox');
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'tel')])).toBe('textbox');
    expect(getImplicitRoleForInput([JSXAttributeMock('type', 'url')])).toBe('textbox');
  });
  it('works for the default case', () => {
    expect(getImplicitRoleForInput([JSXAttributeMock('type', '')])).toBe('textbox');
  });
  it('works for the true case', () => {
    expect(getImplicitRoleForInput([JSXAttributeMock('type', true)])).toBe('textbox');
  });
});
