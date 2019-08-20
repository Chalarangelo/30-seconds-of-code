import * as React from 'react';
import { AppContainerProps } from './index';

export function hot<T = React.ComponentType<any>>(Component: T, props?: AppContainerProps): T;
