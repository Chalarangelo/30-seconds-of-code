setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  if [[ $(( $TRAVIS_EVENT_TYPE )) != 'pull_request' ]]; then
      if [[ $(( $TRAVIS_BRANCH )) != 'master' ]]; then
        git checkout master
        git add *
        git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
      fi
  fi
}

upload_files() {
  git push --force --quiet "https://${GH_TOKEN}@github.com/Chalarangelo/30-seconds-of-code.git" master > /dev/null 2>&1
}

setup_git
commit_website_files
upload_files
