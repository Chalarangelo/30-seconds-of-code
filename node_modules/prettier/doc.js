(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.doc = factory());
}(this, (function () { 'use strict';

function concat(parts) {
  return {
    type: "concat",
    parts: parts
  };
}

function indent(contents) {
  return {
    type: "indent",
    contents: contents
  };
}

function align(n, contents) {
  return {
    type: "align",
    contents: contents,
    n: n
  };
}

function group(contents, opts) {
  opts = opts || {};

  return {
    type: "group",
    id: opts.id,
    contents: contents,
    break: !!opts.shouldBreak,
    expandedStates: opts.expandedStates
  };
}

function dedentToRoot(contents) {
  return align(-Infinity, contents);
}

function markAsRoot(contents) {
  return align({
    type: "root"
  }, contents);
}

function dedent(contents) {
  return align(-1, contents);
}

function conditionalGroup(states, opts) {
  return group(states[0], Object.assign(opts || {}, {
    expandedStates: states
  }));
}

function fill(parts) {
  return {
    type: "fill",
    parts: parts
  };
}

function ifBreak(breakContents, flatContents, opts) {
  opts = opts || {};

  return {
    type: "if-break",
    breakContents: breakContents,
    flatContents: flatContents,
    groupId: opts.groupId
  };
}

function lineSuffix(contents) {
  return {
    type: "line-suffix",
    contents: contents
  };
}

var lineSuffixBoundary = {
  type: "line-suffix-boundary"
};
var breakParent = {
  type: "break-parent"
};
var trim = {
  type: "trim"
};
var line = {
  type: "line"
};
var softline = {
  type: "line",
  soft: true
};
var hardline = concat([{
  type: "line",
  hard: true
}, breakParent]);
var literalline = concat([{
  type: "line",
  hard: true,
  literal: true
}, breakParent]);
var cursor = {
  type: "cursor",
  placeholder: Symbol("cursor")
};

function join(sep, arr) {
  var res = [];

  for (var i = 0; i < arr.length; i++) {
    if (i !== 0) {
      res.push(sep);
    }

    res.push(arr[i]);
  }

  return concat(res);
}

function addAlignmentToDoc(doc, size, tabWidth) {
  var aligned = doc;

  if (size > 0) {
    // Use indent to add tabs for all the levels of tabs we need
    for (var i = 0; i < Math.floor(size / tabWidth); ++i) {
      aligned = indent(aligned);
    } // Use align for all the spaces that are needed


    aligned = align(size % tabWidth, aligned); // size is absolute from 0 and not relative to the current
    // indentation, so we use -Infinity to reset the indentation to 0

    aligned = align(-Infinity, aligned);
  }

  return aligned;
}

var docBuilders = {
  concat: concat,
  join: join,
  line: line,
  softline: softline,
  hardline: hardline,
  literalline: literalline,
  group: group,
  conditionalGroup: conditionalGroup,
  fill: fill,
  lineSuffix: lineSuffix,
  lineSuffixBoundary: lineSuffixBoundary,
  cursor: cursor,
  breakParent: breakParent,
  ifBreak: ifBreak,
  trim: trim,
  indent: indent,
  align: align,
  addAlignmentToDoc: addAlignmentToDoc,
  markAsRoot: markAsRoot,
  dedentToRoot: dedentToRoot,
  dedent: dedent
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var ansiRegex = createCommonjsModule(function (module) {
  'use strict';

  module.exports = function (options) {
    options = Object.assign({
      onlyFirst: false
    }, options);
    var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
    return new RegExp(pattern, options.onlyFirst ? undefined : 'g');
  };
});

var stripAnsi = function stripAnsi(input) {
  return typeof input === 'string' ? input.replace(ansiRegex(), '') : input;
};

var isFullwidthCodePoint = createCommonjsModule(function (module) {
  'use strict';
  /* eslint-disable yoda */

  module.exports = function (x) {
    if (Number.isNaN(x)) {
      return false;
    } // code points are derived from:
    // http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt


    if (x >= 0x1100 && (x <= 0x115f || // Hangul Jamo
    x === 0x2329 || // LEFT-POINTING ANGLE BRACKET
    x === 0x232a || // RIGHT-POINTING ANGLE BRACKET
    // CJK Radicals Supplement .. Enclosed CJK Letters and Months
    0x2e80 <= x && x <= 0x3247 && x !== 0x303f || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
    0x3250 <= x && x <= 0x4dbf || // CJK Unified Ideographs .. Yi Radicals
    0x4e00 <= x && x <= 0xa4c6 || // Hangul Jamo Extended-A
    0xa960 <= x && x <= 0xa97c || // Hangul Syllables
    0xac00 <= x && x <= 0xd7a3 || // CJK Compatibility Ideographs
    0xf900 <= x && x <= 0xfaff || // Vertical Forms
    0xfe10 <= x && x <= 0xfe19 || // CJK Compatibility Forms .. Small Form Variants
    0xfe30 <= x && x <= 0xfe6b || // Halfwidth and Fullwidth Forms
    0xff01 <= x && x <= 0xff60 || 0xffe0 <= x && x <= 0xffe6 || // Kana Supplement
    0x1b000 <= x && x <= 0x1b001 || // Enclosed Ideographic Supplement
    0x1f200 <= x && x <= 0x1f251 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
    0x20000 <= x && x <= 0x3fffd)) {
      return true;
    }

    return false;
  };
});

var emojiRegex = function emojiRegex() {
  // https://mths.be/emoji
  return /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g;
};

var stringWidth = createCommonjsModule(function (module) {
  'use strict';

  var emojiRegex$$1 = emojiRegex();

  module.exports = function (input) {
    input = input.replace(emojiRegex$$1, '  ');

    if (typeof input !== 'string' || input.length === 0) {
      return 0;
    }

    input = stripAnsi(input);
    var width = 0;

    for (var i = 0; i < input.length; i++) {
      var code = input.codePointAt(i); // Ignore control characters

      if (code <= 0x1F || code >= 0x7F && code <= 0x9F) {
        continue;
      } // Ignore combining characters


      if (code >= 0x300 && code <= 0x36F) {
        continue;
      } // Surrogates


      if (code > 0xFFFF) {
        i++;
      }

      width += isFullwidthCodePoint(code) ? 2 : 1;
    }

    return width;
  };
});

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

var escapeStringRegexp = function escapeStringRegexp(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return str.replace(matchOperatorsRe, '\\$&');
};

var getLast = function getLast(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : null;
};

var notAsciiRegex = /[^\x20-\x7F]/;

function isExportDeclaration(node) {
  if (node) {
    switch (node.type) {
      case "ExportDefaultDeclaration":
      case "ExportDefaultSpecifier":
      case "DeclareExportDeclaration":
      case "ExportNamedDeclaration":
      case "ExportAllDeclaration":
        return true;
    }
  }

  return false;
}

function getParentExportDeclaration(path) {
  var parentNode = path.getParentNode();

  if (path.getName() === "declaration" && isExportDeclaration(parentNode)) {
    return parentNode;
  }

  return null;
}

function getPenultimate(arr) {
  if (arr.length > 1) {
    return arr[arr.length - 2];
  }

  return null;
}

function skip(chars) {
  return function (text, index, opts) {
    var backwards = opts && opts.backwards; // Allow `skip` functions to be threaded together without having
    // to check for failures (did someone say monads?).

    if (index === false) {
      return false;
    }

    var length = text.length;
    var cursor = index;

    while (cursor >= 0 && cursor < length) {
      var c = text.charAt(cursor);

      if (chars instanceof RegExp) {
        if (!chars.test(c)) {
          return cursor;
        }
      } else if (chars.indexOf(c) === -1) {
        return cursor;
      }

      backwards ? cursor-- : cursor++;
    }

    if (cursor === -1 || cursor === length) {
      // If we reached the beginning or end of the file, return the
      // out-of-bounds cursor. It's up to the caller to handle this
      // correctly. We don't want to indicate `false` though if it
      // actually skipped valid characters.
      return cursor;
    }

    return false;
  };
}

var skipWhitespace = skip(/\s/);
var skipSpaces = skip(" \t");
var skipToLineEnd = skip(",; \t");
var skipEverythingButNewLine = skip(/[^\r\n]/);

function skipInlineComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "*") {
    for (var i = index + 2; i < text.length; ++i) {
      if (text.charAt(i) === "*" && text.charAt(i + 1) === "/") {
        return i + 2;
      }
    }
  }

  return index;
}

function skipTrailingComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "/") {
    return skipEverythingButNewLine(text, index);
  }

  return index;
} // This one doesn't use the above helper function because it wants to
// test \r\n in order and `skip` doesn't support ordering and we only
// want to skip one newline. It's simple to implement.


function skipNewline(text, index, opts) {
  var backwards = opts && opts.backwards;

  if (index === false) {
    return false;
  }

  var atIndex = text.charAt(index);

  if (backwards) {
    if (text.charAt(index - 1) === "\r" && atIndex === "\n") {
      return index - 2;
    }

    if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
      return index - 1;
    }
  } else {
    if (atIndex === "\r" && text.charAt(index + 1) === "\n") {
      return index + 2;
    }

    if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
      return index + 1;
    }
  }

  return index;
}

function hasNewline(text, index, opts) {
  opts = opts || {};
  var idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  var idx2 = skipNewline(text, idx, opts);
  return idx !== idx2;
}

function hasNewlineInRange(text, start, end) {
  for (var i = start; i < end; ++i) {
    if (text.charAt(i) === "\n") {
      return true;
    }
  }

  return false;
} // Note: this function doesn't ignore leading comments unlike isNextLineEmpty


function isPreviousLineEmpty(text, node, locStart) {
  var idx = locStart(node) - 1;
  idx = skipSpaces(text, idx, {
    backwards: true
  });
  idx = skipNewline(text, idx, {
    backwards: true
  });
  idx = skipSpaces(text, idx, {
    backwards: true
  });
  var idx2 = skipNewline(text, idx, {
    backwards: true
  });
  return idx !== idx2;
}

function isNextLineEmptyAfterIndex(text, index) {
  var oldIdx = null;
  var idx = index;

  while (idx !== oldIdx) {
    // We need to skip all the potential trailing inline comments
    oldIdx = idx;
    idx = skipToLineEnd(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipSpaces(text, idx);
  }

  idx = skipTrailingComment(text, idx);
  idx = skipNewline(text, idx);
  return hasNewline(text, idx);
}

function isNextLineEmpty(text, node, locEnd) {
  return isNextLineEmptyAfterIndex(text, locEnd(node));
}

function getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, idx) {
  var oldIdx = null;

  while (idx !== oldIdx) {
    oldIdx = idx;
    idx = skipSpaces(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipTrailingComment(text, idx);
    idx = skipNewline(text, idx);
  }

  return idx;
}

function getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd) {
  return getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, locEnd(node));
}

function getNextNonSpaceNonCommentCharacter(text, node, locEnd) {
  return text.charAt(getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd));
}

function hasSpaces(text, index, opts) {
  opts = opts || {};
  var idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  return idx !== index;
}

function setLocStart(node, index) {
  if (node.range) {
    node.range[0] = index;
  } else {
    node.start = index;
  }
}

function setLocEnd(node, index) {
  if (node.range) {
    node.range[1] = index;
  } else {
    node.end = index;
  }
}

var PRECEDENCE = {};
[["|>"], ["||", "??"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!=="], ["<", ">", "<=", ">=", "in", "instanceof"], [">>", "<<", ">>>"], ["+", "-"], ["*", "/", "%"], ["**"]].forEach(function (tier, i) {
  tier.forEach(function (op) {
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op) {
  return PRECEDENCE[op];
}

var equalityOperators = {
  "==": true,
  "!=": true,
  "===": true,
  "!==": true
};
var multiplicativeOperators = {
  "*": true,
  "/": true,
  "%": true
};
var bitshiftOperators = {
  ">>": true,
  ">>>": true,
  "<<": true
};

function shouldFlatten(parentOp, nodeOp) {
  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
    return false;
  } // ** is right-associative
  // x ** y ** z --> x ** (y ** z)


  if (parentOp === "**") {
    return false;
  } // x == y == z --> (x == y) == z


  if (equalityOperators[parentOp] && equalityOperators[nodeOp]) {
    return false;
  } // x * y % z --> (x * y) % z


  if (nodeOp === "%" && multiplicativeOperators[parentOp] || parentOp === "%" && multiplicativeOperators[nodeOp]) {
    return false;
  } // x * y / z --> (x * y) / z
  // x / y * z --> (x / y) * z


  if (nodeOp !== parentOp && multiplicativeOperators[nodeOp] && multiplicativeOperators[parentOp]) {
    return false;
  } // x << y << z --> (x << y) << z


  if (bitshiftOperators[parentOp] && bitshiftOperators[nodeOp]) {
    return false;
  }

  return true;
}

function isBitwiseOperator(operator) {
  return !!bitshiftOperators[operator] || operator === "|" || operator === "^" || operator === "&";
} // Tests if an expression starts with `{`, or (if forbidFunctionClassAndDoExpr
// holds) `function`, `class`, or `do {}`. Will be overzealous if there's
// already necessary grouping parentheses.


function startsWithNoLookaheadToken(node, forbidFunctionClassAndDoExpr) {
  node = getLeftMost(node);

  switch (node.type) {
    case "FunctionExpression":
    case "ClassExpression":
    case "DoExpression":
      return forbidFunctionClassAndDoExpr;

    case "ObjectExpression":
      return true;

    case "MemberExpression":
      return startsWithNoLookaheadToken(node.object, forbidFunctionClassAndDoExpr);

    case "TaggedTemplateExpression":
      if (node.tag.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }

      return startsWithNoLookaheadToken(node.tag, forbidFunctionClassAndDoExpr);

    case "CallExpression":
      if (node.callee.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }

      return startsWithNoLookaheadToken(node.callee, forbidFunctionClassAndDoExpr);

    case "ConditionalExpression":
      return startsWithNoLookaheadToken(node.test, forbidFunctionClassAndDoExpr);

    case "UpdateExpression":
      return !node.prefix && startsWithNoLookaheadToken(node.argument, forbidFunctionClassAndDoExpr);

    case "BindExpression":
      return node.object && startsWithNoLookaheadToken(node.object, forbidFunctionClassAndDoExpr);

    case "SequenceExpression":
      return startsWithNoLookaheadToken(node.expressions[0], forbidFunctionClassAndDoExpr);

    case "TSAsExpression":
      return startsWithNoLookaheadToken(node.expression, forbidFunctionClassAndDoExpr);

    default:
      return false;
  }
}

function getLeftMost(node) {
  if (node.left) {
    return getLeftMost(node.left);
  }

  return node;
}

function getAlignmentSize(value, tabWidth, startIndex) {
  startIndex = startIndex || 0;
  var size = 0;

  for (var i = startIndex; i < value.length; ++i) {
    if (value[i] === "\t") {
      // Tabs behave in a way that they are aligned to the nearest
      // multiple of tabWidth:
      // 0 -> 4, 1 -> 4, 2 -> 4, 3 -> 4
      // 4 -> 8, 5 -> 8, 6 -> 8, 7 -> 8 ...
      size = size + tabWidth - size % tabWidth;
    } else {
      size++;
    }
  }

  return size;
}

function getIndentSize(value, tabWidth) {
  var lastNewlineIndex = value.lastIndexOf("\n");

  if (lastNewlineIndex === -1) {
    return 0;
  }

  return getAlignmentSize( // All the leading whitespaces
  value.slice(lastNewlineIndex + 1).match(/^[ \t]*/)[0], tabWidth);
}

function getPreferredQuote(raw, preferredQuote) {
  // `rawContent` is the string exactly like it appeared in the input source
  // code, without its enclosing quotes.
  var rawContent = raw.slice(1, -1);
  var double = {
    quote: '"',
    regex: /"/g
  };
  var single = {
    quote: "'",
    regex: /'/g
  };
  var preferred = preferredQuote === "'" ? single : double;
  var alternate = preferred === single ? double : single;
  var result = preferred.quote; // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.

  if (rawContent.includes(preferred.quote) || rawContent.includes(alternate.quote)) {
    var numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    var numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;
    result = numPreferredQuotes > numAlternateQuotes ? alternate.quote : preferred.quote;
  }

  return result;
}

function printString(raw, options, isDirectiveLiteral) {
  // `rawContent` is the string exactly like it appeared in the input source
  // code, without its enclosing quotes.
  var rawContent = raw.slice(1, -1); // Check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.

  var canChangeDirectiveQuotes = !rawContent.includes('"') && !rawContent.includes("'");
  var enclosingQuote = options.parser === "json" ? '"' : options.__isInHtmlAttribute ? "'" : getPreferredQuote(raw, options.singleQuote ? "'" : '"'); // Directives are exact code unit sequences, which means that you can't
  // change the escape sequences they use.
  // See https://github.com/prettier/prettier/issues/1555
  // and https://tc39.github.io/ecma262/#directive-prologue

  if (isDirectiveLiteral) {
    if (canChangeDirectiveQuotes) {
      return enclosingQuote + rawContent + enclosingQuote;
    }

    return raw;
  } // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.


  return makeString(rawContent, enclosingQuote, !(options.parser === "css" || options.parser === "less" || options.parser === "scss" || options.embeddedInHtml));
}

function makeString(rawContent, enclosingQuote, unescapeUnnecessaryEscapes) {
  var otherQuote = enclosingQuote === '"' ? "'" : '"'; // Matches _any_ escape and unescaped quotes (both single and double).

  var regex = /\\([\s\S])|(['"])/g; // Escape and unescape single and double quotes as needed to be able to
  // enclose `rawContent` with `enclosingQuote`.

  var newContent = rawContent.replace(regex, function (match, escaped, quote) {
    // If we matched an escape, and the escaped character is a quote of the
    // other type than we intend to enclose the string with, there's no need for
    // it to be escaped, so return it _without_ the backslash.
    if (escaped === otherQuote) {
      return escaped;
    } // If we matched an unescaped quote and it is of the _same_ type as we
    // intend to enclose the string with, it must be escaped, so return it with
    // a backslash.


    if (quote === enclosingQuote) {
      return "\\" + quote;
    }

    if (quote) {
      return quote;
    } // Unescape any unnecessarily escaped character.
    // Adapted from https://github.com/eslint/eslint/blob/de0b4ad7bd820ade41b1f606008bea68683dc11a/lib/rules/no-useless-escape.js#L27


    return unescapeUnnecessaryEscapes && /^[^\\nrvtbfux\r\n\u2028\u2029"'0-7]$/.test(escaped) ? escaped : "\\" + escaped;
  });
  return enclosingQuote + newContent + enclosingQuote;
}

function printNumber(rawNumber) {
  return rawNumber.toLowerCase() // Remove unnecessary plus and zeroes from scientific notation.
  .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3") // Remove unnecessary scientific notation (1e0).
  .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1") // Make sure numbers always start with a digit.
  .replace(/^([+-])?\./, "$10.") // Remove extraneous trailing decimal zeroes.
  .replace(/(\.\d+?)0+(?=e|$)/, "$1") // Remove trailing dot.
  .replace(/\.(?=e|$)/, "");
}

function getMaxContinuousCount(str, target) {
  var results = str.match(new RegExp("(".concat(escapeStringRegexp(target), ")+"), "g"));

  if (results === null) {
    return 0;
  }

  return results.reduce(function (maxCount, result) {
    return Math.max(maxCount, result.length / target.length);
  }, 0);
}

function getMinNotPresentContinuousCount(str, target) {
  var matches = str.match(new RegExp("(".concat(escapeStringRegexp(target), ")+"), "g"));

  if (matches === null) {
    return 0;
  }

  var countPresent = new Map();
  var max = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var match = _step.value;
      var count = match.length / target.length;
      countPresent.set(count, true);

      if (count > max) {
        max = count;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var i = 1; i < max; i++) {
    if (!countPresent.get(i)) {
      return i;
    }
  }

  return max + 1;
}

function getStringWidth$1(text) {
  if (!text) {
    return 0;
  } // shortcut to avoid needless string `RegExp`s, replacements, and allocations within `string-width`


  if (!notAsciiRegex.test(text)) {
    return text.length;
  }

  return stringWidth(text);
}

function hasIgnoreComment(path) {
  var node = path.getValue();
  return hasNodeIgnoreComment(node);
}

function hasNodeIgnoreComment(node) {
  return node && node.comments && node.comments.length > 0 && node.comments.some(function (comment) {
    return comment.value.trim() === "prettier-ignore";
  });
}

function matchAncestorTypes(path, types, index) {
  index = index || 0;
  types = types.slice();

  while (types.length) {
    var parent = path.getParentNode(index);
    var type = types.shift();

    if (!parent || parent.type !== type) {
      return false;
    }

    index++;
  }

  return true;
}

function addCommentHelper(node, comment) {
  var comments = node.comments || (node.comments = []);
  comments.push(comment);
  comment.printed = false; // For some reason, TypeScript parses `// x` inside of JSXText as a comment
  // We already "print" it via the raw text, we don't need to re-print it as a
  // comment

  if (node.type === "JSXText") {
    comment.printed = true;
  }
}

function addLeadingComment(node, comment) {
  comment.leading = true;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addDanglingComment(node, comment) {
  comment.leading = false;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addTrailingComment(node, comment) {
  comment.leading = false;
  comment.trailing = true;
  addCommentHelper(node, comment);
}

function isWithinParentArrayProperty(path, propertyName) {
  var node = path.getValue();
  var parent = path.getParentNode();

  if (parent == null) {
    return false;
  }

  if (!Array.isArray(parent[propertyName])) {
    return false;
  }

  var key = path.getName();
  return parent[propertyName][key] === node;
}

function replaceEndOfLineWith(text, replacement) {
  var parts = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = text.split("\n")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var part = _step2.value;

      if (parts.length !== 0) {
        parts.push(replacement);
      }

      parts.push(part);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return parts;
}

var util = {
  replaceEndOfLineWith: replaceEndOfLineWith,
  getStringWidth: getStringWidth$1,
  getMaxContinuousCount: getMaxContinuousCount,
  getMinNotPresentContinuousCount: getMinNotPresentContinuousCount,
  getPrecedence: getPrecedence,
  shouldFlatten: shouldFlatten,
  isBitwiseOperator: isBitwiseOperator,
  isExportDeclaration: isExportDeclaration,
  getParentExportDeclaration: getParentExportDeclaration,
  getPenultimate: getPenultimate,
  getLast: getLast,
  getNextNonSpaceNonCommentCharacterIndexWithStartIndex: getNextNonSpaceNonCommentCharacterIndexWithStartIndex,
  getNextNonSpaceNonCommentCharacterIndex: getNextNonSpaceNonCommentCharacterIndex,
  getNextNonSpaceNonCommentCharacter: getNextNonSpaceNonCommentCharacter,
  skip: skip,
  skipWhitespace: skipWhitespace,
  skipSpaces: skipSpaces,
  skipToLineEnd: skipToLineEnd,
  skipEverythingButNewLine: skipEverythingButNewLine,
  skipInlineComment: skipInlineComment,
  skipTrailingComment: skipTrailingComment,
  skipNewline: skipNewline,
  isNextLineEmptyAfterIndex: isNextLineEmptyAfterIndex,
  isNextLineEmpty: isNextLineEmpty,
  isPreviousLineEmpty: isPreviousLineEmpty,
  hasNewline: hasNewline,
  hasNewlineInRange: hasNewlineInRange,
  hasSpaces: hasSpaces,
  setLocStart: setLocStart,
  setLocEnd: setLocEnd,
  startsWithNoLookaheadToken: startsWithNoLookaheadToken,
  getAlignmentSize: getAlignmentSize,
  getIndentSize: getIndentSize,
  getPreferredQuote: getPreferredQuote,
  printString: printString,
  printNumber: printNumber,
  hasIgnoreComment: hasIgnoreComment,
  hasNodeIgnoreComment: hasNodeIgnoreComment,
  makeString: makeString,
  matchAncestorTypes: matchAncestorTypes,
  addLeadingComment: addLeadingComment,
  addDanglingComment: addDanglingComment,
  addTrailingComment: addTrailingComment,
  isWithinParentArrayProperty: isWithinParentArrayProperty
};

function guessEndOfLine(text) {
  var index = text.indexOf("\r");

  if (index >= 0) {
    return text.charAt(index + 1) === "\n" ? "crlf" : "cr";
  }

  return "lf";
}

function convertEndOfLineToChars$1(value) {
  switch (value) {
    case "cr":
      return "\r";

    case "crlf":
      return "\r\n";

    default:
      return "\n";
  }
}

var endOfLine = {
  guessEndOfLine: guessEndOfLine,
  convertEndOfLineToChars: convertEndOfLineToChars$1
};

var getStringWidth = util.getStringWidth;
var convertEndOfLineToChars = endOfLine.convertEndOfLineToChars;
var concat$1 = docBuilders.concat;
var fill$1 = docBuilders.fill;
var cursor$1 = docBuilders.cursor;
/** @type {{[groupId: PropertyKey]: MODE}} */

var groupModeMap;
var MODE_BREAK = 1;
var MODE_FLAT = 2;

function rootIndent() {
  return {
    value: "",
    length: 0,
    queue: []
  };
}

function makeIndent(ind, options) {
  return generateInd(ind, {
    type: "indent"
  }, options);
}

function makeAlign(ind, n, options) {
  return n === -Infinity ? ind.root || rootIndent() : n < 0 ? generateInd(ind, {
    type: "dedent"
  }, options) : !n ? ind : n.type === "root" ? Object.assign({}, ind, {
    root: ind
  }) : typeof n === "string" ? generateInd(ind, {
    type: "stringAlign",
    n: n
  }, options) : generateInd(ind, {
    type: "numberAlign",
    n: n
  }, options);
}

function generateInd(ind, newPart, options) {
  var queue = newPart.type === "dedent" ? ind.queue.slice(0, -1) : ind.queue.concat(newPart);
  var value = "";
  var length = 0;
  var lastTabs = 0;
  var lastSpaces = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var part = _step.value;

      switch (part.type) {
        case "indent":
          flush();

          if (options.useTabs) {
            addTabs(1);
          } else {
            addSpaces(options.tabWidth);
          }

          break;

        case "stringAlign":
          flush();
          value += part.n;
          length += part.n.length;
          break;

        case "numberAlign":
          lastTabs += 1;
          lastSpaces += part.n;
          break;

        /* istanbul ignore next */

        default:
          throw new Error("Unexpected type '".concat(part.type, "'"));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  flushSpaces();
  return Object.assign({}, ind, {
    value: value,
    length: length,
    queue: queue
  });

  function addTabs(count) {
    value += "\t".repeat(count);
    length += options.tabWidth * count;
  }

  function addSpaces(count) {
    value += " ".repeat(count);
    length += count;
  }

  function flush() {
    if (options.useTabs) {
      flushTabs();
    } else {
      flushSpaces();
    }
  }

  function flushTabs() {
    if (lastTabs > 0) {
      addTabs(lastTabs);
    }

    resetLast();
  }

  function flushSpaces() {
    if (lastSpaces > 0) {
      addSpaces(lastSpaces);
    }

    resetLast();
  }

  function resetLast() {
    lastTabs = 0;
    lastSpaces = 0;
  }
}

function trim$1(out) {
  if (out.length === 0) {
    return 0;
  }

  var trimCount = 0; // Trim whitespace at the end of line

  while (out.length > 0 && typeof out[out.length - 1] === "string" && out[out.length - 1].match(/^[ \t]*$/)) {
    trimCount += out.pop().length;
  }

  if (out.length && typeof out[out.length - 1] === "string") {
    var trimmed = out[out.length - 1].replace(/[ \t]*$/, "");
    trimCount += out[out.length - 1].length - trimmed.length;
    out[out.length - 1] = trimmed;
  }

  return trimCount;
}

function fits(next, restCommands, width, options, mustBeFlat) {
  var restIdx = restCommands.length;
  var cmds = [next]; // `out` is only used for width counting because `trim` requires to look
  // backwards for space characters.

  var out = [];

  while (width >= 0) {
    if (cmds.length === 0) {
      if (restIdx === 0) {
        return true;
      }

      cmds.push(restCommands[restIdx - 1]);
      restIdx--;
      continue;
    }

    var x = cmds.pop();
    var ind = x[0];
    var mode = x[1];
    var doc = x[2];

    if (typeof doc === "string") {
      out.push(doc);
      width -= getStringWidth(doc);
    } else {
      switch (doc.type) {
        case "concat":
          for (var i = doc.parts.length - 1; i >= 0; i--) {
            cmds.push([ind, mode, doc.parts[i]]);
          }

          break;

        case "indent":
          cmds.push([makeIndent(ind, options), mode, doc.contents]);
          break;

        case "align":
          cmds.push([makeAlign(ind, doc.n, options), mode, doc.contents]);
          break;

        case "trim":
          width += trim$1(out);
          break;

        case "group":
          if (mustBeFlat && doc.break) {
            return false;
          }

          cmds.push([ind, doc.break ? MODE_BREAK : mode, doc.contents]);

          if (doc.id) {
            groupModeMap[doc.id] = cmds[cmds.length - 1][1];
          }

          break;

        case "fill":
          for (var _i = doc.parts.length - 1; _i >= 0; _i--) {
            cmds.push([ind, mode, doc.parts[_i]]);
          }

          break;

        case "if-break":
          {
            var groupMode = doc.groupId ? groupModeMap[doc.groupId] : mode;

            if (groupMode === MODE_BREAK) {
              if (doc.breakContents) {
                cmds.push([ind, mode, doc.breakContents]);
              }
            }

            if (groupMode === MODE_FLAT) {
              if (doc.flatContents) {
                cmds.push([ind, mode, doc.flatContents]);
              }
            }

            break;
          }

        case "line":
          switch (mode) {
            // fallthrough
            case MODE_FLAT:
              if (!doc.hard) {
                if (!doc.soft) {
                  out.push(" ");
                  width -= 1;
                }

                break;
              }

              return true;

            case MODE_BREAK:
              return true;
          }

          break;
      }
    }
  }

  return false;
}

function printDocToString(doc, options) {
  groupModeMap = {};
  var width = options.printWidth;
  var newLine = convertEndOfLineToChars(options.endOfLine);
  var pos = 0; // cmds is basically a stack. We've turned a recursive call into a
  // while loop which is much faster. The while loop below adds new
  // cmds to the array instead of recursively calling `print`.

  var cmds = [[rootIndent(), MODE_BREAK, doc]];
  var out = [];
  var shouldRemeasure = false;
  var lineSuffix = [];

  while (cmds.length !== 0) {
    var x = cmds.pop();
    var ind = x[0];
    var mode = x[1];
    var _doc = x[2];

    if (typeof _doc === "string") {
      out.push(_doc);
      pos += getStringWidth(_doc);
    } else {
      switch (_doc.type) {
        case "cursor":
          out.push(cursor$1.placeholder);
          break;

        case "concat":
          for (var i = _doc.parts.length - 1; i >= 0; i--) {
            cmds.push([ind, mode, _doc.parts[i]]);
          }

          break;

        case "indent":
          cmds.push([makeIndent(ind, options), mode, _doc.contents]);
          break;

        case "align":
          cmds.push([makeAlign(ind, _doc.n, options), mode, _doc.contents]);
          break;

        case "trim":
          pos -= trim$1(out);
          break;

        case "group":
          switch (mode) {
            case MODE_FLAT:
              if (!shouldRemeasure) {
                cmds.push([ind, _doc.break ? MODE_BREAK : MODE_FLAT, _doc.contents]);
                break;
              }

            // fallthrough

            case MODE_BREAK:
              {
                shouldRemeasure = false;
                var next = [ind, MODE_FLAT, _doc.contents];
                var rem = width - pos;

                if (!_doc.break && fits(next, cmds, rem, options)) {
                  cmds.push(next);
                } else {
                  // Expanded states are a rare case where a document
                  // can manually provide multiple representations of
                  // itself. It provides an array of documents
                  // going from the least expanded (most flattened)
                  // representation first to the most expanded. If a
                  // group has these, we need to manually go through
                  // these states and find the first one that fits.
                  if (_doc.expandedStates) {
                    var mostExpanded = _doc.expandedStates[_doc.expandedStates.length - 1];

                    if (_doc.break) {
                      cmds.push([ind, MODE_BREAK, mostExpanded]);
                      break;
                    } else {
                      for (var _i2 = 1; _i2 < _doc.expandedStates.length + 1; _i2++) {
                        if (_i2 >= _doc.expandedStates.length) {
                          cmds.push([ind, MODE_BREAK, mostExpanded]);
                          break;
                        } else {
                          var state = _doc.expandedStates[_i2];
                          var cmd = [ind, MODE_FLAT, state];

                          if (fits(cmd, cmds, rem, options)) {
                            cmds.push(cmd);
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    cmds.push([ind, MODE_BREAK, _doc.contents]);
                  }
                }

                break;
              }
          }

          if (_doc.id) {
            groupModeMap[_doc.id] = cmds[cmds.length - 1][1];
          }

          break;
        // Fills each line with as much code as possible before moving to a new
        // line with the same indentation.
        //
        // Expects doc.parts to be an array of alternating content and
        // whitespace. The whitespace contains the linebreaks.
        //
        // For example:
        //   ["I", line, "love", line, "monkeys"]
        // or
        //   [{ type: group, ... }, softline, { type: group, ... }]
        //
        // It uses this parts structure to handle three main layout cases:
        // * The first two content items fit on the same line without
        //   breaking
        //   -> output the first content item and the whitespace "flat".
        // * Only the first content item fits on the line without breaking
        //   -> output the first content item "flat" and the whitespace with
        //   "break".
        // * Neither content item fits on the line without breaking
        //   -> output the first content item and the whitespace with "break".

        case "fill":
          {
            var _rem = width - pos;

            var parts = _doc.parts;

            if (parts.length === 0) {
              break;
            }

            var content = parts[0];
            var contentFlatCmd = [ind, MODE_FLAT, content];
            var contentBreakCmd = [ind, MODE_BREAK, content];
            var contentFits = fits(contentFlatCmd, [], _rem, options, true);

            if (parts.length === 1) {
              if (contentFits) {
                cmds.push(contentFlatCmd);
              } else {
                cmds.push(contentBreakCmd);
              }

              break;
            }

            var whitespace = parts[1];
            var whitespaceFlatCmd = [ind, MODE_FLAT, whitespace];
            var whitespaceBreakCmd = [ind, MODE_BREAK, whitespace];

            if (parts.length === 2) {
              if (contentFits) {
                cmds.push(whitespaceFlatCmd);
                cmds.push(contentFlatCmd);
              } else {
                cmds.push(whitespaceBreakCmd);
                cmds.push(contentBreakCmd);
              }

              break;
            } // At this point we've handled the first pair (context, separator)
            // and will create a new fill doc for the rest of the content.
            // Ideally we wouldn't mutate the array here but coping all the
            // elements to a new array would make this algorithm quadratic,
            // which is unusable for large arrays (e.g. large texts in JSX).


            parts.splice(0, 2);
            var remainingCmd = [ind, mode, fill$1(parts)];
            var secondContent = parts[0];
            var firstAndSecondContentFlatCmd = [ind, MODE_FLAT, concat$1([content, whitespace, secondContent])];
            var firstAndSecondContentFits = fits(firstAndSecondContentFlatCmd, [], _rem, options, true);

            if (firstAndSecondContentFits) {
              cmds.push(remainingCmd);
              cmds.push(whitespaceFlatCmd);
              cmds.push(contentFlatCmd);
            } else if (contentFits) {
              cmds.push(remainingCmd);
              cmds.push(whitespaceBreakCmd);
              cmds.push(contentFlatCmd);
            } else {
              cmds.push(remainingCmd);
              cmds.push(whitespaceBreakCmd);
              cmds.push(contentBreakCmd);
            }

            break;
          }

        case "if-break":
          {
            var groupMode = _doc.groupId ? groupModeMap[_doc.groupId] : mode;

            if (groupMode === MODE_BREAK) {
              if (_doc.breakContents) {
                cmds.push([ind, mode, _doc.breakContents]);
              }
            }

            if (groupMode === MODE_FLAT) {
              if (_doc.flatContents) {
                cmds.push([ind, mode, _doc.flatContents]);
              }
            }

            break;
          }

        case "line-suffix":
          lineSuffix.push([ind, mode, _doc.contents]);
          break;

        case "line-suffix-boundary":
          if (lineSuffix.length > 0) {
            cmds.push([ind, mode, {
              type: "line",
              hard: true
            }]);
          }

          break;

        case "line":
          switch (mode) {
            case MODE_FLAT:
              if (!_doc.hard) {
                if (!_doc.soft) {
                  out.push(" ");
                  pos += 1;
                }

                break;
              } else {
                // This line was forced into the output even if we
                // were in flattened mode, so we need to tell the next
                // group that no matter what, it needs to remeasure
                // because the previous measurement didn't accurately
                // capture the entire expression (this is necessary
                // for nested groups)
                shouldRemeasure = true;
              }

            // fallthrough

            case MODE_BREAK:
              if (lineSuffix.length) {
                cmds.push([ind, mode, _doc]);
                [].push.apply(cmds, lineSuffix.reverse());
                lineSuffix = [];
                break;
              }

              if (_doc.literal) {
                if (ind.root) {
                  out.push(newLine, ind.root.value);
                  pos = ind.root.length;
                } else {
                  out.push(newLine);
                  pos = 0;
                }
              } else {
                pos -= trim$1(out);
                out.push(newLine + ind.value);
                pos = ind.length;
              }

              break;
          }

          break;

        default:
      }
    }
  }

  var cursorPlaceholderIndex = out.indexOf(cursor$1.placeholder);

  if (cursorPlaceholderIndex !== -1) {
    var otherCursorPlaceholderIndex = out.indexOf(cursor$1.placeholder, cursorPlaceholderIndex + 1);
    var beforeCursor = out.slice(0, cursorPlaceholderIndex).join("");
    var aroundCursor = out.slice(cursorPlaceholderIndex + 1, otherCursorPlaceholderIndex).join("");
    var afterCursor = out.slice(otherCursorPlaceholderIndex + 1).join("");
    return {
      formatted: beforeCursor + aroundCursor + afterCursor,
      cursorNodeStart: beforeCursor.length,
      cursorNodeText: aroundCursor
    };
  }

  return {
    formatted: out.join("")
  };
}

var docPrinter = {
  printDocToString: printDocToString
};

var traverseDocOnExitStackMarker = {};

function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
  var docsStack = [doc];

  while (docsStack.length !== 0) {
    var _doc = docsStack.pop();

    if (_doc === traverseDocOnExitStackMarker) {
      onExit(docsStack.pop());
      continue;
    }

    var shouldRecurse = true;

    if (onEnter) {
      if (onEnter(_doc) === false) {
        shouldRecurse = false;
      }
    }

    if (onExit) {
      docsStack.push(_doc);
      docsStack.push(traverseDocOnExitStackMarker);
    }

    if (shouldRecurse) {
      // When there are multiple parts to process,
      // the parts need to be pushed onto the stack in reverse order,
      // so that they are processed in the original order
      // when the stack is popped.
      if (_doc.type === "concat" || _doc.type === "fill") {
        for (var ic = _doc.parts.length, i = ic - 1; i >= 0; --i) {
          docsStack.push(_doc.parts[i]);
        }
      } else if (_doc.type === "if-break") {
        if (_doc.flatContents) {
          docsStack.push(_doc.flatContents);
        }

        if (_doc.breakContents) {
          docsStack.push(_doc.breakContents);
        }
      } else if (_doc.type === "group" && _doc.expandedStates) {
        if (shouldTraverseConditionalGroups) {
          for (var _ic = _doc.expandedStates.length, _i = _ic - 1; _i >= 0; --_i) {
            docsStack.push(_doc.expandedStates[_i]);
          }
        } else {
          docsStack.push(_doc.contents);
        }
      } else if (_doc.contents) {
        docsStack.push(_doc.contents);
      }
    }
  }
}

function mapDoc(doc, cb) {
  if (doc.type === "concat" || doc.type === "fill") {
    var parts = doc.parts.map(function (part) {
      return mapDoc(part, cb);
    });
    return cb(Object.assign({}, doc, {
      parts: parts
    }));
  } else if (doc.type === "if-break") {
    var breakContents = doc.breakContents && mapDoc(doc.breakContents, cb);
    var flatContents = doc.flatContents && mapDoc(doc.flatContents, cb);
    return cb(Object.assign({}, doc, {
      breakContents: breakContents,
      flatContents: flatContents
    }));
  } else if (doc.contents) {
    var contents = mapDoc(doc.contents, cb);
    return cb(Object.assign({}, doc, {
      contents: contents
    }));
  }

  return cb(doc);
}

function findInDoc(doc, fn, defaultValue) {
  var result = defaultValue;
  var hasStopped = false;

  function findInDocOnEnterFn(doc) {
    var maybeResult = fn(doc);

    if (maybeResult !== undefined) {
      hasStopped = true;
      result = maybeResult;
    }

    if (hasStopped) {
      return false;
    }
  }

  traverseDoc(doc, findInDocOnEnterFn);
  return result;
}

function isEmpty(n) {
  return typeof n === "string" && n.length === 0;
}

function isLineNextFn(doc) {
  if (typeof doc === "string") {
    return false;
  }

  if (doc.type === "line") {
    return true;
  }
}

function isLineNext(doc) {
  return findInDoc(doc, isLineNextFn, false);
}

function willBreakFn(doc) {
  if (doc.type === "group" && doc.break) {
    return true;
  }

  if (doc.type === "line" && doc.hard) {
    return true;
  }

  if (doc.type === "break-parent") {
    return true;
  }
}

function willBreak(doc) {
  return findInDoc(doc, willBreakFn, false);
}

function breakParentGroup(groupStack) {
  if (groupStack.length > 0) {
    var parentGroup = groupStack[groupStack.length - 1]; // Breaks are not propagated through conditional groups because
    // the user is expected to manually handle what breaks.

    if (!parentGroup.expandedStates) {
      parentGroup.break = true;
    }
  }

  return null;
}

function propagateBreaks(doc) {
  var alreadyVisitedSet = new Set();
  var groupStack = [];

  function propagateBreaksOnEnterFn(doc) {
    if (doc.type === "break-parent") {
      breakParentGroup(groupStack);
    }

    if (doc.type === "group") {
      groupStack.push(doc);

      if (alreadyVisitedSet.has(doc)) {
        return false;
      }

      alreadyVisitedSet.add(doc);
    }
  }

  function propagateBreaksOnExitFn(doc) {
    if (doc.type === "group") {
      var group = groupStack.pop();

      if (group.break) {
        breakParentGroup(groupStack);
      }
    }
  }

  traverseDoc(doc, propagateBreaksOnEnterFn, propagateBreaksOnExitFn,
  /* shouldTraverseConditionalGroups */
  true);
}

function removeLinesFn(doc) {
  // Force this doc into flat mode by statically converting all
  // lines into spaces (or soft lines into nothing). Hard lines
  // should still output because there's too great of a chance
  // of breaking existing assumptions otherwise.
  if (doc.type === "line" && !doc.hard) {
    return doc.soft ? "" : " ";
  } else if (doc.type === "if-break") {
    return doc.flatContents || "";
  }

  return doc;
}

function removeLines(doc) {
  return mapDoc(doc, removeLinesFn);
}

function stripTrailingHardline(doc) {
  // HACK remove ending hardline, original PR: #1984
  if (doc.type === "concat" && doc.parts.length !== 0) {
    var lastPart = doc.parts[doc.parts.length - 1];

    if (lastPart.type === "concat") {
      if (lastPart.parts.length === 2 && lastPart.parts[0].hard && lastPart.parts[1].type === "break-parent") {
        return {
          type: "concat",
          parts: doc.parts.slice(0, -1)
        };
      }

      return {
        type: "concat",
        parts: doc.parts.slice(0, -1).concat(stripTrailingHardline(lastPart))
      };
    }
  }

  return doc;
}

var docUtils = {
  isEmpty: isEmpty,
  willBreak: willBreak,
  isLineNext: isLineNext,
  traverseDoc: traverseDoc,
  findInDoc: findInDoc,
  mapDoc: mapDoc,
  propagateBreaks: propagateBreaks,
  removeLines: removeLines,
  stripTrailingHardline: stripTrailingHardline
};

function flattenDoc(doc) {
  if (doc.type === "concat") {
    var res = [];

    for (var i = 0; i < doc.parts.length; ++i) {
      var doc2 = doc.parts[i];

      if (typeof doc2 !== "string" && doc2.type === "concat") {
        [].push.apply(res, flattenDoc(doc2).parts);
      } else {
        var flattened = flattenDoc(doc2);

        if (flattened !== "") {
          res.push(flattened);
        }
      }
    }

    return Object.assign({}, doc, {
      parts: res
    });
  } else if (doc.type === "if-break") {
    return Object.assign({}, doc, {
      breakContents: doc.breakContents != null ? flattenDoc(doc.breakContents) : null,
      flatContents: doc.flatContents != null ? flattenDoc(doc.flatContents) : null
    });
  } else if (doc.type === "group") {
    return Object.assign({}, doc, {
      contents: flattenDoc(doc.contents),
      expandedStates: doc.expandedStates ? doc.expandedStates.map(flattenDoc) : doc.expandedStates
    });
  } else if (doc.contents) {
    return Object.assign({}, doc, {
      contents: flattenDoc(doc.contents)
    });
  }

  return doc;
}

function printDoc(doc) {
  if (typeof doc === "string") {
    return JSON.stringify(doc);
  }

  if (doc.type === "line") {
    if (doc.literal) {
      return "literalline";
    }

    if (doc.hard) {
      return "hardline";
    }

    if (doc.soft) {
      return "softline";
    }

    return "line";
  }

  if (doc.type === "break-parent") {
    return "breakParent";
  }

  if (doc.type === "trim") {
    return "trim";
  }

  if (doc.type === "concat") {
    return "[" + doc.parts.map(printDoc).join(", ") + "]";
  }

  if (doc.type === "indent") {
    return "indent(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "align") {
    return doc.n === -Infinity ? "dedentToRoot(" + printDoc(doc.contents) + ")" : doc.n < 0 ? "dedent(" + printDoc(doc.contents) + ")" : doc.n.type === "root" ? "markAsRoot(" + printDoc(doc.contents) + ")" : "align(" + JSON.stringify(doc.n) + ", " + printDoc(doc.contents) + ")";
  }

  if (doc.type === "if-break") {
    return "ifBreak(" + printDoc(doc.breakContents) + (doc.flatContents ? ", " + printDoc(doc.flatContents) : "") + ")";
  }

  if (doc.type === "group") {
    if (doc.expandedStates) {
      return "conditionalGroup(" + "[" + doc.expandedStates.map(printDoc).join(",") + "])";
    }

    return (doc.break ? "wrappedGroup" : "group") + "(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "fill") {
    return "fill" + "(" + doc.parts.map(printDoc).join(", ") + ")";
  }

  if (doc.type === "line-suffix") {
    return "lineSuffix(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "line-suffix-boundary") {
    return "lineSuffixBoundary";
  }

  throw new Error("Unknown doc type " + doc.type);
}

var docDebug = {
  printDocToDebug: function printDocToDebug(doc) {
    return printDoc(flattenDoc(doc));
  }
};

var doc = {
  builders: docBuilders,
  printer: docPrinter,
  utils: docUtils,
  debug: docDebug
};

return doc;

})));
