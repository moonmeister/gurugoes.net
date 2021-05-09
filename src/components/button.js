import * as React from 'react';

import { Link as GatsbyLink } from 'gatsby';
import { classNames as cn } from '../libs/strings';

export const buttonClasses =
  'font-medium text-primary-700 rounded-full bg-gray-50 p-3 border-primary-700 hover:text-primary-900 focus:border-2';

export function Button({ children, ...props }) {
  return (
    <button {...props} type="button" className={buttonClasses}>
      {children}
    </button>
  );
}

export function Link({ children, className, override = false, ...rest }) {
  return (
    <GatsbyLink
      {...rest}
      className={cn({ [buttonClasses]: !override }, className)}
    >
      {children}
    </GatsbyLink>
  );
}

export function ExtLink({
  to,
  href,
  children,
  override = false,
  className,
  ...rest
}) {
  return (
    <a
      {...rest}
      href={href || to}
      rel="noopener"
      className={cn({ [buttonClasses]: !override }, className)}
    >
      {children}
    </a>
  );
}
