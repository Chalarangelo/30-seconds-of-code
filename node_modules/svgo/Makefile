test:
	@npm run test

lib-cov:
	@./node_modules/.bin/istanbul instrument --output lib-cov --no-compact --variable global.__coverage__ lib

coverage: lib-cov
	@COVERAGE=1 ISTANBUL_REPORTERS=text-summary ./node_modules/.bin/mocha --reporter mocha-istanbul
	@rm -rf lib-cov

coveralls: lib-cov
	@COVERAGE=1 ISTANBUL_REPORTERS=lcovonly ./node_modules/.bin/mocha --reporter mocha-istanbul
	@cat lcov.info | ./node_modules/.bin/coveralls
	@rm -rf lib-cov lcov.info

travis: lint test coveralls

lint:
	@npm run lint

.PHONY: test
