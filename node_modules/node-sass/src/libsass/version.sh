if test "x$LIBSASS_VERSION" = "x"; then
  LIBSASS_VERSION=`git describe --abbrev=4 --dirty --always --tags 2>/dev/null`
fi
if test "x$LIBSASS_VERSION" = "x"; then
  LIBSASS_VERSION=`cat VERSION 2>/dev/null`
fi
if test "x$LIBSASS_VERSION" = "x"; then
  LIBSASS_VERSION="[na]"
fi
echo $LIBSASS_VERSION
