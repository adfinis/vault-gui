import { invoke } from '@tauri-apps/api/tauri'
import { createResource, For, Show, type Component } from 'solid-js'
import { useAppContext } from './context'

const fetchSecret = async (contextValue: {
  page: string
  kv: string
  path: string
}): Promise<string[]> =>
  await invoke('list_path', { mount: contextValue.kv, path: contextValue.path })

const ListView: Component = () => {
  const { contextValue } = useAppContext()

  const [secrets] = createResource(contextValue(), fetchSecret)

  return (
    <div class="p-5">
      <Show when={secrets()}>
        <For each={secrets()}>
          {item => (
            <div class="bg-gray-100 rounded-lg p-5 m-2">
              <div class="text-2xl font-bold">{item}</div>
            </div>
          )}
        </For>
      </Show>
    </div>
  )
}

export default ListView
