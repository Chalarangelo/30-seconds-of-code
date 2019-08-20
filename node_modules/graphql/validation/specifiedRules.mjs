// Spec Section: "Executable Definitions"
import { ExecutableDefinitions } from './rules/ExecutableDefinitions'; // Spec Section: "Operation Name Uniqueness"

import { UniqueOperationNames } from './rules/UniqueOperationNames'; // Spec Section: "Lone Anonymous Operation"

import { LoneAnonymousOperation } from './rules/LoneAnonymousOperation'; // Spec Section: "Subscriptions with Single Root Field"

import { SingleFieldSubscriptions } from './rules/SingleFieldSubscriptions'; // Spec Section: "Fragment Spread Type Existence"

import { KnownTypeNames } from './rules/KnownTypeNames'; // Spec Section: "Fragments on Composite Types"

import { FragmentsOnCompositeTypes } from './rules/FragmentsOnCompositeTypes'; // Spec Section: "Variables are Input Types"

import { VariablesAreInputTypes } from './rules/VariablesAreInputTypes'; // Spec Section: "Leaf Field Selections"

import { ScalarLeafs } from './rules/ScalarLeafs'; // Spec Section: "Field Selections on Objects, Interfaces, and Unions Types"

import { FieldsOnCorrectType } from './rules/FieldsOnCorrectType'; // Spec Section: "Fragment Name Uniqueness"

import { UniqueFragmentNames } from './rules/UniqueFragmentNames'; // Spec Section: "Fragment spread target defined"

import { KnownFragmentNames } from './rules/KnownFragmentNames'; // Spec Section: "Fragments must be used"

import { NoUnusedFragments } from './rules/NoUnusedFragments'; // Spec Section: "Fragment spread is possible"

import { PossibleFragmentSpreads } from './rules/PossibleFragmentSpreads'; // Spec Section: "Fragments must not form cycles"

import { NoFragmentCycles } from './rules/NoFragmentCycles'; // Spec Section: "Variable Uniqueness"

import { UniqueVariableNames } from './rules/UniqueVariableNames'; // Spec Section: "All Variable Used Defined"

import { NoUndefinedVariables } from './rules/NoUndefinedVariables'; // Spec Section: "All Variables Used"

import { NoUnusedVariables } from './rules/NoUnusedVariables'; // Spec Section: "Directives Are Defined"

import { KnownDirectives } from './rules/KnownDirectives'; // Spec Section: "Directives Are Unique Per Location"

import { UniqueDirectivesPerLocation } from './rules/UniqueDirectivesPerLocation'; // Spec Section: "Argument Names"

import { KnownArgumentNames, KnownArgumentNamesOnDirectives } from // @internal
'./rules/KnownArgumentNames'; // Spec Section: "Argument Uniqueness"

import { UniqueArgumentNames } from './rules/UniqueArgumentNames'; // Spec Section: "Value Type Correctness"

import { ValuesOfCorrectType } from './rules/ValuesOfCorrectType'; // Spec Section: "Argument Optionality"

import { ProvidedRequiredArguments, ProvidedRequiredArgumentsOnDirectives } from // @internal
'./rules/ProvidedRequiredArguments'; // Spec Section: "All Variable Usages Are Allowed"

import { VariablesInAllowedPosition } from './rules/VariablesInAllowedPosition'; // Spec Section: "Field Selection Merging"

import { OverlappingFieldsCanBeMerged } from './rules/OverlappingFieldsCanBeMerged'; // Spec Section: "Input Object Field Uniqueness"

import { UniqueInputFieldNames } from './rules/UniqueInputFieldNames';
/**
 * This set includes all validation rules defined by the GraphQL spec.
 *
 * The order of the rules in this list has been adjusted to lead to the
 * most clear output when encountering multiple validation errors.
 */

export var specifiedRules = Object.freeze([ExecutableDefinitions, UniqueOperationNames, LoneAnonymousOperation, SingleFieldSubscriptions, KnownTypeNames, FragmentsOnCompositeTypes, VariablesAreInputTypes, ScalarLeafs, FieldsOnCorrectType, UniqueFragmentNames, KnownFragmentNames, NoUnusedFragments, PossibleFragmentSpreads, NoFragmentCycles, UniqueVariableNames, NoUndefinedVariables, NoUnusedVariables, KnownDirectives, UniqueDirectivesPerLocation, KnownArgumentNames, UniqueArgumentNames, ValuesOfCorrectType, ProvidedRequiredArguments, VariablesInAllowedPosition, OverlappingFieldsCanBeMerged, UniqueInputFieldNames]);
import { LoneSchemaDefinition } from './rules/LoneSchemaDefinition';
import { UniqueOperationTypes } from './rules/UniqueOperationTypes';
import { UniqueTypeNames } from './rules/UniqueTypeNames';
import { UniqueEnumValueNames } from './rules/UniqueEnumValueNames';
import { UniqueFieldDefinitionNames } from './rules/UniqueFieldDefinitionNames';
import { UniqueDirectiveNames } from './rules/UniqueDirectiveNames';
import { PossibleTypeExtensions } from './rules/PossibleTypeExtensions'; // @internal

export var specifiedSDLRules = Object.freeze([LoneSchemaDefinition, UniqueOperationTypes, UniqueTypeNames, UniqueEnumValueNames, UniqueFieldDefinitionNames, UniqueDirectiveNames, KnownTypeNames, KnownDirectives, UniqueDirectivesPerLocation, PossibleTypeExtensions, KnownArgumentNamesOnDirectives, UniqueArgumentNames, UniqueInputFieldNames, ProvidedRequiredArgumentsOnDirectives]);
