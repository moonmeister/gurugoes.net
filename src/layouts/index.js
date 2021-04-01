import * as React from "react"
import { Helmet } from "react-helmet"

import { CategoryProvider } from "../hooks/CategoryContext"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

import '../styles/global.css';

export default function Layout({ children }) {
  return (
    <CategoryProvider>
      <Helmet>
        <link rel="stylesheet preload" href="https://rsms.me/inter/inter.css"></link>
      </Helmet>
      <div className="grid auto-cols-auto grid-cols-1">
        <header className="row-start-1 row-end-2 col-start-1 col-end-2 z-10 p-4">
          <Header />
        </header>
        <div className="row-start-1 row-end-3 col-start-1 col-end-2">
          <div className="relative bg-primary-100 overflow-hidden">
            <div className="relative pt-6 pb-16 sm:pb-24">
              <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
                {children}
              </main>
            </div>
          </div>
        </div>
        <footer className="row-start-3 row-end-4 col-start-1 col-end-2">
          <Footer />
        </footer>
      </div>
    </CategoryProvider>
  )
}