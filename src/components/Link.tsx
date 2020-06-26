import { createLinkComponent } from '@tager/web-components';
import React from 'react';
import { Link as I18nLink } from '@server/i18n';

const Link = createLinkComponent({ nextLinkComponent: I18nLink });

export default Link;
