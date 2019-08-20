REPORTER = dot

build: blob.js

blob.js:
	@./node_modules/.bin/browserify --standalone blob index.js > blob.js

test:
	@./node_modules/.bin/zuul -- test/index.js

clean:
	rm blob.js

.PHONY: test blob.js
