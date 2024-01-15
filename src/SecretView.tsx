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
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Key
            </th>
            <th scope="col" class="px-6 py-3">
              Value
            </th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <For each={Object.entries(secrets())}>
            {([key, value]) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {key}
                </th>
                <td class="px-6 py-4">
                  {key === 'description' || key === 'username'
                    ? value
                    : value.replace(/./g, '*')}
                </td>
                <td class="px-6 py-4 text-right">
                  <a
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => copyToClipboard(value)}
                  >
                    Copy
                  </a>
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
