// import { assert } from 'chai';
// import { Machine } from '../src/index';
import { machine as idMachine } from './fixtures/id';
import { testAll } from './utils';
// import { mapValues } from '../src/utils';

describe('State node IDs', () => {
  const expected = {
    A: {
      NEXT: 'A.bar'
    },
    '#A': {
      NEXT: 'A.bar'
    },
    'A.foo': {
      NEXT: 'A.bar'
    },
    '#A_foo': {
      NEXT: 'A.bar'
    },
    'A.bar': {
      NEXT: 'B.foo'
    },
    '#A_bar': {
      NEXT: 'B.foo'
    },
    'B.foo': {
      'NEXT,NEXT': 'A.foo'
    },
    '#B_foo': {
      'NEXT,NEXT': 'A.foo'
    }
  };

  testAll(idMachine, expected);
});
