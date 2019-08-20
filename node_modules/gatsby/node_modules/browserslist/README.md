# Browserslist [![Cult Of Martians][cult-img]][cult]

<img align="right" width="120" height="120"
     src="./logo.svg" alt="Browserslist logo by Anton Lovchikov">

Library to share target browsers between different front-end tools.
It is used in:

* [Autoprefixer]
* [Babel]
  (external config in `package.json` or `browserslist` will be supported in 7.0)
* [postcss-preset-env]
* [eslint-plugin-compat]
* [stylelint-no-unsupported-browser-features]
* [postcss-normalize]

[Browserslist Example] shows how every tool uses Browserslist.
All tools will find target browsers automatically,
when you add the following to `package.json`:

```json
{
  "browserslist": [
    "> 1%",
    "IE 10"
  ]
}
```

Or in `.browserslistrc` config:

```yaml
# Browsers that we support

> 1%
IE 10 # sorry
```

Developers set browsers list in queries like `last 2 version`
to be free from updating browser versions manually.
Browserslist will use [Can I Use] data for this queries.

Browserslist will take browsers queries from tool option,
`browserslist` config, `.browserslistrc` config,
`browserslist` section in `package.json` or environment variables.

You can test Browserslist queries in [online demo].

[cult-img]: http://cultofmartians.com/assets/badges/badge.svg
[cult]: http://cultofmartians.com/done.html

<a href="https://evilmartians.com/?utm_source=browserslist">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

[stylelint-no-unsupported-browser-features]: https://github.com/ismay/stylelint-no-unsupported-browser-features
[eslint-plugin-compat]:                      https://github.com/amilajack/eslint-plugin-compat
[Browserslist Example]:                       https://github.com/browserslist/browserslist-example
[postcss-preset-env]:                        https://github.com/jonathantneal/postcss-preset-env
[postcss-normalize]:                         https://github.com/jonathantneal/postcss-normalize
[Autoprefixer]:                              https://github.com/postcss/autoprefixer
[online demo]:                               http://browserl.ist/
[Can I Use]:                                 http://caniuse.com/
[Babel]:                          https://github.com/babel/babel/tree/master/packages/babel-preset-env

## Tools

* [`browserslist-ga`] downloads your website browsers statistics
  to use it in `> 0.5% in my stats` query.
* [`browserslist-useragent`] checks browser by user agent string
  to match Browserslist target browsers query.
* [`browserslist-useragent-ruby`] is a Ruby library to checks browser
  by user agent string to match Browserslist.
* [`caniuse-api`] returns browsers which support some specific feature.
* Run `npx browserslist` in your project directory to see project’s
  target browsers. This CLI tool is built-in and available in any project
  with Autoprefixer.

[`browserslist-useragent-ruby`]: https://github.com/browserslist/browserslist-useragent-ruby
[`browserslist-useragent`]:      https://github.com/pastelsky/browserslist-useragent
[`browserslist-ga`]:             https://github.com/browserslist/browserslist-ga
[`caniuse-api`]:                 https://github.com/Nyalab/caniuse-api


## Queries

Browserslist will use browsers query from one of this sources:

1. Tool options. For example `browsers` option in Autoprefixer.
2. `BROWSERSLIST` environment variable.
3. `browserslist` config file in current or parent directories.
3. `.browserslistrc` config file in current or parent directories.
4. `browserslist` key in `package.json` file in current or parent directories.
   **We recommend this way.**
5. If the above methods did not produce a valid result
   Browserslist will use defaults:
   `> 0.5%, last 2 versions, Firefox ESR, not dead`.


### Best Practices

* Select browsers directly (`last 2 Chrome versions`) only if you are making
  web app for kiosk with one browser. There are a lot browsers on the market.
  If you are making general web app you should respect browsers diversity.
* If you want to change the default set of browsers we recommend to combine
  `last 1 version`, `not dead` with `> 0.2%` (or `> 1% in US`,
  `> 1% in my stats`). Just `last n versions` adds to many dead browsers
  and do not add popular old versions. Just `> 0.2%` make popular browsers even
  more popular, so we will have a monopoly and stagnation, as we had
  with Internet Explorer 6.
* Don’t remove browsers just because you don’t know them. Opera Mini has
  100 million users in Africa and it is more popular in global market,
  than Microsoft Edge. Chinese QQ Browsers has more market share than Firefox
  and desktop Safari altogether.


### Full List

You can specify the versions by queries (case insensitive):

* `> 5%`: versions selected by global usage statistics.
  `>=`, `<` and `<=` work too.
* `> 5% in US`: uses USA usage statistics. It accepts [two-letter country code].
* `> 5% in alt-AS`: uses Asia region usage statistics. List of all region codes
  can be found at [`caniuse-lite/data/regions`].
* `> 5% in my stats`: uses [custom usage data].
* `cover 99.5%`: most popular browsers that provide coverage.
* `cover 99.5% in US`: same as above, with [two-letter country code].
* `cover 99.5% in my stats`: uses [custom usage data].
* `extends browserslist-config-mycompany`: take queries from
  `browserslist-config-mycompany` npm package.
* `ie 6-8`: selects an inclusive range of versions.
* `Firefox > 20`: versions of Firefox newer than 20.
  `>=`, `<` and `<=` work too.
* `iOS 7`: the iOS browser version 7 directly.
* `Firefox ESR`: the latest [Firefox ESR] version.
* `unreleased versions` or `unreleased Chrome versions`:
  alpha and beta versions.
* `last 2 major versions` or `last 2 iOS major versions`:
  all minor/patch releases of last 2 major versions.
* `since 2015` or `last 2 years`: all versions released since year 2015
  (also `since 2015-03` and `since 2015-03-10`).
* `dead`: browsers from `last 2 version` query, but with less than 0.5%
  in global usage statistics and without official support or updates
  for 24 months. Right now it is `IE 10`, `IE_Mob 10`, `BlackBerry 10`,
  `BlackBerry 7`, and `OperaMobile 12.1`.
* `last 2 versions`: the last 2 versions for *each* browser.
* `last 2 Chrome versions`: the last 2 versions of Chrome browser.
* `defaults`: Browserslist’s default browsers
  (`> 0.5%, last 2 versions, Firefox ESR, not dead`).
* `not ie <= 8`: exclude browsers selected by previous queries.

You can add `not ` to any query.


### Debug

Run `npx browserslist` in project directory to see what browsers was selected
by your queries.

```sh
$ npx browserslist
and_chr 61
and_ff 56
and_qq 1.2
and_uc 11.4
android 56
baidu 7.12
bb 10
chrome 62
edge 16
firefox 56
ios_saf 11
opera 48
safari 11
samsung 5
```


### Notes

Browserslist works with separated versions of browsers.
You should avoid queries like `Firefox > 0`.

Multiple criteria are combined as a boolean `OR`. A browser version must match
at least one of the criteria to be selected.

All queries are based on the [Can I Use] support table,
e.g. `last 3 iOS versions` might select `8.4, 9.2, 9.3` (mixed major and minor),
whereas `last 3 Chrome versions` might select `50, 49, 48` (major only).

[`caniuse-lite/data/regions`]: https://github.com/ben-eb/caniuse-lite/tree/master/data/regions
[two-letter country code]:     http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
[custom usage data]:           #custom-usage-data
[Can I Use]:                   http://caniuse.com/


### Browsers

Names are case insensitive:

* `Android` for Android WebView.
* `Baidu` for Baidu Browser.
* `BlackBerry` or `bb` for Blackberry browser.
* `Chrome` for Google Chrome.
* `ChromeAndroid` or `and_chr` for Chrome for Android
* `Edge` for Microsoft Edge.
* `Electron` for Electron framework. It will be converted to Chrome version.
* `Explorer` or `ie` for Internet Explorer.
* `ExplorerMobile` or `ie_mob` for Internet Explorer Mobile.
* `Firefox` or `ff` for Mozilla Firefox.
* `FirefoxAndroid` or `and_ff` for Firefox for Android.
* `iOS` or `ios_saf` for iOS Safari.
* `Opera` for Opera.
* `OperaMini` or `op_mini` for Opera Mini.
* `OperaMobile` or `op_mob` for Opera Mobile.
* `QQAndroid` or `and_qq` for QQ Browser for Android.
* `Safari` for desktop Safari.
* `Samsung` for Samsung Internet.
* `UCAndroid` or `and_uc` for UC Browser for Android.


## `package.json`

If you want to reduce config files in project root, you can specify
browsers in `package.json` with `browserslist` key:

```json
{
  "private": true,
  "dependencies": {
    "autoprefixer": "^6.5.4"
  },
  "browserslist": [
    "> 1%",
    "IE 10"
  ]
}
```


## Config File

Browserslist config should be named `.browserslistrc` or `browserslist`
and have browsers queries split by a new line. Comments starts with `#` symbol:

```yaml
# Browsers that we support

> 1%
IE 10 # sorry
```

Browserslist will check config in every directory in `path`.
So, if tool process `app/styles/main.css`, you can put config to root,
`app/` or `app/styles`.

You can specify direct path in `BROWSERSLIST_CONFIG` environment variables.


## Shareable Configs

You can use the following query to reference an exported Browserslist config
from another package:

```json
  "browserslist": [
    "extends browserslist-config-mycompany"
  ]
```

For security reasons, external configuration only supports packages that have
the `browserslist-config-` prefix. npm scoped packages are also supported, by
naming or prefixing the module with `@scope/browserslist-config`, such as
`@scope/browserslist-config` or `@scope/browserslist-config-mycompany`.

If you don’t accept Browserslist queries from users, you can disable the
validation by using the `dangerousExtend` option:

```js
browserslist(queries, { path, dangerousExtend: true })
```

Because this uses `npm`'s resolution, you can also reference specific files
in a package:

```json
  "browserslist": [
    "extends browserslist-config-mycompany/desktop",
    "extends browserslist-config-mycompany/mobile"
  ]
```

When writing a shared Browserslist package, just export an array.
`browserslist-config-mycompany/index.js`:

```js
module.exports = [
  '> 1%',
  'ie 10'
]
```


## Environment Variables

If some tool use Browserslist inside, you can change browsers settings
by [environment variables]:

* `BROWSERSLIST` with browsers queries.

   ```sh
  BROWSERSLIST="> 5%" gulp css
   ```

* `BROWSERSLIST_CONFIG` with path to config file.

   ```sh
  BROWSERSLIST_CONFIG=./config/browserslist gulp css
   ```

* `BROWSERSLIST_ENV` with environments string.

   ```sh
  BROWSERSLIST_ENV="development" gulp css
   ```

* `BROWSERSLIST_STATS` with path to the custom usage data
  for `> 1% in my stats` query.

   ```sh
  BROWSERSLIST_STATS=./config/usage_data.json gulp css
   ```

* `BROWSERSLIST_DISABLE_CACHE` if you want to disable config reading cache.

   ```sh
  BROWSERSLIST_DISABLE_CACHE=1 gulp css
   ```

[environment variables]: https://en.wikipedia.org/wiki/Environment_variable


## Environments

You can also specify different browser queries for various environments.
Browserslist will choose query according to `BROWSERSLIST_ENV` or `NODE_ENV`
variables. If none of them is declared, Browserslist will firstly look
for `production` queries and then use defaults.

In `package.json`:

```js
  "browserslist": {
    "production": [
      "> 1%",
      "ie 10"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version"
    ]
  }
```

In `.browserslistrc` config:

```ini
[production staging]
> 1%
ie 10

[development]
last 1 chrome version
last 1 firefox version
```


## Custom Usage Data

If you have a website, you can query against the usage statistics of your site.
[`browserslist-ga`] will ask access to Google Analytics and then generate
`browserslist-stats.json`:

```
npx browserslist-ga
```

Of course, you can generate usage statistics file by any other method.
File format should be like:

```js
{
  "ie": {
    "6": 0.01,
    "7": 0.4,
    "8": 1.5
  },
  "chrome": {
    …
  },
  …
}
```

Note that you can query against your custom usage data
while also querying against global or regional data.
For example, the query `> 1% in my stats, > 5% in US, 10%` is permitted.

[`browserslist-ga`]: https://github.com/browserslist/browserslist-ga
[Can I Use]:         http://caniuse.com/


## JS API

```js
var browserslist = require('browserslist');

// Your CSS/JS build tool code
var process = function (source, opts) {
    var browsers = browserslist(opts.browsers, {
        stats: opts.stats,
        path:  opts.file,
        env:   opts.env
    });
    // Your code to add features for selected browsers
}
```

Queries can be a string `"> 1%, IE 10"`
or an array `['> 1%', 'IE 10']`.

If a query is missing, Browserslist will look for a config file.
You can provide a `path` option (that can be a file) to find the config file
relatively to it.

Options:

* `path`: file or a directory path to look for config file. Default is `.`.
* `env`: what environment section use from config. Default is `production`.
* `stats`: custom usage statistics data.
* `config`: path to config if you want to set it manually.
* `ignoreUnknownVersions`: do not throw on direct query (like `ie 12`).
  Default is `false.`
* `dangerousExtend`: Disable security checks for `extend` query.
  Default is `false.`

For non-JS environment and debug purpose you can use CLI tool:

```sh
browserslist "> 1%, IE 10"
```


## Coverage

You can get total users coverage for selected browsers by JS API:

```js
browserslist.coverage(browserslist('> 1%'))
//=> 81.4
```

```js
browserslist.coverage(browserslist('> 1% in US'), 'US')
//=> 83.1
```

```js
browserslist.coverage(browserslist('> 1% in my stats'), 'my stats')
//=> 83.1
```

```js
browserslist.coverage(browserslist('> 1% in my stats', { stats }), stats)
//=> 82.2
```

Or by CLI:

```sh
$ browserslist --coverage "> 1%"
These browsers account for 81.4% of all users globally
```

```sh
$ browserslist --coverage=US "> 1% in US"
These browsers account for 83.1% of all users in the US
```

```sh
$ browserslist --coverage "> 1% in my stats"
These browsers account for 83.1% of all users in custom statistics
```

```sh
$ browserslist --coverage "> 1% in my stats" --stats=./stats.json
These browsers account for 83.1% of all users in custom statistics
```


## Cache

Browserslist caches the configuration it reads from `package.json` and
`browserslist` files, as well as knowledge about the existence of files,
for the duration of the hosting process.

To clear these caches, use:

```js
browserslist.clearCaches();
```

To disable the caching altogether, set the `BROWSERSLIST_DISABLE_CACHE`
environment variable.
