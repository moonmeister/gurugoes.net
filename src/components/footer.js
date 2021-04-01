import * as React from "react"

import { ExtLink } from "./button"

import { Instagram, Twitter } from "./icons/social"

const Socials = [
  {
    name: 'Instagram',
    handle: '@moon_meister',
    link: 'https://www.instagram.com/moon_meister/',
    Icon: Instagram
  },
  {
    name: 'Twitter',
    handle: '@moon_meister',
    link: 'https://twitter.com/moon_meister',
    Icon: Twitter
  }
]

export function Footer() {

  return (
    <>
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {Socials.map(({ name, handle, link, Icon }) => (
            <ExtLink href={link} title={`${name} - ${handle}`} override={false}>
              <span className="sr-only">{name}</span>
              <Icon />
            </ExtLink>))
          }
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy;{new Date().getFullYear()} Alex Moon. All rights reserved.
      </p>
        </div>
      </div>
    </>
  )
}