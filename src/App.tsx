import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, type Component } from 'solid-js'
import vault from './assets/vault-logo.svg'

const App: Component = () => {
  const [url, setUrl] = createSignal('')
  const [kvs, setKvs] = createSignal({})
  const showKvs = () => {
    ;(async () => {
      try {
        // Directly await the promise and set the result
        const data = await invoke('list_kvs')
        setKvs(data)
      } catch (e) {
        console.log(e)
      }
    })()
  }

  const oidcAuth = () => {
    console.log('Called OIDC Auth')
    ;(async () => {
      try {
        const res = await invoke('oidc_auth', { address: url(), mount: 'oidc' })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    })()
  }

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
      <div class="flex mx-5 my-2">Tree here</div>
      <main class="w-full">
        <div class="p-4">
          <div class="mb-4">
            <label for="url" class="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              id="url"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onInput={e => setUrl(e.currentTarget.value)}
            />
          </div>
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={oidcAuth}
          >
            OIDC Auth
          </button>

          <button
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={showKvs}
          >
            Show KVs
          </button>

          <div class="mt-4">
            <pre>{JSON.stringify(kvs(), null, 2)}</pre>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
