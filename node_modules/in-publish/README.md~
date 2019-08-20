in-publish
==========

Detect if we were run as a result of `npm publish`. This is intended to allow you to
easily have prepublish lifecycle scripts that don't run when you run `npm install`.

```
$ npm install --save in-publish
in-publish@1.0.0 node_modules/in-publish
```

Then edit your package.json to have:

```json
  "scripts": {
    "prepublish": "in-publish && thing-I-dont-want-on-dev-install || in-install"
  }
```

Now when you run:
```
$ npm install
```
Then `thing-I-dont-want-on-dev-install` won't be run, but...

```
$ npm publish
```
And `thing-I-dont-want-on-dev-install` will be run.

Caveat Emptor
=============

This detects that its running as a part of publish command in a terrible,
terrible way.  NPM dumps out its config object blindly into the environment
prior to running commands.  This includes the command line it was invoked
with.  This module determines if its being run as a result of publish by
looking at that env var.  This is not a part of the documented npm interface
and so it is not guarenteed to be stable. 

