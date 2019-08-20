"use strict";

module.exports = (state = {
  directory: `/`,
  state: `BOOTSTRAPPING`
}, action) => {
  switch (action.type) {
    case `SET_PROGRAM`:
      return Object.assign({}, action.payload);

    case `SET_PROGRAM_EXTENSIONS`:
      return Object.assign({}, state, {
        extensions: action.payload
      });

    case `SET_PROGRAM_STATUS`:
      return Object.assign({}, state, {
        status: `BOOTSTRAP_FINISHED`
      });

    default:
      return state;
  }
};
//# sourceMappingURL=program.js.map