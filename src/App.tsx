import { invoke } from '@tauri-apps/api/tauri'
import { lockClosed } from 'solid-heroicons/outline'
import { createEffect, createResource, For, Show, type Component } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import vault from './assets/vault-logo.svg'
import Breadcrumbs from './Breadcrumbs'
import Login from './Login'
import Node from './Node'
import SecretList from './SecretList'
import SecretView from './SecretView'
import { state } from './state'

const listKVS = async (): Promise<null | string[]> => {
  try {
    return await invoke('list_kvs')
  } catch (e) {
    console.log(e)
  }
}

const Home = () => <strong>Select a KV to get started</strong>

const pageMap: { [key: string]: Component } = {
  home: Home,
  login: Login,
  view: SecretView,
  list: SecretList
}

const App: Component = () => {
  const [kvs, { refetch }] = createResource(listKVS)

  createEffect(() => {
    console.log(state)
  })
  createEffect(() => {
    if (state.page === 'home') refetch()
  })

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
        <div
          class="w-1/3 resize-x overflow-auto bg-neutral-100 border-r pl-2"
          classList={{ hidden: state.page === 'login' }}
        >
          <div class="mt-4">
            <Show
              when={state.page !== 'login' && kvs()}
              fallback={<strong>loading...</strong>}
            >
              <For each={kvs().sort()}>
                {kv => <Node isSecret={false} kv={kv} path={[]} icon={lockClosed} />}
              </For>
            </Show>
          </div>
        </div>
        <main class="flex-1 p-5">
          <h1 class="font-bold text-xl">
            <Breadcrumbs />
          </h1>
          <Dynamic component={pageMap[state.page]} />
        </main>
      </div>
    </>
  )
}

export default App
