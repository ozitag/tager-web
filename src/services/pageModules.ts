import Home from '@/modules/Home';
import { getMenuItemListThunk } from '@/store/reducers/tager/menus';
import { Nullish } from '@tager/web-core';

import { PageModuleType } from '@/typings/common';
import DefaultTemplate from '@/modules/DefaultTemplate';

const DEFAULT_PAGE_MODULE: PageModuleType = {
  component: DefaultTemplate,
  template: '',
};

const PAGE_MODULE_LIST: Array<PageModuleType> = [
  {
    template: 'home',
    component: Home,
    getInitialProps({ store }) {
      return store.dispatch(getMenuItemListThunk('footer'));
    },
  },
];

export function getPageModuleByTemplate(
  template: Nullish<string>
): PageModuleType {
  return (
    PAGE_MODULE_LIST.find((pageModule) => pageModule.template === template) ??
    DEFAULT_PAGE_MODULE
  );
}
