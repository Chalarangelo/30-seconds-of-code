import { assert } from 'chai';
// import { Machine, State } from '../src/index';
import { toggle } from '../src/patterns';

describe('patterns', () => {
  describe('toggle pattern', () => {
    it('should produce a partial state machine with a binary toggle', () => {
      assert.deepEqual(toggle('on', 'off', 'SWITCH'), {
        on: { on: { SWITCH: 'off' } },
        off: { on: { SWITCH: 'on' } }
      });
    });
  });
});
