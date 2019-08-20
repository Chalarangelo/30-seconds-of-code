
build: components index.js
	@component build

components:
	@Component install

clean:
	rm -fr build components template.js

test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec

.PHONY: clean test
