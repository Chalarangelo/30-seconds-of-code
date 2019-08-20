import { assert } from 'chai';
import { matchesState } from '../src/index';

describe('matchesState()', () => {
  it('should return true if two states are equivalent', () => {
    assert.ok(matchesState('a', 'a'));

    assert.ok(matchesState('b.b1', 'b.b1'));
  });

  it('should return true if two state values are equivalent', () => {
    assert.ok(matchesState({ a: 'b' }, { a: 'b' }));
    assert.ok(matchesState({ a: { b: 'c' } }, { a: { b: 'c' } }));
  });

  it('should return true if two parallel states are equivalent', () => {
    assert.ok(
      matchesState(
        { a: { b1: 'foo', b2: 'bar' } },
        { a: { b1: 'foo', b2: 'bar' } }
      )
    );

    assert.ok(
      matchesState(
        { a: { b1: 'foo', b2: 'bar' }, b: { b3: 'baz', b4: 'quo' } },
        { a: { b1: 'foo', b2: 'bar' }, b: { b3: 'baz', b4: 'quo' } }
      )
    );

    assert.ok(matchesState({ a: 'foo', b: 'bar' }, { a: 'foo', b: 'bar' }));
  });

  it('should return true if a state is a substate of a superstate', () => {
    assert.ok(matchesState('b', 'b.b1'));

    assert.ok(matchesState('foo.bar', 'foo.bar.baz.quo'));
  });

  it('should return true if a state value is a substate of a superstate value', () => {
    assert.ok(matchesState('b', { b: 'b1' }));

    assert.ok(matchesState({ foo: 'bar' }, { foo: { bar: { baz: 'quo' } } }));
  });

  it('should return true if a parallel state value is a substate of a superstate value', () => {
    assert.ok(matchesState('b', { b: 'b1', c: 'c1' }));

    assert.ok(
      matchesState(
        { foo: 'bar', fooAgain: 'barAgain' },
        { foo: { bar: { baz: 'quo' } }, fooAgain: { barAgain: 'baz' } }
      )
    );
  });

  it('should return false if two states are not equivalent', () => {
    assert.ok(!matchesState('a', 'b'));

    assert.ok(!matchesState('a.a1', 'b.b1'));
  });

  it('should return false if parent state is more specific than child state', () => {
    assert.ok(!matchesState('a.b.c', 'a.b'));

    assert.ok(!matchesState({ a: { b: { c: 'd' } } }, { a: 'b' }));
  });

  it('should return false if two state values are not equivalent', () => {
    assert.ok(!matchesState({ a: 'a1' }, { b: 'b1' }));
  });

  it('should return false if a state is not a substate of a superstate', () => {
    assert.ok(!matchesState('a', 'b.b1'));

    assert.ok(!matchesState('foo.false.baz', 'foo.bar.baz.quo'));
  });

  it('should return false if a state value is not a substate of a superstate value', () => {
    assert.ok(!matchesState('a', { b: 'b1' }));

    assert.ok(
      !matchesState({ foo: { false: 'baz' } }, { foo: { bar: { baz: 'quo' } } })
    );
  });

  it('should mix/match string state values and object state values', () => {
    assert.ok(matchesState('a.b.c', { a: { b: 'c' } }));
  });
});
