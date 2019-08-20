# Documentation

## Supported hooks

`husky` supports all Git hooks defined [here](https://git-scm.com/docs/githooks).

Server-side hooks (`pre-receive`, `update` and `post-receive`) aren't supported.

## Access Git params and stdin

Git hooks can get parameters via command-line arguments and stdin. `husky` makes them accessible via `HUSKY_GIT_PARAMS` and `HUSKY_GIT_STDIN` environment variables.

```
{
  "husky": {
    "hooks": {
      "commit-msg": "echo $HUSKY_GIT_PARAMS"
    }
  }
}
```

## Disable auto-install

If you don't want `husky` to automatically install Git hooks, simply set `HUSKY_SKIP_INSTALL` environment variable to `true`.

```sh
HUSKY_SKIP_INSTALL=true npm install
```

## Multi-package repository (monorepo)

If you have a multi-package repository, it's __recommended__ to use tools like [lerna](https://github.com/lerna/lerna) and have `husky` installed ONLY in the root `package.json` to act as the source of truth.

Generally speaking, you should AVOID defining `husky` in multiple `package.json`, as each package would overwrite previous `husky` installations.

```sh
.
└── root
    ├── .git
    ├── package.json 🐶 # Add husky here
    └── packages
        ├── A
        │   └── package.json
        ├── B
        │   └── package.json
        └── C
            └── package.json
```

```js
// root/package.json
{
  "private": true,
  "devDependencies": {
    "husky": "..."
  },
  "husky": {
    "hooks": {
      "pre-commit": "lerna run test"
    }
  }
}
```

## Node version management

If you're on Windows, husky will simply use the version installed globally on your system.

For macOS and Linux users:
- if you're running `git` commands in the terminal, husky will use the version defined in your shell `PATH`. So if you're a `nvm` user, husky will use the version that you've set with `nvm`.
- if you're using a GUI client and `nvm`, it may have a different `PATH` and not load `nvm`, in this case the highest `node` version installed by `nvm` will usually be picked. You can also check `~/.node_path` to see which version is used by GUIs and edit if you want to use something else.

## `~/.huskyrc`

`husky` will source `~/.huskyrc` file if it exists before running hook scripts. 

You can use it, for example, to load a node version manager. 

Please note, this is only useful when working with a GUI and your version manager isn't already loaded.

Also, unlike `project/.huskyrc` which should contain JSON, `~/.huskyrc` should contain `sh` commands.

```sh
# ~/.huskyrc
echo "example"
```

_This feature is experimental 🧪. Feedbacks are welcome._

## Debug

It's basic for the moment, but you can use `HUSKY_DEBUG=true` to log debug messages.

## Multiple commands

By design, `husky` will run hook scripts as a single command. Just like `scripts` defined in `package.json` are run.

```json
{
  "pre-commit": "cmd && cmd && cmd"
}
```

That said, for readability, you may want to use an array. In this case, the recommended way is to define them in a `.huskyrc.js`

```js
const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'cmd',
      'cmd',
      'cmd'
    ])
  }
}
```

Tools like [npm-run-all](https://github.com/mysticatea/npm-run-all) can help too.