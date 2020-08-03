import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapEntry, Nullable } from '@tager/web-core';
import { BannerType, getBannerListByAlias } from '@tager/web-modules';

import { AppState, AppThunk } from '@/store/store';

type State = {
  bannerMap: Record<string, BannerType>;
};

const initialState: State = {
  bannerMap: {},
};

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    bannerAdded(state, action: PayloadAction<MapEntry<string, BannerType>>) {
      state.bannerMap[action.payload.key] = action.payload.value;
    },
  },
});

const { actions, reducer } = bannerSlice;
export const { bannerAdded } = actions;

export default reducer;

export function getBannerThunk(
  bannerAlias: string,
  options?: {
    shouldInvalidate?: boolean;
  }
): AppThunk<Promise<Nullable<BannerType>>> {
  return async (dispatch, getState) => {
    try {
      const banner = selectBannerByAlias(getState(), bannerAlias);

      if (!options?.shouldInvalidate && banner) {
        return banner;
      }

      const response = await getBannerListByAlias(bannerAlias);

      dispatch(
        bannerAdded({
          key: bannerAlias,
          value: response.data[0],
        })
      );

      return response.data[0];
    } catch (error) {
      return null;
    }
  };
}

export function selectBannerByAlias(
  state: AppState,
  bannerAlias: string
): BannerType | undefined {
  return state.tager.banners.bannerMap[bannerAlias];
}
