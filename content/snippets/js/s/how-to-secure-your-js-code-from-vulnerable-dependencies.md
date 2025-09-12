---
title: How to secure your JavaScript code from vulnerable dependencies
shortTitle: JavaScript dependency security
language: javascript
tags: [webdev,security]
cover: locked-tablet
excerpt: Keep your code, data, and users safe by following these simple tips to secure your JavaScript projects from vulnerable dependencies.
listed: true
dateModified: 2025-09-14
---

Given the recent npm supply chain attack that compromised `chalk`, I thought it would be a good idea to take a look into how to **secure your JavaScript code from vulnerable dependencies**. After some relatively light research, I found a few actionable tips that could be of use to many developers.

> [!IMPORTANT]
>
> I am by no means a security expert. This is just a summary of what I found after a little bit of research. If you are a security expert and find any mistakes, please let me know!

# Audit dependencies regularly

Regularly scan your project for **known vulnerabilities** using **automated tools**. The npm CLI provides a built-in auditing command:

```shell
npm audit
```

This will report any security issues in your dependencies. For continuous monitoring, consider integrating tools like [Snyk](https://snyk.io/) or [Dependabot](https://github.com/dependabot) into your workflow. These can automatically check for and alert you to new vulnerabilities.

> [!TIP]
>
> Double check any Dependabot PRs before merging them, review the changelog and check for breaking changes, too. Sometimes, a security patch can introduce breaking changes or do more harm than good, if something flies under the radar.

## Pin dependency versions

Avoid surprises from upstream updates by **locking your dependencies to known good versions**. Use a `package-lock.json` file in combination with the `npm ci` command to ensure reproducible builds:

```shell
npm ci
```

It installs exactly what's specified in your **lockfile**, preventing unintentional upgrades. Be cautious with version specifiers like `^` or `~` which can allow automatic updates:

```json title="package.json"
{
  "dependencies": {
    "express": "4.18.2" // Prefer this
    // Instead of
    "express": "^4.18.2"
  }
}
```

## Use trusted sources

Only install **packages from reputable maintainers and sources**. Before adding a new dependency, check its download count, review its code, and verify the maintainer's reputation. Avoid packages with suspicious activity, few contributors, or poor documentation.

For example, you can inspect a package with:

```shell
npm info <package-name>
```

> [!CAUTION]
>
> In this case, the supply chain attack _did_ indeed come from a reputable dependency (`chalk`), so use this advice as part of a broader strategy, not as a sole safeguard.

## Minimize dependencies

**Keep your dependency footprint as small as possible**. Every additional package increases your attack surface. Remove unused dependencies and prefer built-in language features or your own code for simple tasks.

To identify and remove unused dependencies:

```shell
npm prune
```

Or use tools like [depcheck](https://www.npmjs.com/package/depcheck) to find unused packages. Additionally, if you only need a small part of a large library, consider importing just that part instead of the whole package, looking for a modular alternative, or writing a small utility function yourself.

## Review transitive dependencies

Your direct dependencies may pull in many others. Regularly **inspect your full dependency tree** to spot risky packages. Use:

```shell
npm ls
```

This outputs your project's dependency graph. Look for deprecated, outdated, or suspicious packages deep in the tree and consider alternatives if necessary.

## Monitor for malicious updates

**Stay informed about new vulnerabilities** and malicious package updates by subscribing to **security advisories** and update your dependencies promptly when patches are released. GitHub provides **automated alerts** for repositories and npm has its own [advisories](https://www.npmjs.com/advisories):

- [GitHub Security Advisories](https://github.com/advisories)
- [npm Security Advisories](https://www.npmjs.com/advisories)

Set up notifications in your workflow to be alerted when action is needed.

## Closing thoughts

Securing your JavaScript projects against supply chain attacks is a continuous process. By using **best practices** and **automated tools**, you can significantly reduce your risk. Make these habits part of your standard development workflow to keep your code, data, and users safe.
