if [[ $TRAVIS_COMMIT_MESSAGE == *"--force-build"* ]]; 
  then echo -e "\e[95mFORCE-DEPLOY: Deploying to Repository" && chmod +x .travis/push.sh && ./.travis/push.sh; 
fi
