import { useRouter } from 'next/router';

import { PageFullType } from '@tager/web-modules';

import { selectPageByPath } from '@/store/reducers/tager/pages';
import { useTypedSelector } from '@/store/store';
import { convertSlugToPath } from '@/utils/common';

export function useCurrentPage<P extends PageFullType>(): P {
  const router = useRouter();

  const currentPath = convertSlugToPath(router.query.slug);

  const foundPage = useTypedSelector((state) =>
    selectPageByPath<P>(state, currentPath)
  );

  if (!foundPage) {
    throw new Error(`Page not found: ${currentPath}`);
  }

  return foundPage;
}
