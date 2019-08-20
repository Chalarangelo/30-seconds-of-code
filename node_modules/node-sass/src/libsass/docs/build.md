`libsass` is only a library and does not do much on its own. You need an implementation that you can use from the [command line][6]. Or some [bindings|Implementations][9] to use it within your favorite programming language. You should be able to get [`sassc`][6] running by following the instructions in this guide.

Before starting, see [setup dev environment](setup-environment.md).

Building on different Operating Systems
--

We try to keep the code as OS independent and standard compliant as possible. Reading files from the file-system has some OS depending code, but will ultimately fall back to a posix compatible implementation. We do use some `C++11` features, but are so far only committed to use `unordered_map`. This means you will need a pretty recent compiler on most systems (gcc 4.5 seems to be the minimum).

### Building on Linux (and other *nix flavors)

Linux is the main target for `libsass` and we support two ways to build `libsass` here. The old plain makefiles should still work on most systems (including MinGW), while the autotools build is preferred if you want to create a [system library] (experimental).

- [Building with makefiles][1]
- [Building with autotools][2]

### Building on Windows (experimental)

Windows build support was added very recently and should be considered experimental. Credits go to @darrenkopp and @am11 for their work on getting `libsass` and `sassc` to compile with visual studio!

- [Building with MinGW][3]
- [Building with Visual Studio][11]

### Building on Max OS X (untested)

Works the same as on linux, but you can also install LibSass via `homebrew`.

- [Building on Mac OS X][10]

### Building a system library (experimental)

Since `libsass` is a library, it makes sense to install it as a shared library on your system. On linux this means creating a `.so` library via autotools. This should work pretty well already, but we are not yet committed to keep the ABI 100% stable. This should be the case once we increase the version number for the library to 1.0.0 or higher. On Windows you should be able get a `dll` by creating a shared build with MinGW. There is currently no target in the MSVC project files to do this.

- [Building shared system library][4]

Compiling with clang instead of gcc
--

To use clang you just need to set the appropriate environment variables:

```bash
export CC=/usr/bin/clang
export CXX=/usr/bin/clang++
```

Running the spec test-suite
--

We constantly and automatically test `libsass` against the official [spec test-suite][5]. To do this we need to have a test-runner (which is written in ruby) and a command-line tool ([`sassc`][6]) to run the tests. Therefore we need to additionally compile `sassc`. To do this, the build files of all three projects need to work together. This may not have the same quality for all build flavors. You definitely need to have ruby (2.1?) installed (version 1.9 seems to cause problems at least on windows). You also need some gems installed:

```bash
ruby -v
gem install minitest
# should be optional
gem install minitap
```

Including the LibSass version
--

There is a function in `libsass` to query the current version. This has to be defined at compile time. We use a C macro for this, which can be defined by calling `g++ -DLIBSASS_VERSION="\"x.y.z.\""`. The two quotes are necessary, since it needs to end up as a valid C string. Normally you do not need to do anything if you use the makefiles or autotools. They will try to fetch the version via git directly. If you only have the sources without the git repo, you can pass the version as an environment variable to `make` or `configure`:

```
export LIBSASS_VERSION="x.y.z."
```

Continuous Integration
--

We use two CI services to automatically test all commits against the latest [spec test-suite][5].

- [LibSass on Travis-CI (linux)][7]
[![Build Status](https://travis-ci.org/sass/libsass.png?branch=master)](https://travis-ci.org/sass/libsass)
- [LibSass on AppVeyor (windows)][8]
[![Build status](https://ci.appveyor.com/api/projects/status/github/sass/libsass?svg=true)](https://ci.appveyor.com/project/mgreter/libsass-513/branch/master)

Why not using CMake?
--

There were some efforts to get `libsass` to compile with CMake, which should make it easier to create build files for linux and windows. Unfortunately this was not completed. But we are certainly open for PRs!

Miscellaneous
--

- [Ebuilds for Gentoo Linux](build-on-gentoo.md)

[1]: build-with-makefiles.md
[2]: build-with-autotools.md
[3]: build-with-mingw.md
[4]: build-shared-library.md
[5]: https://github.com/sass/sass-spec
[6]: https://github.com/sass/sassc
[7]: https://github.com/sass/libsass/blob/master/.travis.yml
[8]: https://github.com/sass/libsass/blob/master/appveyor.yml
[9]: implementations.md
[10]: build-on-darwin.md
[11]: build-with-visual-studio.md
