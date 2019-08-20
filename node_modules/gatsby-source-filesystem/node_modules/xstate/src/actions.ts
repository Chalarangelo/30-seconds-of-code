import {
  Action,
  Event,
  EventType,
  EventObject,
  ActivityAction,
  SendAction,
  SendActionOptions,
  CancelAction,
  ActionObject,
  ActionType
} from './types';
import { getEventType } from './utils';

const PREFIX = 'xstate';

// xstate-specific action types
export const actionTypes = {
  start: `${PREFIX}.start`,
  stop: `${PREFIX}.stop`,
  raise: `${PREFIX}.raise`,
  send: `${PREFIX}.send`,
  cancel: `${PREFIX}.cancel`,
  null: `${PREFIX}.null`
};

const createActivityAction = (actionType: string) => (
  activity: ActionType | ActionObject
): ActivityAction => {
  const data =
    typeof activity === 'string' || typeof activity === 'number'
      ? { type: activity }
      : activity;
  return {
    type: actionType,
    activity: getEventType(activity),
    data
  };
};

export const toEventObject = (event: Event): EventObject => {
  if (typeof event === 'string' || typeof event === 'number') {
    return { type: event };
  }

  return event;
};

export const toActionObject = (action: Action): ActionObject => {
  let actionObject: ActionObject;

  if (typeof action === 'string' || typeof action === 'number') {
    actionObject = { type: action };
  } else if (typeof action === 'function') {
    actionObject = { type: action.name };
  } else {
    return action;
  }

  Object.defineProperty(actionObject, 'toString', {
    value: () => actionObject.type
  });

  return actionObject;
};

export const toActionObjects = (
  action: Action | Action[] | undefined
): ActionObject[] => {
  if (!action) {
    return [];
  }

  const actions = Array.isArray(action) ? action : [action];

  return actions.map(toActionObject);
};

export const raise = (eventType: EventType): EventObject => ({
  type: actionTypes.raise,
  event: eventType
});

export const send = (event: Event, options?: SendActionOptions): SendAction => {
  return {
    type: actionTypes.send,
    event: toEventObject(event),
    delay: options ? options.delay : undefined,
    id: options && options.id !== undefined ? options.id : getEventType(event)
  };
};

export const cancel = (sendId: string | number): CancelAction => {
  return {
    type: actionTypes.cancel,
    sendId
  };
};

export const start = createActivityAction(actionTypes.start);
export const stop = createActivityAction(actionTypes.stop);
