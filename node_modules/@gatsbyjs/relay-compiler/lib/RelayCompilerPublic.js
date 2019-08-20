/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var ASTCache = require("./ASTCache");

var ASTConvert = require("./ASTConvert");

var CodegenDirectory = require("./CodegenDirectory");

var CodegenRunner = require("./CodegenRunner");

var CodegenWatcher = require("./CodegenWatcher");

var DotGraphQLParser = require("./DotGraphQLParser");

var FindGraphQLTags = require("./FindGraphQLTags");

var GraphQLCompilerContext = require("./GraphQLCompilerContext");

var GraphQLCompilerProfiler = require("./GraphQLCompilerProfiler");

var GraphQLConsoleReporter = require("./GraphQLConsoleReporter");

var GraphQLIRPrinter = require("./GraphQLIRPrinter");

var GraphQLIRTransformer = require("./GraphQLIRTransformer");

var GraphQLIRVisitor = require("./GraphQLIRVisitor");

var GraphQLMultiReporter = require("./GraphQLMultiReporter");

var GraphQLSchemaUtils = require("./GraphQLSchemaUtils");

var GraphQLWatchmanClient = require("./GraphQLWatchmanClient");

var RelayCodeGenerator = require("./RelayCodeGenerator");

var RelayFileWriter = require("./RelayFileWriter");

var RelayFlowGenerator = require("./RelayFlowGenerator");

var RelayIRTransforms = require("./RelayIRTransforms");

var RelayParser = require("./RelayParser");

var RelaySourceModuleParser = require("./RelaySourceModuleParser");

var RelayValidator = require("./RelayValidator");

var compileRelayArtifacts = require("./compileRelayArtifacts");

var filterContextForNode = require("./filterContextForNode");

var formatGeneratedModule = require("./formatGeneratedModule");

var getIdentifierForArgumentValue = require("./getIdentifierForArgumentValue");

var getLiteralArgumentValues = require("./getLiteralArgumentValues");

var isEquivalentType = require("./isEquivalentType");

var nullthrows = require("./nullthrowsOSS");

var writeRelayGeneratedFile = require("./writeRelayGeneratedFile");

var _require = require("./SourceControl"),
    SourceControlMercurial = _require.SourceControlMercurial;

var _require2 = require("./GraphQLDerivedFromMetadata"),
    getReaderSourceDefinitionName = _require2.getReaderSourceDefinitionName,
    getSourceDefinitionName = _require2.getSourceDefinitionName;

var RelayJSModuleParser = RelaySourceModuleParser(FindGraphQLTags.find);
module.exports = {
  ASTConvert: ASTConvert,
  CodegenDirectory: CodegenDirectory,
  CodegenRunner: CodegenRunner,
  CodegenWatcher: CodegenWatcher,
  CompilerContext: GraphQLCompilerContext,
  ConsoleReporter: GraphQLConsoleReporter,
  DotGraphQLParser: DotGraphQLParser,
  ASTCache: ASTCache,
  IRTransformer: GraphQLIRTransformer,
  IRVisitor: GraphQLIRVisitor,
  Printer: GraphQLIRPrinter,
  Profiler: GraphQLCompilerProfiler,
  SchemaUtils: GraphQLSchemaUtils,
  SourceControlMercurial: SourceControlMercurial,
  WatchmanClient: GraphQLWatchmanClient,
  filterContextForNode: filterContextForNode,
  getIdentifierForArgumentValue: getIdentifierForArgumentValue,
  getLiteralArgumentValues: getLiteralArgumentValues,
  isEquivalentType: isEquivalentType,
  nullthrows: nullthrows,
  Parser: RelayParser,
  Validator: RelayValidator,
  CodeGenerator: RelayCodeGenerator,
  FlowGenerator: RelayFlowGenerator,
  GraphQLCompilerContext: GraphQLCompilerContext,

  /** @deprecated Use JSModuleParser. */
  FileIRParser: RelayJSModuleParser,
  FileWriter: RelayFileWriter,
  IRTransforms: RelayIRTransforms,
  JSModuleParser: RelayJSModuleParser,
  MultiReporter: GraphQLMultiReporter,
  Runner: CodegenRunner,
  compileRelayArtifacts: compileRelayArtifacts,
  formatGeneratedModule: formatGeneratedModule,
  convertASTDocuments: ASTConvert.convertASTDocuments,
  transformASTSchema: ASTConvert.transformASTSchema,
  getReaderSourceDefinitionName: getReaderSourceDefinitionName,
  getSourceDefinitionName: getSourceDefinitionName,
  writeRelayGeneratedFile: writeRelayGeneratedFile
};