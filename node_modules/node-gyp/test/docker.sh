#!/bin/bash

#set -e

test_node_versions="0.8.28 0.10.40 0.12.7 4.3.0 5.6.0"
test_iojs_versions="1.8.4 2.4.0 3.3.0"

myuid=$(id -u)
mygid=$(id -g)
__dirname="$(CDPATH= cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
dot_node_gyp=${__dirname}/.node-gyp/

# borrows from https://github.com/rvagg/dnt/

# Simple setup function for a container:
#  setup_container(image id, base image, commands to run to set up)
setup_container() {
  local container_id="$1"
  local base_container="$2"
  local run_cmd="$3"

  # Does this image exist? If yes, ignore
  docker inspect "$container_id" &> /dev/null
  if [[ $? -eq 0 ]]; then
    echo "Found existing container [$container_id]"
  else
    # No such image, so make it
    echo "Did not find container [$container_id], creating..."
    docker run -i $base_container /bin/bash -c "$run_cmd"
    sleep 2
    docker commit $(docker ps -l -q) $container_id
  fi
}

# Run tests inside each of the versioned containers, copy cwd into npm's copy of node-gyp
# so it'll be invoked by npm when a compile is needed
#  run_tests(version, test-commands)
run_tests() {
  local version="$1"
  local run_cmd="$2"

  run_cmd="rsync -aAXx --delete --exclude .git --exclude build /node-gyp-src/ /usr/lib/node_modules/npm/node_modules/node-gyp/;
    /bin/su -s /bin/bash node-gyp -c 'cd && ${run_cmd}'"

  rm -rf $dot_node_gyp
  mkdir $dot_node_gyp

  docker run \
    --rm -i \
    -v ~/.npm/:/node-gyp/.npm/ \
    -v ${dot_node_gyp}:/node-gyp/.node-gyp/ \
    -v $(pwd):/node-gyp-src/:ro \
    node-gyp-test/${version} /bin/bash -c "${run_cmd}"
}

# A base image with build tools and a user account
setup_container "node-gyp-test/base" "ubuntu:14.04" "
  adduser --gecos node-gyp --home /node-gyp/ --disabled-login node-gyp --uid $myuid &&
  echo "node-gyp:node-gyp" | chpasswd &&
  apt-get update &&
  apt-get install -y build-essential python git rsync curl
"

# An image on top of the base containing clones of repos we want to use for testing
setup_container "node-gyp-test/clones" "node-gyp-test/base" "
  cd /node-gyp/ && git clone https://github.com/justmoon/node-bignum.git &&
  cd /node-gyp/ && git clone https://github.com/bnoordhuis/node-buffertools.git &&
  chown -R node-gyp.node-gyp /node-gyp/
"

# An image for each of the node versions we want to test with that version installed and the latest npm
for v in $test_node_versions; do
  setup_container "node-gyp-test/${v}" "node-gyp-test/clones" "
    curl -sL https://nodejs.org/dist/v${v}/node-v${v}-linux-x64.tar.gz | tar -zxv --strip-components=1 -C /usr/ &&
    npm install npm@latest -g &&
    node -v && npm -v
  "
done

# An image for each of the io.js versions we want to test with that version installed and the latest npm
for v in $test_iojs_versions; do
  setup_container "node-gyp-test/${v}" "node-gyp-test/clones" "
    curl -sL https://iojs.org/dist/v${v}/iojs-v${v}-linux-x64.tar.gz | tar -zxv --strip-components=1 -C /usr/ &&
    npm install npm@latest -g &&
    node -v && npm -v
  "
done

# Run the tests for all of the test images we've created,
# we should see node-gyp doing its download, configure and run thing
# _NOTE: bignum doesn't compile on 0.8 currently so it'll fail for that version only_
for v in $test_node_versions $test_iojs_versions; do
  run_tests $v "
    cd node-buffertools && npm install --loglevel=info && npm test && cd
  "
  # removed for now, too noisy: cd node-bignum && npm install --loglevel=info && npm test
done

# Test use of --target=x.y.z to compile against alternate versions
test_download_node_version() {
  local run_with_ver="$1"
  local expected_dir="$2"
  local expected_ver="$3"
  run_tests $run_with_ver "cd node-buffertools && npm install --loglevel=info --target=${expected_ver}"
  local node_ver=$(cat "${dot_node_gyp}${expected_dir}/node_version.h" | grep '#define NODE_\w*_VERSION [0-9]*$')
  node_ver=$(echo $node_ver | sed 's/#define NODE_[A-Z]*_VERSION //g' | sed 's/ /./g')
  if [ "X$(echo $node_ver)" != "X${expected_ver}" ]; then
    echo "Did not download v${expected_ver} using --target, instead got: $(echo $node_ver)"
    exit 1
  fi
  echo "Verified correct download of [v${node_ver}]"
}

test_download_node_version "0.12.7" "0.10.30/src" "0.10.30"
test_download_node_version "3.3.0" "iojs-1.8.4/src" "1.8.4"
# should download the headers file
test_download_node_version "3.3.0" "iojs-3.3.0/include/node" "3.3.0"
test_download_node_version "4.3.0" "4.3.0/include/node" "4.3.0"
test_download_node_version "5.6.0" "5.6.0/include/node" "5.6.0"

# TODO: test --dist-url by starting up a localhost server and serving up tarballs

# testing --dist-url, using simple-proxy.js to make localhost work as a distribution
# point for tarballs
# we can test whether it uses the proxy because after 2 connections the proxy will
# die and therefore should not be running at the end of the test, `nc` can tell us this
run_tests "3.3.0" "
  (node /node-gyp-src/test/simple-proxy.js 8080 /foobar/ https://iojs.org/dist/ &) &&
  cd node-buffertools &&
  /node-gyp-src/bin/node-gyp.js --loglevel=info --dist-url=http://localhost:8080/foobar/ rebuild &&
  nc -z localhost 8080 && echo -e \"\\n\\n\\033[31mFAILED TO USE LOCAL PROXY\\033[39m\\n\\n\"
"

# REMOVE after next semver-major
run_tests "3.3.0" "
  (node /node-gyp-src/test/simple-proxy.js 8080 /doobar/ https://iojs.org/dist/ &) &&
  cd node-buffertools &&
  NVM_IOJS_ORG_MIRROR=http://localhost:8080/doobar/ /node-gyp-src/bin/node-gyp.js --loglevel=info rebuild &&
  nc -z localhost 8080 && echo -e \"\\n\\n\\033[31mFAILED TO USE LOCAL PROXY\\033[39m\\n\\n\"
"

# REMOVE after next semver-major
run_tests "0.12.7" "
  (node /node-gyp-src/test/simple-proxy.js 8080 /boombar/ https://nodejs.org/dist/ &) &&
  cd node-buffertools &&
  NVM_NODEJS_ORG_MIRROR=http://localhost:8080/boombar/ /node-gyp-src/bin/node-gyp.js --loglevel=info rebuild &&
  nc -z localhost 8080 && echo -e \"\\n\\n\\033[31mFAILED TO USE LOCAL PROXY\\033[39m\\n\\n\"
"

run_tests "3.3.0" "
  (node /node-gyp-src/test/simple-proxy.js 8080 /doobar/ https://iojs.org/dist/ &) &&
  cd node-buffertools &&
  IOJS_ORG_MIRROR=http://localhost:8080/doobar/ /node-gyp-src/bin/node-gyp.js --loglevel=info rebuild &&
  nc -z localhost 8080 && echo -e \"\\n\\n\\033[31mFAILED TO USE LOCAL PROXY\\033[39m\\n\\n\"
"

run_tests "0.12.7" "
  (node /node-gyp-src/test/simple-proxy.js 8080 /boombar/ https://nodejs.org/dist/ &) &&
  cd node-buffertools &&
  NODEJS_ORG_MIRROR=http://localhost:8080/boombar/ /node-gyp-src/bin/node-gyp.js --loglevel=info rebuild &&
  nc -z localhost 8080 && echo -e \"\\n\\n\\033[31mFAILED TO USE LOCAL PROXY\\033[39m\\n\\n\"
"

rm -rf $dot_node_gyp
