import { assert } from 'chai';
import { Machine, StateNode } from '../src/index';
import {
  getNodes,
  getEdges,
  getShortestPaths,
  getSimplePaths,
  getAdjacencyMap,
  getShortestPathsAsArray,
  getSimplePathsAsArray
} from '../src/graph';
import { PathMap } from '../src/types';
// tslint:disable-next-line:no-var-requires
// import * as util from 'util';

describe('graph utilities', () => {
  const pedestrianStates = {
    initial: 'walk',
    states: {
      walk: {
        on: {
          PED_COUNTDOWN: {
            wait: {
              actions: ['startCountdown']
            }
          }
        }
      },
      wait: {
        on: {
          PED_COUNTDOWN: 'stop'
        }
      },
      stop: {},
      flashing: {}
    }
  };

  const lightMachine = Machine({
    key: 'light',
    initial: 'green',
    states: {
      green: {
        on: {
          TIMER: 'yellow',
          POWER_OUTAGE: 'red.flashing'
        }
      },
      yellow: {
        on: {
          TIMER: 'red',
          POWER_OUTAGE: '#light.red.flashing'
        }
      },
      red: {
        on: {
          TIMER: 'green',
          POWER_OUTAGE: 'red.flashing'
        },
        ...pedestrianStates
      }
    }
  });

  const condMachine = Machine({
    key: 'cond',
    initial: 'pending',
    states: {
      pending: {
        on: {
          EVENT: [
            { target: 'foo', cond: (_, e) => e.id === 'foo' },
            { target: 'bar' }
          ],
          STATE: [
            { target: 'foo', cond: s => s.id === 'foo' },
            { target: 'bar' }
          ]
        }
      },
      foo: {},
      bar: {}
    }
  });

  const parallelMachine = Machine({
    parallel: true,
    key: 'p',
    states: {
      a: {
        initial: 'a1',
        states: {
          a1: {
            on: { 2: 'a2', 3: 'a3' }
          },
          a2: {
            on: { 3: 'a3', 1: 'a1' }
          },
          a3: {}
        }
      },
      b: {
        initial: 'b1',
        states: {
          b1: {
            on: { 2: 'b2', 3: 'b3' }
          },
          b2: {
            on: { 3: 'b3', 1: 'b1' }
          },
          b3: {}
        }
      }
    }
  });

  describe('getNodes()', () => {
    it('should return an array of all nodes', () => {
      const nodes = getNodes(lightMachine);
      assert.ok(nodes.every(node => node instanceof StateNode));
      assert.sameMembers(nodes.map(node => node.id), [
        'light.green',
        'light.yellow',
        'light.red',
        'light.red.walk',
        'light.red.wait',
        'light.red.stop',
        'light.red.flashing'
      ]);
    });

    it('should return an array of all nodes (parallel)', () => {
      const nodes = getNodes(parallelMachine);
      assert.ok(nodes.every(node => node instanceof StateNode));
      assert.sameMembers(nodes.map(node => node.id), [
        'p.a',
        'p.a.a1',
        'p.a.a2',
        'p.a.a3',
        'p.b',
        'p.b.b1',
        'p.b.b2',
        'p.b.b3'
      ]);
    });
  });

  describe('getEdges()', () => {
    it('should return an array of all directed edges', () => {
      const edges = getEdges(lightMachine);
      assert.ok(
        edges.every(edge => {
          return (
            typeof edge.event === 'string' &&
            edge.source instanceof StateNode &&
            edge.target instanceof StateNode
          );
        })
      );
      assert.sameDeepMembers(
        edges.map(edge => ({
          event: edge.event,
          source: edge.source.id,
          target: edge.target.id,
          actions: edge.actions
        })),
        [
          {
            event: 'TIMER',
            source: 'light.green',
            target: 'light.yellow',
            actions: []
          },
          {
            event: 'TIMER',
            source: 'light.yellow',
            target: 'light.red',
            actions: []
          },
          {
            event: 'PED_COUNTDOWN',
            source: 'light.red.walk',
            target: 'light.red.wait',
            actions: ['startCountdown']
          },
          {
            event: 'PED_COUNTDOWN',
            source: 'light.red.wait',
            target: 'light.red.stop',
            actions: []
          },
          {
            event: 'TIMER',
            source: 'light.red',
            target: 'light.green',
            actions: []
          },
          {
            event: 'POWER_OUTAGE',
            source: 'light.red',
            target: 'light.red.flashing',
            actions: []
          },
          {
            event: 'POWER_OUTAGE',
            source: 'light.yellow',
            target: 'light.red.flashing',
            actions: []
          },
          {
            event: 'POWER_OUTAGE',
            source: 'light.green',
            target: 'light.red.flashing',
            actions: []
          }
        ]
      );
    });

    it('should return an array of all directed edges (parallel)', () => {
      const edges = getEdges(parallelMachine);
      assert.ok(
        edges.every(edge => {
          return (
            typeof edge.event === 'string' &&
            edge.source instanceof StateNode &&
            edge.target instanceof StateNode
          );
        })
      );
      assert.sameDeepMembers(
        edges.map(edge => ({
          event: edge.event,
          source: edge.source.id,
          target: edge.target.id
        })),
        [
          { event: '2', source: 'p.a.a1', target: 'p.a.a2' },
          { event: '1', source: 'p.a.a2', target: 'p.a.a1' },
          { event: '3', source: 'p.a.a2', target: 'p.a.a3' },
          { event: '3', source: 'p.a.a1', target: 'p.a.a3' },
          { event: '2', source: 'p.b.b1', target: 'p.b.b2' },
          { event: '1', source: 'p.b.b2', target: 'p.b.b1' },
          { event: '3', source: 'p.b.b2', target: 'p.b.b3' },
          { event: '3', source: 'p.b.b1', target: 'p.b.b3' }
        ]
      );
    });
  });

  describe('getAdjacencyMap()', () => {
    it('should return a flattened adjacency map', () => {
      assert.deepEqual(getAdjacencyMap(lightMachine), {
        '"green"': {
          TIMER: { state: 'yellow' },
          POWER_OUTAGE: { state: { red: 'flashing' } },
          PED_COUNTDOWN: { state: 'green' }
        },
        '"yellow"': {
          TIMER: { state: { red: 'walk' } },
          POWER_OUTAGE: { state: { red: 'flashing' } },
          PED_COUNTDOWN: { state: 'yellow' }
        },
        '{"red":"walk"}': {
          TIMER: { state: 'green' },
          POWER_OUTAGE: { state: { red: 'flashing' } },
          PED_COUNTDOWN: { state: { red: 'wait' } }
        },
        '{"red":"flashing"}': {
          TIMER: { state: 'green' },
          POWER_OUTAGE: { state: { red: 'flashing' } },
          PED_COUNTDOWN: { state: { red: 'flashing' } }
        },
        '{"red":"wait"}': {
          TIMER: { state: 'green' },
          POWER_OUTAGE: { state: { red: 'flashing' } },
          PED_COUNTDOWN: { state: { red: 'stop' } }
        },
        '{"red":"stop"}': {
          TIMER: { state: 'green' },
          POWER_OUTAGE: { state: { red: 'flashing' } },
          PED_COUNTDOWN: { state: { red: 'stop' } }
        }
      });
    });

    it('should return a flattened adjacency map (parallel)', () => {
      assert.deepEqual(getAdjacencyMap(parallelMachine), {
        '{"a":"a1","b":"b1"}': {
          '1': { state: { a: 'a1', b: 'b1' } },
          '2': { state: { a: 'a2', b: 'b2' } },
          '3': { state: { a: 'a3', b: 'b3' } }
        },
        '{"a":"a2","b":"b2"}': {
          '1': { state: { a: 'a1', b: 'b1' } },
          '2': { state: { a: 'a2', b: 'b2' } },
          '3': { state: { a: 'a3', b: 'b3' } }
        },
        '{"a":"a3","b":"b3"}': {
          '1': { state: { a: 'a3', b: 'b3' } },
          '2': { state: { a: 'a3', b: 'b3' } },
          '3': { state: { a: 'a3', b: 'b3' } }
        }
      });
    });
  });

  describe('getShortestPaths()', () => {
    it('should return a mapping of shortest paths to all states', () => {
      assert.deepEqual(getShortestPaths(lightMachine), {
        '"green"': [],
        '"yellow"': [{ state: 'green', event: 'TIMER' }],
        '{"red":"flashing"}': [{ state: 'green', event: 'POWER_OUTAGE' }],
        '{"red":"walk"}': [
          { state: 'green', event: 'TIMER' },
          { state: 'yellow', event: 'TIMER' }
        ],
        '{"red":"wait"}': [
          { state: 'green', event: 'TIMER' },
          { state: 'yellow', event: 'TIMER' },
          { state: { red: 'walk' }, event: 'PED_COUNTDOWN' }
        ],
        '{"red":"stop"}': [
          { state: 'green', event: 'TIMER' },
          { state: 'yellow', event: 'TIMER' },
          { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
          { state: { red: 'wait' }, event: 'PED_COUNTDOWN' }
        ]
      });
    });

    it('should return a mapping of shortest paths to all states (parallel)', () => {
      assert.deepEqual(getShortestPaths(parallelMachine), {
        '{"a":"a1","b":"b1"}': [],
        '{"a":"a2","b":"b2"}': [
          {
            event: '2',
            state: {
              a: 'a1',
              b: 'b1'
            }
          }
        ],
        '{"a":"a3","b":"b3"}': [
          {
            event: '3',
            state: {
              a: 'a1',
              b: 'b1'
            }
          }
        ]
      });
    });

    it('the initial state should have a zero-length path', () => {
      assert.lengthOf(
        (getShortestPaths(lightMachine) as PathMap)[
          JSON.stringify(lightMachine.initialState.value)
        ],
        0
      );
    });

    it('should not throw when a condition is present', () => {
      assert.doesNotThrow(() => getShortestPaths(condMachine));
    });

    it('should represent conditional paths based on extended state', () => {
      assert.deepEqual(getShortestPaths(condMachine, { id: 'foo' }), {
        '"bar"': [
          {
            event: 'EVENT',
            state: 'pending'
          }
        ],
        '"foo"': [
          {
            event: 'STATE',
            state: 'pending'
          }
        ],
        '"pending"': []
      });
    });
  });

  describe('getShortestPathsAsArray()', () => {
    it('should return an array of shortest paths to all states', () => {
      assert.deepEqual(getShortestPathsAsArray(lightMachine), [
        { state: 'green', path: [] },
        {
          state: 'yellow',
          path: [{ state: 'green', event: 'TIMER' }]
        },
        {
          state: { red: 'flashing' },
          path: [{ state: 'green', event: 'POWER_OUTAGE' }]
        },
        {
          state: { red: 'walk' },
          path: [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' }
          ]
        },
        {
          state: { red: 'wait' },
          path: [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' },
            { state: { red: 'walk' }, event: 'PED_COUNTDOWN' }
          ]
        },
        {
          state: { red: 'stop' },
          path: [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' },
            { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
            { state: { red: 'wait' }, event: 'PED_COUNTDOWN' }
          ]
        }
      ]);
    });
  });

  describe('getSimplePaths()', () => {
    it('should return a mapping of arrays of simple paths to all states', () => {
      assert.deepEqual(getSimplePaths(lightMachine), {
        '"green"': [[]],
        '"yellow"': [[{ state: 'green', event: 'TIMER' }]],
        '{"red":"walk"}': [
          [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' }
          ]
        ],
        '{"red":"flashing"}': [
          [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' },
            { state: { red: 'walk' }, event: 'POWER_OUTAGE' }
          ],
          [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' },
            { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
            { state: { red: 'wait' }, event: 'POWER_OUTAGE' }
          ],
          [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' },
            { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
            { state: { red: 'wait' }, event: 'PED_COUNTDOWN' },
            { state: { red: 'stop' }, event: 'POWER_OUTAGE' }
          ],
          [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'POWER_OUTAGE' }
          ],
          [{ state: 'green', event: 'POWER_OUTAGE' }]
        ],
        '{"red":"wait"}': [
          [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' },
            { state: { red: 'walk' }, event: 'PED_COUNTDOWN' }
          ]
        ],
        '{"red":"stop"}': [
          [
            { state: 'green', event: 'TIMER' },
            { state: 'yellow', event: 'TIMER' },
            { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
            { state: { red: 'wait' }, event: 'PED_COUNTDOWN' }
          ]
        ]
      });
    });

    const equivMachine = Machine({
      initial: 'a',
      states: {
        a: { on: { FOO: 'b', BAR: 'b' } },
        b: { on: { FOO: 'a', BAR: 'a' } }
      }
    });

    it('should return a mapping of simple paths to all states (parallel)', () => {
      assert.deepEqual(getSimplePaths(parallelMachine), {
        '{"a":"a1","b":"b1"}': [[]],
        '{"a":"a2","b":"b2"}': [
          [
            {
              event: '2',
              state: {
                a: 'a1',
                b: 'b1'
              }
            }
          ]
        ],
        '{"a":"a3","b":"b3"}': [
          [
            {
              event: '2',
              state: {
                a: 'a1',
                b: 'b1'
              }
            },
            {
              event: '3',
              state: {
                a: 'a2',
                b: 'b2'
              }
            }
          ],
          [
            {
              event: '3',
              state: {
                a: 'a1',
                b: 'b1'
              }
            }
          ]
        ]
      });
    });

    it('should return multiple paths for equivalent transitions', () => {
      assert.deepEqual(getSimplePaths(equivMachine), {
        '"a"': [[]],
        '"b"': [
          [
            {
              event: 'FOO',
              state: 'a'
            }
          ],
          [
            {
              event: 'BAR',
              state: 'a'
            }
          ]
        ]
      });
    });

    it('should return a single empty path for the initial state', () => {
      assert.deepEqual(getSimplePaths(lightMachine)['"green"'], [[]]);
      assert.deepEqual(getSimplePaths(equivMachine)['"a"'], [[]]);
    });
  });

  describe('getSimplePathsAsArray()', () => {
    it('should return an array of shortest paths to all states', () => {
      assert.deepEqual(getSimplePathsAsArray(lightMachine), [
        { state: 'green', paths: [[]] },
        {
          state: 'yellow',
          paths: [[{ state: 'green', event: 'TIMER' }]]
        },
        {
          state: { red: 'walk' },
          paths: [
            [
              { state: 'green', event: 'TIMER' },
              { state: 'yellow', event: 'TIMER' }
            ]
          ]
        },
        {
          state: { red: 'flashing' },
          paths: [
            [
              { state: 'green', event: 'TIMER' },
              { state: 'yellow', event: 'TIMER' },
              { state: { red: 'walk' }, event: 'POWER_OUTAGE' }
            ],
            [
              { state: 'green', event: 'TIMER' },
              { state: 'yellow', event: 'TIMER' },
              { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
              { state: { red: 'wait' }, event: 'POWER_OUTAGE' }
            ],
            [
              { state: 'green', event: 'TIMER' },
              { state: 'yellow', event: 'TIMER' },
              { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
              { state: { red: 'wait' }, event: 'PED_COUNTDOWN' },
              { state: { red: 'stop' }, event: 'POWER_OUTAGE' }
            ],
            [
              { state: 'green', event: 'TIMER' },
              { state: 'yellow', event: 'POWER_OUTAGE' }
            ],
            [{ state: 'green', event: 'POWER_OUTAGE' }]
          ]
        },
        {
          state: { red: 'wait' },
          paths: [
            [
              { state: 'green', event: 'TIMER' },
              { state: 'yellow', event: 'TIMER' },
              { state: { red: 'walk' }, event: 'PED_COUNTDOWN' }
            ]
          ]
        },
        {
          state: { red: 'stop' },
          paths: [
            [
              { state: 'green', event: 'TIMER' },
              { state: 'yellow', event: 'TIMER' },
              { state: { red: 'walk' }, event: 'PED_COUNTDOWN' },
              { state: { red: 'wait' }, event: 'PED_COUNTDOWN' }
            ]
          ]
        }
      ]);
    });
  });
});
