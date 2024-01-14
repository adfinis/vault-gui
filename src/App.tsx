import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, For, type Component } from 'solid-js'
import vault from './assets/vault-logo.svg'
import { AppContext } from './context'
import Login from './Login'
import Node from './Node'
import SecretView from './SecretView'

const App: Component = () => {
  // Signals
  const [kvs, setKvs] = createSignal([])
  const [secrets, setSecrets] = createSignal({})
  // State between componenes
  const [contextValue, setContextValue] = createSignal({
    page: 'login',
    kv: '',
    path: ''
  })
  const updateContext = newValues => {
    setContextValue({ ...contextValue(), ...newValues })
  }
  // Callback functions
  const displaySecret = (kv: string, path: string) => {
    void (async () => {
      try {
        const data = await invoke('get_secret', { mount: kv, path: path })
        console.log(data)
        setSecrets(data)
      } catch (e) {
        console.log(e)
      }
    })()
  }
  const showKvs = () => {
    void (async () => {
      try {
        const data: string[] = await invoke('list_kvs')
        console.log(typeof data, data)
        if (Array.isArray(data)) {
          data.sort()
          setKvs(
            data.map(kv => ({ kv, path: '', icon: '🔒', displaySecret: displaySecret }))
          )
        }
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
      <div class="flex">
        <AppContext.Provider value={{ contextValue, updateContext }}>
          <div class="w-1/3 resize-x overflow-auto bg-slate-200 border-r pl-2">
            <div class="mt-4">
              <For each={kvs()}>{nodeData => <Node {...nodeData} />}</For>
            </div>
          </div>
          <main class="flex-1">
            {contextValue().page === 'login' && <Login />}
            {contextValue().page === 'view' && <SecretView />}
            {contextValue().page === 'home' && (
              <div class="p-4">
                Login successful! Select a KV on the left to get started.
              </div>
            )}
            <button
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={showKvs}
            >
              Show KVs
            </button>
            <div>
              <For each={Object.entries(secrets())}>
                {([key, value]) => (
                  <div>
                    Key: {key}, Value: {value}
                  </div>
                )}
              </For>
            </div>
          </main>
        </AppContext.Provider>
      </div>
    </>
  )
}

export default App
