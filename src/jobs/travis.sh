#!/bin/bash
deploy_from_master() {
  if [ $TRAVIS_EVENT_TYPE != "pull_request" ]; then
    if [ $TRAVIS_BRANCH == "master" ]; then
      echo "'master' branch detected, starting deployment step"
      ./src/jobs/deploy.sh production
    else
      echo "'$TRAVIS_BRANCH' branch detected, skipping deployment step"
    fi
  else
    echo 'Pull request event detected, skipping deployment step'
  fi
}

deploy_from_master
