### Get the sources
```bash
# using git is preferred
git clone https://github.com/sass/libsass.git
# only needed for sassc and/or testsuite
git clone https://github.com/sass/sassc.git libsass/sassc
git clone https://github.com/sass/sass-spec.git libsass/sass-spec
```

### Prerequisites

In order to run autotools you need a few tools installed on your system.
```bash
yum install automake libtool # RedHat Linux
emerge -a automake libtool # Gentoo Linux
pkgin install automake libtool # SmartOS
```


### Create configure script
```bash
cd libsass
autoreconf --force --install
cd ..
```

### Create custom makefiles
```bash
cd libsass
./configure \
  --disable-tests \
  --disable-shared \
  --prefix=/usr
cd ..
```

### Build the library
```bash
make -C libsass -j5
```

### Install the library
The library will be installed to the location given as `prefix` to `configure`. This is standard behavior for autotools and not `libsass` specific.
```bash
make -C libsass -j5 install
```

### Configure options
The `configure` script is created by autotools. To get an overview of available options you can call `./configure --help`. When you execute this script, it will create specific makefiles, which you then use via the regular make command.

There are some `libsass` specific options:

```
Optional Features:
  --enable-tests              enable testing the build
  --enable-coverage           enable coverage report for test suite
  --enable-shared             build shared libraries [default=yes]
  --enable-static             build static libraries [default=yes]

Optional Packages:
  --with-sassc-dir=<dir>      specify directory of sassc sources for
                              testing (default: sassc)
  --with-sass-spec-dir=<dir>  specify directory of sass-spec for testing
                              (default: sass-spec)
```

### Build sassc and run spec test-suite

```bash
cd libsass
autoreconf --force --install
./configure \
  --enable-tests \
  --enable-shared \
  --prefix=/usr
make -j5 test_build
cd ..
```
