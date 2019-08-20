import * as React from 'react';

export default function createReactContext<T>(
  defaultValue: T,
  calculateChangedBits?: (prev: T, next: T) => number
): Context<T>;

type RenderFn<T> = (value: T) => React.ReactNode;

export type Context<T> = {
  Provider: React.ComponentClass<ProviderProps<T>>;
  Consumer: React.ComponentClass<ConsumerProps<T>>;
};

export type ProviderProps<T> = {
  value: T;
  children: React.ReactNode;
};

export type ConsumerProps<T> = {
  children: RenderFn<T> | [RenderFn<T>];
  observedBits?: number;
};
