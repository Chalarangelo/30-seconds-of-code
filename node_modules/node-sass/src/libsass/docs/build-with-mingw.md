## Building LibSass with MingGW (makefiles)

First grab the latest [MinGW for windows][1] installer. Once it is installed, you can click on continue or open the Installation Manager via `bin\mingw-get.exe`.

You need to have the following components installed:
![](https://cloud.githubusercontent.com/assets/282293/5525466/947bf396-89e6-11e4-841d-4aa916f14de1.png)

Next we need to install [git for windows][2]. You probably want to check the option to add it to the global path, but you do not need to install the unix tools.

If you want to run the spec test-suite you also need [ruby][3] and a few gems available. Grab the [latest installer][3] and make sure to add it the global path. Then install the missing gems:

```bash
gem install minitest
```

### Mount the mingw root directory

As mentioned in the [MinGW Getting Started](http://www.mingw.org/wiki/Getting_Started#toc5) guide, you should edit `C:\MinGW\msys\1.0\etc\fstab` to contain the following line:

```
C:\MinGW   /mingw
```

### Starting a "MingGW" console

Create a batch file with this content:
```bat
@echo off
set PATH=C:\MinGW\bin;%PATH%
REM only needed if not already available
set PATH=%PROGRAMFILES%\git\bin;%PATH%
REM C:\MinGW\msys\1.0\msys.bat
cmd
```

Execute it and make sure these commands can be called: `git`, `mingw32-make`, `rm` and `gcc`! Once this is all set, you should be ready to compile `libsass`!

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

```bat
set BUILD="shared"
```

### Compile the library
```bash
mingw32-make -C libsass
```

### Results can be found in
```bash
$ ls libsass/lib
libsass.a  libsass.dll  libsass.so
```

### Run the spec test-suite
```bash
mingw32-make -C libsass test_build
```

## Building via MingGW 64bit (makefiles)
Building libass to dll on window 64bit.

Download [MinGW64 for windows7 64bit](http://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/4.9.2/threads-win32/seh/x86_64-4.9.2-release-win32-seh-rt_v3-rev0.7z/download) and unzip to "C:\mingw64".

Create a batch file with this content:

```bat
@echo off
set PATH=C:\mingw64\bin;%PATH%
set CC=gcc
REM only needed if not already available
set PATH=%PROGRAMFILES%\Git\bin;%PATH%
REM C:\MinGW\msys\1.0\msys.bat
cmd
```

By default, mingw64 dll will depends on "​m​i​n​g​w​m​1​0​.​d​l​l​、​ ​l​i​b​g​c​c​_​s​_​d​w​2​-​1​.​d​l​l​", we can modify Makefile to fix this:(add "-static")

``` bash
lib/libsass.dll: $(COBJECTS) $(OBJECTS) $(RCOBJECTS)
	$(MKDIR) lib
	$(CXX) -shared $(LDFLAGS) -o $@ $(COBJECTS) $(OBJECTS) $(RCOBJECTS) $(LDLIBS) -s -static -Wl,--subsystem,windows,--out-implib,lib/libsass.a
```

Compile the library

```bash
mingw32-make -C libsass
```

By the way, if you are using java jna, [JNAerator](http://jnaerator.googlecode.com/) is a good tool.

[1]: http://sourceforge.net/projects/mingw/files/latest/download?source=files
[2]: https://msysgit.github.io/
[3]: http://rubyinstaller.org/
