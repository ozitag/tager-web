import {
  Action,
  ThunkAction,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, Store } from 'redux';
import { ConfigureStoreOptions } from '@reduxjs/toolkit/src/configureStore';

import reducer from './reducers';

export type AppState = ReturnType<typeof reducer>;

export type AppThunk<Result = void> = ThunkAction<
  Result,
  AppState,
  unknown,
  Action<string>
>;

export type StoreDispatch = ThunkDispatch<AppState, unknown, AnyAction>;

export interface AppStore extends Store<AppState> {
  dispatch: StoreDispatch;
}

export function createStore(preloadedState?: AppState): AppStore {
  return configureStore({
    reducer,
    preloadedState: preloadedState as ConfigureStoreOptions['preloadedState'],
    devTools: process.env.NODE_ENV === 'development',
  });
}

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useTypedDispatch: () => StoreDispatch = useDispatch;
