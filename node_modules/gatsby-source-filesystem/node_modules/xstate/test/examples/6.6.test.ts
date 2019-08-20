import { Machine } from '../../src/index';
import { testAll } from '../utils';

describe('Example 6.6', () => {
  const machine = Machine({
    initial: 'A',
    states: {
      A: {
        on: {
          3: 'B'
        },
        initial: 'D',
        states: {
          C: {
            on: {
              2: '#B'
            }
          },
          D: {
            on: {
              1: 'C'
            }
          }
        },
        via: {
          C: {
            on: {
              2: 'B'
            }
          }
        }
      },
      B: {
        id: 'B',
        on: {
          4: 'A.D'
        }
      }
    }
  });

  const expected = {
    A: {
      1: 'A.C',
      2: 'A.D',
      3: 'B',
      4: 'A.D'
    },
    B: {
      1: 'B',
      2: 'B',
      3: 'B',
      4: 'A.D'
    },
    'A.C': {
      1: 'A.C',
      2: 'B',
      3: 'B',
      4: 'A.C'
    },
    'A.D': {
      1: 'A.C',
      2: 'A.D',
      3: 'B',
      4: 'A.D'
    }
  };

  testAll(machine, expected);
});
