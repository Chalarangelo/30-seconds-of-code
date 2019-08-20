/**
 * @license
 * The MIT License
 *
 * Copyright © 2012–2016 Kir Belevich
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Лицензия MIT
 *
 * Copyright © 2012–2016 Кир Белевич
 *
 * Данная лицензия разрешает лицам, получившим копию
 * данного
 * программного обеспечения и сопутствующей
 * документации
 * (в дальнейшем именуемыми «Программное Обеспечение»),
 * безвозмездно
 * использовать Программное Обеспечение без
 * ограничений, включая
 * неограниченное право на использование, копирование,
 * изменение,
 * добавление, публикацию, распространение,
 * сублицензирование
 * и/или продажу копий Программного Обеспечения, также
 * как и лицам,
 * которым предоставляется данное Программное
 * Обеспечение,
 * при соблюдении следующих условий:
 *
 * Указанное выше уведомление об авторском праве и
 * данные условия
 * должны быть включены во все копии или значимые части
 * данного
 * Программного Обеспечения.
 *
 * ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК
 * ЕСТЬ»,
 * БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ
 * ПОДРАЗУМЕВАЕМЫХ,
 * ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ ГАРАНТИЯМИ ТОВАРНОЙ
 * ПРИГОДНОСТИ,
 * СООТВЕТСТВИЯ ПО ЕГО КОНКРЕТНОМУ НАЗНАЧЕНИЮ И
 * ОТСУТСТВИЯ НАРУШЕНИЙ
 * ПРАВ. НИ В КАКОМ СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ
 * НЕСУТ
 * ОТВЕТСТВЕННОСТИ ПО ИСКАМ О ВОЗМЕЩЕНИИ УЩЕРБА, УБЫТКОВ
 * ИЛИ ДРУГИХ
 * ТРЕБОВАНИЙ ПО ДЕЙСТВУЮЩИМ КОНТРАКТАМ, ДЕЛИКТАМ ИЛИ
 * ИНОМУ,
 * ВОЗНИКШИМ ИЗ, ИМЕЮЩИМ ПРИЧИНОЙ ИЛИ СВЯЗАННЫМ С
 * ПРОГРАММНЫМ
 * ОБЕСПЕЧЕНИЕМ ИЛИ ИСПОЛЬЗОВАНИЕМ ПРОГРАММНОГО
 * ОБЕСПЕЧЕНИЯ
 * ИЛИ ИНЫМИ ДЕЙСТВИЯМИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ.
 */

'use strict';

var JSAPI = require('../lib/svgo/jsAPI');

exports.type = 'full';

exports.active = false;

exports.description = 'Finds <path> elements with the same d, fill, and ' +
                      'stroke, and converts them to <use> elements ' +
                      'referencing a single <path> def.';

/**
 * Finds <path> elements with the same d, fill, and stroke, and converts them to
 * <use> elements referencing a single <path> def.
 *
 * @author Jacob Howcroft
 */
exports.fn = function(data) {
  const seen = new Map();
  let count = 0;
  const defs = [];
  traverse(data, item => {
    if (!item.isElem('path') || !item.hasAttr('d')) {
      return;
    }
    const d = item.attr('d').value;
    const fill = (item.hasAttr('fill') && item.attr('fill').value) || '';
    const stroke = (item.hasAttr('stroke') && item.attr('stroke').value) || '';
    const key = d + ';s:' + stroke + ';f:' + fill;
    const hasSeen = seen.get(key);
    if (!hasSeen) {
      seen.set(key, {elem: item, reused: false});
      return;
    }
    if (!hasSeen.reused) {
      hasSeen.reused = true;
      if (!hasSeen.elem.hasAttr('id')) {
        hasSeen.elem.addAttr({name: 'id', local: 'id',
                              prefix: '', value: 'reuse-' + (count++)});
      }
      defs.push(hasSeen.elem);
    }
    item = convertToUse(item, hasSeen.elem.attr('id').value);
  });
  const defsTag = new JSAPI({
    elem: 'defs', prefix: '', local: 'defs', content: [], attrs: []}, data);
  data.content[0].spliceContent(0, 0, defsTag);
  for (let def of defs) {
    // Remove class and style before copying to avoid circular refs in
    // JSON.stringify. This is fine because we don't actually want class or
    // style information to be copied.
    const style = def.style;
    const defClass = def.class;
    delete def.style;
    delete def.class;
    const defClone = def.clone();
    def.style = style;
    def.class = defClass;
    defClone.removeAttr('transform');
    defsTag.spliceContent(0, 0, defClone);
    // Convert the original def to a use so the first usage isn't duplicated.
    def = convertToUse(def, defClone.attr('id').value);
    def.removeAttr('id');
  }
  return data;
};

/** */
function convertToUse(item, href) {
  item.renameElem('use');
  item.removeAttr('d');
  item.removeAttr('stroke');
  item.removeAttr('fill');
  item.addAttr({name: 'xlink:href', local: 'xlink:href',
                prefix: 'none', value: '#' + href});
  delete item.pathJS;
  return item;
}

/** */
function traverse(parent, callback) {
  if (parent.isEmpty()) {
    return;
  }
  for (let child of parent.content) {
    callback(child);
    traverse(child, callback);
  }
}
