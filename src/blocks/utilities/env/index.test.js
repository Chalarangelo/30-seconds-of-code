import { setupEnv } from '.';
import globalConfig from 'settings/global';

describe('setupEnv', () => {
  beforeAll(() => {
    setupEnv();
  });

  it('populates settings', () => {
    const keys = [...Object.keys(globalConfig), 'paths', 'configs', 'env'];
    keys.forEach(key => {
      expect(Object.keys(global.settings).includes(key)).toBe(true);
    });
  });
});
