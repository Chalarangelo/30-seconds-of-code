# Contributing to `node-abi`

:+1::tada: First off, thanks for taking the time to contribute to `node-abi`! :tada::+1:

## Commit Message Guidelines

This module uses [`semantic-release`](https://github.com/semantic-release/semantic-release) to automatically release new versions via Travis.
Therefor we have very precise rules over how our git commit messages can be formatted.

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject** ([full explanation](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type

Must be one of the following:

- **feat**: A new feature. **Will trigger a new release**
- **fix**: A bug fix or a addition to one of the target arrays. **Will trigger a new release**
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation


### Patch Release

```
fix(electron): Support Electron 1.8.0
```

### ~~Minor~~ Feature Release

```
feat: add .getTarget(abi, runtime)
```

### ~~Major~~ Breaking Release

```
feat: Add amazing new feature

BREAKING CHANGE: This removes support for Node 0.10 and 0.12.
```
