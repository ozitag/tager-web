import React from 'react';

import { convertSrcSet, getImageTypeFromUrl } from '@utils/common';
import { breakpoints } from '@constants/theme';
import { Nullable } from '@typings/common';

type MediaQueryType =
  | 'mobileSmall'
  | 'mobileLarge'
  | 'tabletSmall'
  | 'tabletLarge'
  | 'laptop'
  | 'desktop';

const MEDIA_QUERY_MAP: Record<MediaQueryType, string | undefined> = {
  mobileSmall: `(min-width: ${breakpoints.mobileSmall}px)`,
  mobileLarge: '(min-width: 480px)',
  tabletSmall: `(min-width: ${breakpoints.tabletSmall}px)`,
  tabletLarge: `(min-width: ${breakpoints.tabletLarge}px)`,
  laptop: `(min-width: ${breakpoints.laptop}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
};

type SourceProps = Omit<
  React.SourceHTMLAttributes<HTMLSourceElement>,
  'srcSet'
> & {
  srcSet: Array<string>;
};

function Source({ srcSet, type, ...rest }: SourceProps) {
  return (
    <source
      srcSet={convertSrcSet(srcSet)}
      type={type ?? getImageTypeFromUrl(srcSet[0]) ?? undefined}
      {...rest}
    />
  );
}

type ImageType = {
  common?: [string, string];
  webp?: [string, string];
};

function renderSource(
  mediaType: MediaQueryType,
  source: ImageType
): Nullable<React.ReactNode> {
  const { common, webp } = source;

  const mediaQuery = MEDIA_QUERY_MAP[mediaType];

  const elements = [];

  if (common && common.length > 0) {
    elements.push(<Source srcSet={common} media={mediaQuery} />);
  }

  if (webp && webp.length > 0) {
    elements.push(<Source srcSet={webp} media={mediaQuery} />);
  }

  return elements.length > 0 ? elements : null;
}

type MediaImageSources = Partial<Record<MediaQueryType, ImageType>>;

export type PictureProps = {
  sources?: MediaImageSources;
  src?: ImageType;
  alt?: string;
};

function Picture({ src, sources, alt }: PictureProps) {
  const imageSrc = (src?.common && src?.common[0]) || '';
  return (
    <picture>
      {sources
        ? Object.keys(sources ?? []).map((media) => {
            const mediaType = media as MediaQueryType;
            const source = sources[mediaType];

            return source ? renderSource(mediaType, source) : null;
          })
        : null}
      <img src={imageSrc} alt={alt} />
    </picture>
  );
}

export default Picture;
