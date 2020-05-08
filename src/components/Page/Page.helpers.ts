import { useRouter } from 'next/router';

export function getMetaList({
                              title,
                              description,
                              image,
                            }: {
  title?: string;
  description?: string;
  image?: string;
}) {
  const router = useRouter();

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

    process.env.REACT_APP_HOSTNAME ? {
      name: 'og:url',
      content: process.env.REACT_APP_HOSTNAME + router.asPath,
    } : null,

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
        content: image,
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
  ].filter(Boolean);
}
