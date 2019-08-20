#!/bin/bash
set -e

if [ "x${BROWSER}" = "x" ]; then
	npm run lint
	npm test
elif [ "${TRAVIS_SECURE_ENV_VARS}" = "true" ]; then
	npm run test:bundle
	if [ "x${BROWSER_NAME}" = "x" ]; then
		./node_modules/.bin/zuul tests/browser.js
	elif [ "x${BROWSER_PLATFORM}" = "x" ]; then
		./node_modules/.bin/zuul --browser-name $BROWSER_NAME --browser-version $BROWSER_VERSION tests/browser.js
	else
		./node_modules/.bin/zuul --browser-name $BROWSER_NAME --browser-version $BROWSER_VERSION --browser-platform "$BROWSER_PLATFORM" tests/browser.js
	fi
else
	exit 1
fi
