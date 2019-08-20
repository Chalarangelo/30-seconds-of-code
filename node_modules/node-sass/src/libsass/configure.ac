#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_PREREQ([2.61])

AC_INIT([libsass], m4_esyscmd_s([./version.sh]), [support@moovweb.com])
AC_CONFIG_SRCDIR([src/ast.hpp])
AC_CONFIG_MACRO_DIR([m4])
AC_CONFIG_HEADERS([src/config.h])
AC_CONFIG_FILES([include/sass/version.h])
AC_CONFIG_AUX_DIR([script])

# These are flags passed to automake
# Though they look like gcc flags!
AM_INIT_AUTOMAKE([foreign parallel-tests -Wall])
m4_ifdef([AM_SILENT_RULES], [AM_SILENT_RULES([no])])

# Checks for programs.
AC_PROG_CC
AC_PROG_CXX
AC_LANG_PUSH([C])
AC_LANG_PUSH([C++])
AC_GNU_SOURCE
# Check fails on Travis, but it works fine
# AX_CXX_COMPILE_STDCXX_11([ext],[optional])
AC_CHECK_TOOL([AR], [ar], [false])
AC_CHECK_TOOL([DLLTOOL], [dlltool], [false])
AC_CHECK_TOOL([DLLWRAP], [dllwrap], [false])
AC_CHECK_TOOL([WINDRES], [windres], [false])
m4_ifdef([AM_PROG_AR], [AM_PROG_AR])
LT_INIT([dlopen])

# Checks for header files.
AC_CHECK_HEADERS([unistd.h])

# Checks for typedefs, structures, and compiler characteristics.
AC_TYPE_SIZE_T

# Checks for library functions.
AC_FUNC_MALLOC
AC_CHECK_FUNCS([floor getcwd strtol])

# Checks for testing.
AC_ARG_ENABLE(tests, AS_HELP_STRING([--enable-tests], [enable testing the build]),
              [enable_tests="$enableval"], [enable_tests=no])

AS_CASE([$host], [*-*-mingw*], [is_mingw32=yes], [is_mingw32=no])
AM_CONDITIONAL(COMPILER_IS_MINGW32, test "x$is_mingw32" = "xyes")

dnl The dlopen() function is in the C library for *BSD and in
dnl libdl on GLIBC-based systems
if test "x$is_mingw32" != "xyes"; then
  AC_SEARCH_LIBS([dlopen], [dl dld], [], [
    AC_MSG_ERROR([unable to find the dlopen() function])
  ])
fi

if test "x$enable_tests" = "xyes"; then
  AC_PROG_CC
  AC_PROG_AWK
  # test need minitest gem
  AC_PATH_PROG(RUBY, [ruby])
  AC_PATH_PROG(TAPOUT, [tapout])
  AC_REQUIRE_AUX_FILE([tap-driver])
  AC_REQUIRE_AUX_FILE([tap-runner])
  AC_ARG_WITH(sassc-dir,
              AS_HELP_STRING([--with-sassc-dir=<dir>], [specify directory of sassc sources for testing (default: sassc)]),
              [sassc_dir="$withval"], [sassc_dir="sassc"])
  AC_CHECK_FILE([$sassc_dir/sassc.c], [], [
    AC_MSG_ERROR([Unable to find sassc directory.
You must clone the sassc repository in this directory or specify
the --with-sassc-dir=<dir> argument.
])
  ])
  SASS_SASSC_PATH=$sassc_dir
  AC_SUBST(SASS_SASSC_PATH)

  AC_ARG_WITH(sass-spec-dir,
              AS_HELP_STRING([--with-sass-spec-dir=<dir>], [specify directory of sass-spec for testing (default: sass-spec)]),
              [sass_spec_dir="$withval"], [sass_spec_dir="sass-spec"])
  AC_CHECK_FILE([$sass_spec_dir/sass-spec.rb], [], [
    AC_MSG_ERROR([Unable to find sass-spec directory.
You must clone the sass-spec repository in this directory or specify
the --with-sass-spec-dir=<dir> argument.
])
  ])
  # Automake doesn't like its tests in an absolute path, so we make it relative.
  case $sass_spec_dir in
    /*)
      SASS_SPEC_PATH=`$RUBY -e "require 'pathname'; puts Pathname.new('$sass_spec_dir').relative_path_from(Pathname.new('$PWD')).to_s"`
      ;;
    *)
      SASS_SPEC_PATH="$sass_spec_dir"
      ;;
  esac
  AC_SUBST(SASS_SPEC_PATH)
else
  # we do not really need these paths for non test build
  # but automake may error if we do not define them here
  SASS_SPEC_PATH=sass-spec
  SASS_SASSC_PATH=sassc
  AC_SUBST(SASS_SPEC_PATH)
  AC_SUBST(SASS_SASSC_PATH)
fi

AM_CONDITIONAL(ENABLE_TESTS, test "x$enable_tests" = "xyes")

AC_ARG_ENABLE([coverage],
  [AS_HELP_STRING([--enable-coverage],
    [enable coverage report for test suite])],
    [enable_cov=$enableval],
    [enable_cov=no])

if test "x$enable_cov" = "xyes"; then

    AC_CHECK_PROG(GCOV, gcov, gcov)

    # Remove all optimization flags from C[XX]FLAGS
    changequote({,})
    CFLAGS=`echo "$CFLAGS -O1 -fno-omit-frame-pointer" | $SED -e 's/-O[0-9]*//g'`
    CXXFLAGS=`echo "$CXXFLAGS -O1 -fno-omit-frame-pointer" | $SED -e 's/-O[0-9]*//g'`
    changequote([,])

    AC_SUBST(GCOV)
fi

AM_CONDITIONAL(ENABLE_COVERAGE, test "x$enable_cov" = "xyes")

AC_SUBST(PACKAGE_VERSION)

AC_MSG_NOTICE([Building libsass ($VERSION)])

AC_CONFIG_FILES([GNUmakefile src/GNUmakefile src/support/libsass.pc])
AC_OUTPUT
