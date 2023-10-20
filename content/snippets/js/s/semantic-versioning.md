---
title: Introduction to Semantic Versioning (SemVer)
shortTitle: Semantic Versioning (SemVer) explained
type: story
language: javascript
tags: [node]
cover: wet-lowland-golden-hour
excerpt: Learn how semantic versioning works and how to use it to correctly version your software.
dateModified: 2023-07-16
---

**SemVer** (short for **Semantic Versioning**) is a versioning scheme commonly used in software development to communicate the changes and **compatibility** of a software package. The JavaScript ecosystem, embodied mainly in the **npm package manager**, has adopted SemVer as the standard versioning scheme for JavaScript packages. The version of a package can be found in its `package.json` file, and it is also displayed in the npm registry.

```json
{
  "name": "my-package",
  "version": "1.0.0"
}
```

### SemVer versions

SemVer versions are formatted in **three numeric components**, as follows:

```
{major}.{minor}.{patch}
```

Each component represents a specific type of change made to the software.

- **Major version**: Significant changes that may **break compatibility** with previous versions. Developers should carefully review the documentation and test their code against the new version before upgrading.
- **Minor version**: Backwards-compatible **additions or improvements** that don't break compatibility with previous versions. Users can typically upgrade to a new minor version without worrying about major changes that might require code modifications.
- **Patch version**: Backwards-compatible **bug fixes, patches, or maintenance** releases. Patch releases are intended to be safe and shouldn't introduce new features or breaking changes.

The following table summarizes the different types of changes represented by each component:

| Component | Type of change | Example |
| --------- | -------------- | ------- |
| Major     | Incompatible   | Breaking changes, rewrites, architectural changes |
| Minor     | Compatible     | New features, functionalities, enhancements |
| Patch     | Compatible     | Bug fixes, patches, maintenance releases |

### Releases and pre-releases

The **first version** of a software package is typically denoted as `1.0.0`. This is because the initial release of a software package is considered to be a major version, and the first version of a major version is always `1.0.0`. Versions starting with `0.x.x` are considered to be pre-release versions and are not intended for production use.

Additionally, SemVer allows for **pre-release versions** to be appended to the version number. These are denoted by a hyphen followed by a series of alphanumeric identifiers, such as `1.0.0-alpha.1` or `1.0.0-beta.2`. Pre-release versions are typically used to indicate that the software is still under active development and may not be ready for production use.

### Specifying which version to use

When installing a package, you can specify which version to use by appending the version number to the package name, as follows:

```shell
npm install my-package@1.0.0
```

If you don't specify a version, npm will install the **latest version** of the package. You can also use the `^` or `~` symbols to specify a range of versions. For example, `^1.0.0` will install the latest version of the package that is compatible with `1.0.0`. Similarly, `~1.0.0` will install the latest version of the package that is compatible with `1.0.0` and has the same major version. Here's a quick summary of the different ways to specify a version:

- Exact version: `1.0.4`
- Patch releases: `1.0` or `1.0.x` or `~1.0.4`
- Minor releases: `1` or `1.x` or `^1.0.4`

Note that you can also change the version of each dependency by editing the `package.json` file directly. Just remember to run `npm install` after making any changes to the `package.json` file.
