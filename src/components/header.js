import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Transition } from '@headlessui/react';

import { Link } from './button';
import { useCategoryContext } from '../hooks/CategoryContext';

const { useState } = React;

const MobileMenuItem = ({ to, children, ...rest }) => (
  <div className="px-2 pt-2 pb-3" role="none">
    <Link
      to={to}
      className="block px-3 py-2 hover:bg-gray-50"
      role="menuitem"
      {...rest}
    >
      {children}
    </Link>
  </div>
);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentCategory } = useCategoryContext();

  const {
    allWpCategory: { nodes: categories },
  } = useStaticQuery(graphql`
    {
      allWpCategory(filter: { count: { ne: null } }) {
        nodes {
          name
          uri
        }
      }
    }
  `);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="-mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  id="main-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open main menu</span>
                  {/* <!-- Heroicon name: menu --> */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-10">
            {currentCategory !== 'all' ? <Link to="/">All</Link> : null}

            {categories?.map(({ name, uri }) =>
              currentCategory !== name ? (
                <Link to={uri} role="menuitem">
                  {name}
                </Link>
              ) : null
            )}
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
        <div className="absolute top-0 inset-x-0 p-2 transition origin-top-right md:hidden">
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div className="mr-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="main-menu"
            >
              {currentCategory !== 'all' ? (
                <MobileMenuItem to={'/'}>All</MobileMenuItem>
              ) : null}

              {categories?.map(({ name, uri }) =>
                currentCategory === name ? null : (
                  <MobileMenuItem to={uri} onClick={() => setIsOpen(!isOpen)}>
                    {name}
                  </MobileMenuItem>
                )
              )}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
