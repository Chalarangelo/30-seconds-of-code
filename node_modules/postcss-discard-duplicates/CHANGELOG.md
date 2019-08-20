# 4.0.0-rc.0

* Breaking: Drops support for Node 0.12, we now require at least Node 4.
* Breaking: Update PostCSS to 6.0.0.

# 2.1.0

* Now supports discarding duplicates irrespective of property order, better
  support for legacy hacks & partial duplicate removal (thanks to @andyjansson).

# 2.0.2

* Major performance boost by lessening algorithmic complexity; each node is
  now cached and the nested loop removed, meaning that each node is cast to a
  string only once (thanks to @asztal).

# 2.0.1

* Now compiled with babel 6.
* Minor performance boost from exiting from the `dedupe` function if the node
  has less than two child nodes.

# 2.0.0

* Upgraded to PostCSS 5.

# 1.2.1

* Fixes an integration test failure with cssnano; use PostCSS `each` rather
  than native `forEach` (thanks to @TrySound).

# 1.2.0

* Improved duplicate detection (thanks to @TrySound).

# 1.1.6

* Improved performance by caching string representations of nodes, and
  minimising stringifying as much as possible (thanks to @TrySound).

# 1.1.5

* Fixed an issue where comments were being deduplicated.

# 1.1.4

* Improved performance by making all AST iterations in a single pass.

# 1.1.3

* Improved documentation for compatibility with the plugin guidelines.
* Simplify main source code.

# 1.1.2

* Fixed an issue where declarations inside similar keyframes were being
  discarded incorrectly.

# 1.1.1

* Fixed a bug where keyframe rules were being incorrectly discarded, if they had
  the same declarations but different vendor prefixes.

# 1.1.0

* Now uses the PostCSS `4.1` plugin API.

# 1.0.0

* Initial release.
