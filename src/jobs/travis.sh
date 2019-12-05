#!/bin/bash
deploy_from_master() {
  if [ $TRAVIS_BRANCH == "master" ]; then
    echo "'master' branch detected, starting deployment step"
    ./src/jobs/deploy.sh production
  else
    echo "'$TRAVIS_BRANCH' branch detected, skipping deployment step"
  fi
}

deploy_from_master
