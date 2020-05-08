import { MetaHTMLAttributes } from 'react';

import { dividePathnameAndSearch } from '@utils/searchParams';
import { getAbsoluteUrl, notEmpty } from '@utils/common';

/**
 * References:
 * 1. https://support.google.com/webmasters/answer/139066
 * 2. https://yoast.com/rel-canonical/
 */
export function getCanonicalUrl(currentPath: string, canonicalPath?: string) {
  if (!canonicalPath) {
    const [pathname] = dividePathnameAndSearch(currentPath);
    return getAbsoluteUrl(pathname);
  }

  return getAbsoluteUrl(canonicalPath);
}

export function getMetaList({
  title,
  description,
  image,
  currentPath,
}: {
  title?: string;
  description?: string;
  image?: string;
  currentPath: string;
}): Array<MetaHTMLAttributes<HTMLMetaElement>> {
  const currentPageUrl = getAbsoluteUrl(currentPath);

  return [
    /**
     * HTML Living Standard
     * The definition of '<meta>' in that specification.
     * https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element
     */
    {
      name: 'copyright',
      content: 'OZiTAG LLC',
    },
    {
      name: 'author',
      content: 'OZiTAG, ozitag.com',
    },
    description
      ? {
          name: 'description',
          content: description,
        }
      : null,

    /**
     * Metadata for Open Graph protocol
     * Reference: https://ogp.me/
     */

    currentPageUrl
      ? {
          name: 'og:url',
          content: currentPageUrl,
        }
      : null,

    title
      ? {
          property: 'og:title',
          content: title,
        }
      : null,
    description
      ? {
          property: 'og:description',
          content: description,
        }
      : null,

    image
      ? {
          property: 'og:image',
          content: getAbsoluteUrl(image),
        }
      : null,

    {
      property: 'og:type',
      content: 'website',
    },

    /**
     * Metadata for Twitter cards
     * Reference: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
     */
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: 'OZiTAG, ozitag.com',
    },
    title
      ? {
          name: 'twitter:title',
          content: title,
        }
      : null,
    description
      ? {
          name: 'twitter:description',
          content: description,
        }
      : null,
  ].filter(notEmpty);
}
