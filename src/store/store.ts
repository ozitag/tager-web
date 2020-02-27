import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import reducer from './reducers';

export type AppState = ReturnType<typeof reducer>;

export function createStore(preloadedState?: AppState) {
  return configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV === 'development',
  });
}

export type AppStore = ReturnType<typeof createStore>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<Result = void> = ThunkAction<
  Result,
  AppState,
  unknown,
  Action<string>
>;
