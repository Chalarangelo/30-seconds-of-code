To install LibSass, make sure the OS X build tools are installed:

    xcode-select --install

## Homebrew

To install homebrew, see [http://brew.sh](http://brew.sh)

    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

You can install the latest version of LibSass quite easily with brew.

    brew install --HEAD libsass

To update this, do:

    brew reinstall --HEAD libsass

Brew will build static and shared libraries, and a `libsass.pc` file in `/usr/local/lib/pkgconfig`.

To use `libsass.pc`, make sure this path is in your `PKG_CONFIG_PATH`

    export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig

## Manually

See the linux instructions [Building-with-autotools](build-with-autotools.md) or [Building-with-makefiles](build-with-makefiles.md)
