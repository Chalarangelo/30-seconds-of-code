import * as React from 'react';

interface ErrorReporterProps {
  error: any;
}

export interface AppContainerProps {
  errorBoundary?: boolean;
  errorReporter?: React.ComponentType<ErrorReporterProps>;
}

export interface AppChildren {
  children?: React.ReactElement<any>;
}

export class AppContainer extends React.Component<AppContainerProps & AppChildren> {}

/**
 * Marks module and a returns a HOC to mark a Component inside it as hot-exported
 * @param {NodeModuleObject} module ALWAYS should be just "module".
 * @return {function} "hot" HOC.
 *
 * @example marks current module as hot, and export MyComponent as HotExportedMyComponent
 * export default hot(module)(MyComponent)
 */
export function hot(module: any): <T = React.ComponentType<any>>(Component: T, props?: AppContainerProps) => T;

/**
 * Marks component as `cold`, and making it invisible for React-Hot-Loader.
 * Any changes to that component will cause local state loss.
 * @param {React.ComponentType} component to chill
 * @return {React.ComponentType} component, as it was passed in.
 *
 * @example marks some component as cold
 * export default cold(MyComponent)
 */
export function cold<T = React.ComponentType<any>>(component: T): T;

/**
 * Tests are types of two components equal
 * @param {Component} typeA
 * @param {Component} typeB
 * @return {boolean} are they equal
 *
 * @example test that some rendered component(ReactElement), has the same type as BaseComponent
 * areComponentEqual(RenderedComponent.type, BaseComponent)
 */
export function areComponentsEqual<T>(typeA: React.ComponentType<T>, typeB: React.ComponentType<T>): boolean;

export interface HotError {
  error: Error;
  errorInfo?: React.ErrorInfo;
}

export interface Config {
  /**
   * Specify loglLevel, default to 'error', set it to false to disable logs.
   * Available levels: ['debug', 'log', 'warn', 'error']
   */
  logLevel: string;

  /**
   *
   * @param {any} type being registered. This could be ANY top level variable among project.
   * @param {string} uniqueLocalName - variable name
   * @param {string} fileName - origin file
   * @return {any}
   */
  onComponentRegister: (type: any, uniqueLocalName: string, fileName: string) => any;

  /**
   *
   * @param type {any} type being rendered. The first argument of React.createElement
   * @param displayName {string} type display name (if exists)
   */
  onComponentCreate: (type: any, displayName: string) => any;

  /**
   *  Allows using SFC without changes. leading to some components not updated
   */
  pureSFC: boolean;

  /**
   * keep render method unpatched, moving sideEffect to componentDidUpdate
   */
  pureRender: boolean;

  /**
   * Allows SFC to be used, enables "intermediate" components used by Relay, should be disabled for Preact
   */
  allowSFC: boolean;

  /**
   * Disable "hot-replacement-render"
   */
  disableHotRenderer: boolean;

  /**
   * Disable "hot-replacement-render" when injection into react-dom are made
   */
  disableHotRendererWhenInjected: boolean;

  /**
   * Show "hot-loader/react-dom" warning
   */
  showReactDomPatchNotification: boolean;

  /**
   * flag to completely disable RHL for SFC
   */
  ignoreSFC: boolean;

  /**
   * flag to completely disable RHL for Components
   */
  ignoreComponents: boolean;

  /**
   * enables or disables hooks treatment
   */
  reloadHooks: boolean;

  /**
   * default value for AppContainer errorOverlay
   */
  errorReporter: React.ComponentType<HotError>;

  /**
   * Global error overlay
   */
  ErrorOverlay: React.ComponentType<{ errors: Array<HotError> }>;
}

/**
 * Confugures how React Hot Loader works
 * @param {Config} config
 */
export function setConfig(config: Partial<Config>): void;
