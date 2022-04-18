import { combineReducers } from 'redux';

import settingsReducer from './tager/settings';
import seoReducer from './tager/seo';
import pagesReducer from './tager/pages';
import menusReducer from './tager/menus';

const tagerReducer = combineReducers({
  menus: menusReducer,
  pages: pagesReducer,
  seo: seoReducer,
  settings: settingsReducer,
});

const rootReducer = combineReducers({
  tager: tagerReducer,
});

export default rootReducer;
