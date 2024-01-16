import { invoke } from '@tauri-apps/api/tauri'
import { document as documentIcon, folder } from 'solid-heroicons/outline'
import { createResource, For, Show, type Component } from 'solid-js'
import Item from './Item'
import { state } from './state'

const fetchSecret = async ({
  kv,
  path
}: {
  kv: string
  path: string[]
}): Promise<string[]> => await invoke('list_path', { mount: kv, path: path.join('/') })

const ListView: Component = () => {
  const [secrets] = createResource(
    () => ({ kv: state.kv, path: state.path }),
    fetchSecret
  )

  return (
    <div class="p-5">
      <Show when={secrets()} fallback={<span class="text-bold">Loading...</span>}>
        <For each={secrets()}>
          {item => (
            <div>
              <Item
                kv={state.kv}
                path={[...state.path, item.replace('/', '')]}
                isSecret={!item.endsWith('/')}
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
