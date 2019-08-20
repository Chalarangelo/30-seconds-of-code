# Contributing Guidelines

Contributions are always welcome!

**Before spending lots of time on something, ask for feedback on your idea first!**

Please search issues and pull requests before adding something new to avoid duplicating efforts and conversations.


## Installing

Fork and clone the repo, then `npm install` to install all dependencies and `npm test` to ensure all is okey before you start anything.


## Testing

Tests are run with `npm test`. Please ensure all tests are passing before submitting a pull request (unless you're creating a failing test to increase test coverage or show a problem).

## Code Style

[![standard][standard-image]][standard-url]

This repository uses [`standard`][standard-url] to maintain code style and consistency, and to avoid style arguments. You are encouraged to install it globally. `npm test` runs `standard` so you don't have to!

```
npm i standard -g
```

It is intentional to don't have `standard`, `istanbul` and `coveralls` in the devDependencies. Travis will handle all that stuffs. That approach will save bandwidth also installing and development time.

[standard-image]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[standard-url]: https://github.com/feross/standard