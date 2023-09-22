#!/bin/bash
deploy_branch() {
  git config --global user.email "30secondsofcode@gmail.com"
  git config --global user.name "30secondsofcode"
  git checkout -b $1
  git reset --hard origin/master
  git commit -m "Deployment - $(date +%Y.%m.%d_%H:%M)" --allow-empty
  git push --force --quiet "https://${GH_TOKEN}@github.com/30-seconds/30-seconds-of-code.git" $1 > /dev/null 2>&1
}

deploy_production() {
  echo "Deploying in 'production' branch..."
  if deploy_branch "production" ; then
    echo "Deployment successfull"
  else
    echo "Deployment failed"
  fi
}

deploy() {
  if [ $1 == "production" ] ; then
    deploy_production
  else
    echo "Unknown environment: "$1
    echo "Deployment aborted"
    return 1
  fi
}

deploy $1
