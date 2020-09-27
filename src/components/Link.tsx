import { createLinkComponent } from '@tager/web-components';
import { createDynamicLinkBuilder } from '@tager/web-components';

export const exampleLinkBuilder = createDynamicLinkBuilder<'alias'>(
  '/example/[alias]'
);

export const examplePostLinkBuilder = createDynamicLinkBuilder<'postAlias'>(
  '/posts/[postAlias]'
);

const Link = createLinkComponent();

export default Link;
