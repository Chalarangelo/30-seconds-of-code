# Delegates to `succ` on sucecss or to `fail` on error
# ex: Thing.load 123, iferr cb, (thing) -> ...
iferr = (fail, succ) -> (err, a...) ->
  if err? then fail err
  else succ? a...

# Like iferr, but also catches errors thrown from `succ` and passes to `fail`
tiferr = (fail, succ) -> iferr fail, (a...) ->
  try succ a...
  catch err then fail err

# Delegate to the success function on success, or throw the error otherwise
# ex: Thing.load 123, throwerr (thing) -> ...
throwerr = iferr.bind null, (err) -> throw err

# Prints errors when one is passed, or does nothing otherwise
# ex: thing.save printerr
printerr = iferr (err) -> console.error err.stack or err

module.exports = exports = iferr
exports.iferr = iferr
exports.tiferr = tiferr
exports.throwerr = throwerr
exports.printerr = printerr
