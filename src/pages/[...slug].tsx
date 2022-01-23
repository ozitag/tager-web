import React from 'react';

import { Page } from '@tager/web-components';
import { convertSeoParamsToPageProps } from '@tager/web-modules';

import ErrorPage from '@/pages/_error';
import NotFoundPage from '@/pages/404';
import { CustomApp_PageContext } from '@/typings/hocs';
import Layout from '@/components/Layout';
import {
  getPageByPathThunk,
  getPageListThunk,
} from '@/store/reducers/tager/pages';
import { useLayoutPage } from '@/hooks';
import { getPageModuleByTemplate } from '@/services/pageModules';
import { convertErrorToProps, convertSlugToPath } from '@/utils/common';

type Props =
  | {
      pageType: 'DYNAMIC_PAGE';
      template: string;
    }
  | {
      pageType: 'NOT_FOUND';
    }
  | {
      pageType: 'ERROR';
      error: Error;
    };

function DynamicPage(props: Props) {
  const page = useLayoutPage();

  if (props.pageType === 'NOT_FOUND') {
    return <NotFoundPage />;
  }

  if (props.pageType === 'ERROR') {
    return <ErrorPage {...convertErrorToProps(props.error)} />;
  }

  const foundPageModule = getPageModuleByTemplate(props.template);
  const pageElement = React.createElement(foundPageModule.component);

  const seoPageProps = convertSeoParamsToPageProps(page?.seoParams);

  if (seoPageProps.openGraphImage == null && page?.image) {
    seoPageProps.openGraphImage = page.image.url;
  }

  return (
    <Page {...seoPageProps}>
      <Layout>{pageElement}</Layout>
    </Page>
  );
}

DynamicPage.getInitialProps = async (
  context: CustomApp_PageContext
): Promise<Props> => {
  const { store, query } = context;
  const currentPath = convertSlugToPath(query.slug);

  try {
    const pageList = await store.dispatch(getPageListThunk());
    const foundPage = pageList.find((page) => page.path === currentPath);
    const foundPageModule = getPageModuleByTemplate(foundPage?.template);

    if (!foundPage) {
      if (context.res) {
        context.res.statusCode = 404;
      }
      return { pageType: 'NOT_FOUND' };
    }

    await Promise.all([
      store.dispatch(getPageByPathThunk(foundPage.path)),
      foundPageModule.getInitialProps
        ? foundPageModule.getInitialProps(context)
        : Promise.resolve(),
    ]);

    return {
      pageType: 'DYNAMIC_PAGE',
      template: foundPageModule.template,
    };
  } catch (error) {
    return {
      pageType: 'ERROR',
      error: error as Error,
    };
  }
};

export default DynamicPage;
