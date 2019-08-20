#!/usr/bin/env bash

# ensure git is latest clean branch
# require npm user
# bump package version
# commit
# create tag
# push commit & tag
# publish

usage() {
  echo ""
  echo "  Usage: bash $0 <major|minor|patch>"
}

print() {
  echo "NPM RELEASE: $1"
}

run() {
  local version=$1

  # ensure git is ready, fetch before making comparisons
  git fetch
  local local_sha=$(git rev-parse @)
  local remote_sha=$(git rev-parse @{u})
  local base_sha=$(git merge-base @ @{u})

  if [[ -n $(git status --porcelain) ]]; then
    print "Commit or stash you changes before releasing"
    exit 1
  else
    print "Working directory is clean"
  fi

  if [ $local_sha = $remote_sha ]; then
    print "Local branch is up-to-date."
  elif [ $local_sha = $base_sha ]; then
    print "You need to pull changes before you can release."
    exit 1
  elif [ $remote_sha = $base_sha ]; then
    print "You need to push changes before you can release."
    exit 1
  else
    print "Your branch has diverged from the remote, you cannot release."
    exit 1
  fi

  # ensure npm is ready
  local npm_user=$(npm whoami)
  local is_collaborator=$(npm access ls-collaborators | grep ".*$npm_user.*:.*write.*")
  local is_owner=$(npm owner ls | grep ".*$npm_user <.*")

  if ! [[ "$npm_user" ]]; then
    print "You must be logged in to NPM to publish, run \"npm login\" first."
    exit 1
  fi

  if [[ -z "$is_collaborator" ]] && [[ -z "$is_owner" ]]; then
    print "$npm_user is not an NPM owner or collaborator. Request access from:"
    npm owner ls
    exit 1
  fi

  # all checks out, publish
  print "Publishing new $version version as $npm_user."

  print "...npm version $version"
  npm version ${version}

  print "...git push"
  git push

  print "...git push --follow-tags"
  git push --follow-tags

  print "...npm publish"
  npm publish
}

case $1 in
  "major" | "minor" | "patch")
    run $1
  ;;

  *)
    usage
    exit 1
  ;;
esac
