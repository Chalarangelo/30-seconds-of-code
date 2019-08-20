Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = injectDynamicImport;
/* eslint-disable no-underscore-dangle */

var DynamicImportKey = exports.DynamicImportKey = 'Import';

function injectDynamicImport(acorn) {
  var tt = acorn.tokTypes;

  // NOTE: This allows `yield import()` to parse correctly.
  tt._import.startsExpr = true;

  function parseDynamicImport() {
    var node = this.startNode();
    this.next();
    if (this.type !== tt.parenL) {
      this.unexpected();
    }
    return this.finishNode(node, DynamicImportKey);
  }

  function peekNext() {
    return this.input[this.pos];
  }

  // eslint-disable-next-line no-param-reassign
  acorn.plugins.dynamicImport = function () {
    function dynamicImportPlugin(instance) {
      instance.extend('parseStatement', function (nextMethod) {
        return function () {
          function parseStatement() {
            var node = this.startNode();
            if (this.type === tt._import) {
              var nextToken = peekNext.call(this);
              if (nextToken === tt.parenL.label) {
                var expr = this.parseExpression();
                return this.parseExpressionStatement(node, expr);
              }
            }

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return nextMethod.apply(this, args);
          }

          return parseStatement;
        }();
      });

      instance.extend('parseExprAtom', function (nextMethod) {
        return function () {
          function parseExprAtom(refDestructuringErrors) {
            if (this.type === tt._import) {
              return parseDynamicImport.call(this);
            }
            return nextMethod.call(this, refDestructuringErrors);
          }

          return parseExprAtom;
        }();
      });
    }

    return dynamicImportPlugin;
  }();

  return acorn;
}