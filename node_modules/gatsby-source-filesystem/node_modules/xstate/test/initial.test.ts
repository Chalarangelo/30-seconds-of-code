import { Machine } from '../src';
import { assert } from 'chai';

const config = {
  initial: 'a',
  states: {
    a: {
      initial: 'b',
      states: {
        b: {
          initial: 'c',
          states: {
            c: {}
          }
        }
      }
    },
    leaf: {}
  }
};

const deepMachine = Machine(config);

const parallelDeepMachine = Machine({
  parallel: true,
  states: {
    foo: config,
    bar: config
  }
});

const deepParallelMachine = Machine({
  initial: 'one',
  states: {
    one: parallelDeepMachine.config,
    two: parallelDeepMachine.config
  }
});

describe('Initial states', () => {
  it('should return the correct initial state', () => {
    assert.deepEqual(deepMachine.initialState.value, { a: { b: 'c' } });
  });

  it('should return the correct initial state (parallel)', () => {
    assert.deepEqual(parallelDeepMachine.initialState.value, {
      foo: { a: { b: 'c' } },
      bar: { a: { b: 'c' } }
    });
  });

  it('should return the correct initial state (deep parallel)', () => {
    assert.deepEqual(deepParallelMachine.initialState.value, {
      one: {
        foo: { a: { b: 'c' } },
        bar: { a: { b: 'c' } }
      }
    });
  });

  it('should return undefined for leaf nodes', () => {
    assert.throws(() => deepMachine.states.leaf.initialState);
  });
});
