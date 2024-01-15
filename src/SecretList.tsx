import { invoke } from '@tauri-apps/api/tauri'
import { createEffect, createSignal, For, type Component } from 'solid-js'
import { useAppContext } from './context'

const ListView: Component = () => {
  const { contextValue, setContextValue } = useAppContext()
  const [secrets, setSecrets] = createSignal({})
  // Signals
  createEffect(async () => {
    const kv = contextValue().kv
    const path = contextValue().path

    try {
      const data: string[] = await invoke('list_path', {
        mount: kv,
        path
      })
      console.log(data)
      setSecrets(data)
    } catch (e) {
      console.error(e)
    }
  })


  return (
    <div class="p-5">
        <For each={secrets()}>
            {(item) => (
                <div class="bg-gray-100 rounded-lg p-5 m-2">
                <div class="text-2xl font-bold">{item}</div>
                </div>
            )}
        </For>
    </div>
  )
}

export default ListView
