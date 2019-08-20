{ iferr, tiferr, throwerr } = require '../index.coffee'
{ equal: eq, throws } = require 'assert'

invoke_fail = (cb) -> cb new Error 'callback error'
invoke_succ = (cb) -> cb null
throw_error = -> throw new Error 'thrown'

describe 'iferr', ->
  it 'calls the error callback on errors', (done) ->
    invoke_fail iferr(
      (err) ->
        eq err.message, 'callback error'
        do done
      ->
        done new Error 'shouldn\'t call the success callback'
    )

  it 'calls the success callback on success', (done) ->
    invoke_succ iferr(
      -> done new Error 'shouldn\'t call the error callback'
      done
    )

describe 'tiferr', ->
  it 'catches errors in the success callback', (done) ->
    invoke_succ tiferr(
      (err) ->
        eq err.message, 'thrown'
        do done
      throw_error
    )

describe 'throwerr', ->
  it 'throws errors passed to the callback', (done)->
    try invoke_fail throwerr ->
      done 'shouldn\'t call the success callback'
    catch err
      eq err.message, 'callback error'
      do done

  it 'delegates to the success callback otherwise', (done) ->
    invoke_succ throwerr done
