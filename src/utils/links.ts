import { createDynamicLinkBuilder, createLinkConverter } from '@tager/web-core';

export const postLinkBuilder = createDynamicLinkBuilder<'alias'>(
  '/blog/[alias]'
);
export const courseLinkBuilder = createDynamicLinkBuilder<'alias'>(
  '/courses/[alias]'
);
export const lessonLinkBuilder = createDynamicLinkBuilder<'alias' | 'id'>(
  '/courses/[alias]/lessons/[id]'
);

export const convertPathToDynamicLink = createLinkConverter([
  postLinkBuilder,
  courseLinkBuilder,
  lessonLinkBuilder,
]);
