import { Machine } from '../src/index';
import { assert } from 'chai';

describe('local transitions', () => {
  const wordMachine = Machine({
    key: 'word',
    parallel: true,
    states: {
      direction: {
        initial: 'left',
        onEntry: 'ENTER_DIRECTION',
        onExit: 'EXIT_DIRECTION',
        states: {
          left: {},
          right: {},
          center: {},
          justify: {}
        },
        on: {
          // internal transitions
          LEFT_CLICK: '.left',
          RIGHT_CLICK: '.right',
          CENTER_CLICK: '.center',
          JUSTIFY_CLICK: '.justify',
          RESET: 'direction', // explicit self-transition
          RESET_TO_CENTER: 'direction.center'
        }
      }
    }
  });

  const topLevelMachine = Machine({
    initial: 'Hidden',
    on: {
      CLICKED_CLOSE: '.Hidden'
    },
    states: {
      Hidden: {
        on: {
          PUBLISH_FAILURE: 'Failure'
        }
      },
      Failure: {}
    }
  });

  it('parent state should enter child state without re-entering self', () => {
    const nextState = wordMachine.transition(
      wordMachine.initialState,
      'RIGHT_CLICK'
    );

    assert.deepEqual(nextState.value, { direction: 'right' });
    assert.lengthOf(
      nextState.actions,
      0,
      'should not have onEntry or onExit actions'
    );
  });

  it('parent state should only exit/reenter if there is an explicit self-transition', () => {
    const resetState = wordMachine.transition('direction.center', 'RESET');

    assert.deepEqual(resetState.value, { direction: 'left' });
    assert.deepEqual(resetState.actions, ['EXIT_DIRECTION', 'ENTER_DIRECTION']);
  });

  it('parent state should only exit/reenter if there is an explicit self-transition (to child)', () => {
    const resetState = wordMachine.transition(
      'direction.right',
      'RESET_TO_CENTER'
    );

    assert.deepEqual(resetState.value, { direction: 'center' });
    assert.deepEqual(resetState.actions, ['EXIT_DIRECTION', 'ENTER_DIRECTION']);
  });

  it('should listen to events declared at top state', () => {
    const actualState = topLevelMachine.transition('Failure', 'CLICKED_CLOSE');

    assert.deepEqual(actualState.value, 'Hidden');
  });
});
