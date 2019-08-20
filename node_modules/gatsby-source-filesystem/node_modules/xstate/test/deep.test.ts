import { assert } from 'chai';
import { Machine } from '../src/index';

describe('deep transitions', () => {
  const deepMachine = Machine({
    key: 'deep',
    initial: 'A',
    on: {
      MACHINE_EVENT: '#deep.DONE'
    },
    states: {
      DONE: {},
      FAIL: {},
      A: {
        on: {
          A_EVENT: '#deep.DONE',
          B_EVENT: 'FAIL', // shielded by B's B_EVENT
          A_S: '#deep.P.Q.R.S',
          A_P: '#deep.P'
        },
        onEntry: 'ENTER_A',
        onExit: 'EXIT_A',
        initial: 'B',
        states: {
          B: {
            on: {
              B_EVENT: '#deep.DONE'
            },
            onEntry: 'ENTER_B',
            onExit: 'EXIT_B',
            initial: 'C',
            states: {
              C: {
                on: {
                  C_EVENT: '#deep.DONE'
                },
                onEntry: 'ENTER_C',
                onExit: 'EXIT_C',
                initial: 'D',
                states: {
                  D: {
                    on: {
                      D_EVENT: '#deep.DONE',
                      D_S: '#deep.P.Q.R.S',
                      D_P: '#deep.P'
                    },
                    onEntry: 'ENTER_D',
                    onExit: 'EXIT_D'
                  }
                }
              }
            }
          }
        }
      },
      P: {
        on: {
          P_EVENT: '#deep.DONE',
          Q_EVENT: 'FAIL' // shielded by Q's Q_EVENT
        },
        onEntry: 'ENTER_P',
        onExit: 'EXIT_P',
        initial: 'Q',
        states: {
          Q: {
            on: {
              Q_EVENT: '#deep.DONE'
            },
            onEntry: 'ENTER_Q',
            onExit: 'EXIT_Q',
            initial: 'R',
            states: {
              R: {
                on: {
                  R_EVENT: '#deep.DONE'
                },
                onEntry: 'ENTER_R',
                onExit: 'EXIT_R',
                initial: 'S',
                states: {
                  S: {
                    on: {
                      S_EVENT: '#deep.DONE'
                    },
                    onEntry: 'ENTER_S',
                    onExit: 'EXIT_S'
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  describe('exiting super/substates', () => {
    it('should exit all substates when superstates exits (A_EVENT)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'A_EVENT')
        .actions.map(a => `${a}`);
      const expected = ['EXIT_D', 'EXIT_C', 'EXIT_B', 'EXIT_A'];
      assert.deepEqual(actual, expected);
    });

    it('should exit substates and superstates when exiting (B_EVENT)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'B_EVENT')
        .actions.map(a => `${a}`);
      const expected = ['EXIT_D', 'EXIT_C', 'EXIT_B', 'EXIT_A'];
      assert.deepEqual(actual, expected);
    });

    it('should exit substates and superstates when exiting (C_EVENT)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'C_EVENT')
        .actions.map(a => `${a}`);
      const expected = ['EXIT_D', 'EXIT_C', 'EXIT_B', 'EXIT_A'];
      assert.deepEqual(actual, expected);
    });

    it('should exit superstates when exiting (D_EVENT)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'D_EVENT')
        .actions.map(a => `${a}`);
      const expected = ['EXIT_D', 'EXIT_C', 'EXIT_B', 'EXIT_A'];
      assert.deepEqual(actual, expected);
    });

    it('should exit substate when machine handles event (MACHINE_EVENT)', () => {
      // console.log(deepMachine.initialState.value);
      const actual = deepMachine
        .transition(deepMachine.initialState, 'MACHINE_EVENT')
        .actions.map(a => `${a}`);
      const expected = ['EXIT_D', 'EXIT_C', 'EXIT_B', 'EXIT_A'];
      assert.deepEqual(actual, expected);
    });

    const DBCAPQRS = [
      'EXIT_D',
      'EXIT_C',
      'EXIT_B',
      'EXIT_A',
      'ENTER_P',
      'ENTER_Q',
      'ENTER_R',
      'ENTER_S'
    ];

    it('should exit deep and enter deep (A_S)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'A_S')
        .actions.map(a => `${a}`);
      const expected = DBCAPQRS;
      assert.deepEqual(actual, expected);
    });

    it('should exit deep and enter deep (D_P)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'D_P')
        .actions.map(a => `${a}`);
      const expected = DBCAPQRS;
      assert.deepEqual(actual, expected);
    });

    it('should exit deep and enter deep (A_P)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'A_P')
        .actions.map(a => `${a}`);
      const expected = DBCAPQRS;
      assert.deepEqual(actual, expected);
    });

    it('should exit deep and enter deep (D_S)', () => {
      const actual = deepMachine
        .transition(deepMachine.initialState, 'D_S')
        .actions.map(a => `${a}`);
      const expected = DBCAPQRS;
      assert.deepEqual(actual, expected);
    });
  });
});
