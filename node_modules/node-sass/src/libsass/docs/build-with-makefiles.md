### Get the sources
```bash
# using git is preferred
git clone https://github.com/sass/libsass.git
# only needed for sassc and/or testsuite
git clone https://github.com/sass/sassc.git libsass/sassc
git clone https://github.com/sass/sass-spec.git libsass/sass-spec
```

### Decide for static or shared library

`libsass` can be built and linked as a `static` or as a `shared` library. The default is `static`. To change it you can set the `BUILD` environment variable:

```bash
export BUILD="shared"
```

Alternatively you can also define it directly when calling make:

```bash
BUILD="shared" make ...
```

### Compile the library
```bash
make -C libsass -j5
```

### Results can be found in
```bash
$ ls libsass/lib
libsass.a libsass.so
```

### Install onto the system

We recommend to use [autotools to install](build-with-autotools.md) libsass onto the
system, since that brings all the benefits of using libtools as the main install method.
If you still want to install libsass via the makefile, you need to make sure that gnu
`install` utility (or compatible) is installed on your system.
```bash
yum install coreutils # RedHat Linux
emerge -a coreutils # Gentoo Linux
pkgin install coreutils # SmartOS
```

You can set the install location by setting `PREFIX`
```bash
PREFIX="/opt/local" make install
```


### Compling sassc

```bash
# Let build know library location
export SASS_LIBSASS_PATH="`pwd`/libsass"
# Invokes the sassc makefile
make -C libsass -j5 sassc
```

### Run the spec test-suite

```bash
# needs ruby available
# also gem install minitest
make -C libsass -j5 test_build
```
