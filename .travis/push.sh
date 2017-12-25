setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout master
  if [[ $(( $TRAVIS_BUILD_NUMBER % 5 )) == 0 ]]; then
      n = $(( ($TRAVIS_BUILD_NUMBER-270)/5))
      npm run linter
      echo "Linting build:  $n"
  fi
  git add *
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  echo "https://${GH_TOKEN}@github.com/Chalarangelo/30-seconds-of-code.git"
  git push --force "https://${GH_TOKEN}@github.com/Chalarangelo/30-seconds-of-code.git" master > /dev/null 2>&1
}

setup_git
commit_website_files
upload_files
