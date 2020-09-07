import {
  createMediaQuery,
  createPictureComponent,
} from '@tager/web-components';

import { breakpoints } from '@/constants/theme';

type MediaQueryType =
  | 'mobileSmall'
  | 'mobileLarge'
  | 'tabletSmall'
  | 'tabletLarge'
  | 'laptop'
  | 'desktop';

const MEDIA_QUERY_MAP: Record<MediaQueryType, string> = {
  desktop: createMediaQuery({ min: breakpoints.desktop }),
  laptop: createMediaQuery({ min: breakpoints.laptop }),
  tabletLarge: createMediaQuery({ min: breakpoints.tabletLarge }),
  tabletSmall: createMediaQuery({ min: breakpoints.tabletSmall }),
  mobileLarge: createMediaQuery({ min: 480 }),
  mobileSmall: createMediaQuery({ min: breakpoints.mobileSmall }),
};

const Picture = createPictureComponent({ mediaQueryMap: MEDIA_QUERY_MAP });

export default Picture;
