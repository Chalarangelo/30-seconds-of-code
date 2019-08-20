"use strict";

exports.__esModule = true;
exports.getBabelParserOptions = getBabelParserOptions;
exports.babelParseToAst = babelParseToAst;

const parser = require(`@babel/parser`);

const PARSER_OPTIONS = {
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  sourceType: `unambigious`,
  sourceFilename: true,
  plugins: [`jsx`, `flow`, `doExpressions`, `objectRestSpread`, [`decorators`, {
    decoratorsBeforeExport: true
  }], `classProperties`, `classPrivateProperties`, `classPrivateMethods`, `exportDefaultFrom`, `exportNamespaceFrom`, `asyncGenerators`, `functionBind`, `functionSent`, `dynamicImport`, `numericSeparator`, `optionalChaining`, `importMeta`, `bigInt`, `optionalCatchBinding`, `throwExpressions`, [`pipelineOperator`, {
    proposal: `minimal`
  }], `nullishCoalescingOperator`]
};

function getBabelParserOptions(filePath) {
  // Flow and TypeScript plugins can't be enabled simultaneously
  if (/\.tsx?/.test(filePath)) {
    const {
      plugins
    } = PARSER_OPTIONS;
    return Object.assign({}, PARSER_OPTIONS, {
      plugins: plugins.map(plugin => plugin === `flow` ? `typescript` : plugin)
    });
  }

  return PARSER_OPTIONS;
}

function babelParseToAst(contents, filePath) {
  return parser.parse(contents, getBabelParserOptions(filePath));
}
//# sourceMappingURL=babel-parse-to-ast.js.map