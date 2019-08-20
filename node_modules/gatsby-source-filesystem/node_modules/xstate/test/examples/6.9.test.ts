import { Machine } from '../../src/index';
import { testAll } from '../utils';

describe('Example 6.9', () => {
  const machine = Machine({
    initial: 'A',
    states: {
      A: {
        on: {
          6: 'H'
        },
        initial: 'B',
        states: {
          B: {
            initial: 'E',
            on: {
              5: 'C'
            },
            states: {
              D: {},
              E: {
                on: { 3: 'D' }
              }
            }
          },
          C: {
            initial: 'G',
            on: {
              4: 'B.E'
            },
            states: {
              F: {},
              G: {
                on: {
                  2: 'F'
                }
              }
            }
          }
        }
      },
      H: {
        on: {
          1: 'A.$history',
          7: 'A.$history*' // 6.10
        }
      }
    }
  });

  const expected = {
    A: {
      3: 'A.B.D',
      5: 'A.C.G',
      6: 'H',
      FAKE: undefined
    },
    'A.B': {
      3: 'A.B.D',
      5: 'A.C.G',
      6: 'H',
      FAKE: undefined,

      // history
      '5, 6, 1': 'A.C.G',
      '3, 6, 1': 'A.B.E' // not A.B.D because not deep history
      // '3, 6, 7': 'A.B.D'
    },
    'A.C': {
      2: 'A.C.F',
      4: 'A.B.E',
      6: 'H',
      FAKE: undefined,
      '6, 1': 'A.C.G',
      '4, 6, 1': 'A.B.E'
    },
    'A.B.D': {
      5: 'A.C.G',
      6: 'H',
      FAKE: undefined
    },
    'A.B.E': {
      3: 'A.B.D',
      5: 'A.C.G',
      6: 'H',
      FAKE: undefined
    },
    'A.C.F': {
      4: 'A.B.E',
      6: 'H',
      FAKE: undefined
    },
    'A.C.G': {
      2: 'A.C.F',
      4: 'A.B.E',
      6: 'H',
      FAKE: undefined
    },
    H: {
      1: 'A.B.E',
      FAKE: undefined
    }
  };

  testAll(machine, expected);
});
