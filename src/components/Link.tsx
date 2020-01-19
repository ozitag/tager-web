import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<LinkProps, 'to' | 'href' | 'as'> & {
    /** allow both static and dynamic routes */
    to: string | { href: string; as: string };
    as?: React.ElementType;
  };

/**
 * Source: https://blog.logrocket.com/dealing-with-links-in-next-js/
 */
const Link = React.forwardRef(
  (
    { to, replace, scroll, shallow, passHref, prefetch, ...linkProps }: Props,
    ref: any,
  ) => {
    /** when we just have a normal url we just use it */
    if (typeof to === 'string') {
      return (
        <NextLink
          href={to}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          passHref={passHref}
          prefetch={prefetch}
        >
          <CustomLink {...linkProps} ref={ref} />
        </NextLink>
      );
    }

    /** otherwise pass both "href" / "as" */
    return (
      <NextLink
        href={to.href}
        as={to.as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        prefetch={prefetch}
      >
        <CustomLink {...linkProps} ref={ref} />
      </NextLink>
    );
  },
);

const CustomLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

export default Link;
