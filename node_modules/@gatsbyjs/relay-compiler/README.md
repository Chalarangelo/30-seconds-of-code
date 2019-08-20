# Relay Compiler

Relay-Compiler is a code-generation toolkit for GraphQL. It contains the core functionalities of GraphQL code-gen, including file parsing, validation, syntax tree parsing and transformation.

The GraphQL-Compiler package [exports library code](./GraphQLCompilerPublic.js) which you may use to find the modules you need, or to extend the compiler with your own custom input and output. Note, the internal APIs of the GraphQL-Compiler are under constant iteration, so rolling your own version may lead to incompatibilities with future releases.

The following graph illustrates the high-level architecture of a complete GraphQL code-generation pipeline:

![CodegenPipeline](https://github.com/facebook/relay/raw/master/packages/relay-compiler/docs/Architecture.png)

To understand the underlying workflow of the core compilation step, which is what happens in the "GraphQL Compiler" block in the above graph, please refer [HERE](./ARCHITECTURE.md).

You can build your own version of the Compiler by adding your own `FileWriter`, and by swapping or adding a `FileParser` and additional `IRTransforms` (IR, which stands for `Intermediate Representation`, a special-purpose syntax tree format designed for transformability).

* The GraphQL-Compiler package provides a [`GraphQLFileParser`](./core/GraphQLFileParser.js), which can be used to parse general `.graphql` files, and a [`GraphQLTextParser`](./core/GraphQLTextParser.js), which can be used to parse GraphQL text in any source files with customized tags. You can also write your own `FileParser` at your discretion.

* You can add additional `IRTransforms` by extending the basic [`GraphQLIRTransforms`](./core/GraphQLIRTransforms.js). A sample can be found [HERE](../core/RelayIRTransforms.js).

* Similarly, you can add additional validation rules by extending the basic [`GraphQLValidator`](./core/GraphQLValidator.js).
Sample [HERE](../core/RelayValidator.js).

* A sample `FileWriter` can be found [HERE](../codegen/RelayFileWriter.js).

To actually run your compiler, you will also need a script to assemble all the above components. A sample file can be found [HERE](../bin/RelayCompilerBin.js).
