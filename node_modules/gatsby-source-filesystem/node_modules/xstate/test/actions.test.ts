import { assert } from 'chai';
import { Machine } from '../src/index';

describe('onEntry/onExit actions', () => {
  const pedestrianStates = {
    initial: 'walk',
    states: {
      walk: {
        on: {
          PED_COUNTDOWN: 'wait'
        },
        onEntry: 'enter_walk',
        onExit: 'exit_walk'
      },
      wait: {
        on: {
          PED_COUNTDOWN: 'stop'
        },
        onEntry: 'enter_wait',
        onExit: 'exit_wait'
      },
      stop: {
        onEntry: 'enter_stop',
        onExit: 'exit_stop'
      }
    }
  };

  const lightMachine = Machine({
    key: 'light',
    initial: 'green',
    states: {
      green: {
        on: {
          TIMER: 'yellow',
          POWER_OUTAGE: 'red',
          NOTHING: 'green'
        },
        onEntry: 'enter_green',
        onExit: 'exit_green'
      },
      yellow: {
        on: {
          TIMER: 'red',
          POWER_OUTAGE: 'red'
        },
        onEntry: 'enter_yellow',
        onExit: 'exit_yellow'
      },
      red: {
        on: {
          TIMER: 'green',
          POWER_OUTAGE: 'red',
          NOTHING: 'red'
        },
        onEntry: 'enter_red',
        onExit: 'exit_red',
        ...pedestrianStates
      }
    }
  });

  const parallelMachine = Machine({
    parallel: true,
    states: {
      a: {
        initial: 'a1',
        states: {
          a1: {
            on: { CHANGE: { a2: { actions: ['do_a2', 'another_do_a2'] } } },
            onEntry: 'enter_a1',
            onExit: 'exit_a1'
          },
          a2: { onEntry: 'enter_a2', onExit: 'exit_a2' }
        },
        onEntry: 'enter_a',
        onExit: 'exit_a'
      },
      b: {
        initial: 'b1',
        states: {
          b1: {
            on: { CHANGE: { b2: { actions: ['do_b2'] } } },
            onEntry: 'enter_b1',
            onExit: 'exit_b1'
          },
          b2: { onEntry: 'enter_b2', onExit: 'exit_b2' }
        },
        onEntry: 'enter_b',
        onExit: 'exit_b'
      }
    }
  });

  const deepMachine = Machine({
    initial: 'a',
    states: {
      a: {
        initial: 'a1',
        states: {
          a1: {
            on: {
              NEXT: 'a2',
              NEXT_FN: 'a3'
            },
            onEntry: 'enter_a1',
            onExit: 'exit_a1'
          },
          a2: {
            onEntry: 'enter_a2',
            onExit: 'exit_a2'
          },
          a3: {
            on: {
              NEXT: {
                a2: {
                  actions: [
                    function do_a3_to_a2() {
                      return;
                    }
                  ]
                }
              }
            },
            onEntry: function enter_a3_fn() {
              return;
            },
            onExit: function exit_a3_fn() {
              return;
            }
          }
        },
        onEntry: 'enter_a',
        onExit: ['exit_a', 'another_exit_a'],
        on: { CHANGE: 'b' }
      },
      b: {
        onEntry: ['enter_b', 'another_enter_b'],
        onExit: 'exit_b',
        initial: 'b1',
        states: {
          b1: {
            onEntry: 'enter_b1',
            onExit: 'exit_b1'
          }
        }
      }
    }
  });

  describe('State.actions', () => {
    it('should return the entry actions of an initial state', () => {
      assert.sameMembers(lightMachine.initialState.actions, ['enter_green']);
    });

    it('should return the entry actions of an initial state (deep)', () => {
      assert.sameMembers(deepMachine.initialState.actions, [
        'enter_a',
        'enter_a1'
      ]);
    });

    it('should return the entry actions of an initial state (parallel)', () => {
      assert.sameMembers(parallelMachine.initialState.actions, [
        'enter_a',
        'enter_b',
        'enter_a1',
        'enter_b1'
      ]);
    });

    it('should return the entry and exit actions of a transition', () => {
      assert.deepEqual(lightMachine.transition('green', 'TIMER').actions, [
        'exit_green',
        'enter_yellow'
      ]);
    });

    it('should return the entry and exit actions of a deep transition', () => {
      assert.deepEqual(lightMachine.transition('yellow', 'TIMER').actions, [
        'exit_yellow',
        'enter_red',
        'enter_walk'
      ]);
    });

    it('should return the entry and exit actions of a nested transition', () => {
      assert.deepEqual(
        lightMachine.transition('red.walk', 'PED_COUNTDOWN').actions,
        ['exit_walk', 'enter_wait']
      );
    });

    it('should not have actions for unhandled events (shallow)', () => {
      assert.deepEqual(lightMachine.transition('green', 'FAKE').actions, []);
    });

    it('should not have actions for unhandled events (deep)', () => {
      assert.deepEqual(lightMachine.transition('red', 'FAKE').actions, []);
    });

    it('should exit and enter the state for self-transitions (shallow)', () => {
      assert.deepEqual(lightMachine.transition('green', 'NOTHING').actions, [
        'exit_green',
        'enter_green'
      ]);
    });

    it('should exit and enter the state for self-transitions (deep)', () => {
      // 'red' state resolves to 'red.walk'
      assert.deepEqual(lightMachine.transition('red', 'NOTHING').actions, [
        'exit_walk',
        'exit_red',
        'enter_red',
        'enter_walk'
      ]);
    });

    it('should return actions for parallel machines', () => {
      assert.deepEqual(
        parallelMachine.transition(parallelMachine.initialState, 'CHANGE')
          .actions,
        [
          'exit_a1',
          'exit_b1',
          'do_a2',
          'another_do_a2',
          'do_b2',
          'enter_a2',
          'enter_b2'
        ]
      );
    });

    it('should return nested actions in the correct (child to parent) order', () => {
      assert.deepEqual(deepMachine.transition('a.a1', 'CHANGE').actions, [
        'exit_a1',
        'exit_a',
        'another_exit_a',
        'enter_b',
        'another_enter_b',
        'enter_b1'
      ]);
    });

    it('should ignore parent state actions for same-parent substates', () => {
      assert.deepEqual(deepMachine.transition('a.a1', 'NEXT').actions, [
        'exit_a1',
        'enter_a2'
      ]);
    });

    it('should work with function actions', () => {
      assert.deepEqual(
        deepMachine
          .transition(deepMachine.initialState, 'NEXT_FN')
          .actions.map(
            action => (typeof action === 'function' ? action.name : action)
          ),
        ['exit_a1', 'enter_a3_fn']
      );

      assert.deepEqual(
        deepMachine
          .transition('a.a3', 'NEXT')
          .actions.map(
            action => (typeof action === 'function' ? action.name : action)
          ),
        ['exit_a3_fn', 'do_a3_to_a2', 'enter_a2']
      );
    });

    describe('should ignore same-parent state actions (sparse)', () => {
      const fooBar = {
        initial: 'foo',
        states: {
          foo: {
            on: {
              TACK: 'bar',
              ABSOLUTE_TACK: '#machine.ping.bar'
            }
          },
          bar: {
            on: {
              TACK: 'foo'
            }
          }
        }
      };

      const pingPong = Machine({
        initial: 'ping',
        key: 'machine',
        states: {
          ping: {
            onEntry: ['entryEvent'],
            on: {
              TICK: 'pong'
            },
            ...fooBar
          },
          pong: {
            on: {
              TICK: 'ping'
            }
          }
        }
      });

      it('with a relative transition', () => {
        assert.isEmpty(pingPong.transition('ping.foo', 'TACK').actions);
      });

      it('with an absolute transition', () => {
        assert.isEmpty(
          pingPong.transition('ping.foo', 'ABSOLUTE_TACK').actions
        );
      });
    });
  });
});

describe('actions on invalid transition', () => {
  const stopMachine = Machine({
    initial: 'idle',
    states: {
      idle: {
        on: {
          STOP: {
            stop: {
              actions: ['action1']
            }
          }
        }
      },
      stop: {}
    }
  });

  it('should not recall previous actions', () => {
    const nextState = stopMachine.transition('idle', 'STOP');
    assert.isEmpty(stopMachine.transition(nextState, 'INVALID').actions);
  });
});
