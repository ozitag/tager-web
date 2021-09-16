import { useRouter } from 'next/router';

import { PageFullType } from '@tager/web-modules';
import { Nullish } from '@tager/web-core';

import { selectPageByPath } from '@/store/reducers/tager/pages';
import { useTypedSelector } from '@/store/store';
import { convertSlugToPath } from '@/utils/common';

export function useLayoutPage<P extends PageFullType>(): Nullish<P> {
  const router = useRouter();

  const currentPath = convertSlugToPath(router.query.slug);

  return useTypedSelector((state) => selectPageByPath<P>(state, currentPath));
}
