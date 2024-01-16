import { invoke } from '@tauri-apps/api/tauri'
import { document as documentIcon, folder } from 'solid-heroicons/outline'
import { createResource, For, Show, Switch, type Component } from 'solid-js'
import { toast } from 'solid-toast'
import Item from './Item'
import Loading from './Loading'
import { state } from './state'

const fetchPath = async ({
  kv,
  path
}: {
  kv: string
  path: string[]
}): Promise<string[]> => {
  try {
    return await invoke('list_path', { mount: kv, path: path.join('/') })
  } catch (e) {
    toast.error(`${e}`)
    return []
  }
}

const ListView: Component = () => {
  const [paths] = createResource(() => ({ kv: state.kv, path: state.path }), fetchPath)

  return (
    <div class="p-5">
      <Show when={paths()}>
        <For each={paths()}>
          {path => (
            <div>
              <Item
                kv={state.kv}
                path={[...state.path, path.replace('/', '')]}
                isSecret={!path.endsWith('/')}
                icon={path.endsWith('/') ? folder : documentIcon}
              />
            </div>
          )}
        </For>
      </Show>
    </div>
  )
}

export default ListView
