#!/bin/bash
prepare_cache_key() {
  mkdir -p .build
  echo "const cacheKey = '"$(date +%s%N)"';export default cacheKey;" > "./.build/cacheKey.js"
}

prepare_cache_key
