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
    "prepublish": "in-publish && thing-I-dont-want-on-dev-install || not-in-publish"
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

It's worth noting that the `prepublish` lifecycle is _ALSO_ called when you build a tarball, so:

```
$ npm pack
```

Will call your `prepublish` lifecycle, but with the examplea above,
`thing-I-dont-want-on-dev-install` won't be run.

If you want this, you can use another helper included here:

```json
  "scripts": {
    "prepublish": "not-in-install && thing-I-dont-want-on-dev-install || in-install"
  }
```

The above will run your `thing-I-dont-want-on-dev-install` on `publish` and
on `pack` but not on `install`.
