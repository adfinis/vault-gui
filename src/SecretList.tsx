import { invoke } from '@tauri-apps/api/tauri'
import { document as documentIcon, folder } from 'solid-heroicons/outline'
import { createResource, createSignal, For, Show, type Component } from 'solid-js'
import { useAppContext } from './context'
import Item from './Item'

const fetchSecret = async (contextValue: {
  page: string
  kv: string
  path: string
}): Promise<string[]> =>
  await invoke('list_path', { mount: contextValue.kv, path: contextValue.path })

const ListView: Component = () => {
  const { contextValue } = useAppContext()

  const [secrets] = createResource(contextValue, fetchSecret)
  const [search, setSearch] = createSignal('')

  return (
    <div class="p-5">
      <input
        type="text"
        value={search()}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
        oninput={e => setSearch(e.currentTarget.value)}
        placeholder="Filter results..."
      />
      <Show when={secrets()} fallback={<span class="text-bold">Loading...</span>}>
        <For each={secrets()}>
          {item => (
            <div>
              <Show when={item.includes(search()) || search() === ''}>
                <Item
                  kv={contextValue().kv}
                  path={contextValue().path + '/' + item}
                  icon={item.endsWith('/') ? folder : documentIcon}
                />
              </Show>
            </div>
          )}
        </For>
      </Show>
    </div>
  )
}

export default ListView
