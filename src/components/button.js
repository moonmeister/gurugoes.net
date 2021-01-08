import * as React from "react"

import { Link as GatsbyLink } from 'gatsby'
import { classNames as cn } from "../libs/strings"

const buttonClasses = "font-medium text-primary-700 rounded-full bg-gray-50 p-3 border-primary-700 hover:text-primary-900 focus:border-2"

export function Button() {

}

export function Link({ children, className, ...rest }) {
  return (
    <GatsbyLink {...rest} className={cn(buttonClasses, className)}>{children}</GatsbyLink>
  )
}

export function ExtLink({ children, className, ...rest }) {
  return (
    <a {...rest} rel="noopener" className={cn(buttonClasses, className)}>{children}</a>
  )
}