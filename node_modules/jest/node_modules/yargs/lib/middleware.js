'use strict'

// hoisted due to circular dependency on command.
module.exports = {
  applyMiddleware,
  commandMiddlewareFactory,
  globalMiddlewareFactory
}
const isPromise = require('./is-promise')
const argsert = require('./argsert')

function globalMiddlewareFactory (globalMiddleware, context) {
  return function (callback, applyBeforeValidation = false) {
    argsert('<array|function> [boolean]', [callback, applyBeforeValidation], arguments.length)
    if (Array.isArray(callback)) {
      for (let i = 0; i < callback.length; i++) {
        if (typeof callback[i] !== 'function') {
          throw Error('middleware must be a function')
        }
        callback[i].applyBeforeValidation = applyBeforeValidation
      }
      Array.prototype.push.apply(globalMiddleware, callback)
    } else if (typeof callback === 'function') {
      callback.applyBeforeValidation = applyBeforeValidation
      globalMiddleware.push(callback)
    }
    return context
  }
}

function commandMiddlewareFactory (commandMiddleware) {
  if (!commandMiddleware) return []
  return commandMiddleware.map(middleware => {
    middleware.applyBeforeValidation = false
    return middleware
  })
}

function applyMiddleware (argv, yargs, middlewares, beforeValidation) {
  const beforeValidationError = new Error('middleware cannot return a promise when applyBeforeValidation is true')
  return middlewares
    .reduce((accumulation, middleware) => {
      if (middleware.applyBeforeValidation !== beforeValidation &&
          !isPromise(accumulation)) {
        return accumulation
      }

      if (isPromise(accumulation)) {
        return accumulation
          .then(initialObj =>
            Promise.all([initialObj, middleware(initialObj, yargs)])
          )
          .then(([initialObj, middlewareObj]) =>
            Object.assign(initialObj, middlewareObj)
          )
      } else {
        const result = middleware(argv, yargs)
        if (beforeValidation && isPromise(result)) throw beforeValidationError

        return isPromise(result)
          ? result.then(middlewareObj => Object.assign(accumulation, middlewareObj))
          : Object.assign(accumulation, result)
      }
    }, argv)
}
