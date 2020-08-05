import { createLinkComponent } from '@tager/web-components';
import {
  createDynamicLinkBuilder,
  createLinkConverter,
} from '@tager/web-components';

/** i18n:enabled */
import { Link as I18nLink } from '@/i18n';

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
const Link = createLinkComponent({
  nextLinkComponent: I18nLink,
  converter: linkConverter,
});
/** i18n:enabled:end */

/** i18n:disabled */
// const Link = createLinkComponent({ converter: linkConverter });
/** i18n:disabled:end */

export default Link;
