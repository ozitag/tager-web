import { NextComponentType, NextPageContext } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';

import { AppState, AppStore } from '@/store/store';

/**
 * Method `getInitialProps` is used for initial page load data population.
 * Data returned from `getInitialProps` is serialized when server rendered.
 * Make sure to return plain `Object` without using `Date`, `Map`, `Set`.
 * @param ctx Context of `page`

 * [..._AdditionalInitialProps] - additional props, that were returned by method `getInitialProps`
 * [..._InitialProps] = AppInitialProps + [..._AdditionalInitialProps] - returned result of call `getInitialProps` in HOC or Custom App.
 * [..._AdditionalProps] - new props, that were added by HOC to wrapped child component
 * [..._Props] - AppProps + [..._AdditionalProps] of parent HOCs
 * [..._AppContext] - argument of method `getInitialProps`. This context is passed by parent of current component
 * [..._PageContext] - field `ctx` in [..._AppContext]. It's a context of method `getInitialProps` in page components
 *
 * type Some_Component = NextComponentType<
 *   Parent_AppContext,
 *   Some_InitialProps,
 *   Some_Props
 * >;
 */

/** CustomApp */
export type CustomApp_AdditionalInitialProps = {};
export type CustomApp_InitialProps = AppInitialProps &
  CustomApp_AdditionalInitialProps;
export type CustomApp_AdditionalProps = {};
export type CustomApp_Props = AppProps & WithRedux_AdditionalProps;

export interface CustomApp_AppContext extends WithRedux_AppContext {}
export interface CustomApp_PageContext extends WithRedux_PageContext {}

export type CustomApp_Component = NextComponentType<
  WithRedux_AppContext,
  CustomApp_InitialProps,
  CustomApp_Props
>;

/** withRedux HOC */
export type WithRedux_AdditionalInitialProps = {
  initialState: AppState;
};
export type WithRedux_InitialProps = CustomApp_InitialProps &
  WithRedux_AdditionalInitialProps;
export type WithRedux_AdditionalProps = {};
export type WithRedux_Props = AppProps & WithRedux_AdditionalInitialProps;

export interface WithRedux_PageContext extends NextPageContext {
  store: AppStore;
}
export interface WithRedux_AppContext extends AppContext {
  ctx: WithRedux_PageContext;
}

export type WithRedux_Component = NextComponentType<
  AppContext,
  WithRedux_InitialProps,
  WithRedux_Props
>;
