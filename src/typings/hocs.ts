import { NextPageContext } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';

import { AppState, AppStore } from '@store/store';

/**
 *  Page context is "ctx" field of App Context
 *
 *  Also Page context is argument of "getInitialProps" function
 *    of Page component (from "pages" folder)
 */
export interface ReduxPageContext extends NextPageContext {}

export interface CustomAppPageContext extends ReduxPageContext {
  store: AppStore;
  isServer: boolean;
}

/** App context - argument of "getInitialProps" function of Custom App components */
export interface ReduxAppContext extends AppContext {
  ctx: ReduxPageContext;
}

export interface CustomAppContext extends ReduxAppContext {
  ctx: CustomAppPageContext;
}

/** App initial props - result of "getInitialProps" function */
export type ReduxAdditionalInitialProps = {
  initialState: AppState;
  isServer: boolean;
};

export type CustomAppInitialProps = AppInitialProps;

export type ReduxAppInitialProps = CustomAppInitialProps &
  ReduxAdditionalInitialProps;

/** Props of wrapper app components */
export type ReduxAppProps = AppProps & ReduxAppInitialProps;

/** Page props that will be added to PageComponent */
export type CustomAppProps = Omit<ReduxAppProps, 'initialState'> & {
  store: AppStore;
};
