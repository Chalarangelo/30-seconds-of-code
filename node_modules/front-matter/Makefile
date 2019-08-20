MAKEFLAGS += --warn-undefined-variables
PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

TEST ?= node
version ?= patch

node_modules: package.json
	@npm prune
	@npm install
	@touch node_modules

.PHONY: clean
clean:
	@$(RM) -fr node_modules
	@$(RM) -fr npm-debug.log
	@$(RM) -fr coverage

.PHONY: fmt
fmt: node_modules
	@standard-format -w

.PHONY: lint
lint: node_modules
	@standard

.PHONY: test
test: lint
	@if [ "$(TEST)" = "browser" ]; \
		then make test-browser; \
		else make test-node; \
	fi

.PHONY: test-node
test-node: node_modules
	tape test/index.js

.PHONY: test-browser
test-browser: node_modules
ifeq ($(TRAVIS_PULL_REQUEST),true)
	zuul -- test/index.js
endif

.PHONY: zuul
zuul: node_modules
	zuul --local 8080 --ui tape -- test/index.js

.PHONY: release
release: test
	npm version $(version)
	git push && git push --tags
	npm publish

.PHONY: coverage
coverage: node_modules index.js test/index.js node_modules
	@istanbul cover --report html --print detail ./test/index.js
	@touch coverage

.PHONY: coveralls
coveralls: node_modules coverage
	@istanbul report lcov
	(cat coverage/lcov.info | coveralls) || exit 0

.PHONY: travis
travis: test coveralls
