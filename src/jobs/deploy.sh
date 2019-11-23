#!/bin/bash
deploy_branch() {
  git config --global user.email "30secondsofcode@gmail.com"
  git config --global user.name "30secondsofcode"
  # git push -d origin $1
  # git checkout -b $1
  git push --force --quiet "https://${GH_TOKEN}@github.com/30-seconds/30-seconds-web.git" production > dev/null 2>&1
  # git push origin $1
}

deploy_production() {
  echo "Deploying in 'production' branch..."
  if deploy_branch "production" ; then
    echo "Deployment successfull"
  else
    echo "Deployment failed"
  fi
}

deploy_development() {
  echo "Deploying in 'development' branch..."
  if deploy_branch "development" ; then
    echo "Deployment successfull"
  else
    echo "Deployment failed"
  fi
}

deploy() {
  if [ $1 == "production" ] ; then
    deploy_production
  elif [ $1 == "development" ] ; then
    deploy_development
  else
    echo "Unknown environment: "$1
    echo "Deployment aborted"
    return 1
  fi
}

deploy $1
