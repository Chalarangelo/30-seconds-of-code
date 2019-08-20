Filing tickets against loglevel
===============================

If you'd like to file a bug or a feature request for loglevel, the best option is to [open an issue on Github](https://github.com/pimterry/loglevel/issues/new).

If you're filing a feature request, please remember:

* Feature requests significantly expanding the scope of loglevel outside the description in [the readme](https://github.com/pimterry/loglevel/blob/master/README.md) will probably be rejected.
* Features that can't be meaningfully implemented in a cross-environment compatible manner won't be implemented.
* Please check the previously opened issues to see if somebody else has suggested it first.
* Consider submitting a pull request to add the feature instead, if you're confident it fits within the above

If you're filing a bug, please remember:

* To provide detailed steps to reproduce the behaviour
* If possible, provide a Jasmine test which reproduces the behaviour
* Please specify the exact details of the environment in which it fails: OS + Environment (i.e. Browser or Node) + version
* Consider submitting a pull request to fix the bug instead

Helping develop loglevel
================================

If you'd like to help develop loglevel further, please submit a pull request! I'm very keen to improve loglevel further, and good pull requests will be enthusiastically merged.

Before submitting a pull request to fix a bug or add a new feature, please check the lists above to ensure it'll be accepted. Browser compatibility is particularly important here; if you add a feature or fix a bug which breaks things on other browsers it will not be merged, no matter how awesome it may be.

To be more specific, before submitting your pull request please ensure:

* You haven't broken the existing test suite in any obvious browsers (at least check latest IE/FF/Chrome - automatic saucelabs tests for this are coming soon too)
* You've added relevant tests for the bug you're fixing/the new feature you're adding/etc, which pass in all the relevant browsers
* JSHint is happy with your new code
* You've updated the API docs (in README.md) to detail any changes you've made to the public interface
* Your change is backward compatible (or you've explicitly said if it's not; this isn't great, but will be considered)
* You haven't changed any files in dist/ (these are auto-generated, and should only be changed on release)

Project structure
-----------------

The core project code is all in lib/loglevel.js, and this should be the only file you need to touch for functional changes themselves.

The released code is in dist/*.js, and should not be touched by anything except releases

The test suite is entirely in test/*.js:

* Every file ending in '-test.js' is a unit test, is written in RequireJS, and should pass in any environment
* global-integration.js and node-integration.js are quick integration smoke tests for node and for browser global usage
* test-helpers.js contains some test utilities
* manual-test.html is a test page which includes the current loglevel build, so you can manually check it works in a given browser

How to make your change and submit it
-------------------------------------

1. Fork loglevel
2. Clone your fork locally
3. Create a branch from master for your change
4. Write some tests in /test for your change, as relevant
5. Make your code changes in /lib/loglevel.js
6. Check your code all passes (run `grunt`) - if you have any issues try running `grunt jasmine:requirejs:src:build` (or a different test build instead of 'requirejs': see the jasmine config in Gruntfile.js) and debugging the generated _SpecRunner.html in a browser
7. Commit your changes
8. Open a pull request back to master in loglevel
