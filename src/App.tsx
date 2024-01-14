import type { Component } from 'solid-js'
import vault from './assets/vault-logo.svg'

const App: Component = () => {
  return (
    <>
      <header class="supports-backdrop-blur:bg-background/60 bg-background/95 bg-black sticky top-0 z-40 w-full border-b backdrop-blur">
        <div class="container flex h-14 items-center">
          <div class="ml-4 flex">
            <a href="/" class="mr-6 flex items-center space-x-2 no-underline">
              <img src={vault} class="h-5 w-5" />
              <span class="font-bold inline-block text-white">Vault</span>
            </a>
            <nav class="flex items-center space-x-6 text-sm font-medium">
              <a
                class="text-foreground/60 hover:text-foreground/80 hidden no-underline transition-colors lg:block"
                href="#TODO:add-page"
              >
                Add
              </a>
            </nav>
          </div>
        </div>
      </header>
      <div class="flex mx-5 my-2">
        <nav class="w-1/4">Tree here</nav>
        <main class="w-full">Ui here</main>
      </div>
    </>
  )
}

export default App
