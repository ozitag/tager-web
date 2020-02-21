import React, { useMemo } from 'react';
import styled from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import NextLink, { LinkProps } from 'next/link';

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
    isActive?: boolean | (() => boolean);
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
      isActive: isActiveProp,
      ...linkProps
    }: Props,
    ref: any,
  ) => {
    const router = useRouter();

    const isActive = useMemo(() => {
      if (typeof isActiveProp === 'function') {
        return isActiveProp();
      } else if (typeof isActiveProp === 'boolean') {
        return isActiveProp;
      } else {
        return isLinkActive(to, router);
      }
    }, [isActiveProp, router, to]);

    const linkClassName = [isActive ? activeClassName : null, className]
      .filter(Boolean)
      .join(' ');

    function onClick(event: React.MouseEvent) {
      const path = typeof to === 'string' ? to : to.as;

      if (router.asPath === path) {
        event.preventDefault();
      }
    }

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
          <CustomLink
            {...linkProps}
            ref={ref}
            className={linkClassName}
            isActive={isActive}
            onClick={onClick}
          />
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
        <CustomLink
          {...linkProps}
          ref={ref}
          className={linkClassName}
          isActive={isActive}
          onClick={onClick}
        />
      </NextLink>
    );
  },
);

const CustomLink = styled.a``;

export default Link;
