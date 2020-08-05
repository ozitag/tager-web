import React from 'react';
import { RequestError } from '@tager/web-core';

import ErrorPage from '@/pages/_error';

export function convertSlugToPath(
  slug: Array<string> | string | undefined
): string {
  if (!slug) return '/';

  if (Array.isArray(slug)) {
    return slug.map(convertSlugToPath).join('');
  }

  return '/' + slug;
}

export function convertErrorToProps(
  error: Error | RequestError
): React.ComponentProps<typeof ErrorPage> {
  if ('status' in error) {
    return { statusCode: error.status.code, title: error.status.text };
  }

  return { err: error, statusCode: 500 };
}
