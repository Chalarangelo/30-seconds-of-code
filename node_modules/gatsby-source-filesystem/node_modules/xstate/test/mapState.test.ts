import { assert } from 'chai';
import { mapState } from '../src/index';

describe('mapState()', () => {
  it('should return the first mapping found of a state', () => {
    const mapping = mapState(
      {
        a: 'state a',
        b: 'state b'
      },
      'b'
    );

    assert.strictEqual(mapping, 'state b');
  });

  it('should return undefined for unmapped states', () => {
    const mapping = mapState(
      {
        a: 'state a',
        b: 'state b'
      },
      'c'
    );

    assert.isUndefined(mapping);
  });

  it('should prioritize returning equivalent state mapping', () => {
    const mapping = mapState(
      {
        a: 'state a',
        b: 'state b',
        'b.b1': 'st b.b1'
      },
      'b.b1'
    );

    assert.strictEqual(mapping, 'st b.b1');
  });

  it('should return superstate mapping when substate is not found', () => {
    const mapping = mapState(
      {
        a: 'state a',
        b: 'state b',
        'b.b1': 'st b.b1'
      },
      'b.foo'
    );

    assert.strictEqual(mapping, 'state b');
  });

  it('should return superstate mapping when deep substate is not found', () => {
    const mapping = mapState(
      {
        a: 'state a',
        b: 'state b',
        'b.b1': 'state b.b1'
      },
      'b.b1.foo'
    );

    assert.strictEqual(mapping, 'state b.b1');
  });

  xit('should be able to be curried', () => {
    // let mappingFn = mapState({
    //   'a': 'state a',
    //   'b': 'state b'
    // });
    // assert.strictEqual(mappingFn('a'), 'state a');
    // assert.strictEqual(mappingFn('b'), 'state b');
  });
});

xdescribe('mapOnEntry()', () => {
  // it('should return current state mapping if state is entered', () => {
  //   let mappingFn = mapOnEntry({
  //     'a': 'state a',
  //     'a.a1': 'state a.a1',
  //     'b': 'state b'
  //   });
  //   assert.strictEqual(mappingFn('a', 'b'), 'state a');
  //   assert.strictEqual(mappingFn('b', 'a.a1'), 'state b');
  //   assert.strictEqual(mappingFn('a.a1', 'a'), 'state a.a1');
  // });
  // it('should return null if state has not changed', () => {
  //   let mappingFn = mapOnEntry({
  //     'a': 'state a',
  //     'a.a1': 'state a.a1',
  //     'b': 'state b'
  //   });
  //   assert.strictEqual(mappingFn('a', 'a'), null);
  //   assert.strictEqual(mappingFn('a', 'a.a1'), null);
  //   assert.strictEqual(mappingFn('a.a1', 'a.a1.a2'), null);
  //   assert.strictEqual(mappingFn('a.a1', 'a.a1'), null);
  // });
});

xdescribe('mapOnExit()', () => {
  // it('should return previous state mapping if state is exited (changed)', () => {
  //   let mappingFn = mapOnExit({
  //     'a': 'past state a',
  //     'a.a1': 'past state a.a1',
  //     'a.a1.a2': 'past state a.a1.a2',
  //     'b': 'past state b'
  //   });
  //   assert.strictEqual(mappingFn('a', 'b'), 'past state b');
  //   assert.strictEqual(mappingFn('b', 'a.a1'), 'past state a.a1');
  //   assert.strictEqual(mappingFn('a', 'a.a1'), 'past state a.a1');
  //   assert.strictEqual(mappingFn('a.a1', 'a.a1.a2'), 'past state a.a1.a2');
  // });
  // it('should return null if previous state is superstate of new state', () => {
  //   let mappingFn = mapOnExit({
  //     'a': 'past state a',
  //     'a.a1': 'past state a.a1',
  //     'b': 'past state b'
  //   });
  //   assert.strictEqual(mappingFn('a.a1', 'a'), null);
  //   assert.strictEqual(mappingFn('a.a1.a2', 'a.a1'), null);
  //   assert.strictEqual(mappingFn('a', 'a'), null);
  //   assert.strictEqual(mappingFn('a.a1', 'a.a1'), null);
  // });
});
