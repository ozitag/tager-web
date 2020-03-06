import React from 'react';
import { css } from 'styled-components';

export type Option<V = string> = {
  value: V;
  label: string;
};

export type Nullable<T> = T | null;

export type ConstantMap<C extends string> = Readonly<Record<C, C>>;

export type FetchStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';

export type LoadableData<T, E = string> = {
  data: T;
  status: FetchStatus;
  error: Nullable<E>;
};

export type SvgComponentProps<P = {}> = React.SVGProps<SVGSVGElement> & P;

export type SvgComponent<P = {}> = React.FunctionComponent<
  SvgComponentProps<P>
>;

export type CssSnippet = ReturnType<typeof css>;
