Here are two ebuilds to compile LibSass and sassc on gentoo linux. If you do not know how to use these ebuilds, you should probably read the gentoo wiki page about [portage overlays](http://wiki.gentoo.org/wiki/Overlay).

## www-misc/libsass/libsass-9999.ebuild
```ebuild
EAPI=4

inherit eutils git-2 autotools

DESCRIPTION="A C/C++ implementation of a Sass compiler."
HOMEPAGE="http://libsass.org/"
EGIT_PROJECT='libsass'
EGIT_REPO_URI="https://github.com/sass/libsass.git"
LICENSE="MIT"
SLOT="0"
KEYWORDS=""
IUSE=""
DEPEND=""
RDEPEND="${DEPEND}"
DEPEND="${DEPEND}"

pkg_pretend() {
    # older gcc is not supported
    local major=$(gcc-major-version)
    local minor=$(gcc-minor-version)
    [[ "${MERGE_TYPE}" != "binary" && ( $major > 4 || ( $major == 4 && $minor &lt; 5 ) ) ]] && \
        die "Sorry, but gcc earlier than 4.5 will not work for LibSass."
}

src_prepare() {
   eautoreconf
}
```

## www-misc/sassc/sassc-9999.ebuild
```ebuild
EAPI=4

inherit eutils git-2 autotools

DESCRIPTION="Command Line Tool for LibSass."
HOMEPAGE="http://libsass.org/"
EGIT_PROJECT='sassc'
EGIT_REPO_URI="https://github.com/sass/sassc.git"
LICENSE="MIT"
SLOT="0"
KEYWORDS=""
IUSE=""
DEPEND="www-misc/libsass"
RDEPEND="${DEPEND}"
DEPEND="${DEPEND}"

src_prepare() {
   eautoreconf
}
```
