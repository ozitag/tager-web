import {
  createMediaQuery,
  createPictureComponent,
  PictureMediaQueryItemType,
} from '@tager/web-components';

import { breakpoints } from '@/constants/theme';

type MediaQueryType =
  | 'mobileSmall'
  | 'mobileLarge'
  | 'tabletSmall'
  | 'tabletLarge'
  | 'laptop'
  | 'desktop';

const MEDIA_QUERY_LIST: Array<PictureMediaQueryItemType<MediaQueryType>> = [
  { name: 'desktop', value: createMediaQuery({ min: breakpoints.desktop }) },
  { name: 'laptop', value: createMediaQuery({ min: breakpoints.laptop }) },
  {
    name: 'tabletLarge',
    value: createMediaQuery({ min: breakpoints.tabletLarge }),
  },
  {
    name: 'tabletSmall',
    value: createMediaQuery({ min: breakpoints.tabletSmall }),
  },
  { name: 'mobileLarge', value: createMediaQuery({ min: 480 }) },
  {
    name: 'mobileSmall',
    value: createMediaQuery({ min: breakpoints.mobileSmall }),
  },
];

const Picture = createPictureComponent({
  mediaQueryList: MEDIA_QUERY_LIST,
});

export default Picture;
