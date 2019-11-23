#!/bin/bash
prepare_env() {
  echo "Preparing environment..."
  mkdir -p .build
  echo "const env = '"$1"';export default env;" > "./.build/env.js"
}

prepare_env $1
