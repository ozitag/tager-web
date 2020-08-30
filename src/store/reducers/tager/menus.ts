import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MapEntry, Nullable } from '@tager/web-core';
import { getMenuItemListByAlias, MenuItemType } from '@tager/web-modules';

import { AppState, AppThunk } from '@/store/store';

type State = {
  menuMap: Record<string, Array<MenuItemType>>;
};

const initialState: State = {
  menuMap: {},
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    menuItemListAdded(
      state,
      action: PayloadAction<MapEntry<string, Array<MenuItemType>>>
    ) {
      state.menuMap[action.payload.key] = action.payload.value;
    },
  },
});

const { actions, reducer } = menuSlice;
export const { menuItemListAdded } = actions;

export default reducer;

export function getMenuItemListThunk(
  menuAlias: string,
  options?: {
    shouldInvalidate?: boolean;
  }
): AppThunk<Promise<Nullable<Array<MenuItemType>>>> {
  return async (dispatch, getState) => {
    try {
      const menuItemList = selectMenuItemListByAlias(getState(), menuAlias);

      if (!options?.shouldInvalidate && menuItemList) {
        return menuItemList;
      }

      const response = await getMenuItemListByAlias(menuAlias);

      dispatch(
        menuItemListAdded({
          key: menuAlias,
          value: response.data,
        })
      );

      return response.data;
    } catch (error) {
      return null;
    }
  };
}

export function selectMenuItemListByAlias(
  state: AppState,
  menuAlias: string
): Array<MenuItemType> | undefined {
  return state.tager.menus.menuMap[menuAlias];
}
