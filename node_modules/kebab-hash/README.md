# kebab-hash

Given an input string, convert to kebab-case and append a hash. Avoids kebab
case collisions.

# Use Case

If you convert URLs to kebab case then `/foo-bar` and `/foo/bar` both become
`foo-bar`. `kebab-hash` solves this problem by appending a hash of the input to
the output string. So these two examples become `foo-bar-096` and `foo-bar-1df`
instead.

# Node only

This package is designed for use on the server (node) not in the browser. PRs
welcome.
