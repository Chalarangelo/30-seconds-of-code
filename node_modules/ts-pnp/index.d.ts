import * as ts from 'typescript';

export declare function resolveModuleName(
  moduleName: string,
  containingFile: string,
  options: ts.CompilerOptions,
  moduleResolutionHost: ts.ModuleResolutionHost,

  realResolveModuleName: (
    moduleName: string,
    containingFile: string,
    options: ts.CompilerOptions,
    moduleResolutionHost: ts.ModuleResolutionHost,
  ) => ts.ResolvedModuleNameWithFallbackLocations,
): ts.ResolvedModuleNameWithFallbackLocations;
