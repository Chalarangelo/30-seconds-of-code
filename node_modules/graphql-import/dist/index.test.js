"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var fs = require("fs");
var _1 = require(".");
ava_1.default('parseImportLine: parse single import', function (t) {
    t.deepEqual(_1.parseImportLine("import A from \"schema.graphql\""), {
        imports: ['A'],
        from: 'schema.graphql',
    });
});
ava_1.default('parseImportLine: optional semicolon', function (t) {
    t.deepEqual(_1.parseImportLine("import A from \"schema.graphql\";"), {
        imports: ['A'],
        from: 'schema.graphql',
    });
});
ava_1.default('parseImportLine: invalid', function (t) {
    t.throws(function () { return _1.parseImportLine("import from \"schema.graphql\""); }, Error);
});
ava_1.default('parseImportLine: invalid 2', function (t) {
    t.throws(function () { return _1.parseImportLine("import A from \"\""); }, Error);
});
ava_1.default('parseImportLine: parse multi import', function (t) {
    t.deepEqual(_1.parseImportLine("import A, B from \"schema.graphql\""), {
        imports: ['A', 'B'],
        from: 'schema.graphql',
    });
});
ava_1.default('parseImportLine: parse multi import (weird spacing)', function (t) {
    t.deepEqual(_1.parseImportLine("import  A  ,B   from \"schema.graphql\""), {
        imports: ['A', 'B'],
        from: 'schema.graphql',
    });
});
ava_1.default('parseImportLine: different path', function (t) {
    t.deepEqual(_1.parseImportLine("import A from \"../new/schema.graphql\""), {
        imports: ['A'],
        from: '../new/schema.graphql',
    });
});
ava_1.default('parseImportLine: module in node_modules', function (t) {
    t.deepEqual(_1.parseImportLine("import A from \"module-name\""), {
        imports: ['A'],
        from: 'module-name',
    });
});
ava_1.default('parseSDL: non-import comment', function (t) {
    t.deepEqual(_1.parseSDL("#importent: comment"), []);
});
ava_1.default('parse: multi line import', function (t) {
    var sdl = "# import A from \"a.graphql\"\n# import * from \"b.graphql\"\n  ";
    t.deepEqual(_1.parseSDL(sdl), [
        {
            imports: ['A'],
            from: 'a.graphql',
        },
        {
            imports: ['*'],
            from: 'b.graphql',
        },
    ]);
});
ava_1.default('Module in node_modules', function (t) {
    var b = "# import lower from './lower.graphql'\ntype B {\n  id: ID!\n  nickname: String! @lower\n}\n";
    var lower = "directive @lower on FIELD_DEFINITION\n";
    var expectedSDL = "type A {\n  id: ID!\n  author: B!\n}\n\ntype B {\n  id: ID!\n  nickname: String! @lower\n}\n\ndirective @lower on FIELD_DEFINITION\n";
    var moduleDir = 'node_modules/graphql-import-test';
    if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir);
    }
    fs.writeFileSync(moduleDir + '/b.graphql', b);
    fs.writeFileSync(moduleDir + '/lower.graphql', lower);
    t.is(_1.importSchema('fixtures/import-module/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: imports only', function (t) {
    var expectedSDL = "type Query {\n  first: String\n  second: Float\n  third: String\n}\n";
    t.is(_1.importSchema('fixtures/imports-only/all.graphql'), expectedSDL);
});
ava_1.default('importSchema: import duplicate', function (t) {
    var expectedSDL = "type Query {\n  first: String\n  second: Float\n  third: String\n}\n";
    t.is(_1.importSchema('fixtures/import-duplicate/all.graphql'), expectedSDL);
});
ava_1.default('importSchema: import nested', function (t) {
    var expectedSDL = "type Query {\n  first: String\n  second: Float\n  third: String\n}\n";
    t.is(_1.importSchema('fixtures/import-nested/all.graphql'), expectedSDL);
});
ava_1.default('importSchema: field types', function (t) {
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  c: C\n  hello: String!\n}\n\ntype C {\n  id: ID!\n}\n";
    t.is(_1.importSchema('fixtures/field-types/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: enums', function (t) {
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\nenum B {\n  B1\n  B2\n  B3\n}\n";
    t.is(_1.importSchema('fixtures/enums/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: import all', function (t) {
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  hello: String!\n  c1: C1\n  c2: C2\n}\n\ntype C1 {\n  id: ID!\n}\n\ntype C2 {\n  id: ID!\n}\n";
    t.is(_1.importSchema('fixtures/import-all/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: import all from objects', function (t) {
    var schemaC = "\n    type C1 {\n      id: ID!\n    }\n\n    type C2 {\n      id: ID!\n    }\n\n    type C3 {\n      id: ID!\n    }";
    var schemaB = "\n    # import * from 'schemaC'\n\n    type B {\n      hello: String!\n      c1: C1\n      c2: C2\n    }";
    var schemaA = "\n    # import B from 'schemaB'\n\n    type A {\n      # test 1\n      first: String\n      second: Float\n      b: B\n    }";
    var schemas = {
        schemaA: schemaA,
        schemaB: schemaB,
        schemaC: schemaC,
    };
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  hello: String!\n  c1: C1\n  c2: C2\n}\n\ntype C1 {\n  id: ID!\n}\n\ntype C2 {\n  id: ID!\n}\n";
    t.is(_1.importSchema(schemaA, schemas), expectedSDL);
});
ava_1.default("importSchema: single object schema", function (t) {
    var schemaA = "\n    type A {\n      field: String\n    }";
    var expectedSDL = "type A {\n  field: String\n}\n";
    t.is(_1.importSchema(schemaA), expectedSDL);
});
ava_1.default("importSchema: import all mix 'n match", function (t) {
    var schemaB = "\n    # import C1, C2 from 'fixtures/import-all/c.graphql'\n\n    type B {\n      hello: String!\n      c1: C1\n      c2: C2\n    }";
    var schemaA = "\n    # import * from \"schemaB\"\n\n    type A {\n      # test 1\n      first: String\n      second: Float\n      b: B\n    }";
    var schemas = {
        schemaB: schemaB,
    };
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  hello: String!\n  c1: C1\n  c2: C2\n}\n\ntype C1 {\n  id: ID!\n}\n\ntype C2 {\n  id: ID!\n}\n";
    t.is(_1.importSchema(schemaA, schemas), expectedSDL);
});
ava_1.default("importSchema: import all mix 'n match 2", function (t) {
    var schemaA = "\n    # import * from \"fixtures/import-all/b.graphql\"\n\n    type A {\n      # test 1\n      first: String\n      second: Float\n      b: B\n    }";
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  hello: String!\n  c1: C1\n  c2: C2\n}\n\ntype C1 {\n  id: ID!\n}\n\ntype C2 {\n  id: ID!\n}\n";
    t.is(_1.importSchema(schemaA), expectedSDL);
});
ava_1.default("importSchema: import all - exclude Query/Mutation/Subscription type", function (t) {
    var schemaC = "\n    type C1 {\n      id: ID!\n    }\n\n    type C2 {\n      id: ID!\n    }\n\n    type C3 {\n      id: ID!\n    }\n\n    type Query {\n      hello: String!\n    }\n\n    type Mutation {\n      hello: String!\n    }\n\n    type Subscription {\n      hello: String!\n    }\n    ";
    var schemaB = "\n    # import * from 'schemaC'\n\n    type B {\n      hello: String!\n      c1: C1\n      c2: C2\n    }";
    var schemaA = "\n    # import B from 'schemaB'\n\n    type Query {\n      greet: String!\n    }\n\n    type A {\n      # test 1\n      first: String\n      second: Float\n      b: B\n    }";
    var schemas = {
        schemaA: schemaA,
        schemaB: schemaB,
        schemaC: schemaC,
    };
    var expectedSDL = "type Query {\n  greet: String!\n}\n\ntype A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  hello: String!\n  c1: C1\n  c2: C2\n}\n\ntype C1 {\n  id: ID!\n}\n\ntype C2 {\n  id: ID!\n}\n";
    t.is(_1.importSchema(schemaA, schemas), expectedSDL);
});
ava_1.default('importSchema: scalar', function (t) {
    var expectedSDL = "type A {\n  b: B\n}\n\nscalar B\n";
    t.is(_1.importSchema('fixtures/scalar/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: directive', function (t) {
    var expectedSDL = "type A {\n  first: String @upper\n  second: String @withB @deprecated\n}\n\ndirective @upper on FIELD_DEFINITION\n\nscalar B\n\ndirective @withB(argB: B) on FIELD_DEFINITION\n";
    t.is(_1.importSchema('fixtures/directive/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: interfaces', function (t) {
    var expectedSDL = "type A implements B {\n  first: String\n  second: Float\n}\n\ninterface B {\n  second: Float\n  c: [C!]!\n}\n\ntype C {\n  c: ID!\n}\n";
    t.is(_1.importSchema('fixtures/interfaces/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: interfaces-many', function (t) {
    var expectedSDL = "type A implements B {\n  first: String\n  second: Float\n}\n\ninterface B {\n  second: Float\n  c: [C!]!\n}\n\ntype C implements D1 & D2 {\n  c: ID!\n}\n\ninterface D1 {\n  d1: ID!\n}\n\ninterface D2 {\n  d2: ID!\n}\n";
    t.is(_1.importSchema('fixtures/interfaces-many/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: interfaces-implements', function (t) {
    var expectedSDL = "type A implements B {\n  id: ID!\n}\n\ninterface B {\n  id: ID!\n}\n\ntype B1 implements B {\n  id: ID!\n}\n";
    t.is(_1.importSchema('fixtures/interfaces-implements/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: interfaces-implements-many', function (t) {
    var expectedSDL = "type A implements B {\n  id: ID!\n}\n\ninterface B {\n  id: ID!\n}\n\ntype B1 implements B {\n  id: ID!\n}\n\ntype B2 implements B {\n  id: ID!\n}\n";
    t.is(_1.importSchema('fixtures/interfaces-implements-many/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: input types', function (t) {
    var expectedSDL = "type A {\n  first(b: B): String\n  second: Float\n}\n\ninput B {\n  hello: [C!]!\n}\n\ninput C {\n  id: ID!\n}\n";
    t.is(_1.importSchema('fixtures/input-types/a.graphql'), expectedSDL);
});
ava_1.default('importSchema: complex test', function (t) {
    t.notThrows(function () {
        _1.importSchema('fixtures/complex/a.graphql');
    });
});
ava_1.default('circular imports', function (t) {
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  hello: String!\n  c1: C1\n  c2: C2\n  a: A\n}\n\ntype C1 {\n  id: ID!\n}\n\ntype C2 {\n  id: ID!\n}\n";
    var actualSDL = _1.importSchema('fixtures/circular/a.graphql');
    t.is(actualSDL, expectedSDL);
});
ava_1.default('related types', function (t) {
    var expectedSDL = "type A {\n  first: String\n  second: Float\n  b: B\n}\n\ntype B {\n  hello: String!\n  c1: C\n}\n\ntype C {\n  field: String\n}\n";
    var actualSDL = _1.importSchema('fixtures/related-types/a.graphql');
    t.is(actualSDL, expectedSDL);
});
ava_1.default('relative paths', function (t) {
    var expectedSDL = "type Query {\n  feed: [Post!]!\n}\n\ntype Mutation {\n  createDraft(title: String!, text: String): Post\n  publish(id: ID!): Post\n}\n\ntype Post implements Node {\n  id: ID!\n  isPublished: Boolean!\n  title: String!\n  text: String!\n}\n\ninterface Node {\n  id: ID!\n}\n";
    var actualSDL = _1.importSchema('fixtures/relative-paths/src/schema.graphql');
    t.is(actualSDL, expectedSDL);
});
ava_1.default('root field imports', function (t) {
    var expectedSDL = "type Query {\n  posts(filter: PostFilter): [Post]\n}\n\ntype Dummy {\n  field: String\n}\n\ntype Post {\n  field1: String\n}\n\ninput PostFilter {\n  field3: Int\n}\n";
    var actualSDL = _1.importSchema('fixtures/root-fields/a.graphql');
    t.is(actualSDL, expectedSDL);
});
ava_1.default('merged root field imports', function (t) {
    var expectedSDL = "type Query {\n  helloA: String\n  posts(filter: PostFilter): [Post]\n  hello: String\n}\n\ntype Dummy {\n  field: String\n}\n\ntype Post {\n  field1: String\n}\n\ninput PostFilter {\n  field3: Int\n}\n";
    var actualSDL = _1.importSchema('fixtures/merged-root-fields/a.graphql');
    t.is(actualSDL, expectedSDL);
});
ava_1.default('global schema modules', function (t) {
    var shared = "\n    type Shared {\n      first: String\n    }\n  ";
    var expectedSDL = "type A {\n  first: String\n  second: Shared\n}\n\ntype Shared {\n  first: String\n}\n";
    t.is(_1.importSchema('fixtures/global/a.graphql', { shared: shared }), expectedSDL);
});
ava_1.default('missing type on type', function (t) {
    var err = t.throws(function () { return _1.importSchema('fixtures/type-not-found/a.graphql'); }, Error);
    t.is(err.message, "Field test: Couldn't find type Post in any of the schemas.");
});
ava_1.default('missing type on interface', function (t) {
    var err = t.throws(function () { return _1.importSchema('fixtures/type-not-found/b.graphql'); }, Error);
    t.is(err.message, "Field test: Couldn't find type Post in any of the schemas.");
});
ava_1.default('missing type on input type', function (t) {
    var err = t.throws(function () { return _1.importSchema('fixtures/type-not-found/c.graphql'); }, Error);
    t.is(err.message, "Field post: Couldn't find type Post in any of the schemas.");
});
ava_1.default('missing interface type', function (t) {
    var err = t.throws(function () { return _1.importSchema('fixtures/type-not-found/d.graphql'); }, Error);
    t.is(err.message, "Couldn't find interface MyInterface in any of the schemas.");
});
ava_1.default('missing union type', function (t) {
    var err = t.throws(function () { return _1.importSchema('fixtures/type-not-found/e.graphql'); }, Error);
    t.is(err.message, "Couldn't find type C in any of the schemas.");
});
ava_1.default('missing type on input type', function (t) {
    var err = t.throws(function () { return _1.importSchema('fixtures/type-not-found/f.graphql'); }, Error);
    t.is(err.message, "Field myfield: Couldn't find type Post in any of the schemas.");
});
ava_1.default('missing type on directive', function (t) {
    var err = t.throws(function () { return _1.importSchema('fixtures/type-not-found/g.graphql'); }, Error);
    t.is(err.message, "Directive first: Couldn't find type first in any of the schemas.");
});
ava_1.default('import with collision', function (t) {
    // Local type gets preference over imported type
    var expectedSDL = "type User {\n  id: ID!\n  name: String!\n}\n";
    t.is(_1.importSchema('fixtures/collision/a.graphql'), expectedSDL);
});
//# sourceMappingURL=index.test.js.map