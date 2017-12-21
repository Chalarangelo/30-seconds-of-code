#!/bin/sh

setup_git() {
  git config --global user.email "david10608@gmail.com"
  git config --global user.name "Pl4gue"
}

commit_website_files() {
  git checkout master
  git add *
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/Chalarangelo/30-seconds-of-code.git > /dev/null 2>&1
  git push --quiet --set-upstream origin master
}

setup_git
commit_website_files
upload_files
