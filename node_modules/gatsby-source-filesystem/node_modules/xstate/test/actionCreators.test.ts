import * as actions from '../src/actions';
import { assert } from 'chai';

const { actionTypes } = actions;

describe('action creators', () => {
  ['start', 'stop'].forEach(actionKey => {
    describe(`${actionKey}()`, () => {
      it('should accept a string action', () => {
        const action = actions[actionKey]('test');
        assert.equal(action.type, actionTypes[actionKey]);
        assert.deepEqual(action.data, {
          type: 'test'
        });
      });

      it('should accept an action object', () => {
        const action = actions[actionKey]({ type: 'test', foo: 'bar' });
        assert.equal(action.type, actionTypes[actionKey]);
        assert.deepEqual(action.data, {
          type: 'test',
          foo: 'bar'
        });
      });
    });
  });

  describe('send()', () => {
    it('should accept a string event', () => {
      const action = actions.send('foo');
      assert.deepEqual(action, {
        type: actionTypes.send,
        event: { type: 'foo' },
        delay: undefined,
        id: 'foo'
      });
    });

    it('should accept an event object', () => {
      const action = actions.send({ type: 'foo', bar: 'baz' });
      assert.deepEqual(action, {
        type: actionTypes.send,
        event: { type: 'foo', bar: 'baz' },
        delay: undefined,
        id: 'foo'
      });
    });

    it('should accept an id option', () => {
      const action = actions.send('foo', { id: 'foo-id' });
      assert.deepEqual(action, {
        type: actionTypes.send,
        event: { type: 'foo' },
        delay: undefined,
        id: 'foo-id'
      });
    });

    it('should accept a delay option', () => {
      const action = actions.send('foo', { delay: 1000 });
      assert.deepEqual(action, {
        type: actionTypes.send,
        event: { type: 'foo' },
        delay: 1000,
        id: 'foo'
      });
    });
  });
});
