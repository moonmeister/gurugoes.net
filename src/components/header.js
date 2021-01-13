import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Transition } from '@headlessui/react'

import { Link } from "./button"
import { useCategoryContext } from "../hooks/CategoryContext"

const { useState } = React

export function Header() {

  const [isOpen, setIsOpen] = useState(false)
  const { currentCategory } = useCategoryContext()

  const { allWpCategory: { nodes: categories } } = useStaticQuery(graphql`
    {
      allWpCategory(filter: {count: { ne: null }}) {
        nodes {
          name
          uri
        }
      }
    }
  `)

  return (
    <>
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <nav class="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
          <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div class="flex items-center justify-between w-full md:w-auto">
              {/* <a href="#">
                <span class="sr-only">Workflow</span>
                <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
              </a> */}
              <div class="-mr-2 flex items-center md:hidden">
                <button type="button" onClick={() => setIsOpen(!isOpen)} class="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" id="main-menu" aria-haspopup="true">
                  <span class="sr-only">Open main menu</span>
                  {/* <!-- Heroicon name: menu --> */}
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="hidden md:flex md:space-x-10">
            {currentCategory !== "all" && <Link to="/">All</Link>}

            {
              categories?.map(({ name, uri }) => (
                currentCategory === name ? null :
                  <Link to={uri}>{name}</Link>
              ))
            }
          </div>
          <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            {/* <span class="inline-flex rounded-md shadow">
              <a href="#" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                Log in
                </a>
            </span> */}
          </div>
        </nav>
      </div>
      <Transition
        show={isOpen}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div class="px-5 pt-4 flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
              </div>
              <div class="-mr-2">
                <button type="button" onClick={() => setIsOpen(!isOpen)} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>
                  {/* <!-- Heroicon name: x --> */}
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
              <div class="px-2 pt-2 pb-3" role="none">
                {categories?.map(({ name, uri }) => (
                  <Link to={uri} className="block px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:text-gray-900 hover:bg-gray-50" role="menuitem">{name}</Link>
                ))}
              </div>
              <div role="none">
                <a href="#" class="block w-full px-5 py-3 text-center font-medium text-secondary-600 bg-gray-50 hover:bg-gray-100" role="menuitem">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}