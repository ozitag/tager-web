import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';
import { NextRouter, useRouter } from 'next/router';

import { colors } from '@constants/theme';

function isLinkActive(to: Props['to'], router: NextRouter): boolean {
  if (typeof to === 'string') {
    return to === router.pathname;
  } else {
    return to.as === router.asPath;
  }
}

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<LinkProps, 'to' | 'href' | 'as'> & {
    /** allow both static and dynamic routes */
    to: string | { href: string; as: string };
    as?: React.ElementType;
    className?: string;
    activeClassName?: string;
    isActive?: boolean;
  };

/**
 * Source: https://blog.logrocket.com/dealing-with-links-in-next-js/
 */
const Link = React.forwardRef(
  (
    {
      to,
      replace,
      scroll,
      shallow,
      passHref = true,
      prefetch,
      className,
      activeClassName,
      ...linkProps
    }: Props,
    ref: any,
  ) => {
    const router = useRouter();

    const isActive = isLinkActive(to, router);
    const linkClassName = [isActive ? activeClassName : null, className]
      .filter(Boolean)
      .join(' ');

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
          <CustomLink {...linkProps} ref={ref} className={linkClassName} />
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
        <CustomLink {...linkProps} ref={ref} className={linkClassName} />
      </NextLink>
    );
  },
);

const CustomLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: black;

  &:hover {
    color: ${colors.orange};
  }
`;

export default Link;
