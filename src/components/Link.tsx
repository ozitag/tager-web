import { createLinkComponent } from '@tager/web-components';
import {
  createDynamicLinkBuilder,
  createLinkConverter,
} from '@tager/web-components';

export const postLinkBuilder = createDynamicLinkBuilder<'alias'>(
  '/blog/[alias]'
);
export const courseLinkBuilder = createDynamicLinkBuilder<'alias'>(
  '/courses/[alias]'
);
export const lessonLinkBuilder = createDynamicLinkBuilder<'alias' | 'id'>(
  '/courses/[alias]/lessons/[id]'
);

export const linkConverter = createLinkConverter({
  linkBuilderList: [postLinkBuilder, courseLinkBuilder, lessonLinkBuilder],
  staticLinkList: [],
});

const Link = createLinkComponent({ converter: linkConverter });

export default Link;
