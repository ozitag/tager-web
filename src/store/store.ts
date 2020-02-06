import {
  Action,
  ThunkAction,
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit';
import reducer from './reducers';

export type AppState = ReturnType<typeof reducer>;
export type RootAction = Action;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  null,
  Action<any>
>;

export type AppStore = EnhancedStore<AppState>;

export function createStore(preloadedState?: AppState) {
  return configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV === 'development',
  });
}
