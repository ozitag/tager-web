import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  createResourceLoader,
  ResourceType,
  shouldGetResourceDataFromCache,
} from '@tager/web-core';
import { getSettingItemList } from '@tager/web-modules';

import { AppState, AppThunk } from '@/store/store';
import { SettingsItemType } from '@/typings/model';

const settingsLoader = createResourceLoader<Array<SettingsItemType>>([]);

type State = {
  settingItemList: ResourceType<Array<SettingsItemType>>;
};

const initialState: State = {
  settingItemList: settingsLoader.getInitialResource(),
};

const globalSettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsRequestPending(state) {
      state.settingItemList = settingsLoader.pending();
    },
    settingsRequestFulfilled(
      state,
      action: PayloadAction<Array<SettingsItemType>>
    ) {
      state.settingItemList = settingsLoader.fulfill(action.payload);
    },
    settingsRequestRejected(state) {
      state.settingItemList = settingsLoader.reject();
    },
  },
});

const { actions, reducer } = globalSettingsSlice;
const {
  settingsRequestPending,
  settingsRequestFulfilled,
  settingsRequestRejected,
} = actions;

export function getSettingItemListThunk(options?: {
  shouldInvalidate?: boolean;
}): AppThunk<Promise<Array<SettingsItemType>>> {
  return async (dispatch, getState) => {
    const settingItemListResource = selectSettingsListResource(getState());

    const shouldGetDataFromCache = shouldGetResourceDataFromCache(
      settingItemListResource,
      options?.shouldInvalidate
    );

    if (shouldGetDataFromCache) {
      return settingItemListResource.data;
    }

    dispatch(settingsRequestPending());

    try {
      const response = await getSettingItemList<SettingsItemType>();
      dispatch(settingsRequestFulfilled(response.data));
      return response.data;
    } catch (error) {
      dispatch(settingsRequestRejected());
      return [];
    }
  };
}

export function selectSettingsListResource(
  state: AppState
): ResourceType<Array<SettingsItemType>> {
  return state.tager.settings.settingItemList;
}

export function selectSettingItemList(
  state: AppState
): Array<SettingsItemType> {
  return selectSettingsListResource(state).data;
}

export default reducer;
