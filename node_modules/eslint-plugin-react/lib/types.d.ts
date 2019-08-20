import eslint from 'eslint';
import estree from 'estree';

declare global {
  interface ASTNode extends estree.BaseNode {
    [_: string]: any; // TODO: fixme
  }
  type Scope = eslint.Scope.Scope;
  type Token = eslint.AST.Token;
  type Fixer = eslint.Rule.RuleFixer;
  type JSXAttribute = ASTNode;
  type JSXSpreadAttribute = ASTNode;

  interface Context extends eslint.SourceCode {
    getFirstTokens(node: estree.Node | ASTNode, options?: eslint.SourceCode.CursorWithCountOptions): eslint.AST.Token[];
  }

  type TypeDeclarationBuilder = (annotation: ASTNode, parentName: string, seen: Set<typeof annotation>) => object;

  type TypeDeclarationBuilders = {
    [k in string]: TypeDeclarationBuilder;
  };

  type UnionTypeDefinitionChildren = unknown[];
  type UnionTypeDefinition = {
    type: 'union' | 'shape';
    children: UnionTypeDefinitionChildren | true;
  };
}
