[english](https://github.com/svg/svgo/blob/master/README.md) | **русский**
- - -

<img src="https://svg.github.io/svgo-logo.svg" width="200" height="200" alt="logo"/>

## SVGO [![NPM version](https://badge.fury.io/js/svgo.svg)](https://npmjs.org/package/svgo) [![Build Status](https://secure.travis-ci.org/svg/svgo.svg)](https://travis-ci.org/svg/svgo) [![Coverage Status](https://img.shields.io/coveralls/svg/svgo.svg)](https://coveralls.io/r/svg/svgo?branch=master)

**SVG** **O**ptimizer – это инструмент для оптимизации векторной графики в формате SVG, написанный на Node.js.
![](https://mc.yandex.ru/watch/18431326)

## Зачем?

SVG-файлы, особенно экспортированные из редакторов, содержат много избыточной и бесполезной информации, комментариев, скрытых элементов, неоптимальные или стандартные значения и другой мусор, удаление которого безопасно и не влияет на конечный вид изображения.

## Возможности

SVGO имеет расширяемую архитектуру, в которой почти каждая оптимизация является отдельным расширением.

Что у нас есть:

| Plugin | Description |
| ------ | ----------- |
| [cleanupAttrs](https://github.com/svg/svgo/blob/master/plugins/cleanupAttrs.js) | удаление переносов строк и лишних пробелов |
| [inlineStyles](https://github.com/svg/svgo/blob/master/plugins/inlineStyles.js) | перенос стилей из элементов `<style>` в атрибуты `style` |
| [removeDoctype](https://github.com/svg/svgo/blob/master/plugins/removeDoctype.js) | удаление doctype |
| [removeXMLProcInst](https://github.com/svg/svgo/blob/master/plugins/removeXMLProcInst.js) | удаление XML-инструкций |
| [removeComments](https://github.com/svg/svgo/blob/master/plugins/removeComments.js) | удаление комментариев |
| [removeMetadata](https://github.com/svg/svgo/blob/master/plugins/removeMetadata.js) | удаление `<metadata>` |
| [removeTitle](https://github.com/svg/svgo/blob/master/plugins/removeTitle.js) | удаление `<title>` |
| [removeDesc](https://github.com/svg/svgo/blob/master/plugins/removeDesc.js) | удаление `<desc>` |
| [removeUselessDefs](https://github.com/svg/svgo/blob/master/plugins/removeUselessDefs.js) | удаление элементов в `<defs>` без `id` |
| [removeXMLNS](https://github.com/svg/svgo/blob/master/plugins/removeXMLNS.js) | удаление атрибута xmlns (для заинлайненных svg, выключено по умолчанию) |
| [removeEditorsNSData](https://github.com/svg/svgo/blob/master/plugins/removeEditorsNSData.js) | удаление пространств имён различных редакторов, их элементов и атрибутов |
| [removeEmptyAttrs](https://github.com/svg/svgo/blob/master/plugins/removeEmptyAttrs.js) | удаление пустых атрибутов |
| [removeHiddenElems](https://github.com/svg/svgo/blob/master/plugins/removeHiddenElems.js) | удаление скрытых элементов |
| [removeEmptyText](https://github.com/svg/svgo/blob/master/plugins/removeEmptyText.js) | удаление пустых текстовых элементов |
| [removeEmptyContainers](https://github.com/svg/svgo/blob/master/plugins/removeEmptyContainers.js) | удаление пустых элементов-контейнеров |
| [removeViewBox](https://github.com/svg/svgo/blob/master/plugins/removeViewBox.js) | удаление атрибута `viewBox`, когда это возможно |
| [cleanupEnableBackground](https://github.com/svg/svgo/blob/master/plugins/cleanupEnableBackground.js) | удаление или оптимизация атрибута `enable-background`, когда это возможно |
| [minifyStyles](https://github.com/svg/svgo/blob/master/plugins/minifyStyles.js) | уменьшает содержимое элементов `<style>` с помощью [CSSO](https://github.com/css/csso). |
| [convertStyleToAttrs](https://github.com/svg/svgo/blob/master/plugins/convertStyleToAttrs.js) | конвертирование стилей в атрибуте `style` в отдельные svg-атрибуты |
| [convertColors](https://github.com/svg/svgo/blob/master/plugins/convertColors.js) | конвертирование цветовых значений: из `rgb()` в `#rrggbb`, из `#rrggbb` в `#rgb` |
| [convertPathData](https://github.com/svg/svgo/blob/master/plugins/convertPathData.js) | конвертирование данных Path в относительные или абсолютные координаты, смотря что  |короче; конвертирование одних типов сегментов в другие; удаление ненужных разделителей; умное округление и тому подобное
| [convertTransform](https://github.com/svg/svgo/blob/master/plugins/convertTransform.js) | схлопывание нескольких трансформаций в одну, конвертирование матриц в короткие алиасы  |и многое другое
| [removeUnknownsAndDefaults](https://github.com/svg/svgo/blob/master/plugins/removeUnknownsAndDefaults.js) | удаление неизвестных элементов, контента и атрибутов |
| [removeNonInheritableGroupAttrs](https://github.com/svg/svgo/blob/master/plugins/removeNonInheritableGroupAttrs.js) | удаление ненаследуемых "презентационных" атрибутов групп |
| [removeUselessStrokeAndFill](https://github.com/svg/svgo/blob/master/plugins/removeUselessStrokeAndFill.js) | удаление неиспользуемых атрибутов stroke-* и fill-* |
| [removeUnusedNS](https://github.com/svg/svgo/blob/master/plugins/removeUnusedNS.js) | удаление  деклараций неиспользуемых пространств имён |
| [prefixIds](https://github.com/svg/svgo/blob/master/plugins/prefixIds.js) | добавляет префикс в ID или классы в виде имени файла или произвольной строки |
| [cleanupIDs](https://github.com/svg/svgo/blob/master/plugins/cleanupIDs.js) | удаление неиспользуемых и сокращение используемых ID |
| [cleanupNumericValues](https://github.com/svg/svgo/blob/master/plugins/cleanupNumericValues.js) | округление дробных чисел до заданной точности, удаление `px` как единицы  |измерения по-умолчанию
| [cleanupListOfValues](https://github.com/svg/svgo/blob/master/plugins/cleanupListOfValues.js) | округление числовых значений в атрибутах со списком чисел, таких как `viewBox`  |или `enableBackground`
| [moveElemsAttrsToGroup](https://github.com/svg/svgo/blob/master/plugins/moveElemsAttrsToGroup.js) | перемещение совпадающих атрибутов у всех элементов внутри группы `<g>` |
| [moveGroupAttrsToElems](https://github.com/svg/svgo/blob/master/plugins/moveGroupAttrsToElems.js) | перемещение некоторых атрибутов группы на элементы внутри |
| [collapseGroups](https://github.com/svg/svgo/blob/master/plugins/collapseGroups.js) | схлопывание бесполезных групп `<g>` |
| [removeRasterImages](https://github.com/svg/svgo/blob/master/plugins/removeRasterImages.js) | удаление растровых изображений (выключено по умолчанию) |
| [mergePaths](https://github.com/svg/svgo/blob/master/plugins/mergePaths.js) | склеивание нескольких Path в одну кривую |
| [convertShapeToPath](https://github.com/svg/svgo/blob/master/plugins/convertShapeToPath.js) | конвертирование простых форм в Path |
| [convertEllipseToCircle](https://github.com/svg/svgo/blob/master/plugins/convertEllipseToCircle.js) | конвертирование вырожденного эллипса `<ellipse>` в круг `<circle>` |
| [sortAttrs](https://github.com/svg/svgo/blob/master/plugins/sortAttrs.js) | сортировка атрибутов элементов для удобочитаемости (выключено по умолчанию) |
| [sortDefsChildren](https://github.com/svg/svgo/blob/master/plugins/sortDefsChildren.js) | сортировка детей `<defs>` для лучшей компрессии |
| [removeDimensions](https://github.com/svg/svgo/blob/master/plugins/removeDimensions.js) | удаляет атрибуты width/height при наличии viewBox (противоречит removeViewBox — плагин должен быть выключен) (выключено по умолчанию) |
| [removeAttrs](https://github.com/svg/svgo/blob/master/plugins/removeAttrs.js) | удаляет атрибуты по указанному паттерну (выключено по умолчанию) |
| [removeAttributesBySelector](https://github.com/svg/svgo/blob/master/plugins/removeAttributesBySelector.js) | удаляет атрибуты по CSS-селектору (выключено по умолчанию) |
| [removeElementsByAttr](https://github.com/svg/svgo/blob/master/plugins/removeElementsByAttr.js) | удаляет элементы по указанным ID или классам (выключено по умолчанию) |
| [addClassesToSVGElement](https://github.com/svg/svgo/blob/master/plugins/addClassesToSVGElement.js) | добавляет имена классов корневому элементу `<svg>` (выключено по умолчанию) |
| [addAttributesToSVGElement](https://github.com/svg/svgo/blob/master/plugins/addAttributesToSVGElement.js) | добавляет атрибуты корневому элементу `<svg>` (выключено  |по умолчанию)
| [removeOffCanvasPaths](https://github.com/svg/svgo/blob/master/plugins/removeOffCanvasPaths.js) | удаляет элементы вне отрисовываемой области (выключено по умолчанию) |
| [removeStyleElement](https://github.com/svg/svgo/blob/master/plugins/removeStyleElement.js) | удаляет элементы `<style>` (выключено по умолчанию) |
| [removeScriptElement](https://github.com/svg/svgo/blob/master/plugins/removeScriptElement.js) | удаляет элементы `<script>` (выключено по умолчанию) |
| [reusePaths](https://github.com/svg/svgo/blob/master/plugins/reusePaths.js) | Заменяет дублирующиеся элементы <path> ссылками <use> (выключено по умолчанию) |

Хотите узнать принципы работы и как написать свой плагин? [Конечно же, да!](https://github.com/svg/svgo/blob/master/docs/how-it-works/ru.md)


## Как использовать

```sh
$ [sudo] npm install -g svgo
```

## Выполнение:

### Командная строка

```
Запуск:
  svgo [OPTIONS] [ARGS]

Параметры:
  -h, --help : Помощь
  -v, --version : Версия программы
  -i INPUT, --input=INPUT : Входной файл, "-" для STDIN
  -s STRING, --string=STRING : Входная строка SVG
  -f FOLDER, --folder=FOLDER : Входная папка, оптимизирует и перезаписывает все файлы *.svg
  -o OUTPUT, --output=OUTPUT : Выходной файл или папка (совпадает с входным по умолчанию), "-" для STDOUT
  -p PRECISION, --precision=PRECISION : Число цифр после запятой, переопределяет параметры плагинов
  --config=CONFIG : Файл конфигурации (или строка JSON) для расширения и замены настроек
  --disable=PLUGIN : Выключение плагина по имени, "--disable=PLUGIN1,PLUGIN2" для отключения нескольких плагинов
  --enable=PLUGIN : Включение плагина по имени, "--enable=PLUGIN3,PLUGIN4" для отключения нескольких плагинов
  --datauri=DATAURI : Результат в виде строки Data URI (base64, URI encoded или unencoded)
  --multipass : Оптимизация в несколько проходов для применения всех возможных оптимизаций
  --pretty : Удобочитаемое форматирование SVG
  --indent=INDENT : Размер отступа для удобочитаемого форматирования
  -r, --recursive : Совместно с '-f'. Рекурсивно обрабатывать *.svg файлы в папках.
  -q, --quiet : Подавляет вывод информации, выводятся только сообщения об ошибках
  --show-plugins : Доступные плагины

Аргументы:
  INPUT : Аналогично --input
```

* с файлами:

    ```sh
    $ svgo test.svg
    ```

    или:

    ```sh
    $ svgo *.svg
    ```

    ```sh
    $ svgo test.svg -o test.min.svg
    ```

    ```sh
    $ svgo test.svg other.svg third.svg
    ```

    ```sh
    $ svgo test.svg other.svg third.svg -o test.min.svg -o other.min.svg -o third.min.svg
    ```

* со STDIN / STDOUT:

    ```sh
    $ cat test.svg | svgo -i - -o - > test.min.svg
    ```

* с папками

    ```sh
    $ svgo -f ../path/to/folder/with/svg/files
    ```

    или:

    ```sh
    $ svgo -f ../path/to/folder/with/svg/files -o ../path/to/folder/with/svg/output
    ```

    ```sh
    $ svgo *.svg -o ../path/to/folder/with/svg/output
    ```

* со строками:

    ```sh
    $ svgo -s '<svg version="1.1">test</svg>' -o test.min.svg
    ```

    или даже с Data URI base64:

    ```sh
    $ svgo -s 'data:image/svg+xml;base64,…' -o test.min.svg
    ```

* с SVGZ:

    из `.svgz` в `.svg`:

    ```sh
    $ gunzip -c test.svgz | svgo -i - -o test.min.svg
    ```

    из `.svg` в `.svgz`:

    ```sh
    $ svgo test.svg -o - | gzip -cfq9 > test.svgz
    ```

### Другие способы использования SVGO

* в виде веб-приложения - [SVGOMG](https://jakearchibald.github.io/svgomg/)
* как модуль Node.js – [examples](https://github.com/svg/svgo/tree/master/examples)
* как таск для Grunt – [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin)
* как таск для Gulp – [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin)
* как таск для Mimosa – [mimosa-minify-svg](https://github.com/dbashford/mimosa-minify-svg)
* как действие папки в OSX – [svgo-osx-folder-action](https://github.com/svg/svgo-osx-folder-action)
* через загрузчик webpack – [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
* с помощью бота в Telegram – [svgo_bot](https://github.com/maksugr/svgo_bot)
* как плагин PostCSS - [postcss-svgo](https://github.com/ben-eb/postcss-svgo)
* как плагин для Inkscape – [inkscape-svgo](https://github.com/konsumer/inkscape-svgo)
* как плагин для Sketch - [svgo-compressor](https://github.com/BohemianCoding/svgo-compressor)
* в виде приложения macOS - [Image Shrinker](https://image-shrinker.com)
* как плагин для Rollup - [rollup-plugin-svgo](https://github.com/porsager/rollup-plugin-svgo)

## Лицензия и копирайты

Данное программное обеспечение выпускается под [лицензией MIT](https://github.com/svg/svgo/blob/master/LICENSE).

Логотип – [Егор Большаков](http://xizzzy.ru/).
