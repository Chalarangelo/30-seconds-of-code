# Contributing Guide to PostCSS

If you want contribute to PostCSS, there are few things that you should
be familiar with.


## In Case You Have Question About Using PostCSS

* **Ask for help in [the chat]**

    If you stuck on something there is a big chance
    that someone had similar problem before.

[the chat]: https://gitter.im/postcss/postcss


## Adding Your Plugin to the List

If you created or found a plugin and want to add it to PostCSS plugins list
follow this simple steps.

PR should not change plugins defined in README it contains only favorite plugins
and moderated by PostCSS author.

Plugins submitted by community located in [`docs/plugins`].

* **Keep plugins order**

    Be sure that plugin not presented yet and find suitable position
    in alphabetic order for it.
    But plugins with `postcss-` prefix should come first.

* **Check spelling**

    Before submitting PR be sure that spelling check pass.
    For that run command `npm test`.
    If it fails with unknown word error, add it as word
    to `.yaspellerrc` dictionary.

* **Check PostCSS plugin guideline**

    Provided plugin should match plugin [guidelines].

- **Provide link to suggested plugin**

    Make sure your pull request description contains link to plugin
    you are willing to add.

[`docs/plugins`]: https://github.com/postcss/postcss/blob/master/docs/plugins.md
[guidelines]:     https://github.com/postcss/postcss/blob/master/docs/guidelines/plugin.md


## TypeScript Declaration Improvements

If you found a bug or want to add certain improvements to types declaration file

* **Check current TypeScript styling**

   Be sure that your changes match TypeScript styling rules defined in typings file.
    * We use classes for existing JS classes like `Stringifier`.
    * Namespaces used for separating functions related to same subject.
    * Interfaces used for defining custom types.

   Make sure you read through declaration file writing [best practices]
   by TypeScript team.

[best practices]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html


## Core Development

If you want to add new feature or fix existed issue

- **Become familiar with PostCSS architecture**

    For gentle intro to PostCSS architecture look through our [guide].

[guide]: https://github.com/postcss/postcss/blob/master/docs/architecture.md
