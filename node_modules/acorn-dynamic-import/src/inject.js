/* eslint-disable no-underscore-dangle */

export const DynamicImportKey = 'Import';

export default function injectDynamicImport(acorn) {
  const tt = acorn.tokTypes;

  // NOTE: This allows `yield import()` to parse correctly.
  tt._import.startsExpr = true;

  function parseDynamicImport() {
    const node = this.startNode();
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
  acorn.plugins.dynamicImport = function dynamicImportPlugin(instance) {
    instance.extend('parseStatement', nextMethod => (
      function parseStatement(...args) {
        const node = this.startNode();
        if (this.type === tt._import) {
          const nextToken = peekNext.call(this);
          if (nextToken === tt.parenL.label) {
            const expr = this.parseExpression();
            return this.parseExpressionStatement(node, expr);
          }
        }

        return nextMethod.apply(this, args);
      }
    ));

    instance.extend('parseExprAtom', nextMethod => (
      function parseExprAtom(refDestructuringErrors) {
        if (this.type === tt._import) {
          return parseDynamicImport.call(this);
        }
        return nextMethod.call(this, refDestructuringErrors);
      }
    ));
  };

  return acorn;
}
