import createLocalStore from '@solid-primitives/local-store'
import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, type Component } from 'solid-js'
import { useAppContext } from './context'

const [url, setUrl] = createSignal('')

const Login: Component = () => {
  const { contextValue, updateContext } = useAppContext()
  const [error, setError] = createSignal('')
  const [localStorage, setLocalStorage] = createLocalStore()
  const oidcAuth = () => {
    setLocalStorage('oidc_url', url())
    void (async () => {
      try {
        const res: string = await invoke('oidc_auth', { address: url(), mount: 'oidc' })
        updateContext({ page: 'home' })
      } catch (e) {
        console.log(e)
      }
    })()
  }
  const oidc_url = () => {
    try {
      return localStorage.oidc_url
    } catch {
      return ''
    }
  }

  return (
    <div class="p-4">
      <div class="mb-4">
        <label for="url" class="block text-sm font-medium text-gray-700">
          URL
        </label>
        <input
          id="url"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={oidc_url()}
          onInput={e => setUrl(e.currentTarget.value)}
        />
      </div>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={oidcAuth}
      >
        OIDC Auth
      </button>
      {error() && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error()}
        </div>
      )}
    </div>
  )
}

export default Login
