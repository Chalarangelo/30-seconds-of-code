LibSass - Sass compiler written in C++
======================================

Currently maintained by Marcel Greter ([@mgreter]) and Michael Mifsud ([@xzyfer])  
Originally created by Aaron Leung ([@akhleung]) and Hampton Catlin ([@hcatlin])

[![Unix CI](https://travis-ci.org/sass/libsass.svg?branch=master)](https://travis-ci.org/sass/libsass "Travis CI")
[![Windows CI](https://ci.appveyor.com/api/projects/status/github/sass/libsass?svg=true)](https://ci.appveyor.com/project/sass/libsass/branch/master "Appveyor CI")
[![Coverage Status](https://img.shields.io/coveralls/sass/libsass.svg)](https://coveralls.io/r/sass/libsass?branch=feature%2Ftest-travis-ci-3 "Code coverage of spec tests")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/sass/libsass.svg)](http://isitmaintained.com/project/sass/libsass "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/sass/libsass.svg)](http://isitmaintained.com/project/sass/libsass "Average time to resolve an issue")
[![Bountysource](https://www.bountysource.com/badge/tracker?tracker_id=283068)](https://www.bountysource.com/trackers/283068-libsass?utm_source=283068&utm_medium=shield&utm_campaign=TRACKER_BADGE "Bountysource")
[![Join us](https://libsass-slack.herokuapp.com/badge.svg)](https://libsass-slack.herokuapp.com/ "Slack communication channels")


[LibSass](https://github.com/sass/libsass "LibSass GitHub Project") is just a library!
If you want to use LibSass to compile Sass, you need an implementer. Some
implementations are only bindings into other programming languages. But most also
ship with a command line interface (CLI) you can use directly. There is also
[SassC](https://github.com/sass/sassc), which is the official lightweight
CLI tool built by the same people as LibSass.

### Excerpt of "sanctioned" implementations:

- https://github.com/sass/node-sass (Node.js)
- https://github.com/sass/perl-libsass (Perl)
- https://github.com/sass/libsass-python (Python)
- https://github.com/wellington/go-libsass (Go)
- https://github.com/sass/sassc-ruby (Ruby)
- https://github.com/sass/libsass-net (C#)
- https://github.com/medialize/sass.js (JS)
- https://github.com/bit3/jsass (Java)

This list does not say anything about the quality of either the listed or not listed [implementations](docs/implementations.md)!  
The authors of the listed projects above are just known to work regularly together with LibSass developers.

About
-----

LibSass is a C++ port of the original Ruby Sass CSS compiler with a [C API](docs/api-doc.md).
We coded LibSass with portability and efficiency in mind. You can expect LibSass to be a lot
faster than Ruby Sass and on par or faster than the best alternative CSS compilers around.

Developing
----------

As noted above, the LibSass repository does not contain any binaries or other way to execute
LibSass. Therefore, you need an implementer to develop LibSass. Easiest is to start with
the official [SassC](http://github.com/sass/sassc) CLI wrapper. It is *guaranteed* to compile
with the latest code in LibSass master, since it is also used in the CI process. There is no
limitation here, as you may use any other LibSass implementer to test your LibSass branch!

Testing
-------

Since LibSass is a pure library, tests are run through the [Sass-Spec](https://github.com/sass/sass-spec)
project using the [SassC](http://github.com/sass/sassc) CLI wrapper. To run the tests against LibSass while
developing, you can run `./script/spec`. This will clone SassC and Sass-Spec under the project folder and
then run the Sass-Spec test suite. You may want to update the clones to ensure you have the latest version.
Note that the scripts in the `./script` folder are mainly intended for our CI needs.

Building
--------

To build LibSass you need GCC 4.6+ or Clang/LLVM. If your OS is older, you may need to upgrade
them first (or install clang as an alternative). On Windows, you need MinGW with GCC 4.6+ or VS 2013
Update 4+. It is also possible to build LibSass with Clang/LLVM on Windows with various build chains
and/or command line interpreters.

See the [build docs for further instructions](docs/build.md)!

Compatibility
-------------

Current LibSass 3.4 should be compatible with Sass 3.4. Please refer to the [sass compatibility
page](http://sass-compatibility.github.io/) for a more detailed comparison. But note that there
are still a few incomplete edges which we are aware of. Otherwise LibSass has reached a good level
of stability, thanks to our ever growing [Sass-Spec test suite](https://github.com/sass/sass-spec).

About Sass
----------

Sass is a CSS pre-processor language to add on exciting, new, awesome features to CSS. Sass was
the first language of its kind and by far the most mature and up to date codebase.

Sass was originally conceived of by the co-creator of this library, Hampton Catlin ([@hcatlin]).
Most of the language has been the result of years of work by Natalie Weizenbaum ([@nex3]) and
Chris Eppstein ([@chriseppstein]).

For more information about Sass itself, please visit http://sass-lang.com

Initial development of LibSass by Aaron Leung and Hampton Catlin was supported by [Moovweb](http://www.moovweb.com).

Licensing
---------

Our [MIT license](LICENSE) is designed to be as simple and liberal as possible.

[@hcatlin]: https://github.com/hcatlin
[@akhleung]: https://github.com/akhleung
[@chriseppstein]: https://github.com/chriseppstein
[@nex3]: https://github.com/nex3
[@mgreter]: https://github.com/mgreter
[@xzyfer]: https://github.com/xzyfer
