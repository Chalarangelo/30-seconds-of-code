"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = literalTemplate;

var _options = require("./options");

var _parse = _interopRequireDefault(require("./parse"));

var _populate = _interopRequireDefault(require("./populate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function literalTemplate(formatter, tpl, opts) {
  const {
    metadata,
    names
  } = buildLiteralData(formatter, tpl, opts);
  return arg => {
    const defaultReplacements = arg.reduce((acc, replacement, i) => {
      acc[names[i]] = replacement;
      return acc;
    }, {});
    return arg => {
      const replacements = (0, _options.normalizeReplacements)(arg);

      if (replacements) {
        Object.keys(replacements).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) {
            throw new Error("Unexpected replacement overlap.");
          }
        });
      }

      return formatter.unwrap((0, _populate.default)(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
    };
  };
}

function buildLiteralData(formatter, tpl, opts) {
  let names;
  let nameSet;
  let metadata;
  let prefix = "";

  do {
    prefix += "$";
    const result = buildTemplateCode(tpl, prefix);
    names = result.names;
    nameSet = new Set(names);
    metadata = (0, _parse.default)(formatter, formatter.code(result.code), {
      parser: opts.parser,
      placeholderWhitelist: new Set(result.names.concat(opts.placeholderWhitelist ? Array.from(opts.placeholderWhitelist) : [])),
      placeholderPattern: opts.placeholderPattern,
      preserveComments: opts.preserveComments,
      syntacticPlaceholders: opts.syntacticPlaceholders
    });
  } while (metadata.placeholders.some(placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name)));

  return {
    metadata,
    names
  };
}

function buildTemplateCode(tpl, prefix) {
  const names = [];
  let code = tpl[0];

  for (let i = 1; i < tpl.length; i++) {
    const value = `${prefix}${i - 1}`;
    names.push(value);
    code += value + tpl[i];
  }

  return {
    names,
    code
  };
}