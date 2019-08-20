'use strict';

var ES = require('../').ES2015;

var ops = require('../operations/2015');

var expectedMissing = ['Construct', 'SetIntegrityLevel', 'TestIntegrityLevel', 'CreateArrayFromList', 'CreateListFromArrayLike', 'OrdinaryHasInstance', 'CreateListIterator', 'RegExpBuiltinExec', 'IsPromise', 'NormalCompletion'];

require('./tests').es2015(ES, ops, expectedMissing);
