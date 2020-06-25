import { createPictureComponent } from '@tager/web-components';
import React from 'react';

import { breakpoints } from '@/constants/theme';

type MediaQueryType =
  | 'mobileSmall'
  | 'mobileLarge'
  | 'tabletSmall'
  | 'tabletLarge'
  | 'laptop'
  | 'desktop';

const MEDIA_QUERY_MAP: Record<MediaQueryType, string> = {
  mobileSmall: `(min-width: ${breakpoints.mobileSmall}px)`,
  mobileLarge: '(min-width: 480px)',
  tabletSmall: `(min-width: ${breakpoints.tabletSmall}px)`,
  tabletLarge: `(min-width: ${breakpoints.tabletLarge}px)`,
  laptop: `(min-width: ${breakpoints.laptop}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
};

const Picture = createPictureComponent({ mediaQueryMap: MEDIA_QUERY_MAP });

export default Picture;
