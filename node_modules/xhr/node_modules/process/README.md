# process

```require('process');``` just like any other module.

Works in node.js and browsers via the browser.js shim provided with the module.

## package manager notes

If you are writing a bundler to package modules for client side use, make sure you use the ```browser``` field hint in package.json.

See https://gist.github.com/4339901 for details.

The [browserify](https://github.com/substack/node-browserify) module will properly handle this field when bundling your files.


