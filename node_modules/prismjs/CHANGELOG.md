# Prism Changelog

## 1.17.1 (2019-07-21)

### Other

* __Infrastructure__
    * Add .DS_Store to npmignore [`c2229ec2`](https://github.com/PrismJS/prism/commit/c2229ec2)

## 1.17.0 (2019-07-21)

### New components

* __DNS zone file__ ([#1961](https://github.com/PrismJS/prism/issues/1961)) [`bb84f98c`](https://github.com/PrismJS/prism/commit/bb84f98c)
* __JQ__ ([#1896](https://github.com/PrismJS/prism/issues/1896)) [`73d964be`](https://github.com/PrismJS/prism/commit/73d964be)
* __JS Templates__: Syntax highlighting inside tagged template literals ([#1931](https://github.com/PrismJS/prism/issues/1931)) [`c8844286`](https://github.com/PrismJS/prism/commit/c8844286)
* __LilyPond__ ([#1967](https://github.com/PrismJS/prism/issues/1967)) [`5d992fc5`](https://github.com/PrismJS/prism/commit/5d992fc5)
* __PascaLIGO__ ([#1947](https://github.com/PrismJS/prism/issues/1947)) [`858201c7`](https://github.com/PrismJS/prism/commit/858201c7)
* __PC-Axis__ ([#1940](https://github.com/PrismJS/prism/issues/1940)) [`473f7fbd`](https://github.com/PrismJS/prism/commit/473f7fbd)
* __Shell session__ ([#1892](https://github.com/PrismJS/prism/issues/1892)) [`96044979`](https://github.com/PrismJS/prism/commit/96044979)
* __Splunk SPL__ ([#1962](https://github.com/PrismJS/prism/issues/1962)) [`c93c066b`](https://github.com/PrismJS/prism/commit/c93c066b)

### New plugins

* __Diff Highlight__: Syntax highlighting inside diff blocks ([#1889](https://github.com/PrismJS/prism/issues/1889)) [`e7702ae1`](https://github.com/PrismJS/prism/commit/e7702ae1)

### Updated components

* __Bash__
    * Major improvements ([#1443](https://github.com/PrismJS/prism/issues/1443)) [`363281b3`](https://github.com/PrismJS/prism/commit/363281b3)
* __C#__
    * Added `cs` alias ([#1899](https://github.com/PrismJS/prism/issues/1899)) [`a8164559`](https://github.com/PrismJS/prism/commit/a8164559)
* __C++__
    * Fixed number pattern ([#1887](https://github.com/PrismJS/prism/issues/1887)) [`3de29e72`](https://github.com/PrismJS/prism/commit/3de29e72)
* __CSS__
    * Extended `url` inside ([#1874](https://github.com/PrismJS/prism/issues/1874)) [`f0a10669`](https://github.com/PrismJS/prism/commit/f0a10669)
    * Removed unnecessary flag and modifier ([#1875](https://github.com/PrismJS/prism/issues/1875)) [`74050c68`](https://github.com/PrismJS/prism/commit/74050c68)
* __CSS Extras__
    * Added `even` & `odd` keywords to `n-th` pattern ([#1872](https://github.com/PrismJS/prism/issues/1872)) [`5e5a3e00`](https://github.com/PrismJS/prism/commit/5e5a3e00)
* __F#__
    * Improved character literals ([#1956](https://github.com/PrismJS/prism/issues/1956)) [`d58d2aeb`](https://github.com/PrismJS/prism/commit/d58d2aeb)
* __JavaScript__
    * Fixed escaped template interpolation ([#1931](https://github.com/PrismJS/prism/issues/1931)) [`c8844286`](https://github.com/PrismJS/prism/commit/c8844286)
    * Added support for private fields ([#1950](https://github.com/PrismJS/prism/issues/1950)) [`7bd08327`](https://github.com/PrismJS/prism/commit/7bd08327)
    * Added support for numeric separators ([#1895](https://github.com/PrismJS/prism/issues/1895)) [`6068bf18`](https://github.com/PrismJS/prism/commit/6068bf18)
    * Increased bracket count of interpolation expressions in template strings ([#1845](https://github.com/PrismJS/prism/issues/1845)) [`c13d6e7d`](https://github.com/PrismJS/prism/commit/c13d6e7d)
    * Added support for the `s` regex flag ([#1846](https://github.com/PrismJS/prism/issues/1846)) [`9e164935`](https://github.com/PrismJS/prism/commit/9e164935)
    * Formatting: Added missing semicolon ([#1856](https://github.com/PrismJS/prism/issues/1856)) [`e2683959`](https://github.com/PrismJS/prism/commit/e2683959)
* __JSON__
    * Kinda fixed comment issue ([#1853](https://github.com/PrismJS/prism/issues/1853)) [`cbe05ec3`](https://github.com/PrismJS/prism/commit/cbe05ec3)
* __Julia__
    * Added `struct` keyword ([#1941](https://github.com/PrismJS/prism/issues/1941)) [`feb1b6f5`](https://github.com/PrismJS/prism/commit/feb1b6f5)
    * Highlight `Inf` and `NaN` as constants ([#1921](https://github.com/PrismJS/prism/issues/1921)) [`2141129f`](https://github.com/PrismJS/prism/commit/2141129f)
    * Added `in` keyword ([#1918](https://github.com/PrismJS/prism/issues/1918)) [`feb3187f`](https://github.com/PrismJS/prism/commit/feb3187f)
* __LaTeX__
    * Added TeX and ConTeXt alias ([#1915](https://github.com/PrismJS/prism/issues/1915)) [`5ad58a75`](https://github.com/PrismJS/prism/commit/5ad58a75)
    * Added support for $$ equations [`6f53f749`](https://github.com/PrismJS/prism/commit/6f53f749)
* __Markdown__
    * Markdown: Added support for auto-loading code block languages ([#1898](https://github.com/PrismJS/prism/issues/1898)) [`05823e88`](https://github.com/PrismJS/prism/commit/05823e88)
    * Improved URLs ([#1955](https://github.com/PrismJS/prism/issues/1955)) [`b9ec6fd8`](https://github.com/PrismJS/prism/commit/b9ec6fd8)
    * Added support for nested bold and italic expressions ([#1897](https://github.com/PrismJS/prism/issues/1897)) [`11903721`](https://github.com/PrismJS/prism/commit/11903721)
    * Added support for tables ([#1848](https://github.com/PrismJS/prism/issues/1848)) [`cedb8e84`](https://github.com/PrismJS/prism/commit/cedb8e84)
* __Perl__
    * Added `return` keyword ([#1943](https://github.com/PrismJS/prism/issues/1943)) [`2f39de97`](https://github.com/PrismJS/prism/commit/2f39de97)
* __Protocol Buffers__
    * Full support for PB2 and PB3 syntax + numerous other improvements ([#1948](https://github.com/PrismJS/prism/issues/1948)) [`de10bd1d`](https://github.com/PrismJS/prism/commit/de10bd1d)
* __reST (reStructuredText)__
    * Fixed exponentially backtracking pattern ([#1986](https://github.com/PrismJS/prism/issues/1986)) [`8b5d67a3`](https://github.com/PrismJS/prism/commit/8b5d67a3)
* __Rust__
    * Added `async` and `await` keywords. ([#1882](https://github.com/PrismJS/prism/issues/1882)) [`4faa3314`](https://github.com/PrismJS/prism/commit/4faa3314)
    * Improved punctuation and operators ([#1839](https://github.com/PrismJS/prism/issues/1839)) [`a42b1557`](https://github.com/PrismJS/prism/commit/a42b1557)
* __Sass (Scss)__
    * Fixed exponential url pattern ([#1938](https://github.com/PrismJS/prism/issues/1938)) [`4b6b6e8b`](https://github.com/PrismJS/prism/commit/4b6b6e8b)
* __Scheme__
    * Added support for rational number literals ([#1964](https://github.com/PrismJS/prism/issues/1964)) [`e8811d22`](https://github.com/PrismJS/prism/commit/e8811d22)
* __TOML__
    * Minor improvements ([#1917](https://github.com/PrismJS/prism/issues/1917)) [`3e181241`](https://github.com/PrismJS/prism/commit/3e181241)
* __Visual Basic__
    * Added support for interpolation strings ([#1971](https://github.com/PrismJS/prism/issues/1971)) [`4a2c90c1`](https://github.com/PrismJS/prism/commit/4a2c90c1)

### Updated plugins

* __Autolinker__
    * Improved component path guessing ([#1928](https://github.com/PrismJS/prism/issues/1928)) [`452d5c7d`](https://github.com/PrismJS/prism/commit/452d5c7d)
    * Improved URL regex ([#1842](https://github.com/PrismJS/prism/issues/1842)) [`eb28b62b`](https://github.com/PrismJS/prism/commit/eb28b62b)
* __Autoloader__
    * Fixed and improved callbacks ([#1935](https://github.com/PrismJS/prism/issues/1935)) [`b19f512f`](https://github.com/PrismJS/prism/commit/b19f512f)
* __Command Line__
    * Fix for uncaught errors for empty 'commandLine' object. ([#1862](https://github.com/PrismJS/prism/issues/1862)) [`c24831b5`](https://github.com/PrismJS/prism/commit/c24831b5)
* __Copy to Clipboard Button__
    * Switch anchor to button ([#1926](https://github.com/PrismJS/prism/issues/1926)) [`79880197`](https://github.com/PrismJS/prism/commit/79880197)
* __Custom Class__
    * Added mapper functions for language specific transformations ([#1873](https://github.com/PrismJS/prism/issues/1873)) [`acceb3b5`](https://github.com/PrismJS/prism/commit/acceb3b5)
* __Line Highlight__
    * Batching DOM read/writes to avoid reflows ([#1865](https://github.com/PrismJS/prism/issues/1865)) [`632ce00c`](https://github.com/PrismJS/prism/commit/632ce00c)
* __Toolbar__
    * Added `className` option for toolbar items ([#1951](https://github.com/PrismJS/prism/issues/1951)) [`5ab28bbe`](https://github.com/PrismJS/prism/commit/5ab28bbe)
    * Set opacity to 1 when focus is within ([#1927](https://github.com/PrismJS/prism/issues/1927)) [`0b1662dd`](https://github.com/PrismJS/prism/commit/0b1662dd)

### Updated themes

* __Funky__
    * Fixed typo ([#1960](https://github.com/PrismJS/prism/issues/1960)) [`7d056591`](https://github.com/PrismJS/prism/commit/7d056591)

### Other

* README: Added npm downloads badge ([#1934](https://github.com/PrismJS/prism/issues/1934)) [`d673d701`](https://github.com/PrismJS/prism/commit/d673d701)
* README: Minor changes ([#1857](https://github.com/PrismJS/prism/issues/1857)) [`77e403cb`](https://github.com/PrismJS/prism/commit/77e403cb)
* Clearer description for the highlighting bug report template ([#1850](https://github.com/PrismJS/prism/issues/1850)) [`2f9c9261`](https://github.com/PrismJS/prism/commit/2f9c9261)
* More language examples ([#1917](https://github.com/PrismJS/prism/issues/1917)) [`3e181241`](https://github.com/PrismJS/prism/commit/3e181241)
* __Core__
    * Removed `env.elements` from `before-highlightall` hook ([#1968](https://github.com/PrismJS/prism/issues/1968)) [`9d9e2ca4`](https://github.com/PrismJS/prism/commit/9d9e2ca4)
    * Made `language-none` the default language ([#1858](https://github.com/PrismJS/prism/issues/1858)) [`fd691c52`](https://github.com/PrismJS/prism/commit/fd691c52)
    * Removed `parent` from the `wrap` hook's environment ([#1837](https://github.com/PrismJS/prism/issues/1837)) [`65a4e894`](https://github.com/PrismJS/prism/commit/65a4e894)
* __Infrastructure__
    * gulp: Split `gulpfile.js` and expanded `changes` task ([#1835](https://github.com/PrismJS/prism/issues/1835)) [`033c5ad8`](https://github.com/PrismJS/prism/commit/033c5ad8)
    * gulp: JSON formatting for partly generated files ([#1933](https://github.com/PrismJS/prism/issues/1933)) [`d4373f3a`](https://github.com/PrismJS/prism/commit/d4373f3a)
    * gulp: Use `async` functions & drop testing on Node v6 ([#1783](https://github.com/PrismJS/prism/issues/1783)) [`0dd44d53`](https://github.com/PrismJS/prism/commit/0dd44d53)
    * Tests: `lookbehind` test for patterns ([#1890](https://github.com/PrismJS/prism/issues/1890)) [`3ba786cd`](https://github.com/PrismJS/prism/commit/3ba786cd)
    * Tests: Added test for empty regexes ([#1847](https://github.com/PrismJS/prism/issues/1847)) [`c1e6a7fd`](https://github.com/PrismJS/prism/commit/c1e6a7fd)
* __Website__
    * Added tutorial for using PrismJS with React ([#1979](https://github.com/PrismJS/prism/issues/1979)) [`f1e16c7b`](https://github.com/PrismJS/prism/commit/f1e16c7b)
    * Update footer's GitHub repository URL and capitalisation of "GitHub" ([#1983](https://github.com/PrismJS/prism/issues/1983)) [`bab744a6`](https://github.com/PrismJS/prism/commit/bab744a6)
    * Added known failures page ([#1876](https://github.com/PrismJS/prism/issues/1876)) [`36a5fa0e`](https://github.com/PrismJS/prism/commit/36a5fa0e)
    * Added basic usage for CDNs ([#1924](https://github.com/PrismJS/prism/issues/1924)) [`922ec555`](https://github.com/PrismJS/prism/commit/922ec555)
    * New tutorial for Drupal ([#1859](https://github.com/PrismJS/prism/issues/1859)) [`d2089d83`](https://github.com/PrismJS/prism/commit/d2089d83)
    * Updated website page styles to not interfere with themes ([#1952](https://github.com/PrismJS/prism/issues/1952)) [`b6543853`](https://github.com/PrismJS/prism/commit/b6543853)
    * Download page: Improved performance for Chromium-based browsers ([#1907](https://github.com/PrismJS/prism/issues/1907)) [`11f18e36`](https://github.com/PrismJS/prism/commit/11f18e36)
    * Download page: Fixed Edge's word wrap ([#1920](https://github.com/PrismJS/prism/issues/1920)) [`5d191b92`](https://github.com/PrismJS/prism/commit/5d191b92)
    * Examples page: Minor improvements ([#1919](https://github.com/PrismJS/prism/issues/1919)) [`a16d4a25`](https://github.com/PrismJS/prism/commit/a16d4a25)
    * Extending page: Fixed typo + new alias section ([#1949](https://github.com/PrismJS/prism/issues/1949)) [`24c8e717`](https://github.com/PrismJS/prism/commit/24c8e717)
    * Extending page: Added "Creating a new language definition" section ([#1925](https://github.com/PrismJS/prism/issues/1925)) [`ddf81233`](https://github.com/PrismJS/prism/commit/ddf81233)
    * Test page: Use `prism-core.js` instead of `prism.js` ([#1908](https://github.com/PrismJS/prism/issues/1908)) [`0853e694`](https://github.com/PrismJS/prism/commit/0853e694)
    * Copy to clipboard: Fixed typo ([#1869](https://github.com/PrismJS/prism/issues/1869)) [`59d4323f`](https://github.com/PrismJS/prism/commit/59d4323f)
    * JSONP Highlight: Fixed examples ([#1877](https://github.com/PrismJS/prism/issues/1877)) [`f8ae465d`](https://github.com/PrismJS/prism/commit/f8ae465d)
    * Line numbers: Fixed typo on webpage ([#1838](https://github.com/PrismJS/prism/issues/1838)) [`0f16eb87`](https://github.com/PrismJS/prism/commit/0f16eb87)

## 1.16.0 (2019-03-24)

### New components

* __ANBF__ ([#1753](https://github.com/PrismJS/prism/issues/1753)) [`6d98f0e7`](https://github.com/PrismJS/prism/commit/6d98f0e7)
* __BNF__ & __RBNF__ ([#1754](https://github.com/PrismJS/prism/issues/1754)) [`1df96c55`](https://github.com/PrismJS/prism/commit/1df96c55)
* __CIL__ ([#1593](https://github.com/PrismJS/prism/issues/1593)) [`38def334`](https://github.com/PrismJS/prism/commit/38def334)
* __CMake__ ([#1820](https://github.com/PrismJS/prism/issues/1820)) [`30779976`](https://github.com/PrismJS/prism/commit/30779976)
* __Doc comment__ ([#1541](https://github.com/PrismJS/prism/issues/1541)) [`493d19ef`](https://github.com/PrismJS/prism/commit/493d19ef)
* __EBNF__ ([#1756](https://github.com/PrismJS/prism/issues/1756)) [`13e1c97d`](https://github.com/PrismJS/prism/commit/13e1c97d)
* __EJS__ ([#1769](https://github.com/PrismJS/prism/issues/1769)) [`c37c90df`](https://github.com/PrismJS/prism/commit/c37c90df)
* __G-code__ ([#1572](https://github.com/PrismJS/prism/issues/1572)) [`2288c25e`](https://github.com/PrismJS/prism/commit/2288c25e)
* __GameMaker Language__ ([#1551](https://github.com/PrismJS/prism/issues/1551)) [`e529edd8`](https://github.com/PrismJS/prism/commit/e529edd8)
* __HCL__ ([#1594](https://github.com/PrismJS/prism/issues/1594)) [`c939df8e`](https://github.com/PrismJS/prism/commit/c939df8e)
* __Java stack trace__ ([#1520](https://github.com/PrismJS/prism/issues/1520)) [`4a8219a4`](https://github.com/PrismJS/prism/commit/4a8219a4)
* __JavaScript Extras__ ([#1743](https://github.com/PrismJS/prism/issues/1743)) [`bb628606`](https://github.com/PrismJS/prism/commit/bb628606)
* __JSON5__ ([#1744](https://github.com/PrismJS/prism/issues/1744)) [`64dc049d`](https://github.com/PrismJS/prism/commit/64dc049d)
* __N1QL__ ([#1620](https://github.com/PrismJS/prism/issues/1620)) [`7def8f5c`](https://github.com/PrismJS/prism/commit/7def8f5c)
* __Nand To Tetris HDL__ ([#1710](https://github.com/PrismJS/prism/issues/1710)) [`b94b56c1`](https://github.com/PrismJS/prism/commit/b94b56c1)
* __Regex__ ([#1682](https://github.com/PrismJS/prism/issues/1682)) [`571704cb`](https://github.com/PrismJS/prism/commit/571704cb)
* __T4__ ([#1699](https://github.com/PrismJS/prism/issues/1699)) [`16f2ad06`](https://github.com/PrismJS/prism/commit/16f2ad06)
* __TOML__ ([#1488](https://github.com/PrismJS/prism/issues/1488)) [`5b6ad70d`](https://github.com/PrismJS/prism/commit/5b6ad70d)
* __Vala__ ([#1658](https://github.com/PrismJS/prism/issues/1658)) [`b48c012c`](https://github.com/PrismJS/prism/commit/b48c012c)

### Updated components

* Fixed dependencies of Pug and Pure ([#1759](https://github.com/PrismJS/prism/issues/1759)) [`c9a32674`](https://github.com/PrismJS/prism/commit/c9a32674)
* Add file extensions support for major languages ([#1478](https://github.com/PrismJS/prism/issues/1478)) [`0c8f6504`](https://github.com/PrismJS/prism/commit/0c8f6504)
* Fixed patterns which can match the empty string ([#1775](https://github.com/PrismJS/prism/issues/1775)) [`86dd3e42`](https://github.com/PrismJS/prism/commit/86dd3e42)
* More variables for better code compression ([#1489](https://github.com/PrismJS/prism/issues/1489)) [`bc53e093`](https://github.com/PrismJS/prism/commit/bc53e093)
* Added missing aliases ([#1830](https://github.com/PrismJS/prism/issues/1830)) [`8d28c74c`](https://github.com/PrismJS/prism/commit/8d28c74c)
* Replaced all occurrences of `new RegExp` with `RegExp` ([#1493](https://github.com/PrismJS/prism/issues/1493)) [`44fed4d3`](https://github.com/PrismJS/prism/commit/44fed4d3)
* Added missing aliases to components.json ([#1503](https://github.com/PrismJS/prism/issues/1503)) [`2fb66e04`](https://github.com/PrismJS/prism/commit/2fb66e04)
* __Apacheconf__
	* Apache config: Minor improvements + new keyword ([#1823](https://github.com/PrismJS/prism/issues/1823)) [`a91be7b2`](https://github.com/PrismJS/prism/commit/a91be7b2)
* __AsciiDoc__
	* Added `adoc` alias for AsciiDoc ([#1685](https://github.com/PrismJS/prism/issues/1685)) [`88434f7a`](https://github.com/PrismJS/prism/commit/88434f7a)
* __Bash__
	* Add additional commands to bash ([#1577](https://github.com/PrismJS/prism/issues/1577)) [`a2230c38`](https://github.com/PrismJS/prism/commit/a2230c38)
	* Added `yarn add` to bash functions ([#1731](https://github.com/PrismJS/prism/issues/1731)) [`3a32cb75`](https://github.com/PrismJS/prism/commit/3a32cb75)
	* Added `pnpm` function to Bash ([#1734](https://github.com/PrismJS/prism/issues/1734)) [`fccfb98d`](https://github.com/PrismJS/prism/commit/fccfb98d)
* __Batch__
	* Remove batch's shell alias ([#1543](https://github.com/PrismJS/prism/issues/1543)) [`7155e60f`](https://github.com/PrismJS/prism/commit/7155e60f)
* __C__
	* Improve C language ([#1697](https://github.com/PrismJS/prism/issues/1697)) [`7eccea5c`](https://github.com/PrismJS/prism/commit/7eccea5c)
* __C-like__
	* Simplify function pattern of C-like language ([#1552](https://github.com/PrismJS/prism/issues/1552)) [`b520e1b6`](https://github.com/PrismJS/prism/commit/b520e1b6)
* __C/C++/Java__
	* Operator fixes ([#1528](https://github.com/PrismJS/prism/issues/1528)) [`7af8f8be`](https://github.com/PrismJS/prism/commit/7af8f8be)
* __C#__
	* Improvements to C# operator and punctuation ([#1532](https://github.com/PrismJS/prism/issues/1532)) [`3b1e0916`](https://github.com/PrismJS/prism/commit/3b1e0916)
* __CSS__
	* Fix tokenizing !important ([#1585](https://github.com/PrismJS/prism/issues/1585)) [`c1d6cb85`](https://github.com/PrismJS/prism/commit/c1d6cb85)
	* Added the comma to the list of CSS punctuation [`7ea2ff28`](https://github.com/PrismJS/prism/commit/7ea2ff28)
	* CSS: Comma punctuation ([#1632](https://github.com/PrismJS/prism/issues/1632)) [`1b812386`](https://github.com/PrismJS/prism/commit/1b812386)
	* Reuse CSS selector pattern in CSS Extras ([#1637](https://github.com/PrismJS/prism/issues/1637)) [`e2f2fd19`](https://github.com/PrismJS/prism/commit/e2f2fd19)
	* Fixed CSS extra variable ([#1649](https://github.com/PrismJS/prism/issues/1649)) [`9de47d3a`](https://github.com/PrismJS/prism/commit/9de47d3a)
	* Identify CSS units and variables ([#1450](https://github.com/PrismJS/prism/issues/1450)) [`5fcee966`](https://github.com/PrismJS/prism/commit/5fcee966)
	* Allow multiline CSS at-rules ([#1676](https://github.com/PrismJS/prism/issues/1676)) [`4f6f3c7d`](https://github.com/PrismJS/prism/commit/4f6f3c7d)
	* CSS: Highlight attribute selector ([#1671](https://github.com/PrismJS/prism/issues/1671)) [`245b59d4`](https://github.com/PrismJS/prism/commit/245b59d4)
	* CSS: Selectors can contain any string ([#1638](https://github.com/PrismJS/prism/issues/1638)) [`a2d445d0`](https://github.com/PrismJS/prism/commit/a2d445d0)
	* CSS extras: Highlighting for pseudo class arguments ([#1650](https://github.com/PrismJS/prism/issues/1650)) [`70a40414`](https://github.com/PrismJS/prism/commit/70a40414)
* __Django__
	* Django/Jinja2 improvements ([#1800](https://github.com/PrismJS/prism/issues/1800)) [`f2467488`](https://github.com/PrismJS/prism/commit/f2467488)
* __F#__
	* Chars can only contain one character ([#1570](https://github.com/PrismJS/prism/issues/1570)) [`f96b083a`](https://github.com/PrismJS/prism/commit/f96b083a)
	* Improve F# ([#1573](https://github.com/PrismJS/prism/issues/1573)) [`00bfc969`](https://github.com/PrismJS/prism/commit/00bfc969)
* __GraphQL__
	* Improved field highlighting for GraphQL ([#1711](https://github.com/PrismJS/prism/issues/1711)) [`44aeffb9`](https://github.com/PrismJS/prism/commit/44aeffb9)
	* Added GraphQL improvements and tests ([#1788](https://github.com/PrismJS/prism/issues/1788)) [`b2298b12`](https://github.com/PrismJS/prism/commit/b2298b12)
* __Haskell__
	* Added `hs` alias for Haskell ([#1831](https://github.com/PrismJS/prism/issues/1831)) [`64baec3c`](https://github.com/PrismJS/prism/commit/64baec3c)
* __HTTP__
	* Improved HTTP content highlighting ([#1598](https://github.com/PrismJS/prism/issues/1598)) [`1b75da90`](https://github.com/PrismJS/prism/commit/1b75da90)
* __Ini__
	* Add support for # comments to INI language ([#1730](https://github.com/PrismJS/prism/issues/1730)) [`baf6bb0c`](https://github.com/PrismJS/prism/commit/baf6bb0c)
* __Java__
	* Add Java 10 support ([#1549](https://github.com/PrismJS/prism/issues/1549)) [`8c981a22`](https://github.com/PrismJS/prism/commit/8c981a22)
	* Added module keywords to Java. ([#1655](https://github.com/PrismJS/prism/issues/1655)) [`6e250a5f`](https://github.com/PrismJS/prism/commit/6e250a5f)
	* Improve Java ([#1474](https://github.com/PrismJS/prism/issues/1474)) [`81bd8f0b`](https://github.com/PrismJS/prism/commit/81bd8f0b)
* __JavaScript__
	* Fix regex for `catch` and `finally` ([#1527](https://github.com/PrismJS/prism/issues/1527)) [`ebd1b9a6`](https://github.com/PrismJS/prism/commit/ebd1b9a6)
	* Highlighting of supposed classes and functions ([#1482](https://github.com/PrismJS/prism/issues/1482)) [`c40f6047`](https://github.com/PrismJS/prism/commit/c40f6047)
	* Added support for JS BigInt literals ([#1542](https://github.com/PrismJS/prism/issues/1542)) [`2b62e57b`](https://github.com/PrismJS/prism/commit/2b62e57b)
	* Fixed lowercase supposed class names ([#1544](https://github.com/PrismJS/prism/issues/1544)) [`a47c05ad`](https://github.com/PrismJS/prism/commit/a47c05ad)
	* Fixes regex for JS examples ([#1591](https://github.com/PrismJS/prism/issues/1591)) [`b41fb8f1`](https://github.com/PrismJS/prism/commit/b41fb8f1)
	* Improve regex detection in JS ([#1473](https://github.com/PrismJS/prism/issues/1473)) [`2a4758ab`](https://github.com/PrismJS/prism/commit/2a4758ab)
	* Identify JavaScript function parameters ([#1446](https://github.com/PrismJS/prism/issues/1446)) [`0cc8c56a`](https://github.com/PrismJS/prism/commit/0cc8c56a)
	* Improved JavaScript parameter recognization ([#1722](https://github.com/PrismJS/prism/issues/1722)) [`57a92035`](https://github.com/PrismJS/prism/commit/57a92035)
	* Make `undefined` a keyword in JS ([#1740](https://github.com/PrismJS/prism/issues/1740)) [`d9fa29a8`](https://github.com/PrismJS/prism/commit/d9fa29a8)
	* Fix `function-variable` in JS ([#1739](https://github.com/PrismJS/prism/issues/1739)) [`bfbea4d6`](https://github.com/PrismJS/prism/commit/bfbea4d6)
	* Improved JS constant pattern ([#1737](https://github.com/PrismJS/prism/issues/1737)) [`7bcec584`](https://github.com/PrismJS/prism/commit/7bcec584)
	* Improved JS function pattern ([#1736](https://github.com/PrismJS/prism/issues/1736)) [`8378ac83`](https://github.com/PrismJS/prism/commit/8378ac83)
	* JS: Fixed variables named "async" ([#1738](https://github.com/PrismJS/prism/issues/1738)) [`3560c643`](https://github.com/PrismJS/prism/commit/3560c643)
	* JS: Keyword fix ([#1808](https://github.com/PrismJS/prism/issues/1808)) [`f2d8e1c7`](https://github.com/PrismJS/prism/commit/f2d8e1c7)
* __JSON__ / __JSONP__
	* Fix bugs in JSON language ([#1479](https://github.com/PrismJS/prism/issues/1479)) [`74fe81c6`](https://github.com/PrismJS/prism/commit/74fe81c6)
	* Adds support for comments in JSON ([#1595](https://github.com/PrismJS/prism/issues/1595)) [`8720b3e6`](https://github.com/PrismJS/prism/commit/8720b3e6)
	* Cleaned up JSON ([#1596](https://github.com/PrismJS/prism/issues/1596)) [`da474c77`](https://github.com/PrismJS/prism/commit/da474c77)
	* Added `keyword` alias to JSON's `null` ([#1733](https://github.com/PrismJS/prism/issues/1733)) [`eee06649`](https://github.com/PrismJS/prism/commit/eee06649)
	* Fix JSONP support ([#1745](https://github.com/PrismJS/prism/issues/1745)) [`b5041cf9`](https://github.com/PrismJS/prism/commit/b5041cf9)
	* Fixed JSON/JSONP examples ([#1765](https://github.com/PrismJS/prism/issues/1765)) [`ae4842db`](https://github.com/PrismJS/prism/commit/ae4842db)
* __JSX__
	* React component tags are styled as classes in JSX ([#1519](https://github.com/PrismJS/prism/issues/1519)) [`3e1a9a3d`](https://github.com/PrismJS/prism/commit/3e1a9a3d)
	* Support JSX/TSX class-name with dot ([#1725](https://github.com/PrismJS/prism/issues/1725)) [`4362e42c`](https://github.com/PrismJS/prism/commit/4362e42c)
* __Less__
	* Remove useless insertBefore in LESS ([#1629](https://github.com/PrismJS/prism/issues/1629)) [`86d31793`](https://github.com/PrismJS/prism/commit/86d31793)
* __Lisp__
	* Fix Lisp exponential string pattern ([#1763](https://github.com/PrismJS/prism/issues/1763)) [`5bd182c0`](https://github.com/PrismJS/prism/commit/5bd182c0))
* __Markdown__
	* Added strike support to markdown ([#1563](https://github.com/PrismJS/prism/issues/1563)) [`9d2fddc2`](https://github.com/PrismJS/prism/commit/9d2fddc2)
	* Fixed Markdown headers ([#1557](https://github.com/PrismJS/prism/issues/1557)) [`c6584290`](https://github.com/PrismJS/prism/commit/c6584290)
	* Add support for code blocks in Markdown ([#1562](https://github.com/PrismJS/prism/issues/1562)) [`b0717e70`](https://github.com/PrismJS/prism/commit/b0717e70)
	* Markdown: The 'md' alias is now recognized by hooks ([#1771](https://github.com/PrismJS/prism/issues/1771)) [`8ca3d65b`](https://github.com/PrismJS/prism/commit/8ca3d65b)
* __Markup__
	* Decouple XML from Markup ([#1603](https://github.com/PrismJS/prism/issues/1603)) [`0030a4ef`](https://github.com/PrismJS/prism/commit/0030a4ef)
	* Fix for markup attributes ([#1752](https://github.com/PrismJS/prism/issues/1752)) [`c3862a24`](https://github.com/PrismJS/prism/commit/c3862a24)
	* Markup: Added support for CSS and JS inside of CDATAs ([#1660](https://github.com/PrismJS/prism/issues/1660)) [`57127701`](https://github.com/PrismJS/prism/commit/57127701)
	* Markup `addInline` improvements ([#1798](https://github.com/PrismJS/prism/issues/1798)) [`af67c32e`](https://github.com/PrismJS/prism/commit/af67c32e)
* __Markup Templating__
	* Markup-templating improvements ([#1653](https://github.com/PrismJS/prism/issues/1653)) [`b62e282b`](https://github.com/PrismJS/prism/commit/b62e282b)
* __nginx__
	* Add new keywords to nginx ([#1587](https://github.com/PrismJS/prism/issues/1587)) [`0d73f7f5`](https://github.com/PrismJS/prism/commit/0d73f7f5)
* __PHP__
	* Update PHP keywords ([#1690](https://github.com/PrismJS/prism/issues/1690)) [`55fb0f8e`](https://github.com/PrismJS/prism/commit/55fb0f8e)
	* Improve recognition of constants in PHP ([#1688](https://github.com/PrismJS/prism/issues/1688)) [`f1026b4b`](https://github.com/PrismJS/prism/commit/f1026b4b)
	* Made false, true, and null constants in PHP ([#1694](https://github.com/PrismJS/prism/issues/1694)) [`439e3bd7`](https://github.com/PrismJS/prism/commit/439e3bd7)
	* PHP: Fixed closing tag issue ([#1652](https://github.com/PrismJS/prism/issues/1652)) [`289ddd9b`](https://github.com/PrismJS/prism/commit/289ddd9b)
* __Python__
	* Operator keywords are now keywords ([#1617](https://github.com/PrismJS/prism/issues/1617)) [`1d1fb800`](https://github.com/PrismJS/prism/commit/1d1fb800)
	* Add decorator support to Python ([#1639](https://github.com/PrismJS/prism/issues/1639)) [`2577b6e6`](https://github.com/PrismJS/prism/commit/2577b6e6)
	* Improvements to Python F-strings and string prefixes ([#1642](https://github.com/PrismJS/prism/issues/1642)) [`a69c2b62`](https://github.com/PrismJS/prism/commit/a69c2b62)
* __Reason__
	* Added additional operators to Reason ([#1648](https://github.com/PrismJS/prism/issues/1648)) [`8b1bb469`](https://github.com/PrismJS/prism/commit/8b1bb469)
* __Ruby__
	* Consistent Ruby method highlighting ([#1523](https://github.com/PrismJS/prism/issues/1523)) [`72775919`](https://github.com/PrismJS/prism/commit/72775919)
	* Ruby/ERB: Fixed block comments ([#1768](https://github.com/PrismJS/prism/issues/1768)) [`c805f859`](https://github.com/PrismJS/prism/commit/c805f859)
* __Rust__
	* Add missing keywords ([#1634](https://github.com/PrismJS/prism/issues/1634)) [`3590edde`](https://github.com/PrismJS/prism/commit/3590edde)
* __SAS__
	* Added new SAS keywords ([#1784](https://github.com/PrismJS/prism/issues/1784)) [`3b396ef5`](https://github.com/PrismJS/prism/commit/3b396ef5)
* __Scheme__
	* Fix function without arguments in scheme language ([#1463](https://github.com/PrismJS/prism/issues/1463)) [`12a827e7`](https://github.com/PrismJS/prism/commit/12a827e7)
	* Scheme improvements ([#1556](https://github.com/PrismJS/prism/issues/1556)) [`225dd3f7`](https://github.com/PrismJS/prism/commit/225dd3f7)
	* Fixed operator-like functions in Scheme ([#1467](https://github.com/PrismJS/prism/issues/1467)) [`f8c8add2`](https://github.com/PrismJS/prism/commit/f8c8add2)
	* Scheme: Minor improvements ([#1814](https://github.com/PrismJS/prism/issues/1814)) [`191830f2`](https://github.com/PrismJS/prism/commit/191830f2)
* __SCSS__
	* Fixed that selector pattern can take exponential time ([#1499](https://github.com/PrismJS/prism/issues/1499)) [`0f75d9d4`](https://github.com/PrismJS/prism/commit/0f75d9d4)
	* Move SCSS `property` definition ([#1633](https://github.com/PrismJS/prism/issues/1633)) [`0536fb14`](https://github.com/PrismJS/prism/commit/0536fb14)
	* Add `keyword` alias for SCSS' `null` ([#1735](https://github.com/PrismJS/prism/issues/1735)) [`bd0378f0`](https://github.com/PrismJS/prism/commit/bd0378f0)
* __Smalltalk__
	* Allowed empty strings and comments ([#1747](https://github.com/PrismJS/prism/issues/1747)) [`5fd7577a`](https://github.com/PrismJS/prism/commit/5fd7577a)
* __Smarty__
	* Removed useless `insertBefore` call in Smarty ([#1677](https://github.com/PrismJS/prism/issues/1677)) [`bc49c361`](https://github.com/PrismJS/prism/commit/bc49c361)
* __SQL__
	* Added support for quote escapes to SQL strings ([#1500](https://github.com/PrismJS/prism/issues/1500)) [`a59a7926`](https://github.com/PrismJS/prism/commit/a59a7926)
	* SQL Quoted variables are now greedy ([#1510](https://github.com/PrismJS/prism/issues/1510)) [`42d119a2`](https://github.com/PrismJS/prism/commit/42d119a2)
* __TypeScript__
	* Enhance definitions in TypeScript component ([#1522](https://github.com/PrismJS/prism/issues/1522)) [`11695629`](https://github.com/PrismJS/prism/commit/11695629)
* __YAML__
	* Allow YAML strings to have trailing comments ([#1602](https://github.com/PrismJS/prism/issues/1602)) [`1c5f28a9`](https://github.com/PrismJS/prism/commit/1c5f28a9)

### Updated plugins

* Better class name detection for plugins ([#1772](https://github.com/PrismJS/prism/issues/1772)) [`c9762c6f`](https://github.com/PrismJS/prism/commit/c9762c6f)
* __Autolinker__
	* Fix Autolinker url-decoding all tokens ([#1723](https://github.com/PrismJS/prism/issues/1723)) [`8cf20d49`](https://github.com/PrismJS/prism/commit/8cf20d49)
* __Autoloader__
	* Resolved variable name clash ([#1568](https://github.com/PrismJS/prism/issues/1568)) [`bfa5a8d9`](https://github.com/PrismJS/prism/commit/bfa5a8d9)
	* Autoloader: Fixed the directory of scripts ([#1828](https://github.com/PrismJS/prism/issues/1828)) [`fd4c764f`](https://github.com/PrismJS/prism/commit/fd4c764f)
	* Autoloader: Added support for aliases ([#1829](https://github.com/PrismJS/prism/issues/1829)) [`52889b5b`](https://github.com/PrismJS/prism/commit/52889b5b)
* __Command Line__
	* Fixed class regex for Command Line plugin ([#1566](https://github.com/PrismJS/prism/issues/1566)) [`9f6e5026`](https://github.com/PrismJS/prism/commit/9f6e5026)
* __File Highlight__
	* Prevent double-loading & add scope to File Highlight ([#1586](https://github.com/PrismJS/prism/issues/1586)) [`10239c14`](https://github.com/PrismJS/prism/commit/10239c14)
* __JSONP Highlight__
	* Cleanup JSONP highlight code ([#1674](https://github.com/PrismJS/prism/issues/1674)) [`28489698`](https://github.com/PrismJS/prism/commit/28489698)
	* Fix typos & other issues in JSONP docs ([#1672](https://github.com/PrismJS/prism/issues/1672)) [`cd058a91`](https://github.com/PrismJS/prism/commit/cd058a91)
	* JSONP highlight: Fixed minified adapter names ([#1793](https://github.com/PrismJS/prism/issues/1793)) [`5dd8f916`](https://github.com/PrismJS/prism/commit/5dd8f916)
* __Keep Markup__
	* Add unit tests to the Keep Markup plugin ([#1646](https://github.com/PrismJS/prism/issues/1646)) [`a944c418`](https://github.com/PrismJS/prism/commit/a944c418)
* __Line Numbers__
	* Added inheritance for the `line-numbers` class ([#1799](https://github.com/PrismJS/prism/issues/1799)) [`14be7489`](https://github.com/PrismJS/prism/commit/14be7489)
* __Previewers__
	* Fixed Previewers bug [#1496](https://github.com/PrismJS/prism/issues/1496) ([#1497](https://github.com/PrismJS/prism/issues/1497)) [`4b56f3c1`](https://github.com/PrismJS/prism/commit/4b56f3c1)
* __Show Invisibles__
	* Updated styles of show invisibles ([#1607](https://github.com/PrismJS/prism/issues/1607)) [`2ba62268`](https://github.com/PrismJS/prism/commit/2ba62268)
	* Corrected load order of Show Invisibles ([#1612](https://github.com/PrismJS/prism/issues/1612)) [`6e0c6e86`](https://github.com/PrismJS/prism/commit/6e0c6e86)
	* Show invisibles inside tokens ([#1610](https://github.com/PrismJS/prism/issues/1610)) [`1090b253`](https://github.com/PrismJS/prism/commit/1090b253)
* __Show Language__
	* Show Language plugin alias support and improvements ([#1683](https://github.com/PrismJS/prism/issues/1683)) [`4c66d72c`](https://github.com/PrismJS/prism/commit/4c66d72c)
* __Toolbar__
	* Toolbar: Minor improvements ([#1818](https://github.com/PrismJS/prism/issues/1818)) [`3ad47047`](https://github.com/PrismJS/prism/commit/3ad47047)

### Updated themes

* Normalized the font-size of pre and code ([#1791](https://github.com/PrismJS/prism/issues/1791)) [`878ef295`](https://github.com/PrismJS/prism/commit/878ef295)
* __Coy__
	* Correct typo ([#1508](https://github.com/PrismJS/prism/issues/1508)) [`c322fc80`](https://github.com/PrismJS/prism/commit/c322fc80)

### Other changes

* __Core__
	* `insertBefore` now correctly updates references ([#1531](https://github.com/PrismJS/prism/issues/1531)) [`9dfec340`](https://github.com/PrismJS/prism/commit/9dfec340)
	* Invoke `callback` after `after-highlight` hook ([#1588](https://github.com/PrismJS/prism/issues/1588)) [`bfbe4464`](https://github.com/PrismJS/prism/commit/bfbe4464)
	* Improve `Prism.util.type` performance ([#1545](https://github.com/PrismJS/prism/issues/1545)) [`2864fe24`](https://github.com/PrismJS/prism/commit/2864fe24)
	* Remove unused `insertBefore` overload ([#1631](https://github.com/PrismJS/prism/issues/1631)) [`39686e12`](https://github.com/PrismJS/prism/commit/39686e12)
	* Ignore duplicates in insertBefore ([#1628](https://github.com/PrismJS/prism/issues/1628)) [`d33d259c`](https://github.com/PrismJS/prism/commit/d33d259c)
	* Remove the Prism.tokenize language parameter ([#1654](https://github.com/PrismJS/prism/issues/1654)) [`fbf0b094`](https://github.com/PrismJS/prism/commit/fbf0b094)
	* Call `insert-before` hook properly ([#1709](https://github.com/PrismJS/prism/issues/1709)) [`393ab164`](https://github.com/PrismJS/prism/commit/393ab164)
	* Improved languages.DFS and util.clone ([#1506](https://github.com/PrismJS/prism/issues/1506)) [`152a68ef`](https://github.com/PrismJS/prism/commit/152a68ef)
	* Core: Avoid redeclaring variables in util.clone ([#1778](https://github.com/PrismJS/prism/issues/1778)) [`b06f532f`](https://github.com/PrismJS/prism/commit/b06f532f)
	* Made prism-core a little more editor friendly ([#1776](https://github.com/PrismJS/prism/issues/1776)) [`bac09f0a`](https://github.com/PrismJS/prism/commit/bac09f0a)
	* Applied Array.isArray ([#1804](https://github.com/PrismJS/prism/issues/1804)) [`11d0f75e`](https://github.com/PrismJS/prism/commit/11d0f75e)
* __Infrastructure__
	* Linkify changelog more + add missing PR references [`2a100db7`](https://github.com/PrismJS/prism/commit/2a100db7)
	* Set default indentation size ([#1516](https://github.com/PrismJS/prism/issues/1516)) [`e63d1597`](https://github.com/PrismJS/prism/commit/e63d1597)
	* Add travis repo badge to readme ([#1561](https://github.com/PrismJS/prism/issues/1561)) [`716923f4`](https://github.com/PrismJS/prism/commit/716923f4)
	* Update README.md ([#1553](https://github.com/PrismJS/prism/issues/1553)) [`6d1a2c61`](https://github.com/PrismJS/prism/commit/6d1a2c61)
	* Mention Prism Themes in README ([#1625](https://github.com/PrismJS/prism/issues/1625)) [`5db04656`](https://github.com/PrismJS/prism/commit/5db04656)
	* Fixed CHANGELOG.md ([#1707](https://github.com/PrismJS/prism/issues/1707)) [`b1f8a65d`](https://github.com/PrismJS/prism/commit/b1f8a65d) ([#1704](https://github.com/PrismJS/prism/issues/1704)) [`66d2104a`](https://github.com/PrismJS/prism/commit/66d2104a)
	* Change tested NodeJS versions ([#1651](https://github.com/PrismJS/prism/issues/1651)) [`6ec71e0b`](https://github.com/PrismJS/prism/commit/6ec71e0b)
	* Inline regex source with gulp ([#1537](https://github.com/PrismJS/prism/issues/1537)) [`e894fc89`](https://github.com/PrismJS/prism/commit/e894fc89) ([#1716](https://github.com/PrismJS/prism/issues/1716)) [`217a6ea4`](https://github.com/PrismJS/prism/commit/217a6ea4)
	* Improve gulp error messages with pump ([#1741](https://github.com/PrismJS/prism/issues/1741)) [`671f4ca0`](https://github.com/PrismJS/prism/commit/671f4ca0)
	* Update gulp to version 4.0.0 ([#1779](https://github.com/PrismJS/prism/issues/1779)) [`06627f6a`](https://github.com/PrismJS/prism/commit/06627f6a)
	* gulp: Refactoring ([#1780](https://github.com/PrismJS/prism/issues/1780)) [`6c9fe257`](https://github.com/PrismJS/prism/commit/6c9fe257)
	* npm: Updated all dependencies ([#1742](https://github.com/PrismJS/prism/issues/1742)) [`9d908d5a`](https://github.com/PrismJS/prism/commit/9d908d5a)
	* Tests: Pretty-printed token stream ([#1801](https://github.com/PrismJS/prism/issues/1801)) [`9ea6d600`](https://github.com/PrismJS/prism/commit/9ea6d600)
	* Refactored tests ([#1795](https://github.com/PrismJS/prism/issues/1795)) [`832a9643`](https://github.com/PrismJS/prism/commit/832a9643)
	* Added issue templates ([#1805](https://github.com/PrismJS/prism/issues/1805)) [`dedb475f`](https://github.com/PrismJS/prism/commit/dedb475f)
	* npm: Fixed `test` script ([#1809](https://github.com/PrismJS/prism/issues/1809)) [`bc649dfa`](https://github.com/PrismJS/prism/commit/bc649dfa)
	* Add command to generate CHANGELOG [`212666d3`](https://github.com/PrismJS/prism/commit/212666d3)
	* Name in composer.json set to lowercase ([#1824](https://github.com/PrismJS/prism/issues/1824)) [`4f78f1d6`](https://github.com/PrismJS/prism/commit/4f78f1d6)
	* Added alias tests ([#1832](https://github.com/PrismJS/prism/issues/1832)) [`5c1a6fb2`](https://github.com/PrismJS/prism/commit/5c1a6fb2)
	* Travis: Fail when changed files are detected ([#1819](https://github.com/PrismJS/prism/issues/1819)) [`66b44e3b`](https://github.com/PrismJS/prism/commit/66b44e3b)
	* Tests: Additional checks for Prism functions ([#1803](https://github.com/PrismJS/prism/issues/1803)) [`c3e74ea3`](https://github.com/PrismJS/prism/commit/c3e74ea3)
	* Adjusted .npmignore ([#1834](https://github.com/PrismJS/prism/issues/1834)) [`29a30c62`](https://github.com/PrismJS/prism/commit/29a30c62)
* __Website__
	* Add Python triple-quoted strings "known failure" ([#1449](https://github.com/PrismJS/prism/issues/1449)) [`334c7bca`](https://github.com/PrismJS/prism/commit/334c7bca)
	* Updated index.html to fix broken instructions ([#1462](https://github.com/PrismJS/prism/issues/1462)) [`7418dfdd`](https://github.com/PrismJS/prism/commit/7418dfdd)
	* Improve download page typography ([#1484](https://github.com/PrismJS/prism/issues/1484)) [`b1c2f4df`](https://github.com/PrismJS/prism/commit/b1c2f4df)
	* Fixed peer dependencies in download page ([#1491](https://github.com/PrismJS/prism/issues/1491)) [`9d15ff6e`](https://github.com/PrismJS/prism/commit/9d15ff6e)
	* Fixed empty link in extending ([#1507](https://github.com/PrismJS/prism/issues/1507)) [`74916d48`](https://github.com/PrismJS/prism/commit/74916d48)
	* Display language aliases ([#1626](https://github.com/PrismJS/prism/issues/1626)) [`654b527b`](https://github.com/PrismJS/prism/commit/654b527b)
	* Clean up Previewers' page ([#1630](https://github.com/PrismJS/prism/issues/1630)) [`b0d1823c`](https://github.com/PrismJS/prism/commit/b0d1823c)
	* Updated website table of contents styles ([#1681](https://github.com/PrismJS/prism/issues/1681)) [`efdd96c3`](https://github.com/PrismJS/prism/commit/efdd96c3)
	* Added new third-party tutorial for using Prism in Gutenberg ([#1701](https://github.com/PrismJS/prism/issues/1701)) [`ff9ccbe5`](https://github.com/PrismJS/prism/commit/ff9ccbe5)
	* Remove dead tutorial ([#1702](https://github.com/PrismJS/prism/issues/1702)) [`e2d3bc7e`](https://github.com/PrismJS/prism/commit/e2d3bc7e)
	* Fix downloads page fetching from GitHub([#1684](https://github.com/PrismJS/prism/issues/1684)) [`dbd3555e`](https://github.com/PrismJS/prism/commit/dbd3555e)
	* Remove parentheses from download page ([#1627](https://github.com/PrismJS/prism/issues/1627)) [`2ce0666d`](https://github.com/PrismJS/prism/commit/2ce0666d)
	* Line Numbers plugin instructions clarifications ([#1719](https://github.com/PrismJS/prism/issues/1719)) [`00f4f04f`](https://github.com/PrismJS/prism/commit/00f4f04f)
	* Fixed Toolbar plugin example ([#1726](https://github.com/PrismJS/prism/issues/1726)) [`5311ca32`](https://github.com/PrismJS/prism/commit/5311ca32)
	* Test page: Show tokens option ([#1757](https://github.com/PrismJS/prism/issues/1757)) [`729cb28b`](https://github.com/PrismJS/prism/commit/729cb28b)
	* Some encouragement for visitors of PrismJS.com to request new languages ([#1760](https://github.com/PrismJS/prism/issues/1760)) [`ea769e0b`](https://github.com/PrismJS/prism/commit/ea769e0b)
	* Docs: Added missing parameter ([#1774](https://github.com/PrismJS/prism/issues/1774)) [`18f2921d`](https://github.com/PrismJS/prism/commit/18f2921d)
	* More persistent test page ([#1529](https://github.com/PrismJS/prism/issues/1529)) [`3100fa31`](https://github.com/PrismJS/prism/commit/3100fa31)
	* Added scripts directory ([#1781](https://github.com/PrismJS/prism/issues/1781)) [`439ea1ee`](https://github.com/PrismJS/prism/commit/439ea1ee)
	* Fixed download page ([#1811](https://github.com/PrismJS/prism/issues/1811)) [`77c57446`](https://github.com/PrismJS/prism/commit/77c57446)

## 1.15.0 (2018-06-16)

### New components

* __Template Tookit 2__ ([#1418](https://github.com/PrismJS/prism/issues/1418)) [[`e063992`](https://github.com/PrismJS/prism/commit/e063992)]
* __XQuery__ ([#1411](https://github.com/PrismJS/prism/issues/1411)) [[`e326cb0`](https://github.com/PrismJS/prism/commit/e326cb0)]
* __TAP__ ([#1430](https://github.com/PrismJS/prism/issues/1430)) [[`8c2b71f`](https://github.com/PrismJS/prism/commit/8c2b71f)]

### Updated components

* __HTTP__
	* Absolute path is a valid request uri ([#1388](https://github.com/PrismJS/prism/issues/1388)) [[`f6e81cb`](https://github.com/PrismJS/prism/commit/f6e81cb)]
* __Kotlin__
	* Add keywords of Kotlin and modify it's number pattern. ([#1389](https://github.com/PrismJS/prism/issues/1389)) [[`1bf73b0`](https://github.com/PrismJS/prism/commit/1bf73b0)]
	* Add `typealias` keyword ([#1437](https://github.com/PrismJS/prism/issues/1437)) [[`a21fdee`](https://github.com/PrismJS/prism/commit/a21fdee)]
* __JavaScript__
	* Improve Regexp pattern [[`5b043cf`](https://github.com/PrismJS/prism/commit/5b043cf)]
	* Add support for one level of nesting inside template strings. Fix [#1397](https://github.com/PrismJS/prism/issues/1397) [[`db2d0eb`](https://github.com/PrismJS/prism/commit/db2d0eb)]
* __Elixir__
	* Elixir: Fix attributes consuming punctuation. Fix [#1392](https://github.com/PrismJS/prism/issues/1392) [[`dac0485`](https://github.com/PrismJS/prism/commit/dac0485)]
* __Bash__
	* Change reserved keyword reference ([#1396](https://github.com/PrismJS/prism/issues/1396)) [[`b94f01f`](https://github.com/PrismJS/prism/commit/b94f01f)]
* __PowerShell__
	* Allow for one level of nesting in expressions inside strings. Fix [#1407](https://github.com/PrismJS/prism/issues/1407) [[`9272d6f`](https://github.com/PrismJS/prism/commit/9272d6f)]
* __JSX__
	* Allow for two levels of nesting inside JSX tags. Fix [#1408](https://github.com/PrismJS/prism/issues/1408) [[`f1cd7c5`](https://github.com/PrismJS/prism/commit/f1cd7c5)]
	* Add support for fragments short syntax. Fix [#1421](https://github.com/PrismJS/prism/issues/1421) [[`38ce121`](https://github.com/PrismJS/prism/commit/38ce121)]
* __Pascal__
	* Add `objectpascal` as an alias to `pascal` ([#1426](https://github.com/PrismJS/prism/issues/1426)) [[`a0bfc84`](https://github.com/PrismJS/prism/commit/a0bfc84)]
* __Swift__
	* Fix Swift 'protocol' keyword ([#1440](https://github.com/PrismJS/prism/issues/1440)) [[`081e318`](https://github.com/PrismJS/prism/commit/081e318)]

### Updated plugins

* __File Highlight__
	* Fix issue causing the Download button to show up on every code blocks. [[`cd22499`](https://github.com/PrismJS/prism/commit/cd22499)]
	* Simplify lang regex on File Highlight plugin ([#1399](https://github.com/PrismJS/prism/issues/1399)) [[`7bc9a4a`](https://github.com/PrismJS/prism/commit/7bc9a4a)]
* __Show Language__
	* Don't process language if block language not set ([#1410](https://github.com/PrismJS/prism/issues/1410)) [[`c111869`](https://github.com/PrismJS/prism/commit/c111869)]
* __Autoloader__
	* ASP.NET should require C# [[`fa328bb`](https://github.com/PrismJS/prism/commit/fa328bb)]
* __Line Numbers__
	* Make line-numbers styles more specific ([#1434](https://github.com/PrismJS/prism/issues/1434), [#1435](https://github.com/PrismJS/prism/issues/1435)) [[`9ee4f54`](https://github.com/PrismJS/prism/commit/9ee4f54)]

### Updated themes

* Add .token.class-name to rest of themes ([#1360](https://github.com/PrismJS/prism/issues/1360)) [[`f356dfe`](https://github.com/PrismJS/prism/commit/f356dfe)]

### Other changes

* __Website__
	* Site now loads over HTTPS!
	* Use HTTPS / canonical URLs ([#1390](https://github.com/PrismJS/prism/issues/1390)) [[`95146c8`](https://github.com/PrismJS/prism/commit/95146c8)]
	* Added Angular tutorial link [[`c436a7c`](https://github.com/PrismJS/prism/commit/c436a7c)]
	* Use rel="icon" instead of rel="shortcut icon" ([#1398](https://github.com/PrismJS/prism/issues/1398)) [[`d95f8fb`](https://github.com/PrismJS/prism/commit/d95f8fb)]
	* Fix Download page not handling multiple dependencies when from Redownload URL [[`c2ff248`](https://github.com/PrismJS/prism/commit/c2ff248)]
	* Update documentation for node & webpack usage [[`1e99e96`](https://github.com/PrismJS/prism/commit/1e99e96)]
* Handle optional dependencies in `loadLanguages()` ([#1417](https://github.com/PrismJS/prism/issues/1417)) [[`84935ac`](https://github.com/PrismJS/prism/commit/84935ac)]
* Add Chinese translation [[`f2b1964`](https://github.com/PrismJS/prism/commit/f2b1964)]

## 1.14.0 (2018-04-11)

### New components
* __GEDCOM__ ([#1385](https://github.com/PrismJS/prism/issues/1385)) [[`6e0b20a`](https://github.com/PrismJS/prism/commit/6e0b20a)]
* __Lisp__ ([#1297](https://github.com/PrismJS/prism/issues/1297)) [[`46468f8`](https://github.com/PrismJS/prism/commit/46468f8)]
* __Markup Templating__ ([#1367](https://github.com/PrismJS/prism/issues/1367)) [[`5f9c078`](https://github.com/PrismJS/prism/commit/5f9c078)]
* __Soy__ ([#1387](https://github.com/PrismJS/prism/issues/1387)) [[`b4509bf`](https://github.com/PrismJS/prism/commit/b4509bf)]
* __Velocity__ ([#1378](https://github.com/PrismJS/prism/issues/1378)) [[`5a524f7`](https://github.com/PrismJS/prism/commit/5a524f7)]
* __Visual Basic__ ([#1382](https://github.com/PrismJS/prism/issues/1382)) [[`c673ec2`](https://github.com/PrismJS/prism/commit/c673ec2)]
* __WebAssembly__ ([#1386](https://github.com/PrismJS/prism/issues/1386)) [[`c28d8c5`](https://github.com/PrismJS/prism/commit/c28d8c5)]

### Updated components
* __Bash__:
	* Add curl to the list of common functions. Close [#1160](https://github.com/PrismJS/prism/issues/1160) [[`1bfc084`](https://github.com/PrismJS/prism/commit/1bfc084)]
* __C-like__:
	* Make single-line comments greedy. Fix [#1337](https://github.com/PrismJS/prism/issues/1337). Make sure [#1340](https://github.com/PrismJS/prism/issues/1340) stays fixed. [[`571f2c5`](https://github.com/PrismJS/prism/commit/571f2c5)]
* __C#__:
	* More generic class-name highlighting. Fix [#1365](https://github.com/PrismJS/prism/issues/1365) [[`a6837d2`](https://github.com/PrismJS/prism/commit/a6837d2)]
	* More specific class-name highlighting. Fix [#1371](https://github.com/PrismJS/prism/issues/1371) [[`0a95f69`](https://github.com/PrismJS/prism/commit/0a95f69)]
* __Eiffel__:
	* Fix verbatim strings. Fix [#1379](https://github.com/PrismJS/prism/issues/1379) [[`04df41b`](https://github.com/PrismJS/prism/commit/04df41b)]
* __Elixir__
	* Make regexps greedy, remove comment hacks. Update known failures and tests. [[`e93d61f`](https://github.com/PrismJS/prism/commit/e93d61f)]
* __ERB__:
	* Make highlighting work properly in NodeJS ([#1367](https://github.com/PrismJS/prism/issues/1367)) [[`5f9c078`](https://github.com/PrismJS/prism/commit/5f9c078)]
* __Fortran__:
	* Make single-line comments greedy. Update known failures and tests. [[`c083b78`](https://github.com/PrismJS/prism/commit/c083b78)]
* __Handlebars__:
	* Make highlighting work properly in NodeJS ([#1367](https://github.com/PrismJS/prism/issues/1367)) [[`5f9c078`](https://github.com/PrismJS/prism/commit/5f9c078)]
* __Java__:
	* Add support for generics. Fix [#1351](https://github.com/PrismJS/prism/issues/1351) [[`a5cf302`](https://github.com/PrismJS/prism/commit/a5cf302)]
* __JavaScript__:
	* Add support for constants. Fix [#1348](https://github.com/PrismJS/prism/issues/1348) [[`9084481`](https://github.com/PrismJS/prism/commit/9084481)]
	* Improve Regex matching [[`172d351`](https://github.com/PrismJS/prism/commit/172d351)]
* __JSX__:
	* Fix highlighting of empty objects. Fix [#1364](https://github.com/PrismJS/prism/issues/1364) [[`b26bbb8`](https://github.com/PrismJS/prism/commit/b26bbb8)]
* __Monkey__:
	* Make comments greedy. Update known failures and tests. [[`d7b2b43`](https://github.com/PrismJS/prism/commit/d7b2b43)]
* __PHP__:
	* Make highlighting work properly in NodeJS ([#1367](https://github.com/PrismJS/prism/issues/1367)) [[`5f9c078`](https://github.com/PrismJS/prism/commit/5f9c078)]
* __Puppet__:
	* Make heredoc, comments, regexps and strings greedy. Update known failures and tests. [[`0c139d1`](https://github.com/PrismJS/prism/commit/0c139d1)]
* __Q__:
	* Make comments greedy. Update known failures and tests. [[`a0f5081`](https://github.com/PrismJS/prism/commit/a0f5081)]
* __Ruby__:
	* Make multi-line comments greedy, remove single-line comment hack. Update known failures and tests. [[`b0e34fb`](https://github.com/PrismJS/prism/commit/b0e34fb)]
* __SQL__:
	* Add missing keywords. Fix [#1374](https://github.com/PrismJS/prism/issues/1374) [[`238b195`](https://github.com/PrismJS/prism/commit/238b195)]

### Updated plugins
* __Command Line__:
	* Command Line: Allow specifying output prefix using data-filter-output attribute. ([#856](https://github.com/PrismJS/prism/issues/856)) [[`094d546`](https://github.com/PrismJS/prism/commit/094d546)]
* __File Highlight__:
	* Add option to provide a download button, when used with the Toolbar plugin. Fix [#1030](https://github.com/PrismJS/prism/issues/1030) [[`9f22952`](https://github.com/PrismJS/prism/commit/9f22952)]

### Updated themes
* __Default__:
	* Reach AA contrast ratio level ([#1296](https://github.com/PrismJS/prism/issues/1296)) [[`8aea939`](https://github.com/PrismJS/prism/commit/8aea939)]

### Other changes
* Website: Remove broken third-party tutorials from homepage [[`0efd6e1`](https://github.com/PrismJS/prism/commit/0efd6e1)]
* Docs: Mention `loadLanguages()` function on homepage in the nodeJS section. Close [#972](https://github.com/PrismJS/prism/issues/972), close [#593](https://github.com/PrismJS/prism/issues/593) [[`4a14d20`](https://github.com/PrismJS/prism/commit/4a14d20)]
* Core: Greedy patterns should always be matched against the full string. Fix [#1355](https://github.com/PrismJS/prism/issues/1355) [[`294efaa`](https://github.com/PrismJS/prism/commit/294efaa)]
* Crystal: Update known failures. [[`e1d2d42`](https://github.com/PrismJS/prism/commit/e1d2d42)]
* D: Update known failures and tests. [[`13d9991`](https://github.com/PrismJS/prism/commit/13d9991)]
* Markdown: Update known failures. [[`5b6c76d`](https://github.com/PrismJS/prism/commit/5b6c76d)]
* Matlab: Update known failures. [[`259b6fc`](https://github.com/PrismJS/prism/commit/259b6fc)]
* Website: Remove non-existent anchor to failures. Reword on homepage to make is less misleading. [[`8c0911a`](https://github.com/PrismJS/prism/commit/8c0911a)]
* Website: Add link to Keep Markup plugin in FAQ [[`e8cb6d4`](https://github.com/PrismJS/prism/commit/e8cb6d4)]
* Test suite: Memory leak in vm.runInNewContext() seems fixed. Revert [[`9a4b6fa`](https://github.com/PrismJS/prism/commit/9a4b6fa)] to drastically improve tests execution time. [[`9bceece`](https://github.com/PrismJS/prism/commit/9bceece), [`7c7602b`](https://github.com/PrismJS/prism/commit/7c7602b)]
* Gulp: Don't minify `components/index.js` [[`689227b`](https://github.com/PrismJS/prism/commit/689227b)]
* Website: Fix theme selection on Download page, when theme is in query string or hash. [[`b4d3063`](https://github.com/PrismJS/prism/commit/b4d3063)]
* Update JSPM config to also include unminified components. Close [#995](https://github.com/PrismJS/prism/issues/995) [[`218f160`](https://github.com/PrismJS/prism/commit/218f160)]
* Core: Fix support for language alias containing dash `-` [[`659ea31`](https://github.com/PrismJS/prism/commit/659ea31)]

## 1.13.0 (2018-03-21)

### New components
* __ERB__ [[`e6213ac`](https://github.com/PrismJS/prism/commit/e6213ac)]
* __PL/SQL__ ([#1338](https://github.com/PrismJS/prism/issues/1338)) [[`3599e6a`](https://github.com/PrismJS/prism/commit/3599e6a)]

### Updated components
* __JSX__:
	* Add support for plain text inside tags ([#1357](https://github.com/PrismJS/prism/issues/1357)) [[`2b8321d`](https://github.com/PrismJS/prism/commit/2b8321d)]
* __Markup__:
	* Make tags greedy. Fix [#1356](https://github.com/PrismJS/prism/issues/1356) [[`af834be`](https://github.com/PrismJS/prism/commit/af834be)]
* __Powershell__:
	* Add lookbehind to fix function interpolation inside strings. Fix [#1361](https://github.com/PrismJS/prism/issues/1361) [[`d2c026e`](https://github.com/PrismJS/prism/commit/d2c026e)]
* __Rust__:
	* Improve char pattern so that lifetime annotations are matched better. Fix [#1353](https://github.com/PrismJS/prism/issues/1353) [[`efdccbf`](https://github.com/PrismJS/prism/commit/efdccbf)]

### Updated themes
* __Default__:
	* Add color for class names [[`8572474`](https://github.com/PrismJS/prism/commit/8572474)]
* __Coy__:
	* Inherit pre's height on code, so it does not break on Download page. [[`c6c7fd1`](https://github.com/PrismJS/prism/commit/c6c7fd1)]

### Other changes
* Website: Auto-generate example headers [[`c3ed5b5`](https://github.com/PrismJS/prism/commit/c3ed5b5)]
* Core: Allow cloning of circular structures. ([#1345](https://github.com/PrismJS/prism/issues/1345)) [[`f90d555`](https://github.com/PrismJS/prism/commit/f90d555)]
* Core: Generate components.js from components.json and make it exportable to nodeJS. ([#1354](https://github.com/PrismJS/prism/issues/1354)) [[`ba60df0`](https://github.com/PrismJS/prism/commit/ba60df0)]
* Website: Improve appearance of theme selector [[`0460cad`](https://github.com/PrismJS/prism/commit/0460cad)]
* Website: Check stored theme by default + link both theme selectors together. Close [#1038](https://github.com/PrismJS/prism/issues/1038) [[`212dd4e`](https://github.com/PrismJS/prism/commit/212dd4e)]
* Tests: Use the new components.js file directly [[`0e1a8b7`](https://github.com/PrismJS/prism/commit/0e1a8b7)]
* Update .npmignore Close [#1274](https://github.com/PrismJS/prism/issues/1274) [[`a52319a`](https://github.com/PrismJS/prism/commit/a52319a)]
* Add a loadLanguages() function for easy component loading on NodeJS ([#1359](https://github.com/PrismJS/prism/issues/1359)) [[`a5331a6`](https://github.com/PrismJS/prism/commit/a5331a6)]

## 1.12.2 (2018-03-08)

### Other changes
* Test against NodeJS 4, 6, 8 and 9 ([#1329](https://github.com/PrismJS/prism/issues/1329)) [[`97b7d0a`](https://github.com/PrismJS/prism/commit/97b7d0a)]
* Stop testing against NodeJS 0.10 and 0.12 [[`df01b1b`](https://github.com/PrismJS/prism/commit/df01b1b)]

## 1.12.1 (2018-03-08)

### Updated components
* __C-like__:
	* Revert [[`b98e5b9`](https://github.com/PrismJS/prism/commit/b98e5b9)] to fix [#1340](https://github.com/PrismJS/prism/issues/1340). Reopened [#1337](https://github.com/PrismJS/prism/issues/1337). [[`cebacdf`](https://github.com/PrismJS/prism/commit/cebacdf)]
* __JSX__:
	* Allow for one level of nested curly braces inside tag attribute value. Fix [#1335](https://github.com/PrismJS/prism/issues/1335) [[`05bf67d`](https://github.com/PrismJS/prism/commit/05bf67d)]
* __Ruby__:
	*  Ensure module syntax is not confused with symbols. Fix [#1336](https://github.com/PrismJS/prism/issues/1336) [[`31a2a69`](https://github.com/PrismJS/prism/commit/31a2a69)]

## 1.12.0 (2018-03-07)

### New components
* __ARFF__ ([#1327](https://github.com/PrismJS/prism/issues/1327)) [[`0bc98ac`](https://github.com/PrismJS/prism/commit/0bc98ac)]
* __Clojure__ ([#1311](https://github.com/PrismJS/prism/issues/1311)) [[`8b4d3bd`](https://github.com/PrismJS/prism/commit/8b4d3bd)]
* __Liquid__ ([#1326](https://github.com/PrismJS/prism/issues/1326)) [[`f0b2c9e`](https://github.com/PrismJS/prism/commit/f0b2c9e)]

### Updated components
* __Bash__:
	* Add shell as an alias ([#1321](https://github.com/PrismJS/prism/issues/1321)) [[`67e16a2`](https://github.com/PrismJS/prism/commit/67e16a2)]
	* Add support for quoted command substitution. Fix [#1287](https://github.com/PrismJS/prism/issues/1287) [[`63fc215`](https://github.com/PrismJS/prism/commit/63fc215)]
* __C#__:
	* Add "dotnet" alias. [[`405867c`](https://github.com/PrismJS/prism/commit/405867c)]
* __C-like__:
	* Change order of comment patterns and make multi-line one greedy. Fix [#1337](https://github.com/PrismJS/prism/issues/1337) [[`b98e5b9`](https://github.com/PrismJS/prism/commit/b98e5b9)]
* __NSIS__:
	* Add support for NSIS 3.03 ([#1288](https://github.com/PrismJS/prism/issues/1288)) [[`bd1e98b`](https://github.com/PrismJS/prism/commit/bd1e98b)]
	* Add missing NSIS commands ([#1289](https://github.com/PrismJS/prism/issues/1289)) [[`ad2948f`](https://github.com/PrismJS/prism/commit/ad2948f)]
* __PHP__:
	* Add support for string interpolation inside double-quoted strings. Fix [#1146](https://github.com/PrismJS/prism/issues/1146) [[`9f1f8d6`](https://github.com/PrismJS/prism/commit/9f1f8d6)]
	* Add support for Heredoc and Nowdoc strings [[`5d7223c`](https://github.com/PrismJS/prism/commit/5d7223c)]
	* Fix shell-comment failure now that strings are greedy [[`ad25d22`](https://github.com/PrismJS/prism/commit/ad25d22)]
* __PowerShell__:
	* Add support for two levels of nested brackets inside namespace pattern. Fixes [#1317](https://github.com/PrismJS/prism/issues/1317) [[`3bc3e9c`](https://github.com/PrismJS/prism/commit/3bc3e9c)]
* __Ruby__:
	* Add keywords "protected", "private" and "public" [[`4593837`](https://github.com/PrismJS/prism/commit/4593837)]
* __Rust__:
	* Add support for lifetime-annotation and => operator. Fix [#1339](https://github.com/PrismJS/prism/issues/1339) [[`926f6f8`](https://github.com/PrismJS/prism/commit/926f6f8)]
* __Scheme__:
	* Don't highlight first number of a list as a function. Fix [#1331](https://github.com/PrismJS/prism/issues/1331) [[`51bff80`](https://github.com/PrismJS/prism/commit/51bff80)]
* __SQL__:
	* Add missing keywords and functions, fix numbers [[`de29d4a`](https://github.com/PrismJS/prism/commit/de29d4a)]

### Updated plugins
* __Autolinker__:
	* Allow more chars in query string and hash to match more URLs. Fix [#1142](https://github.com/PrismJS/prism/issues/1142) [[`109bd6f`](https://github.com/PrismJS/prism/commit/109bd6f)]
* __Copy to Clipboard__:
	* Bump ClipboardJS to 2.0.0 and remove hack ([#1314](https://github.com/PrismJS/prism/issues/1314)) [[`e9f410e`](https://github.com/PrismJS/prism/commit/e9f410e)]
* __Toolbar__:
	* Prevent scrolling toolbar with content ([#1305](https://github.com/PrismJS/prism/issues/1305), [#1314](https://github.com/PrismJS/prism/issues/1314)) [[`84eeb89`](https://github.com/PrismJS/prism/commit/84eeb89)]
* __Unescaped Markup__:
	* Use msMatchesSelector for IE11 and below. Fix [#1302](https://github.com/PrismJS/prism/issues/1302) [[`c246c1a`](https://github.com/PrismJS/prism/commit/c246c1a)]
* __WebPlatform Docs__:
	* WebPlatform Docs plugin: Fix links. Fixes [#1290](https://github.com/PrismJS/prism/issues/1290) [[`7a9dbe0`](https://github.com/PrismJS/prism/commit/7a9dbe0)]

### Other changes
* Fix Autoloader's demo page [[`3dddac9`](https://github.com/PrismJS/prism/commit/3dddac9)]
* Download page: Use hash instead of query-string for redownload URL. Fix [#1263](https://github.com/PrismJS/prism/issues/1263) [[`b03c02a`](https://github.com/PrismJS/prism/commit/b03c02a)]
* Core: Don't thow an error if lookbehing is used without anything matching. [[`e0cd47f`](https://github.com/PrismJS/prism/commit/e0cd47f)]
* Docs: Fix link to the `<code>` element specification in HTML5 [[`a84263f`](https://github.com/PrismJS/prism/commit/a84263f)]
* Docs: Mention support for `lang-xxxx` class. Close [#1312](https://github.com/PrismJS/prism/issues/1312) [[`a9e76db`](https://github.com/PrismJS/prism/commit/a9e76db)]
* Docs: Add note on `async` parameter to clarify the requirement of using a single bundled file. Closes [#1249](https://github.com/PrismJS/prism/issues/1249) [[`eba0235`](https://github.com/PrismJS/prism/commit/eba0235)]

## 1.11.0 (2018-02-05)

### New components
* __Content-Security-Policy (CSP)__ ([#1275](https://github.com/PrismJS/prism/issues/1275)) [[`b08cae5`](https://github.com/PrismJS/prism/commit/b08cae5)]
* __HTTP Public-Key-Pins (HPKP)__ ([#1275](https://github.com/PrismJS/prism/issues/1275)) [[`b08cae5`](https://github.com/PrismJS/prism/commit/b08cae5)]
* __HTTP String-Transport-Security (HSTS)__ ([#1275](https://github.com/PrismJS/prism/issues/1275)) [[`b08cae5`](https://github.com/PrismJS/prism/commit/b08cae5)]
* __React TSX__ ([#1280](https://github.com/PrismJS/prism/issues/1280)) [[`fbe82b8`](https://github.com/PrismJS/prism/commit/fbe82b8)]

### Updated components
* __C++__:
	* Add C++ platform-independent types ([#1271](https://github.com/PrismJS/prism/issues/1271)) [[`3da238f`](https://github.com/PrismJS/prism/commit/3da238f)]
* __TypeScript__:
	* Improve typescript with builtins ([#1277](https://github.com/PrismJS/prism/issues/1277)) [[`5de1b1f`](https://github.com/PrismJS/prism/commit/5de1b1f)]

### Other changes
* Fix passing of non-enumerable Error properties from the child test runner ([#1276](https://github.com/PrismJS/prism/issues/1276)) [[`38df653`](https://github.com/PrismJS/prism/commit/38df653)]

## 1.10.0 (2018-01-17)

### New components
* __6502 Assembly__ ([#1245](https://github.com/PrismJS/prism/issues/1245)) [[`2ece18b`](https://github.com/PrismJS/prism/commit/2ece18b)]
* __Elm__ ([#1174](https://github.com/PrismJS/prism/issues/1174)) [[`d6da70e`](https://github.com/PrismJS/prism/commit/d6da70e)]
* __IchigoJam BASIC__ ([#1246](https://github.com/PrismJS/prism/issues/1246)) [[`cf840be`](https://github.com/PrismJS/prism/commit/cf840be)]
* __Io__ ([#1251](https://github.com/PrismJS/prism/issues/1251)) [[`84ed3ed`](https://github.com/PrismJS/prism/commit/84ed3ed)]

### Updated components
* __BASIC__:
	* Make strings greedy [[`60114d0`](https://github.com/PrismJS/prism/commit/60114d0)]
* __C++__:
	* Add C++11 raw string feature ([#1254](https://github.com/PrismJS/prism/issues/1254)) [[`71595be`](https://github.com/PrismJS/prism/commit/71595be)]

### Updated plugins
* __Autoloader__:
	* Add support for `data-autoloader-path` ([#1242](https://github.com/PrismJS/prism/issues/1242)) [[`39360d6`](https://github.com/PrismJS/prism/commit/39360d6)]
* __Previewers__:
	* New plugin combining previous plugins Previewer: Base, Previewer: Angle, Previewer: Color, Previewer: Easing, Previewer: Gradient and Previewer: Time. ([#1244](https://github.com/PrismJS/prism/issues/1244)) [[`28e4b4c`](https://github.com/PrismJS/prism/commit/28e4b4c)]
* __Unescaped Markup__:
	* Make it work with any language ([#1265](https://github.com/PrismJS/prism/issues/1265)) [[`7bcdae7`](https://github.com/PrismJS/prism/commit/7bcdae7)]

### Other changes
* Add attribute `style` in `package.json` ([#1256](https://github.com/PrismJS/prism/issues/1256)) [[`a9b6785`](https://github.com/PrismJS/prism/commit/a9b6785)]

## 1.9.0 (2017-12-06)

### New components
* __Flow__ [[`d27b70d`](https://github.com/PrismJS/prism/commit/d27b70d)]

### Updated components
* __CSS__:
	* Unicode characters in CSS properties ([#1227](https://github.com/PrismJS/prism/issues/1227)) [[`f234ea4`](https://github.com/PrismJS/prism/commit/f234ea4)]
* __JSX__:
	* JSX: Improve highlighting support. Fix [#1235](https://github.com/PrismJS/prism/issues/1235) and [#1236](https://github.com/PrismJS/prism/issues/1236) [[`f41c5cd`](https://github.com/PrismJS/prism/commit/f41c5cd)]
* __Markup__:
	* Make CSS and JS inclusions in Markup greedy. Fix [#1240](https://github.com/PrismJS/prism/issues/1240) [[`7dc1e45`](https://github.com/PrismJS/prism/commit/7dc1e45)]
* __PHP__:
	* Add support for multi-line strings. Fix [#1233](https://github.com/PrismJS/prism/issues/1233) [[`9a542a0`](https://github.com/PrismJS/prism/commit/9a542a0)]

### Updated plugins
* __Copy to clipboard__:
	* Fix test for native Clipboard. Fix [#1241](https://github.com/PrismJS/prism/issues/1241) [[`e7b5e82`](https://github.com/PrismJS/prism/commit/e7b5e82)]
	* Copy to clipboard: Update to v1.7.1. Fix [#1220](https://github.com/PrismJS/prism/issues/1220) [[`a1b85e3`](https://github.com/PrismJS/prism/commit/a1b85e3), [`af50e44`](https://github.com/PrismJS/prism/commit/af50e44)]
* __Line highlight__:
	* Fixes to compatibility of line number and line higlight plugins ([#1194](https://github.com/PrismJS/prism/issues/1194)) [[`e63058f`](https://github.com/PrismJS/prism/commit/e63058f), [`3842a91`](https://github.com/PrismJS/prism/commit/3842a91)]
* __Unescaped Markup__:
	* Fix ambiguity in documentation by improving examples. Fix [#1197](https://github.com/PrismJS/prism/issues/1197) [[`924784a`](https://github.com/PrismJS/prism/commit/924784a)]

### Other changes
* Allow any element being root instead of document. ([#1230](https://github.com/PrismJS/prism/issues/1230)) [[`69f2e2c`](https://github.com/PrismJS/prism/commit/69f2e2c), [`6e50d44`](https://github.com/PrismJS/prism/commit/6e50d44)]
* Coy Theme: The 'height' element makes code blocks the height of the browser canvas. ([#1224](https://github.com/PrismJS/prism/issues/1224)) [[`ac219d7`](https://github.com/PrismJS/prism/commit/ac219d7)]
* Download page: Fix implicitly declared variable [[`f986551`](https://github.com/PrismJS/prism/commit/f986551)]
* Download page: Add version number at the beginning of the generated files. Fix [#788](https://github.com/PrismJS/prism/issues/788) [[`928790d`](https://github.com/PrismJS/prism/commit/928790d)]

## 1.8.4 (2017-11-05)

### Updated components

* __ABAP__:
	* Regexp optimisation [[`e7b411e`](https://github.com/PrismJS/prism/commit/e7b411e)]
* __ActionScript__:
	* Fix XML regex + optimise [[`75d00d7`](https://github.com/PrismJS/prism/commit/75d00d7)]
* __Ada__:
	* Regexp simplification [[`e881fe3`](https://github.com/PrismJS/prism/commit/e881fe3)]
* __Apacheconf__:
	* Regexp optimisation [[`a065e61`](https://github.com/PrismJS/prism/commit/a065e61)]
* __APL__:
	* Regexp simplification [[`33297c4`](https://github.com/PrismJS/prism/commit/33297c4)]
* __AppleScript__:
	* Regexp optimisation [[`d879f36`](https://github.com/PrismJS/prism/commit/d879f36)]
* __Arduino__:
	* Don't use captures if not needed [[`16b338f`](https://github.com/PrismJS/prism/commit/16b338f)]
* __ASP.NET__:
	* Regexp optimisation [[`438926c`](https://github.com/PrismJS/prism/commit/438926c)]
* __AutoHotkey__:
	* Regexp simplification + don't use captures if not needed [[`5edfd2f`](https://github.com/PrismJS/prism/commit/5edfd2f)]
* __Bash__:
	* Regexp optimisation and simplification [[`75b9b29`](https://github.com/PrismJS/prism/commit/75b9b29)]
* __Bro__:
	* Regexp simplification + don't use captures if not needed [[`d4b9003`](https://github.com/PrismJS/prism/commit/d4b9003)]
* __C__:
	* Regexp optimisation + don't use captures if not needed [[`f61d487`](https://github.com/PrismJS/prism/commit/f61d487)]
* __C++__:
	* Fix operator regexp + regexp simplification + don't use captures if not needed [[`ffeb26e`](https://github.com/PrismJS/prism/commit/ffeb26e)]
* __C#__:
	* Remove duplicates in keywords + regexp optimisation + don't use captures if not needed [[`d28d178`](https://github.com/PrismJS/prism/commit/d28d178)]
* __C-like__:
	* Regexp simplification + don't use captures if not needed [[`918e0ff`](https://github.com/PrismJS/prism/commit/918e0ff)]
* __CoffeeScript__:
	* Regexp optimisation + don't use captures if not needed [[`5895978`](https://github.com/PrismJS/prism/commit/5895978)]
* __Crystal__:
	* Remove trailing comma [[`16979a3`](https://github.com/PrismJS/prism/commit/16979a3)]
* __CSS__:
	* Regexp simplification + don't use captures if not needed + handle multi-line style attributes [[`43d9f36`](https://github.com/PrismJS/prism/commit/43d9f36)]
* __CSS Extras__:
	* Regexp simplification [[`134ed70`](https://github.com/PrismJS/prism/commit/134ed70)]
* __D__:
	* Regexp optimisation [[`fbe39c9`](https://github.com/PrismJS/prism/commit/fbe39c9)]
* __Dart__:
	* Regexp optimisation [[`f24e919`](https://github.com/PrismJS/prism/commit/f24e919)]
* __Django__:
	* Regexp optimisation [[`a95c51d`](https://github.com/PrismJS/prism/commit/a95c51d)]
* __Docker__:
	* Regexp optimisation [[`27f99ff`](https://github.com/PrismJS/prism/commit/27f99ff)]
* __Eiffel__:
	* Regexp optimisation [[`b7cdea2`](https://github.com/PrismJS/prism/commit/b7cdea2)]
* __Elixir__:
	* Regexp optimisation + uniform behavior between ~r and ~s [[`5d12e80`](https://github.com/PrismJS/prism/commit/5d12e80)]
* __Erlang__:
	* Regexp optimisation [[`7547f83`](https://github.com/PrismJS/prism/commit/7547f83)]
* __F#__:
	* Regexp optimisation + don't use captures if not needed [[`7753fc4`](https://github.com/PrismJS/prism/commit/7753fc4)]
* __Gherkin__:
	* Regexp optimisation + don't use captures if not needed + added explanation comment on table-body regexp [[`f26197a`](https://github.com/PrismJS/prism/commit/f26197a)]
* __Git__:
	* Regexp optimisation [[`b9483b9`](https://github.com/PrismJS/prism/commit/b9483b9)]
* __GLSL__:
	* Regexp optimisation [[`e66d21b`](https://github.com/PrismJS/prism/commit/e66d21b)]
* __Go__:
	* Regexp optimisation + don't use captures if not needed [[`88caabb`](https://github.com/PrismJS/prism/commit/88caabb)]
* __GraphQL__:
	* Regexp optimisation and simplification [[`2474f06`](https://github.com/PrismJS/prism/commit/2474f06)]
* __Groovy__:
	* Regexp optimisation + don't use captures if not needed [[`e74e00c`](https://github.com/PrismJS/prism/commit/e74e00c)]
* __Haml__:
	* Regexp optimisation + don't use captures if not needed + fix typo in comment [[`23e3b43`](https://github.com/PrismJS/prism/commit/23e3b43)]
* __Handlebars__:
	* Regexp optimisation + don't use captures if not needed [[`09dbfce`](https://github.com/PrismJS/prism/commit/09dbfce)]
* __Haskell__:
	* Regexp simplification + don't use captures if not needed [[`f11390a`](https://github.com/PrismJS/prism/commit/f11390a)]
* __HTTP__:
	* Regexp simplification + don't use captures if not needed [[`37ef24e`](https://github.com/PrismJS/prism/commit/37ef24e)]
* __Icon__:
	* Regexp optimisation [[`9cf64a0`](https://github.com/PrismJS/prism/commit/9cf64a0)]
* __J__:
	* Regexp simplification [[`de15150`](https://github.com/PrismJS/prism/commit/de15150)]
* __Java__:
	* Don't use captures if not needed [[`96b35c8`](https://github.com/PrismJS/prism/commit/96b35c8)]
* __JavaScript__:
	* Regexp optimisation + don't use captures if not needed [[`93d4002`](https://github.com/PrismJS/prism/commit/93d4002)]
* __Jolie__:
	* Regexp optimisation + don't use captures if not needed + remove duplicates in keywords [[`a491f9e`](https://github.com/PrismJS/prism/commit/a491f9e)]
* __JSON__:
	* Make strings greedy, remove negative look-ahead for ":". Fix [#1204](https://github.com/PrismJS/prism/issues/1204) [[`98acd2d`](https://github.com/PrismJS/prism/commit/98acd2d)]
	* Regexp optimisation + don't use captures if not needed [[`8fc1b03`](https://github.com/PrismJS/prism/commit/8fc1b03)]
* __JSX__:
	* Regexp optimisation + handle spread operator as a whole [[`28de4e2`](https://github.com/PrismJS/prism/commit/28de4e2)]
* __Julia__:
	* Regexp optimisation and simplification [[`12684c0`](https://github.com/PrismJS/prism/commit/12684c0)]
* __Keyman__:
	* Regexp optimisation + don't use captures if not needed [[`9726087`](https://github.com/PrismJS/prism/commit/9726087)]
* __Kotlin__:
	* Regexp simplification [[`12ff8dc`](https://github.com/PrismJS/prism/commit/12ff8dc)]
* __LaTeX__:
	* Regexp optimisation and simplification [[`aa426b0`](https://github.com/PrismJS/prism/commit/aa426b0)]
* __LiveScript__:
	* Make interpolated strings greedy + fix variable and identifier regexps [[`c581049`](https://github.com/PrismJS/prism/commit/c581049)]
* __LOLCODE__:
	* Don't use captures if not needed [[`52903af`](https://github.com/PrismJS/prism/commit/52903af)]
* __Makefile__:
	* Regexp optimisation [[`20ae2e5`](https://github.com/PrismJS/prism/commit/20ae2e5)]
* __Markdown__:
	* Don't use captures if not needed [[`f489a1e`](https://github.com/PrismJS/prism/commit/f489a1e)]
* __Markup__:
	* Regexp optimisation + fix punctuation inside attr-value [[`ea380c6`](https://github.com/PrismJS/prism/commit/ea380c6)]
* __MATLAB__:
	* Make strings greedy + handle line feeds better [[`4cd4f01`](https://github.com/PrismJS/prism/commit/4cd4f01)]
* __Monkey__:
	* Don't use captures if not needed [[`7f47140`](https://github.com/PrismJS/prism/commit/7f47140)]
* __N4JS__:
	* Don't use captures if not needed [[`2d3f9df`](https://github.com/PrismJS/prism/commit/2d3f9df)]
* __NASM__:
	* Regexp optimisation and simplification + don't use captures if not needed [[`9937428`](https://github.com/PrismJS/prism/commit/9937428)]
* __nginx__:
	* Remove trailing comma + remove duplicates in keywords [[`c6e7195`](https://github.com/PrismJS/prism/commit/c6e7195)]
* __NSIS__:
	* Regexp optimisation + don't use captures if not needed [[`beeb107`](https://github.com/PrismJS/prism/commit/beeb107)]
* __Objective-C__:
	* Don't use captures if not needed [[`9be0f88`](https://github.com/PrismJS/prism/commit/9be0f88)]
* __OCaml__:
	* Regexp simplification [[`5f5f38c`](https://github.com/PrismJS/prism/commit/5f5f38c)]
* __OpenCL__:
	* Don't use captures if not needed [[`5e70f1d`](https://github.com/PrismJS/prism/commit/5e70f1d)]
* __Oz__:
	* Fix atom regexp [[`9320e92`](https://github.com/PrismJS/prism/commit/9320e92)]
* __PARI/GP__:
	* Regexp optimisation [[`2c7b59b`](https://github.com/PrismJS/prism/commit/2c7b59b)]
* __Parser__:
	* Regexp simplification [[`569d511`](https://github.com/PrismJS/prism/commit/569d511)]
* __Perl__:
	* Regexp optimisation and simplification + don't use captures if not needed [[`0fe4cf6`](https://github.com/PrismJS/prism/commit/0fe4cf6)]
* __PHP__:
	* Don't use captures if not needed Golmote [[`5235f18`](https://github.com/PrismJS/prism/commit/5235f18)]
* __PHP Extras__:
	* Add word boundary after global keywords + don't use captures if not needed [[`9049a2a`](https://github.com/PrismJS/prism/commit/9049a2a)]
* __PowerShell__:
	* Regexp optimisation + don't use captures if not needed [[`0d05957`](https://github.com/PrismJS/prism/commit/0d05957)]
* __Processing__:
	* Regexp simplification [[`8110d38`](https://github.com/PrismJS/prism/commit/8110d38)]
* __.properties__:
	* Regexp optimisation [[`678b621`](https://github.com/PrismJS/prism/commit/678b621)]
* __Protocol Buffers__:
	* Don't use captures if not needed [[`3e256d8`](https://github.com/PrismJS/prism/commit/3e256d8)]
* __Pug__:
	* Don't use captures if not needed [[`76dc925`](https://github.com/PrismJS/prism/commit/76dc925)]
* __Pure__:
	* Make inline-lang greedy [[`92318b0`](https://github.com/PrismJS/prism/commit/92318b0)]
* __Python__:
	* Add Python builtin function highlighting ([#1205](https://github.com/PrismJS/prism/issues/1205)) [[`2169c99`](https://github.com/PrismJS/prism/commit/2169c99)]
	* Python: Add highlighting to functions with space between name and parentheses ([#1207](https://github.com/PrismJS/prism/issues/1207)) [[`3badd8a`](https://github.com/PrismJS/prism/commit/3badd8a)]
	* Make triple-quoted strings greedy + regexp optimisation and simplification [[`f09f9f5`](https://github.com/PrismJS/prism/commit/f09f9f5)]
* __Qore__:
	* Regexp simplification [[`69459f0`](https://github.com/PrismJS/prism/commit/69459f0)]
* __R__:
	* Regexp optimisation [[`06a9da4`](https://github.com/PrismJS/prism/commit/06a9da4)]
* __Reason__:
	* Regexp optimisation + don't use capture if not needed [[`19d79b4`](https://github.com/PrismJS/prism/commit/19d79b4)]
* __Ren'py__:
	* Make strings greedy + don't use captures if not needed [[`91d84d9`](https://github.com/PrismJS/prism/commit/91d84d9)]
* __reST__:
	* Regexp simplification + don't use captures if not needed [[`1a8b3e9`](https://github.com/PrismJS/prism/commit/1a8b3e9)]
* __Rip__:
	* Regexp optimisation [[`d7f0ee8`](https://github.com/PrismJS/prism/commit/d7f0ee8)]
* __Ruby__:
	* Regexp optimisation and simplification + don't use captures if not needed [[`4902ed4`](https://github.com/PrismJS/prism/commit/4902ed4)]
* __Rust__:
	* Regexp optimisation and simplification + don't use captures if not needed [[`cc9d874`](https://github.com/PrismJS/prism/commit/cc9d874)]
* __Sass__:
	* Regexp simplification Golmote [[`165d957`](https://github.com/PrismJS/prism/commit/165d957)]
* __Scala__:
	* Regexp optimisation Golmote [[`5f50c12`](https://github.com/PrismJS/prism/commit/5f50c12)]
* __Scheme__:
	* Regexp optimisation [[`bd19b04`](https://github.com/PrismJS/prism/commit/bd19b04)]
* __SCSS__:
	* Regexp simplification [[`c60b7d4`](https://github.com/PrismJS/prism/commit/c60b7d4)]
* __Smalltalk__:
	* Regexp simplification [[`41a2c76`](https://github.com/PrismJS/prism/commit/41a2c76)]
* __Smarty__:
	* Regexp optimisation and simplification [[`e169be9`](https://github.com/PrismJS/prism/commit/e169be9)]
* __SQL__:
	* Regexp optimisation [[`a6244a4`](https://github.com/PrismJS/prism/commit/a6244a4)]
* __Stylus__:
	* Regexp optimisation [[`df9506c`](https://github.com/PrismJS/prism/commit/df9506c)]
* __Swift__:
	* Don't use captures if not needed [[`a2d737a`](https://github.com/PrismJS/prism/commit/a2d737a)]
* __Tcl__:
	* Regexp simplification + don't use captures if not needed [[`f0b8a33`](https://github.com/PrismJS/prism/commit/f0b8a33)]
* __Textile__:
	* Regexp optimisation + don't use captures if not needed [[`08139ad`](https://github.com/PrismJS/prism/commit/08139ad)]
* __Twig__:
	* Regexp optimisation and simplification + don't use captures if not needed [[`0b10fd0`](https://github.com/PrismJS/prism/commit/0b10fd0)]
* __TypeScript__:
	* Don't use captures if not needed [[`e296caf`](https://github.com/PrismJS/prism/commit/e296caf)]
* __Verilog__:
	* Regexp simplification [[`1b24b34`](https://github.com/PrismJS/prism/commit/1b24b34)]
* __VHDL__:
	* Regexp optimisation and simplification [[`7af36df`](https://github.com/PrismJS/prism/commit/7af36df)]
* __vim__:
	* Remove duplicates in keywords [[`700505e`](https://github.com/PrismJS/prism/commit/700505e)]
* __Wiki markup__:
	* Fix escaping consistency [[`1fd690d`](https://github.com/PrismJS/prism/commit/1fd690d)]
* __YAML__:
	* Regexp optimisation + don't use captures if not needed [[`1fd690d`](https://github.com/PrismJS/prism/commit/1fd690d)]

### Other changes
* Remove comments spellcheck for AMP validation ([#1106](https://github.com/PrismJS/prism/issues/1106)) [[`de996d7`](https://github.com/PrismJS/prism/commit/de996d7)]
* Prevent error from throwing when element does not have a parentNode in highlightElement. [[`c33be19`](https://github.com/PrismJS/prism/commit/c33be19)]
* Provide a way to load Prism from inside a Worker without listening to messages. ([#1188](https://github.com/PrismJS/prism/issues/1188)) [[`d09982d`](https://github.com/PrismJS/prism/commit/d09982d)]

## 1.8.3 (2017-10-19)

### Other changes

* Fix inclusion tests for Pug [[`955c2ab`](https://github.com/PrismJS/prism/commit/955c2ab)]

## 1.8.2 (2017-10-19)

### Updated components
* __Jade__:
	* Jade has been renamed to __Pug__ ([#1201](https://github.com/PrismJS/prism/issues/1201)) [[`bcfef7c`](https://github.com/PrismJS/prism/commit/bcfef7c)]
* __JavaScript__:
	* Better highlighting of functions ([#1190](https://github.com/PrismJS/prism/issues/1190)) [[`8ee2cd3`](https://github.com/PrismJS/prism/commit/8ee2cd3)]

### Update plugins
* __Copy to clipboard__:
	* Fix error occurring when using in Chrome 61+ ([#1206](https://github.com/PrismJS/prism/issues/1206)) [[`b41d571`](https://github.com/PrismJS/prism/commit/b41d571)]
* __Show invisibles__:
	* Prevent error when using with Autoloader plugin ([#1195](https://github.com/PrismJS/prism/issues/1195)) [[`ed8bdb5`](https://github.com/PrismJS/prism/commit/ed8bdb5)]

## 1.8.1 (2017-09-16)

### Other changes

* Add Arduino to components.js [[`290a3c6`](https://github.com/PrismJS/prism/commit/290a3c6)]

## 1.8.0 (2017-09-16)

### New components

* __Arduino__ ([#1184](https://github.com/PrismJS/prism/issues/1184)) [[`edf2454`](https://github.com/PrismJS/prism/commit/edf2454)]
* __OpenCL__ ([#1175](https://github.com/PrismJS/prism/issues/1175)) [[`131e8fa`](https://github.com/PrismJS/prism/commit/131e8fa)]

### Updated plugins

* __Autolinker__:
	* Silently catch any error thrown by decodeURIComponent. Fixes [#1186](https://github.com/PrismJS/prism/issues/1186) [[`2e43fcf`](https://github.com/PrismJS/prism/commit/2e43fcf)]

## 1.7.0 (2017-09-09)

### New components

* __Django/Jinja2__ ([#1085](https://github.com/PrismJS/prism/issues/1085)) [[`345b1b2`](https://github.com/PrismJS/prism/commit/345b1b2)]
* __N4JS__ ([#1141](https://github.com/PrismJS/prism/issues/1141)) [[`eaa8ebb`](https://github.com/PrismJS/prism/commit/eaa8ebb)]
* __Ren'py__ ([#658](https://github.com/PrismJS/prism/issues/658)) [[`7ab4013`](https://github.com/PrismJS/prism/commit/7ab4013)]
* __VB.Net__ ([#1122](https://github.com/PrismJS/prism/issues/1122)) [[`5400651`](https://github.com/PrismJS/prism/commit/5400651)]

### Updated components

* __APL__:
	* Add left shoe underbar and right shoe underbar ([#1072](https://github.com/PrismJS/prism/issues/1072)) [[`12238c5`](https://github.com/PrismJS/prism/commit/12238c5)]
	* Update prism-apl.js ([#1126](https://github.com/PrismJS/prism/issues/1126)) [[`a5f3cdb`](https://github.com/PrismJS/prism/commit/a5f3cdb)]
* __C__:
	* Add more keywords and constants for C. ([#1029](https://github.com/PrismJS/prism/issues/1029)) [[`43a388e`](https://github.com/PrismJS/prism/commit/43a388e)]
* __C#__:
	* Fix wrong highlighting when three slashes appear inside string. Fix [#1091](https://github.com/PrismJS/prism/issues/1091) [[`dfb6f17`](https://github.com/PrismJS/prism/commit/dfb6f17)]
* __C-like__:
	* Add support for unclosed block comments. Close [#828](https://github.com/PrismJS/prism/issues/828) [[`3426ed1`](https://github.com/PrismJS/prism/commit/3426ed1)]
* __Crystal__:
	* Update Crystal keywords ([#1092](https://github.com/PrismJS/prism/issues/1092)) [[`125bff1`](https://github.com/PrismJS/prism/commit/125bff1)]
* __CSS Extras__:
	* Support CSS #RRGGBBAA ([#1139](https://github.com/PrismJS/prism/issues/1139)) [[`07a6806`](https://github.com/PrismJS/prism/commit/07a6806)]
* __Docker__:
	* Add dockerfile alias for docker language ([#1164](https://github.com/PrismJS/prism/issues/1164)) [[`601c47f`](https://github.com/PrismJS/prism/commit/601c47f)]
	* Update the list of keywords for dockerfiles ([#1180](https://github.com/PrismJS/prism/issues/1180)) [[`f0d73e0`](https://github.com/PrismJS/prism/commit/f0d73e0)]
* __Eiffel__:
	* Add class-name highlighting for Eiffel ([#471](https://github.com/PrismJS/prism/issues/471)) [[`cd03587`](https://github.com/PrismJS/prism/commit/cd03587)]
* __Handlebars__:
	* Check for possible pre-existing marker strings in Handlebars [[`7a1a404`](https://github.com/PrismJS/prism/commit/7a1a404)]
* __JavaScript__:
	* Properly match every operator as a whole token. Fix [#1133](https://github.com/PrismJS/prism/issues/1133) [[`9f649fb`](https://github.com/PrismJS/prism/commit/9f649fb)]
	* Allows uppercase prefixes in JS number literals ([#1151](https://github.com/PrismJS/prism/issues/1151)) [[`d4ee904`](https://github.com/PrismJS/prism/commit/d4ee904)]
	* Reduced backtracking in regex pattern. Fix [#1159](https://github.com/PrismJS/prism/issues/1159) [[`ac09e97`](https://github.com/PrismJS/prism/commit/ac09e97)]
* __JSON__:
	* Fix property and string patterns performance. Fix [#1080](https://github.com/PrismJS/prism/issues/1080) [[`0ca1353`](https://github.com/PrismJS/prism/commit/0ca1353)]
* __JSX__:
	* JSX spread operator break. Fixes [#1061](https://github.com/PrismJS/prism/issues/1061) ([#1094](https://github.com/PrismJS/prism/issues/1094)) [[`561bceb`](https://github.com/PrismJS/prism/commit/561bceb)]
	* Fix highlighting of attributes containing spaces [[`867ea42`](https://github.com/PrismJS/prism/commit/867ea42)]
	* Improved performance for tags (when not matching) Fix [#1152](https://github.com/PrismJS/prism/issues/1152) [[`b0fe103`](https://github.com/PrismJS/prism/commit/b0fe103)]
* __LOLCODE__:
	* Make strings greedy Golmote [[`1a5e7a4`](https://github.com/PrismJS/prism/commit/1a5e7a4)]
* __Markup__:
	* Support HTML entities in attribute values ([#1143](https://github.com/PrismJS/prism/issues/1143)) [[`1d5047d`](https://github.com/PrismJS/prism/commit/1d5047d)]
* __NSIS__:
	* Update patterns ([#1033](https://github.com/PrismJS/prism/issues/1033)) [[`01a59d8`](https://github.com/PrismJS/prism/commit/01a59d8)]
	* Add support for NSIS 3.02 ([#1169](https://github.com/PrismJS/prism/issues/1169)) [[`393b5f7`](https://github.com/PrismJS/prism/commit/393b5f7)]
* __PHP__:
	* Fix the PHP language ([#1100](https://github.com/PrismJS/prism/issues/1100)) [[`1453fa7`](https://github.com/PrismJS/prism/commit/1453fa7)]
	* Check for possible pre-existing marker strings in PHP [[`36bc560`](https://github.com/PrismJS/prism/commit/36bc560)]
* __Ruby__:
	* Fix slash regex performance. Fix [#1083](https://github.com/PrismJS/prism/issues/1083) [[`a708730`](https://github.com/PrismJS/prism/commit/a708730)]
	* Add support for =begin =end comments. Manual merge of [#1121](https://github.com/PrismJS/prism/issues/1121). [[`62cdaf8`](https://github.com/PrismJS/prism/commit/62cdaf8)]
* __Smarty__:
	* Check for possible pre-existing marker strings in Smarty [[`5df26e2`](https://github.com/PrismJS/prism/commit/5df26e2)]
* __TypeScript__:
	* Update typescript keywords ([#1064](https://github.com/PrismJS/prism/issues/1064)) [[`52020a0`](https://github.com/PrismJS/prism/commit/52020a0)]
	* Chmod -x prism-typescript component ([#1145](https://github.com/PrismJS/prism/issues/1145)) [[`afe0542`](https://github.com/PrismJS/prism/commit/afe0542)]
* __YAML__:
	* Make strings greedy (partial fix for [#1075](https://github.com/PrismJS/prism/issues/1075)) [[`565a2cc`](https://github.com/PrismJS/prism/commit/565a2cc)]

### Updated plugins

* __Autolinker__:
	* Fixed an rendering issue for encoded urls ([#1173](https://github.com/PrismJS/prism/issues/1173)) [[`abc007f`](https://github.com/PrismJS/prism/commit/abc007f)]
* __Custom Class__:
	* Add missing noCSS property for the Custom Class plugin [[`ba64f8d`](https://github.com/PrismJS/prism/commit/ba64f8d)]
	* Added a default for classMap. Fixes [#1137](https://github.com/PrismJS/prism/issues/1137). ([#1157](https://github.com/PrismJS/prism/issues/1157)) [[`5400af9`](https://github.com/PrismJS/prism/commit/5400af9)]
* __Keep Markup__:
	* Store highlightedCode after reinserting markup. Fix [#1127](https://github.com/PrismJS/prism/issues/1127) [[`6df2ceb`](https://github.com/PrismJS/prism/commit/6df2ceb)]
* __Line Highlight__:
	* Cleanup left-over line-highlight tags before other plugins run [[`79b723d`](https://github.com/PrismJS/prism/commit/79b723d)]
	* Avoid conflict between line-highlight and other plugins [[`224fdb8`](https://github.com/PrismJS/prism/commit/224fdb8)]
* __Line Numbers__:
	* Support soft wrap for line numbers plugin ([#584](https://github.com/PrismJS/prism/issues/584)) [[`849f1d6`](https://github.com/PrismJS/prism/commit/849f1d6)]
	* Plugins fixes (unescaped-markup, line-numbers) ([#1012](https://github.com/PrismJS/prism/issues/1012)) [[`3fb7cf8`](https://github.com/PrismJS/prism/commit/3fb7cf8)]
* __Normalize Whitespace__:
	* Add Node.js support for the normalize-whitespace plugin [[`6c7dae2`](https://github.com/PrismJS/prism/commit/6c7dae2)]
* __Unescaped Markup__:
	* Plugins fixes (unescaped-markup, line-numbers) ([#1012](https://github.com/PrismJS/prism/issues/1012)) [[`3fb7cf8`](https://github.com/PrismJS/prism/commit/3fb7cf8)]

### Updated themes
* __Coy__:
	* Scroll 'Coy' background with contents ([#1163](https://github.com/PrismJS/prism/issues/1163)) [[`310990b`](https://github.com/PrismJS/prism/commit/310990b)]

### Other changes

* Initial implementation of manual highlighting ([#1087](https://github.com/PrismJS/prism/issues/1087)) [[`bafc4cb`](https://github.com/PrismJS/prism/commit/bafc4cb)]
* Remove dead link in Third-party tutorials section. Fixes [#1028](https://github.com/PrismJS/prism/issues/1028) [[`dffadc6`](https://github.com/PrismJS/prism/commit/dffadc6)]
* Most languages now use the greedy flag for better highlighting [[`7549ecc`](https://github.com/PrismJS/prism/commit/7549ecc)]
* .npmignore: Unignore components.js ([#1108](https://github.com/PrismJS/prism/issues/1108)) [[`1f699e7`](https://github.com/PrismJS/prism/commit/1f699e7)]
* Run before-highlight and after-highlight hooks even when no grammar is found. Fix [#1134](https://github.com/PrismJS/prism/issues/1134) [[`70cb472`](https://github.com/PrismJS/prism/commit/70cb472)]
* Replace [\w\W] with [\s\S] and [0-9] with \d in regexes ([#1107](https://github.com/PrismJS/prism/issues/1107)) [[`8aa2cc4`](https://github.com/PrismJS/prism/commit/8aa2cc4)]
* Fix corner cases for the greedy flag ([#1095](https://github.com/PrismJS/prism/issues/1095)) [[`6530709`](https://github.com/PrismJS/prism/commit/6530709)]
* Add Third Party Tutorial ([#1156](https://github.com/PrismJS/prism/issues/1156)) [[`c34e57b`](https://github.com/PrismJS/prism/commit/c34e57b)]
* Add Composer support ([#648](https://github.com/PrismJS/prism/issues/648)) [[`2989633`](https://github.com/PrismJS/prism/commit/2989633)]
* Remove IE8 plugin ([#992](https://github.com/PrismJS/prism/issues/992)) [[`25788eb`](https://github.com/PrismJS/prism/commit/25788eb)]
* Website: remove width and height on logo.svg, so it becomes scalable. Close [#1005](https://github.com/PrismJS/prism/issues/1005) [[`0621ff7`](https://github.com/PrismJS/prism/commit/0621ff7)]
* Remove yarn.lock ([#1098](https://github.com/PrismJS/prism/issues/1098)) [[`11eed25`](https://github.com/PrismJS/prism/commit/11eed25)]

## 1.6.0 (2016-12-03)

### New components

* __.properties__ ([#980](https://github.com/PrismJS/prism/issues/980)) [[`be6219a`](https://github.com/PrismJS/prism/commit/be6219a)]
* __Ada__ ([#949](https://github.com/PrismJS/prism/issues/949)) [[`65619f7`](https://github.com/PrismJS/prism/commit/65619f7)]
* __GraphQL__ ([#971](https://github.com/PrismJS/prism/issues/971)) [[`e018087`](https://github.com/PrismJS/prism/commit/e018087)]
* __Jolie__ ([#1014](https://github.com/PrismJS/prism/issues/1014)) [[`dfc1941`](https://github.com/PrismJS/prism/commit/dfc1941)]
* __LiveScript__ ([#982](https://github.com/PrismJS/prism/issues/982)) [[`62e258c`](https://github.com/PrismJS/prism/commit/62e258c)]
* __Reason__ (Fixes [#1046](https://github.com/PrismJS/prism/issues/1046)) [[`3cae6ce`](https://github.com/PrismJS/prism/commit/3cae6ce)]
* __Xojo__ ([#994](https://github.com/PrismJS/prism/issues/994)) [[`0224b7c`](https://github.com/PrismJS/prism/commit/0224b7c)]

### Updated components

* __APL__:
	* Add iota underbar ([#1024](https://github.com/PrismJS/prism/issues/1024)) [[`3c5c89a`](https://github.com/PrismJS/prism/commit/3c5c89a), [`ac21d33`](https://github.com/PrismJS/prism/commit/ac21d33)]
* __AsciiDoc__:
	* Optimized block regexps to prevent struggling on large files. Fixes [#1001](https://github.com/PrismJS/prism/issues/1001). [[`1a86d34`](https://github.com/PrismJS/prism/commit/1a86d34)]
* __Bash__:
	* Add `npm` to function list ([#969](https://github.com/PrismJS/prism/issues/969)) [[`912bdfe`](https://github.com/PrismJS/prism/commit/912bdfe)]
* __CSS__:
	* Make CSS strings greedy. Fix [#1013](https://github.com/PrismJS/prism/issues/1013). [[`e57e26d`](https://github.com/PrismJS/prism/commit/e57e26d)]
* __CSS Extras__:
	* Match attribute inside selectors [[`13fed76`](https://github.com/PrismJS/prism/commit/13fed76)]
* __Groovy__:
	* Fix order of decoding entities in groovy. Fixes [#1049](https://github.com/PrismJS/prism/issues/1049) ([#1050](https://github.com/PrismJS/prism/issues/1050)) [[`d75da8e`](https://github.com/PrismJS/prism/commit/d75da8e)]
* __Ini__:
	* Remove important token in ini definition ([#1047](https://github.com/PrismJS/prism/issues/1047)) [[`fe8ad8b`](https://github.com/PrismJS/prism/commit/fe8ad8b)]
* __JavaScript__:
	* Add exponentiation & spread/rest operator ([#991](https://github.com/PrismJS/prism/issues/991)) [[`b2de65a`](https://github.com/PrismJS/prism/commit/b2de65a), [`268d01e`](https://github.com/PrismJS/prism/commit/268d01e)]
* __JSON__:
	* JSON: Fixed issues with properties and strings + added tests. Fix [#1025](https://github.com/PrismJS/prism/issues/1025) [[`25a541d`](https://github.com/PrismJS/prism/commit/25a541d)]
* __Markup__:
	* Allow for dots in Markup tag names, but not in HTML tags included in Textile. Fixes [#888](https://github.com/PrismJS/prism/issues/888). [[`31ea66b`](https://github.com/PrismJS/prism/commit/31ea66b)]
	* Make doctype case-insensitive ([#1009](https://github.com/PrismJS/prism/issues/1009)) [[`3dd7219`](https://github.com/PrismJS/prism/commit/3dd7219)]
* __NSIS__:
	* Updated patterns ([#1032](https://github.com/PrismJS/prism/issues/1032)) [[`76ba1b8`](https://github.com/PrismJS/prism/commit/76ba1b8)]
* __PHP__:
	* Make comments greedy. Fix [#197](https://github.com/PrismJS/prism/issues/197) [[`318aab3`](https://github.com/PrismJS/prism/commit/318aab3)]
* __PowerShell__:
	* Fix highlighting of empty comments ([#977](https://github.com/PrismJS/prism/issues/977)) [[`4fda477`](https://github.com/PrismJS/prism/commit/4fda477)]
* __Puppet__:
	* Fix over-greedy regexp detection ([#978](https://github.com/PrismJS/prism/issues/978)) [[`105be25`](https://github.com/PrismJS/prism/commit/105be25)]
* __Ruby__:
	* Fix typo `Fload` to `Float` in prism-ruby.js ([#1023](https://github.com/PrismJS/prism/issues/1023)) [[`22cb018`](https://github.com/PrismJS/prism/commit/22cb018)]
	* Make strings greedy. Fixes [#1048](https://github.com/PrismJS/prism/issues/1048) [[`8b0520a`](https://github.com/PrismJS/prism/commit/8b0520a)]
* __SCSS__:
	* Alias statement as keyword. Fix [#246](https://github.com/PrismJS/prism/issues/246) [[`fd09391`](https://github.com/PrismJS/prism/commit/fd09391)]
	* Highlight variables inside selectors and properties. [[`d6b5c2f`](https://github.com/PrismJS/prism/commit/d6b5c2f)]
	* Highlight parent selector [[`8f5f1fa`](https://github.com/PrismJS/prism/commit/8f5f1fa)]
* __TypeScript__:
	* Add missing `from` keyword to typescript & set `ts` as alias. ([#1042](https://github.com/PrismJS/prism/issues/1042)) [[`cba78f3`](https://github.com/PrismJS/prism/commit/cba78f3)]

### New plugins

* __Copy to Clipboard__ ([#891](https://github.com/PrismJS/prism/issues/891)) [[`07b81ac`](https://github.com/PrismJS/prism/commit/07b81ac)]
* __Custom Class__ ([#950](https://github.com/PrismJS/prism/issues/950)) [[`a0bd686`](https://github.com/PrismJS/prism/commit/a0bd686)]
* __Data-URI Highlight__ ([#996](https://github.com/PrismJS/prism/issues/996)) [[`bdca61b`](https://github.com/PrismJS/prism/commit/bdca61b)]
* __Toolbar__ ([#891](https://github.com/PrismJS/prism/issues/891)) [[`07b81ac`](https://github.com/PrismJS/prism/commit/07b81ac)]

### Updated plugins

* __Autoloader__:
	* Updated documentation for Autoloader plugin [[`b4f3423`](https://github.com/PrismJS/prism/commit/b4f3423)]
    * Download all grammars as a zip from Autoloader plugin page ([#981](https://github.com/PrismJS/prism/issues/981)) [[`0d0a007`](https://github.com/PrismJS/prism/commit/0d0a007), [`5c815d3`](https://github.com/PrismJS/prism/commit/5c815d3)]
    * Removed duplicated script on Autoloader plugin page [[`9671996`](https://github.com/PrismJS/prism/commit/9671996)]
    * Don't try to load "none" component. Fix [#1000](https://github.com/PrismJS/prism/issues/1000) [[`f89b0b9`](https://github.com/PrismJS/prism/commit/f89b0b9)]
* __WPD__:
	* Fix at-rule detection + don't process if language is not handled [[`2626728`](https://github.com/PrismJS/prism/commit/2626728)]

### Other changes

* Improvement to greedy-flag ([#967](https://github.com/PrismJS/prism/issues/967)) [[`500121b`](https://github.com/PrismJS/prism/commit/500121b), [`9893489`](https://github.com/PrismJS/prism/commit/9893489)]
* Add setTimeout fallback for requestAnimationFrame. Fixes [#987](https://github.com/PrismJS/prism/issues/987). ([#988](https://github.com/PrismJS/prism/issues/988)) [[`c9bdcd3`](https://github.com/PrismJS/prism/commit/c9bdcd3)]
* Added aria-hidden attributes on elements created by the Line Highlight and Line Numbers plugins. Fixes [#574](https://github.com/PrismJS/prism/issues/574). [[`e5587a7`](https://github.com/PrismJS/prism/commit/e5587a7)]
* Don't insert space before ">" when there is no attributes [[`3dc8c9e`](https://github.com/PrismJS/prism/commit/3dc8c9e)]
* Added missing hooks-related tests for AsciiDoc, Groovy, Handlebars, Markup, PHP and Smarty [[`c1a0c1b`](https://github.com/PrismJS/prism/commit/c1a0c1b)]
* Fix issue when using Line numbers plugin and Normalise whitespace plugin together with Handlebars, PHP or Smarty. Fix [#1018](https://github.com/PrismJS/prism/issues/1018), [#997](https://github.com/PrismJS/prism/issues/997), [#935](https://github.com/PrismJS/prism/issues/935). Revert [#998](https://github.com/PrismJS/prism/issues/998). [[`86aa3d2`](https://github.com/PrismJS/prism/commit/86aa3d2)]
* Optimized logo ([#990](https://github.com/PrismJS/prism/issues/990)) ([#1002](https://github.com/PrismJS/prism/issues/1002)) [[`f69e570`](https://github.com/PrismJS/prism/commit/f69e570), [`218fd25`](https://github.com/PrismJS/prism/commit/218fd25)]
* Remove unneeded prefixed CSS ([#989](https://github.com/PrismJS/prism/issues/989)) [[`5e56833`](https://github.com/PrismJS/prism/commit/5e56833)]
* Optimize images ([#1007](https://github.com/PrismJS/prism/issues/1007)) [[`b2fa6d5`](https://github.com/PrismJS/prism/commit/b2fa6d5)]
* Add yarn.lock to .gitignore ([#1035](https://github.com/PrismJS/prism/issues/1035)) [[`03ecf74`](https://github.com/PrismJS/prism/commit/03ecf74)]
* Fix greedy flag bug. Fixes [#1039](https://github.com/PrismJS/prism/issues/1039) [[`32cd99f`](https://github.com/PrismJS/prism/commit/32cd99f)]
* Ruby: Fix test after [#1023](https://github.com/PrismJS/prism/issues/1023) [[`b15d43b`](https://github.com/PrismJS/prism/commit/b15d43b)]
* Ini: Fix test after [#1047](https://github.com/PrismJS/prism/issues/1047) [[`25cdd3f`](https://github.com/PrismJS/prism/commit/25cdd3f)]
* Reduce risk of XSS ([#1051](https://github.com/PrismJS/prism/issues/1051)) [[`17e33bc`](https://github.com/PrismJS/prism/commit/17e33bc)]
* env.code can be modified by before-sanity-check hook even when using language-none. Fix [#1066](https://github.com/PrismJS/prism/issues/1066) [[`83bafbd`](https://github.com/PrismJS/prism/commit/83bafbd)]


## 1.5.1 (2016-06-05)

### Updated components

* __Normalize Whitespace__:
	* Add class that disables the normalize whitespace plugin [[`9385c54`](https://github.com/PrismJS/prism/commit/9385c54)]
* __JavaScript Language__:
	* Rearrange the `string` and `template-string` token in JavaScript [[`1158e46`](https://github.com/PrismJS/prism/commit/1158e46)]
* __SQL Language__:
	* add delimeter and delimeters keywords to sql ([#958](https://github.com/PrismJS/prism/pull/958)) [[`a9ef24e`](https://github.com/PrismJS/prism/commit/a9ef24e)]
	* add AUTO_INCREMENT and DATE keywords to sql ([#954](https://github.com/PrismJS/prism/pull/954)) [[`caea2af`](https://github.com/PrismJS/prism/commit/caea2af)]
* __Diff Language__:
	* Highlight diff lines with only + or - ([#952](https://github.com/PrismJS/prism/pull/952)) [[`4d0526f`](https://github.com/PrismJS/prism/commit/4d0526f)]

### Other changes

* Allow for asynchronous loading of prism.js ([#959](https://github.com/PrismJS/prism/pull/959))
* Use toLowerCase on language names ([#957](https://github.com/PrismJS/prism/pull/957)) [[`acd9508`](https://github.com/PrismJS/prism/commit/acd9508)]
* link to index for basic usage - fixes [#945](https://github.com/PrismJS/prism/issues/945) ([#946](https://github.com/PrismJS/prism/pull/946)) [[`6c772d8`](https://github.com/PrismJS/prism/commit/6c772d8)]
* Fixed monospace typo ([#953](https://github.com/PrismJS/prism/pull/953)) [[`e6c3498`](https://github.com/PrismJS/prism/commit/e6c3498)]

## 1.5.0 (2016-05-01)

### New components

* __Bro Language__ ([#925](https://github.com/PrismJS/prism/pull/925))
* __Protocol Buffers Language__ ([#938](https://github.com/PrismJS/prism/pull/938)) [[`ae4a4f2`](https://github.com/PrismJS/prism/commit/ae4a4f2)]

### Updated components

* __Keep Markup__:
	* Fix Keep Markup plugin incorrect highlighting ([#880](https://github.com/PrismJS/prism/pull/880)) [[`24841ef`](https://github.com/PrismJS/prism/commit/24841ef)]
* __Groovy Language__:
	* Fix double HTML-encoding bug in Groovy language [[`24a0936`](https://github.com/PrismJS/prism/commit/24a0936)]
* __Java Language__:
	* Adding annotation token for Java ([#905](https://github.com/PrismJS/prism/pull/905)) [[`367ace6`](https://github.com/PrismJS/prism/commit/367ace6)]
* __SAS Language__:
	* Add missing keywords for SAS ([#922](https://github.com/PrismJS/prism/pull/922))
* __YAML Language__:
	* fix hilighting of YAML keys on first line of code block ([#943](https://github.com/PrismJS/prism/pull/943)) [[`f19db81`](https://github.com/PrismJS/prism/commit/f19db81)]
* __C# Language__:
	* Support for generic methods in csharp [[`6f75735`](https://github.com/PrismJS/prism/commit/6f75735)]

### New plugins

* __Unescaped Markup__ [[`07d77e5`](https://github.com/PrismJS/prism/commit/07d77e5)]
* __Normalize Whitespace__ ([#847](https://github.com/PrismJS/prism/pull/847)) [[`e86ec01`](https://github.com/PrismJS/prism/commit/e86ec01)]

### Other changes

* Add JSPM support [[`ad048ab`](https://github.com/PrismJS/prism/commit/ad048ab)]
* update linear-gradient syntax from `left` to `to right` [[`cd234dc`](https://github.com/PrismJS/prism/commit/cd234dc)]
* Add after-property to allow ordering of plugins [[`224b7a1`](https://github.com/PrismJS/prism/commit/224b7a1)]
* Partial solution for the "Comment-like substrings"-problem [[`2705c50`](https://github.com/PrismJS/prism/commit/2705c50)]
* Add property 'aliasTitles' to components.js [[`54400fb`](https://github.com/PrismJS/prism/commit/54400fb)]
* Add before-highlightall hook [[`70a8602`](https://github.com/PrismJS/prism/commit/70a8602)]
* Fix catastrophic backtracking regex issues in JavaScript [[`ab65be2`](https://github.com/PrismJS/prism/commit/ab65be2)]

## 1.4.1 (2016-02-03)

### Other changes

* Fix DFS bug in Prism core [[`b86c727`](https://github.com/PrismJS/prism/commit/b86c727)]

## 1.4.0 (2016-02-03)

### New components

* __Solarized Light__ ([#855](https://github.com/PrismJS/prism/pull/855)) [[`70846ba`](https://github.com/PrismJS/prism/commit/70846ba)]
* __JSON__ ([#370](https://github.com/PrismJS/prism/pull/370)) [[`ad2fcd0`](https://github.com/PrismJS/prism/commit/ad2fcd0)]

### Updated components

* __Show Language__:
	* Remove data-language attribute ([#840](https://github.com/PrismJS/prism/pull/840)) [[`eb9a83c`](https://github.com/PrismJS/prism/commit/eb9a83c)]
	* Allow custom label without a language mapping ([#837](https://github.com/PrismJS/prism/pull/837)) [[`7e74aef`](https://github.com/PrismJS/prism/commit/7e74aef)]
* __JSX__:
	* Better Nesting in JSX attributes ([#842](https://github.com/PrismJS/prism/pull/842)) [[`971dda7`](https://github.com/PrismJS/prism/commit/971dda7)]
* __File Highlight__:
	* Defer File Highlight until the full DOM has loaded. ([#844](https://github.com/PrismJS/prism/pull/844)) [[`6f995ef`](https://github.com/PrismJS/prism/commit/6f995ef)]
* __Coy Theme__:
	* Fix coy theme shadows ([#865](https://github.com/PrismJS/prism/pull/865)) [[`58d2337`](https://github.com/PrismJS/prism/commit/58d2337)]
* __Show Invisibles__:
	* Ensure show-invisibles compat with autoloader ([#874](https://github.com/PrismJS/prism/pull/874)) [[`c3cfb1f`](https://github.com/PrismJS/prism/commit/c3cfb1f)]
	* Add support for the space character for the show-invisibles plugin ([#876](https://github.com/PrismJS/prism/pull/876)) [[`05442d3`](https://github.com/PrismJS/prism/commit/05442d3)]

### New plugins

* __Command Line__ ([#831](https://github.com/PrismJS/prism/pull/831)) [[`8378906`](https://github.com/PrismJS/prism/commit/8378906)]

### Other changes

* Use document.currentScript instead of document.getElementsByTagName() [[`fa98743`](https://github.com/PrismJS/prism/commit/fa98743)]
* Add prefix for Firefox selection and move prefixed rule first [[`6d54717`](https://github.com/PrismJS/prism/commit/6d54717)]
* No background for `<code>` in `<pre>` [[`8c310bc`](https://github.com/PrismJS/prism/commit/8c310bc)]
* Fixing to initial copyright year [[`69cbf7a`](https://github.com/PrismJS/prism/commit/69cbf7a)]
* Simplify the “lang” regex [[`417f54a`](https://github.com/PrismJS/prism/commit/417f54a)]
* Fix broken heading links [[`a7f9e62`](https://github.com/PrismJS/prism/commit/a7f9e62)]
* Prevent infinite recursion in DFS [[`02894e1`](https://github.com/PrismJS/prism/commit/02894e1)]
* Fix incorrect page title [[`544b56f`](https://github.com/PrismJS/prism/commit/544b56f)]
* Link scss to webplatform wiki [[`08d979a`](https://github.com/PrismJS/prism/commit/08d979a)]
* Revert white-space to normal when code is inline instead of in a pre [[`1a971b5`](https://github.com/PrismJS/prism/commit/1a971b5)]

## 1.3.0 (2015-10-26)

### New components

* __AsciiDoc__ ([#800](https://github.com/PrismJS/prism/issues/800)) [[`6803ca0`](https://github.com/PrismJS/prism/commit/6803ca0)]
* __Haxe__ ([#811](https://github.com/PrismJS/prism/issues/811)) [[`bd44341`](https://github.com/PrismJS/prism/commit/bd44341)]
* __Icon__ ([#803](https://github.com/PrismJS/prism/issues/803)) [[`b43c5f3`](https://github.com/PrismJS/prism/commit/b43c5f3)]
* __Kotlin__ ([#814](https://github.com/PrismJS/prism/issues/814)) [[`e8a31a5`](https://github.com/PrismJS/prism/commit/e8a31a5)]
* __Lua__ ([#804](https://github.com/PrismJS/prism/issues/804)) [[`a36bc4a`](https://github.com/PrismJS/prism/commit/a36bc4a)]
* __Nix__ ([#795](https://github.com/PrismJS/prism/issues/795)) [[`9b275c8`](https://github.com/PrismJS/prism/commit/9b275c8)]
* __Oz__ ([#805](https://github.com/PrismJS/prism/issues/805)) [[`388c53f`](https://github.com/PrismJS/prism/commit/388c53f)]
* __PARI/GP__ ([#802](https://github.com/PrismJS/prism/issues/802)) [[`253c035`](https://github.com/PrismJS/prism/commit/253c035)]
* __Parser__ ([#808](https://github.com/PrismJS/prism/issues/808)) [[`a953b3a`](https://github.com/PrismJS/prism/commit/a953b3a)]
* __Puppet__ ([#813](https://github.com/PrismJS/prism/issues/813)) [[`81933ee`](https://github.com/PrismJS/prism/commit/81933ee)]
* __Roboconf__ ([#812](https://github.com/PrismJS/prism/issues/812)) [[`f5db346`](https://github.com/PrismJS/prism/commit/f5db346)]

### Updated components

* __C__:
	* Highlight directives in preprocessor lines ([#801](https://github.com/PrismJS/prism/issues/801)) [[`ad316a3`](https://github.com/PrismJS/prism/commit/ad316a3)]
* __C#__:
	* Highlight directives in preprocessor lines ([#801](https://github.com/PrismJS/prism/issues/801)) [[`ad316a3`](https://github.com/PrismJS/prism/commit/ad316a3)]
	* Fix detection of float numbers ([#806](https://github.com/PrismJS/prism/issues/806)) [[`1dae72b`](https://github.com/PrismJS/prism/commit/1dae72b)]
* __F#__:
	* Highlight directives in preprocessor lines ([#801](https://github.com/PrismJS/prism/issues/801)) [[`ad316a3`](https://github.com/PrismJS/prism/commit/ad316a3)]
* __JavaScript__:
	* Highlight true and false as booleans ([#801](https://github.com/PrismJS/prism/issues/801)) [[`ad316a3`](https://github.com/PrismJS/prism/commit/ad316a3)]
* __Python__:
	* Highlight triple-quoted strings before comments. Fix [#815](https://github.com/PrismJS/prism/issues/815) [[`90fbf0b`](https://github.com/PrismJS/prism/commit/90fbf0b)]

### New plugins

* __Previewer: Time__ ([#790](https://github.com/PrismJS/prism/issues/790)) [[`88173de`](https://github.com/PrismJS/prism/commit/88173de)]
* __Previewer: Angle__ ([#791](https://github.com/PrismJS/prism/issues/791)) [[`a434c86`](https://github.com/PrismJS/prism/commit/a434c86)]

### Other changes

* Increase mocha's timeout [[`f1c41db`](https://github.com/PrismJS/prism/commit/f1c41db)]
* Prevent most errors in IE8. Fix [#9](https://github.com/PrismJS/prism/issues/9) [[`9652d75`](https://github.com/PrismJS/prism/commit/9652d75)]
* Add U.S. Web Design Standards on homepage. Fix [#785](https://github.com/PrismJS/prism/issues/785) [[`e10d48b`](https://github.com/PrismJS/prism/commit/e10d48b), [`79ebbf8`](https://github.com/PrismJS/prism/commit/79ebbf8), [`2f7088d`](https://github.com/PrismJS/prism/commit/2f7088d)]
* Added gulp task to autolink PRs and commits in changelog [[`5ec4e4d`](https://github.com/PrismJS/prism/commit/5ec4e4d)]
* Use child processes to run each set of tests, in order to deal with the memory leak in vm.runInNewContext() [[`9a4b6fa`](https://github.com/PrismJS/prism/commit/9a4b6fa)]

## 1.2.0 (2015-10-07)

### New components

* __Batch__ ([#781](https://github.com/PrismJS/prism/issues/781)) [[`eab5b06`](https://github.com/PrismJS/prism/commit/eab5b06)]

### Updated components

* __ASP.NET__:
	* Simplified pattern for `<script>` [[`29643f4`](https://github.com/PrismJS/prism/issues/29643f4)]
* __Bash__:
	* Fix regression in strings ([#792](https://github.com/PrismJS/prism/issues/792)) [[`bd275c2`](https://github.com/PrismJS/prism/commit/bd275c2)]
	* Substantially reduce wrongly highlighted stuff ([#793](https://github.com/PrismJS/prism/issues/793)) [[`ac6fe2e`](https://github.com/PrismJS/prism/commit/ac6fe2e)]
* __CSS__:
	* Simplified pattern for `<style>` [[`29643f4`](https://github.com/PrismJS/prism/issues/29643f4)]
* __JavaScript__:
	* Simplified pattern for `<script>` [[`29643f4`](https://github.com/PrismJS/prism/issues/29643f4)]

### New plugins

* __Previewer: Gradient__ ([#783](https://github.com/PrismJS/prism/issues/783)) [[`9a63483`](https://github.com/PrismJS/prism/commit/9a63483)]

### Updated plugins

* __Previewer: Color__
	* Add support for Sass variables [[`3a1fb04`](https://github.com/PrismJS/prism/commit/3a1fb04)]

* __Previewer: Easing__
	* Add support for Sass variables [[`7c7ab4e`](https://github.com/PrismJS/prism/commit/7c7ab4e)]

### Other changes

* Test runner: Allow to run tests for only some languages [[`5ade8a5`](https://github.com/PrismJS/prism/issues/5ade8a5)]
* Download page: Fixed wrong components order raising error in generated file ([#797](https://github.com/PrismJS/prism/issues/787)) [[`7a6aed8`](https://github.com/PrismJS/prism/commit/7a6aed8)]

## 1.1.0 (2015-10-04)

### New components

* __ABAP__ ([#636](https://github.com/PrismJS/prism/issues/636)) [[`75b0328`](https://github.com/PrismJS/prism/commit/75b0328), [`0749129`](https://github.com/PrismJS/prism/commit/0749129)]
* __APL__ ([#308](https://github.com/PrismJS/prism/issues/308)) [[`1f45942`](https://github.com/PrismJS/prism/commit/1f45942), [`33a295f`](https://github.com/PrismJS/prism/commit/33a295f)]
* __AutoIt__ ([#771](https://github.com/PrismJS/prism/issues/771)) [[`211a41c`](https://github.com/PrismJS/prism/commit/211a41c)]
* __BASIC__ ([#620](https://github.com/PrismJS/prism/issues/620)) [[`805a0ce`](https://github.com/PrismJS/prism/commit/805a0ce)]
* __Bison__ ([#764](https://github.com/PrismJS/prism/issues/764)) [[`7feb135`](https://github.com/PrismJS/prism/commit/7feb135)]
* __Crystal__ ([#780](https://github.com/PrismJS/prism/issues/780)) [[`5b473de`](https://github.com/PrismJS/prism/commit/5b473de), [`414848d`](https://github.com/PrismJS/prism/commit/414848d)]
* __D__ ([#613](https://github.com/PrismJS/prism/issues/613)) [[`b5e741c`](https://github.com/PrismJS/prism/commit/b5e741c)]
* __Diff__ ([#450](https://github.com/PrismJS/prism/issues/450)) [[`ef41c74`](https://github.com/PrismJS/prism/commit/ef41c74)]
* __Docker__ ([#576](https://github.com/PrismJS/prism/issues/576)) [[`e808352`](https://github.com/PrismJS/prism/commit/e808352)]
* __Elixir__ ([#614](https://github.com/PrismJS/prism/issues/614)) [[`a1c028c`](https://github.com/PrismJS/prism/commit/a1c028c), [`c451611`](https://github.com/PrismJS/prism/commit/c451611), [`2e637f0`](https://github.com/PrismJS/prism/commit/2e637f0), [`ccb6566`](https://github.com/PrismJS/prism/commit/ccb6566)]
* __GLSL__ ([#615](https://github.com/PrismJS/prism/issues/615)) [[`247da05`](https://github.com/PrismJS/prism/commit/247da05)]
* __Inform 7__ ([#616](https://github.com/PrismJS/prism/issues/616)) [[`d2595b4`](https://github.com/PrismJS/prism/commit/d2595b4)]
* __J__ ([#623](https://github.com/PrismJS/prism/issues/623)) [[`0cc50b2`](https://github.com/PrismJS/prism/commit/0cc50b2)]
* __MEL__ ([#618](https://github.com/PrismJS/prism/issues/618)) [[`8496c14`](https://github.com/PrismJS/prism/commit/8496c14)]
* __Mizar__ ([#619](https://github.com/PrismJS/prism/issues/619)) [[`efde61d`](https://github.com/PrismJS/prism/commit/efde61d)]
* __Monkey__ ([#621](https://github.com/PrismJS/prism/issues/621)) [[`fdd4a3c`](https://github.com/PrismJS/prism/commit/fdd4a3c)]
* __nginx__ ([#776](https://github.com/PrismJS/prism/issues/776)) [[`dc4fc19`](https://github.com/PrismJS/prism/commit/dc4fc19), [`e62c88e`](https://github.com/PrismJS/prism/commit/e62c88e)]
* __Nim__ ([#622](https://github.com/PrismJS/prism/issues/622)) [[`af9c49a`](https://github.com/PrismJS/prism/commit/af9c49a)]
* __OCaml__ ([#628](https://github.com/PrismJS/prism/issues/628)) [[`556c04d`](https://github.com/PrismJS/prism/commit/556c04d)]
* __Processing__ ([#629](https://github.com/PrismJS/prism/issues/629)) [[`e47087b`](https://github.com/PrismJS/prism/commit/e47087b)]
* __Prolog__ ([#630](https://github.com/PrismJS/prism/issues/630)) [[`dd04c32`](https://github.com/PrismJS/prism/commit/dd04c32)]
* __Pure__ ([#626](https://github.com/PrismJS/prism/issues/626)) [[`9c276ab`](https://github.com/PrismJS/prism/commit/9c276ab)]
* __Q__ ([#624](https://github.com/PrismJS/prism/issues/624)) [[`c053c9e`](https://github.com/PrismJS/prism/commit/c053c9e)]
* __Qore__ [[`125e91f`](https://github.com/PrismJS/prism/commit/125e91f)]
* __Tcl__ [[`a3e751a`](https://github.com/PrismJS/prism/commit/a3e751a), [`11ff829`](https://github.com/PrismJS/prism/commit/11ff829)]
* __Textile__ ([#544](https://github.com/PrismJS/prism/issues/544)) [[`d0c6764`](https://github.com/PrismJS/prism/commit/d0c6764)]
* __Verilog__ ([#640](https://github.com/PrismJS/prism/issues/640)) [[`44a11c2`](https://github.com/PrismJS/prism/commit/44a11c2), [`795eb99`](https://github.com/PrismJS/prism/commit/795eb99)]
* __Vim__ [[`69ea994`](https://github.com/PrismJS/prism/commit/69ea994)]

### Updated components

* __Bash__:
	* Add support for Here-Documents ([#787](https://github.com/PrismJS/prism/issues/787)) [[`b57a096`](https://github.com/PrismJS/prism/commit/b57a096)]
	* Remove C-like dependency ([#789](https://github.com/PrismJS/prism/issues/789)) [[`1ab4619`](https://github.com/PrismJS/prism/commit/1ab4619)]
* __C__:
	* Fixed numbers [[`4d64d07`](https://github.com/PrismJS/prism/commit/4d64d07), [`071c3dd`](https://github.com/PrismJS/prism/commit/071c3dd)]
* __C-like__:
	* Add word boundary before class-name prefixes [[`aa757f6`](https://github.com/PrismJS/prism/commit/aa757f6)]
	* Improved operator regex + add != and !== [[`135ee9d`](https://github.com/PrismJS/prism/commit/135ee9d)]
	* Optimized string regexp [[`792e35c`](https://github.com/PrismJS/prism/commit/792e35c)]
* __F#__:
	* Fixed keywords containing exclamation mark [[`09f2005`](https://github.com/PrismJS/prism/commit/09f2005)]
	* Improved string pattern [[`0101c89`](https://github.com/PrismJS/prism/commit/0101c89)]
	* Insert preprocessor before keyword + don't allow line feeds before # [[`fdc9477`](https://github.com/PrismJS/prism/commit/fdc9477)]
	* Fixed numbers [[`0aa0791`](https://github.com/PrismJS/prism/commit/0aa0791)]
* __Gherkin__:
	* Don't allow spaces in tags [[`48ff8b7`](https://github.com/PrismJS/prism/commit/48ff8b7)]
	* Handle \r\n and \r + allow feature alone + don't match blank td/th [[`ce1ec3b`](https://github.com/PrismJS/prism/commit/ce1ec3b)]
* __Git__:
	* Added more examples ([#652](https://github.com/PrismJS/prism/issues/652)) [[`95dc102`](https://github.com/PrismJS/prism/commit/95dc102)]
	* Add support for unified diff. Fixes [#769](https://github.com/PrismJS/prism/issues/769), fixes [#357](https://github.com/PrismJS/prism/issues/357), closes [#401](https://github.com/PrismJS/prism/issues/401) [[`3aadd5d`](https://github.com/PrismJS/prism/commit/3aadd5d)]
* __Go__:
	* Improved operator regexp + removed punctuation from it [[`776ab90`](https://github.com/PrismJS/prism/commit/776ab90)]
* __Haml__:
	* Combine both multiline-comment regexps + handle \r\n and \r [[`f77b40b`](https://github.com/PrismJS/prism/commit/f77b40b)]
	* Handle \r\n and \r in filter regex [[`bbe68ac`](https://github.com/PrismJS/prism/commit/bbe68ac)]
* __Handlebars__:
	* Fix empty strings, add plus sign in exponential notation, improve block pattern and variable pattern [[`c477f9a`](https://github.com/PrismJS/prism/commit/c477f9a)]
	* Properly escape special replacement patterns ($) in Handlebars, PHP and Smarty. Fix [#772](https://github.com/PrismJS/prism/issues/772) [[`895bf46`](https://github.com/PrismJS/prism/commit/895bf46)]
* __Haskell__:
	* Removed useless backslashes and parentheses + handle \r\n and \r + simplify number regexp + fix operator regexp [[`1cc8d8e`](https://github.com/PrismJS/prism/commit/1cc8d8e)]
* __HTTP__:
	* Fix indentation + Add multiline flag for more flexibility + Fix response status + Handle \r\n and \r [[`aaa90f1`](https://github.com/PrismJS/prism/commit/aaa90f1)]
* __Ini__:
	* Fix some regexps + remove unused flags [[`53d5839`](https://github.com/PrismJS/prism/commit/53d5839)]
* __Jade__:
	* Add todo list + remove single-line comment pattern + simplified most patterns with m flag + handle \r\n and \r [[`a79e838`](https://github.com/PrismJS/prism/commit/a79e838)]
* __Java__:
	* Fix number regexp + simplified number regexp and optimized operator regexp [[`21e20b9`](https://github.com/PrismJS/prism/commit/21e20b9)]
* __JavaScript__:
	* JavaScript: Allow for all non-ASCII characters in function names. Fix [#400](https://github.com/PrismJS/prism/issues/400) [[`29e26dc`](https://github.com/PrismJS/prism/commit/29e26dc)]
* __JSX__:
	* Allow for one level of nesting in scripts (Fix [#717](https://github.com/PrismJS/prism/issues/717)) [[`90c75d5`](https://github.com/PrismJS/prism/commit/90c75d5)]
* __Julia__:
	* Simplify comment regexp + improved number regexp + improved operator regexp [[`bcac7d4`](https://github.com/PrismJS/prism/commit/bcac7d4)]
* __Keyman__:
	* Move header statements above keywords [[`23a444c`](https://github.com/PrismJS/prism/commit/23a444c)]
* __LaTeX__:
	* Simplify comment regexp [[`132b41a`](https://github.com/PrismJS/prism/commit/132b41a)]
	* Extend support [[`942a6ec`](https://github.com/PrismJS/prism/commit/942a6ec)]
* __Less__:
	* Remove useless part in property regexp [[`80d8260`](https://github.com/PrismJS/prism/commit/80d8260)]
* __LOLCODE__:
	* Removed useless parentheses [[`8147c9b`](https://github.com/PrismJS/prism/commit/8147c9b)]
* __Makefile__:
	* Add known failures in example [[`e0f8984`](https://github.com/PrismJS/prism/commit/e0f8984)]
	* Handle \r\n in comments and strings + fix "-include" keyword
* __Markup__:
	* Simplify patterns + handle \r\n and \r [[`4c551e8`](https://github.com/PrismJS/prism/commit/4c551e8)]
	* Don't allow = to appear in tag name [[`85d8a55`](https://github.com/PrismJS/prism/commit/85d8a55)]
	* Don't allow dot inside tag name [[`283691e`](https://github.com/PrismJS/prism/commit/283691e)]
* __MATLAB__:
	* Simplify string pattern to remove lookbehind [[`a3cbecc`](https://github.com/PrismJS/prism/commit/a3cbecc)]
* __NASM__:
	* Converted indents to tabs, removed uneeded escapes, added lookbehinds [[`a92e4bd`](https://github.com/PrismJS/prism/commit/a92e4bd)]
* __NSIS__:
	* Simplified patterns [[`bbd83d4`](https://github.com/PrismJS/prism/commit/bbd83d4)]
	* Fix operator regexp [[`44ad8dc`](https://github.com/PrismJS/prism/commit/44ad8dc)]
* __Objective-C__:
	* Simplified regexps + fix strings + handle \r [[`1d33147`](https://github.com/PrismJS/prism/commit/1d33147)]
	* Fix operator regexp [[`e9d382e`](https://github.com/PrismJS/prism/commit/e9d382e)]
* __Pascal__:
	* Simplified regexps [[`c03c8a4`](https://github.com/PrismJS/prism/commit/c03c8a4)]
* __Perl__:
	* Simplified regexps + Made most string and regexp patterns multi-line + Added support for regexp's n flag + Added missing operators [[`71b00cc`](https://github.com/PrismJS/prism/commit/71b00cc)]
* __PHP__:
	* Simplified patterns [[`f9d9452`](https://github.com/PrismJS/prism/commit/f9d9452)]
	* Properly escape special replacement patterns ($) in Handlebars, PHP and Smarty. Fix [#772](https://github.com/PrismJS/prism/issues/772) [[`895bf46`](https://github.com/PrismJS/prism/commit/895bf46)]
* __PHP Extras__:
	* Fix $this regexp + improve global regexp [[`781fdad`](https://github.com/PrismJS/prism/commit/781fdad)]
* __PowerShell__:
	* Update definitions for command/alias/operators [[`14da55c`](https://github.com/PrismJS/prism/commit/14da55c)]
* __Python__:
	* Added async/await and @ operator ([#656](https://github.com/PrismJS/prism/issues/656)) [[`7f1ae75`](https://github.com/PrismJS/prism/commit/7f1ae75)]
	* Added 'self' keyword and support for class names ([#677](https://github.com/PrismJS/prism/issues/677)) [[`d9d4ab2`](https://github.com/PrismJS/prism/commit/d9d4ab2)]
	* Simplified regexps + don't capture where unneeded + fixed operators [[`530f5f0`](https://github.com/PrismJS/prism/commit/530f5f0)]
* __R__:
	* Fixed and simplified patterns [[`c20c3ec`](https://github.com/PrismJS/prism/commit/c20c3ec)]
* __reST__:
	* Simplified some patterns, fixed others, prevented blank comments to match, moved list-bullet down to prevent breaking quotes [[`e6c6b85`](https://github.com/PrismJS/prism/commit/e6c6b85)]
* __Rip__:
	* Fixed some regexp + moved down numbers [[`1093f7d`](https://github.com/PrismJS/prism/commit/1093f7d)]
* __Ruby__:
	* Code cleaning, handle \r\n and \r, fix some regexps [[`dd4989f`](https://github.com/PrismJS/prism/commit/dd4989f)]
	* Add % notations for strings and regexps. Fix [#590](https://github.com/PrismJS/prism/issues/590) [[`2d37800`](https://github.com/PrismJS/prism/commit/2d37800)]
* __Rust__:
	* Simplified patterns and fixed operators [[`6c8494f`](https://github.com/PrismJS/prism/commit/6c8494f)]
* __SAS__:
	* Simplified datalines and optimized operator patterns [[`6ebb96f`](https://github.com/PrismJS/prism/commit/6ebb96f)]
* __Sass__:
	* Add missing require in components [[`35b8c50`](https://github.com/PrismJS/prism/commit/35b8c50)]
	* Fix comments, operators and selectors and simplified patterns [[`28759d0`](https://github.com/PrismJS/prism/commit/28759d0)]
	* Highlight "-" as operator only if surrounded by spaces, in order to not break hyphenated values (e.g. "ease-in-out") [[`b2763e7`](https://github.com/PrismJS/prism/commit/b2763e7)]
* __Scala__:
	* Simplified patterns [[`daf2597`](https://github.com/PrismJS/prism/commit/daf2597)]
* __Scheme__:
	* Add missing lookbehind on number pattern. Fix [#702](https://github.com/PrismJS/prism/issues/702) [[`3120ff7`](https://github.com/PrismJS/prism/commit/3120ff7)]
	* Fixes and simplifications [[`068704a`](https://github.com/PrismJS/prism/commit/068704a)]
	* Don't match content of symbols starting with a parenthesis [[`fa7df08`](https://github.com/PrismJS/prism/commit/fa7df08)]
* __Scss__:
	* Simplified patterns + fixed operators + don't match empty selectors [[`672c167`](https://github.com/PrismJS/prism/commit/672c167)]
* __Smalltalk__:
	* Simplified patterns [[`d896622`](https://github.com/PrismJS/prism/commit/d896622)]
* __Smarty__:
	* Optimized regexps + fixed punctuation and operators [[`1446700`](https://github.com/PrismJS/prism/commit/1446700)]
	* Properly escape special replacement patterns ($) in Handlebars, PHP and Smarty. Fix [#772](https://github.com/PrismJS/prism/issues/772) [[`895bf46`](https://github.com/PrismJS/prism/commit/895bf46)]
* __SQL__:
	* Simplified regexp + fixed keywords and operators + add CHARSET keyword [[`d49fec0`](https://github.com/PrismJS/prism/commit/d49fec0)]
* __Stylus__:
	* Rewrote the component entirely [[`7729728`](https://github.com/PrismJS/prism/commit/7729728)]
* __Swift__:
	* Optimized keywords lists and removed duplicates [[`936e429`](https://github.com/PrismJS/prism/commit/936e429)]
	* Add support for string interpolation. Fix [#448](https://github.com/PrismJS/prism/issues/448) [[`89cd5d0`](https://github.com/PrismJS/prism/commit/89cd5d0)]
* __Twig__:
	* Prevent "other" pattern from matching blank strings [[`cae2cef`](https://github.com/PrismJS/prism/commit/cae2cef)]
	* Optimized regexps + fixed operators + added missing operators/keywords [[`2d8271f`](https://github.com/PrismJS/prism/commit/2d8271f)]
* __VHDL__:
	* Move operator overloading before strings, don't capture if not needed, handle \r\n and \r, fix numbers [[`4533f17`](https://github.com/PrismJS/prism/commit/4533f17)]
* __Wiki markup__:
	* Fixed emphasis + merged some url patterns + added TODOs [[`8cf9e6a`](https://github.com/PrismJS/prism/commit/8cf9e6a)]
* __YAML__:
	* Handled \r\n and \r, simplified some patterns, fixed "---" [[`9e33e0a`](https://github.com/PrismJS/prism/commit/9e33e0a)]

### New plugins

* __Autoloader__ ([#766](https://github.com/PrismJS/prism/issues/766)) [[`ed4ccfe`](https://github.com/PrismJS/prism/commit/ed4ccfe)]
* __JSONP Highlight__ [[`b2f14d9`](https://github.com/PrismJS/prism/commit/b2f14d9)]
* __Keep Markup__ ([#770](https://github.com/PrismJS/prism/issues/770)) [[`bd3e9ea`](https://github.com/PrismJS/prism/commit/bd3e9ea)]
* __Previewer: Base__ ([#767](https://github.com/PrismJS/prism/issues/767)) [[`cf764c0`](https://github.com/PrismJS/prism/commit/cf764c0)]
* __Previewer: Color__ ([#767](https://github.com/PrismJS/prism/issues/767)) [[`cf764c0`](https://github.com/PrismJS/prism/commit/cf764c0)]
* __Previewer: Easing__ ([#773](https://github.com/PrismJS/prism/issues/773)) [[`513137c`](https://github.com/PrismJS/prism/commit/513137c), [`9207258`](https://github.com/PrismJS/prism/commit/9207258), [`4303c94`](https://github.com/PrismJS/prism/commit/4303c94)]
* __Remove initial line feed__ [[`ed9f2b2`](https://github.com/PrismJS/prism/commit/ed9f2b2), [`b8d098e`](https://github.com/PrismJS/prism/commit/b8d098e)]

### Updated plugins

* __Autolinker__:
	* Don't process all grammars on load, process each one in before-highlight. Should fix [#760](https://github.com/PrismJS/prism/issues/760) [[`a572495`](https://github.com/PrismJS/prism/commit/a572495)]
* __Line Highlight__:
	* Run in `complete` hook [[`f237e67`](https://github.com/PrismJS/prism/commit/f237e67)]
	* Fixed position when font-size is odd ([#668](https://github.com/PrismJS/prism/issues/668)) [[`86bbd4c`](https://github.com/PrismJS/prism/commit/86bbd4c), [`8ed7ce3`](https://github.com/PrismJS/prism/commit/8ed7ce3)]
* __Line Numbers__:
	* Run in `complete` hook [[`3f4d918`](https://github.com/PrismJS/prism/commit/3f4d918)]
	* Don't run if already exists [[`c89bbdb`](https://github.com/PrismJS/prism/commit/c89bbdb)]
	* Don't run if block is empty. Fix [#669](https://github.com/PrismJS/prism/issues/669) [[`ee463e8`](https://github.com/PrismJS/prism/commit/ee463e8)]
	* Correct calculation for number of lines (fix [#385](https://github.com/PrismJS/prism/issues/385)) [[`14f3f80`](https://github.com/PrismJS/prism/commit/14f3f80)]
	* Fix computation of line numbers for single-line code blocks. Fix [#721](https://github.com/PrismJS/prism/issues/721) [[`02b220e`](https://github.com/PrismJS/prism/commit/02b220e)]
	* Fixing word wrap on long code lines [[`56b3d29`](https://github.com/PrismJS/prism/commit/56b3d29)]
	* Fixing coy theme + line numbers plugin overflowing on long blocks of text ([#762](https://github.com/PrismJS/prism/issues/762)) [[`a0127eb`](https://github.com/PrismJS/prism/commit/a0127eb)]
* __Show Language__:
	* Add gulp task to build languages map in Show language plugin (Fix [#671](https://github.com/PrismJS/prism/issues/671)) [[`39bd827`](https://github.com/PrismJS/prism/commit/39bd827)]
	* Add reset styles to prevent bug in Coy theme ([#703](https://github.com/PrismJS/prism/issues/703)) [[`08dd500`](https://github.com/PrismJS/prism/commit/08dd500)]

### Other changes

* Fixed link to David Peach article ([#647](https://github.com/PrismJS/prism/issues/647)) [[`3f679f8`](https://github.com/PrismJS/prism/commit/3f679f8)]
* Added `complete` hook, which runs even when no grammar is found [[`e58b6c0`](https://github.com/PrismJS/prism/commit/e58b6c0), [`fd54995`](https://github.com/PrismJS/prism/commit/fd54995)]
* Added test suite runner ([#588](https://github.com/PrismJS/prism/issues/588)) [[`956cd85`](https://github.com/PrismJS/prism/commit/956cd85)]
* Added tests for every components
* Added `.gitattributes` to prevent line ending changes in test files [[`45ca8c8`](https://github.com/PrismJS/prism/commit/45ca8c8)]
* Split plugins into 3 columns on Download page [[`a88936a`](https://github.com/PrismJS/prism/commit/a88936a)]
* Removed comment in components.js to make it easier to parse as JSON ([#679](https://github.com/PrismJS/prism/issues/679)) [[`2cb1326`](https://github.com/PrismJS/prism/commit/2cb1326)]
* Updated README.md [[`1388256`](https://github.com/PrismJS/prism/commit/1388256)]
* Updated documentation since the example was not relevant any more [[`80aedb2`](https://github.com/PrismJS/prism/commit/80aedb2)]
* Fixed inline style for Coy theme [[`52829b3`](https://github.com/PrismJS/prism/commit/52829b3)]
* Prevent errors in nodeJS ([#754](https://github.com/PrismJS/prism/issues/754)) [[`9f5c93c`](https://github.com/PrismJS/prism/commit/9f5c93c), [`0356c58`](https://github.com/PrismJS/prism/commit/0356c58)]
* Explicitly make the Worker close itself after highlighting, so that users have control on this behaviour when directly using Prism inside a Worker. Fix [#492](https://github.com/PrismJS/prism/issues/492) [[`e42a228`](https://github.com/PrismJS/prism/commit/e42a228)]
* Added some language aliases: js for javascript, xml, html, mathml and svg for markup [[`2f9fe1e`](https://github.com/PrismJS/prism/commit/2f9fe1e)]
* Download page: Add a "Select all" checkbox ([#561](https://github.com/PrismJS/prism/issues/561)) [[`9a9020b`](https://github.com/PrismJS/prism/commit/9a9020b)]
* Download page: Don't add semicolon unless needed in generated code. Fix [#273](https://github.com/PrismJS/prism/issues/273) [[`5a5eec5`](https://github.com/PrismJS/prism/commit/5a5eec5)]
* Add language counter on homepage [[`889cda5`](https://github.com/PrismJS/prism/commit/889cda5)]
* Improve performance by doing more work in the worker [[`1316abc`](https://github.com/PrismJS/prism/commit/1316abc)]
* Replace Typeplate with SitePoint on homepage. Fix [#774](https://github.com/PrismJS/prism/issues/774) [[`0c54308`](https://github.com/PrismJS/prism/commit/0c54308)]
* Added basic `.editorconfig` [[`c48f55d`](https://github.com/PrismJS/prism/commit/c48f55d)]

---

## 1.0.1 (2015-07-26)

### New components

* __Brainfuck__ ([#611](https://github.com/PrismJS/prism/issues/611)) [[`3ede718`](https://github.com/PrismJS/prism/commit/3ede718)]
* __Keyman__ ([#609](https://github.com/PrismJS/prism/issues/609)) [[`2698f82`](https://github.com/PrismJS/prism/commit/2698f82), [`e9936c6`](https://github.com/PrismJS/prism/commit/e9936c6)]
* __Makefile__ ([#610](https://github.com/PrismJS/prism/issues/610)) [[`3baa61c`](https://github.com/PrismJS/prism/commit/3baa61c)]
* __Sass (Sass)__ (fix [#199](https://github.com/PrismJS/prism/issues/199)) [[`b081804`](https://github.com/PrismJS/prism/commit/b081804)]
* __VHDL__ ([#595](https://github.com/PrismJS/prism/issues/595)) [[`43e6157`](https://github.com/PrismJS/prism/commit/43e6157)]

### Updated components

* __ActionScript__:
	* Fix ! operator and add ++ and -- as whole operators [[`6bf0794`](https://github.com/PrismJS/prism/commit/6bf0794)]
	* Fix XML highlighting [[`90257b0`](https://github.com/PrismJS/prism/commit/90257b0)]
	* Update examples to add inline XML [[`2c1626a`](https://github.com/PrismJS/prism/commit/2c1626a), [`3987711`](https://github.com/PrismJS/prism/commit/3987711)]
* __Apache Configuration__:
	* Don't include the spaces in directive-inline [[`e87efd8`](https://github.com/PrismJS/prism/commit/e87efd8)]
* __AppleScript__:
	* Allow one level of nesting in block comments [[`65894c5`](https://github.com/PrismJS/prism/commit/65894c5)]
	* Removed duplicates between operators and keywords [[`1ec5a81`](https://github.com/PrismJS/prism/commit/1ec5a81)]
	* Removed duplicates between keywords and classes [[`e8d09f6`](https://github.com/PrismJS/prism/commit/e8d09f6)]
	* Move numbers up so they are not broken by operator pattern [[`66dac31`](https://github.com/PrismJS/prism/commit/66dac31)]
* __ASP.NET__:
	* Prevent Markup tags from breaking ASP tags + fix MasterType directive [[`1f0a336`](https://github.com/PrismJS/prism/commit/1f0a336)]
* __AutoHotkey__:
	* Allow tags (labels) to be highlighted at the end of the code [[`0a1fc4b`](https://github.com/PrismJS/prism/commit/0a1fc4b)]
	* Match all operators + add comma to punctuation [[`f0ccb1b`](https://github.com/PrismJS/prism/commit/f0ccb1b)]
	* Removed duplicates in keywords lists [[`fe0a068`](https://github.com/PrismJS/prism/commit/fe0a068)]
* __Bash__:
	* Simplify comment regex [[`2700981`](https://github.com/PrismJS/prism/commit/2700981)]
	* Removed duplicates in keywords + removed unneeded parentheses [[`903b8a4`](https://github.com/PrismJS/prism/commit/903b8a4)]
* __C__:
	* Removed string pattern (inherited from C-like) [[`dcce1a7`](https://github.com/PrismJS/prism/commit/dcce1a7)]
	* Better support for macro statements [[`4868635`](https://github.com/PrismJS/prism/commit/4868635)]
* __C#__:
	* Fix preprocessor pattern [[`86311f5`](https://github.com/PrismJS/prism/commit/86311f5)]
* __C++__:
	* Removed delete[] and new[] broken keywords [[`42fbeef`](https://github.com/PrismJS/prism/commit/42fbeef)]
* __C-like__:
	* Removed unused 'ignore' pattern [[`b6535dd`](https://github.com/PrismJS/prism/commit/b6535dd)]
	* Use look-ahead instead of inside to match functions [[`d4194c9`](https://github.com/PrismJS/prism/commit/d4194c9)]
* __CoffeeScript__:
	* Prevent strings from ending with a backslash [[`cb6b824`](https://github.com/PrismJS/prism/commit/cb6b824)]
* __CSS__:
	* Highlight parentheses as punctuation [[`cd0273e`](https://github.com/PrismJS/prism/commit/cd0273e)]
	* Improved highlighting of at-rules [[`e254088`](https://github.com/PrismJS/prism/commit/e254088)]
	* Improved URL and strings [[`901812c`](https://github.com/PrismJS/prism/commit/901812c)]
	* Selector regexp should not include last spaces before brace [[`f2e2718`](https://github.com/PrismJS/prism/commit/f2e2718)]
	* Handle \r\n [[`15760e1`](https://github.com/PrismJS/prism/commit/15760e1)]
* __Eiffel__:
	* Fix string patterns order + fix /= operator [[`7d1b8d7`](https://github.com/PrismJS/prism/commit/7d1b8d7)]
* __Erlang__:
	* Fixed quoted functions, quoted atoms, variables and <= operator [[`fa286aa`](https://github.com/PrismJS/prism/commit/fa286aa)]
* __Fortran__:
	* Improved pattern for comments inside strings [[`40ae215`](https://github.com/PrismJS/prism/commit/40ae215)]
	* Fixed order in keyword pattern [[`8a6d32d`](https://github.com/PrismJS/prism/commit/8a6d32d)]
* __Handlebars__:
	* Support blocks with dashes ([#587](https://github.com/PrismJS/prism/issues/587)) [[`f409b13`](https://github.com/PrismJS/prism/commit/f409b13)]
* __JavaScript__:
	* Added support for 'y' and 'u' ES6 JavaScript regex flags ([#596](https://github.com/PrismJS/prism/issues/596)) [[`5d99957`](https://github.com/PrismJS/prism/commit/5d99957)]
	* Added support for missing ES6 keywords in JavaScript ([#596](https://github.com/PrismJS/prism/issues/596)) [[`ca68b87`](https://github.com/PrismJS/prism/commit/ca68b87)]
	* Added `async` and `await` keywords ([#575](https://github.com/PrismJS/prism/issues/575)) [[`5458cec`](https://github.com/PrismJS/prism/commit/5458cec)]
	* Added support for Template strings + interpolation [[`04f72b1`](https://github.com/PrismJS/prism/commit/04f72b1)]
	* Added support for octal and binary numbers ([#597](https://github.com/PrismJS/prism/issues/597)) [[`a8aa058`](https://github.com/PrismJS/prism/commit/a8aa058)]
	* Improve regex performance of C-like strings and JS regexps [[`476cbf4`](https://github.com/PrismJS/prism/commit/476cbf4)]
* __Markup__:
	* Allow non-ASCII chars in tag names and attributes (fix [#585](https://github.com/PrismJS/prism/issues/585)) [[`52fd55e`](https://github.com/PrismJS/prism/commit/52fd55e)]
	* Optimized tag's regexp so that it stops crashing on large unclosed tags [[`75452ba`](https://github.com/PrismJS/prism/commit/75452ba)]
	* Highlight single quotes in attr-value as punctuation [[`1ebcb8e`](https://github.com/PrismJS/prism/commit/1ebcb8e)]
	* Doctype and prolog can be multi-line [[`c19a238`](https://github.com/PrismJS/prism/commit/c19a238)]
* __Python__:
	* Added highlighting for function declaration ([#601](https://github.com/PrismJS/prism/issues/601)) [[`a88aae8`](https://github.com/PrismJS/prism/commit/a88aae8)]
	* Fixed wrong highlighting of variables named a, b, c... f ([#601](https://github.com/PrismJS/prism/issues/601)) [[`a88aae8`](https://github.com/PrismJS/prism/commit/a88aae8)]
* __Ruby__:
	* Added support for string interpolation [[`c36b123`](https://github.com/PrismJS/prism/commit/c36b123)]
* __Scss__:
	* Fixed media queries highlighting [[`bf8e032`](https://github.com/PrismJS/prism/commit/bf8e032)]
	* Improved highlighting inside at-rules [[`eef4248`](https://github.com/PrismJS/prism/commit/eef4248)]
	* Match placeholders inside selectors (fix [#238](https://github.com/PrismJS/prism/issues/238)) [[`4e42e26`](https://github.com/PrismJS/prism/commit/4e42e26)]
* __Swift__:
	* Update keywords list (fix [#625](https://github.com/PrismJS/prism/issues/625)) [[`88f44a7`](https://github.com/PrismJS/prism/commit/88f44a7)]

### Updated plugins

* __File Highlight__:
	* Allow to specify the highlighting language. Fix [#607](https://github.com/PrismJS/prism/issues/607) [[`8030db9`](https://github.com/PrismJS/prism/commit/8030db9)]
* __Line Highlight__:
	* Fixed incorrect height in IE9 ([#604](https://github.com/PrismJS/prism/issues/604)) [[`f1705eb`](https://github.com/PrismJS/prism/commit/f1705eb)]
	* Prevent errors in IE8 [[`5f133c8`](https://github.com/PrismJS/prism/commit/5f133c8)]

### Other changes

* Removed moot `version` property from `bower.json` ([#594](https://github.com/PrismJS/prism/issues/594)) [[`4693499`](https://github.com/PrismJS/prism/commit/4693499)]
* Added repository to `bower.json` ([#600](https://github.com/PrismJS/prism/issues/600)) [[`8e5ebcc`](https://github.com/PrismJS/prism/commit/8e5ebcc)]
* Added `.DS_Store` to `.gitignore` [[`1707e4e`](https://github.com/PrismJS/prism/commit/1707e4e)]
* Improve test drive page usability. Fix [#591](https://github.com/PrismJS/prism/issues/591) [[`fe60858`](https://github.com/PrismJS/prism/commit/fe60858)]
* Fixed prism-core and prism-file-highlight to prevent errors in IE8 [[`5f133c8`](https://github.com/PrismJS/prism/commit/5f133c8)]
* Add Ubuntu Mono font to font stack [[`ed9d7e3`](https://github.com/PrismJS/prism/commit/ed9d7e3)]

---

## 1.0.0 (2015-05-23)

* First release
* Supported languages:
	* ActionScript
	* Apache Configuration
	* AppleScript
	* ASP.NET (C#)
	* AutoHotkey
	* Bash
	* C
	* C#
	* C++
	* C-like
	* CoffeeScript
	* CSS
	* CSS Extras
	* Dart
	* Eiffel
	* Erlang
	* F#
	* Fortran
	* Gherkin
	* Git
	* Go
	* Groovy
	* Haml
	* Handlebars
	* Haskell
	* HTTP
	* Ini
	* Jade
	* Java
	* JavaScript
	* Julia
	* LaTeX
	* Less
	* LOLCODE
	* Markdown
	* Markup
	* MATLAB
	* NASM
	* NSIS
	* Objective-C
	* Pascal
	* Perl
	* PHP
	* PHP Extras
	* PowerShell
	* Python
	* R
	* React JSX
	* reST
	* Rip
	* Ruby
	* Rust
	* SAS
	* Sass (Scss)
	* Scala
	* Scheme
	* Smalltalk
	* Smarty
	* SQL
	* Stylus
	* Swift
	* Twig
	* TypeScript
	* Wiki markup
	* YAML
* Plugins:
	* Autolinker
	* File Highlight
	* Highlight Keywords
	* Line Highlight
	* Line Numbers
	* Show Invisibles
	* Show Language
	* WebPlatform Docs
