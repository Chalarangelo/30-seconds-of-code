"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnyTypeAnnotation = AnyTypeAnnotation;
exports.ArrayTypeAnnotation = ArrayTypeAnnotation;
exports.BooleanTypeAnnotation = BooleanTypeAnnotation;
exports.BooleanLiteralTypeAnnotation = BooleanLiteralTypeAnnotation;
exports.NullLiteralTypeAnnotation = NullLiteralTypeAnnotation;
exports.DeclareClass = DeclareClass;
exports.DeclareFunction = DeclareFunction;
exports.InferredPredicate = InferredPredicate;
exports.DeclaredPredicate = DeclaredPredicate;
exports.DeclareInterface = DeclareInterface;
exports.DeclareModule = DeclareModule;
exports.DeclareModuleExports = DeclareModuleExports;
exports.DeclareTypeAlias = DeclareTypeAlias;
exports.DeclareOpaqueType = DeclareOpaqueType;
exports.DeclareVariable = DeclareVariable;
exports.DeclareExportDeclaration = DeclareExportDeclaration;
exports.DeclareExportAllDeclaration = DeclareExportAllDeclaration;
exports.ExistsTypeAnnotation = ExistsTypeAnnotation;
exports.FunctionTypeAnnotation = FunctionTypeAnnotation;
exports.FunctionTypeParam = FunctionTypeParam;
exports.GenericTypeAnnotation = exports.ClassImplements = exports.InterfaceExtends = InterfaceExtends;
exports._interfaceish = _interfaceish;
exports._variance = _variance;
exports.InterfaceDeclaration = InterfaceDeclaration;
exports.InterfaceTypeAnnotation = InterfaceTypeAnnotation;
exports.IntersectionTypeAnnotation = IntersectionTypeAnnotation;
exports.MixedTypeAnnotation = MixedTypeAnnotation;
exports.EmptyTypeAnnotation = EmptyTypeAnnotation;
exports.NullableTypeAnnotation = NullableTypeAnnotation;
exports.NumberTypeAnnotation = NumberTypeAnnotation;
exports.StringTypeAnnotation = StringTypeAnnotation;
exports.ThisTypeAnnotation = ThisTypeAnnotation;
exports.TupleTypeAnnotation = TupleTypeAnnotation;
exports.TypeofTypeAnnotation = TypeofTypeAnnotation;
exports.TypeAlias = TypeAlias;
exports.TypeAnnotation = TypeAnnotation;
exports.TypeParameterDeclaration = exports.TypeParameterInstantiation = TypeParameterInstantiation;
exports.TypeParameter = TypeParameter;
exports.OpaqueType = OpaqueType;
exports.ObjectTypeAnnotation = ObjectTypeAnnotation;
exports.ObjectTypeInternalSlot = ObjectTypeInternalSlot;
exports.ObjectTypeCallProperty = ObjectTypeCallProperty;
exports.ObjectTypeIndexer = ObjectTypeIndexer;
exports.ObjectTypeProperty = ObjectTypeProperty;
exports.ObjectTypeSpreadProperty = ObjectTypeSpreadProperty;
exports.QualifiedTypeIdentifier = QualifiedTypeIdentifier;
exports.UnionTypeAnnotation = UnionTypeAnnotation;
exports.TypeCastExpression = TypeCastExpression;
exports.Variance = Variance;
exports.VoidTypeAnnotation = VoidTypeAnnotation;
Object.defineProperty(exports, "NumberLiteralTypeAnnotation", {
  enumerable: true,
  get: function () {
    return _types2.NumericLiteral;
  }
});
Object.defineProperty(exports, "StringLiteralTypeAnnotation", {
  enumerable: true,
  get: function () {
    return _types2.StringLiteral;
  }
});

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

var _modules = require("./modules");

var _types2 = require("./types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function AnyTypeAnnotation() {
  this.word("any");
}

function ArrayTypeAnnotation(node) {
  this.print(node.elementType, node);
  this.token("[");
  this.token("]");
}

function BooleanTypeAnnotation() {
  this.word("boolean");
}

function BooleanLiteralTypeAnnotation(node) {
  this.word(node.value ? "true" : "false");
}

function NullLiteralTypeAnnotation() {
  this.word("null");
}

function DeclareClass(node, parent) {
  if (!t().isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }

  this.word("class");
  this.space();

  this._interfaceish(node);
}

function DeclareFunction(node, parent) {
  if (!t().isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }

  this.word("function");
  this.space();
  this.print(node.id, node);
  this.print(node.id.typeAnnotation.typeAnnotation, node);

  if (node.predicate) {
    this.space();
    this.print(node.predicate, node);
  }

  this.semicolon();
}

function InferredPredicate() {
  this.token("%");
  this.word("checks");
}

function DeclaredPredicate(node) {
  this.token("%");
  this.word("checks");
  this.token("(");
  this.print(node.value, node);
  this.token(")");
}

function DeclareInterface(node) {
  this.word("declare");
  this.space();
  this.InterfaceDeclaration(node);
}

function DeclareModule(node) {
  this.word("declare");
  this.space();
  this.word("module");
  this.space();
  this.print(node.id, node);
  this.space();
  this.print(node.body, node);
}

function DeclareModuleExports(node) {
  this.word("declare");
  this.space();
  this.word("module");
  this.token(".");
  this.word("exports");
  this.print(node.typeAnnotation, node);
}

function DeclareTypeAlias(node) {
  this.word("declare");
  this.space();
  this.TypeAlias(node);
}

function DeclareOpaqueType(node, parent) {
  if (!t().isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }

  this.OpaqueType(node);
}

function DeclareVariable(node, parent) {
  if (!t().isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }

  this.word("var");
  this.space();
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  this.semicolon();
}

function DeclareExportDeclaration(node) {
  this.word("declare");
  this.space();
  this.word("export");
  this.space();

  if (node.default) {
    this.word("default");
    this.space();
  }

  FlowExportDeclaration.apply(this, arguments);
}

function DeclareExportAllDeclaration() {
  this.word("declare");
  this.space();

  _modules.ExportAllDeclaration.apply(this, arguments);
}

function FlowExportDeclaration(node) {
  if (node.declaration) {
    const declar = node.declaration;
    this.print(declar, node);
    if (!t().isStatement(declar)) this.semicolon();
  } else {
    this.token("{");

    if (node.specifiers.length) {
      this.space();
      this.printList(node.specifiers, node);
      this.space();
    }

    this.token("}");

    if (node.source) {
      this.space();
      this.word("from");
      this.space();
      this.print(node.source, node);
    }

    this.semicolon();
  }
}

function ExistsTypeAnnotation() {
  this.token("*");
}

function FunctionTypeAnnotation(node, parent) {
  this.print(node.typeParameters, node);
  this.token("(");
  this.printList(node.params, node);

  if (node.rest) {
    if (node.params.length) {
      this.token(",");
      this.space();
    }

    this.token("...");
    this.print(node.rest, node);
  }

  this.token(")");

  if (parent.type === "ObjectTypeCallProperty" || parent.type === "DeclareFunction" || parent.type === "ObjectTypeProperty" && parent.method) {
    this.token(":");
  } else {
    this.space();
    this.token("=>");
  }

  this.space();
  this.print(node.returnType, node);
}

function FunctionTypeParam(node) {
  this.print(node.name, node);
  if (node.optional) this.token("?");

  if (node.name) {
    this.token(":");
    this.space();
  }

  this.print(node.typeAnnotation, node);
}

function InterfaceExtends(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
}

function _interfaceish(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);

  if (node.extends.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends, node);
  }

  if (node.mixins && node.mixins.length) {
    this.space();
    this.word("mixins");
    this.space();
    this.printList(node.mixins, node);
  }

  if (node.implements && node.implements.length) {
    this.space();
    this.word("implements");
    this.space();
    this.printList(node.implements, node);
  }

  this.space();
  this.print(node.body, node);
}

function _variance(node) {
  if (node.variance) {
    if (node.variance.kind === "plus") {
      this.token("+");
    } else if (node.variance.kind === "minus") {
      this.token("-");
    }
  }
}

function InterfaceDeclaration(node) {
  this.word("interface");
  this.space();

  this._interfaceish(node);
}

function andSeparator() {
  this.space();
  this.token("&");
  this.space();
}

function InterfaceTypeAnnotation(node) {
  this.word("interface");

  if (node.extends && node.extends.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends, node);
  }

  this.space();
  this.print(node.body, node);
}

function IntersectionTypeAnnotation(node) {
  this.printJoin(node.types, node, {
    separator: andSeparator
  });
}

function MixedTypeAnnotation() {
  this.word("mixed");
}

function EmptyTypeAnnotation() {
  this.word("empty");
}

function NullableTypeAnnotation(node) {
  this.token("?");
  this.print(node.typeAnnotation, node);
}

function NumberTypeAnnotation() {
  this.word("number");
}

function StringTypeAnnotation() {
  this.word("string");
}

function ThisTypeAnnotation() {
  this.word("this");
}

function TupleTypeAnnotation(node) {
  this.token("[");
  this.printList(node.types, node);
  this.token("]");
}

function TypeofTypeAnnotation(node) {
  this.word("typeof");
  this.space();
  this.print(node.argument, node);
}

function TypeAlias(node) {
  this.word("type");
  this.space();
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  this.space();
  this.token("=");
  this.space();
  this.print(node.right, node);
  this.semicolon();
}

function TypeAnnotation(node) {
  this.token(":");
  this.space();
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation, node);
}

function TypeParameterInstantiation(node) {
  this.token("<");
  this.printList(node.params, node, {});
  this.token(">");
}

function TypeParameter(node) {
  this._variance(node);

  this.word(node.name);

  if (node.bound) {
    this.print(node.bound, node);
  }

  if (node.default) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.default, node);
  }
}

function OpaqueType(node) {
  this.word("opaque");
  this.space();
  this.word("type");
  this.space();
  this.print(node.id, node);
  this.print(node.typeParameters, node);

  if (node.supertype) {
    this.token(":");
    this.space();
    this.print(node.supertype, node);
  }

  if (node.impltype) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.impltype, node);
  }

  this.semicolon();
}

function ObjectTypeAnnotation(node) {
  if (node.exact) {
    this.token("{|");
  } else {
    this.token("{");
  }

  const props = node.properties.concat(node.callProperties || [], node.indexers || [], node.internalSlots || []);

  if (props.length) {
    this.space();
    this.printJoin(props, node, {
      addNewlines(leading) {
        if (leading && !props[0]) return 1;
      },

      indent: true,
      statement: true,
      iterator: () => {
        if (props.length !== 1 || node.inexact) {
          this.token(",");
          this.space();
        }
      }
    });
    this.space();
  }

  if (node.inexact) {
    this.indent();
    this.token("...");

    if (props.length) {
      this.newline();
    }

    this.dedent();
  }

  if (node.exact) {
    this.token("|}");
  } else {
    this.token("}");
  }
}

function ObjectTypeInternalSlot(node) {
  if (node.static) {
    this.word("static");
    this.space();
  }

  this.token("[");
  this.token("[");
  this.print(node.id, node);
  this.token("]");
  this.token("]");
  if (node.optional) this.token("?");

  if (!node.method) {
    this.token(":");
    this.space();
  }

  this.print(node.value, node);
}

function ObjectTypeCallProperty(node) {
  if (node.static) {
    this.word("static");
    this.space();
  }

  this.print(node.value, node);
}

function ObjectTypeIndexer(node) {
  if (node.static) {
    this.word("static");
    this.space();
  }

  this._variance(node);

  this.token("[");

  if (node.id) {
    this.print(node.id, node);
    this.token(":");
    this.space();
  }

  this.print(node.key, node);
  this.token("]");
  this.token(":");
  this.space();
  this.print(node.value, node);
}

function ObjectTypeProperty(node) {
  if (node.proto) {
    this.word("proto");
    this.space();
  }

  if (node.static) {
    this.word("static");
    this.space();
  }

  this._variance(node);

  this.print(node.key, node);
  if (node.optional) this.token("?");

  if (!node.method) {
    this.token(":");
    this.space();
  }

  this.print(node.value, node);
}

function ObjectTypeSpreadProperty(node) {
  this.token("...");
  this.print(node.argument, node);
}

function QualifiedTypeIdentifier(node) {
  this.print(node.qualification, node);
  this.token(".");
  this.print(node.id, node);
}

function orSeparator() {
  this.space();
  this.token("|");
  this.space();
}

function UnionTypeAnnotation(node) {
  this.printJoin(node.types, node, {
    separator: orSeparator
  });
}

function TypeCastExpression(node) {
  this.token("(");
  this.print(node.expression, node);
  this.print(node.typeAnnotation, node);
  this.token(")");
}

function Variance(node) {
  if (node.kind === "plus") {
    this.token("+");
  } else {
    this.token("-");
  }
}

function VoidTypeAnnotation() {
  this.word("void");
}