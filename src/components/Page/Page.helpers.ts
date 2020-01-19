export function getMetaList({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return [
    /**
     * HTML Living Standard
     * The definition of '<meta>' in that specification.
     * https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element
     */
    {
      name: 'copyright',
      content: 'OziTag LLC 2020',
    },
    {
      name: 'author',
      content: 'OziTag, ozitag.com',
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
      content: 'OziTag, ozitag.com',
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
