import * as React from "react"

import { ArchiveView } from "../components/blog/Archive"
import { StaticImage } from "gatsby-plugin-image"


export default function IndexPage() {

  return (
    <>
      <section class="grid items-center grid-cols-3 gap-16">
        <div class="col-start-1 col-end-2">
          <StaticImage
            src="../images/icon.png"
            layout="fluid"
            placeholder="tracedSVG"
            maxWidth={250}
            alt="Guru Selfie while hiking PCT"

          />
        </div>
        <div class="text-center col-start-2 col-end-4">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Guru Goes</span>
            {/* <span class="block text-indigo-600 xl:inline">hiking / backpacking / traveling / etcetera</span> */}
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            I do a lot of things, hiking, backpacking, traveling, etcetera. My family and friends also like keeping up with me. So I built this blog to share my adventures with them and hopefully some others enjoy it as well.
              </p>
        </div>
      </section>
      <section>
        <ArchiveView />
      </section>
    </>

  )
}