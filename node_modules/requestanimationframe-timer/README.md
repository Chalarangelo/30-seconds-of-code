<!-- [![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url] -->

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <img width="200" height="200" src="https://cdn.worldvectorlogo.com/logos/javascript.svg">
  <a href="https://webpack.js.org/">
    <img width="200" height="200" vspace="" hspace="25" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  </a>
  <h1>requestanimationframe-timer</h1>
  <p>setTimeout and setInterval by using requestAnimationFrame</p>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev requestanimationframe-timer
```

<h2 align="center">Usage</h2>

```js
import { setInterval, setTimeout, clearInterval, clearTimeout } from 'requestanimationframe-timer';

const id_1 = setTimeout((a) => console.log(a), 1000, '1000 ms timeout');
const id_2 = setInterval((a) => console.log(a), 2000, '2000 ms interval');
setTimeout(() => {
  clearTimeout(id_1);
  clearInterval(id_2);
}, 10000);
```

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/kambing86">
          <img width="150" height="150" src="https://avatars3.githubusercontent.com/u/1342133?s=460&v=4">
          </br>
          Chua Kang Ming
        </a>
      </td>
    </tr>
  <tbody>
</table>

<!-- [npm]: https://img.shields.io/npm/v/requestanimationframe-timer.svg
[npm-url]: https://npmjs.com/package/requestanimationframe-timer

[deps]: https://david-dm.org/webpack-contrib/requestanimationframe-timer.svg
[deps-url]: https://david-dm.org/webpack-contrib/requestanimationframe-timer

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/requestanimationframe-timer.svg
[test-url]: https://travis-ci.org/webpack-contrib/requestanimationframe-timer

[cover]: https://codecov.io/gh/webpack-contrib/requestanimationframe-timer/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/requestanimationframe-timer -->
