# json-bump
bumps the "version" entry for a JSON file

## rationale

An easy to use component to bump the [semver](http://semver.org/) version of a JSON file. Includes both an exported package and a CLI.

## installation

    npm i json-bump

## programmatic example

    const bump = require('json-bump')
    bump('package.json', { major: 1 })

## command-line example

    $ json-bump package.json
    Updated package.json version from 0.1.2 to 0.1.3

    $ json-bump data.json --minor
    Updated data.json version from 1.0.5 to 1.1.0

    $ json-bump

    Usage: json-bump FILENAME [FLAGS]
    Bumps the version in a json file using semver (MAJOR.MINOR.PATCH)

    --replace=semver   this replaces the entire semver with the given string

    --major=1          increment the major version (increments by 1 if flagged but not specified)
    --minor=1          increment the minor version (increments by 1 if flagged but not specified)
    --patch=1          increment the patch version (increments by 1 if flagged but not specified)
    --entry=name       change entry updated (defaults is "version")
    --spaces=4          number of spaces to format the .json file (set to 0 to remove spaces)

    If no FLAGS are specified, increments PATCH by 1

## API

### function version(filename, options)
bumps the "version" entry for a .json file
- {string} filename
- {object} [options] defaults to incrementing PATCH by 1 if no options are provided
- {string="version"} [entry] name of entry to change
- {number} [major] increment major by number (resetting MINOR and PATCH to 0)
- {number} [minor] increment minor by number (resetting PATCH to 0)
- {number} [patch] increment patch by number
- {string} [replace] replace entry with this string
- {number} [spaces=4] number of spaces to format the .json file (set to 0 to remove spaces)
- returns: { updated: string, original: string }

## license  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)