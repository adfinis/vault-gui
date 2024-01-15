import { invoke } from '@tauri-apps/api/tauri'
import { document as documentIcon, folder } from 'solid-heroicons/outline'
import { createResource, For, Show, type Component } from 'solid-js'
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

  return (
    <div class="p-5">
      <Show when={secrets()} fallback={<span class="text-bold">Loading...</span>}>
        <For each={secrets()}>
          {item => (
            <div>
              <Item
                kv={contextValue().kv}
                path={contextValue().path + item}
                icon={item.endsWith('/') ? folder : documentIcon}
              />
            </div>
          )}
        </For>
      </Show>
    </div>
  )
}

export default ListView
