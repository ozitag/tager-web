import { NextRouter, useRouter } from 'next/router';

function getAbsoluteUrl(url: any, returnNullIfInvalid: boolean) {
  if (url.substr(0, 1) === '/') {
    return process.env.REACT_APP_HOSTNAME ? process.env.REACT_APP_HOSTNAME + url : (returnNullIfInvalid ? null : url);
  } else {
    return url;
  }
}

export function getCanonicalUrl(router: NextRouter, canonicalUrlProp?: string) {
  if (!canonicalUrlProp) {
    return getAbsoluteUrl(router.pathname, true);
  }

  if (canonicalUrlProp.substr(0, 1) === '/') {
    return process.env.REACT_APP_HOSTNAME ? process.env.REACT_APP_HOSTNAME + canonicalUrlProp : null;
  }

  return canonicalUrlProp;
}

export function getMetaList(router: NextRouter, {
  title,
  description,
  image
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  const url = getAbsoluteUrl(router.asPath, true);

  return [
    /**
     * HTML Living Standard
     * The definition of '<meta>' in that specification.
     * https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element
     */
    {
      name: 'copyright',
      content: 'OZiTAG LLC'
    },
    {
      name: 'author',
      content: 'OZiTAG, ozitag.com'
    },
    description
      ? {
        name: 'description',
        content: description
      }
      : null,

    /**
     * Metadata for Open Graph protocol
     * Reference: https://ogp.me/
     */

    url ? {
      name: 'og:url',
      content: url
    } : null,

    title
      ? {
        property: 'og:title',
        content: title
      }
      : null,
    description
      ? {
        property: 'og:description',
        content: description
      }
      : null,

    image ? {
      property: 'og:image',
      content: getAbsoluteUrl(image, false)
    } : null,

    {
      property: 'og:type',
      content: 'website'
    },

    /**
     * Metadata for Twitter cards
     * Reference: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
     */
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: 'OZiTAG, ozitag.com'
    },
    title
      ? {
        name: 'twitter:title',
        content: title
      }
      : null,
    description
      ? {
        name: 'twitter:description',
        content: description
      }
      : null
  ].filter(Boolean);
}
