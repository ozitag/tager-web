import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MapEntry, Nullable } from '@tager/web-core';
import { getSeoParamsByAlias, SeoParamsType } from '@tager/web-modules';

import { AppState, AppThunk } from '@/store/store';

type SeoState = {
  seoParamsMap: Record<string, SeoParamsType>;
};

const initialState: SeoState = {
  seoParamsMap: {},
};

const seoSlice = createSlice({
  name: 'seoParams',
  initialState: initialState,
  reducers: {
    seoParamsAdded(
      state,
      action: PayloadAction<MapEntry<string, SeoParamsType>>
    ) {
      state.seoParamsMap[action.payload.key] = action.payload.value;
    },
  },
});

const { actions, reducer } = seoSlice;
export const { seoParamsAdded } = actions;

export function getSeoParamsByAliasThunk(
  alias: string,
  options?: { shouldInvalidate?: boolean }
): AppThunk<Promise<Nullable<SeoParamsType>>> {
  return async (dispatch, getState) => {
    const seoParams = selectSeoParamsByPageAlias(getState(), alias);

    if (!options?.shouldInvalidate && seoParams) {
      return seoParams;
    }

    try {
      const response = await getSeoParamsByAlias(alias);

      dispatch(seoParamsAdded({ key: alias, value: response.data }));

      return response.data;
    } catch (error) {
      return null;
    }
  };
}

export function selectSeoParamsByPageAlias(
  state: AppState,
  alias: string
): SeoParamsType | undefined {
  return state.tager.seo.seoParamsMap[alias];
}

export default reducer;
