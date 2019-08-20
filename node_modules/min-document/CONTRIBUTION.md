# This is an OPEN Open Source Project

## What?

Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

## Rules

There are a few basic ground-rules for contributors:

 - No --force pushes or modifying the Git history in any way.
 - Non-master branches ought to be used for ongoing work.
 - External API changes and significant modifications ought to be subject to an internal pull-request to solicit feedback from other contributors.
 - Internal pull-requests to solicit feedback are encouraged for any other non-trivial contribution but left to the discretion of the contributor.
 - For significant changes wait a full 24 hours before merging so that active contributors who are distributed throughout the world have a chance to weigh in.
 - Contributors should attempt to adhere to the prevailing code-style.
Releases

Declaring formal releases requires peer review.

 - A reviewer of a pull request should recommend a new version number (patch, minor or major).
 - Once your change is merged feel free to bump the version as recommended by the reviewer.
 - A new version number should not be cut without peer review unless done by the project maintainer.

## Want to contribute?

Even though collaborators may contribute as they see fit, if you are not sure what to do, here's a suggested process:

## Cutting a new version

 - Get your branch merged on master
 - Run `npm version major` or `npm version minor` or `npm version patch`
 - `git push origin master --tags`
 - If you are a project owner, then `npm publish`

## If you want to have a bug fixed or a feature added:

 - Check open issues for what you want.
 - If there is an open issue, comment on it, otherwise open an issue describing your bug or feature with use cases.
 - Discussion happens on the issue about how to solve your problem.
 - You or a core contributor opens a pull request solving the issue with tests and documentation.
 - The pull requests gets reviewed and then merged.
 - A new release version get's cut.
 - (Disclaimer: Your feature might get rejected.)

### Changes to this arrangement

This is an experiment and feedback is welcome! This document may also be subject to pull-requests or changes by contributors where you believe you have something valuable to add or change.
