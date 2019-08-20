// @flow strict

import { type ObjMap } from '../jsutils/ObjMap';

declare function objectValues<T>(obj: ObjMap<T>): Array<T>;

/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/2221
const objectValues =
  Object.values || (obj => Object.keys(obj).map(key => obj[key]));
export default objectValues;
