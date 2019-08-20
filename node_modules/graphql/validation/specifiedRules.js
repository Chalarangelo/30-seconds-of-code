"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specifiedSDLRules = exports.specifiedRules = void 0;

var _ExecutableDefinitions = require("./rules/ExecutableDefinitions");

var _UniqueOperationNames = require("./rules/UniqueOperationNames");

var _LoneAnonymousOperation = require("./rules/LoneAnonymousOperation");

var _SingleFieldSubscriptions = require("./rules/SingleFieldSubscriptions");

var _KnownTypeNames = require("./rules/KnownTypeNames");

var _FragmentsOnCompositeTypes = require("./rules/FragmentsOnCompositeTypes");

var _VariablesAreInputTypes = require("./rules/VariablesAreInputTypes");

var _ScalarLeafs = require("./rules/ScalarLeafs");

var _FieldsOnCorrectType = require("./rules/FieldsOnCorrectType");

var _UniqueFragmentNames = require("./rules/UniqueFragmentNames");

var _KnownFragmentNames = require("./rules/KnownFragmentNames");

var _NoUnusedFragments = require("./rules/NoUnusedFragments");

var _PossibleFragmentSpreads = require("./rules/PossibleFragmentSpreads");

var _NoFragmentCycles = require("./rules/NoFragmentCycles");

var _UniqueVariableNames = require("./rules/UniqueVariableNames");

var _NoUndefinedVariables = require("./rules/NoUndefinedVariables");

var _NoUnusedVariables = require("./rules/NoUnusedVariables");

var _KnownDirectives = require("./rules/KnownDirectives");

var _UniqueDirectivesPerLocation = require("./rules/UniqueDirectivesPerLocation");

var _KnownArgumentNames = require("./rules/KnownArgumentNames");

var _UniqueArgumentNames = require("./rules/UniqueArgumentNames");

var _ValuesOfCorrectType = require("./rules/ValuesOfCorrectType");

var _ProvidedRequiredArguments = require("./rules/ProvidedRequiredArguments");

var _VariablesInAllowedPosition = require("./rules/VariablesInAllowedPosition");

var _OverlappingFieldsCanBeMerged = require("./rules/OverlappingFieldsCanBeMerged");

var _UniqueInputFieldNames = require("./rules/UniqueInputFieldNames");

var _LoneSchemaDefinition = require("./rules/LoneSchemaDefinition");

var _UniqueOperationTypes = require("./rules/UniqueOperationTypes");

var _UniqueTypeNames = require("./rules/UniqueTypeNames");

var _UniqueEnumValueNames = require("./rules/UniqueEnumValueNames");

var _UniqueFieldDefinitionNames = require("./rules/UniqueFieldDefinitionNames");

var _UniqueDirectiveNames = require("./rules/UniqueDirectiveNames");

var _PossibleTypeExtensions = require("./rules/PossibleTypeExtensions");

// Spec Section: "Executable Definitions"
// Spec Section: "Operation Name Uniqueness"
// Spec Section: "Lone Anonymous Operation"
// Spec Section: "Subscriptions with Single Root Field"
// Spec Section: "Fragment Spread Type Existence"
// Spec Section: "Fragments on Composite Types"
// Spec Section: "Variables are Input Types"
// Spec Section: "Leaf Field Selections"
// Spec Section: "Field Selections on Objects, Interfaces, and Unions Types"
// Spec Section: "Fragment Name Uniqueness"
// Spec Section: "Fragment spread target defined"
// Spec Section: "Fragments must be used"
// Spec Section: "Fragment spread is possible"
// Spec Section: "Fragments must not form cycles"
// Spec Section: "Variable Uniqueness"
// Spec Section: "All Variable Used Defined"
// Spec Section: "All Variables Used"
// Spec Section: "Directives Are Defined"
// Spec Section: "Directives Are Unique Per Location"
// Spec Section: "Argument Names"
// Spec Section: "Argument Uniqueness"
// Spec Section: "Value Type Correctness"
// Spec Section: "Argument Optionality"
// Spec Section: "All Variable Usages Are Allowed"
// Spec Section: "Field Selection Merging"
// Spec Section: "Input Object Field Uniqueness"

/**
 * This set includes all validation rules defined by the GraphQL spec.
 *
 * The order of the rules in this list has been adjusted to lead to the
 * most clear output when encountering multiple validation errors.
 */
var specifiedRules = Object.freeze([_ExecutableDefinitions.ExecutableDefinitions, _UniqueOperationNames.UniqueOperationNames, _LoneAnonymousOperation.LoneAnonymousOperation, _SingleFieldSubscriptions.SingleFieldSubscriptions, _KnownTypeNames.KnownTypeNames, _FragmentsOnCompositeTypes.FragmentsOnCompositeTypes, _VariablesAreInputTypes.VariablesAreInputTypes, _ScalarLeafs.ScalarLeafs, _FieldsOnCorrectType.FieldsOnCorrectType, _UniqueFragmentNames.UniqueFragmentNames, _KnownFragmentNames.KnownFragmentNames, _NoUnusedFragments.NoUnusedFragments, _PossibleFragmentSpreads.PossibleFragmentSpreads, _NoFragmentCycles.NoFragmentCycles, _UniqueVariableNames.UniqueVariableNames, _NoUndefinedVariables.NoUndefinedVariables, _NoUnusedVariables.NoUnusedVariables, _KnownDirectives.KnownDirectives, _UniqueDirectivesPerLocation.UniqueDirectivesPerLocation, _KnownArgumentNames.KnownArgumentNames, _UniqueArgumentNames.UniqueArgumentNames, _ValuesOfCorrectType.ValuesOfCorrectType, _ProvidedRequiredArguments.ProvidedRequiredArguments, _VariablesInAllowedPosition.VariablesInAllowedPosition, _OverlappingFieldsCanBeMerged.OverlappingFieldsCanBeMerged, _UniqueInputFieldNames.UniqueInputFieldNames]);
exports.specifiedRules = specifiedRules;
// @internal
var specifiedSDLRules = Object.freeze([_LoneSchemaDefinition.LoneSchemaDefinition, _UniqueOperationTypes.UniqueOperationTypes, _UniqueTypeNames.UniqueTypeNames, _UniqueEnumValueNames.UniqueEnumValueNames, _UniqueFieldDefinitionNames.UniqueFieldDefinitionNames, _UniqueDirectiveNames.UniqueDirectiveNames, _KnownTypeNames.KnownTypeNames, _KnownDirectives.KnownDirectives, _UniqueDirectivesPerLocation.UniqueDirectivesPerLocation, _PossibleTypeExtensions.PossibleTypeExtensions, _KnownArgumentNames.KnownArgumentNamesOnDirectives, _UniqueArgumentNames.UniqueArgumentNames, _UniqueInputFieldNames.UniqueInputFieldNames, _ProvidedRequiredArguments.ProvidedRequiredArgumentsOnDirectives]);
exports.specifiedSDLRules = specifiedSDLRules;
