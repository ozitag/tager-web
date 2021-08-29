import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  createResourceLoader,
  MapEntry,
  ResourceType,
  shouldGetResourceDataFromCache,
} from '@tager/web-core';
import {
  getPageByPath,
  getPageList,
  PageFullType,
  PageShortType,
} from '@tager/web-modules';

import { AppState, AppThunk } from '@/store/store';

const pageListLoader = createResourceLoader<Array<PageShortType>>([]);

type State = {
  pageFullMap: Record<string, PageFullType>;
  pageShortList: ResourceType<Array<PageShortType>>;
};

const initialState: State = {
  pageShortList: pageListLoader.getInitialResource(),
  pageFullMap: {},
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    pageListRequestPending(state) {
      state.pageShortList = pageListLoader.pending();
    },
    pageListRequestFulfilled(
      state,
      action: PayloadAction<Array<PageShortType>>
    ) {
      state.pageShortList = pageListLoader.fulfill(action.payload);
    },
    pageListRequestRejected(state) {
      state.pageShortList = pageListLoader.reject();
    },

    pageAdded(state, action: PayloadAction<MapEntry<string, PageFullType>>) {
      state.pageFullMap[action.payload.key] = action.payload.value;
    },
  },
});

const { actions, reducer } = pagesSlice;
export const {
  pageListRequestPending,
  pageListRequestFulfilled,
  pageListRequestRejected,
  pageAdded,
} = actions;

export default reducer;

export function getPageListThunk(options?: {
  shouldInvalidate?: boolean;
}): AppThunk<Promise<Array<PageShortType>>> {
  return async (dispatch, getState) => {
    const pageListResource = selectPageListResource(getState());

    const shouldGetDataFromCache = shouldGetResourceDataFromCache(
      pageListResource,
      options?.shouldInvalidate
    );

    if (shouldGetDataFromCache) {
      return pageListResource.data;
    }

    dispatch(pageListRequestPending());

    try {
      const response = await getPageList();
      dispatch(pageListRequestFulfilled(response.data));
      return response.data;
    } catch (error) {
      dispatch(pageListRequestRejected());
      return [];
    }
  };
}

export function getPageByPathThunk<
  PageType extends PageFullType = PageFullType
>(
  pagePath: string,
  options?: {
    shouldInvalidate?: boolean;
  }
): AppThunk<Promise<PageType>> {
  return async (dispatch, getState) => {
    try {
      const page = selectPageByPath(getState(), pagePath);

      if (!options?.shouldInvalidate && page) {
        return page as PageType;
      }

      const response = await getPageByPath(pagePath);

      dispatch(
        pageAdded({
          key: pagePath,
          value: response.data,
        })
      );

      return response.data as PageType;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export function selectPageListResource(
  state: AppState
): ResourceType<Array<PageShortType>> {
  return state.tager.pages.pageShortList;
}

export function selectPageList(state: AppState): Array<PageShortType> {
  return selectPageListResource(state).data;
}

export function selectPageByPath<PageType extends PageFullType = PageFullType>(
  state: AppState,
  pageAlias: string
): PageType | undefined {
  return state.tager.pages.pageFullMap[pageAlias] as PageType | undefined;
}
