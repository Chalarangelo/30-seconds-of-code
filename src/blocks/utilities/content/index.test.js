import childProcess from 'child_process';
import { Content } from '.';
jest.mock('child_process');

describe('Content', () => {
  describe('update', () => {
    let res;

    beforeAll(() => {
      res = Content.update();
    });

    it('should return a Promise', () => {
      expect(res instanceof Promise).toBe(true);
    });

    it('should execute the appropriate git command', () => {
      const proc = childProcess.spawn.mock.calls[0];
      expect(proc[0]).toBe('git');
      expect(proc[1]).toEqual([
        'submodule',
        'update',
        '--recursive',
        '--remote',
        '--depth=10000',
      ]);
    });
  });
});
