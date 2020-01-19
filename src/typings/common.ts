import React from 'react';

export type Option<V = string> = {
  value: V;
  label: string;
};

export type Nullable<T> = T | null;

export type ConstantMap<C extends string> = Readonly<Record<C, C>>;
