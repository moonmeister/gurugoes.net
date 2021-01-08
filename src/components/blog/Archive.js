import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

export function ArchiveView() {
  return (
    // < !--This example requires Tailwind CSS v2.0 + -->
    <div class="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="relative max-w-7xl mx-auto">
        <div class="mt-12 mx-auto grid gap-5 max-w-lg md:max-w-xl md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0">
              <StaticImage
                class="h-48 w-full object-cover"
                src="../../images/hero.jpg" alt=""
                layout="fluid"
                placeholder="dominantColor"
              />
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-indigo-600">
                  <a href="#" class="hover:underline">
                    Article
                  </a>
                </p>
                <a href="#" class="block mt-2">
                  <p class="text-xl font-semibold text-gray-900">
                    Boost your conversion rate
                  </p>
                  <p class="mt-3 text-base text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.
                  </p>
                </a>
              </div>
              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <a href="#">
                    <span class="sr-only">Roel Aufderehar</span>
                    <StaticImage
                      class="h-10 w-10 rounded-full"
                      src="../../images/icon.png"
                      alt=""
                      layout="fixed"
                      placeholder="dominantColor"
                      width={40}
                    />
                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a href="#" class="hover:underline">
                      Roel Aufderehar
                    </a>
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time datetime="2020-03-16">
                      Mar 16, 2020
                    </time>
                    <span aria-hidden="true">
                      &middot;
                    </span>
                    <span>
                      6 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0">
              <StaticImage
                class="h-48 w-full object-cover"
                src="../../images/hero.jpg" alt=""
                layout="fluid"
                placeholder="dominantColor"
              />            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-indigo-600">
                  <a href="#" class="hover:underline">
                    Video
                  </a>
                </p>
                <a href="#" class="block mt-2">
                  <p class="text-xl font-semibold text-gray-900">
                    How to use search engine optimization to drive sales
                  </p>
                  <p class="mt-3 text-base text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.
                  </p>
                </a>
              </div>
              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <a href="#">
                    <span class="sr-only">Brenna Goyette</span>
                    <StaticImage
                      class="h-10 w-10 rounded-full"
                      src="../../images/icon.png"
                      alt=""
                      layout="fixed"
                      placeholder="dominantColor"
                      width={40}
                    />                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a href="#" class="hover:underline">
                      Brenna Goyette
                    </a>
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time datetime="2020-03-10">
                      Mar 10, 2020
                    </time>
                    <span aria-hidden="true">
                      &middot;
                    </span>
                    <span>
                      4 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0">
              <StaticImage
                class="h-48 w-full object-cover"
                src="../../images/hero.jpg" alt=""
                layout="fluid"
                placeholder="dominantColor"
              />            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-indigo-600">
                  <a href="#" class="hover:underline">
                    Case Study
                  </a>
                </p>
                <a href="#" class="block mt-2">
                  <p class="text-xl font-semibold text-gray-900">
                    Improve your customer experience
                  </p>
                  <p class="mt-3 text-base text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.
                  </p>
                </a>
              </div>
              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <a href="#">
                    <span class="sr-only">Daniela Metz</span>
                    <StaticImage
                      class="h-10 w-10 rounded-full"
                      src="../../images/icon.png"
                      alt=""
                      layout="fixed"
                      placeholder="dominantColor"
                      width={40}
                    />                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a href="#" class="hover:underline">
                      Daniela Metz
                    </a>
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time datetime="2020-02-12">
                      Feb 12, 2020
                    </time>
                    <span aria-hidden="true">
                      &middot;
                    </span>
                    <span>
                      11 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}