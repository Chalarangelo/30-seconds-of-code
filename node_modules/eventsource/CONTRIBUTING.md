# Contributing to EventSource

If you add or fix something, add tests.

## Release process

Update `History.md`, Then:

    npm outdated --depth 0 # See if you can upgrade something
    npm version [major|minor|patch]
    npm publish
