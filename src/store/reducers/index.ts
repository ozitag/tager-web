import { combineReducers } from 'redux';

import settingsReducer from './tager/settings';
import seoReducer from './tager/seo';
import bannersReducer from './tager/banners';
import pagesReducer from './tager/pages';
import menusReducer from './tager/menus';

const tagerReducer = combineReducers({
  banners: bannersReducer,
  menus: menusReducer,
  pages: pagesReducer,
  seo: seoReducer,
  settings: settingsReducer,
});

const rootReducer = combineReducers({
  tager: tagerReducer,
});

export default rootReducer;
