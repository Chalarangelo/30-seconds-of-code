#!/bin/bash
if [ "x$COVERAGE" == "xyes" ]; then
  pip2 install --user gcovr
  pip2 install --user cpp-coveralls
else
  echo "no dependencies to install"
fi

if [ "x$AUTOTOOLS" == "xyes" ]; then
  AUTOTOOLS=yes

  if [ "$TRAVIS_OS_NAME" == "linux" ]; then
    sudo add-apt-repository -y ppa:rbose-debianizer/automake &> /dev/null
    sudo apt-get -qq update
    sudo apt-get -qq install automake
  fi

fi

exit 0
