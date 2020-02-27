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

export type CustomLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick' | 'className'
> & {
  isActive: boolean;
  className: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  ref?: React.Ref<HTMLAnchorElement>;
};

type CustomLinkRenderFunction = (props: CustomLinkProps) => React.ReactNode;

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<LinkProps, 'to' | 'href' | 'as'> & {
    /** allow both static and dynamic routes */
    to: string | { href: string; as: string };
    as?: React.ElementType;
    children?: CustomLinkRenderFunction | React.ReactNode;
    className?: string;
    activeClassName?: string;
    isActive?: boolean | (() => boolean);
  };

function isRenderFunction(
  children: Props['children'],
): children is CustomLinkRenderFunction {
  return typeof children === 'function';
}

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
      children,
      ...restLinkProps
    }: Props,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    /** router is null in Storybook environment */
    const router = useRouter() as ReturnType<typeof useRouter> | null;

    const isActive = useMemo(() => {
      if (!router) return false;

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

      if (!router || router.asPath === path) {
        event.preventDefault();
      }
    }

    function renderLink() {
      if (isRenderFunction(children)) {
        return children({
          className: linkClassName,
          isActive,
          onClick,
          ref,
          ...restLinkProps,
        });
      } else {
        /** Use can override this component via "as" prop */
        return (
          <DefaultLink
            {...restLinkProps}
            ref={ref}
            className={linkClassName}
            isActive={isActive}
            onClick={onClick}
          >
            {children}
          </DefaultLink>
        );
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
          {renderLink()}
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
        {renderLink()}
      </NextLink>
    );
  },
);

const DefaultLink = styled.a``;

export default Link;
