const testsContext = require.context(".", true, /Test\.js$/);
testsContext.keys().forEach(testsContext);
