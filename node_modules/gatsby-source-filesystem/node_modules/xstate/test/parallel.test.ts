import { assert } from 'chai';
import { raise } from '../src/actions';
import { Machine } from '../src/StateNode';
import { testMultiTransition } from './utils';

const composerMachine = Machine({
  strict: true,
  initial: 'ReadOnly',
  states: {
    ReadOnly: {
      id: 'ReadOnly',
      initial: 'StructureEdit',
      onEntry: ['selectNone'],
      states: {
        StructureEdit: {
          id: 'StructureEditRO',
          parallel: true,
          on: {
            switchToProjectManagement: [
              {
                target: 'ProjectManagement'
              }
            ]
          },
          states: {
            SelectionStatus: {
              initial: 'SelectedNone',
              on: {
                singleClickActivity: [
                  {
                    target: '.SelectedActivity',
                    actions: ['selectActivity']
                  }
                ],
                singleClickLink: [
                  {
                    target: '.SelectedLink',
                    actions: ['selectLink']
                  }
                ]
              },
              states: {
                SelectedNone: {
                  onEntry: ['redraw']
                },
                SelectedActivity: {
                  onEntry: ['redraw'],
                  on: {
                    singleClickCanvas: [
                      {
                        target: 'SelectedNone',
                        actions: ['selectNone']
                      }
                    ]
                  }
                },
                SelectedLink: {
                  onEntry: ['redraw'],
                  on: {
                    singleClickCanvas: [
                      {
                        target: 'SelectedNone',
                        actions: ['selectNone']
                      }
                    ]
                  }
                }
              }
            },
            ClipboardStatus: {
              initial: 'Empty',
              states: {
                Empty: {
                  onEntry: ['emptyClipboard'],
                  on: {
                    cutInClipboardSuccess: [
                      {
                        target: 'FilledByCut'
                      }
                    ],
                    copyInClipboardSuccess: [
                      {
                        target: 'FilledByCopy'
                      }
                    ]
                  }
                },
                FilledByCopy: {
                  on: {
                    cutInClipboardSuccess: [
                      {
                        target: 'FilledByCut'
                      }
                    ],
                    copyInClipboardSuccess: [
                      {
                        target: 'FilledByCopy'
                      }
                    ],
                    pasteFromClipboardSuccess: [
                      {
                        target: 'FilledByCopy'
                      }
                    ]
                  }
                },
                FilledByCut: {
                  on: {
                    cutInClipboardSuccess: [
                      {
                        target: 'FilledByCut'
                      }
                    ],
                    copyInClipboardSuccess: [
                      {
                        target: 'FilledByCopy'
                      }
                    ],
                    pasteFromClipboardSuccess: [
                      {
                        target: 'Empty'
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        ProjectManagement: {
          id: 'ProjectManagementRO',
          parallel: true,
          on: {
            switchToStructureEdit: [
              {
                target: 'StructureEdit'
              }
            ]
          },
          states: {
            SelectionStatus: {
              initial: 'SelectedNone',
              on: {
                singleClickActivity: [
                  {
                    target: '.SelectedActivity',
                    actions: ['selectActivity']
                  }
                ],
                singleClickLink: [
                  {
                    target: '.SelectedLink',
                    actions: ['selectLink']
                  }
                ]
              },
              states: {
                SelectedNone: {
                  onEntry: ['redraw']
                },
                SelectedActivity: {
                  onEntry: ['redraw'],
                  on: {
                    singleClickCanvas: [
                      {
                        target: 'SelectedNone',
                        actions: ['selectNone']
                      }
                    ]
                  }
                },
                SelectedLink: {
                  onEntry: ['redraw'],
                  on: {
                    singleClickCanvas: [
                      {
                        target: 'SelectedNone',
                        actions: ['selectNone']
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});

const wakMachine = Machine({
  id: 'wakMachine',
  parallel: true,
  strict: true,
  states: {
    wak1: {
      initial: 'wak1sonA',
      states: {
        wak1sonA: {
          onEntry: 'wak1sonAenter',
          onExit: 'wak1sonAexit'
        },
        wak1sonB: {
          onEntry: 'wak1sonBenter',
          onExit: 'wak1sonBexit'
        }
      },
      on: {
        WAK1: '.wak1sonB'
      },
      onEntry: 'wak1enter',
      onExit: 'wak1exit'
    },
    wak2: {
      initial: 'wak2sonA',
      states: {
        wak2sonA: {
          onEntry: 'wak2sonAenter',
          onExit: 'wak2sonAexit'
        },
        wak2sonB: {
          onEntry: 'wak2sonBenter',
          onExit: 'wak2sonBexit'
        }
      },
      on: {
        WAK2: '.wak2sonB'
      },
      onEntry: 'wak2enter',
      onExit: 'wak2exit'
    }
  }
});

const wordMachine = Machine({
  parallel: true,
  states: {
    bold: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_BOLD: 'off' }
        },
        off: {
          on: { TOGGLE_BOLD: 'on' }
        }
      }
    },
    underline: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_UNDERLINE: 'off' }
        },
        off: {
          on: { TOGGLE_UNDERLINE: 'on' }
        }
      }
    },
    italics: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_ITALICS: 'off' }
        },
        off: {
          on: { TOGGLE_ITALICS: 'on' }
        }
      }
    },
    list: {
      initial: 'none',
      states: {
        none: {
          on: { BULLETS: 'bullets', NUMBERS: 'numbers' }
        },
        bullets: {
          on: { NONE: 'none', NUMBERS: 'numbers' }
        },
        numbers: {
          on: { BULLETS: 'bullets', NONE: 'none' }
        }
      }
    }
  }
});

const flatParallelMachine = Machine({
  parallel: true,
  states: {
    foo: {},
    bar: {},
    baz: {
      initial: 'one',
      states: {
        one: { on: { E: 'two' } },
        two: {}
      }
    }
  }
});

const raisingParallelMachine = Machine({
  strict: true,
  parallel: true,
  states: {
    OUTER1: {
      initial: 'C',
      states: {
        A: {
          onEntry: [raise('TURN_OFF')],
          on: {
            EVENT_OUTER1_B: 'B',
            EVENT_OUTER1_C: 'C'
          }
        },
        B: {
          onEntry: [raise('TURN_ON')],
          on: {
            EVENT_OUTER1_A: 'A',
            EVENT_OUTER1_C: 'C'
          }
        },
        C: {
          onEntry: [raise('CLEAR')],
          on: {
            EVENT_OUTER1_A: 'A',
            EVENT_OUTER1_B: 'B'
          }
        }
      }
    },
    OUTER2: {
      parallel: true,
      states: {
        INNER1: {
          initial: 'ON',
          states: {
            OFF: {
              on: {
                TURN_ON: 'ON'
              }
            },
            ON: {
              on: {
                CLEAR: 'OFF'
              }
            }
          }
        },
        INNER2: {
          initial: 'OFF',
          states: {
            OFF: {
              on: {
                TURN_ON: 'ON'
              }
            },
            ON: {
              on: {
                TURN_OFF: 'OFF'
              }
            }
          }
        }
      }
    }
  }
});

const nestedParallelState = Machine({
  parallel: true,
  states: {
    OUTER1: {
      initial: 'STATE_OFF',
      states: {
        STATE_OFF: {
          on: {
            EVENT_COMPLEX: 'STATE_ON',
            EVENT_SIMPLE: 'STATE_ON'
          }
        },
        STATE_ON: {
          parallel: true,
          states: {
            STATE_NTJ0: {
              initial: 'STATE_IDLE_0',
              states: {
                STATE_IDLE_0: {
                  on: {
                    EVENT_STATE_NTJ0_WORK: 'STATE_WORKING_0'
                  }
                },
                STATE_WORKING_0: {
                  on: {
                    EVENT_STATE_NTJ0_IDLE: 'STATE_IDLE_0'
                  }
                }
              }
            },
            STATE_NTJ1: {
              initial: 'STATE_IDLE_1',
              states: {
                STATE_IDLE_1: {
                  on: {
                    EVENT_STATE_NTJ1_WORK: 'STATE_WORKING_1'
                  }
                },
                STATE_WORKING_1: {
                  on: {
                    EVENT_STATE_NTJ1_IDLE: 'STATE_IDLE_1'
                  }
                }
              }
            }
          }
        }
      }
    },
    OUTER2: {
      initial: 'STATE_OFF',
      states: {
        STATE_OFF: {
          on: {
            EVENT_COMPLEX: 'STATE_ON_COMPLEX',
            EVENT_SIMPLE: 'STATE_ON_SIMPLE'
          }
        },
        STATE_ON_SIMPLE: {},
        STATE_ON_COMPLEX: {
          parallel: true,
          states: {
            STATE_INNER1: {
              initial: 'STATE_OFF',
              states: {
                STATE_OFF: {},
                STATE_ON: {}
              }
            },
            STATE_INNER2: {
              initial: 'STATE_OFF',
              states: {
                STATE_OFF: {},
                STATE_ON: {}
              }
            }
          }
        }
      }
    }
  }
});

describe('parallel states', () => {
  it('should have initial parallel states', () => {
    const { initialState } = wordMachine;

    assert.deepEqual(initialState.value, {
      bold: 'off',
      italics: 'off',
      underline: 'off',
      list: 'none'
    });
  });

  const expected = {
    'bold.off': {
      TOGGLE_BOLD: {
        bold: 'on',
        italics: 'off',
        underline: 'off',
        list: 'none'
      }
    },
    'bold.on': {
      TOGGLE_BOLD: {
        bold: 'off',
        italics: 'off',
        underline: 'off',
        list: 'none'
      }
    },
    [JSON.stringify({
      bold: 'off',
      italics: 'off',
      underline: 'on',
      list: 'bullets'
    })]: {
      'TOGGLE_BOLD, TOGGLE_ITALICS': {
        bold: 'on',
        italics: 'on',
        underline: 'on',
        list: 'bullets'
      }
    }
  };

  Object.keys(expected).forEach(fromState => {
    Object.keys(expected[fromState]).forEach(eventTypes => {
      const toState = expected[fromState][eventTypes];

      it(`should go from ${fromState} to ${JSON.stringify(
        toState
      )} on ${eventTypes}`, () => {
        const resultState = testMultiTransition(
          wordMachine,
          fromState,
          eventTypes
        );

        assert.deepEqual(resultState.value, toState);
      });
    });
  });

  it('should have all parallel states represented in the state value', () => {
    const nextState = wakMachine.transition(wakMachine.initialState, 'WAK1');

    assert.deepEqual(nextState.value, { wak1: 'wak1sonB', wak2: 'wak2sonA' });
  });

  it('should have all parallel states represented in the state value (2)', () => {
    const nextState = wakMachine.transition(wakMachine.initialState, 'WAK2');

    assert.deepEqual(nextState.value, { wak1: 'wak1sonA', wak2: 'wak2sonB' });
  });

  it('should work with regions without states', () => {
    assert.deepEqual(flatParallelMachine.initialState.value, {
      foo: {},
      bar: {},
      baz: 'one'
    });
  });

  it('should work with regions without states', () => {
    const nextState = flatParallelMachine.transition(
      flatParallelMachine.initialState,
      'E'
    );
    assert.deepEqual(nextState.value, {
      foo: {},
      bar: {},
      baz: 'two'
    });
  });

  it('should properly transition to relative substate', () => {
    const nextState = composerMachine.transition(
      composerMachine.initialState,
      'singleClickActivity'
    );

    assert.deepEqual(nextState.value, {
      ReadOnly: {
        StructureEdit: {
          SelectionStatus: 'SelectedActivity',
          ClipboardStatus: 'Empty'
        }
      }
    });
  });

  it('should properly transition according to onEntry events on an initial state', () => {
    assert.deepEqual(raisingParallelMachine.initialState.value, {
      OUTER1: 'C',
      OUTER2: {
        INNER1: 'OFF',
        INNER2: 'OFF'
      }
    });
  });

  it('should properly transition when raising events for a parallel state', () => {
    const nextState = raisingParallelMachine.transition(
      raisingParallelMachine.initialState,
      'EVENT_OUTER1_B'
    );

    assert.deepEqual(nextState.value, {
      OUTER1: 'B',
      OUTER2: {
        INNER1: 'ON',
        INNER2: 'ON'
      }
    });
  });

  describe('transitions with nested parallel states', () => {
    const initialState = nestedParallelState.initialState;
    const simpleNextState = nestedParallelState.transition(
      initialState,
      'EVENT_SIMPLE'
    );
    const complexNextState = nestedParallelState.transition(
      initialState,
      'EVENT_COMPLEX'
    );

    it('should properly transition when in a simple nested state', () => {
      const nextState = nestedParallelState.transition(
        simpleNextState,
        'EVENT_STATE_NTJ0_WORK'
      );

      assert.deepEqual(nextState.value, {
        OUTER1: {
          STATE_ON: {
            STATE_NTJ0: 'STATE_WORKING_0',
            STATE_NTJ1: 'STATE_IDLE_1'
          }
        },
        OUTER2: 'STATE_ON_SIMPLE'
      });
    });

    it('should properly transition when in a complex nested state', () => {
      const nextState = nestedParallelState.transition(
        complexNextState,
        'EVENT_STATE_NTJ0_WORK'
      );

      assert.deepEqual(nextState.value, {
        OUTER1: {
          STATE_ON: {
            STATE_NTJ0: 'STATE_WORKING_0',
            STATE_NTJ1: 'STATE_IDLE_1'
          }
        },
        OUTER2: {
          STATE_ON_COMPLEX: {
            STATE_INNER1: 'STATE_OFF',
            STATE_INNER2: 'STATE_OFF'
          }
        }
      });
    });
  });
});
