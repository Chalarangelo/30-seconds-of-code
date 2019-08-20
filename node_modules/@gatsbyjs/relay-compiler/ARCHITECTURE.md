# GraphQL Compiler

The compiler is a set of modules designed to extract GraphQL documents from across a codebase, transform/optimize them, and generate build artifacts. Examples of common types of artifacts include optimized GraphQL to persist to your server, runtime representations of the queries for use with GraphQL clients such as the Relay runtime, or generated source code for use with GraphQL frameworks for compiled languages (Java/Swift/etc).

## Data Flow

The high-level flow of data through the compiler is represented in the following diagram:

```
                   ┌─────────────┐┌─────────────┐
                   │   GraphQL   ││   Schema    │
                   └─────────────┘└─────────────┘
                          │              │              parse
                          └───────┬──────┘
                                  ▼
                   ┌────────────────────────────┐
                   │      CompilerContext       │
                   │                            │
                   │   ┌─────┐ ┌─────┐ ┌─────┐  │──┐
                   │   │ IR  │ │ IR  │ │ ... │  │  │
                   │   └─────┘ └─────┘ └─────┘  │  │
                   └────────────────────────────┘  │  transform/
                          │    │      ▲            │   optimize
                          │    │      └────────────┘
                          │    │
                          │    └──────────┐
                          │  print        │  codegen
                          ▼               ▼
                   ┌─────────────┐ ┌─────────────┐
                   │   GraphQL   │ │  Artifacts  │
                   └─────────────┘ └─────────────┘
```

1. GraphQL text is extracted from source files and "parsed" into an intermediate representation (IR) using information from the schema.
2. The set of IR documents forms a CompilerContext, which is then transformed and optimized.
3. Finally, GraphQL is printed (e.g. to files, saved to a database, etc) and any artifacts are generated.

## Data Types & Modules

The compiler module is composed of a set of core building blocks as well as a helper that packages them together in an easy to use API. Some of the main data types and modules in the compiler are as follows:

- `IR` (Intermediate Representation): an (effectively immutable) representation of a GraphQL document (query, fragment, field, etc) as a tree structure, including type information from a schema. Compared to the standard GraphQL AST (produced by e.g. `graphql-js`) the main difference is that it encodes more of the semantics of GraphQL. For example, conditional branches (`@include` and `@skip`) are represented directly, making it easier to target optimizations for these directives (One such optimization is to merge sibling fields with the same condition, potentially reducing the number of conditionals that must be evaluated at runtime).
- `CompilerContext`: an immutable representation of a corpus of GraphQL documents. It contains the schema and a mapping of document names to document representations (as IR, see above).
- `Transform`: a "map"-like function that accepts a `CompilerContext` as input and returns a new, modified context as output. Examples below.
- `Parser`: Converts a GraphQL schema and raw GraphQL text into typed IR objects.
- `Printer`: a function that accepts IR and converts it to a GraphQL string.

The `RelayCompiler` module is a helper class that demonstrates one way of combining these primitives. It takes IR transforms, and given IR definitions, constructs a CompilerContext from them, transforming them, and generating output artifacts intended for use with Relay runtime.

## Transforms

One of the main goals of the compiler is to provide a consistent platform for writing tools that transform or optimize GraphQL. This includes the ability to experiment with new directives by transforming them away at compile time. Transform functions should typically perform a single type of modification - it's expected that an app will have multiple transforms configured in the compiler instance.

Here are a few examples of some of the included transforms:

- `FlattenTransform`: Reduces extraneous levels of indirection in a query, inlining fields from anonymous fragments wherever they match the parent type. This can be beneficial when generating code to read the results of a query or process query results, as it reduces duplicate field processing. For example:

```
# before: `id` is processed twice
foo { # type FooType
   id
   ... on FooType { # matches the parent type, so this is extraneous
     id
   }
 }

 # after: `id` is processed once
 foo {
   id
 }
 ```

 - `SkipRedundantNodeTransform`: A more advanced version of flattening, this eliminates more complex cases of field duplication such as when a field is fetched both unconditionally and conditionally, or is fetched by two different sub-fragments. For example:

```
# before: `id` processed up to 2x
foo {
  bar {
    id
  }
  ... on FooType @include(if: $cond) { # can't be flattened due to conditional
    id # but this field is guaranteed to be fetched regardless
  }
}

# after: `id` processed at most once
foo {
  bar {
    id
  }
}
```

- `GenerateRequisiteFieldTransform`: This optional, Relay-specific transform inserts `id` fields for globally identifiable objects and `__typename` fields wherever the type cannot be statically determined (e.g. for unions).
