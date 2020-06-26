import { NextComponentType } from 'next';
import { AppInitialProps } from 'next/app';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { isBrowser } from '@tager/web-core';

import { AppState, AppStore, createStore } from '@/store/store';
import {
  CustomApp_Component,
  WithRedux_AdditionalInitialProps,
  WithRedux_Component,
  WithRedux_PageContext,
} from '@/typings/hocs';

declare global {
  interface Window {
    __NEXT_REDUX_STORE__?: AppStore;
  }
}

function initStore({
  initialState,
}: { initialState?: AppState } = {}): AppStore {
  if (isBrowser()) {
    let memoizedStore = window.__NEXT_REDUX_STORE__;

    if (!memoizedStore) {
      memoizedStore = createStore(initialState);
      window.__NEXT_REDUX_STORE__ = memoizedStore;
    }

    return memoizedStore;
  }

  return createStore(initialState);
}

function withRedux(CustomApp: CustomApp_Component) {
  const AppWithRedux: WithRedux_Component = (props) => {
    const { initialState, ...rest } = props;
    const storeRef = useRef<AppStore>(initStore({ initialState }));

    return (
      <Provider store={storeRef.current}>
        <CustomApp {...rest} />
      </Provider>
    );
  };

  const componentName = CustomApp.displayName || CustomApp.name || 'App';
  AppWithRedux.displayName = `withRedux(${componentName})`;

  AppWithRedux.getInitialProps = async (appCtx) => {
    const store = initStore();

    const additionalInitialProps: WithRedux_AdditionalInitialProps = {
      initialState: store.getState(),
    };

    let initialProps: AppInitialProps;

    /** If `CustomApp` has `getInitialProps` method */
    if (CustomApp.getInitialProps) {
      initialProps = await CustomApp.getInitialProps({
        ...appCtx,
        ctx: { ...appCtx.ctx, store },
      });
    } else {
      /** Otherwise get `pageProps` directly from page `Component` */

      type PageComponentType = NextComponentType<WithRedux_PageContext>;
      const PageComponent = appCtx.Component as PageComponentType;

      if (PageComponent.getInitialProps) {
        const pageProps = await PageComponent.getInitialProps({
          ...appCtx.ctx,
          store,
        });

        initialProps = {
          pageProps,
        };
      } else {
        initialProps = {
          pageProps: undefined,
        };
      }
    }

    return {
      ...additionalInitialProps,
      ...initialProps,
    };
  };

  return AppWithRedux;
}

export default withRedux;
