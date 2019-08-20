This document is to serve as a living, changing plan for getting LibSass caught up with Ruby Sass.

_Note: an "s" preceeding a version number is specifying a Ruby Sass version. Without an s, it's a version of LibSass._

# Goal
**Our goal is to reach full s3.4 compatibility as soon as possible. LibSass version 3.4 will behave just like Ruby Sass 3.4**

I highlight the goal, because there are some things that are *not* currently priorities. To be clear, they WILL be priorities, but they are not at the moment:

* Performance Improvements
* Extensibility

The overriding goal is correctness.

## Verifying Correctness
LibSass uses the spec for its testing. The spec was originally based off s3.2 tests. Many things have changed in Ruby Sass since then and some of the tests need to be updated and changed in order to get them to match both LibSass and Ruby Sass.

Until this project is complete, the spec will be primarily a place to test LibSass. By the time LibSass reaches 3.4, it is our goal that sass-spec will be fully usable as an official testing source for ALL implementations of Sass.

## Version Naming
Until LibSass reaches parity with Ruby Sass, we will be aggressively bumping versions, and LibSass 3.4 will be the peer to Ruby Sass 3.4 in every way.

# Release Plan

## 3.0
The goal of 3.0 is to introduce some of the most demanded features for LibSass. That is, we are focusing on issues and features that have kept adoption down. This is a mongrel release wrt which version of Sass it's targeting. It's often a mixture of 3.2 / 3.3 / 3.4 behaviours. This is not ideal, but it's favourable to not existing. Targeting 3.4 strictly during this release would mean we never actually release.

# 3.1
The goal of 3.1 is to update all the passing specs to agree with 3.4. This will not be a complete representation of s3.4 (aka, there will me missing features), but the goal is to change existing features and implemented features to match 3.4 behaviour.

By the end of this, the sass-spec must pass against 3.4.

Major issues:
* Variable Scoping
* Color Handling
* Precision

# 3.2
This version will focus on edge case fixes. There are a LOT of edge cases in the _todo_ tests and this is the release where we hunt those down like dogs (not that we want to hurt dogs, it's just a figure of speech in English).

# 3.3
Dress rehearsal. When we are 99% sure that we've fixed the main issues keeping us from saying we are compliant in s3.4 behaviour.

# 3.4
Compass Compatibility. We need to be able to work with Compass and all the other libraries out there. At this point, we are calling LibSass "mature"

# Beyond 3.4
Obviously, there is matching Sass 3.5 behaviour. But, beyond that, we'll want to focus on performance, stability, and error handling. These can always be improved upon and are the life's work of an open source project. We'll have to work closely with Sass in the future.
