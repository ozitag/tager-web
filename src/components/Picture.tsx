import React from 'react';

import { breakpoints } from '@/constants/theme';
import Image from '@/components/Image';
import { convertSrcSet, getImageTypeFromUrl } from '@/utils/common';

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
  isLazy: boolean;
};

function Source({ srcSet, isLazy, type, ...rest }: ImageSource) {
  return (
    <source
      srcSet={!isLazy ? convertSrcSet(srcSet) : undefined}
      data-srcset={isLazy ? convertSrcSet(srcSet) : undefined}
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
  isLazy: boolean;
};

function SourceGroup({ media, images, isLazy }: GroupProps) {
  if (!images) return null;

  const { src, src2x, webp, webp2x } = images;

  if (!src && !webp) {
    return null;
  }

  return (
    <>
      {webp && webp2x ? (
        <Source
          isLazy={isLazy}
          srcSet={[webp, webp2x]}
          type="image/webp"
          media={media}
        />
      ) : webp ? (
        <Source
          isLazy={isLazy}
          type="image/webp"
          srcSet={[webp]}
          media={media}
        />
      ) : null}

      {src && src2x ? (
        <Source isLazy={isLazy} srcSet={[src, src2x]} media={media} />
      ) : src ? (
        <Source isLazy={isLazy} srcSet={[src]} media={media} />
      ) : null}
    </>
  );
}

type MediaImages = {
  [key in MediaQueryType]?: ImageType;
};

export type Props = MediaImages & {
  srcSet?: ImageType;
  src?: string;
  src2x?: string;
  srcWebp?: string;
  srcWebp2x?: string;
  alt?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
};

function Picture({
  src,
  src2x,
  srcWebp,
  srcWebp2x,
  alt,
  className,
  loading,
  ...images
}: Props) {
  const isLazy = loading === 'lazy';

  return (
    <picture className={className}>
      {Object.keys(MEDIA_QUERY_MAP).map((key) => {
        const mediaKey = key as MediaQueryType;
        return (
          <SourceGroup
            media={MEDIA_QUERY_MAP[mediaKey]}
            images={images[mediaKey]}
            isLazy={isLazy}
          />
        );
      })}
      {src2x || srcWebp || srcWebp2x ? (
        <SourceGroup
          images={{
            src: src,
            src2x: src2x,
            webp: srcWebp,
            webp2x: srcWebp2x,
          }}
          isLazy={isLazy}
        />
      ) : null}
      <Image
        src={src}
        srcSet={src2x ? `${src2x} 2x` : undefined}
        loading={loading}
        alt={alt}
      />
    </picture>
  );
}

export default Picture;
