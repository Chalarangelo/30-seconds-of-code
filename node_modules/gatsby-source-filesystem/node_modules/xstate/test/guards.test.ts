import { assert } from 'chai';
import { Machine, matchesState } from '../src/index';

describe('guard conditions', () => {
  const lightMachine = Machine(
    {
      key: 'light',
      initial: 'green',
      states: {
        green: {
          on: {
            TIMER: {
              green: {
                cond: ({ elapsed }) => elapsed < 100
              },
              yellow: {
                cond: ({ elapsed }) => elapsed >= 100 && elapsed < 200
              }
            },
            EMERGENCY: {
              red: { cond: (_, event) => event.isEmergency }
            }
          }
        },
        yellow: {
          on: {
            TIMER: {
              red: { cond: 'minTimeElapsed' }
            }
          }
        },
        red: {
          on: {
            BAD_COND: { red: { cond: 'doesNotExist' } }
          }
        }
      }
    },
    {
      guards: {
        minTimeElapsed: ({ elapsed }) => elapsed >= 100 && elapsed < 200
      }
    }
  );

  it('should transition only if condition is met', () => {
    assert.equal(
      lightMachine
        .transition('green', 'TIMER', {
          elapsed: 50
        })
        .toString(),
      'green'
    );

    assert.equal(
      lightMachine
        .transition('green', 'TIMER', {
          elapsed: 120
        })
        .toString(),
      'yellow'
    );
  });

  it('should transition if condition based on event is met', () => {
    assert.equal(
      lightMachine
        .transition('green', { type: 'EMERGENCY', isEmergency: true })
        .toString(),
      'red'
    );
  });

  it('should not transition if condition based on event is not met', () => {
    assert.equal(
      lightMachine.transition('green', { type: 'EMERGENCY' }).toString(),
      'green'
    );
  });

  it('should not transition if no condition is met', () => {
    const nextState = lightMachine.transition('green', 'TIMER', {
      elapsed: 9000
    });
    assert.equal(nextState.value, 'green');
    assert.isEmpty(nextState.actions);
  });

  it('should work with defined string transitions', () => {
    const nextState = lightMachine.transition('yellow', 'TIMER', {
      elapsed: 150
    });
    assert.equal(nextState.value, 'red');
  });

  it('should work with defined string transitions (condition not met)', () => {
    const nextState = lightMachine.transition('yellow', 'TIMER', {
      elapsed: 10
    });
    assert.equal(nextState.value, 'yellow');
  });

  it('should throw if string transition is not defined', () => {
    assert.throws(() => lightMachine.transition('red', 'BAD_COND'));
  });
});

describe('guard conditions', () => {
  const machine = Machine({
    key: 'microsteps',
    parallel: true,
    states: {
      A: {
        initial: 'A0',
        states: {
          A0: {
            on: {
              A: 'A1'
            }
          },
          A1: {
            on: {
              A: 'A2'
            }
          },
          A2: {
            on: {
              A: 'A3'
            }
          },
          A3: {
            on: {
              '': 'A4'
            }
          },
          A4: {
            on: {
              '': 'A5'
            }
          },
          A5: {}
        }
      },
      B: {
        initial: 'B0',
        states: {
          B0: {
            on: {
              T1: [
                {
                  target: 'B1',
                  cond: (_state, _event, interim) =>
                    matchesState('A.A1', interim)
                }
              ],
              T2: [
                {
                  target: 'B2',
                  cond: (_state, _event, interim) =>
                    matchesState('A.A2', interim)
                }
              ],
              T3: [
                {
                  target: 'B3',
                  cond: (_state, _event, interim) =>
                    matchesState('A.A3', interim)
                }
              ],
              '': [
                {
                  target: 'B4',
                  cond: (_state, _event, interim) =>
                    matchesState('A.A4', interim)
                }
              ]
            }
          },
          B1: {},
          B2: {},
          B3: {},
          B4: {}
        }
      }
    }
  });

  it('should guard against transition', () => {
    assert.deepEqual(machine.transition({ A: 'A2', B: 'B0' }, 'T1').value, {
      A: 'A2',
      B: 'B0'
    });
  });

  it('should allow a matching transition', () => {
    assert.deepEqual(machine.transition({ A: 'A2', B: 'B0' }, 'T2').value, {
      A: 'A2',
      B: 'B2'
    });
  });

  it('should check guards with interim states', () => {
    assert.deepEqual(machine.transition({ A: 'A2', B: 'B0' }, 'A').value, {
      A: 'A5',
      B: 'B4'
    });
  });
});
