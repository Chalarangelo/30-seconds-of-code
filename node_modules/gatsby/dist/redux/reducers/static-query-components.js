"use strict";

module.exports = (state = new Map(), action) => {
  switch (action.type) {
    case `DELETE_CACHE`:
      return new Map();

    case `REPLACE_STATIC_QUERY`:
      return state.set(action.payload.id, action.payload);

    case `REMOVE_STATIC_QUERY`:
      state.delete(action.payload);
      return state;
  }

  return state;
};
//# sourceMappingURL=static-query-components.js.map