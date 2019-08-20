var lockFile = require('../../lockfile.js')

lockFile.lockSync('never-forget')

throw new Error('waaaaaaaaa')
