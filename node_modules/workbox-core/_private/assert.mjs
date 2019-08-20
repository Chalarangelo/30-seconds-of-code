/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {WorkboxError} from '../_private/WorkboxError.mjs';
import '../_version.mjs';

/*
 * This method returns true if the current context is a service worker.
 */
const isSwEnv = (moduleName) => {
  if (!('ServiceWorkerGlobalScope' in self)) {
    throw new WorkboxError('not-in-sw', {moduleName});
  }
};

/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, {moduleName, className, funcName, paramName}) => {
  if (!Array.isArray(value)) {
    throw new WorkboxError('not-an-array', {
      moduleName,
      className,
      funcName,
      paramName,
    });
  }
};

const hasMethod = (object, expectedMethod,
                   {moduleName, className, funcName, paramName}) => {
  const type = typeof object[expectedMethod];
  if (type !== 'function') {
    throw new WorkboxError('missing-a-method', {paramName, expectedMethod,
      moduleName, className, funcName});
  }
};

const isType = (object, expectedType,
                {moduleName, className, funcName, paramName}) => {
  if (typeof object !== expectedType) {
    throw new WorkboxError('incorrect-type', {paramName, expectedType,
      moduleName, className, funcName});
  }
};

const isInstance = (object, expectedClass,
                    {moduleName, className, funcName,
                      paramName, isReturnValueProblem}) => {
  if (!(object instanceof expectedClass)) {
    throw new WorkboxError('incorrect-class', {paramName, expectedClass,
      moduleName, className, funcName, isReturnValueProblem});
  }
};

const isOneOf = (value, validValues, {paramName}) => {
  if (!validValues.includes(value)) {
    throw new WorkboxError('invalid-value', {
      paramName,
      value,
      validValueDescription: `Valid values are ${JSON.stringify(validValues)}.`,
    });
  }
};

const isArrayOfClass = (value, expectedClass,
  {moduleName, className, funcName, paramName}) => {
  const error = new WorkboxError('not-array-of-class', {
    value, expectedClass,
    moduleName, className, funcName, paramName,
  });
  if (!Array.isArray(value)) {
    throw error;
  }

  for (let item of value) {
    if (!(item instanceof expectedClass)) {
      throw error;
    }
  }
};

const finalAssertExports = process.env.NODE_ENV === 'production' ? null : {
  hasMethod,
  isArray,
  isInstance,
  isOneOf,
  isSwEnv,
  isType,
  isArrayOfClass,
};

export {finalAssertExports as assert};
