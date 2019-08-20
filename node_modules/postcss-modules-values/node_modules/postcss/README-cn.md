# PostCSS [![Gitter][chat-img]][chat]

<img align="right" width="95" height="95"
     alt="哲学家的石头 - PostCSS 的 logo"
     src="http://postcss.github.io/postcss/logo.svg">

[chat-img]: https://img.shields.io/badge/Gitter-Join_the_PostCSS_chat-brightgreen.svg
[chat]:     https://gitter.im/postcss/postcss

PostCSS 是一个允许使用 JS 插件转换样式的工具。
这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins，
编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。

PostCSS 在工业界被广泛地应用，其中不乏很多有名的行业领导者，如：维基百科，Twitter，阿里巴巴，
JetBrains。PostCSS 的 [Autoprefixer] 插件是最流行的 CSS 处理工具之一。

PostCSS 接收一个 CSS 文件并提供了一个 API 来分析、修改它的规则（通过把 CSS 规则转换成一个[抽象语法树]的方式）。在这之后，这个 API 便可被许多[插件]利用来做有用的事情，比如寻错或自动添加 CSS vendor 前缀。

**Twitter 账号:** [@postcss](https://twitter.com/postcss)<br>
**支持 / 讨论:**   [Gitter](https://gitter.im/postcss/postcss)<br>

如果需要 PostCSS 商业支持（如咨询，提升公司的前端文化，
PostCSS 插件），请联系 [Evil Martians](https://evilmartians.com/?utm_source=postcss)
邮箱 <surrender@evilmartians.com>。

[抽象语法树]:     https://zh.wikipedia.org/wiki/%E6%8A%BD%E8%B1%A1%E8%AA%9E%E6%B3%95%E6%A8%B9
[Autoprefixer]: https://github.com/postcss/autoprefixer
[插件]:          https://github.com/postcss/postcss/blob/master/README-cn.md#%E6%8F%92%E4%BB%B6

<a href="https://evilmartians.com/?utm_source=postcss">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="由 Evil Martians 赞助" width="236" height="54">
</a>

## 插件

截止到目前，PostCSS 有 200 多个插件。你可以在 [插件列表] 或 [搜索目录] 找到它们。
下方的列表是我们最喜欢的插件 - 它们很好地演示了我们可以用 PostCSS 做些什么。

如果你有任何新的想法，[开发 PostCSS 插件] 非常简单易上手。

[搜索目录]: http://postcss.parts
[插件列表]: https://github.com/postcss/postcss/blob/master/docs/plugins.md

### 解决全局 CSS 的问题

* [`postcss-use`] 允许你在 CSS 里明确地设置 PostCSS 插件，并且只在当前文件执行它们。
* [`postcss-modules`] 和 [`react-css-modules`] 可以自动以组件为单位隔绝 CSS 选择器。
* [`postcss-autoreset`] 是全局样式重置的又一个选择，它更适用于分离的组件。
* [`postcss-initial`] 添加了 `all: initial` 的支持，重置了所有继承的样式。
* [`cq-prolyfill`] 添加了容器查询的支持，允许添加响应于父元素宽度的样式.

### 提前使用先进的 CSS 特性

* [`autoprefixer`] 添加了 vendor 浏览器前缀，它使用 Can I Use 上面的数据。
* [`postcss-preset-env`] 允许你使用未来的 CSS 特性。

### 更佳的 CSS 可读性

* [`precss`] 囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等。
* [`postcss-sorting`] 给规则的内容以及@规则排序。
* [`postcss-utilities`] 囊括了最常用的简写方式和书写帮助。
* [`short`] 添加并拓展了大量的缩写属性。

### 图片和字体

* [`postcss-assets`] 可以插入图片尺寸和内联文件。
* [`postcss-sprites`] 能生成雪碧图。
* [`font-magician`] 生成所有在 CSS 里需要的 `@font-face` 规则。
* [`postcss-inline-svg`] 允许你内联 SVG 并定制它的样式。
* [`postcss-write-svg`] 允许你在 CSS 里写简单的 SVG。

### 提示器（Linters）

* [`stylelint`] 是一个模块化的样式提示器。
* [`stylefmt`] 是一个能根据 `stylelint` 规则自动优化 CSS 格式的工具。
* [`doiuse`] 提示 CSS 的浏览器支持性，使用的数据来自于 Can I Use。
* [`colorguard`] 帮助你保持一个始终如一的调色板。

### 其它

* [`postcss-rtl`] 在单个 CSS 文件里组合了两个方向（左到右，右到左）的样式。
* [`cssnano`] 是一个模块化的 CSS 压缩器。
* [`lost`] 是一个功能强大的 `calc()` 栅格系统。
* [`rtlcss`] 镜像翻转 CSS 样式，适用于 right-to-left 的应用场景。

[`postcss-inline-svg`]:         https://github.com/TrySound/postcss-inline-svg
[`postcss-preset-env`]:         https://github.com/jonathantneal/postcss-preset-env
[`react-css-modules`]:          https://github.com/gajus/react-css-modules
[`postcss-autoreset`]:          https://github.com/maximkoretskiy/postcss-autoreset
[`postcss-write-svg`]:          https://github.com/jonathantneal/postcss-write-svg
[`postcss-utilities`]:          https://github.com/ismamz/postcss-utilities
[`postcss-initial`]:            https://github.com/maximkoretskiy/postcss-initial
[`postcss-sprites`]:            https://github.com/2createStudio/postcss-sprites
[`postcss-modules`]:            https://github.com/outpunk/postcss-modules
[`postcss-sorting`]:            https://github.com/hudochenkov/postcss-sorting
[`postcss-assets`]:             https://github.com/assetsjs/postcss-assets
[开发 PostCSS 插件]:             https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md
[`font-magician`]:              https://github.com/jonathantneal/postcss-font-magician
[`autoprefixer`]:               https://github.com/postcss/autoprefixer
[`cq-prolyfill`]:               https://github.com/ausi/cq-prolyfill
[`postcss-rtl`]:                https://github.com/vkalinichev/postcss-rtl
[`postcss-use`]:                https://github.com/postcss/postcss-use
[`css-modules`]:                https://github.com/css-modules/css-modules
[`colorguard`]:                 https://github.com/SlexAxton/css-colorguard
[`stylelint`]:                  https://github.com/stylelint/stylelint
[`stylefmt`]:                   https://github.com/morishitter/stylefmt
[`cssnano`]:                    http://cssnano.co
[`precss`]:                     https://github.com/jonathantneal/precss
[`doiuse`]:                     https://github.com/anandthakker/doiuse
[`rtlcss`]:                     https://github.com/MohammadYounes/rtlcss
[`short`]:                      https://github.com/jonathantneal/postcss-short
[`lost`]:                       https://github.com/peterramsing/lost

## 语法

PostCSS 可以转化样式到任意语法，不仅仅是 CSS。
如果还没有支持你最喜欢的语法，你可以编写一个解释器以及（或者）一个 stringifier 来拓展 PostCSS。

* [`sugarss`] 是一个以缩进为基础的语法，类似于 Sass 和 Stylus。
* [`postcss-syntax`] 通过文件扩展名自动切换语法。
* [`postcss-html`] 解析类 HTML 文件里`<style>`标签中的样式。
* [`postcss-markdown`] 解析 Markdown 文件里代码块中的样式。
* [`postcss-jsx`] 解析源文件里模板或对象字面量中的CSS。
* [`postcss-styled`] 解析源文件里模板字面量中的CSS。
* [`postcss-scss`] 允许你使用 SCSS *(但并没有将 SCSS 编译到 CSS)*。
* [`postcss-sass`] 允许你使用 Sass *(但并没有将 Sass 编译到 CSS)*。
* [`postcss-less`] 允许你使用 Less *(但并没有将 LESS 编译到 CSS)*。
* [`postcss-less-engine`] 允许你使用 Less *(并且使用真正的 Less.js 把 LESS 编译到 CSS)*。
* [`postcss-js`] 允许你在 JS 里编写样式，或者转换成 React 的内联样式／Radium／JSS。
* [`postcss-safe-parser`] 查找并修复 CSS 语法错误。
* [`midas`] 将 CSS 字符串转化成高亮的 HTML。

[`postcss-less-engine`]: https://github.com/Crunch/postcss-less
[`postcss-safe-parser`]: https://github.com/postcss/postcss-safe-parser
[`postcss-syntax`]:      https://github.com/gucong3000/postcss-syntax
[`postcss-html`]:        https://github.com/gucong3000/postcss-html
[`postcss-markdown`]:    https://github.com/gucong3000/postcss-markdown
[`postcss-jsx`]:         https://github.com/gucong3000/postcss-jsx
[`postcss-styled`]:      https://github.com/gucong3000/postcss-styled
[`postcss-scss`]:        https://github.com/postcss/postcss-scss
[`postcss-sass`]:        https://github.com/AleshaOleg/postcss-sass
[`postcss-less`]:        https://github.com/webschik/postcss-less
[`postcss-js`]:          https://github.com/postcss/postcss-js
[`sugarss`]:             https://github.com/postcss/sugarss
[`midas`]:               https://github.com/ben-eb/midas

## 文章

* [一些你对 PostCSS 可能产生的误解](http://julian.io/some-things-you-may-think-about-postcss-and-you-might-be-wrong)
* [PostCSS 究竟是什么，是做什么的](http://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss)
* [PostCSS 指南](http://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889)

你可以在 [awesome-postcss](https://github.com/jjaderg/awesome-postcss) 列表里找到更多优秀的文章和视频。

## 书籍

* Alex Libby, Packt 的 [网页设计之精通 PostCSS](https://www.packtpub.com/web-development/mastering-postcss-web-design) (2016年6月)

## 使用方法

你可以通过简单的两步便开始使用 PostCSS：

1. 在你的构建工具中查找并添加 PostCSS 拓展。
2. [选择插件]并将它们添加到你的 PostCSS 处理队列中。

[选择插件]: http://postcss.parts

### Webpack

在 `webpack.config.js` 里使用 [`postcss-loader`] :

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    }
}
```

然后创建 `postcss.config.js`:

```js
module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')
    ]
}
```

[`postcss-loader`]: https://github.com/postcss/postcss-loader

### Gulp

使用 [`gulp-postcss`] 和 [`gulp-sourcemaps`].

```js
gulp.task('css', function () {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('src/**/*.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('build/') );
});
```

[`gulp-sourcemaps`]: https://github.com/floridoo/gulp-sourcemaps
[`gulp-postcss`]:    https://github.com/postcss/gulp-postcss

### npm run / CLI

如果需要在你的命令行界面或 npm 脚本里使用 PostCSS，你可以使用 [`postcss-cli`]。

```sh
postcss --use autoprefixer -c options.json -o main.css css/*.css
```

[`postcss-cli`]: https://github.com/postcss/postcss-cli

### 浏览器

如果你想编译浏览器里的 CSS 字符串（例如像 CodePen 一样的在线编辑器），
只需使用 [Browserify] 或  [webpack]。它们会把 PostCSS 和插件文件打包进一个独立文件。

如果想要在 React 内联样式／JSS／Radium／其它 [CSS-in-JS] 里使用 PostCSS，
你可以用 [`postcss-js`] 然后转换样式对象。

```js
var postcss  = require('postcss-js');
var prefixer = postcss.sync([ require('autoprefixer') ]);

prefixer({ display: 'flex' }); //=> { display: ['-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex'] }
```

[`postcss-js`]: https://github.com/postcss/postcss-js
[Browserify]:   http://browserify.org/
[CSS-in-JS]:    https://github.com/MicheleBertoli/css-in-js
[webpack]:      https://webpack.github.io/

### 运行器

* **Grunt**: [`grunt-postcss`](https://github.com/nDmitry/grunt-postcss)
* **HTML**: [`posthtml-postcss`](https://github.com/posthtml/posthtml-postcss)
* **Stylus**: [`poststylus`](https://github.com/seaneking/poststylus)
* **Rollup**: [`rollup-plugin-postcss`](https://github.com/egoist/rollup-plugin-postcss)
* **Brunch**: [`postcss-brunch`](https://github.com/brunch/postcss-brunch)
* **Broccoli**: [`broccoli-postcss`](https://github.com/jeffjewiss/broccoli-postcss)
* **Meteor**: [`postcss`](https://atmospherejs.com/juliancwirko/postcss)
* **ENB**: [`enb-postcss`](https://github.com/awinogradov/enb-postcss)
* **Taskr**: [`taskr-postcss`](https://github.com/lukeed/taskr/tree/master/packages/postcss)
* **Start**: [`start-postcss`](https://github.com/start-runner/postcss)
* **Connect/Express**: [`postcss-middleware`](https://github.com/jedmao/postcss-middleware)

### JS API

对于其它的应用环境，你可以使用 JS API：

```js
const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

fs.readFile('src/app.css', (err, css) => {
    postcss([precss, autoprefixer])
        .process(css, { from: 'src/app.css', to: 'dest/app.css' })
        .then(result => {
            fs.writeFile('dest/app.css', result.css);
            if ( result.map ) fs.writeFile('dest/app.css.map', result.map);
        });
});
```

阅读 [PostCSS API 文档] 获取更多有关 JS API 的信息.

所有的 PostCSS 运行器应当通过 [PostCSS 运行器指南]。

[PostCSS 运行器指南]: https://github.com/postcss/postcss/blob/master/docs/guidelines/runner.md
[PostCSS API 文档]:  http://api.postcss.org/postcss.html

### 配置选项

绝大多数 PostCSS 运行器接受两个参数：

* 一个包含所需插件的数组
* 一个配置选项的对象

常见的选项：

* `syntax`: 一个提供了语法解释器和 stringifier 的对象。
* `parser`: 一个特殊的语法解释器（例如 [SCSS]）。
* `stringifier`: 一个特殊的语法 output 生成器（例如 [Midas]）。
* `map`: [source map 选项].
* `from`: input 文件名称（大多数运行器自动设置了这个）。
* `to`: output 文件名称（大多数运行器自动设置了这个）。

[source map 选项]: https://github.com/postcss/postcss/blob/master/docs/source-maps.md
[Midas]:          https://github.com/ben-eb/midas
[SCSS]:           https://github.com/postcss/postcss-scss

### Atom

* [`language-postcss`] 添加了 PostCSS 和 [SugarSS] 代码高亮。
* [`source-preview-postcss`] 在一个独立窗口里实时预览生成的 CSS。

[SugarSS]: https://github.com/postcss/sugarss

### Sublime Text

* [`Syntax-highlighting-for-PostCSS`] 添加了 PostCSS 代码高亮。

[`Syntax-highlighting-for-PostCSS`]: https://github.com/hudochenkov/Syntax-highlighting-for-PostCSS
[`source-preview-postcss`]:          https://atom.io/packages/source-preview-postcss
[`language-postcss`]:                https://atom.io/packages/language-postcss

### Vim

* [`postcss.vim`] 添加了 PostCSS 代码高亮。

[`postcss.vim`]: https://github.com/stephenway/postcss.vim

### WebStorm

自 WebStorm 2016.3 开始，[提供了] 内建的 PostCSS 支持。

[提供了]: https://blog.jetbrains.com/webstorm/2016/08/webstorm-2016-3-early-access-preview/
