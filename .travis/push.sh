setup_git() {
  git config --global user.email "mst10041967@gmail.com"
  git config --global user.name "Rohit Tanwar"
}

commit_website_files() {
  if [ $TRAVIS_EVENT_TYPE != "pull_request" ]; then
    if [ $TRAVIS_BRANCH == "master" ]; then
      echo "Committing to master branch..."
      git checkout -b "travis"
      git add -A
      git commit -a --message="travis_commit"
      fi
  fi
}

upload_files() {
  if [ $TRAVIS_EVENT_TYPE != "pull_request" ]; then
    if [ $TRAVIS_BRANCH == "master" ]; then
      echo "Pushing to master branch..."
      git push --force "https://${GH_TOKEN}@github.com/kriadmin/30-seconds-of-python-code.git" master
    fi
  fi
}

setup_git
commit_website_files
upload_files
