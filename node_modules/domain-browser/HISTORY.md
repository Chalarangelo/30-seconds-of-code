# History

## v1.2.0 2018 January 26
- `index.js` is now located at `source/index.js`
- Updated base files

## v1.1.7 2015 December 12
- Revert minimum node version from 0.12 back to 0.4
    - Thanks to [Alexander Sorokin](https://github.com/syrnick) for [this comment](https://github.com/bevry/domain-browser/commit/c66ee3445e87955e70d0d60d4515f2d26a81b9c4#commitcomment-14938325)

## v1.1.6 2015 December 12
- Fixed `assert-helpers` sneaking into `dependencies`
    - Thanks to [Bogdan Chadkin](https://github.com/TrySound) for [Pull Request #8](https://github.com/bevry/domain-browser/pull/8)

## v1.1.5 2015 December 9
- Updated internal conventions
- Added better jspm support
    - Thanks to [Guy Bedford](https://github.com/guybedford) for [Pull Request #7](https://github.com/bevry/domain-browser/pull/7)

## v1.1.4 2015 February 3
- Added
    - `domain.enter()`
    - `domain.exit()`
    - `domain.bind()`
    - `domain.intercept()`

## v1.1.3 2014 October 10
- Added
    - `domain.add()`
    - `domain.remove()`

## v1.1.2 2014 June 8
- Added `domain.createDomain()` alias
    - Thanks to [James Halliday](https://github.com/substack) for [Pull Request #1](https://github.com/bevry/domain-browser/pull/1)

## v1.1.1 2013 December 27
- Fixed `domain.create()` not returning anything

## v1.1.0 2013 November 1
- Dropped component.io and bower support, just use ender or browserify

## v1.0.1 2013 September 18
- Now called `domain-browser` everywhere

## v1.0.0 2013 September 18
- Initial release
