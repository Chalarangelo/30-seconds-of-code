import { assert } from 'chai';
import { Machine } from '../src/index';

const machine = Machine({
  parallel: true,
  states: {
    A: {
      initial: 'A1',
      states: {
        A1: {},
        A2: {}
      }
    },
    B: {
      initial: 'B1',
      states: {
        B1: {},
        B2: {}
      }
    }
  }
});

describe('invalid states', () => {
  xit('should reject transitioning from a String state', () => {
    assert.throws(() => machine.transition('A', 'E'));
  });

  xit('should reject transitioning from empty states', () => {
    assert.throws(() => machine.transition({ A: {}, B: {} }, 'E'));
  });

  it('should allow transitioning from valid states', () => {
    machine.transition({ A: 'A1', B: 'B1' }, 'E');
  });

  it('should reject transitioning from bad state configs', () => {
    assert.throws(() => machine.transition({ A: 'A3', B: 'B3' }, 'E'));
  });

  xit('should reject transitioning from partially valid states', () => {
    assert.throws(() => machine.transition({ A: 'A1' }, 'E'));
  });

  xit("should reject transitioning from regions that don't exist", () => {
    assert.throws(() => machine.transition({ A: 'A1', B: 'B1', Z: 'Z1' }, 'E'));
  });
});
