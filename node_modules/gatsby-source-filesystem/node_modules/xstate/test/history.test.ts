import { assert } from 'chai';
import { Machine } from '../src/index';

describe('history states', () => {
  const historyMachine = Machine({
    key: 'history',
    initial: 'off',
    states: {
      off: {
        on: { POWER: 'on.$history', H_POWER: 'on.H' }
      },
      on: {
        initial: 'first',
        states: {
          first: {
            on: { SWITCH: 'second' }
          },
          second: {
            on: { SWITCH: 'third' }
          },
          third: {},
          H: {
            history: true
          }
        },
        on: {
          POWER: 'off',
          H_POWER: 'off'
        }
      }
    }
  });

  it('should go to the most recently visited state', () => {
    const onSecondState = historyMachine.transition('on', 'SWITCH');
    const offState = historyMachine.transition(onSecondState, 'POWER');

    assert.equal(
      historyMachine.transition(offState, 'POWER').toString(),
      'on.second'
    );
  });

  it('should go to the most recently visited state (explicit)', () => {
    const onSecondState = historyMachine.transition('on', 'SWITCH');
    const offState = historyMachine.transition(onSecondState, 'H_POWER');

    assert.equal(
      historyMachine.transition(offState, 'H_POWER').toString(),
      'on.second'
    );
  });

  it('should go to the initial state when no history present', () => {
    assert.equal(
      historyMachine.transition('off', 'POWER').toString(),
      'on.first'
    );
  });

  it('should go to the initial state when no history present (explicit)', () => {
    assert.equal(
      historyMachine.transition('off', 'H_POWER').toString(),
      'on.first'
    );
  });

  it('should dispose of previous histories', () => {
    const onSecondState = historyMachine.transition('on', 'SWITCH');
    const offState = historyMachine.transition(onSecondState, 'H_POWER');
    const nextState = historyMachine.transition(offState, 'H_POWER');
    assert.isUndefined(nextState.history!.history);
  });
});

describe('deep history states', () => {
  const historyMachine = Machine({
    key: 'history',
    initial: 'off',
    states: {
      off: {
        on: {
          POWER: 'on.$history',
          DEEP_POWER: 'on.deepHistory'
        }
      },
      on: {
        initial: 'first',
        states: {
          first: {
            on: { SWITCH: 'second' }
          },
          second: {
            initial: 'A',
            states: {
              A: {
                on: { INNER: 'B' }
              },
              B: {
                initial: 'P',
                states: {
                  P: {
                    on: { INNER: 'Q' }
                  },
                  Q: {}
                }
              }
            }
          },
          deepHistory: {
            history: 'deep'
          }
        },
        on: {
          POWER: 'off'
        }
      }
    }
  });

  describe('$history', () => {
    // on.first -> on.second.A
    const state2A = historyMachine.transition({ on: 'first' }, 'SWITCH');
    // on.second.A -> on.second.B.P
    const state2BP = historyMachine.transition(state2A, 'INNER');
    // on.second.B.P -> on.second.B.Q
    const state2BQ = historyMachine.transition(state2BP, 'INNER');

    it('should go to the shallow history', () => {
      // on.second.B.P -> off
      const stateOff = historyMachine.transition(state2BP, 'POWER');
      assert.equal(
        historyMachine.transition(stateOff, 'POWER').toString(),
        'on.second.A'
      );
    });

    it('should go to the deep history (explicit)', () => {
      // on.second.B.P -> off
      const stateOff = historyMachine.transition(state2BP, 'POWER');
      assert.equal(
        historyMachine.transition(stateOff, 'DEEP_POWER').toString(),
        'on.second.B.P'
      );
    });

    it('should go to the deepest history', () => {
      // on.second.B.Q -> off
      const stateOff = historyMachine.transition(state2BQ, 'POWER');
      assert.equal(
        historyMachine.transition(stateOff, 'DEEP_POWER').toString(),
        'on.second.B.Q'
      );
    });
  });
});

describe('parallel history states', () => {
  const historyMachine = Machine({
    key: 'parallelhistory',
    initial: 'off',
    states: {
      off: {
        on: {
          SWITCH: 'on', // go to the initial states
          POWER: 'on.$history',
          DEEP_POWER: 'on.deepHistory',
          PARALLEL_HISTORY: [{ target: ['on.A.$history', 'on.K.$history'] }],
          PARALLEL_SOME_HISTORY: [{ target: ['on.A.C', 'on.K.$history'] }],
          PARALLEL_DEEP_HISTORY: [
            { target: ['on.A.deepHistory', 'on.K.deepHistory'] }
          ]
        }
      },
      on: {
        parallel: true,
        states: {
          A: {
            initial: 'B',
            states: {
              B: {
                on: { INNER_A: 'C' }
              },
              C: {
                initial: 'D',
                states: {
                  D: {
                    on: { INNER_A: 'E' }
                  },
                  E: {}
                }
              },
              deepHistory: {
                history: 'deep'
              }
            }
          },
          K: {
            initial: 'L',
            states: {
              L: {
                on: { INNER_K: 'M' }
              },
              M: {
                initial: 'N',
                states: {
                  N: {
                    on: { INNER_K: 'O' }
                  },
                  O: {}
                }
              },
              deepHistory: {
                history: 'deep'
              }
            }
          },
          shallowHistory: {
            history: 'shallow'
          },
          deepHistory: {
            history: 'deep'
          }
        },
        on: {
          POWER: 'off'
        }
      }
    }
  });

  describe('$history', () => {
    // on.first -> on.second.A
    const stateABKL = historyMachine.transition(
      historyMachine.initialState,
      'SWITCH'
    );
    // INNER_A twice
    const stateACDKL = historyMachine.transition(stateABKL, 'INNER_A');
    const stateACEKL = historyMachine.transition(stateACDKL, 'INNER_A');

    // INNER_K twice
    const stateACEKMN = historyMachine.transition(stateACEKL, 'INNER_K');
    const stateACEKMO = historyMachine.transition(stateACEKMN, 'INNER_K');

    it('should ignore parallel state history', () => {
      const stateOff = historyMachine.transition(stateACDKL, 'POWER');
      assert.deepEqual(historyMachine.transition(stateOff, 'POWER').value, {
        on: { A: 'B', K: 'L' }
      });
    });

    it('should remember first level state history', () => {
      const stateOff = historyMachine.transition(stateACDKL, 'POWER');
      assert.deepEqual(
        historyMachine.transition(stateOff, 'DEEP_POWER').value,
        {
          on: { A: { C: 'D' }, K: 'L' }
        }
      );
    });

    it('should re-enter each regions of parallel state correctly', () => {
      const stateOff = historyMachine.transition(stateACEKMO, 'POWER');
      assert.deepEqual(
        historyMachine.transition(stateOff, 'DEEP_POWER').value,
        {
          on: { A: { C: 'E' }, K: { M: 'O' } }
        }
      );
    });

    it('should re-enter multiple history states', () => {
      const stateOff = historyMachine.transition(stateACEKMO, 'POWER');
      assert.deepEqual(
        historyMachine.transition(stateOff, 'PARALLEL_HISTORY').value,
        {
          on: { A: { C: 'D' }, K: { M: 'N' } }
        }
      );
    });

    it('should re-enter a parallel with partial history', () => {
      const stateOff = historyMachine.transition(stateACEKMO, 'POWER');
      assert.deepEqual(
        historyMachine.transition(stateOff, 'PARALLEL_SOME_HISTORY').value,
        {
          on: { A: { C: 'D' }, K: { M: 'N' } }
        }
      );
    });

    it('should re-enter a parallel with full history', () => {
      const stateOff = historyMachine.transition(stateACEKMO, 'POWER');
      assert.deepEqual(
        historyMachine.transition(stateOff, 'PARALLEL_DEEP_HISTORY').value,
        {
          on: { A: { C: 'E' }, K: { M: 'O' } }
        }
      );
    });
  });
});

describe('transient history', () => {
  const transientMachine = Machine({
    initial: 'A',
    parallel: false,
    states: {
      A: {
        on: { EVENT: 'B' }
      },
      B: {
        on: {
          // eventless transition
          '': 'C'
        }
      },
      C: {}
    }
  });
  it('should have history on transient transitions', () => {
    const nextState = transientMachine.transition('A', 'EVENT');
    assert.equal(nextState.value, 'C');
    assert.isDefined(nextState.history);
  });
});

describe('internal transition with history', () => {
  const machine = Machine({
    key: 'test',
    initial: 'first',
    states: {
      first: {
        initial: 'foo',
        states: {
          foo: {}
        },
        on: {
          NEXT: 'second.other'
        }
      },
      second: {
        initial: 'nested',
        states: {
          nested: {},
          other: {},
          hist: {
            history: true
          }
        },
        on: {
          NEXT: [
            {
              target: '.hist'
            }
          ]
        }
      }
    }
  });

  it('should transition internally to the most recently visited state', () => {
    // {
    //   $current: 'first',
    //   first: undefined,
    //   second: {
    //     $current: 'nested',
    //     nested: undefined,
    //     other: undefined
    //   }
    // }
    const state2 = machine.transition(machine.initialState, 'NEXT');
    // {
    //   $current: 'second',
    //   first: undefined,
    //   second: {
    //     $current: 'other',
    //     nested: undefined,
    //     other: undefined
    //   }
    // }
    const state3 = machine.transition(state2, 'NEXT');
    // {
    //   $current: 'second',
    //   first: undefined,
    //   second: {
    //     $current: 'other',
    //     nested: undefined,
    //     other: undefined
    //   }
    // }

    assert.deepEqual(state3.value, { second: 'other' });
  });
});

describe('multistage history states', () => {
  const pcWithTurboButtonMachine = Machine({
    key: 'pc-with-turbo-button',
    initial: 'off',
    states: {
      off: {
        on: { POWER: 'starting' }
      },
      starting: {
        on: { STARTED: 'running.H' }
      },
      running: {
        initial: 'normal',
        states: {
          normal: {
            on: { SWITCH_TURBO: 'turbo' }
          },
          turbo: {
            on: { SWITCH_TURBO: 'normal' }
          },
          H: {
            history: true
          }
        },
        on: {
          POWER: 'off'
        }
      }
    }
  });

  it('should go to the most recently visited state', () => {
    const onTurboState = pcWithTurboButtonMachine.transition(
      'running',
      'SWITCH_TURBO'
    );
    const offState = pcWithTurboButtonMachine.transition(onTurboState, 'POWER');
    const loadingState = pcWithTurboButtonMachine.transition(offState, 'POWER');

    assert.equal(
      pcWithTurboButtonMachine.transition(loadingState, 'STARTED').toString(),
      'running.turbo'
    );
  });
});
