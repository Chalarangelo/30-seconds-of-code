# prebuild-install

> A command line tool to easily install prebuilt binaries for multiple version of node/iojs on a specific platform.

[![npm](https://img.shields.io/npm/v/prebuild-install.svg)](https://www.npmjs.com/package/prebuild-install)
![Node version](https://img.shields.io/node/v/prebuild-install.svg)
[![Build Status](https://travis-ci.org/prebuild/prebuild-install.svg?branch=master)](https://travis-ci.org/prebuild/prebuild-install)
[![Build status](https://ci.appveyor.com/api/projects/status/6v6hxxwgjrr99pc8/branch/master?svg=true)](https://ci.appveyor.com/project/mathiask88/prebuild-install)
[![david](https://david-dm.org/prebuild/prebuild-install.svg)](https://david-dm.org/prebuild/prebuild-install)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

`prebuild-install` supports installing prebuilt binaries from GitHub by default.

## Usage

Change your package.json install script to:
```json
{
  "scripts": {
    "install": "prebuild-install || node-gyp rebuild"
  }
}
```

### Requirements

You need to provide prebuilds made by [`prebuild`](https://github.com/prebuild/prebuild).

### Help
```
prebuild-install [options]

  --download    -d  [url]       (download prebuilds, no url means github)
  --target      -t  version     (version to install for)
  --runtime     -r  runtime     (Node runtime [node, napi or electron] to build or install for, default is node)
  --path        -p  path        (make a prebuild-install here)
  --token       -T  gh-token    (github token for private repos)
  --tag-prefix <prefix>         (github tag prefix, default is "v")
  --build-from-source           (skip prebuild download)
  --verbose                     (log verbosely)
  --libc                        (use provided libc rather than system default)
  --debug                       (set Debug or Release configuration)
  --version                     (print prebuild-install version and exit)
```

When `prebuild-install` is run via an `npm` script, options
`--build-from-source`, `--debug` and `--download`, may be passed through via
arguments given to the `npm` command.

### Private Repositories

`prebuild-install` supports downloading prebuilds from private GitHub repositories using the `-T <github-token>`:

```
$ prebuild-install -T <github-token>
```

If you don't want to use the token on cli you can put it in `~/.prebuild-installrc`:

```
token=<github-token>
```

Alternatively you can specify it in the `prebuild-install_token` environment variable.

Note that using a GitHub token uses the API to resolve the correct release meaning that you are subject to the ([GitHub Rate Limit](https://developer.github.com/v3/rate_limit/)).

### Create GitHub Token

To create a token:

* Go to [this page](https://github.com/settings/tokens)
* Click the `Generate new token` button
* Give the token a name and click the `Generate token` button, see below

![prebuild-token](https://cloud.githubusercontent.com/assets/13285808/20844584/d0b85268-b8c0-11e6-8b08-2b19522165a9.png)

The default scopes should be fine.

### Custom binaries
The end user can override binary download location through environment variables in their .npmrc file.
The variable needs to meet the mask `% your package name %_binary_host` or `% your package name %_binary_host_mirror`. For example:
```
leveldown_binary_host=http://overriden-host.com/overriden-path
```
Note that the package version subpath and file name will still be appended.
So if you are installing `leveldown@1.2.3` the resulting url will be:
```
http://overriden-host.com/overriden-path/v1.2.3/leveldown-v1.2.3-node-v57-win32-x64.tar.gz
```

### Cache

All prebuilt binaries are cached to minimize traffic. So first `prebuild-install` picks binaries from the cache and if no binary could be found, it will be downloaded. Depending on the environment, the cache folder is determined in the following order:

* `${npm_config_cache}/_prebuilds`
* `${APP_DATA}/npm-cache/_prebuilds`
* `${HOME}/.npm/_prebuilds`

## License

MIT
