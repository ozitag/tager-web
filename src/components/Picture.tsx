import React from 'react';

import { convertSrcSet, getImageTypeFromUrl } from '@/utils/common';
import { breakpoints } from '@/constants/theme';

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

type ImageSource = Omit<
  React.SourceHTMLAttributes<HTMLSourceElement>,
  'srcSet'
> & {
  srcSet: Array<string>;
};

function Source({ srcSet, type, ...rest }: ImageSource) {
  return (
    <source
      srcSet={convertSrcSet(srcSet)}
      type={type ?? getImageTypeFromUrl(srcSet[0]) ?? undefined}
      {...rest}
    />
  );
}

type ImageType = {
  imageWebp?: Array<string> | string;
  image?: Array<string> | string;
  src?: string;
  src2x?: string;
  webp?: string;
  webp2x?: string;
};

type GroupProps = {
  media?: string;
  images?: ImageType;
};

function SourceGroup({ media, images }: GroupProps) {
  if (!images) return null;

  const { src, src2x, webp, webp2x } = images;

  if (!src && !webp) {
    return null;
  }

  return (
    <>
      {webp && webp2x ? (
        <Source srcSet={[webp, webp2x]} media={media} type="image/webp" />
      ) : webp ? (
        <Source srcSet={[webp]} media={media} type="image/webp" />
      ) : null}

      {src && src2x ? (
        <Source srcSet={[src, src2x]} media={media} />
      ) : src ? (
        <Source srcSet={[src]} media={media} />
      ) : null}
    </>
  );
}

export type Props = {
  mobileSmall?: ImageType;
  mobileLarge?: ImageType;
  tabletSmall?: ImageType;
  tabletLarge?: ImageType;
  laptop?: ImageType;
  desktop?: ImageType;
  srcSet?: ImageType;
  src?: string;
  src2x?: string;
  srcWebp?: string;
  srcWebp2x?: string;
  alt?: string;
};

function Picture({
  mobileSmall,
  mobileLarge,
  tabletSmall,
  tabletLarge,
  laptop,
  desktop,
  src,
  src2x,
  srcWebp,
  srcWebp2x,
  alt,
}: Props) {
  return (
    <picture>
      {desktop ? (
        <SourceGroup media={MEDIA_QUERY_MAP.desktop} images={desktop} />
      ) : null}
      {laptop ? (
        <SourceGroup media={MEDIA_QUERY_MAP.laptop} images={laptop} />
      ) : null}
      {tabletLarge ? (
        <SourceGroup media={MEDIA_QUERY_MAP.tabletLarge} images={tabletLarge} />
      ) : null}
      {tabletSmall ? (
        <SourceGroup media={MEDIA_QUERY_MAP.tabletSmall} images={tabletSmall} />
      ) : null}
      {mobileLarge ? (
        <SourceGroup media={MEDIA_QUERY_MAP.mobileLarge} images={mobileLarge} />
      ) : null}
      {mobileSmall ? (
        <SourceGroup media={MEDIA_QUERY_MAP.mobileSmall} images={mobileSmall} />
      ) : null}
      {src2x || srcWebp || srcWebp2x ? (
        <SourceGroup
          images={{
            src: src,
            src2x: src2x,
            webp: srcWebp,
            webp2x: srcWebp2x,
          }}
        />
      ) : null}
      <img src={src} alt={alt} />
    </picture>
  );
}

export default Picture;
