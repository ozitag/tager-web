import React, { useRef } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

function Image({ className, src, srcSet, loading = 'eager', ...rest }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  const isImageLazy = loading === 'lazy';

  const imgClassName = [className, isImageLazy ? 'lazyload' : null]
    .filter(Boolean)
    .join(' ');
  return (
    <img
      className={imgClassName}
      ref={imageRef}
      src={isImageLazy ? undefined : src}
      srcSet={isImageLazy ? undefined : srcSet}
      data-src={src}
      data-srcset={srcSet}
      alt=""
      {...rest}
    />
  );
}

export default Image;
