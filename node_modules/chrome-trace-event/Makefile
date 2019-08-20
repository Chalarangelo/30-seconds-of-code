
TAPE = ./node_modules/.bin/tape
JSSTYLE_FILES := $(shell find lib test -name "*.js")


all $(TAPE):
	npm install

.PHONY: clean
clean:
	rm -rf examples/*.json examples/*.log

.PHONY: distclean
distclean: clean
	rm -rf node_modules

.PHONY: test
test: | $(TAPE)
	$(TAPE) test/*.test.js

.PHONY: check-jsstyle
check-jsstyle: $(JSSTYLE_FILES)
	./tools/jsstyle -o indent=4,doxygen,unparenthesized-return=0,blank-after-start-comment=0,leading-right-paren-ok $(JSSTYLE_FILES)

.PHONY: check
check: check-jsstyle
	@echo "Check ok."

# Ensure CHANGES.md and package.json have the same version.
.PHONY: versioncheck
versioncheck:
	@echo version is: $(shell cat package.json | json version)
	[[ `cat package.json | json version` == `grep '^## ' CHANGES.md | head -1 | awk '{print $$2}'` ]]

.PHONY: cutarelease
cutarelease: versioncheck
	[[ `git status | tail -n1` == "nothing to commit, working directory clean" ]]
	./tools/cutarelease.py -p trace-event -f package.json

.PHONY: git-hooks
git-hooks:
	[[ -e .git/hooks/pre-commit ]] || ln -s ../../tools/pre-commit.sh .git/hooks/pre-commit
