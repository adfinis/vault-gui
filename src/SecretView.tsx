import { writeText } from '@tauri-apps/api/clipboard'
import { invoke } from '@tauri-apps/api/tauri'
import { createEffect, createSignal, For, type Component } from 'solid-js'
import { useAppContext } from './context'

const SecretView: Component = () => {
  const { contextValue, setContextValue } = useAppContext()
  const [secrets, setSecrets] = createSignal({})
  // Signals
  createEffect(async () => {
    const kv = contextValue().kv
    const path = contextValue().path

    try {
      const data: { [key: string]: string } = await invoke('get_secret', {
        mount: kv,
        path
      })
      console.log(data)
      setSecrets(data)
    } catch (e) {
      console.error(e)
    }
  })

  const copyToClipboard = async text => {
    await writeText(text)
  }

  return (
    <div class="p-5">
      <p class="font-bold">
        {contextValue().kv}
        {contextValue().path}
      </p>
      <table class="table-fixed border-2">
        <thead>
          <tr>
            <th class="text-left">Key</th>
            <th class="text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <For each={Object.entries(secrets())}>
            {([key, value]) => (
              <tr>
                <td>{key}</td>
                <td>
                  {(key === "description" || key === "username" ) ? value : value.replace(/./g, '*')}
                  <button class="font-bold pl-4" onClick={() => copyToClipboard(value)}>Copy</button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

export default SecretView
